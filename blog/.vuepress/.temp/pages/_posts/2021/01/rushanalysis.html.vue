<template><h2 id="湧き方向とドロップ個数" tabindex="-1"><a class="header-anchor" href="#湧き方向とドロップ個数" aria-hidden="true">#</a> 湧き方向とドロップ個数</h2>
<p>半径 600DU のジェットパックのジェットでタマヒロイやシャケを出現した瞬間にリスキルして、理想的な間引き環境を再現することを目的とした。</p>
<p>@<a href="https://www.youtube.com/watch?v=kqBfu25_t8A" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>全域ではないものの、かなり広範囲が射程内になっているためこれでリスキルできないような状況は発生しないと考えられるが...</p>
<p>この状況下で、それぞれの湧き方向と金イクラのドロップ数を変えることでどのようにキンシャケ出現数が変化するかを調べた。</p>
<h3 id="ドロップ数が-0-の場合" tabindex="-1"><a class="header-anchor" href="#ドロップ数が-0-の場合" aria-hidden="true">#</a> ドロップ数が 0 の場合</h3>
<p>何故かはわからないが、3 湧きが絶望的な遅さになった。シャケとタマヒロイのレートは 19 になるはずなのだが、実際に 19 付近をうろうろしていたのでキンシャケが消えているわけではないようだ。</p>
<table>
<thead>
<tr>
<th style="text-align:center">通常</th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
<th style="text-align:center">理論値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">キンシャケ数</td>
<td style="text-align:center">177</td>
<td style="text-align:center">179</td>
<td style="text-align:center">80</td>
<td style="text-align:center">180</td>
</tr>
<tr>
<td style="text-align:center">タマヒロイ</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">3410</td>
<td style="text-align:center">3416</td>
<td style="text-align:center">1499</td>
<td style="text-align:center">3600</td>
</tr>
<tr>
<td style="text-align:center">赤イクラ</td>
<td style="text-align:center">20243</td>
<td style="text-align:center">20302</td>
<td style="text-align:center">8935</td>
<td style="text-align:center">20340</td>
</tr>
<tr>
<td style="text-align:center">詰まり</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">80.4%</td>
<td style="text-align:center">0.0%</td>
</tr>
</tbody>
</table>
<p>試しに上限の 32 体に引っかかっているフレーム数を計算したところ、なんと 600 秒（36000F）のうち 80%近くも上限に引っかかっていることが分かった。</p>
<p>しかも気になるのはどう見てもシャケが詰まっているようには見えないというところである。これはトキシラズの 3 湧きがバグっていると言われても仕方がない気がする。</p>
<p>なんと<a href="https://twitter.com/workingAllDay" target="_blank" rel="noopener noreferrer">@workingAllDay<OutboundLink/></a>氏が同じような検証をしていてくれた。</p>
<p>やはり 3 湧きのシャケが湧いているはずなのに見えない状態（地形に埋まっているか、オブジェクトの隙間から落下している可能性が高い）になっているようだ。</p>
<p>ハイパープレッサーでリスキルできることから、どこかのくぼみに引っかかっている可能性もある。</p>
<table>
<thead>
<tr>
<th style="text-align:center">満潮</th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
<th style="text-align:center">理論値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">キンシャケ数</td>
<td style="text-align:center">177</td>
<td style="text-align:center">179</td>
<td style="text-align:center">79</td>
<td style="text-align:center">180</td>
</tr>
<tr>
<td style="text-align:center">タマヒロイ</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">3410</td>
<td style="text-align:center">3394</td>
<td style="text-align:center">1476</td>
<td style="text-align:center">3600</td>
</tr>
<tr>
<td style="text-align:center">赤イクラ</td>
<td style="text-align:center">20243</td>
<td style="text-align:center">20192</td>
<td style="text-align:center">8804</td>
<td style="text-align:center">20340</td>
</tr>
<tr>
<td style="text-align:center">詰まり</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">1.49%</td>
<td style="text-align:center">80.20%</td>
<td style="text-align:center">0.0%</td>
</tr>
</tbody>
</table>
<p>満潮の場合においては 2 湧きもわずかに詰まることが確認されたが、通常と同様に 3 湧きはやはり 80% 以上も詰まることが明らかになった。</p>
<p>ただ、実際には金イクラのドロップが発生するのでそれによって出現するタマヒロイがラッシュを加速させたりしてより複雑になるはずだ。</p>
<p>今回はそれも加えて検証することにした。</p>
<h3 id="ドロップ数が-9-の場合" tabindex="-1"><a class="header-anchor" href="#ドロップ数が-9-の場合" aria-hidden="true">#</a> ドロップ数が 9 の場合</h3>
<p>まずは、トキシラズ通常 2 湧きが最も加速する 9 個ドロップを試すことにした。</p>
<table>
<thead>
<tr>
<th style="text-align:center">通常</th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
<th style="text-align:center">理論値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">キンシャケ数</td>
<td style="text-align:center">173</td>
<td style="text-align:center">207</td>
<td style="text-align:center">62</td>
<td style="text-align:center">180</td>
</tr>
<tr>
<td style="text-align:center">タマヒロイ</td>
<td style="text-align:center">1138</td>
<td style="text-align:center">1215</td>
<td style="text-align:center">1105</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">3413</td>
<td style="text-align:center">3391</td>
<td style="text-align:center">1092</td>
<td style="text-align:center">3600</td>
</tr>
<tr>
<td style="text-align:center">赤イクラ</td>
<td style="text-align:center">27026</td>
<td style="text-align:center">27974</td>
<td style="text-align:center">13206</td>
<td style="text-align:center">20340</td>
</tr>
<tr>
<td style="text-align:center">詰まり</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">84.35%</td>
<td style="text-align:center">0.0%</td>
</tr>
</tbody>
</table>
<p>すると、1 湧きではほとんど割り込みの効果が得られず、3 湧きはキンシャケの出現数が更に減る結果となった。3 湧きがダメダメなことはまあおいとくとして、1 湧きと 2 湧きの差はどこから生まれたのだろう？</p>
<table>
<thead>
<tr>
<th style="text-align:center">満潮</th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
<th style="text-align:center">理論値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">キンシャケ数</td>
<td style="text-align:center">206</td>
<td style="text-align:center">131</td>
<td style="text-align:center">132</td>
<td style="text-align:center">180</td>
</tr>
<tr>
<td style="text-align:center">タマヒロイ</td>
<td style="text-align:center">1217</td>
<td style="text-align:center">1217</td>
<td style="text-align:center">1212</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">3393</td>
<td style="text-align:center">2287</td>
<td style="text-align:center">2975</td>
<td style="text-align:center">3600</td>
</tr>
<tr>
<td style="text-align:center">赤イクラ</td>
<td style="text-align:center">27978</td>
<td style="text-align:center">21104</td>
<td style="text-align:center">24569</td>
<td style="text-align:center">20340</td>
</tr>
<tr>
<td style="text-align:center">詰まり</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">52.32%</td>
<td style="text-align:center">23.34%</td>
<td style="text-align:center">0.0%</td>
</tr>
</tbody>
</table>
<p>満潮の場合では経験則上 2 湧きが全然稼げないことはわかっていたが、実際にやってみると想像以上に稼げないことがわかった。</p>
<p>また、金イクラをドロップさせておくと 3 湧きも何もしない場合よりかはキンシャケが出現することがわかった。LanPlay でもトキシラズ満潮ラッシュの記録は全 3 湧きで達成されていることからも、信憑性がある結果となった。</p>
<h2 id="ポラリスでも実験してみた" tabindex="-1"><a class="header-anchor" href="#ポラリスでも実験してみた" aria-hidden="true">#</a> ポラリスでも実験してみた</h2>
<p>3.1.0 では朽ちた方舟ポラリスが実装されていないのだが、強制的にトキシラズいぶし工房のモデルデータを上書きすることで実装した。</p>
<p>通常潮位はやる気が起きなかったので、満潮だけで検証することにした。</p>
<table>
<thead>
<tr>
<th style="text-align:center">通常</th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
<th style="text-align:center">理論値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">キンシャケ数</td>
<td style="text-align:center">170</td>
<td style="text-align:center">182</td>
<td style="text-align:center">181</td>
<td style="text-align:center">180</td>
</tr>
<tr>
<td style="text-align:center">タマヒロイ</td>
<td style="text-align:center">1080</td>
<td style="text-align:center">1115</td>
<td style="text-align:center">1057</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">3424</td>
<td style="text-align:center">3417</td>
<td style="text-align:center">3421</td>
<td style="text-align:center">3600</td>
</tr>
<tr>
<td style="text-align:center">赤イクラ</td>
<td style="text-align:center">26666</td>
<td style="text-align:center">27058</td>
<td style="text-align:center">26667</td>
<td style="text-align:center">20340</td>
</tr>
<tr>
<td style="text-align:center">詰まり</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
</tr>
</tbody>
</table>
<p>すると、1 湧きだけがその他に比べてキンシャケ数が少ないという結果が得られた。</p>
<p>詰まっていないのだから、同じ数だけ出現しても良さそうなものなのにトキシラズと同じく 1 湧きは何故か稼げないという結果になってしまった。</p>
<p>この原因はなんだろうかと考えたとき、タマヒロイの出現位置が関係しているのではないかという発想が得られた。</p>
<p><img src="https://pbs.twimg.com/media/Es9YNvmVgAIaqgp?format=png" alt=""></p>
<p>上図は大雑把な金イクラのドロップ位置によるタマヒロイの出現箇所を示したものである。</p>
<p>これによると、我々が金イクラを落としたいであろうカゴ横はほとんど 2 湧きであることがわかる。そして、初手の位置でジェットパックを吐いてしまうと、この青いエリアに金イクラがたくさん落ちてしまうのだ。</p>
<p>この「ラッシュの湧き位置と異なるタマヒロイの湧き」がタマヒロイによる割り込みの効果を減らしているのではないかと考えた。</p>
<p>これを確かめるのは簡単で、金イクラのドロップ位置が必ず全て同じエリア内に落ちるような位置に移動してからジェットパックを吐いてデータを取ればよい。</p>
<table>
<thead>
<tr>
<th style="text-align:center">満潮</th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
<th style="text-align:center">理論値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">キンシャケ数</td>
<td style="text-align:center">206</td>
<td style="text-align:center">206</td>
<td style="text-align:center">206</td>
<td style="text-align:center">180</td>
</tr>
<tr>
<td style="text-align:center">タマヒロイ</td>
<td style="text-align:center">1217</td>
<td style="text-align:center">1217</td>
<td style="text-align:center">1217</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">3393</td>
<td style="text-align:center">3393</td>
<td style="text-align:center">3393</td>
<td style="text-align:center">3600</td>
</tr>
<tr>
<td style="text-align:center">赤イクラ</td>
<td style="text-align:center">27980</td>
<td style="text-align:center">27980</td>
<td style="text-align:center">27979</td>
<td style="text-align:center">20340</td>
</tr>
<tr>
<td style="text-align:center">詰まり</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
<td style="text-align:center">0.0%</td>
</tr>
</tbody>
</table>
<p>その結果、全ての湧き位置に対して完璧と言って差し支えないほどのデータを得ることができた。</p>
<p>奇妙なことであるが、タマヒロイによる割り込みの効果は確率的であると考えられるにも関わらず、理想的にリスキルができているのであれば寸分の狂いもなく赤イクラ数が 27980 に収束するということだ。</p>
<h2 id="今回の検証でわかったこと" tabindex="-1"><a class="header-anchor" href="#今回の検証でわかったこと" aria-hidden="true">#</a> 今回の検証でわかったこと</h2>
<p>以下、今回の検証でわかったことをメモしていこうと思う。</p>
<p>先に断っておくが、今回の検証は多分に推測を含んでいる。あまり過信しないようにしてほしい。</p>
<p>通常トキシラズの 3 湧きはバグっている</p>
<p>シャケの位置が非同期を起こして、地形に引っかかっているなどして「出現しているのに見えない」シャケが大量に発生し、その結果として「シャケの同時出現上限」を食いつぶしキンシャケの生成速度が極めて遅くなるバグがある。</p>
<p>満潮トキシラズの 2 湧きと 3 湧きはバグっている</p>
<p>通常ではバグらない 2 湧きであるが、満潮になるとバグることがわかる。</p>
<p>なお、これらのバグの根拠としては「全域ジェットパックでリスキルしているにも関わらず、たおせないシャケがいて詰まってしまう」ということが挙げられる。</p>
<p>タマヒロイの割り込みはラッシュの湧き位置と同じだと効果が高い</p>
<p>これの根拠はポラリス満潮で「ドロップ位置を湧き位置と同じ場所にすると割り込みが最適化された」ことによる。</p>
<p>また「初手 1 湧き」-&gt;「全ての金イクラを 1 湧きタマヒロイエリアに落とす」-&gt;「湧きを 3 に変更」-&gt;「1 と 3 を同時にリスキル」という状況をつくってみたところキンシャケ出現数は 177 体にとどまった。</p>
<p>この状況ではタマヒロイは常に 1 湧きでリスキルされ続け、シャケは 3 湧きからリスキルされるのでもしもタマヒロイの湧き位置が関係しないのであればキンシャケは 206 体出現しないといけない。</p>
<p>そうなっていないということは、タマヒロイとラッシュの湧き位置は同じ方が効果がありそうだということになる。</p>
<p>タマヒロイをたおした数か、ドロップしている金イクラの数か</p>
<p>タマヒロイによる割り込みの詳しい原理は未だに解明されていない。</p>
<p>いまのところ言えるのは「金イクラを 9 個放置し、600 秒でタマヒロイを 1217 体たおせばキンシャケが 206 体出現する」ということである。また「金イクラを 9 個放置し、600 秒でタマヒロイを 1029 体たおせばキンシャケが 210 体出現する」ということもわかっている。</p>
<p>キンシャケの出現数を決めるのはトキシラズ 3 湧きのようなシャケの消失を除けば「放置する金イクラの数」「たおしたタマヒロイの数」の二つで決まっているように思える。</p>
<p>金イクラをいくつ放置すれば最適になるのかは難しい問題であるが、少なくとも 9 個放置してそれなりの速度でリスキルしていればかなり得をするのは間違いない。</p>
<p>だが、実際に 9 個も放置し続けるというのは容易ではない。せいぜい 5 ~ 6 個程度が限界であるようにも思う。</p>
<p><a href="https://tkgstrator.work/posts/2021/01/24/snatcherinjection.html" target="_blank" rel="noopener noreferrer">前回の研究<OutboundLink/></a>では 5 個放置してタマヒロイを 672 体たおした場合にはキンシャケはわずかに減ることがわかっている。これがたおしすぎて減っているのか、たおしてなさすぎて減っているのかはわからない。金イクラを 5 つドロップさせておくだけでも、理論上はキンシャケ出現数は増えるはずである。</p>
<p>N=9 でタマヒロイを 1029 体出現させて 210 体のキンシャケが出現したことから考えると、タマヒロイ出現数と放置した金イクラの間が比例関係であればタマヒロイは 572 体ほどたおすのが良いということになる。</p>
<p>しかし、やってみたが金イクラドロップ数 5 では上手く稼ぐことができなかった。</p>
<p>さらなる解析に期待したい。</p>
</template>
