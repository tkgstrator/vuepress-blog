<template><h1 id="ipswitch-のコード開発チュートリアル" tabindex="-1"><a class="header-anchor" href="#ipswitch-のコード開発チュートリアル" aria-hidden="true">#</a> IPSwitch のコード開発チュートリアル</h1>
<p>ここでは IPSwitch でつかえるスプラトゥーン用のコード開発の方法について解説していきます。</p>
<p>開発にあたって以下のものが必要になるので必ず用意してください。</p>
<ul>
<li>
<p>当該のスプラトゥーン 2 の実行ファイル</p>
<ul>
<li>取得方法は記事が長くなるので割愛します</li>
</ul>
</li>
<li>
<p><a href="https://www.hex-rays.com/ida-pro/" target="_blank" rel="noopener noreferrer">IDA Pro<OutboundLink/></a>または<a href="https://github.com/NationalSecurityAgency/ghidra/releases" target="_blank" rel="noopener noreferrer">GHIDRA<OutboundLink/></a>などの ARM64v8 の逆アセンブラツール</p>
</li>
<li>
<p>ARM64v8 のバイナリをそのまま読み込むためのローダ</p>
<ul>
<li>GHIDRA 用: <a href="https://github.com/Adubbz/Ghidra-Switch-Loader/releases" target="_blank" rel="noopener noreferrer">Ghidra-Switch-Loader<OutboundLink/></a></li>
<li>IDA Pro 用: <a href="https://github.com/reswitched/loaders" target="_blank" rel="noopener noreferrer">loaders<OutboundLink/></a></li>
</ul>
</li>
<li>
<p>復号化ツール<a href="https://github.com/tkgstrator/nx2elf/releases" target="_blank" rel="noopener noreferrer">nx2elf<OutboundLink/></a></p>
<ul>
<li>これがあればローダは不要になります</li>
<li>64 ビットで動作するように改良したものになります</li>
</ul>
</li>
<li>
<p><a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a></p>
<ul>
<li>ウェブサイトなのでそのまま利用できます</li>
</ul>
</li>
</ul>
<h2 id="目次" tabindex="-1"><a class="header-anchor" href="#目次" aria-hidden="true">#</a> 目次</h2>
<h3 id="スペシャル必要ポイント変更コード-1" tabindex="-1"><a class="header-anchor" href="#スペシャル必要ポイント変更コード-1" aria-hidden="true">#</a> <RouterLink to="/posts/2019/05/01/ipswitch01.html">スペシャル必要ポイント変更コード 1</RouterLink></h3>
<p>スペシャル消費量を 0 にするためのコードの書き方を解説しています。</p>
<h3 id="スペシャル必要ポイント変更コード-2" tabindex="-1"><a class="header-anchor" href="#スペシャル必要ポイント変更コード-2" aria-hidden="true">#</a> <RouterLink to="/posts/2019/05/09/ipswitch02.html">スペシャル必要ポイント変更コード 2</RouterLink></h3>
<p>レジスタに任意の値を代入する方法について解説しています。</p>
<h3 id="イカッチャのサーモンラン変更コード" tabindex="-1"><a class="header-anchor" href="#イカッチャのサーモンラン変更コード" aria-hidden="true">#</a> <RouterLink to="/posts/2019/07/02/ipswitch03.html">イカッチャのサーモンラン変更コード</RouterLink></h3>
<p>関数の返り値自体を変更して、イカッチャのナゾの声をクマサンに変更する方法を解説しています。</p>
<h3 id="全ブキ開放コード" tabindex="-1"><a class="header-anchor" href="#全ブキ開放コード" aria-hidden="true">#</a> <RouterLink to="/posts/2019/07/07/ipswitch04.html">全ブキ開放コード</RouterLink></h3>
<p>BYAML などの暗号化された XML のデータを読み取ってその値を変更する方法について解説しています。</p>
<h3 id="ガチマッチの時間変更コード" tabindex="-1"><a class="header-anchor" href="#ガチマッチの時間変更コード" aria-hidden="true">#</a> <RouterLink to="/posts/2019/09/12/ipswitch05.html">ガチマッチの時間変更コード</RouterLink></h3>
<p>ガチマッチやナワバリバトルでの試合時間を変更するコードについて解説しています。</p>
<h3 id="リアルタイムイクラ取得上書きコード" tabindex="-1"><a class="header-anchor" href="#リアルタイムイクラ取得上書きコード" aria-hidden="true">#</a> <RouterLink to="/posts/2020/04/30/ipswitch06.html">リアルタイムイクラ取得上書きコード</RouterLink></h3>
<p>ナイスやカモンを上書きしてリアルタイムイクラ取得をする方法について解説しています。</p>
<h3 id="リアルタイムチーム変更コード" tabindex="-1"><a class="header-anchor" href="#リアルタイムチーム変更コード" aria-hidden="true">#</a> <RouterLink to="/posts/2020/05/27/ipswitch07.html">リアルタイムチーム変更コード</RouterLink></h3>
<p>ナイスやカモンを上書きしてリアルタイムチーム変更をする方法について解説しています。</p>
<h3 id="リアルタイムスペシャル変更コード-1" tabindex="-1"><a class="header-anchor" href="#リアルタイムスペシャル変更コード-1" aria-hidden="true">#</a> <RouterLink to="/posts/2020/11/02/ipswitch08.html">リアルタイムスペシャル変更コード 1</RouterLink></h3>
<p>ナイスやカモンを上書きしてリアルタイムスペシャル変更をする方法について解説しています。</p>
<h3 id="インスタンスコードの移植方法" tabindex="-1"><a class="header-anchor" href="#インスタンスコードの移植方法" aria-hidden="true">#</a> <RouterLink to="/posts/2021/02/14/ipswitch09.html">インスタンスコードの移植方法</RouterLink></h3>
<p>インスタンスを利用するコードの移植方法について解説しています。</p>
<h3 id="リアルタイムスペシャル変更コード-2" tabindex="-1"><a class="header-anchor" href="#リアルタイムスペシャル変更コード-2" aria-hidden="true">#</a> <a href="/posts/2021/05/24/ipswitch10">リアルタイムスペシャル変更コード 2</a></h3>
<p>条件文を利用するリアルタイムスペシャル変更コードの改善方法について解説しています。</p>
</template>
