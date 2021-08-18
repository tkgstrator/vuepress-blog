---
title: VuePressで環境変数を利用する
date: 2021-08-16
description: VuePressで環境変数を利用してアプリケーションを動かしてみます
category: プログラミング
tags:
  - Vue
  - Javascript
---

# 環境変数を読み込もう

Webhook の API を VuePress で利用したい場合、ソースコードに埋め込んでいると GitHub 先生に怒られてしまうので環境変数から読み込むようにします。

このとき、開発環境と本番環境だと参照先が違うのでどちらにも対応する必要があります。

|        |     開発環境     |     本番環境     |
| :----: | :--------------: | :--------------: |
| 参照先 | ローカルファイル | サーバの環境変数 |

このとき、ローカルファイルの環境変数が書かれたファイルを Git で Push しては意味がないので`.gitignore`に追加するのを忘れないようにしましょう。

## dotenv のインストール

[VuePress の Vue コンポーネントで環境変数を使いたいとき](https://qiita.com/wakame_tech/items/1e5b65c180d2d940032d)が大変参考になりました。

```bash
yarn add -D dotenv
```

どうやら`webpack`からでは`process.env`が参照できないらしいので`config.js`で`.env`を読み込んで`webpack`にわたす必要があります。

そのために`dotenv`が要るとのことなのでインストールします。

## confing.json

```json
const webpack = require("webpack");
const { config } = require("dotenv");
config();

module.exports = {
  title: "VuePress Title",
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "env": JSON.stringify(process.env),
        },
      }),
    ],
  },
```
