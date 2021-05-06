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
// キャッシュ無効
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

      - run: npx netlify-cli deploy --prod --dir=./blog/.vuepress/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

で、これでもいいのですが、どうせならキャッシュを使ってGitHub Actionsのビルド時間も減らします。

```yml
// キャッシュ有効化
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

      - uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - uses: actions/cache@v2
        id: yarn-cache # use this to check for `cache-hit` (`steps.yarn-cache.outputs.cache-hit != 'true'`)
        with:
          path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - run: yarn install
      - run: yarn build

      - run: npx netlify-cli deploy --prod --dir=./blog/.vuepress/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

初回のみ必ずキャッシュがミスヒットするので余計に時間がかかりますが、二回目以降は速くなるはずです。

|                               | Using Cache | Without Cache | 
| :---------------------------: | :---------: | :-----------: | 
| Set up job                    | 4s          | 3s            | 
| Run actions/checkout@v2       | 6s          | 4s            | 
| Run actions/setup-node@v2     | 1s          | 1s            | 
| Get yarn cache directory path | 2s          | -             | 
| Run actions/cache@v2          | 1s          | -             | 
| Run yarn install              | 34s         | 28s           | 
| Run yarn build                | 66s         | 65s           | 
| Run npx netlify-cli deploy    | 62s         | 57s           | 
| Post Run actions/cache@v2     | 9s          | 0s            | 
| Post Run actions/checkout@v2  | 0s          | -             | 
| Complete job                  | 0s          | 0s            | 
| Total                         | 200s        | 158s          | 

一回目をやった感じだと40秒くらい遅い結果に。果たして二回目は？