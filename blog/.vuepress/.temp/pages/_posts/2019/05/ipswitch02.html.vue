<template><h1 id="ipswitch-誰でもできるコード開発-2" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-2" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #2</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2019/05/01/ipswitch01.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #1<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="_0-以外の値に上書きしたい" tabindex="-1"><a class="header-anchor" href="#_0-以外の値に上書きしたい" aria-hidden="true">#</a> 0 以外の値に上書きしたい</h2>
<p>さて、前回はスペシャルコストを 0 にするコードについて学びました。</p>
<p>スペシャルコストを決定する関数は 5.4.0 においては<code>loc_864DC</code>であり、それは以下のアセンブラで与えられました。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>000864DC                 LDR             X1, [SP,#0x6C0+var_660]
000864E0                 ADRP            X2, #aSpecialcost@PAGE ; "SpecialCost"
000864E4                 SUB             X0, X29, #-var_C8
000864E8                 ADD             X2, X2, #aSpecialcost@PAGEOFF ; "SpecialCost"
000864EC                 STR             X19, [SP,#0x6C0+src]
000864F0                 BL              sub_19E4678
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>このとき、<code>BL sub_19E4678</code>というのは BL が返り値を持つサブルーチンであり、単に X1 レジスタに保存されているアドレスに値を入れればその値がまさにスペシャルコストになりました。</p>
<p><img src="https://pbs.twimg.com/media/E2cUT05VkAA-KI1?format=png" alt=""></p>
<p>サブルーチン 19E4678 は X1 にスペシャル必要数のデータが保存されているメモリのアドレスをコピーする。</p>
<p>つまり、<code>sub_19E4678</code>には分岐する必要がなかったのでここの命令を上書きしてしまって良かったわけです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>000864DC                 LDR             X1, [SP,#0x6C0+var_660]
000864E0                 ADRP            X2, #aSpecialcost@PAGE ; "SpecialCost"
000864E4                 SUB             X0, X29, #-var_C8
000864E8                 ADD             X2, X2, #aSpecialcost@PAGEOFF ; "SpecialCost"
000864EC                 STR             X19, [SP,#0x6C0+src]
                         STR             WZR, [X1] // 0 を代入に変更
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>「レジスタが持つアドレスが指し示すメモリの値を 0 にする」という命令は通常は二命令ないと実装できないのですが、ARM64 には読み込むと常に 0 を返すゼロレジスタと呼ばれる便利なものがあるので上のように一行で実装することができました。</p>
<p>では、0 ではない別の値にしたい場合はどうすればよいでしょうか？</p>
<div class="custom-container tip"><p class="custom-container-title">0 以外にする必要はあるか</p>
<p>わざわざスペシャルコストを 0 以外の別の値にしたがる人はいないと思いますが、ここでは技術的に可能かどうかだけを解説しています。</p>
</div>
<p>以下は X1 レジスタがもつアドレスのメモリの値を 255 にするアセンブラです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>MOV X19, #255
STR X19, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>このように、0 以外の何かの値をメモリに代入しようとすれば最低でも二命令必要になります。ちなみに ARM の命令は一命令で 16 ビット（65535）までの代入に対応しているので任意の 32 ビットの値をレジスタに保存するためにはレジスタにコピーするだけで $32÷16=2$ 命令必要になります。</p>
<p>それをメモリに保存しようとすれば更に追加で一命令必要なので合計三命令です。</p>
<p>スプラトゥーンでは実際に 64 ビットの値を扱うことはほとんどないので「3 命令あれば好きな値をメモリに入れることができる」とおぼえておくと良いでしょう。</p>
<p>これでスペシャルコストの命令を上書きすれば全てのブキのスペシャルコストを 255 にすることができます。</p>
<div class="custom-container tip"><p class="custom-container-title">X19 レジスタを指定した意味</p>
<p>今回はたまたま X19 レジスタを指定していますが、影響がないならどんなレジスタを指定しても構いません。ちなみに ARM64 は X30 までのレジスタが扱えます。</p>
</div>
<h2 id="上書きできる命令を探す" tabindex="-1"><a class="header-anchor" href="#上書きできる命令を探す" aria-hidden="true">#</a> 上書きできる命令を探す</h2>
<p>アセンブラでこれを実装するのは先程も言ったように少なくとも二命令が必要になります。</p>
<p>つまり、BL 命令以外のどれかを更に上書きする必要が発生するということです。</p>
<p>ここで大事なのは「上書きしても動作に問題のない命令はどれか」ということを正しく理解することなのです。</p>
<p>今回の場合はたまたま BL 命令の一つ前の命令である<code>STR X19, [SP,#0x6C0+var_468]</code>も上書きしても動作に問題がありませんでした。</p>
<p>今回はたまたまうまくいきましたが「常に BL 命令の一つ前の命令は潰してしまっても問題ない」というわけではないことに気をつけてください。</p>
<p>アセンブラから ARM64 の機械語に変換するのは<a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>が非常に便利なのでぜひ使わせていただきましょう。</p>
<p>スペシャルコストを 255 にするコードは以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Special Cost 255 [tkgling]
@disabled
000864EC F31F80D2 // MOV X19, #255
000864F0 330000B9 // STR X19, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>一行目のコードがの F31F80D2 がレジスタに 255 を代入しているので、ここの値を変えればいくらでも好きな値に設定できます。</p>
<h2 id="分岐先命令を上書き" tabindex="-1"><a class="header-anchor" href="#分岐先命令を上書き" aria-hidden="true">#</a> 分岐先命令を上書き</h2>
<p>さて、今回は特定の値を代入する命令も高々二行で書くことができたので置き換えても問題がない命令を見つけて目的のコードを書くことができました。</p>
<p>しかし、もしもどの命令も置き換えることができなかったときはどうすればいいのでしょう？</p>
<p>そういうときは BL 命令自体を上書きするのではなく、BL で分岐した先の命令を変えてしまえば良いことになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>000864DC                 LDR             X1, [SP,#0x6C0+var_660]
000864E0                 ADRP            X2, #aSpecialcost@PAGE ; "SpecialCost"
000864E4                 SUB             X0, X29, #-var_C8
000864E8                 ADD             X2, X2, #aSpecialcost@PAGEOFF ; "SpecialCost"
000864EC                 STR             X19, [SP,#0x6C0+src]
000864F0                 BL              sub_19E4678

019E4678                 STR             X21, [SP,#-0x10+var_20]!
019E467C                 STP             X20, X19, [SP,#0x20+var_10]
019E4680                 STP             X29, X30, [SP,#0x20+var_s0]
019E4684                 ADD             X29, SP, #0x20
019E4688                 MOV             X21, X0
019E468C                 ADD             X0, SP, #0x20+var_18
019E4690                 MOV             X20, X2
019E4694                 MOV             X19, X1
019E4698                 BL              sub_19E5030
019E469C                 ADD             X1, SP, #0x20+var_18
019E46A0                 MOV             X0, X21
019E46A4                 MOV             X2, X20
019E46A8                 BL              sub_19E406C
019E46AC                 TBZ             W0, #0, loc_19E46EC
019E46B0                 ADD             X0, SP, #0x20+var_18
019E46B4                 BL              sub_19E505C
019E46B8                 AND             W8, W0, #0xFF
019E46BC                 CMP             W8, #0xFF
019E46C0                 B.EQ            loc_19E46EC
019E46C4                 ADD             X0, SP, #0x20+var_18
019E46C8                 BL              sub_19E505C
019E46CC                 AND             W8, W0, #0xFF
019E46D0                 CMP             W8, #0xD1
019E46D4                 B.NE            loc_19E46EC
019E46D8                 ADD             X0, SP, #0x20+var_18
019E46DC                 BL              sub_19E5064
019E46E0                 STR             W0, [X19]
019E46E4                 MOV             W0, #1
019E46E8                 B               loc_19E46F0
019E46EC                 MOV             W0, WZR
019E46F0                 LDP             X29, X30, [SP,#0x20+var_s0]
019E46F4                 LDP             X20, X19, [SP,#0x20+var_10]
019E46F8                 LDR             X21, [SP+0x20+var_20],#0x30
019E46FC                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">sub_19E4678 を上書きするキケン性</p>
<p>このサブルーチンをスキップしてもバグが発生しないということは、このサブルーチン内の命令は全部 NOP（何もしない）にしても構わないということですが、それはあくまでも<code>loc_847A0</code>から呼ばれた場合にはスキップしても問題ないということです。</p>
<p><code>sub_19E4678</code>内でリターンする値を変更することは<code>sub_19E4678</code>を呼び出している他の全てのサブルーチンに対しても本来とは異なる値を返すことになります。</p>
<p>可能な限り、呼び出し先のサブルーチンの内容を変更するのはやめましょう。</p>
</div>
<p>ただしここまでの手法を使ってできるのは「本来 X という値が読み込まれていたところに Y を代入する」という操作だけです。</p>
<p>「本来 X という値が読み込まれていたところに 2X を代入する（例えば攻撃力を倍にするなど）」はもう少し複雑な命令を書く必要があります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">できること</th>
<th style="text-align:center">できないこと</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">好きな定数を代入する</td>
<td style="text-align:center">本来の値を参照する</td>
</tr>
<tr>
<td style="text-align:center">値をゼロクリア</td>
<td style="text-align:center">条件分岐</td>
</tr>
<tr>
<td style="text-align:center">関数のスキップ</td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
<p>本来の値を参照することができないということは、例えばサーモンランのクマブキアンロックのために<code>CoopAddition</code>の値を変更する必要があるのですが、クマブキだけを開放するといった細かいことはできないということです。</p>
<p>そういう処理にする場合には複数の命令が必要なので、書き換えられる命令が一行しかない場合にはそういった柔軟な対応ができません。</p>
<p>実際には使えないヒーローモードのブキも含めて全てのブキが使用可能になってしまいます。</p>
<p>一般的に ExeFS の改造でできるのは大雑把で大胆な変更なので、細かいところを調整したいのであれば LFS を利用して直接 BPRM ファイルを変数してしまうほうが楽だと思います。</p>
<p>ブキやスペシャルの性能をめちゃくちゃにしたりとか、そういう系のチートがこれに該当します。</p>
<p>記事は以上。</p>
</template>
