<template><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>だるまっちょさんがサーモンランプレイ中に不思議な現象に遭遇したという。</p>
<blockquote class="twitter-tweet tw-align-center"><p lang="ja" dir="ltr">意味わかんないww<br>ハコビヤかと思ったらヘビとかタワー出てくるし、ダメージあたえてもあいつ(ハコビヤ)帰らないしww<br>そこそこサーモンやってるけどはじめてだわ！<br> <a href="https://twitter.com/hashtag/Splatoon2?src=hash&amp;ref_src=twsrc%5Etfw">#Splatoon2</a> <a href="https://twitter.com/hashtag/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%88%E3%82%A5%E3%83%BC%E3%83%B32?src=hash&amp;ref_src=twsrc%5Etfw">#スプラトゥーン2</a> <a href="https://twitter.com/hashtag/NintendoSwitch?src=hash&amp;ref_src=twsrc%5Etfw">#NintendoSwitch</a> <a href="https://t.co/SUGXYN1EVj">pic.twitter.com/SUGXYN1EVj</a></p>&mdash; だるまっちょ (@zeinikkudaruma) <a href="https://twitter.com/zeinikkudaruma/status/1353509847321300993?ref_src=twsrc%5Etfw">January 25, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<p>見てみると、本来シャケコプター以外が出現しないはずのハコビヤイベントにおいてヘビが出現しており、イベントがバグっていることがわかる。</p>
<p>実は同様の現象は比較的簡単に発生させられるのだが、だるまっちょさんも仰られるように「そこそこプレイしているけどこんな現象は見たことがない」という人が多いのではないだろうか。</p>
<p>簡単に発生するにも関わらず、このバグを未体験の人が多いのはなぜか。</p>
<p>本記事では発生原因とその理由について解説したいと思う。</p>
<h2 id="バグ発生の仕組み" tabindex="-1"><a class="header-anchor" href="#バグ発生の仕組み" aria-hidden="true">#</a> バグ発生の仕組み</h2>
<p>では、何故このようなバグが発生するのかを簡単に説明しよう。</p>
<p>まず知っておいてほしいのは、マッチングが開始した瞬間に初期シードによって WAVE3 までのイベントと潮位は決定しているということだ。</p>
<p>以下の動画を見ればわかるが、暗転してステージが映った瞬間に左上に WAVE1 から WAVE3 までの全情報が表示されていることがわかる。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">Tide</th>
<th style="text-align:center">Event</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">WAVE1</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">干潮イベントなし</td>
</tr>
<tr>
<td style="text-align:center">WAVE2</td>
<td style="text-align:center">2</td>
<td style="text-align:center">0</td>
<td style="text-align:center">満潮イベントなし</td>
</tr>
<tr>
<td style="text-align:center">WAVE3</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">通常ラッシュ</td>
</tr>
</tbody>
</table>
<p>これが俗に言う WAVE 内容の先読みであり、基本的にはこの先読みした WAVE 情報通りに実際の WAVE は変化していく。</p>
<p>だが、これが異なるケースがあるのだ。</p>
<h3 id="先読み-wave-と実際の-wave" tabindex="-1"><a class="header-anchor" href="#先読み-wave-と実際の-wave" aria-hidden="true">#</a> 先読み WAVE と実際の WAVE</h3>
<p>先程の動画をもう一度見ると、先読み WAVE 情報とは別に Next という値があり、それは画面が再度暗転してイカちゃんがステージに飛んでくるまで決定しないことがわかる。</p>
<p>そして大事なことは、実際に潮位やイベントを司っているのは先読み WAVE の情報ではなく Next の値なのである。</p>
<p>Next の値を使うなら最初に計算する意味は何なのだという気もするが、最初に計算される WAVE3 までの値は初期シードから考えられる「理想状態」における潮位とイベントの組み合わせだということだ。</p>
<p>ここでいう「理想状態」とは「プレイヤーのレートの合計が 1200 以上でワンオペではない」という状態を指す。</p>
<table>
<thead>
<tr>
<th style="text-align:center">ランク</th>
<th style="text-align:center">レート</th>
<th style="text-align:center">累計</th>
<th style="text-align:center">キケン度</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">かけだし</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0%</td>
</tr>
<tr>
<td style="text-align:center">はんにんまえ</td>
<td style="text-align:center">0</td>
<td style="text-align:center">100</td>
<td style="text-align:center">20%</td>
</tr>
<tr>
<td style="text-align:center">いちにんまえ</td>
<td style="text-align:center">0</td>
<td style="text-align:center">200</td>
<td style="text-align:center">40%</td>
</tr>
<tr>
<td style="text-align:center">じゅくれん</td>
<td style="text-align:center">0</td>
<td style="text-align:center">300</td>
<td style="text-align:center">60%</td>
</tr>
<tr>
<td style="text-align:center">たつじん</td>
<td style="text-align:center">0</td>
<td style="text-align:center">400</td>
<td style="text-align:center">80%</td>
</tr>
<tr>
<td style="text-align:center">たつじん</td>
<td style="text-align:center">600</td>
<td style="text-align:center">1000</td>
<td style="text-align:center">200%</td>
</tr>
</tbody>
</table>
<p>注意すべき点としては、たつじん 40 は内部的にはレート 440 として計算されているということだ。</p>
<p>つまり、四人の平均レートがじゅくれん以上ということは $300×4=1200$ となるわけである。</p>
<p>この条件を満たすときに限り、最初に計算した WAVE 情報がそのまま実際の WAVE の内容として反映されるのである。</p>
<p>例えば、途中で WAVE1 の途中で回線落ちが発生してワンオペになってしまったとしよう。ワンオペは理想状態を満たさないので、先読み WAVE とは異なるイベントが発生する。結論から言えば、ワンオペでは絶対にイベントが発生せず、昼のみとなるのである。</p>
<h3 id="wave-切替時のチェック" tabindex="-1"><a class="header-anchor" href="#wave-切替時のチェック" aria-hidden="true">#</a> WAVE 切替時のチェック</h3>
<p>サーモンランにおける WAVE 情報の決定のアルゴリズムは以下の通りである。</p>
<ol>
<li>マッチング開始時に WAVE 情報を先読みする</li>
<li>プレイヤーがスポーン地点に戻るたびに先読み WAVE 情報を読み込む</li>
<li>先読み WAVE と現在のプレイヤーの状況をチェックする</li>
<li>再現不可能な WAVE であれば、WAVE 内容を再計算する</li>
</ol>
<p>この再現不可能な WAVE というのが、ワンオペでイベントが発生しない場合などを指す。</p>
<p>そして、再計算される場合に「現在のプレイヤーの合計レートでイベントを計算する」というのが、このバグの最大の原因となっている。</p>
<table>
<thead>
<tr>
<th style="text-align:center">ランク</th>
<th style="text-align:center">合計レート</th>
<th style="text-align:center">ラッシュ</th>
<th style="text-align:center">キンシャケ探し</th>
<th style="text-align:center">グリル発進</th>
<th style="text-align:center">ハコビヤ襲来</th>
<th style="text-align:center">霧</th>
<th style="text-align:center">ドスコイ大量発生</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">かけだし</td>
<td style="text-align:center">0</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">はんにんまえ</td>
<td style="text-align:center">400</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">-</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">-</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">いちにんまえ</td>
<td style="text-align:center">800</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">-</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">-</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
<tr>
<td style="text-align:center">じゅくれん</td>
<td style="text-align:center">1200</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
<tr>
<td style="text-align:center">たつじん</td>
<td style="text-align:center">1600</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
</tbody>
</table>
<p>というのも、合計レートの値によって「イベントが発生するかどうか」が切り替わってしまうためである。</p>
<p>たとえば先程のだるまっちょさんの画像で言えば WAVE3 が 3 オペでノルマ 7 ということは、四人であれば $\frac{7}{3}×4=9.33$ なので本来のノルマは 10 であることがわかる。</p>
<p>そして、本来のノルマが 10 ということは<a href="https://wikiwiki.jp/splatoon2mix/%E3%82%B5%E3%83%BC%E3%83%A2%E3%83%B3%E3%83%A9%E3%83%B3#f8d72024" target="_blank" rel="noopener noreferrer">Wiki<OutboundLink/></a>にもあるように、レートの高い一人が抜けてしまったことにより三人のレート合計が「いちにんまえ」にまで落ちてしまっているということがわかる。</p>
<p>そして、上の表にあるようにいちにんまえでは「ハコビヤ襲来」イベントが発生しないため、あのツイートのようにイベントがバグってしまうのである。</p>
<h2 id="何故このバグは珍しいのか" tabindex="-1"><a class="header-anchor" href="#何故このバグは珍しいのか" aria-hidden="true">#</a> 何故このバグは珍しいのか</h2>
<p>理由の一つは、回線落ちのタイミングが重要になってくるためである。</p>
<p>以下がおおよそのサーモンランのおけるイベント発生までの流れである。</p>
<ol>
<li>プレイヤーがスポーン地点に戻るエフェクト</li>
<li>先読み WAVE と比較し、異常がなければ実際の WAVE 情報とする</li>
<li>イベントが発生するなら、オブジェクトの準備が行われる
<ol>
<li>ラッシュであればヒカリバエ</li>
<li>ハコビヤであれば母艦出現</li>
<li>霧であれば霧がかかる等</li>
</ol>
</li>
<li>同時に潮位の変更が行われる</li>
<li>カウントダウンの 10 が表示される
<ol>
<li>この時点で WAVE が決定し、変えることはできなくなる</li>
</ol>
</li>
<li>0 の瞬間にイベント（があれば）スタートする</li>
</ol>
<p>先読み WAVE から実際の WAVE に反映されるのはリスポーン地点に戻るエフェクトがでてから、カウントダウンの 10 が読み上げられるまでの間である。</p>
<p>回線落ちが早すぎると単に合計レートが下がってしまい、ハコビヤ襲来の代わりのイベントが正しく再計算されてハコビヤの母艦は出現せず再計算されたイベント（再計算の上でイベントなしになることもある）が発生する。</p>
<p>回線落ちが遅すぎると三オペで正常なハコビヤ襲来イベントをこなすことになる。</p>
<p>また、回線落ちのタイミングがこの範囲内に収まっていても、一瞬で落ちるとすぐに再計算されて正しく修正されてしまう。じわじわと通信不安定を発生させて落ちないとバグは発生しない。</p>
<h3 id="レートを下げるのが難しい" tabindex="-1"><a class="header-anchor" href="#レートを下げるのが難しい" aria-hidden="true">#</a> レートを下げるのが難しい</h3>
<p>もう一つ、このバグがお目にかかれない理由としてプレイヤーの合計レートが 1199 以下にならなければこのバグ自体が発生しないというのがある。</p>
<p>しかし、これはなかなか難しくワンオペであればそもそもイベントは発生しないので確認しようがない。仮に三人でレート 1199 以下にしようとすると一人あたりは 400 以下でないといけない。400 以下というのは「たつじん 0」に相当するが、Twitter などで活動されている方はこれよりも遥かに高いレートをキープしている。一人の回線落ち程度ではそもそもバグが発生するほどレートを下げれないというわけだ。</p>
<p>二オペであればどうかという話になるが、この場合は一人あたりレート 600 なので「たつじん 200」に相当する。現在のサーモンランはたつじん 400 を引き継いだまま次回のバイトに移れるので、たつじん 200 以下でキープしている方というのも珍しいだろう。</p>
<h2 id="実は潮位もバグる" tabindex="-1"><a class="header-anchor" href="#実は潮位もバグる" aria-hidden="true">#</a> 実は潮位もバグる</h2>
<p>ごはんのおかずさんが遭遇したバグであるが、これは三オペノルマ 5 であり、本来のノルマは $\frac{5}{3}×4=6.67$ で 7 であることがわかる。</p>
<p>そして、ノルマ 7 というのはやはり「いちにんまえ」相当になり、バグ発生の条件を満たす。</p>
<p>@<a href="https://www.youtube.com/watch?v=bHPvxE_LSUo" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>今回の記事では省略したが、実はイベント以外にも潮位の発生率がじゅくれんとそれ以下で変わってくるため、潮位でもこのように非同期が発生します。</p>
<p>くれぐれもみなさんは意図して回線を落としたりしないように。</p>
<p>記事は以上。</p>
</template>
