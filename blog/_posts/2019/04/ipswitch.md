---
title: "[Hack] IPSwitchの使い方"
date: 2019-04-01
description: IPSwitchの使い方についての解説です
category: Hack
tags:
  - IPSwitch
---

## IPSwitch

IPSwitch とは pchtxt（パッチテキスト）を読み込み、.ips 形式のパッチとして出力するツールのこと。

これがあるだけでわざわざ自分で .ips ファイルを書かなくてもコードを実際に使える形式に変換してくれます。

[IPSwitch](https://github.com/3096/ipswitch/releases)

まずは IPSwitch をダウンロードし、switch フォルダ内に「ipswitch」というフォルダを作成し、ipswitch.nro をコピーします。

つぎに ipswitch フォルダ内に名前は何でもいいので、フォルダを作成します。

あとはそのつくったフォルダの中に pchtxt 形式のコードファイルをコピーします。

例えとしては、こんな感じです。

`sdmc:/switch/ipswitch/Splatoon 2/5.4.0public.pchtxt`

コードは移植と開発の二通りの入手方法があります。

また、インターネットで誰かが公開しているものを使うという手も考えられます。

[スプラトゥーン2 チートコード](https://takaharu422.github.io/Splatoon2.github.io/ja.html)

## Switch側の設定

hbmenu から IPSwitch を起動します。

Toggle Patch Text Contents で A ボタンを押して進めます。

今回は 5.4.0 向けのコードを有効化したかったので 5.4.0public.pchtxt で A ボタンを押すと、ファイル内に記述されているコードがロードされます。

![](/assets/images/12.jpg)

赤色表示は無効化されているコードなので有効化したいもので A ボタンを押して逐次好きなようにカスタマイズしてください。

カスタマイズができたら最後に Y ボタンを押して .ips ファイルを出力します。

![](/assets/images/13.jpg)

All Done と表示されたらコード出力が完了したので + ボタンで hbmenu に、HOME ボタンで HOME メニューに戻れます。

あとは好きなだけ遊んでください。

記事は以上。
