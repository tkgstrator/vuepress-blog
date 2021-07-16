<template><h1 id="ipswitch-誰でもできるコード開発-1" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-1" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #1</h1>
<h2 id="コードの自作の目的と意味" tabindex="-1"><a class="header-anchor" href="#コードの自作の目的と意味" aria-hidden="true">#</a> コードの自作の目的と意味</h2>
<p>IPSwitch でいろいろなコードを試している人はたくさんいるように思います。</p>
<p>中にはコードを使うだけで楽しい人もいるかも知れませんが、「自分でもコードを見つけたい」と思っている人もいるかも知れません。</p>
<p>というのは、コードを見つければそのコードはくだらないものであったとしても自身の名前が残る可能性があるからです。</p>
<p>ぼくが見つけたのは金イクラドロップ数変更とサーモンランでのスペシャル使用回数変更のコードなので、たまに動画の紹介で名前が載っていることがありますね。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>ぼくより先にコード見つけた人がいるかも知れませんが、こういうのは公開しないと名前が載りません。</p>
</div>
<p>実際のところコードはチーム内以外では非公開だったので「なんで勝手に動画化されてるん？」っていう気はしないでもないですが、ちゃんとクレジットがついていてコード自体は公開されていないことを考えると最低限のモラルを持っている人は多いように思います。</p>
<h2 id="自作しやすいコード" tabindex="-1"><a class="header-anchor" href="#自作しやすいコード" aria-hidden="true">#</a> 自作しやすいコード</h2>
<p>コードの中にも自作しやすいものとそうでないものが存在します。</p>
<p>最も簡単なのは実行ファイル内で定義されている値を変更するもので、これはとてつもなく簡単です。</p>
<p>基本的には必要なパラメータが記述されているアドレスを探すだけの作業になります。</p>
<p>当然、「実行ファイルのどこにそんな定数が載っているのか」という話になるのですが、<code>ELF String Table</code>という箇所があるのでそこを見れば簡単に見つけることができます。</p>
<p>どのあたりにそれらのテーブルがあるかは下のテーブルに載せておくので参考にしてください。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Ver</th>
<th style="text-align:center">ELF(IDA)</th>
<th style="text-align:center">NSO(IDA)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">3.1.0</td>
<td style="text-align:center">37106C4</td>
<td style="text-align:center">71037106C4</td>
</tr>
<tr>
<td style="text-align:center">5.4.0</td>
<td style="text-align:center">24178B5</td>
<td style="text-align:center">71024178B5</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code>Shooter_Normal_H</code>でテキスト検索をすれば割りと早く見つけられると思います。</p>
</div>
<p>これらは文字列なのでソースコードのコメントが削除された 3.1.0 以降の NSO であっても比較的読みやすいはずです。</p>
<p>ここから自分がいじりたいと思うパラメータを検索する必要があります。</p>
<p>パラメータ名はどこかで見たことがあるものばかりだと思うので、見つけること自体は簡単だと思います。</p>
<p>以下にパラメータ名の一例を挙げておきます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">文字列</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Coop</td>
<td style="text-align:center">サーモンラン</td>
</tr>
<tr>
<td style="text-align:center">SpecialCount</td>
<td style="text-align:center">スペシャル必要量</td>
</tr>
<tr>
<td style="text-align:center">InkCosume</td>
<td style="text-align:center">インク消費量</td>
</tr>
<tr>
<td style="text-align:center">Player</td>
<td style="text-align:center">イカちゃん</td>
</tr>
<tr>
<td style="text-align:center">Npc_</td>
<td style="text-align:center">NPC</td>
</tr>
<tr>
<td style="text-align:center">State</td>
<td style="text-align:center">メッセージなど</td>
</tr>
</tbody>
</table>
<p>とにかくパラメータは多すぎるので、全部書ききることはできません。</p>
<h3 id="値を-0-にするコード" tabindex="-1"><a class="header-anchor" href="#値を-0-にするコード" aria-hidden="true">#</a> 値を 0 にするコード</h3>
<p>先程、最も書きやすいコードは実行ファイル内で定義されている変数を変更するものだと述べました。</p>
<p>それらのうち、その値を 0 にするコードは最も書きやすいです。</p>
<p>これを 100 や 1000 にするのは意外と難しいのです。</p>
<p>例えば、スペシャル必要量を 0 にするコードを書いてみましょう。</p>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>GHIDRA はデフォルトでは 1024MB しかメモリを使ってくれないのですが、これだとメモリが足りずに解析失敗するかもしれないので最低でも 2048MB は確保したほうがいいでしょう。</p>
<p><strong>ghidraRun.bat</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>:: Ghidra launch

@echo off
setlocal

:: Maximum heap memory size
:: Default for Windows 32-bit is 768M and 64-bit is 1024M
:: Raising the value too high may cause a silent failure where
:: Ghidra fails to launch.
:: Uncomment MAXMEM setting if non-default value is needed

