<template><h2 id="グラフノードとは" tabindex="-1"><a class="header-anchor" href="#グラフノードとは" aria-hidden="true">#</a> グラフノードとは</h2>
<p>要するにただのグラフである。以下のようなものを想像してもらえばよく、それぞれのノードはスタート地点からの距離に応じたコストを持っている。</p>
<p><img src="https://pbs.twimg.com/media/E0vqIKKXEAYAUtx?format=png" alt=""></p>
<div class="custom-container tip"><p class="custom-container-title">コストについて</p>
<p>今回はスタート地点からの距離をコストとしたが、より正確には「ノードを繋ぐエッジに重みがある」とする方が正しい。</p>
<p>そうでないと、例えばこのデータだけではコスト 8 のノードからコスト 8 のノードへ移動するときにいくらコストがかかるかをパッと計算することができない。ただし、ガチホコバトルにおいては「ゴールまでの距離」がカウントとして扱われるのでこのような表記とした。</p>
</div>
<h2 id="スプラトゥーンのグラフノード" tabindex="-1"><a class="header-anchor" href="#スプラトゥーンのグラフノード" aria-hidden="true">#</a> スプラトゥーンのグラフノード</h2>
<p>スプラトゥーンにおけるグラフノードはサーモンランなどでも使われている。サーモンランの場合はシャケが通行可能なルートをグラフノードで制御していたりする。</p>
<p>このグラフノードは BYAML という XML を暗号化したフォーマットで与えられており、普通のエディタでは中身を見ることができない。</p>
<p>ただ、そこはスーパーハカーが<a href="https://github.com/exelix11/TheFourthDimension" target="_blank" rel="noopener noreferrer">復号用のプログラム<OutboundLink/></a>を開発してくれている。この中にある<code>The4Dimension.exe</code>を使って<code>BYAML、BYML、BPRM</code>などのデータを復号することができる。</p>
<div class="custom-container tip"><p class="custom-container-title">BYAML などについて</p>
<p>ちなみに BYAML などの最初についている B は Binary を意味している。バイナリ化することでファイルサイズを圧縮しているのだ。</p>
<p>復号のために必要な知識は<a href="http://mk8.tockdom.com/wiki/BYAML_(File_Format)" target="_blank" rel="noopener noreferrer">Wiki<OutboundLink/></a>にのっているので自作ライブラリをつくってみるのも良いかもしれない。ちなみにぼくは挫折しました。</p>
</div>
<h2 id="変換のための手順" tabindex="-1"><a class="header-anchor" href="#変換のための手順" aria-hidden="true">#</a> 変換のための手順</h2>
<p>必要なものは以下の通り。</p>
<ul>
<li><a href="https://github.com/aboood40091/SARC-Tool/releases" target="_blank" rel="noopener noreferrer">SARC-Tool<OutboundLink/></a>
<ul>
<li>圧縮ファイルを解凍するためのツール</li>
<li>解凍して BYAML データを手に入れます</li>
</ul>
</li>
<li><a href="https://github.com/exelix11/TheFourthDimension/releases" target="_blank" rel="noopener noreferrer">TheFourthDimension<OutboundLink/></a>
<ul>
<li>BYAML を XML に変換するツール</li>
</ul>
</li>
<li><a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/" target="_blank" rel="noopener noreferrer">VSCode<OutboundLink/></a>
<ul>
<li>XML を編集/閲覧するテキストエディタ</li>
<li>好きなのを使えばいいけど、これをオススメ</li>
<li>実際、エディタはなくても困らないけど解説のために載せておく</li>
</ul>
</li>
</ul>
</template>
