<template><h2 id="早退・残業とは" tabindex="-1"><a class="header-anchor" href="#早退・残業とは" aria-hidden="true">#</a> 早退・残業とは</h2>
<p>要するにさっさと帰りたい方やもっともっとバイトしたい方（5.4.0）向けのコード。</p>
<h3 id="wave-数変更コード" tabindex="-1"><a class="header-anchor" href="#wave-数変更コード" aria-hidden="true">#</a> WAVE 数変更コード</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change Wave Count in SR [tkgling]
@disabled
00731430 X0008052
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>X に入れる値を変更すれば効果が変わります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">X の値</th>
<th style="text-align:center">効果</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">W1 終了後、リザルト画面でフリーズ</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">W1 終了後帰還</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">W2 終了後帰還</td>
</tr>
<tr>
<td style="text-align:center">6</td>
<td style="text-align:center">W3 終了後帰還</td>
</tr>
<tr>
<td style="text-align:center">8</td>
<td style="text-align:center">W3 終了後、W4 に突入でフリーズ</td>
</tr>
</tbody>
</table>
<h3 id="wave-時間変更コード" tabindex="-1"><a class="header-anchor" href="#wave-時間変更コード" aria-hidden="true">#</a> WAVE 時間変更コード</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change Wave Total Frame in SR [tkgling]
@disabled
007302A0 XXXXXXXX
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:center">XXXXXXXX の値</th>
<th style="text-align:center">効果</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">00008052</td>
<td style="text-align:center">0 秒</td>
</tr>
<tr>
<td style="text-align:center">00778152</td>
<td style="text-align:center">50 秒</td>
</tr>
<tr>
<td style="text-align:center">00EE8252</td>
<td style="text-align:center">100 秒</td>
</tr>
</tbody>
</table>
<p>もっとサーモンランしたい！！っていう方は以下のコードがオススメ。でも下二つは多分やらないほうがいい。</p>
<table>
<thead>
<tr>
<th style="text-align:center">XXXXXXXX の値</th>
<th style="text-align:center">効果</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">00658452</td>
<td style="text-align:center">150 秒</td>
</tr>
<tr>
<td style="text-align:center">E0FF9F52</td>
<td style="text-align:center">1093 秒</td>
</tr>
<tr>
<td style="text-align:center">2001A052</td>
<td style="text-align:center">9831 秒</td>
</tr>
<tr>
<td style="text-align:center">4044A0D2</td>
<td style="text-align:center">165 時間</td>
</tr>
<tr>
<td style="text-align:center">0000204A</td>
<td style="text-align:center">828 日*</td>
</tr>
<tr>
<td style="text-align:center">2033EFD2</td>
<td style="text-align:center">876 京年*</td>
</tr>
</tbody>
</table>
<p>*がついているやつは動作未確認です。165 時間のやつは多分ちゃんと動きます。</p>
<p>ちなみにガチマッチと違ってどれだけ伸ばしても最大四桁しか表示されないので 9999 秒が最大値となります（それ以上は減ってるように見えないのでわからない）</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1247469431233617923/pu/vid/1280x720/3_txPArVaqcUkwrE.mp4"></video></p>
<h2 id="非改造機との通信" tabindex="-1"><a class="header-anchor" href="#非改造機との通信" aria-hidden="true">#</a> 非改造機との通信</h2>
<p>WAVE の長さは最初のマッチング時にホストから送られてくるわけではないので、このコードは同期ズレを起こします。</p>
<p>が、ホストが WAVE 終了のデータを送信するのでそれを受け取ることで非改造機もエラー落ちすることなくプレイすることができます。以下にそれぞれの組み合わせでどんな現象が起きるかメモしておきます。</p>
<p>WAVE 数変更コードは致命的な同期ズレを起こすのでゲームが進まなくなります。</p>
<h3 id="改造機がホストの場合" tabindex="-1"><a class="header-anchor" href="#改造機がホストの場合" aria-hidden="true">#</a> 改造機がホストの場合</h3>
<table>
<thead>
<tr>
<th style="text-align:center">WAVE の長さ</th>
<th style="text-align:center">非改造機の挙動</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">100 秒未満</td>
<td style="text-align:center">ホストが WAVE 終わると同時にクリア <br> 違和感なくプレイできる</td>
</tr>
<tr>
<td style="text-align:center">100 秒以上</td>
<td style="text-align:center">100 秒経った時点で金イクラが消滅 <br> シャケも帰っていくので虚無が訪れる</td>
</tr>
</tbody>
</table>
<p><video controls src="https://video.twimg.com/ext_tw_video/1247455464515919872/pu/vid/1280x720/D6U-kwLlz6LXLz7t.mp4"></video></p>
<h3 id="非改造機がホストの場合" tabindex="-1"><a class="header-anchor" href="#非改造機がホストの場合" aria-hidden="true">#</a> 非改造機がホストの場合</h3>
<table>
<thead>
<tr>
<th style="text-align:center">WAVE の長さ</th>
<th style="text-align:center">非改造機の挙動</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">100 秒未満</td>
<td style="text-align:center">自分だけ先に終わり金イクラが消滅 <br> シャケも帰っていくので虚無が訪れる</td>
</tr>
<tr>
<td style="text-align:center">100 秒以上</td>
<td style="text-align:center">100 秒でクリア扱いになるがシャケは帰らない <br> 金イクラも消えないので、次 WAVE で拾える</td>
</tr>
</tbody>
</table>
<p><video controls src="https://video.twimg.com/ext_tw_video/1247456780831129600/pu/vid/1280x720/XIJfmzDY1V9NLrtF.mp4"></video></p>
<p>結論から言うと、まともに遊べるのは改造機がホストで時間が 100 秒未満のときだけです。なのでめちゃくちゃ長くしてずっとシャケと戯れるっていうのを非改造機と遊ぶことはできません。</p>
<p>記事は以上。</p>
</template>
