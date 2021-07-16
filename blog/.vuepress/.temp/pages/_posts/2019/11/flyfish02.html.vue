<template><h2 id="数値化してみる" tabindex="-1"><a class="header-anchor" href="#数値化してみる" aria-hidden="true">#</a> 数値化してみる</h2>
<p>で、これだけでもイマイチどのくらい得なのかがわかりにくいですよね。</p>
<p>というか、討伐推進派のぼくでさえどのくらい得かわかっていないので実際に数値化してみることにしましょう。</p>
<h3 id="綻びのない仮定" tabindex="-1"><a class="header-anchor" href="#綻びのない仮定" aria-hidden="true">#</a> 綻びのない仮定</h3>
<p>実はここが最も難しいところで、これが誤っているとすべての議論が数珠つなぎでおかしくなってしまいます。</p>
<p>つまり、難しくややこしい仮定を置くのはダメ。</p>
<p>また、運によってバラツキがあるものは大数の法則で収束すると考える。</p>
<p>例えば、カタパッドも近くのものと遠くのもので倒すのにかかる時間も、回収にかかる時間も変わりますよね？</p>
<p>このときに、最後にでたカタパッドが近い確率～なんてものを考える必要がないということです。「平均的にカタパッドは回収にこれだけ時間がかかる」としてしまえばいいのです。</p>
<p>で、ここで役に立つのが Salmon Stats で集めた統計データです。これから考えようとしているのは試行回数を増やせばどうなるかという話なので、すでにたくさんのデータがある Salmon Stats を利用すれば精度良く仮定が行えるはずです。</p>
<p>今回は最もデータ数の多かったシェケナダムについて分析しようと思います</p>
<p>さて、ここでちょっと難しい話になるのでよく考えながらきいてください。</p>
<p>さて、ものすごく誤解されていることの一つに「カタパッドは回収に時間がかかる」というのがあります。</p>
<p>これはある意味正解なのですが、よく考えればおかしなことがわかります。</p>
<p>というのも、テッパンやモグラが金イクラを回収しやすいとうのはあくまでもテッパンやのモグラをコンテナ近くまで連れてきているからです。</p>
<p>「そんなの当たり前じゃないか」と思うかもしれませんが、「寄せにかかる時間」というのを忘れてはいけないのです。</p>
<p>つまり、金イクラの回収には「コンテナ近くまで寄せるのにかかる時間」「倒すのにかかる時間」「倒した場所から金イクラを運ぶのにかかる時間」の三つを考える必要があるのです。</p>
<p><img src="https://pbs.twimg.com/media/E5kkB-CVgAA5GzR?format=png" alt=""></p>
<p>もしもオオモノが金イクラを一つしか落とさないのであれば、誘導という行為はシャケが近づくか、イカが近づくかの話になるのでシャケとイカの移動速度があまり変わらないことを考えると寄せる必要がないことが上の図からもわかります。</p>
<p><img src="https://pbs.twimg.com/media/E5kkDMeVEAcuMAt?format=png" alt=""></p>
<p>ところが、実際には皆さん知っての通りオオモノシャケは金イクラを三つ落とすので全部納品しようとすると回収する時間は三倍かかります。</p>
<p>つまり、なるべく回収時間を短くしたいわけですが、その方法が「オオモノをコンテナ近くまで誘導する」という行為なわけですね。</p>
<p>カタパッドやタワーが回収がめんどくさいと言われるのは、コンテナに寄らないために「金イクラを運ぶのにかかる時間」を短縮することができないからです。</p>
<ul>
<li>大雑把に評価した</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">討伐率</th>
<th style="text-align:center">納品数</th>
<th style="text-align:center">寄せ時間</th>
<th style="text-align:center">回収時間</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">バクダン</td>
<td style="text-align:center">92.2%</td>
<td style="text-align:center">2.0</td>
<td style="text-align:center">12.5</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">ヘビ</td>
<td style="text-align:center">96.7%</td>
<td style="text-align:center">2.0</td>
<td style="text-align:center">10</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">カタパッド</td>
<td style="text-align:center">50.5%</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
<td style="text-align:center">10</td>
</tr>
<tr>
<td style="text-align:center">タワー</td>
<td style="text-align:center">91.5%</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">0</td>
<td style="text-align:center">10</td>
</tr>
<tr>
<td style="text-align:center">テッパン</td>
<td style="text-align:center">90.7%</td>
<td style="text-align:center">2.5</td>
<td style="text-align:center">10</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">コウモリ</td>
<td style="text-align:center">75.7%</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">5</td>
<td style="text-align:center">5</td>
</tr>
<tr>
<td style="text-align:center">モグラ</td>
<td style="text-align:center">95.3%</td>
<td style="text-align:center">3</td>
<td style="text-align:center">6.25</td>
<td style="text-align:center">2</td>
</tr>
</tbody>
</table>
<p>回収時間はオオモノがコンテナに寄せる場合にかかる時間で、基本を 10 秒としてそこから倍率をかけて計算しました。</p>
<p>倍率は公式のデータなので嘘偽りなし。</p>
<p>今回はノルマ 25 の最も難しいケースについて、期待値を計算してみましょう。</p>
<h3 id="必要とされる回収率" tabindex="-1"><a class="header-anchor" href="#必要とされる回収率" aria-hidden="true">#</a> 必要とされる回収率</h3>
<p>本筋からは少し外れるのですが、どのくらい回収できたらクリアできるかを計算してみました。</p>
<p>ノルマ 25 ですとオオモノは 24 体出現するので、各オオモノの期待値はその 1/7 となります。つまり、各オオモノが 3.43 体くらいでるわけですね。</p>
<p>あとはそのオオモノ数に Salmon Stats から得られた討伐率と 3 をかければ、ドロップする金イクラの期待値が求まり、その値として 60.95 個が得られました。</p>
<p>要するにあんまりオオモノ倒せていないと思われる全プレイヤーの平均で計算しても、ノルマの倍以上の金イクラのドロップは見込めるわけです。</p>
<p>もちろん、キケン度の違いはあるので単純に比較はできないが。</p>
<p>ノルマ 25 でクリアに必要な回収率は約 41%！！</p>
<h3 id="回収にかかる時間" tabindex="-1"><a class="header-anchor" href="#回収にかかる時間" aria-hidden="true">#</a> 回収にかかる時間</h3>
<p>先程の大雑把な仮定から、倒したオオモノの金イクラをすべて回収するのにかかる時間を計算してみました。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">討伐率</th>
<th style="text-align:center">誘導</th>
<th style="text-align:center">回収</th>
<th style="text-align:center"> 三つ</th>
<th style="text-align:center">合計</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">バクダン</td>
<td style="text-align:center">9.48</td>
<td style="text-align:center">12.5</td>
<td style="text-align:center">2</td>
<td style="text-align:center">18.5</td>
<td style="text-align:center">58.48</td>
</tr>
<tr>
<td style="text-align:center">ヘビ</td>
<td style="text-align:center">9.94</td>
<td style="text-align:center">10</td>
<td style="text-align:center">2</td>
<td style="text-align:center">16</td>
<td style="text-align:center">53.04</td>
</tr>
<tr>
<td style="text-align:center">カタパッド</td>
<td style="text-align:center">5.19</td>
<td style="text-align:center">0</td>
<td style="text-align:center">10</td>
<td style="text-align:center">30</td>
<td style="text-align:center">51.94</td>
</tr>
<tr>
<td style="text-align:center">タワー</td>
<td style="text-align:center">9.41</td>
<td style="text-align:center">0</td>
<td style="text-align:center">10</td>
<td style="text-align:center">30</td>
<td style="text-align:center">94.11</td>
</tr>
<tr>
<td style="text-align:center">テッパン</td>
<td style="text-align:center">9.32</td>
<td style="text-align:center">10</td>
<td style="text-align:center">2</td>
<td style="text-align:center">16</td>
<td style="text-align:center">49.75</td>
</tr>
<tr>
<td style="text-align:center">コウモリ</td>
<td style="text-align:center">7.78</td>
<td style="text-align:center">5</td>
<td style="text-align:center">5</td>
<td style="text-align:center">20</td>
<td style="text-align:center">51.90</td>
</tr>
<tr>
<td style="text-align:center">モグラ</td>
<td style="text-align:center">9.80</td>
<td style="text-align:center">6.25</td>
<td style="text-align:center">2</td>
<td style="text-align:center">12.25</td>
<td style="text-align:center">40.02</td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center">60.9</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center">399.27</td>
</tr>
</tbody>
</table>
<p>結構時間かかるかなあと思ったのですが、全部で 399 秒でした。</p>
<p>「約 400 秒ってシフトは 100 秒しかないのに全然足りん！！」って思ったあなたは早計です。プレイヤーは四人いるので、実質 400 秒の活動時間があり、ギリギリ 60.95 個の納品が足ります。</p>
<p>もちろんこれは討伐にかかる時間などを考えていないのであくまでも理想論。</p>
<p>結構シビアな値がでたので、全部倒して全部回収してとなると各オオモノの出現数とかも大事ですね。</p>
<p>と、なんだか特に値を調整したりしたわけでもないのですが偶然にも MAX の全回収はギリギリできるかできないかのライン、という結論が得られました。</p>
<p>あながち最初に決めた仮定は外れているわけではなさそうです。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>カタパの話をしようとしたのに、前提条件と回収率の話がメインになってしまいました。</p>
<p>今回のことから言えるのは、</p>
<ul>
<li>必要な回収率は高々 41%なのでクリアできないわけがない
<ul>
<li>クリアできないのはオオモノが倒せていないから</li>
<li>要するに倒せていないのが悪い</li>
<li>オオモノを倒すのが何よりも大事</li>
</ul>
</li>
<li>時間的にも少なくとも 30 納品以上は見込める
<ul>
<li>なのに現実的にはギリギリなケースがある</li>
<li>納品も討伐もしていない時間を減らそう</li>
</ul>
</li>
<li>タワーとカタパは倒したときに 1 つ回収するだけで+7 の納品数が見込める
<ul>
<li>積極的に回収しよう</li>
</ul>
</li>
</ul>
<p>ということでしょうか。</p>
<p>とりあえず眠いので今日はこのあたりで筆を置きます。</p>
<p>記事は以上。</p>
</template>
