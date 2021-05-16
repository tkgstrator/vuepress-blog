---
title: GitHub Actionsが便利すぎた
date: 2021-05-06
description: GitHub Actionsの存在は知っていたのですが、使ってみたら驚くほどに便利でした
category: プログラミング
---

# GitHub Actions

そもそもGitHub Actionsとは何だということになるのだが、詳しくはGitHubの公式ページを見るのが良い。そこには次のように記されている。

::: tip GitHub Actionsとは

GitHub Actionsを使用すると、ワールドクラスのCI / CDですべてのソフトウェアワークフローを簡単に自動化できます。 GitHubから直接コードをビルド、テスト、デプロイでき、コードレビュー、ブランチ管理、問題のトリアージを希望どおりに機能させます。

:::

要するにソースコードをPushしたらGitHubのサーバがそれを勝手にビルドしてくれるということ。このあたりはDockerに似たものを感じなくもないですね。

ただし、リソースを使うので使い放題というわけではなく、一ヶ月に利用可能なビルド時間というものがあります。

|         | 消費クレジット | 
| :-----: | :------------: | 
| Linux   | 1              | 
| Windows | 2              | 
| macOS   | 10             | 

考え方としてはクレジット方式で、無料ユーザであれば2000、有料ユーザであれば3000のクレジットが毎月与えられます。Linuxのビルドだと1分で1クレジット消費するので2000分ビルドできるのですが、macOSでビルドすると200分しか使えないというわけです。

## GitHub Actionsを使ってみよう

では実際にGitHub Actionsを使ってみましょう。

使うといっても実行したいコマンドをYAMLファイルに書いていくだけです。書き方がわからなかったのですが、つよつよエンジニアの[ささぴよげえむず](https://twitter.com/sasapiyogames)さんがGithubに対してPRを送ってくれたのでそれを参考にしてみることにします。

SalmoniaはPythonのプログラムで、Windowsでそのまま実行しようとするとPyinstallerでビルドする必要があります。今回はGitHub ActionsでPyinstallerでEXE化した上でReleaseに出力するところを考えてみましょう。

```yaml
name: build executables

on:
  push:
    tags:
      - "v*"

jobs:
  windows-build: # Windows向けビルド
    runs-on: windows-latest
    steps: # コマンドを上から順番に書いていく
      - name: Checkout commit
        uses: actions/checkout@master

      - name: Set up Python 3.9
        uses: actions/setup-python@master
        with: { python-version: 3.9 }

      - name: Upgrade pip
        run: python -m pip install --upgrade pip PyInstaller

      - name: Install requirements
        run: pip install -r requirements.txt

      - name: build
        run: pyinstaller Salmonia.py --onefile

      - name: upload
        uses: actions/upload-artifact@v1
        with:
          name: Salmonia-windows
          path: dist/Salmonia.exe

  release: # 実行するジョブを書く
    needs: [windows-build]
    runs-on: ubuntu-latest

    steps: # ビルド後の処理などを書く
      - name: Download Windows
        uses: actions/download-artifact@v1
        with:
          name: Salmonia-windows

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

      - name: Zip
        run: zip --junk-paths Salmonia-windows ./Salmonia-windows/Salmonia.exe

      - name: Append Binary
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./Salmonia-windows.zip
          asset_name: Salmonia-windows.zip
          asset_content_type: application/zip
```

PyinstallerでEXEを作成するためにはWindowsで実行しないと意味がないのでビルド時には`runs-on`に`windows-latest`を指定していますが、アップロードやZIP化するのは別にLinuxで構わないのでこちらには`ubuntu-latest`を指定します。

これがベースの書き方で、これさえ書いておけば全てのPythonプログラムはPyinstallerでビルドして自動リリースができます。ただ、このままだとタグの値に関わらず常に同じファイル名になってしまうので少し気がかりです。

そこで、タグ情報をファイル名に埋め込めるようにします。

```diff
steps: # ビルド後の処理などを書く
+ - name: Set version
+   id: version
+   run: |
+     REPOSITORY=$(echo ${{ github.repository }} | sed -e "s#.*/##")
+     VERSION=$(echo ${{ github.ref }} | sed -e "s#refs/tags/##g")
+     echo ::set-output name=version::$VERSION
+     echo ::set-output name=filename::$REPOSITORY-$VERSION
  - name: Download Windows
    uses: actions/download-artifact@v1
    with:
      name: Salmonia-windows
# 中略
  - name: Append Binary
    uses: actions/upload-release-asset@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      upload_url: ${{ steps.create_release.outputs.upload_url }}
      asset_path: ./Salmonia-windows.zip
-     asset_name: Salmonia-windows.zip
+     asset_name: Salmonia-${{ steps.version.outputs.version }}-windows.zip
      asset_content_type: application/zip
```

`github.ref`には余計な情報が入っているので一回コマンドでそれらを削除した後に環境変数に入れることで対応します。この使い方、割とスタンダードらしいので覚えておくと便利かもしれません。

<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/419yWNlLUML._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08GZ44B5Q/?tag=tkgstrator0f-22" target="_blank">【Amazon.co.jp 限定】素晴らしき日々~不連続存在~ 10th anniversary特別仕様版【描き下ろしB2タペストリー(Wスエード) 付き】</a></li>
<li class="price">￥15,708</li>
</ul>
</div>

## 実際にやってみた

ビルドして完成したものが[こちら](https://github.com/tkgstrator/Salmonia/releases/tag/v1.10.1)

Windowsでのビルドは二分くらいで終わったので常識的な範囲内なら大丈夫そうです。

記事は以上。