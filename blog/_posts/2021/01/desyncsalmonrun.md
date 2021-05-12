---
title: 回線落ちでサーモンランのイベントがバグる原因について
date: "2021-01-25"
category: Splatoon2
---

## 背景

だるまっちょさんがサーモンランプレイ中に不思議な現象に遭遇したという。

https://twitter.com/zeinikkudaruma/status/1353509847321300993

見てみると、本来シャケコプター以外が出現しないはずのハコビヤイベントにおいてヘビが出現しており、イベントがバグっていることがわかる。

実は同様の現象は比較的簡単に発生させられるのだが、だるまっちょさんも仰られるように「そこそこプレイしているけどこんな現象は見たことがない」という人が多いのではないだろうか。

簡単に発生するにも関わらず、このバグを未体験の人が多いのはなぜか。

本記事では発生原因とその理由について解説したいと思う。

## バグ発生の仕組み

では、何故このようなバグが発生するのかを簡単に説明しよう。

まず知っておいてほしいのは、マッチングが開始した瞬間に初期シードによって WAVE3 までのイベントと潮位は決定しているということだ。

以下の動画を見ればわかるが、暗転してステージが映った瞬間に左上に WAVE1 から WAVE3 までの全情報が表示されていることがわかる。

<table><tbody><tr><td class="has-text-align-center" data-align="center"></td><td class="has-text-align-center" data-align="center">Tide</td><td class="has-text-align-center" data-align="center">Event</td><td class="has-text-align-center" data-align="center">意味</td></tr><tr><td class="has-text-align-center" data-align="center">WAVE1</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">干潮イベントなし</td></tr><tr><td class="has-text-align-center" data-align="center">WAVE2</td><td class="has-text-align-center" data-align="center">2</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">満潮イベントなし</td></tr><tr><td class="has-text-align-center" data-align="center">WAVE3</td><td class="has-text-align-center" data-align="center">1</td><td class="has-text-align-center" data-align="center">1</td><td class="has-text-align-center" data-align="center">通常ラッシュ</td></tr></tbody></table>

これが俗に言う WAVE 内容の先読みであり、基本的にはこの先読みした WAVE 情報通りに実際の WAVE は変化していく。

だが、これが異なるケースがあるのだ。

### 先読み WAVE と実際の WAVE

先程の動画をもう一度見ると、先読み WAVE 情報とは別に Next という値があり、それは画面が再度暗転してイカちゃんがステージに飛んでくるまで決定しないことがわかる。

そして大事なことは、実際に潮位やイベントを司っているのは先読み WAVE の情報ではなく Next の値なのである。

Next の値を使うなら最初に計算する意味は何なのだという気もするが、最初に計算される WAVE3 までの値は初期シードから考えられる「理想状態」における潮位とイベントの組み合わせだということだ。

ここでいう「理想状態」とは「プレイヤーのレートの合計が 1200 以上でワンオペではない」という状態を指す。

<table><tbody><tr><td class="has-text-align-center" data-align="center">ランク</td><td class="has-text-align-center" data-align="center">レート</td><td class="has-text-align-center" data-align="center">累計</td><td class="has-text-align-center" data-align="center">キケン度</td></tr><tr><td class="has-text-align-center" data-align="center">かけだし</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">0%</td></tr><tr><td class="has-text-align-center" data-align="center">はんにんまえ</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">100</td><td class="has-text-align-center" data-align="center">20%</td></tr><tr><td class="has-text-align-center" data-align="center">いちにんまえ</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">200</td><td class="has-text-align-center" data-align="center">40%</td></tr><tr><td class="has-text-align-center" data-align="center">じゅくれん</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">300</td><td class="has-text-align-center" data-align="center">60%</td></tr><tr><td class="has-text-align-center" data-align="center">たつじん</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">400</td><td class="has-text-align-center" data-align="center">80%</td></tr><tr><td class="has-text-align-center" data-align="center">たつじん</td><td class="has-text-align-center" data-align="center">600</td><td class="has-text-align-center" data-align="center">1000</td><td class="has-text-align-center" data-align="center">200%</td></tr></tbody></table>

注意すべき点としては、たつじん 40 は内部的にはレート 440 として計算されているということだ。

つまり、四人の平均レートがじゅくれん以上ということは 300\*4=1200 となるわけである。

この条件を満たすときに限り、最初に計算した WAVE 情報がそのまま実際の WAVE の内容として反映されるのである。

例えば、途中で WAVE1 の途中で回線落ちが発生してワンオペになってしまったとしよう。ワンオペは理想状態を満たさないので、先読み WAVE とは異なるイベントが発生する。結論から言えば、ワンオペでは絶対にイベントが発生せず、昼のみとなるのである。

### WAVE 切替時のチェック

サーモンランにおける WAVE 情報の決定のアルゴリズムは以下の通りである。

1. マッチング開始時に WAVE 情報を先読みする
2. プレイヤーがスポーン地点に戻るたびに先読み WAVE 情報を読み込む
3. 先読み WAVE と現在のプレイヤーの状況をチェックする
4. 再現不可能な WAVE であれば、WAVE 内容を再計算する

