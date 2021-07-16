<template><h2 id="大前提" tabindex="-1"><a class="header-anchor" href="#大前提" aria-hidden="true">#</a> 大前提</h2>
<p>以下に記す内容は「『倒せる』カタパッドを残す意味があるか」ということについて議論しています。</p>
<p>つまり「片翼を落として両翼のカタパッドが湧いたら困る」などという話ではありません。残すことにより、別のオオモノに変化したらどのくらい得をするのか、損をするのかということです。</p>
<p>最初にお断りしておくと、片翼のカタパッドを落とすかどうかはケースバイケースです。片翼のカタパッドは脅威が少ないので、倒す優先度としては正直低いです。他のオオモノがいるなら後回しでも全く問題ありません。コンテナ近くのヘビやバクダンの方がよほど手強い場合もあるでしょう。</p>
<p>繰り返しますが、カタパッドを倒せるだけの実力がある（たつじん 400 もあれば十分だと思います）プレイヤーが他にすることがあまりない状況で「わざわざ」片翼で放置する必要があるかという議論です。</p>
<p>よくわからん人や、結果だけ知りたい人は「結論」の章を見てください。</p>
<h3 id="筆者の意見" tabindex="-1"><a class="header-anchor" href="#筆者の意見" aria-hidden="true">#</a> 筆者の意見</h3>
<p>書くとめんどくさいのでチャートにしました。</p>
<p><img src="https://pbs.twimg.com/media/E5kjog-VEA0rUgZ?format=png" alt=""></p>
<p>あくまでも大雑把な目安で、臨機応変に切り替えることはお忘れなく。</p>
<h2 id="統計と用語" tabindex="-1"><a class="header-anchor" href="#統計と用語" aria-hidden="true">#</a> 統計と用語</h2>
<ul>
<li>生起確率</li>
</ul>
<p>ちょうどその数のカタパッドが出現する確率で、二項分布から求められます。</p>
<ul>
<li>回収率</li>
</ul>
<p>変化したテッパンやモグラの金イクラはかなり大雑把に 100%回収できるとします（もちろんそんなことはなく、どんなに高くても 90%くらいと予想）</p>
<p>通常潮のドンブラコや、ポラリスは 28 秒でテッパンやモグラがでても 100%の回収率は全然見込めないのですが、ここでは全部回収できるものとします。</p>
<ul>
<li>利得</li>
</ul>
<p>カタパッドを片翼で三つ残し続けたことにより、納品することが楽になった金イクラの期待値です。</p>
<p>当たり前ですが、カタパッドが三体以下なら利得は 0 です。</p>
<h3 id="おおざっぱな結果" tabindex="-1"><a class="header-anchor" href="#おおざっぱな結果" aria-hidden="true">#</a> おおざっぱな結果</h3>
<table>
<thead>
<tr>
<th style="text-align:center">N</th>
<th style="text-align:center">生起確率</th>
<th style="text-align:center">変化オオモノ数</th>
<th style="text-align:center">利得</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">0.024733</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">0.098932</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">0.18962</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">0.23176</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">0.20279</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">5</td>
<td style="text-align:center">0.13519</td>
<td style="text-align:center">2</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">6</td>
<td style="text-align:center">0.071351</td>
<td style="text-align:center">3</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">7</td>
<td style="text-align:center">0.030579</td>
<td style="text-align:center">4</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">8</td>
<td style="text-align:center">0.010830</td>
<td style="text-align:center">5</td>
<td style="text-align:center">5</td>
</tr>
</tbody>
</table>
<p>モグラかテッパンに変化する確率ですが、上限に達してこれ以上出現しないカタパッド以外から一つが決まるので簡単に求められます。これは残り六種類から二種類を選ぶので常に $\frac{1}{3}$ です。</p>
<p>要するに $\frac{1}{3}$ の確率で回収しやすいオオモノに変わり、倒せば三つ落とすということは期待値的には代替オオモノの数だけ余計に金イクラが稼げる計算になります。</p>
<p>わからん人のために説明すると、カタパッド出現する数を N とすれば、上限ストップで $N-3$ 体の代替オオモノが出現します。</p>
<p>よって、$(N-3)×\frac{1}{3}×3=N-3$</p>
<h3 id="数字のトリック" tabindex="-1"><a class="header-anchor" href="#数字のトリック" aria-hidden="true">#</a> 数字のトリック</h3>
<p>「カタパッドが五体出現するような WAVE で代替オオモノのうち一体がモグラになれば金イクラが三つ寄せられるので片翼作戦は優秀」という言葉は数字のトリックです。</p>
<p>計算上はカタパッドが五体でるような WAVE は 13%程度しか起こらず、二体出現する代替オオモノのどちらかがモグラになる可能性はこれより更に下がります。</p>
<p>極めて低い確率で高い利得が得られるのはハイリスクハイリターンであり、優秀な戦法とは言えません。</p>
<p>これは「カンケツセンの初手でコンテナ横を開けて当たれば、初手開けなので他のザコシャケは全くいない。邪魔する敵がいないのだからキンシャケを殴ることと納品に専念できるので 10 納品は手堅い。一回目で 10 納品できればノルマが 25 でもクリアはほぼ確実なのでカンケツセンの初手はコンテナ横をあけるべき」っていうくらいトンチンカンな論理です。</p>
<p>そりゃ当たればいいですが、当たらなかったらどうするんだよっていう話ですよね。</p>
<p>カンケツセン数はどのステージも 7 つ程度あるので、適当にあけて当たる確率は 14%程度です。これは偶然にもカタパッドが五体出現する確率に近いです。</p>
<p>カタパッド片翼放置でのモグラ・テッパン化によるメリットはカンケツセン初手コンテナ横開けと同じくらいの価値ということです。</p>
<h3 id="考察" tabindex="-1"><a class="header-anchor" href="#考察" aria-hidden="true">#</a> 考察</h3>
<p>まず最初に申し上げたいのは「キケン度 MAX のノルマ 25 においても」、カタパッドの出現数が三体以下である確率は 54.504%もあります。</p>
<p>言い換えれば片翼にして寄せやすいオオモノに変化させようという試みは 50%以上失敗するということです。</p>
<p>ぼくが片翼放置を推奨しない最大の理由がこれです。半分以上失敗するなら、逆張りしたほうが良くないですか？</p>
<p>四体カタパッドが出現する場合、ようやく得をします。このとき得られる金イクラの期待値はわずか一つ！！</p>
<p>これなら最初の方に出た（まだシャケがごった返してない）カタパッドを倒して金イクラを二つ運び、残りの三体を片翼した方がいいじゃん。</p>
<p>つまり、片翼戦法をするにしてもカタパッドが四体だけ出現する場合（もちろんそれを事前に知ることはできない）は「最初の一体を落として」から残りを放置した方がいいわけです。</p>
<p>この作戦については次章で考察。</p>
<p>当たり前ですが、ノルマは先にクリアしておいたほうがいいので「終盤に代替オオモノで湧いたモグラで最後の一つのノルマが足りた」と「前半にカタパを落として一つ運んだからノルマが足りていた」というのは明らかに後者のほうがいいわけです。</p>
<p>なぜなら、前者は終盤の動きが束縛される（誰かがモグラをコンテナに寄せた上で、倒して一つ運ばなくてはいけない）ですが、後者はそうでないからです（四人のうち誰かが生存していればいい）</p>
<p>サーモンランにおいて最も大事なのはデスしないことでも、オオモノを討伐することでもなく、ノルマを達成することなのですから。</p>
<p>WAVE 開始直後に湧いたカタパッドは三つの納品が手堅いのですから、片翼放置戦法をするにしても最初の一体は倒した方が得になる確率が高いです。</p>
<p>ちなみにカタパッドが七体以上出現するなら片翼放置による期待値が 3 を超えるので得になります。</p>
<p>じゃあそれぞれの作戦の期待値を考えよう！！</p>
<h2 id="結論" tabindex="-1"><a class="header-anchor" href="#結論" aria-hidden="true">#</a> 結論</h2>
<p>結局、数字で言ったほうがわかりやすいので数字で説明しようと思います。</p>
<p>というか、この章だけ見れば片翼原理主義がどのくらいもったいないことをしているかわかるようになっています。</p>
<h3 id="三つの作戦" tabindex="-1"><a class="header-anchor" href="#三つの作戦" aria-hidden="true">#</a> 三つの作戦</h3>
<ul>
<li>完全片翼主義</li>
</ul>
<p>初手も含めてすべてのカタパッドを片翼のまま放置します。</p>
<p>28 秒ルールから、残り 28 秒以下になればカタパッドを落とすことも許されますが、代替モグラやテッパンが寄らなくなると困るので拾いにいかないことを前提としています。</p>
<ul>
<li>初手以外片翼主義</li>
</ul>
<p>初手（WAVE の初期）だけはカタパッドを倒して三つの金イクラを運び、それ以後はカタパッドを倒さない戦略です。</p>
<p>初手を落とす以外は原理主義と同じです。</p>
<ul>
<li>全討伐主義</li>
</ul>
<p>カタパッドをどんどん倒していきますが、倒したときに最低でも一つは金イクラを運びます。</p>
<p>最初の一体だけは三つ全て運べると仮定します。</p>
<h2 id="結果" tabindex="-1"><a class="header-anchor" href="#結果" aria-hidden="true">#</a> 結果</h2>
<table>
<thead>
<tr>
<th style="text-align:center">カタパ数</th>
<th style="text-align:center">確率</th>
<th style="text-align:center">完全片翼</th>
<th style="text-align:center">初手以外</th>
<th style="text-align:center">全討伐</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">2.473%</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">9.893%</td>
<td style="text-align:center">0*</td>
<td style="text-align:center">3</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">18.96%</td>
<td style="text-align:center">0*</td>
<td style="text-align:center">3*</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">23.18%</td>
<td style="text-align:center">0*</td>
<td style="text-align:center">3*</td>
<td style="text-align:center">5</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">20.28%</td>
<td style="text-align:center">1</td>
<td style="text-align:center">3</td>
<td style="text-align:center">6</td>
</tr>
<tr>
<td style="text-align:center">5</td>
<td style="text-align:center">13.52%</td>
<td style="text-align:center">2</td>
<td style="text-align:center">4</td>
<td style="text-align:center">7</td>
</tr>
<tr>
<td style="text-align:center">6</td>
<td style="text-align:center">7.135%</td>
<td style="text-align:center">3</td>
<td style="text-align:center">5</td>
<td style="text-align:center">8</td>
</tr>
<tr>
<td style="text-align:center">7</td>
<td style="text-align:center">1.083%</td>
<td style="text-align:center">4</td>
<td style="text-align:center">6</td>
<td style="text-align:center">9</td>
</tr>
</tbody>
</table>
<p>*付きは「損」を表しています。例えば三体以上カタパッドが出ないなら、完全片翼の作戦はただ損をするだけです。</p>
<p>当たり前ですが、全討伐が一番金イクラが稼げます。しかも全部討伐していれば納品のじゃまになるオオモノがいないのですから、最後にオオモノが出現してそれを倒せば残りの 20 秒くらいはひたすら納品できます。</p>
<p>これが最もクリアに近い戦法であるのは間違いありません。</p>
<p>しかし、オオモノの湧きの順やプレイングミス・連携ミスで全討伐できないケースは多々あります。また、オオモノを倒すのが苦手という方もいるでしょう。</p>
<p>その場合、カタパッドを片翼で放置するという戦略も考えられますが、それでも最初の一体（残り時間が 70 秒程度ある場合が望ましい）だけは絶対に倒したほうが得です。</p>
<ul>
<li>完全片翼主義について</li>
</ul>
<p>この戦法は 52.01%の確率で、出現しない代替オオモノを待つというデメリットしかない結果を招きます。</p>
<p>出てこないものを待つのですから、当たりが入っていないくじを引いているようなものです。</p>
<p>カタパッドの出現数が四体以上になれば代替オオモノによるメリットが受けられますが、表を見ればわかるように他の作戦と比べて特に優秀と言うわけではないです。</p>
<ul>
<li>初手以外片翼について</li>
</ul>
<p>基本戦略は完全片翼主義と変わらないものの、効率がいい作戦であることがわかります。</p>
<p>全討伐が難しいなら、この作戦が一番ベターかもしれませんね。</p>
<h3 id="ボム一つで得られる金イクラ数" tabindex="-1"><a class="header-anchor" href="#ボム一つで得られる金イクラ数" aria-hidden="true">#</a> ボム一つで得られる金イクラ数</h3>
<p>戦略の性能を測る指標として、インク消費量における金イクラの個数も重要でしょう。</p>
<p>少ないインク消費量で金イクラを稼げるほうが戦略として優秀なのは明らかだからです。</p>
<p><img src="https://pbs.twimg.com/media/E5kkF9FUcAEuuza?format=png" alt=""></p>
<p>X 軸が 1 つズレているので、1 ってなっているところはカタパッド出現数が 0 という意味です。</p>
<p>完全片翼はカタパッド数が 3 までは全く得をしないのでインク効率は 0 です。全討伐は最初以外は倒しても一つしかイクラを運ばない仮定をしているので、だんだん効率が悪くなっていきます。</p>
<p>全討伐が倒しつつ運べるという点で理想的な（現実的に行えるかは別として）戦略であるのに対して、初手以外戦法が極めて効率が良い戦略であることがわかりますね。</p>
<p>うーん、やっぱり初手は倒した方がいいですね、これ。</p>
<p>もちろん実際には、初手以外戦法は片翼カタパッドのミサイルというデメリットがあるので単純比較は無理です。ただ、金イクラのインク効率という点だけで見れば理想的な値に近く、優秀な作戦であることがわかります。</p>
<p>カタパッドの数が増えれば、カタパッドを全然倒さない完全片翼主義の効率が上がってきますが、ここで「その事象がどのくらい起こるか」ということも加味しなければいけません。</p>
<p>カタパッドが 24 体出現する WAVE であれば完全片翼は最も優秀な作戦ですが、そんな WAVE は現実的にほとんどありえないからです。</p>
<p>つまり、「よく起こりそうな WAVE で」「効率がいい」作戦こそが優秀というわけですね。</p>
<p><img src="https://pbs.twimg.com/media/E5kkHWxVUAAT4bd?format=png" alt=""></p>
<p>カタパッドが出現する確率も加味すると、ますます初手以外戦法の優秀さが明らかになってきますね。</p>
<p>これ、わざわざ完全片翼する必要あるでしょうか...</p>
<p>これ本当は極限を求めて積分しないと数学的にきっちりと比較はできない。めんどくさくてやってないけど、誰かやってほしい。</p>
<p>mathematica とか matlab があれば多分できる。</p>
<p>完全片翼主義は、最も起こりやすいカタパッドの出現数が 3 ~ 4 のあたりでメリットが全然ないのがつらいところです。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>片翼をするかどうかは、フリーランスでやるなら仲間の実力を見極めてからやるべし。仲間を無視してガンガン落としてると、落とした金イクラは運ばないし、再出現したカタパは片翼にすらしないしみたいな状況になってしまう。</p>
<p>フレンドでやるなら、討伐に自信があるなら（Salmon Stats で討伐平均 11 ~ 12 以上あるなら）カタパッドは落としていったほうが多分楽。10 を切っている人がいるなら、臨機応変に切り替えたほうが良い。</p>
<p>片翼戦法でいく場合も最初のカタパッドは必ず倒して必ず三つ運べ。</p>
<p>倒せるなら倒したほうが得なので、できる限り両翼落とそう。</p>
<p>記事は以上。</p>
</template>
