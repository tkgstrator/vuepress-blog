---
title: "XVim2がBig Surでバグる問題について"
date: "2021-02-09"
categories: 
  - "話題"
---

## XVim2

XVim2はXcodeにVimのショートカットキーを導入できる神アプリ。

Macを初期化するたびに必ず導入していたのだが、どうもBig SurへのアップデートでXVim2が正しく動かなくなったようだ。

## ログインできないバグ

さて、Xcodeでアプリ開発する上で実機で動作させようとすると必ずアプリに対して署名をする必要がある。

で、その署名はどうするかというとXcodeでApple IDでログインすれば自動的にXcodeが署名を生成してくれるという仕組みになっている。この辺の仕組みについてはほとんど自動化されているので、XcodeでApple IDでログインしなければならないということを真面目に意識している人は少ないだろう。

![](https://pbs.twimg.com/media/EtiKSlvVIAY3Pge?format=jpg&name=large)

で、どうもこのApple IDへログインするためのセッションを開始できないバグが発生したようだ。

XVim2でプラグインを読み込ませるためにXcodeに自己証明書で署名を上書きしているのが問題な気はしている。

![](https://pbs.twimg.com/media/EtiKWICVgAI2x7R?format=png&name=small)

エラーが発生してログインセッションが始まらない

https://github.com/XVimProject/XVim2/issues/340

最初はなんのバグかわからなかったのだが、調べているとXVim2のissueとして挙がっているのを確認した。一応関連するissueは見て回ったが、どうも現段階で抜本的な解決方法はないようだ。

というか、スレッドでなされている対策が署名を上書きしないXcodeと上書きしたXcodeの二種類を用意するなどと解説されていたりする。容量が20GBを超えるXcodeを二つも共存させる方法はスマートとは言い難いだろう。

困ったことといえば、このissue自体が二ヶ月以上も前に報告されているにもかかわらず、解決の目処が立っていないということだ。普通、こういう問題が上がった場合、まずは暫定的な対処方法が提案され、その後リポジトリ自体にアップデートが入って正式対応するという流れが筋である。

しかし、未だに暫定的な対処方法すら一つも挙がってこない。これは若干まずい気がしている。

### App Storeからダウンロードし直す

![](https://pbs.twimg.com/media/EtlTyotUcAMvWFP?format=jpg&name=large)

時間はかかったが、インストールし直すとなんの障害もなくログインすることができた。

もちろん、自己署名をしていないのでXVim2などのプラグインをロードすることはできない。

なので結局Xcode12.5betaを導入してXcode12.4でXVim2を使ってコーディング、Xcode12.5でビルドして提出という方法を取ることになった。とてもめんどくさい。

ちなみにXcode12.5は[このリンク](https://developer.apple.com/download/)からダウンロードできます。

## おまけ

AdmobをXcode12で動かそうとすると、Info.plistにパラメータを設定しているにも関わらず初期化エラーが発生してしまう。

そんなときに以下のサイトをお見かけして解決しました。

https://exgyaruo.com/swift/terminating-app-due-to-uncaught-exception-gadinvalidinitializationexception

<key>GADIsAdManagerApp</key>
<true/>

Info.plistに追加で上の内容を追記すればいいらしいです。
