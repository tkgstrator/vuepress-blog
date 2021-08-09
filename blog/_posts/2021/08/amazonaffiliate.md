---
title: Vuepressでアマゾンアフィリエイトを表示させる
date: 2021-08-10
description: Vuepressでつくったサイトにアフィリエイトを表示させるコンポーネントを作成する手順について解説
category: プログラミング
tags:
  - Vue
  - Javascript
---

# アマゾンアフィリエイト

アマゾンアフィリエイトは単にリンクを貼るものと PA API(Product Advertising API)を利用するものとがあるのですが、PA API は使わないでいると利用制限がかかってしまいます。また、Vuepress は静的サイトなので誰かがアクセスするたびに PA API を叩いて〜ということが普通はできないのですが、コンポーネントを使って Javascript を走らせればそれに対応できそうだということがわかりました（気づくのが遅い）

なので、やってみようと思います。

## [コンポーネント](https://tkgstrator.work/posts/2021/08/02/markdownvue.html)

前回、Markdown で Vue コンポーネントを読み込ませる手順については解説したので、それを利用します。

<Amazon/>
