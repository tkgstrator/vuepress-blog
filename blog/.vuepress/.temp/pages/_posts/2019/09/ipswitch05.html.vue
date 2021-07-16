<template><h1 id="ipswitch-誰でもできるコード開発-5" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-5" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #5</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2019/07/07/ipswitch04.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #4<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="時間変更コード" tabindex="-1"><a class="header-anchor" href="#時間変更コード" aria-hidden="true">#</a> 時間変更コード</h2>
<p>以下のコードは ナワバリバトルとガチマッチの時間を変更するものです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Turf War (3.1.0)
@disabled
01181038 20008052 // MOV W0, #1

// Turf War (5.4.0)
@disabled
01367358 20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Ranked Match (3.1.0)
@disabled
01180B78 20008052 // MOV W0, #1

// Ranked Match (5.4.0)
@disabled
01366E68 20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>今回はこれが何を意味するかについて解説していこうと思います。</p>
<h3 id="機械語をアセンブラに変換" tabindex="-1"><a class="header-anchor" href="#機械語をアセンブラに変換" aria-hidden="true">#</a> 機械語をアセンブラに変換</h3>
<p>HEX to ARM Converter で ARM64 に変換すると以下のコードであることがわかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>というか、命令部は必ず ARM に変換しないと意味がわからないので戻しましょうね。</p>
<p>このとき #1 に代入するのが試合の残り時間の秒数ですので、ここに好きな数字を代入すれば上手く動作します。</p>
<p>例えば試合時間を 46 分 49 秒にしたければまずこれを秒数に変換します。</p>
<p>これは小学生であれば計算できますね。</p>
<p>$46×60+49=2809$</p>
<p>なので #1 に #2809 を代入すれば良いことがわかります。</p>
<h3 id="アセンブラを機械語に変換" tabindex="-1"><a class="header-anchor" href="#アセンブラを機械語に変換" aria-hidden="true">#</a> アセンブラを機械語に変換</h3>
<p>これを実装するためのアセンブラは次の三つのうちのどれかです。</p>
<table>
<thead>
<tr>
<th style="text-align:center">ARM</th>
<th style="text-align:center">HEX</th>
<th style="text-align:center">進数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">MOV W0, #2809</td>
<td style="text-align:center">205F8152</td>
<td style="text-align:center">10 進数</td>
</tr>
<tr>
<td style="text-align:center">MOV W0, 2809</td>
<td style="text-align:center">205F8152</td>
<td style="text-align:center">10 進数</td>
</tr>
<tr>
<td style="text-align:center">MOV W0, #0xAF9</td>
<td style="text-align:center">205F8152</td>
<td style="text-align:center">16 進数</td>
</tr>
</tbody>
</table>
<p>どのアセンブラでも得られる機械語は同じなので問題ないです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Turf War (46:49) (3.1.0)
@disabled
01181038 205F8152 // MOV W0, #2809

// Turf War (46:49) (5.4.0)
@disabled
01367358 205F8152 // MOV W0, #2809
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Ranked Match (46:49) (3.1.0)
@disabled
01180B78 205F8152 // MOV W0, #2809

// Ranked Match (46:49) (5.4.0)
@disabled
01366E68 205F8152 // MOV W0, #2809
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>あとはこれを IPSwitch をつかってパッチを当てるだけです。</p>
<h3 id="どこまで長くできるか" tabindex="-1"><a class="header-anchor" href="#どこまで長くできるか" aria-hidden="true">#</a> どこまで長くできるか</h3>
<p>一行だけの MOV のコードであれば最大で 16bit まで指定できるので、最も長くすると以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Turf War (18:12:15) (3.1.0)
@disabled
01181038 E0FF9F52 // MOV W0, #0xFFFF

// Turf War (18:12:49) (5.4.0)
@disabled
01367358 E0FF9F52 // MOV W0, #0xFFFF
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Ranked Match (18:12:15) (3.1.0)
@disabled
01180B78 E0FF9F52 // MOV W0, #0xFFFF

// Ranked Match (18:12:15) (5.4.0)
@disabled
01366E68 E0FF9F52 // MOV W0, #0xFFFF
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>もちろんこれは MOV のみで実装した場合の話なので、上手いアセンブラを考えるとこれ以上に長くすることはできます。</p>
<p>最も長くなるのは全てのビット列が 1 だった場合なので、全てのビットが 1 のレジスタをセットすれば良いことになります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">ARM</th>
<th style="text-align:center">HEX</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ORN W0, W0, WZR</td>
<td style="text-align:center">00003F2A</td>
</tr>
<tr>
<td style="text-align:center">ORN W0, W0, W0</td>
<td style="text-align:center">0000202A</td>
</tr>
<tr>
<td style="text-align:center">EON W0, W0, W0</td>
<td style="text-align:center">0000204A</td>
</tr>
</tbody>
</table>
<p>三つのコードは意味するところは違いますが、動作の仕組みとしては同じです。</p>
<p>ORN は否定論理和ですので、C 言語風に記述するとそれぞれ以下のようになります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">ARM</th>
<th style="text-align:center">C</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ORN W0, W0, WZR</td>
<td style="text-align:center">`W0 = W0</td>
</tr>
<tr>
<td style="text-align:center">ORN W0, W0, W0</td>
<td style="text-align:center">`W0 = W0</td>
</tr>
<tr>
<td style="text-align:center">EON W0, W0, W0</td>
<td style="text-align:center"><code>W0 = W0 ^ ~W0</code></td>
</tr>
</tbody>
</table>
<p>WZR はゼロレジスタと呼ばれ、全てのビットが 0 である値を返すのでそれの否定は全て 1 のビットが返ります。</p>
<p>それと論理和を取れば全てのビットが 1 になるのは明白です。</p>
<p>後者も自身とそれの否定の論理和は取れば必ず全てのビットが 1 になります。</p>
<p>排他的論理和はビットが同じなら 0 が返るので、自身とそれの否定の排他的論理和は必ず全てのビットが 1 になります。</p>
<h3 id="やってみた" tabindex="-1"><a class="header-anchor" href="#やってみた" aria-hidden="true">#</a> やってみた</h3>
<p>ところが実際にこれらのコードを動かしてみると始まった瞬間に延長になってしまいます。</p>
<p>多分数が大きすぎてオーバーフローしてしまっているとかそんなのだと思います、残念。</p>
<p>その後ちまちま修正して頑張って時間を延ばした結果、412 日くらいガチマッチが遊べるコードが完成しました。</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1172056174264381442/pu/vid/1280x720/noIHH-chR2x02jyJ.mp4"></video></p>
<p>なんでこんなところにキャップがあるのかは不明ですが、限界チャレンジは結構楽しめたので良かったです。</p>
<p>記事は以上。</p>
</template>
