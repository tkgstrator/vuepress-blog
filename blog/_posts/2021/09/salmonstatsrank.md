---
title: Salmon Statsから見る上位ランカーは誰か
date: 2021-09-30
description: Salmon Statsの記錄からサーモンランの上位ランカーが誰かを調べてみました
category: 話題
tags:
  - サーモンラン
---

# [Salmon Stats](https://salmon-stats.yuki.games/)

サーモンランが一番うまい人は誰なのか、という話題は尽きることがない。

そして、誰が一番うまいかを決定するような素晴らしい評価アルゴリズムがあるとも思えない。何故ならサーモンランは運要素がガチマッチに比べて高く、対 CPU ゲームである以上プレイヤーがある程度上手ければ勝率を極めて 100%に近づけることが可能で、レーティングなどというような仕組みを使って実力を評価することができないからである。

が、目安としてどのような人が上手いか、という程度であれば判断できないこともない。

それにはサーモンランのレコードを約 170 万件保存している Salmon Stats を使う。

もちろん、Salmon Stats のレコード 170 万件全てを解析すれば正確に評価できるように思うが、それは全レコードを持っているというのが前提になってくる。

残念ながら Salmon Stats には全レコードを取得するような仕組みがない（あたりまえだ）ので、わかる範囲内で誰が上手いのかを調べる必要がある。

<Amazon />

## シフト記錄を使う

そもそも Salmon Stats を運営し始めたのは、既存の Salmon Run Records に不可避の不具合があったためだ。

というのも、たとえばキンシャケ探しイベントでステージ記錄を狙おうとすればブキ編成の火力が必須になるし、ダイナモローラーがいない編成では記録更新は不可能だろう。

そのようにして、良い編成かつ良い WAVE を引いたという極めて運要素の強いアンタッチャブルレコードで記錄が埋め尽くされていき、更新が次第に困難になりプレイヤーのモチベーションの低下につながってしまうからだ。

そこで Salmon Stats ではシフトごとの記錄を取るようにし、その編成である程度の運を許容しつつ最も良い記録を出したプレイヤーを称えることとした。シフトの開催期間は限られているので、実力が多少劣っているプレイヤーあってもものすごく上手いプレイヤーが理想の WAVE を引けなければ十分勝てる可能性があるからだ。

### シフト記錄一覧

Salmon Stats では赤イクラ部門、金イクラ部門において各潮位・イベントの組み合わせ 16 通り+総合(夜込み)+総合(昼のみ)の記錄を集計している。

最高記録、しか保存されていないのは残念だが、つまり各シフトにおいて 18*2=36 の記錄が存在することになる。基本的には四人でプレイしているはずなので、1 シフトに掲載されるプレイヤー数は最大で 36 * 4=144 ということになる。

サーモンランのシフトは現在 914 回までシフトの内容が明らかになっているので最大で 914 \* 144 = 131616 名のプレイヤーが名前を載せることが可能になる。

もちろん、初期のシフトについては Salmon Stats がデータを集計していないし、未来のシフトについては当然ながらデータが存在していない。

だが、調べたところ 500 シフト程度については有効なシフト記錄があることが判明した。

::: tip 有効なシフト記錄

Salmon Stats の初期運営時にはユーザが少ないため、シフト記錄の質が低く簡単に同一のプレイヤーが記錄を独占することができた。

そのため、今回の集計にあたってシフトでのバイト回数がある程度多いもののみを考えた。

:::

## 記錄を取得するコード

Salmon Stats はスケジュール ID として UTC を採用しているので、タイムスタンプから変換してデータを取得する。

シフト記錄自体は`https://salmon-stats-api.yuki.games/api/schedules/{SCHEDULE_ID}`の API を叩けば取得できる。

こういうときに手っ取り早いのは Python なので Python を使ってデータを取得した。

すると全部で 59311 人のプレイヤーが登録されていることがわかった。

::: tip 人数について

サーモンランは四人で遊ぶプレイヤーのはずなので、59312 人にならなければおかしいのだが回線落ちなどで一人減ってしまったのだろうと考えられる。

:::

この中で何度もランキングに載っているプレイヤーが「上手い」かつ「上手いと認められて色んな上手い人と遊んでいる」と考えることができる。

今回は 100 回以上ランキングに載っているプレイヤーを紹介することにする。

