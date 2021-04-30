---
title: "GAS版Salmoniaを複数アカウント対応した"
date: "2021-02-04"
description: "Android 版の Salmonia はリザルトアップロード機能しかなく、iOS 版のようにデータ分析などができない。よって、本記事は Android を所持している方向けで、そういう人はパソコンがあるなら絶対に導入したほうがいいです"
category: Splatoon2
---

## Android 利用者向けである

Salmonia というよりは、単なるリザルト（JSON）アップローダなのだが、まあそこには目をつむってほしい。

Android 版の Salmonia はリザルトアップロード機能しかなく、iOS 版のようにデータ分析などができない。よって、本記事は Android を所持している方向けで、そういう人はパソコンがあるなら絶対に導入したほうがいいです。

iPhone や iPad があるならこれを導入した上で Salmonia2 を使えば、より便利にサーモンランを楽しむことができるでしょう。

### Google Apps Script の設定など

GAS のアカウント開設や、設定の大まかな方法は以前と変わっていません。

以下の記事を参考にしてください。

https://tkgstrator.work/?p=28023

また、iksm_session の取得には PC 版の Salmonia が必須です。

最近コードを大幅に変えて安定性を向上させたので、ぜひともそっちを使ってみてください。

[Windows 版 Salmonia 1.10.0](https://cdn.discordapp.com/attachments/619618040417484801/806417639185448960/Salmonia.exe)

え、じゃあ何が変わったんだとなるわけですが、複数アカウントに対応したのが今回の一番の目玉です。

### サブ垢対応のコード

https://gist.github.com/tkgstrator/3f190327b114ec6ce9d7405559e600fe

### プロパティについて

プロパティは JSON 形式にのみ対応しています。

JSON 形式と言われてもよくわからないと思うので、テンプレートを置いておくのでそのとおりに書いてみてください。

IKSM_SESSION => ["IKSM_SESSION_1", "IKSM_SESSION_2"[
API_TOKEN => API_TOKEN
JOB_NUM => ["0", "0"[

`IKSM_SESSION`と`JOB_NUM`だけは読み込みの都合上、ダブルクオーテーションで囲む必要があります。`API_TOKEN`だけはそのままであることに注意してください。

![](https://pbs.twimg.com/media/EtYPFKAVkAEjv4s?format=png&name=medium)

こんな感じで書き込めたら今まで通り指定したトリガーで実行されます。

![](https://pbs.twimg.com/media/EtYQDKaUcAAPV-a?format=jpg&name=large)

こんな感じでどんどんリザルトを自動取得してくれます。実はアップロードが正しくできているかは未確認なのだが、多分大丈夫でしょう（ヨシ

記事は以上。
