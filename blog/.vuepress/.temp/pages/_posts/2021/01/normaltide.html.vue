<template><h2 id="誰向けなの" tabindex="-1"><a class="header-anchor" href="#誰向けなの" aria-hidden="true">#</a> 誰向けなの</h2>
<p>スイッチを改造できて、自分でシードを設定できる方向けです。</p>
<p>うちの記事読んでて、これができそうなの五人くらいしかいなさそうなので需要は全くなさそうなのだが、せっかくなので研究した成果を発表しておく。</p>
<h2 id="シード厳選" tabindex="-1"><a class="header-anchor" href="#シード厳選" aria-hidden="true">#</a> シード厳選</h2>
<p>まず最初に、72 納品をしようとおもったら WAVE3 が通常潮位のイベントなしである必要がある。</p>
<p>ところが、通常潮位のイベントなしというのは $\frac{3}{4}×\frac{3}{5}=\frac{9}{20}$ の確率で発生する。</p>
<p>全通りが 43 億もあるので、$\frac{9}{20}$ に減らした程度では候補が多すぎて Python で細かい厳選が行えないのだ。そこで今回は C++のプログラムに改良を加え「WAVE3 が通常潮位イベントなし + カタパ出現しない + タワー出現しない」という風に制約をつけて出力できるようにした。</p>
<h3 id="出現するオオモノで絞る" tabindex="-1"><a class="header-anchor" href="#出現するオオモノで絞る" aria-hidden="true">#</a> 出現するオオモノで絞る</h3>
<p>七種類のオオモノのうち、二種類が常にでないということは五種類から出続けるということなので、</p>
<p>そのシードの期待値は全体のおよそ $(\frac{5}{7})^{24}=0.00031111943$ と見積もることができる。</p>
<p>となれば、通常イベントなしがくる確率 $\frac{9}{20}$ と合わせて、全体の 0.00014000374 程度になるはずである。ここまで確率を減らせれば候補を十分絞ることができ、</p>
<p>$2^{32}×(\frac{5}{7})^{24}×\frac{9}{20}=601311.512458$ と、約 60 万通りほど残るのではないかという予想が立てられる。</p>
<p>実際、プログラムを動かしたところ 609829 通りのシードを得ることができた。</p>
<p>少し見積もりよりも大きくなったが、スプラトゥーンの疑似乱数生成器が偏りを含むものなのでまあまあ精度良く予測できたと言ってよいだろう。</p>
<h3 id="オオモノの詰まりで絞る" tabindex="-1"><a class="header-anchor" href="#オオモノの詰まりで絞る" aria-hidden="true">#</a> オオモノの詰まりで絞る</h3>
<p>さて、オオモノ出現アルゴリズムが完全解析されたので、初期シードからオオモノが湧く順番は完全に予測可能なのだが、これはあくまでも「何も不測の事態が起こらなかったときのオオモノの湧き順」であり、状況によっては計算結果とズレることがある。</p>
<p>それが同一オオモノの存在上限であり、四体目のオオモノを出現させようとすると別のオオモノが出現してしまい、それ以後の計算が合わなくなってしまうという問題がある。</p>
<p>満潮などではなかなか気にすることもないのだが、通常潮位の場合はオオモノが寄ってくるのに時間がかかるため、ここは厳しく見積もらないとせっかく簡単だと思って試したシードで「オオモノが詰まってしまい全く理想の WAVE と異なる状態になってしまった」という悲惨な状況を招きかねない。</p>
<p>特に、ポラリスなどではモグラでさえも寄せるのに時間がかかるので、モグラに対しても 20 秒の猶予を与えた。</p>
<p>20 秒の猶予があるというのは「100 秒間の WAVE の長さのうちどこの 20 秒をとってもモグラが 4 体存在しているような湧き順がない」ということを意味する。</p>
<p>この猶予が長くなれば長くなるほど、移動速度が遅く詰まりやすいオオモノであるといえるわけである。</p>
<p><a href="https://gungeespla.github.io/salmon_route/" target="_blank" rel="noopener noreferrer">サーモンラン ルートマップ<OutboundLink/></a></p>
<p>どのオオモノが寄ってくるまでにどのくらい時間がかかるかは、実際に計測しても良かったのだがめんどくさかったので<a href="https://twitter.com/GungeeSpla" target="_blank" rel="noopener noreferrer">@GungeeSpla<OutboundLink/></a>氏が作成したサーモンランルートマップを利用した。</p>
<p>それによると 3 湧きのバクダンがコンテナに寄るまでに最も時間がかかり、約 40 秒かかることがわかった。その他のオオモノは全て 30 秒以内に寄ってきているので、バクダンだけがぶっちぎりで遅いわけである。</p>
<p>30 秒以内に寄るのであれば、猶予は 30 秒あればいいので、ここではカタパッドとタワーを除いたオオモノの猶予時間を以下のように設定した。</p>
<table>
<thead>
<tr>
<th style="text-align:center">猶予</th>
<th style="text-align:center">オオモノの種類</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">20 秒以内</td>
<td style="text-align:center">モグラ</td>
</tr>
<tr>
<td style="text-align:center">30 秒</td>
<td style="text-align:center">テッパン <br> ヘビ <br> コウモリ</td>
</tr>
<tr>
<td style="text-align:center">40 秒</td>
<td style="text-align:center">バクダン</td>
</tr>
</tbody>
</table>
<p>この湧き間隔制約をつけた上で、先程絞ったシードからどのくらい減らせるかが問題になるわけである。</p>
<p>その結果、16564 通りのシード表を得ることができました。</p>
<h3 id="後半の湧き方向で絞る" tabindex="-1"><a class="header-anchor" href="#後半の湧き方向で絞る" aria-hidden="true">#</a> 後半の湧き方向で絞る</h3>
<p>ではここから更に絞っていくことにしましょう。</p>
<p>先程、最も遠いバクダンは寄せに 40 秒かかるとしましたが、これが正しければ 7 回目の湧き変化（38 秒）や 8 回目の湧き変化（28 秒）でバクダンが出現してしまうと寄せが間に合わないことになります。</p>
<p>2 湧きや 3 湧きでは最も遠いバクダンが出現してしまう可能性があるので、バクダンが出現するのは一番近い 1 湧きで固定したいわけです。</p>
<p>例外的にドンブラコだけは 1 湧きが最も遠く、3 湧きが最も近くなる（なんでやねん）</p>
<p>ただし、あんまりきつい制約をつけると一気に候補が減ってしまうので柔軟に対応する必要があります。そこで今回は「7 回目の湧き変化は 1 湧き（最も近い）」「8 回目の湧き変化はどこでもいいがモグラが出現する」という風にしました。</p>
<p>すると 882 通りのシード表を得ることができました。</p>
<h3 id="コウモリを減らして絞る" tabindex="-1"><a class="header-anchor" href="#コウモリを減らして絞る" aria-hidden="true">#</a> コウモリを減らして絞る</h3>
<p>コウモリが出現すると、（特にポラリスでは）誘導がめんどくさいことになるので、コウモリは後半には湧かないようにしてみました。</p>
<p>すると、2 通りまで絞ることができました。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>02CBBA0A
B5A17BC6
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>このどっちかで 72 納品ができるといいなあ、なんて思っていたりします。</p>
<p>ちなみにドンブラコの場合は 7 回目は 1 湧きではなく 3 湧きの方が得なので、次のシードになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>033D3BEF
604E20CB
A676A682
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="ipswitch" tabindex="-1"><a class="header-anchor" href="#ipswitch" aria-hidden="true">#</a> IPSwitch</h2>
<p>せっかくなので、直ぐに使える IPSwitch 形式のコードも置いておきます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// NT WAVE3 Polaris
@disabled
00208C74 6059A0D2404197F2

// NT WAVE3 Polaris
@disabled
00208C74 20B4B6D2C0788FF2

// NT WAVE3 Polaris
@disabled
00208C74 20C7B0D2A07D93F2

// NT WAVE3 Bay
@disabled
00208C74 A067A0D2E07D87F2

// NT WAVE3 Bay
@disabled
00208C74 C009ACD2601984F2

// NT WAVE3 Bay
@disabled
00208C74 C0CEB4D240D094F2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>最新のバージョンのアドレスははナイショですが、GHIDRA でうまいこと検索したらすぐに見つかります。</p>
<p>5.3.0 までのアドレスはこの<a href="https://github.com/tkgstrator/StarlightSeedHack/blob/master/ReadMe.md#apply-for-ipswitch" target="_blank" rel="noopener noreferrer">ReedMe<OutboundLink/></a>から確認できるので、その辺を調べてみてください。</p>
<p>バグかはしりませんが、このパッチを当てた状態でイカッチャで三つ目のステージを遊ぶと必ずクラッシュします。なぜなのかはわかりません。</p>
</template>
