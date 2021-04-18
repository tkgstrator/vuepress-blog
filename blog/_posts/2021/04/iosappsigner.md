---
title: iOS App Signerでアプリに署名しよう
date: 2021-04-19
description: iOS App Signerでアプリに署名し、Sideloadを使って365日間有効なIPAを作成するためのチュートリアルです
category: Swift
---

## Sideload の必要性

## 手順

### Identifier の作成

![](/assets/images/08.png)

[ここ](https://developer.apple.com/account/resources/identifiers/list)でログインしてまずは Identirfier を作成します。

自分は Twitter Owl の Sideload がしたかったのでこんな感じに設定しました。多分、Sideload したいアプリの数だけ Identirfier は作成しないとダメです。

### デバイスの登録

[ここ](https://developer.apple.com/account/resources/devices/list)からデバイスの登録を行います。

UDID が必要になるのであらかじめ調べておきましょう。

UDID は Mac であればデバイスを繋いでからデバイス名の下のところを一回クリックすれば表示されます。

Windows であれば iTunes で繋いで調べることができます、多分。

![](/assets/images/11.png)

登録デバイスが増えたときはここからやり直す必要があります。

### Provisioning Profile のダウンロード

![](/assets/images/09.png)

[ここ](https://developer.apple.com/account/resources/profiles/list)から Provisioning Profile を作成してダウンロードします。

Identirfier には先程作成したものを利用します。

### iOS App Signer

![](/assets/images/10.png)

iOS App Signer は[ここ](https://dantheman827.github.io/ios-app-signer/)で配布されています。

ダウンロードしたら起動し、Provisionig Profile に先ほど作成してダウンロードしたものを指定します。

その後 Input File から署名したい IPA ファイルを選択します。今回は Twitter アプリに対して署名したかったので[GitHub](https://github.com/ipahost/Owl-for-Twitter)の公式ページから IPA をダウンロードしてきました。

あとは署名をしてしまえば終了です。だいたい一分くらいで終わります。

## 配布する

以下のテンプレートに則って PLIST ファイルを作成します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>配布用URLを記述する</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>IPAのバンドルIDを指定する</string>
        <key>bundle-version</key>
        <string>IPAのバージョンを指定する</string>
        <key>kind</key>
        <string>software</string>
        <key>subtitle</key>
        <string>企業名を指定する</string>
        <key>title</key>
        <string>アプリ名を指定する</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>
```

### リンクの作成

最後にこの PLIST にアクセスするために必要なリンクを作成する。

Markdown だと以下のように書けば良い。`item-services://`の URL スキームを使うことでインストーラが開くという仕組みになっている。

```md
[リンク](itms-services://?action=download-manifest&url=https://tkgling.netlify.app/resources/plist/twitterowl.plist)
```

注意点としては PLIST ファイルは必ず HTTPS プロトコルでアクセスしないといけない。今どき使っている人はいないだろうが、HTTP だとインストールができない。

また、PLIST ファイルが置いてあるドメインと IPA が置かれているドメインは同じでないといけない。要するに、勝手に別のドメインのアプリをインストールすることはできない。

## 完成したもの

### Twitter Owl

主な機能は以下の通り。

- 広告の非表示
- Fleet 画像の保存
- ツイートを画像として保存
- 動画の保存
- いいねアクションの無効化
- フィード動画の保存
- いいね時に確認機能を追加
- フォロー外しの際に確認機能を追加
- フリートの無効化
- ボイスメッセージの送信

ただし、以下の点でバグが存在する（これは潜在的で解決できるようなものではない）

- 通知が来ない

|                                                     バージョン                                                     | リリース日 | プラグインバージョン |
| :----------------------------------------------------------------------------------------------------------------: | :--------: | :------------------: |
| [8.59](itms-services://?action=download-manifest&url=https://tkgling.netlify.app/resources/plist/twitterowl.plist) | 2020/04/08 |         1.7          |
