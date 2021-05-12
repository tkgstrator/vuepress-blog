---
title: PythonでGoogle Schedule APIを扱う
date: 2021-05-10
description: Google Schedule APIを使って予定を自動で追加したり取得したりしてみます。
category: プログラミング
tags:
  - Python
---

# Google Schedule API

[ここ](https://console.developers.google.com/start/api?id=calendar&hl=ja)からプロジェクト作成と API の有効化を行なう。

OAuth 2.0 の認証情報を設定し、最後に認証情報を JSON として保存。

すると、以下のような JSON ファイルがダウンロードされるはず。

```json
{
  "installed": {
    "client_id": "XXXXXXXXXXX-YYYYYYYYYYYYYYYYY.apps.googleusercontent.com",
    "project_id": "local-reference-XXXXXX",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "ZZZZZZZZZZZZZZZZZZZZ",
    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
  }
}
```

取得した JSON を適当に `credentials.json`という名前に変更。この名前にするのは特に理由はなくて、Google のチュートリアルがそうなっているから。

## Python で実装

一番ラクなのは Python なので Python でいろいろ動かしていきます。

```python
from __future__ import print_function
from datetime import datetime
import os.path
import json
from googleapiclient.discovery import _discovery_service_uri_options, build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# カレンダーに対して読み書きできるスコープを設定
SCOPES = ["https://www.googleapis.com/auth/calendar"]


def main():
    # 初回起動は token.jsonがないので認証が必要になる
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        # 二回目以降は token.json を読み込む
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    service = build("calendar", "v3", credentials=creds)


if __name__ == "__main__":
    main()
```

実行すると認証用の URL にとばされる。このとき、たとえプロジェクトを作成したアカウントであっても信頼できるユーザに追加されていないとアクセスが拒否されてしまう。

OAuth 同意画面から「信頼できるユーザ」として追加するのを忘れないようにしておこう。

## 予定の書き込み

予定を書き込むには以下のフォーマットが使える。

```python
body = {
    "summary": "SUMMARY"
    "start": {
        "dateTime": "START TIME WITH ISO FORMAT",
        "timeZone": "TIMEZONE"
    },
    "end": {
        "dateTime": "END TIME WITH ISO FORMAT",
        "timeZone": "TIMEZONE"
    },
}
event = service.events().insert(calendarId="primary", body=body).execute()
```