set MAXMEM=2048M

call "%~dp0support\launch.bat" bg Ghidra "%MAXMEM%" "" ghidra.GhidraRun %*


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>こんな感じでコメントを外して好きな値をいれれば OK。</p>
<p>一応 1024MB でも解析できたけど、余裕があるならそれ以上に設定しておこう。</p>
</div>
<p><img src="https://pbs.twimg.com/media/E2cSHEYUUAY7PZm?format=png" alt=""></p>
<p>アドレスは 71024178B5 で、その右を見ると XREF[2] の記述から 710008547C のもう一つ隣の 71000864E8 でこの値が使われていることがわかります。</p>
<p>ダブルクリックするとこのアドレスにとぶことができるので、実際にそのサブルーチンを見てみましょう。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>サブルーチンというのは、関数（メソッド）内で動く関数みたいなイメージです。</p>
</div>
<p><img src="https://pbs.twimg.com/media/E2cSJXdVcAEw4eK?format=png" alt=""></p>
<p>ここのサブルーチンの上五行の命令を覚えておきましょう。</p>
<h2 id="アセンブラを理解する" tabindex="-1"><a class="header-anchor" href="#アセンブラを理解する" aria-hidden="true">#</a> アセンブラを理解する</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>000864DC                 LDR             X1, [SP,#0x6C0+var_660]
000864E0                 ADRP            X2, #aSpecialcost@PAGE ; "SpecialCost"
000864E4                 SUB             X0, X29, #-var_C8
000864E8                 ADD             X2, X2, #aSpecialcost@PAGEOFF ; "SpecialCost"
000864EC                 STR             X19, [SP,#0x6C0+src]
000864F0                 BL              sub_19E4678
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>この五行がスペシャル必要量を設定しているサブルーチンになります。</p>
<p>で、そのサブルーチンを実行したときのレジスタの動きはだいたいこんな感じ（自信がないので間違ってたら指摘ください）</p>
<p><img src="https://pbs.twimg.com/media/E2cUAhWVEAMzsja?format=png" alt=""></p>
<p>SP からアドレス XXX だけズラしたところのアドレスに格納されている値を X1 にコピーする。</p>
<p><img src="https://pbs.twimg.com/media/E2cUC0hUcAAQ5GF?format=png" alt=""></p>
<p>PC + #SC のアドレスを X2 にコピーする。</p>
<p>※どんな値が入っているかはここではわからない。</p>
<p><img src="https://pbs.twimg.com/media/E2cUE5jVIAAMmEz?format=png" alt=""></p>
<p>X29 - #YYY の計算結果を X0 に保存する。</p>
<p>※X29 に保存されているデータはアド レスかもしれないし、値かもしれな。</p>
<p><img src="https://pbs.twimg.com/media/E2cUG9_VoAExApK?format=png" alt=""></p>
<p>X2 + #SC の値を X2 にコピーする。</p>
<p>※ただ、#SC の値は常に 0 なのでこの 動作に意味があるのかよくわかっていない。</p>
<p>※アドレスに定数を足して何をしているのかもよくわからない。</p>
<p><img src="https://pbs.twimg.com/media/E2cULU7UcAEA45r?format=png" alt=""></p>
<p>SP + #ZZZ のアドレスにある値を X19 にコピーする。</p>
<p>※[] はそのアドレスの値を意味する。</p>
<p><img src="https://pbs.twimg.com/media/E2cUNzVVkAI8lPu?format=png" alt=""></p>
<p>サブルーチン 19E4678 に分岐する。</p>
<p><img src="https://pbs.twimg.com/media/E2cUQhVVIAM-diu?format=png" alt=""></p>
<p>命令を実行したあとのレジスタの状況はこんな感じになっています。</p>
<p>このあと結局どの値を SC として使われるのかはサブルーチンの中身を見なければわかりません。</p>
<p>で、細かいことはさておいて最終的には X1 レジスタに入っているアドレスが指し示すメモリの値が<code>SpecialCost</code>として使われます。</p>
<p><img src="https://pbs.twimg.com/media/E2cUT05VkAA-KI1?format=png" alt=""></p>
<p>サブルーチン 19E4678 は X1 にスペシャル必要数のデータが保存されているメモリのアドレスをコピーする。</p>
<p>レジスタはこのあとも何度も更新されてしまうので、ここの値を変えることに意味はありません。</p>
<p>では、メモリのアドレス XXX のデータが持つ値を変更するにはどのようなアセンブラを書けば良いでしょうか？</p>
<p>もちろん、直接メモリに値を代入するアセンブラが書ければよいのですが、それはできません。</p>
<p>何故なら、メモリに値を代入するためには必ずレジスタからコピーしなければいけないからです。</p>
<p>つまり、データのコピー先としてメモリのアドレスを直接指定することは不可能です。</p>
<p>ではどうすればいいのかというと、メモリのアドレスを保持しているレジスタを利用するのです。</p>
<p>上の例の場合は、X1 レジスタが参照先のメモリのアドレスを保持しているのでこれが利用できます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>MOV X20, #0
STR X20, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>例えばこのように書けばアドレス XXX に保存されているデータの値を 0 に上書きすることができます。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code>MOV X20, X1</code>と書いてしまうと、参照したいメモリのアドレス自体が 0 に更新されてしまって、データを正しく読み込むことができなくなってしまいます。</p>
</div>
<p>ただし、これでは二行も使ってしまうのでできれば一行で済ませたいところです。</p>
<p>そこで、読み込むと必ず 0 を返すゼロレジスタを利用します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>こう書けば X1 の値を 0 にするコードが一行で書けてしまいます。</p>
<h2 id="コードの実装" tabindex="-1"><a class="header-anchor" href="#コードの実装" aria-hidden="true">#</a> コードの実装</h2>
<p>X1 レジスタが指し示すアドレスの値を 0 にするアセンブラは<code>STR WZR, [X1]</code>と書くことができました。</p>
<p>そして、本来こういった動作はサブルーチン 19E4678 で行われます。</p>
<p>つまり、サブルーチンに入らずに単に X1 レジスタの値を変更してしまえば期待通りの動作をするはずです。</p>
<p>よって、サブルーチン 19E4678 に分岐するための命令<code>BL sub_19E4678</code>自体を書き換えてしまいましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Before
000864DC                 LDR             X1, [SP,#0x6C0+var_660]
000864E0                 ADRP            X2, #aSpecialcost@PAGE ; "SpecialCost"
000864E4                 SUB             X0, X29, #-var_C8
000864E8                 ADD             X2, X2, #aSpecialcost@PAGEOFF ; "SpecialCost"
000864EC                 STR             X19, [SP,#0x6C0+src]
000864F0                 BL              sub_19E4678

// After
000864DC                 LDR             X1, [SP,#0x6C0+var_660]
000864E0                 ADRP            X2, #aSpecialcost@PAGE ; "SpecialCost"
000864E4                 SUB             X0, X29, #-var_C8
000864E8                 ADD             X2, X2, #aSpecialcost@PAGEOFF ; "SpecialCost"
000864EC                 STR             X19, [SP,#0x6C0+src]
                         STR             WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><code>BL sub_19E4678</code>の命令が書かれているアドレスは 000864F0 ですので、これを<code>STR WZR, [X1]</code>という命令で上書きします。</p>
<p>これはこのままではアセンブラですので、ARM64 が解釈できる機械語に治す必要があります。</p>
<p>以下のサイトで簡単に変換できるので試してみましょう。</p>
<p><a href="http://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a></p>
<p><img src="https://pbs.twimg.com/media/E2cUgdlUUAApUdB?format=png" alt=""></p>
<p>このとき出力される ARM HEX の値をコピーします。</p>
<p>これが ARM64 が解釈できる<code>STR WZR, [X1]</code>という命令になります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Special Cost 0 [tkgling]
@disabled
000864F0 340000F9 // STR X20, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>最終的に、このようなコードが得られたら正解です。</p>
<h3 id="応用" tabindex="-1"><a class="header-anchor" href="#応用" aria-hidden="true">#</a> 応用</h3>
<p>実は今のサブルーチンは各ブキのパラメータが載っている bprm ファイルを読み込んでその値を読み取るという関数でした。</p>
<p>ブキのパラメータはアップデータでコロコロと変わるので、実行ファイルに書くよりもパラメータ名だけ定義しておいて外部ファイルから読み込んだほうが合理的というわけです。</p>
<p>そして、今回のサブルーチンと全く同じ構造を持ったサブルーチンは多数あります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LDR             X1, [SP,#0xXXX]
ADRP            X2, #XYZ ; Parameter
SUB             X0, X29, #-var_C8
ADD             X2, X2, #XYZ ; Parameter
STR             X19, [SP,#0xXXX]
BL              sub_ABCDEFG
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>つまり、こういうサブルーチンであるなら、BL の命令を上書きしてパラメータの値を 0 にすることは簡単だということです。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>基本的には X1 レジスタが指し示す値を変更すれば反映されるはずです。</p>
</div>
<h2 id="最後に" tabindex="-1"><a class="header-anchor" href="#最後に" aria-hidden="true">#</a> 最後に</h2>
<p>IPSwitch のコード開発第一回は少々長くなりましたが、パラメータ名が実行ファイル内で定義されている値を 0 に変更するコードの書き方を学習しました。</p>
<p>次回はある特定の値に変更する方法を学びたいと思います。</p>
<p>記事は以上。</p>
</template>