### 抽出したプレイヤー

```json
{
  "a0720e1c8cecd9fc": 2841,
  "b47e1fd7a7e6feb5": 1498,
  "27b314952c00c7fa": 1451,
  "f97303bd80834670": 1425,
  "2da8bead36f8bdea": 916,
  "2e86f880e0fcdbcb": 882,
  "a6698b80745752ab": 856,
  "0a14e929a0661370": 841,
  "059045d2e7825876": 734,
  "001bfbec9b904a71": 715,
  "66ffbce054aa5291": 693,
  "4378ddb86f58882e": 639,
  "aae300eb7db4f6dd": 637,
  "6e8f72d75edd68fd": 627,
  "0dcabf1aa4e70f2e": 623,
  "5db950fcf6763803": 613,
  "635f96d0f8280edb": 503,
  "2f64b91c4ee5b9a4": 481,
  "3d647759d2e3b0ee": 472,
  "cde7ed3fa44ad577": 434,
  "93a486040cd7b375": 433,
  "a81dc4e527e9fc9f": 395,
  "3bf62ab1a934d7df": 366,
  "b2da7c8ca0e06fa7": 356,
  "788580029fe74552": 350,
  "d0952b1f1b4394c1": 347,
  "fd2c03a294d101cb": 343,
  "166e8815dd84dadb": 328,
  "e59e183bcf4a4e3d": 313,
  "ae570b2064d4b4b6": 310,
  "701f07f4f86556c0": 298,
  "55f850dd60952002": 298,
  "36cfe58828c00e79": 293,
  "a8eebf9c682d5c17": 292,
  "835dffa743851f8e": 290,
  "dd84b53a5864e26e": 275,
  "cd0ec93f60bdacf2": 270,
  "8b711d4fbffc31e7": 267,
  "daf36b6006b5dae8": 264,
  "d50a82bbc795da65": 247,
  "c2760ec31f3a186a": 238,
  "197bd49c4ad527a4": 235,
  "0fc55140cd215f52": 234,
  "c9b314aaf5114d31": 231,
  "ea3c59657f0cdd6e": 225,
  "739f4a9b8e4d5e30": 224,
  "24bd527b3136d069": 223,
  "66d3f6c5c1ce879d": 221,
  "4c2e448503020ad3": 198,
  "2325a6845a0e9963": 198,
  "250d09d5cc6c6819": 195,
  "52d5c2d24314842a": 194,
  "2da02f4acf9dccfe": 184,
  "5627919bb16897c4": 183,
  "4e217af8576c7364": 183,
  "7c331ba2fff80f9f": 179,
  "0368add775b43c83": 178,
  "759f8285abd07135": 176,
  "28e0c8f7df91f431": 174,
  "8ba9fb54040266bf": 173,
  "9a3f401b4da33746": 167,
  "19353ca34dffb164": 166,
  "6c50aaccb889d227": 162,
  "b2845a45750a76c8": 160,
  "d455dc3f1f32ce5d": 159,
  "23038a91b3db9351": 156,
  "26614a0c758671c3": 153,
  "aa4fef305a92d234": 148,
  "41693115c16005cf": 145,
  "0207ac94447f2565": 143,
  "2ef1128dbe97ac33": 127,
  "8693b36d8d6036c6": 124,
  "fffb476fad470432": 124,
  "efae74ec9920c457": 124,
  "747b37c7b2f790bf": 123,
  "42e37bcfdb386e21": 122,
  "991bf232e9a2eabc": 120,
  "c6548d3466789c00": 119,
  "ff05b28c6138a248": 119,
  "4ecbdbad3b5fce72": 118,
  "a773c9a9c4182410": 118,
  "0294ff3a62939a7a": 118,
  "f61adb7ca060ce99": 115,
  "c67874aa5417835f": 113,
  "ef41aa181c1d4a72": 112,
  "fca05b39f595c8a9": 110,
  "395ddabe666886ea": 109,
  "7764ee494afd786f": 107,
  "f9b041d34af86ad4": 105,
  "84f6e7c870465272": 104,
  "7bb2b331e766b198": 102,
  "175c732116e152af": 102,
  "96a6ed3f16adf315": 101,
  "d981afaa24f1febd": 100
}
```

するとこのような感じになった。