この再現不可能な WAVE というのが、ワンオペでイベントが発生しない場合などを指す。

そして、再計算される場合に「現在のプレイヤーの合計レートでイベントを計算する」というのが、このバグの最大の原因となっている。

<table><tbody><tr><td class="has-text-align-center" data-align="center">ランク</td><td class="has-text-align-center" data-align="center">合計レート</td><td class="has-text-align-center" data-align="center">ラッシュ</td><td class="has-text-align-center" data-align="center">キンシャケ探し</td><td class="has-text-align-center" data-align="center">グリル発進</td><td class="has-text-align-center" data-align="center">ハコビヤ襲来</td><td class="has-text-align-center" data-align="center">霧</td><td class="has-text-align-center" data-align="center">ドスコイ大量発生</td></tr><tr><td class="has-text-align-center" data-align="center">かけだし</td><td class="has-text-align-center" data-align="center">0</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">はんにんまえ</td><td class="has-text-align-center" data-align="center">400</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">いちにんまえ</td><td class="has-text-align-center" data-align="center">800</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td></tr><tr><td class="has-text-align-center" data-align="center">じゅくれん</td><td class="has-text-align-center" data-align="center">1200</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td></tr><tr><td class="has-text-align-center" data-align="center">たつじん</td><td class="has-text-align-center" data-align="center">1600</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td></tr></tbody></table>

というのも、合計レートの値によって「イベントが発生するかどうか」が切り替わってしまうためである。

たとえば先程のだるまっちょさんの画像で言えば WAVE3 が 3 オペでノルマ 7 ということは、四人であれば 7/3\*4=9.33 なので本来のノルマは 10 であることがわかる。

そして、本来のノルマが 10 ということは[サーモンラン Wiki](https://wikiwiki.jp/splatoon2mix/%E3%82%B5%E3%83%BC%E3%83%A2%E3%83%B3%E3%83%A9%E3%83%B3#f8d72024)にもあるように、レートの高い一人が抜けてしまったことにより三人のレート合計が「いちにんまえ」にまで落ちてしまっているということがわかる。

そして、上の表にあるようにいちにんまえでは「ハコビヤ襲来」イベントが発生しないため、あのツイートのようにイベントがバグってしまうのである。

## 何故このバグは珍しいのか

理由の一つは、回線落ちのタイミングが重要になってくるためである。

以下がおおよそのサーモンランのおけるイベント発生までの流れである。

1. プレイヤーがスポーン地点に戻るエフェクト
2. 先読み WAVE と比較し、異常がなければ実際の WAVE 情報とする
3. イベントが発生するなら、オブジェクトの準備が行われる
   1. ラッシュであればヒカリバエ
   2. ハコビヤであれば母艦出現
   3. 霧であれば霧がかかる等
4. 同時に潮位の変更が行われる
5. カウントダウンの 10 が表示される
   1. この時点で WAVE が決定し、変えることはできなくなる
6. 0 の瞬間にイベント（があれば）スタートする

先読み WAVE から実際の WAVE に反映されるのはリスポーン地点に戻るエフェクトがでてから、カウントダウンの 10 が読み上げられるまでの間である。

回線落ちが早すぎると単に合計レートが下がってしまい、ハコビヤ襲来の代わりのイベントが正しく再計算されてハコビヤの母艦は出現せず再計算されたイベント（再計算の上でイベントなしになることもある）が発生する。

回線落ちが遅すぎると三オペで正常なハコビヤ襲来イベントをこなすことになる。

また、回線落ちのタイミングがこの範囲内に収まっていても、一瞬で落ちるとすぐに再計算されて正しく修正されてしまう。じわじわと通信不安定を発生させて落ちないとバグは発生しない。

### レートを下げるのが難しい

もう一つ、このバグがお目にかかれない理由としてプレイヤーの合計レートが 1199 以下にならなければこのバグ自体が発生しないというのがある。

しかし、これはなかなか難しくワンオペであればそもそもイベントは発生しないので確認しようがない。仮に三人でレート 1199 以下にしようとすると一人あたりは 400 以下でないといけない。400 以下というのは「たつじん 0」に相当するが、Twitter などで活動されている方はこれよりも遥かに高いレートをキープしている。一人の回線落ち程度ではそもそもバグが発生するほどレートを下げれないというわけだ。

二オペであればどうかという話になるが、この場合は一人あたりレート 600 なので「たつじん 200」に相当する。現在のサーモンランはたつじん 400 を引き継いだまま次回のバイトに移れるので、たつじん 200 以下でキープしている方というのも珍しいだろう。

## 実は潮位もバグる

ごはんのおかずさんが遭遇したバグであるが、これは三オペノルマ 5 であり、本来のノルマは 5/3\*6=6.67 で 7 であることがわかる。

そして、ノルマ 7 というのはやはり「いちにんまえ」相当になり、バグ発生の条件を満たす。

https://www.youtube.com/watch?v=bHPvxE\_LSUo

今回の記事では省略したが、実はイベント以外にも潮位の発生率がじゅくれんとそれ以下で変わってくるため、潮位でもこのように非同期が発生します。

くれぐれもみなさんは意図して回線を落としたりしないように。

記事は以上。