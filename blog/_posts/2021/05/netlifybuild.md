---
title: GitHub ActionsでNetlifyのビルド時間を浮かせよう
date: 2021-05-06
description: Netlifyは便利なのですが、ビルド時間が一ヶ月で300分しかないのが問題です。それをGitHub Actionsで解決しましょう。
category: プログラミング
---

# Netlifyの最大の問題点

NetlifyはGitHubにプッシュされた内容を自動でビルドして更新してくれるというスグレモノではあるものの、無料枠が300分しかなくそれ以上のビルドをすると料金がかかってしまう仕組みになっている。

単なるウェブサイトなら気にもならないのだが、本ページのようなブログだと誤字修正などで頻繁にプッシュするため小さなビルド時間も積み重なってかなり食ってしまう。

現時点でも58/300を使い切ってしまっており、このままの更新ペースを維持した場合とても無料枠に収まりきりそうにないのである。

## GitHub Actionsを使う

その点、GitHub Actionsであればパブリックなレポジトリに関してはビルド制限がまったくないのでこれを利用する。

::: tip うちのブログは

うちのブログはVssueを利用しているためにブログのレポジトリにプライベートキーが載っていたりする。

そのため公開レポジトリにはできないのだが、それでもGitHub Actionsなら2000分のビルドクレジットがあるのでNetlifyの実に6倍以上である。当分、ビルド時間に関して心配は要らなさそうだ。
:::

## 実装してみる

何やら便利そうな[レポジトリ](https://github.com/nwtgck/actions-netlify)を見つけたのでそれを利用してみることにします。

上手くいかなかったときは[Netlifyへのデプロイをビルド時間0で行うためのGitHub Actions](https://qiita.com/nwtgck/items/e9a355c2ccb03d8e8eb0)でもいいかなと思っているのですが、とりあえずやってみましょう。

```yml
name: Netlify

on:
  push:
  pull_request:
    types: [opened, synchronize]

jobs:
  build:
    runs-on: ubuntu-18.04

    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - run: yarn build 

      - run: npx netlify-cli deploy --dir=./blog/.vuepress/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```