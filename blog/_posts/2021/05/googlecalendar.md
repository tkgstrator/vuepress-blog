---
title: サーモンランの将来のシフトをカレンダーに追加する
date: 2021-05-10
description: Google Calendarで管理したいと相談を受けたので作ってみました
category: Splatoon2
tags:
  - サーモンラン
---

## サーモンラン用カレンダー

2022 年 1 月までの全シフト情報はわかっているので、その JSON を Google Calendar API を使ってカレンダーに登録しました。

やり方は長くなるので割愛。ステージはともかく、ブキ情報は手作業でプログラムに追加したのでめんどくさかったです。

::: warning ネタバレについて

本記事ではネタバレは行いませんが、解説に使っている画像から将来のシフトの（開催時間）のみが事前にわかってしまいます。

ネタバレ NG な方はこれより先を読み進めないことを推奨します。というか、ネタバレされたくない人はそもそもこのページ開かないか。

:::

<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/41nc-YsbiZL._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08QWXW524/?tag=tkgstrator0f-22" target="_blank">【Amazon.co.jp限定】『ウマ箱2』第1コーナー アニメ『ウマ娘 プリティーダービー Season 2』トレーナーズBOX) (全巻購入特典「映像特典DVD&描き下ろし全巻収納BOX」 引換シリアルコード付) [Blu-ray]</a></li>
<li class="price">￥19,580 (中古品)</li>
</ul>
</div>

## 追加の仕方

まずは[Google Calendar](https://calendar.google.com/calendar)をひらきます。

![](https://pbs.twimg.com/media/E1Bb7bzVgAEEBRM?format=png)

左下にある「他のカレンダー」の右側にある「＋」をクリックして、「URL で追加」を押します。

![](https://pbs.twimg.com/media/E1Bb-omUUAAzt4A?format=png)

URL の入力画面になるのでカレンダーを追加します。

![](https://pbs.twimg.com/media/E1BcrwZVcAISeHX?format=png)

![](https://pbs.twimg.com/media/E1BcwlPVoAMY78e?format=png)

すると無事にカレンダーに予定を全部取り込むことができました。

## 思ったこと

あれ、これせっかく色分けしたのに取り込むときに色分けされないじゃん！！！！

どうも色情報は共有できないみたいなので、分けるためにはそもそものカレンダーを分けてそれぞれの色を変更する必要がある模様。

というわけで、めんどくさかったのですがそれぞれカレンダーを分けることにしました。

## カレンダー URL

ご自由にご利用ください。

ブキやステージが英語で読みにくいぞというご意見も頂戴しておりますのでコメント欄にどうぞ（GitHub アカウントが必須ですが）

### 黄金編成

クマブキのみ支給されるシフトを追加します。

`https://calendar.google.com/calendar/ical/pjqks2o89dipedtsiolfkt27mo%40group.calendar.google.com/public/basic.ics`

### 全緑編成

全ての支給ブキがランダムのシフトを追加します。

`https://calendar.google.com/calendar/ical/9ojdd871h0bjhutscdulijib1g%40group.calendar.google.com/public/basic.ics`

### 一緑編成

支給ブキの一つがランダムのシフトを追加します。

`https://calendar.google.com/calendar/ical/vaqjrv0hk8q6lu1mo3eop4u6vg%40group.calendar.google.com/public/basic.ics`

### 通常編成

全てのブキがランダムでないシフトを追加します。

`https://calendar.google.com/calendar/ical/3krv96lvq6h23v2gu88e2cv9p4%40group.calendar.google.com/public/basic.ics`

記事は以上。

<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/513o1YnBRFL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/4471805649/?tag=tkgstrator0f-22" target="_blank">高橋 2021年 カレンダー 卓上 B6 E154 ([カレンダー])</a></li>
<li class="price">￥770</li>
</ul>
</div>

<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FTokyo&amp;src=OW9qZGQ4NzFoMGJqaHV0c2NkdWxpamliMWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=cGpxa3Mybzg5ZGlwZWR0c2lvbGZrdDI3bW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=M2tydjk2bHZxNmgyM3YyZ3U4OGUyY3Y5cDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dmFxanJ2MGhrOHE2bHUxbW8zZW9wNHU2dmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23AD1457&amp;color=%23F09300&amp;color=%23009688&amp;color=%23B39DDB&amp;title=%E3%82%B7%E3%83%95%E3%83%88%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>
