<template><h2 id="ガチホコシミュレータ" tabindex="-1"><a class="header-anchor" href="#ガチホコシミュレータ" aria-hidden="true">#</a> ガチホコシミュレータ</h2>
<p>ガチホコシミュレータとはステージ上の任意の位置をクリック（または何かしらのアイコンをドラッグアンドドロップ等で移動させれば）その地点でのガチホコのカウントの値を表示してくれるシステムである。</p>
<p>あると便利だなと思いつつ、そのようなシステムは実際にはない。何故ないのだろうか？</p>
<h2 id="ガチホコのカウント計算式" tabindex="-1"><a class="header-anchor" href="#ガチホコのカウント計算式" aria-hidden="true">#</a> ガチホコのカウント計算式</h2>
<p>ガチホコのカウントの正式な計算式は内部解析でしかわからないが、概ね以下のようになっているのではないかと推測される。</p>
<p><img src="https://pbs.twimg.com/media/E0vqIKKXEAYAUtx?format=png" alt=""></p>
<p>まず、ゴール地点を 0 とし、初期のガチホコの位置を 100 とする。更に、ステージ上に Graph Node という両方向（一部は一方向かもしれない）のノードを用意して通行可能であれば互いを連結する。そして、ノード自体はメッシュ構造に配置されているとする。</p>
<p>そして、ゴール位置から初期位置までの最短経路を求め、経路長が仮に 50 だとすれば 1 つの経路の重みは $100÷50=2$ がノード間の距離となる。つまり、ノードを 1 つ移動するごとにカウントが 2 減るということである。</p>
<p>あとは初期位置から各ノードの最短距離を計算する。これは簡単そうに見えるがやってみると実は少し難しかったりする。考え方としては接続しているノード（隣接ノードと呼ぶことにする）の中で最小の値を持つものにノード距離を加えたものが自身のノードの距離となる。</p>
<p>この付近の考え方はエルデシュ数そのままなのであるが、話がそれるのでそれは置いておこう。</p>
<p>隣接ノードの値がちゃんと最小化されていないと自身のノードの値もまた計算ミスを起こしてしまうという点だ。</p>
<h2 id="最短ルートの計算法" tabindex="-1"><a class="header-anchor" href="#最短ルートの計算法" aria-hidden="true">#</a> 最短ルートの計算法</h2>
<p>一般的に最短ルートは<a href="https://ja.wikipedia.org/wiki/%E3%83%80%E3%82%A4%E3%82%AF%E3%82%B9%E3%83%88%E3%83%A9%E6%B3%95" target="_blank" rel="noopener noreferrer">ダイクストラ法<OutboundLink/></a>と呼ばれるアルゴリズムで求めることができるのですが、これは各ノード間の距離がわかっている場合にしか使えません。今回はノード間の距離自体はわからないのですが「接続していれば距離 1」とみなすことで使うことができます。</p>
<p>実際の距離はスタートからゴールまでのノード数で 100 を割れば求められます。ダイクストラ法自体は移動するとコストが減る場合には機能しません。何故なら、ダイクストラ法は「ループは避けて移動するほうが効率が良い」ということが前提となっているアルゴリズムだからです。</p>
<p>もしも負のコストを含むようなグラフが与えられた場合にはループすることでいくらでもコストを下げることが可能になるグラフが存在します。そうなってしまってはダイクストラ法は機能しないわけです。が、ガチホコにおいてある特定の位置でぐるぐる回っていればカウントがいくらでも減るようなバグ・仕様はないので今回は無視できます。</p>
<h2 id="他の探索法について" tabindex="-1"><a class="header-anchor" href="#他の探索法について" aria-hidden="true">#</a> 他の探索法について</h2>
<p>ダイクストラ法以外にもさまざまな探索アルゴリズムがあり、実は今回のように非負数かつ全てのノード間の距離（重み）が等しい場合には幅優先探索が最も効果を発揮します。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">ダイクストラ法</th>
<th style="text-align:center">ベルマン-フォード法</th>
<th style="text-align:center">A*アルゴリズム</th>
<th style="text-align:center">幅優先探索</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">重み</td>
<td style="text-align:center">非負数のみ</td>
<td style="text-align:center">任意の数</td>
<td style="text-align:center">非負数のみ</td>
<td style="text-align:center">非負数かつ重みが同一</td>
</tr>
<tr>
<td style="text-align:center">探索法</td>
<td style="text-align:center">最良優先探索</td>
<td style="text-align:center">最良優先探索</td>
<td style="text-align:center">ヒューリスティック</td>
<td style="text-align:center">幅優先探索</td>
</tr>
<tr>
<td style="text-align:center">計算時間</td>
<td style="text-align:center">O(V^2)</td>
<td style="text-align:center">O(V*E)</td>
<td style="text-align:center">O(E)</td>
<td style="text-align:center">O(E)</td>
</tr>
</tbody>
</table>
<p>なので別にダイクストラ法でなくてもいいのですが、気が向いたらダイクストラ法と幅優先探索の二つのアルゴリズムを実装してみようと思います。</p>
<h2 id="どうやってシミュレータを提供するか" tabindex="-1"><a class="header-anchor" href="#どうやってシミュレータを提供するか" aria-hidden="true">#</a> どうやってシミュレータを提供するか</h2>
<p>ブラウザベースでやろうかとも思ったのですが、せっかく Swift を勉強しているので Swift で実装するのもいいかなと思っています。</p>
<p>ステージの画像自体はかなり大きいものになるのですが、16:9 なのでスマートフォンの画面サイズと近く、またステージの半分の画像さえあれば機能としては問題ないので表示に関してはそこまで心配していません。</p>
<p>拡大・縮小機能などがあればよいのではないかと思っています。また、ステージごとの勝率のデータなども載せたいと思います。リリースは、まあ今月中にできればいいかなあと思っていたりいなかったり。</p>
<p>画像のライブラリやチャートのライブラリを駆使して面白いアプリに仕上げたいですね。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/41WGU6WHK1L._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B07RY6SR16/?tag=tkgstrator0f-22" target="_blank">点と線の数学 ～グラフ理論と4色問題～ 数学への招待</a></li>
<li class="price">￥1,860</li>
</ul>
</div>
<h3 id="ちなみに" tabindex="-1"><a class="header-anchor" href="#ちなみに" aria-hidden="true">#</a> ちなみに</h3>
<p>いろいろな探索法について述べたが、仮にノードがメッシュになっているのであればゴール位置とスタート位置さえわかっていれば $(i+j)×cost$ で簡単に計算できてしまう。</p>
<p>が、それでは面白くないのでここでは解説を省略した。</p>
</template>