一位の方が二位にほぼダブルスコアをつけており、ぶっちぎりであることがわかる。

ここまで差がつくのは単に上手いだけではなく、相当遊んでいないと達成できないと思われる。まさに異次元の記録と言えるだろう。

で、このプレイヤー ID だけではさっぱりわからないので任天堂の謹製 API を使ってプレイヤー情報を取得することにした。

### プレイヤー名を取得

プレイヤー名を取得するには`https://app.splatoon2.nintendo.net/api/nickname_and_icon`を GET すれば良い。

この API をコールするには`iksm_session`が必要になるので予め取得しておくこと。同時に 300 人くらいまではデータを取得できるので、今回のケースであれば一回叩くだけで良い。

## ランキング

面倒だったのでプログラムで一気に作成しました。

赤イクラも金イクラも全部混ぜての集計になっています。また、API でアカウント情報が取得できなかったユーザについては`DELETED USER`として掲載しています。

どういう条件で取得できなくなるのかはよくわかっていません(フレンドコードを変えた、とか？)

| 順位 | プレイヤー                                                                         | 回数 |
| ---- | ---------------------------------------------------------------------------------- | ---- |
| 1    | [DELETED USER](https://salmon-stats.yuki.games/players//a0720e1c8cecd9fc)          | 2841 |
| 2    | [マー](https://salmon-stats.yuki.games/players//b47e1fd7a7e6feb5)                  | 1498 |
| 3    | [メリカ](https://salmon-stats.yuki.games/players//27b314952c00c7fa)                | 1451 |
| 4    | [おかず](https://salmon-stats.yuki.games/players//f97303bd80834670)                | 1425 |
| 5    | [シミリー](https://salmon-stats.yuki.games/players//2da8bead36f8bdea)              | 916  |
| 6    | [ひよってるやついる？](https://salmon-stats.yuki.games/players//2e86f880e0fcdbcb)  | 882  |
| 7    | [Re:cön/なる](https://salmon-stats.yuki.games/players//a6698b80745752ab)           | 856  |
| 8    | [_YU:TO_](https://salmon-stats.yuki.games/players//0a14e929a0661370)               | 841  |
| 9    | [とんでますけど？](https://salmon-stats.yuki.games/players//059045d2e7825876)      | 734  |
| 10   | [ねごねご](https://salmon-stats.yuki.games/players//001bfbec9b904a71)              | 715  |
| 11   | [ヨハン](https://salmon-stats.yuki.games/players//66ffbce054aa5291)                | 693  |
| 12   | [ないと。](https://salmon-stats.yuki.games/players//4378ddb86f58882e)              | 639  |
| 13   | [さんどぱん](https://salmon-stats.yuki.games/players//aae300eb7db4f6dd)            | 637  |
| 14   | [y](https://salmon-stats.yuki.games/players//6e8f72d75edd68fd)                     | 627  |
| 15   | [1](https://salmon-stats.yuki.games/players//0dcabf1aa4e70f2e)                     | 623  |
| 16   | [や　　　　　　　　ま](https://salmon-stats.yuki.games/players//5db950fcf6763803)  | 613  |
| 17   | [ρδη](https://salmon-stats.yuki.games/players//635f96d0f8280edb)                   | 503  |
| 18   | [Kheels](https://salmon-stats.yuki.games/players//2f64b91c4ee5b9a4)                | 481  |
| 19   | [あおむぎ Q ようつべ L](https://salmon-stats.yuki.games/players//3d647759d2e3b0ee) | 472  |
| 20   | [Ricarnaldo](https://salmon-stats.yuki.games/players//cde7ed3fa44ad577)            | 434  |
| 21   | [みゆ/みき 78th](https://salmon-stats.yuki.games/players//93a486040cd7b375)        | 433  |
| 22   | [すごろく](https://salmon-stats.yuki.games/players//a81dc4e527e9fc9f)              | 395  |
| 23   | [Reyko](https://salmon-stats.yuki.games/players//3bf62ab1a934d7df)                 | 366  |
| 24   | [Sess](https://salmon-stats.yuki.games/players//b2da7c8ca0e06fa7)                  | 356  |
| 25   | [Leia](https://salmon-stats.yuki.games/players//788580029fe74552)                  | 350  |
| 26   | [SaMeet](https://salmon-stats.yuki.games/players//d0952b1f1b4394c1)                | 347  |
| 27   | [DELETED USER](https://salmon-stats.yuki.games/players//fd2c03a294d101cb)          | 343  |
| 28   | [あまねし～](https://salmon-stats.yuki.games/players//166e8815dd84dadb)            | 328  |
| 29   | [イカスミ P](https://salmon-stats.yuki.games/players//e59e183bcf4a4e3d)            | 313  |
| 30   | [ろみ](https://salmon-stats.yuki.games/players//ae570b2064d4b4b6)                  | 310  |
| 31   | [ju](https://salmon-stats.yuki.games/players//701f07f4f86556c0)                    | 298  |
| 32   | [coo](https://salmon-stats.yuki.games/players//55f850dd60952002)                   | 298  |
| 33   | [どしゃあ...](https://salmon-stats.yuki.games/players//36cfe58828c00e79)           | 293  |
| 34   | [ぶたごりら](https://salmon-stats.yuki.games/players//a8eebf9c682d5c17)            | 292  |
| 35   | [ろりぽっぷおーちゃん](https://salmon-stats.yuki.games/players//835dffa743851f8e)  | 290  |
| 36   | [ちはる](https://salmon-stats.yuki.games/players//dd84b53a5864e26e)                | 275  |
| 37   | [みさか](https://salmon-stats.yuki.games/players//cd0ec93f60bdacf2)                | 270  |
| 38   | [Heartly](https://salmon-stats.yuki.games/players//8b711d4fbffc31e7)               | 267  |
| 39   | [からん](https://salmon-stats.yuki.games/players//daf36b6006b5dae8)                | 264  |
| 40   | [かきぴーー！！](https://salmon-stats.yuki.games/players//d50a82bbc795da65)        | 247  |
| 41   | [けんしろ](https://salmon-stats.yuki.games/players//c2760ec31f3a186a)              | 238  |
| 42   | [みくり](https://salmon-stats.yuki.games/players//197bd49c4ad527a4)                | 235  |
| 43   | [にゃちょす](https://salmon-stats.yuki.games/players//0fc55140cd215f52)            | 234  |
| 44   | [ましゅううう](https://salmon-stats.yuki.games/players//c9b314aaf5114d31)          | 231  |
| 45   | [_O:CHAN_](https://salmon-stats.yuki.games/players//ea3c59657f0cdd6e)              | 225  |
| 46   | [ナトリウム/Kuli](https://salmon-stats.yuki.games/players//739f4a9b8e4d5e30)       | 224  |
| 47   | [ありた](https://salmon-stats.yuki.games/players//24bd527b3136d069)                | 223  |
| 48   | [HBee\*ちゃんゆり](https://salmon-stats.yuki.games/players//66d3f6c5c1ce879d)      | 221  |
| 49   | [ゆうひ](https://salmon-stats.yuki.games/players//4c2e448503020ad3)                | 198  |
| 50   | [hina_cks](https://salmon-stats.yuki.games/players//2325a6845a0e9963)              | 198  |
| 51   | [きせん](https://salmon-stats.yuki.games/players//250d09d5cc6c6819)                | 195  |
| 52   | [うっきぃ ë](https://salmon-stats.yuki.games/players//52d5c2d24314842a)            | 194  |
| 53   | [ー　ー](https://salmon-stats.yuki.games/players//2da02f4acf9dccfe)                | 184  |
| 54   | [ひっせーん](https://salmon-stats.yuki.games/players//5627919bb16897c4)            | 183  |
| 55   | [ばちばちのばちく](https://salmon-stats.yuki.games/players//4e217af8576c7364)      | 183  |
| 56   | [へんしんはやくしろ](https://salmon-stats.yuki.games/players//7c331ba2fff80f9f)    | 179  |
| 57   | [しゃけ](https://salmon-stats.yuki.games/players//0368add775b43c83)                | 178  |
| 58   | [けんけん](https://salmon-stats.yuki.games/players//759f8285abd07135)              | 176  |
| 59   | [spoxbox](https://salmon-stats.yuki.games/players//28e0c8f7df91f431)               | 174  |
| 60   | [ヒョルノのゲルバイト](https://salmon-stats.yuki.games/players//8ba9fb54040266bf)  | 173  |
| 61   | [さぽ](https://salmon-stats.yuki.games/players//9a3f401b4da33746)                  | 167  |
| 62   | [みっちょん\*はぴば](https://salmon-stats.yuki.games/players//19353ca34dffb164)    | 166  |
| 63   | [バネヤマ](https://salmon-stats.yuki.games/players//6c50aaccb889d227)              | 162  |
| 64   | [Hawken](https://salmon-stats.yuki.games/players//b2845a45750a76c8)                | 160  |
| 65   | [Noa](https://salmon-stats.yuki.games/players//d455dc3f1f32ce5d)                   | 159  |
| 66   | [esu](https://salmon-stats.yuki.games/players//23038a91b3db9351)                   | 156  |
| 67   | [きよたか](https://salmon-stats.yuki.games/players//26614a0c758671c3)              | 153  |
| 68   | [ろいない](https://salmon-stats.yuki.games/players//aa4fef305a92d234)              | 148  |
| 69   | [lemon tea](https://salmon-stats.yuki.games/players//41693115c16005cf)             | 145  |
| 70   | [ぺすけ](https://salmon-stats.yuki.games/players//0207ac94447f2565)                | 143  |
| 71   | [şëčðщ](https://salmon-stats.yuki.games/players//2ef1128dbe97ac33)                 | 127  |
| 72   | [ゆゆ/](https://salmon-stats.yuki.games/players//8693b36d8d6036c6)                 | 124  |
| 73   | [デミソース](https://salmon-stats.yuki.games/players//fffb476fad470432)            | 124  |
| 74   | [415](https://salmon-stats.yuki.games/players//efae74ec9920c457)                   | 124  |
| 75   | [ふぶき](https://salmon-stats.yuki.games/players//747b37c7b2f790bf)                | 123  |
| 76   | [チマ](https://salmon-stats.yuki.games/players//42e37bcfdb386e21)                  | 122  |
| 77   | [ぷらむ](https://salmon-stats.yuki.games/players//991bf232e9a2eabc)                | 120  |
| 78   | [alkali](https://salmon-stats.yuki.games/players//c6548d3466789c00)                | 119  |
| 79   | [ちゃ](https://salmon-stats.yuki.games/players//ff05b28c6138a248)                  | 119  |
| 80   | [ぴ](https://salmon-stats.yuki.games/players//4ecbdbad3b5fce72)                    | 118  |
| 81   | [あやねこ](https://salmon-stats.yuki.games/players//a773c9a9c4182410)              | 118  |
| 82   | [さとう](https://salmon-stats.yuki.games/players//0294ff3a62939a7a)                | 118  |
| 83   | [y](https://salmon-stats.yuki.games/players//f61adb7ca060ce99)                     | 115  |
| 84   | [と](https://salmon-stats.yuki.games/players//c67874aa5417835f)                    | 113  |
| 85   | [toru](https://salmon-stats.yuki.games/players//ef41aa181c1d4a72)                  | 112  |
| 86   | [4<"](https://salmon-stats.yuki.games/players//fca05b39f595c8a9)                   | 110  |
| 87   | [---](https://salmon-stats.yuki.games/players//395ddabe666886ea)                   | 109  |
| 88   | [taw](https://salmon-stats.yuki.games/players//7764ee494afd786f)                   | 107  |
| 89   | [ゆ](https://salmon-stats.yuki.games/players//f9b041d34af86ad4)                    | 105  |
| 90   | [えむいーのはか](https://salmon-stats.yuki.games/players//84f6e7c870465272)        | 104  |
| 91   | [だてんし ☆ きいと](https://salmon-stats.yuki.games/players//7bb2b331e766b198)     | 102  |
| 92   | [ここぴぃ](https://salmon-stats.yuki.games/players//175c732116e152af)              | 102  |
| 93   | [DJ Brian](https://salmon-stats.yuki.games/players//96a6ed3f16adf315)              | 101  |
| 94   | [AK\_めぐ](https://salmon-stats.yuki.games/players//d981afaa24f1febd)              | 100  |

::: warning 順位について

めんどかったので同率の場合は単にソート順で順位付けされてます。どっちかを贔屓してるとかではないのでお気になさらず。

:::

ここに載っているならちょっぴり自信を持ってもいいかも知れません。

記事は以上。

<Amazon />
