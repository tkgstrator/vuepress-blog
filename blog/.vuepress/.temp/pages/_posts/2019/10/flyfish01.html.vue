<template><h2 id="カタパッド片翼化" tabindex="-1"><a class="header-anchor" href="#カタパッド片翼化" aria-hidden="true">#</a> カタパッド片翼化</h2>
<p>カタパッドは両方の射出口（以下、両翼）が残っていると定期的に八つのマルチミサイルが射程無限でとんできてステージを塗るので放置しておくとプレイヤーの動きが極めて制限されてしまいます。つまり、片方でも落としておけば飛んでくるマルチミサイルが半分になるので、キケン度が半減するというわけですね。</p>
<p>しかも、同一オオモノは同時にステージ上に三体しか存在しないという制約があるので、片翼カタパッドを三体（ミサイル 12 発分）を放置するのは両翼カタパッド二体（ミサイル 16 発）を放置するよりも安全ということになるのです。</p>
<p>また、上限に達したオオモノシャケが更に出現しようとする場合、別のオオモノに変化することが知られています。</p>
<p>つまり、カタパッドを三体放置しておけば四体目のカタパッドがでるかわりにモグラやテッパンといった寄せやすいオオモノが出現するケースもあるということです。</p>
<p>一見するとメリットしかなさそうなこのカタパッド片翼戦術は広く知られていますが、果たしてどのくらい得なのでしょうか。</p>
<h2 id="カタパッドの基本性質" tabindex="-1"><a class="header-anchor" href="#カタパッドの基本性質" aria-hidden="true">#</a> カタパッドの基本性質</h2>
<p>まず最初に知っておかなければいけないのはカタパッドの性質についてである。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">SakelienCup</th>
<th style="text-align:center">SakelienCupTwin</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ターゲティング</td>
<td style="text-align:center">パス距離</td>
<td style="text-align:center">ユークリッド距離</td>
</tr>
<tr>
<td style="text-align:center">HP</td>
<td style="text-align:center">160</td>
<td style="text-align:center">360</td>
</tr>
<tr>
<td style="text-align:center">攻撃インターバル</td>
<td style="text-align:center">180F</td>
<td style="text-align:center">180F</td>
</tr>
</tbody>
</table>
<p>実はカタパッドは二つの別オオモノの扱いになっている。</p>
<p>HP を見ると Twin の方が HP が 360 となっているので、Twin が真ん中の操縦席に該当することになる。よって、二つの射出口（SakelienCup）+ 操縦席（SakelienCupTwin）という構成になっているということになる。</p>
<p>攻撃インターバルを見るとどちらも 180F なので 3 秒に一回攻撃を仕掛けてくるようだ。仮に 28 秒の段階でカタパッドを放置したとして、三体も残っていれば $9×12=108$ 発のミサイルで攻撃してくることになる。</p>
<h3 id="ターゲディング" tabindex="-1"><a class="header-anchor" href="#ターゲディング" aria-hidden="true">#</a> ターゲディング</h3>
<p>自分は検証していないので確信を持って言えないのだが、どうやら向かって右側の射出口がカタパッドに一番近いプレイヤーを狙い、左側の射出口が最も近いプレイヤー以外で生存しているプレイヤーからランダムに狙うらしい。</p>
<p>よって「仲間の邪魔になりがちな左側からボムを投げるほうが良い」と解説している記事やツイートをたまに見かける。</p>
<p>結論から言ってしまえば、そんなことを気にしている暇があったら入れられそうな方に入れてしまえばいい。左ばかりに意識が向いてしまってボム投げを外しているようでは本末転倒である。</p>
<p>何故なら最速で落とさない限りボムを入れた射出口もボムが爆発して破壊するまでにミサイルを撃たれてしまうためです。つまり、仲間にミサイルを落とさないようにするために左側を狙ったとしても、開いた瞬間に入れない限りは結局仲間にミサイルが飛んでいってしまうのです。悪く言えばどちらに入れるかを気づかうだけ無駄なので、入れやすい方に入れてしまうほうが絶対に良いです。</p>
<h3 id="同時出現数" tabindex="-1"><a class="header-anchor" href="#同時出現数" aria-hidden="true">#</a> 同時出現数</h3>
<p>先述したように、同一オオモノシャケは同時にステージ上に三体しか出現しないので四体目のカタパッドは絶対にでません。</p>
<p>じゃあもし四体目カタパッドがでる湧きだったとしたらどうなるんだろうということになりますが、これは制限に引っかかって出現できないオオモノの代わりに別のオオモノ（以下、代替オオモノ）がでてくることがイカッチャによる検証からわかっています。</p>
<p>ですが、この代替オオモノによるメリットは殆どありません。実際に、三体のカタパッドを片翼で放置し、四体目のカタパッドがモグラまたはテッパンに変化する確率を求めてみます。</p>
<p>まず、カタパッドが四体以上湧くような WAVE でない限りカタパッドを放置する意味がないのは明白です。発生し得ない代替オオモノを待っているのですから、アタリの入っていないクジを引き続けているようなものです。そして、たおしても全く問題がないにもかかわらず代替オオモノを期待して放置されている三体の片翼カタパッドが残り続けている状態がずっと続きます。</p>
<p>これだけでものすごいデメリットですが、これを上回るメリットがあれば良いわけですね。</p>
<p>では、カタパッドが四体以上出る確率を求めましょう。出現するオオモノが多ければ多いほど確率が上がるのですが、ここではオオモノ出現数が 20 以上のそこそこ難しいキケン度で考えてみます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">オオモノ出現数</th>
<th style="text-align:center">ノルマ</th>
<th style="text-align:center">カタパッドが四体以上出現する確率</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">20</td>
<td style="text-align:center">21</td>
<td style="text-align:center">31.7776%</td>
</tr>
<tr>
<td style="text-align:center">21</td>
<td style="text-align:center">22</td>
<td style="text-align:center">35.2324%</td>
</tr>
<tr>
<td style="text-align:center">22</td>
<td style="text-align:center">23</td>
<td style="text-align:center">38.6871%</td>
</tr>
<tr>
<td style="text-align:center">23</td>
<td style="text-align:center">24</td>
<td style="text-align:center">42.1159%</td>
</tr>
<tr>
<td style="text-align:center">24</td>
<td style="text-align:center">25</td>
<td style="text-align:center">45.4957%</td>
</tr>
</tbody>
</table>
<p>すると上のような表になりました。つまり、最も難しいキケン度 MAX のノルマ 25 であってもカタパッドが四体以上出現する確率は 50%を下回っているということになります。要するに、代替オオモノを期待してたおす余裕があるはずのカタパッドをわざわざ片翼で放置する作戦は 50%以上の確率で失敗するということです。</p>
<p>50%以上失敗する作戦を選択する意味があるでしょうか、という話になるわけです。</p>
<p>更にこの四体目以降のカタパッドがモグラやテッパンに変化しなければメリットとは言えません。</p>
<h2 id="メリットはどの程度のものか" tabindex="-1"><a class="header-anchor" href="#メリットはどの程度のものか" aria-hidden="true">#</a> メリットはどの程度のものか</h2>
<p>全通りを計算、掲載するのは面倒なのでキケン度 MAX、ノルマ 25 の場合だけ考えます。これが最も代替オオモノの期待値が高くなるので、それ以外のケースはこれよりも期待値が下がることを覚えておいてください。</p>
<table>
<thead>
<tr>
<th style="text-align:center">代替オオモノ数</th>
<th style="text-align:center">発生確率</th>
<th style="text-align:center">モグラやテッパンに変化する確率</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">54.5042%</td>
<td style="text-align:center">0%</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">20.2787%</td>
<td style="text-align:center">33.3333%</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">13.5191%</td>
<td style="text-align:center">55.5555%</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">7.1351%</td>
<td style="text-align:center">70.3703%</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">3.0579%</td>
<td style="text-align:center">80.2469%</td>
</tr>
</tbody>
</table>
<p>モグラやテッパンに変化する確率は、代替オオモノのうち最低でも一体がモグラかテッパンに変化する確率を求めました。モグラやテッパンが三体出現していないという状態であれば一体の代替オオモノがモグラやテッパンに変化する確率は 2/6 になります。</p>
<p>これは代替オオモノ数を n とすると $1-(\frac{4}{6})^n$ という計算式で求めることができます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">代替オオモノ</th>
<th style="text-align:center">発生確率</th>
<th style="text-align:center">変化確率</th>
<th style="text-align:center">期待確率</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">54.5042%</td>
<td style="text-align:center">0%</td>
<td style="text-align:center">0%</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">20.2787%</td>
<td style="text-align:center">33.3333%</td>
<td style="text-align:center">6.7595%</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">13.5191%</td>
<td style="text-align:center">55.5555%</td>
<td style="text-align:center">7.5106%</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">7.1351%</td>
<td style="text-align:center">70.3703%</td>
<td style="text-align:center">5.0209%</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">3.0579%</td>
<td style="text-align:center">80.2469%</td>
<td style="text-align:center">2.4538%</td>
</tr>
</tbody>
</table>
<p>となると、実際にそのようなおいしい代替オオモノが一体以上出現する WAVE の期待確率は上の表のようになります。</p>
<p>軒並み 10%を切っており、1 ~ 4 体の代替オオモノが出現するようなケースの合計をとっても 20%程度です。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>カタパッド片翼化に神聖視されるような効果はまったくない。たおす余裕があるならばたおしてしまったほうが絶対に楽で、確率的にも再湧きしてしまう可能性のほうが低い。</p>
<p>ただし、余裕がないのであればカタパッド自体は後回しでも大丈夫。そのときには最低でも片翼状態にしておきたい。</p>
<p>記事は以上。</p>
</template>
