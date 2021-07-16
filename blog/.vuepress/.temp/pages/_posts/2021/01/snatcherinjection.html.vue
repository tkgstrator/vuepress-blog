<template><h2 id="割り込み効果" tabindex="-1"><a class="header-anchor" href="#割り込み効果" aria-hidden="true">#</a> 割り込み効果</h2>
<p>ラッシュイベントは本来であればキンシャケは最大でも 30 体しか出現しないのだが、タマヒロイを湧かせることでキンシャケが出現するまでの間隔を短くすることができ、結果としてキンシャケ出現数を増やすことができる。</p>
<p>ラッシュにおいてキンシャケ出現数を増やす方向に働く効果はこの割り込みしか存在しないので、ラッシュで如何に稼ぐかというのはとどのつまりはどうやれば効率的にタマヒロイを割り込ませることができるかという問題に帰結するわけである。</p>
<h2 id="検証の困難性" tabindex="-1"><a class="header-anchor" href="#検証の困難性" aria-hidden="true">#</a> 検証の困難性</h2>
<p>とはいうものの、ラッシュでいくつ金イクラを放置してタマヒロイを割り込ませればいいのかというのは非常に難しい問題である。</p>
<p>というのも「どういう状況であれば割り込みが発生するのか」ということが全く分かっていないためである。さらに言えば、一定の個数の金イクラを放置し続けないといけないということはキンシャケをたおしたときに発生する金イクラを 0 にしなければいけません。</p>
<p>キンシャケは他のオオモノシャケと違って 1 × 3 の金イクラをドロップするため、普段使っているパッチではドロップ個数を 0 にすることはできません、困った。</p>
<p>そこで今回はキンシャケのドロップ個数を変えるのではなく、フィールドに存在できる金イクラの数自体に制限をかけて、それ以上ドロップしないようにしました。本来、この値は 96 で普通に遊んでいる限りは絶対に上限に引っかからないのですが、その数値を敢えて低く設定しようというわけです。</p>
<h2 id="検証してみた" tabindex="-1"><a class="header-anchor" href="#検証してみた" aria-hidden="true">#</a> 検証してみた</h2>
<p>検証の方法としては、金イクラを N 個フィールドに放置したまま超広範囲の効果時間が極めて長いジェットパックのジェットでリスキルをするという方法を試みた。</p>
<p>この手法の良いところはジェットパック状態であればシャケの攻撃を全く受けず、ジェットでシャケを攻撃するためにプレイヤーが操作する必要がなく、何度やってもほとんど同じ環境をつくることができる点である。</p>
<p>また、100 秒という短い時間では今回のような確率を伴うデータを正しく検証できないと考え、1WAVE の長さを 600 秒にすることでサンプルを平坦化した。</p>
<h3 id="潮位とイベントの制御" tabindex="-1"><a class="header-anchor" href="#潮位とイベントの制御" aria-hidden="true">#</a> 潮位とイベントの制御</h3>
<p>イベントは SeedHack を使って WAVE1 が満潮ラッシュとなるような WAVE を厳選した。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// SeedHack [tkgling]
@disabled
00208C74 C07280D2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>潮位に関してはこれも同じようにシード厳選をしても良かったのだが、完全に同一の条件にしたかったため Starlight の Realtime EventChanger を使って強制的に潮位を切り替えた。</p>
<h3 id="時間変更" tabindex="-1"><a class="header-anchor" href="#時間変更" aria-hidden="true">#</a> 時間変更</h3>
<p>100 秒では割り込みの成否の運に左右されすぎるので、1WAVE あたりの長さを 6 倍の 600 秒として運の要素を可能な限り下げた。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change WaveTotalFrame [tkgling]
@disabled
005975F8 00949152
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="無操作切断チェック" tabindex="-1"><a class="header-anchor" href="#無操作切断チェック" aria-hidden="true">#</a> 無操作切断チェック</h3>
<p>スプラトゥーンでは 60 秒間の無操作が続くと、強制的に通信が切断されてしまうためそれらを無効化するパッチを当てました。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Disable MovelessPlayerChecker [tkgling]
@disabled
00DD5F14 09C28152
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="湧き方向固定化" tabindex="-1"><a class="header-anchor" href="#湧き方向固定化" aria-hidden="true">#</a> 湧き方向固定化</h3>
<p>Starlight からも固定化はできるのだが、めんどくさかったのでファイルを作成して RomFS で対応することにした。</p>
<p><code>Coop_levels.bprm</code>内の<code>76f4783c</code>の値を 1 に変更することで湧き方向を固定化することができる。</p>
<h3 id="ジェットパックのパラメータ変更" tabindex="-1"><a class="header-anchor" href="#ジェットパックのパラメータ変更" aria-hidden="true">#</a> ジェットパックのパラメータ変更</h3>
<p>以下のように設定し、実質的な無限ジェッパとジェットパックのジェットによるリスキルを行った。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">111ebbaf</td>
<td style="text-align:center">100</td>
</tr>
<tr>
<td style="text-align:center">22d7439b</td>
<td style="text-align:center">18</td>
</tr>
<tr>
<td style="text-align:center">35580034</td>
<td style="text-align:center">300000</td>
</tr>
<tr>
<td style="text-align:center">7dc0fbab</td>
<td style="text-align:center">300000</td>
</tr>
<tr>
<td style="text-align:center">b52074db</td>
<td style="text-align:center">300000</td>
</tr>
<tr>
<td style="text-align:center">f8cd525c</td>
<td style="text-align:center">600</td>
</tr>
</tbody>
</table>
<h2 id="予想される理論値" tabindex="-1"><a class="header-anchor" href="#予想される理論値" aria-hidden="true">#</a> 予想される理論値</h2>
<p>ラッシュのパラメータは完全解析できているので、600 秒あれば 30 × 6 = 180 体のキンシャケが出現しなければいけない。</p>
<p>タマヒロイは 213F に一回リスポーンするはずなので、600 秒（36000F）最適なリスキルができていれば放置してある金イクラの数 × 169 体のタマヒロイが湧くはずである。</p>
<p>今回は、満潮のラッシュが何故か稼げないことで有名なトキシラズいぶし工房に絞って検証を行った。</p>
<h3 id="通常潮位の場合" tabindex="-1"><a class="header-anchor" href="#通常潮位の場合" aria-hidden="true">#</a> 通常潮位の場合</h3>
<table>
<thead>
<tr>
<th style="text-align:center">NT</th>
<th style="text-align:center">Goldie</th>
<th style="text-align:center">Snatcher</th>
<th style="text-align:center">Power Eggs</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">N=0</td>
<td style="text-align:center">178</td>
<td style="text-align:center">0</td>
<td style="text-align:center">20299</td>
</tr>
<tr>
<td style="text-align:center">N=1</td>
<td style="text-align:center">178</td>
<td style="text-align:center">136</td>
<td style="text-align:center">21105</td>
</tr>
<tr>
<td style="text-align:center">N=5</td>
<td style="text-align:center">175</td>
<td style="text-align:center">672</td>
<td style="text-align:center">24289</td>
</tr>
<tr>
<td style="text-align:center">N=10</td>
<td style="text-align:center">192</td>
<td style="text-align:center">1344</td>
<td style="text-align:center">28555</td>
</tr>
<tr>
<td style="text-align:center">N=15</td>
<td style="text-align:center">190</td>
<td style="text-align:center">1983</td>
<td style="text-align:center">32338</td>
</tr>
<tr>
<td style="text-align:center">N=19</td>
<td style="text-align:center">157</td>
<td style="text-align:center">2524</td>
<td style="text-align:center">35125</td>
</tr>
</tbody>
</table>
<p>タマヒロイを湧かせない場合はほぼ理論値の 178 体のキンシャケをたおすことができた。また、足りない 2 体についても 1 体はこちらに向かってきていたが削りきれず、もう 1 体は出現した瞬間にタイムアップとなるので実質 180 体全ての位置は把握できた格好になる。</p>
<p>N=1 ではキンシャケ撃破数こそ同じものの出現ペースは少し遅いように感じた。N=5 になると「ここはキンシャケがでていないな」という間を感じる場面もあった。結果も 175 と、3 体少ないものとなってしまった。</p>
<p>このまま減っていくかと思われたが、なんと N=10 のケースで 192 体出現という、意外すぎる結果を得た。N=15 のときは 100 秒時点では 34 体出現という超ハイペースだったが、上振れだったのか後半は虚無の時間が目立ち、最終的には 190 体出現にとどまった。</p>
<h2 id="結果からわかること" tabindex="-1"><a class="header-anchor" href="#結果からわかること" aria-hidden="true">#</a> 結果からわかること</h2>
<p>ここで注意していただきたいのは、今回の結果がすなわち「金イクラは残せば残すだけ良い」ということにはならないということである、何故か？</p>
<p>というのも、このタマヒロイの割り込みによる効果は「金イクラを放置した数」ではなく「タマヒロイをたおすペース」に依存しているからだ。実際のプレイでは無限ジェッパのようにタマヒロイを極めて効率的にリスキルすることは不可能である。</p>
<p>今回の結果からわかることは 600 秒で 1344 体のタマヒロイをたおすペース（100 秒で 224 体）であれば、600 秒で 12 体のキンシャケを得することを期待しても良さそうだということである。</p>
<h3 id="現実的な値に変換してみる" tabindex="-1"><a class="header-anchor" href="#現実的な値に変換してみる" aria-hidden="true">#</a> 現実的な値に変換してみる</h3>
<p>狙い目となるのは N=10 を実際のプレイで再現することである。</p>
<p>N=9 とか N=11 でもっと良い結果が得られるかもしれないが、今回は N=10 を再現することを目標とする。</p>
<table>
<thead>
<tr>
<th style="text-align:center">NT</th>
<th style="text-align:center">Goldie</th>
<th style="text-align:center">Snatcher</th>
<th style="text-align:center">Power Eggs</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">N=10</td>
<td style="text-align:center">32</td>
<td style="text-align:center">224</td>
<td style="text-align:center">4759</td>
</tr>
</tbody>
</table>
<p>ここでまず注目すべきは赤イクラ数 4759 である。87 納品のときでさえ 3469 しか赤イクラを稼げなかったのにこれよりも更に 1300 も稼がなくてはいけないことになる。赤イクラを稼ぐことが目的ではないといえ、かなり稼ぐプレイが求められるのは間違いない。</p>
<p>では、どうすればタマヒロイを 224 回たおすことができるかということだが、仮に出現してから 1 秒でタマヒロイをたおせる環境だったとしよう。すると本来 213F でリスポーンするタマヒロイが平均して 273F で再湧きするわけである。</p>
<p>ラッシュの最初のキンシャケがきて撃破し、金イクラをドロップさせるまでに 10 秒かかるとすると、実際にタマヒロイをリスキルできるのは残りの 90 秒ということになる。</p>
<p><img src="https://pbs.twimg.com/media/EsdcB-nU0AA1RXj?format=png" alt=""></p>
<p>そこでタマヒロイをたおすまでの要フレームと放置すべき金イクラの数をグラフにしたものが上のものになる。</p>
<p>ここから「ジェットパックのリスキルでも平均して 25F 程度はかかっていそう」ということがわかる。実際にはこれよりももっともっと時間がかかるので 60F 以上と考えても問題なさそうだ。となると、11 ~ 12 個放置しておくというのが良さそうだということになる。</p>
<p>体感的にはもっと少ないほうが上手く割り込みさせられていた気がするので、これは意外な結果になりました。次回やるときは、このくらい放置するのを実際に試してみたいと思います。</p>
<p>記事は以上。</p>
</template>
