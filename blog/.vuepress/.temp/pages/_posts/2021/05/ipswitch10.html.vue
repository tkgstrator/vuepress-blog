<template><h1 id="ipswitch-誰でもできるコード開発-10" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-10" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #10</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2021/02/14/ipswitch09.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #9<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="コードの意味を理解しよう" tabindex="-1"><a class="header-anchor" href="#コードの意味を理解しよう" aria-hidden="true">#</a> コードの意味を理解しよう</h2>
<p>今回は、昔実装した 5.4.0 の<a href="https://tkgstrator.work/posts/2020/11/02/ipswitch08.html" target="_blank" rel="noopener noreferrer">スペシャルをリアルタイムに変更するコード<OutboundLink/></a>を改良していきます。</p>
<p>以前書いたコードは次のようなアセンブラでした。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C STP X29, X30, [SP, #-0x10]!
0104C950 MOV X29, SP
0104C954 ADRP X0, #0x1CB1000
0104C958 LDR X0, [X0, #0xCF8]
0104C95C LDR X0, [X0]
0104C960 BL #0x9A3CC
0104C964 LDR X1, [X0, #0x450]
0104C968 CMP X1, #13
0104C96C LDR X1, [X0, #0x450]
0104C970 ADD X2, X1, #1
0104C974 CSEL X1, X2, XZR, LO
0104C978 STR X1, [X0, #0x450]
0104C97C OP
0104C980 NOP
0104C984 NOP
0104C988 NOP
0104C98C NOP
0104C990 LDP X29, X30, [SP], #0x10
0104C994 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">二回 LDR 命令を読み込んでいる理由</p>
<p>自分の前書いた記事によると、<code>CMP X1, #13</code>を実行した時点で X1 レジスタの値が変わってしまうからだという。</p>
<p>が、ドキュメントを読むと減算結果自体は利用せず、単に NZCV レジスタのビットを更新するだけだと書いてある。</p>
<p>ドキュメントが正しいような気はするのだが、手元で確認できないため二回書くコードをそのまま採用した。</p>
</div>
<p>コードを読めば一番めんどくさいのが<code>CSEL X1, X2, XZR, LO</code>ということがわかる。</p>
<p>IF 文を使って書こうとするとこのように長くなってしまうのだが、三項演算子を使えばスマートに書ける。</p>
<p>基本的にどのプログラミング言語も三項演算子をサポートしており、IF 文よりも簡潔に書ける場合が多いので覚えておくと良い。</p>
<h3 id="三項演算子のルール" tabindex="-1"><a class="header-anchor" href="#三項演算子のルール" aria-hidden="true">#</a> 三項演算子のルール</h3>
<p>三項演算子は以下のように記述できる。</p>
<p><code>X0 = X1 % 2 == 0 ? TRUE : FALSE</code></p>
<p>これだけだとさっぱりだと思うのだが、カッコをつければ幾分わかりやすくなるのではないだろうか。</p>
<p><code>X0 = ((X1 % 2 == 0) ? TRUE : FALSE)</code></p>
<p>三項演算子というだけあって、カッコの中には三つの項が入っており、それぞれ条件式（CONDITION）、真式、偽式と呼ばれている。</p>
<p><code>X0 = (CONDITION ? VALUE IF TRUE : VALUE IF FALSE)</code></p>
<p>つまり、<code>CONDITION</code>の中身が<code>TRUE</code>であれば<code>?</code>の後ろの値を返し、<code>FALSE</code>であれば<code>:</code>の後ろの値を返す。</p>
<p>よって、先程の</p>
<p><code>X0 = X1 % 2 == 0 ? TRUE : FALSE</code></p>
<p>という三項演算子は、</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>X1 <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  X0 <span class="token operator">=</span> TRUE<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  X0 <span class="token operator">=</span> FALSE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>と書いているのと全く等価である。</p>
<p>この章では IF 文は三項演算子に変換可能で、アセンブラでは主にこの三項演算子を使うということを覚えておいてほしい。</p>
<h2 id="csel-の使い方" tabindex="-1"><a class="header-anchor" href="#csel-の使い方" aria-hidden="true">#</a> CSEL の使い方</h2>
<p>そして先程書いた CSEL というのは IF 文というよりは、三項演算子に近い考え方ができる。</p>
<p>コード内では<code>CSEL X1, X2, XZR, LO</code>という命令が出てきたが、これは C 言語風に<code>X1 = NZCV is LO ? X2 : XZR</code>という三項演算子に変換できる。</p>
<p>つまり「NZCV が LO なら X1 = X2 とし、LO でないなら X1 = XZR とする」という意味になる。</p>
<p>XZR というのは読み込めば常に 0 を返すゼロレジスタと呼ばれるものなので「NZCV が LO なら X1 = X2 とし、LO でないなら X1 = 0 とする」と読み替えても良い。</p>
<h3 id="条件フラグとサフィックス" tabindex="-1"><a class="header-anchor" href="#条件フラグとサフィックス" aria-hidden="true">#</a> 条件フラグとサフィックス</h3>
<p>ここまで理解できれば「NZCV と LO は何なのだろう」という疑問が当然浮かぶ。</p>
<p>NZCV は条件フラグと呼ばれる特殊なレジスタで、計算の結果におけるフラグを保存しているレジスタである。</p>
<p>例えば、計算結果が桁上りしたとか、そういうデータを持っている。</p>
<p>何故 NZCV などという名前がついているかというと、一つのレジスタで次の四つのフラグ情報を扱っているからである。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">1</th>
<th style="text-align:center">0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">N</td>
<td style="text-align:center">x &lt; 0</td>
<td style="text-align:center">x &gt;= 0</td>
</tr>
<tr>
<td style="text-align:center">Z</td>
<td style="text-align:center">x = 0</td>
<td style="text-align:center">x != 0</td>
</tr>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center">桁あふれ発生</td>
<td style="text-align:center">桁あふれなし</td>
</tr>
<tr>
<td style="text-align:center">V</td>
<td style="text-align:center">オーバーフロー</td>
<td style="text-align:center">オーバーフローなし</td>
</tr>
</tbody>
</table>
<ul>
<li>N (Negative or Not)
<ul>
<li>計算結果が負かどうかを判定する</li>
</ul>
</li>
<li>Z (Zero or Not)
<ul>
<li>計算結果が 0 かどうかを判定する</li>
</ul>
</li>
<li>C (Carry or Not)
<ul>
<li>キャリー（桁あふれ）が発生したかどうかを判定する</li>
</ul>
</li>
<li>V
<ul>
<li>オーバーフローしたかどうかを判定する</li>
</ul>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">なんで V なのか</p>
<p>Buffer overflow なら B とか O を使いそうなものなのに、何故 V なのかちょっとよくわからない（理由があるのだろうけれど）</p>
</div>
<p>LO というのは先程の三項演算子内の<code>NZCV is LO</code>という擬似コードを解釈するためのサフィックスであり、ARM64 には次の 16 のサフィックスがあります。</p>
<p>全部は覚えなくていいけど、いくつか覚えておくと条件文が書きやすくなります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">サフィックス</th>
<th style="text-align:center">意味</th>
<th style="text-align:center">フラグ</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">EQ</td>
<td style="text-align:center">Equal</td>
<td style="text-align:center">Z = 1</td>
</tr>
<tr>
<td style="text-align:center">NE</td>
<td style="text-align:center">Not Equal</td>
<td style="text-align:center">Z = 0</td>
</tr>
<tr>
<td style="text-align:center">CS/HS</td>
<td style="text-align:center">-</td>
<td style="text-align:center">C = 1</td>
</tr>
<tr>
<td style="text-align:center">CC/LO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">C = 0</td>
</tr>
<tr>
<td style="text-align:center">MI</td>
<td style="text-align:center">Minus</td>
<td style="text-align:center">N = 1</td>
</tr>
<tr>
<td style="text-align:center">PL</td>
<td style="text-align:center">Plus</td>
<td style="text-align:center">N = 0</td>
</tr>
<tr>
<td style="text-align:center">VS</td>
<td style="text-align:center">-</td>
<td style="text-align:center">V = 1</td>
</tr>
<tr>
<td style="text-align:center">VC</td>
<td style="text-align:center">-</td>
<td style="text-align:center">V = 0</td>
</tr>
<tr>
<td style="text-align:center">HI</td>
<td style="text-align:center">-</td>
<td style="text-align:center">C = 1 AND Z =0</td>
</tr>
<tr>
<td style="text-align:center">LS</td>
<td style="text-align:center">-</td>
<td style="text-align:center">C= 0 OR Z = 1</td>
</tr>
<tr>
<td style="text-align:center">GE</td>
<td style="text-align:center">Greater Equal</td>
<td style="text-align:center">N = V</td>
</tr>
<tr>
<td style="text-align:center">LT</td>
<td style="text-align:center">Lower Than</td>
<td style="text-align:center">N &lt;&gt; V</td>
</tr>
<tr>
<td style="text-align:center">GT</td>
<td style="text-align:center">Greater Than</td>
<td style="text-align:center">Z = 0 AND N = V</td>
</tr>
<tr>
<td style="text-align:center">LE</td>
<td style="text-align:center">Lower Equal</td>
<td style="text-align:center">Z = 1 OR N &lt;&gt; V</td>
</tr>
<tr>
<td style="text-align:center">AL</td>
<td style="text-align:center">Always</td>
<td style="text-align:center">Any</td>
</tr>
<tr>
<td style="text-align:center">NV</td>
<td style="text-align:center">Never</td>
<td style="text-align:center">Any</td>
</tr>
</tbody>
</table>
<p>これを見ると最初のアセンブラであった<code>CSEL X1, X2, XZR, LO</code>が C 言語風に<code>X1 = NZCV is LO ? X2 : XZR</code>と書け更にサフィックスを理解することで<code>X1 = C == 0 ? X2 : XZR</code>と変化するのがわかるでしょうか。</p>
<div class="custom-container tip"><p class="custom-container-title">C == 0 なわけ</p>
<p>サフィックスのフラグでは<code>C = 0</code>となっているのに、何故三項演算子内では<code>C == 0</code>になっているのかと気になるかもしれない。</p>
<p>フラグの方はあくまでも人間的にわかりやすい書き方なので<code>C = 0</code>と書いてあるが、プログラミング的には IF (<code>C == 0</code>) という意味になる。</p>
</div>
<h2 id="ここまでの流れ" tabindex="-1"><a class="header-anchor" href="#ここまでの流れ" aria-hidden="true">#</a> ここまでの流れ</h2>
<p>話がややこしくなってきたので、ここで一旦まとめてみます。</p>
<ul>
<li><code>CSEL X1, X2, XZR, LO</code>が条件文になっている</li>
<li>条件文といえば IF 文が思い浮かぶが、これはどちらかといえば三項演算子に近い</li>
<li>三項演算子は<code>X0 = (CONDITION ? VALUE IF TRUE : VALUE IF FALSE)</code>という書き方をする</li>
</ul>
<p>この三項演算子は以下の IF 文と等価である。</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>CONDITION <span class="token operator">==</span> TRUE<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  X0 <span class="token operator">=</span> TRUE<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  X0 <span class="token operator">=</span> FALSE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li><code>CSEL X1, X2, XZR, LO</code>は三項演算子に変換すると<code>X1 = NZCV is LO ? X2 : XZR</code>となる
<ul>
<li>NZCV は条件フラグレジスタ</li>
<li>LO はサフィックスを意味する</li>
<li>NZCV レジスタの LO 判定が TRUE なら X2、FALSE なら XZR を返す</li>
</ul>
</li>
</ul>
<p>じゃあ「NZCV の LO 判定」とは何なのか、ということですね。</p>
<p>ここでさっきの上の表を見れば「LO 判定」というのは「キャリーフラグが 0 かどうか」というところしか見ていません。</p>
<p>「え、でもキャリーフラグなんてどこでも弄ってないよ」と思うかもしれませんが、実は<code>CMP X1, #13</code>を実行したときにこっそり更新されていたのです。</p>
<h3 id="nzcv-レジスタを更新する命令" tabindex="-1"><a class="header-anchor" href="#nzcv-レジスタを更新する命令" aria-hidden="true">#</a> NZCV レジスタを更新する命令</h3>
<p>全ての命令が NZCV レジスタを更新するわけではありません。</p>
<p>全部を覚える必要もやはりないのですが、命令名に S がついている場合は更新すると覚えておくと良いかもしれません。</p>
<p>例えば ADD 命令や SUB 命令は NZCV レジスタを更新しませんが ADDS 命令や SUBS 命令はその計算結果で NZCV レジスタを更新します。</p>
<p>「CMP 命令は S ついてないのに NZCV レジスタを更新してるじゃん」と思うかもしれませんが、実は CMP 命令はアセンブラから機械語に翻訳されるときに SUBS として解釈されます。</p>
<p>つまり、CMP 命令というものは実際には存在しない命令なのです。</p>
<p>で、全部書くとあまりにも長いので主要な命令と C と Z に関する判定をまとめてみました。</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">例</th>
<th style="text-align:center">意味</th>
<th style="text-align:center">C = 1</th>
<th style="text-align:center">C = 0</th>
<th style="text-align:center">Z = 1</th>
<th style="text-align:center">Z = 0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">CMP</td>
<td style="text-align:center">CMP X1, X2</td>
<td style="text-align:center">SUBS XZR, X1, X2</td>
<td style="text-align:center">X1 &gt; = X2</td>
<td style="text-align:center">X1 &lt; X2</td>
<td style="text-align:center">X1 == X2</td>
<td style="text-align:center">X1 != X2</td>
</tr>
<tr>
<td style="text-align:center">CMN</td>
<td style="text-align:center">CMN X1, X2</td>
<td style="text-align:center">ADDS XZR, X1, X2</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">SUBS</td>
<td style="text-align:center">SUBS X0, X1, X2</td>
<td style="text-align:center">X0 = X1 - X2</td>
<td style="text-align:center">X1 &gt; = X2</td>
<td style="text-align:center">X1 &lt; X2</td>
<td style="text-align:center">X1 == X2</td>
<td style="text-align:center">X1 != X2</td>
</tr>
<tr>
<td style="text-align:center">ADDS</td>
<td style="text-align:center">ADDS X0, X1, X2</td>
<td style="text-align:center">X0 = X1 + X2</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">NEGS</td>
<td style="text-align:center">NEGS X1, X2</td>
<td style="text-align:center">SUBS X1, XZR, X2</td>
<td style="text-align:center">0 &gt;= X2</td>
<td style="text-align:center">0 &lt; X2</td>
<td style="text-align:center">0 == X2</td>
<td style="text-align:center">0 != X2</td>
</tr>
</tbody>
</table>
<p>簡単な条件文を書くだけなら C と Z の条件フラグだけ見れば十分です。</p>
<div class="custom-container tip"><p class="custom-container-title">NZCV フラグについて</p>
<p>CMP 命令は NZCV フラグのうち C と Z を引数の値によって変化させる。</p>
<p><code>CMP X1, X2</code>という命令が与えられたとき<code>X1 == X2</code>であれば<code>Z = 1</code>、そうでなければ<code>Z = 0</code>となり、<code>X1 &gt;= X2</code>であれば<code>C = 1</code>、<code>X1 &lt; X2</code>であれば <code>C = 0</code>となる。</p>
<p>注意すべき点は一回の CMP 命令で C と Z のフラグのどちらも変化するということです。</p>
</div>
<h3 id="前回のコードの解説" tabindex="-1"><a class="header-anchor" href="#前回のコードの解説" aria-hidden="true">#</a> 前回のコードの解説</h3>
<p><code>CSEL X1, X2, XZR, LO</code>という命令は、<code>X1 = NZCV is LO ? X2 : XZR</code>となり、<code>NZCV is LO</code>というのが「キャリーフラグが 0 かどうか」を判定しているサフィックスなので最終的に<code>X1 = C == 0 ? X2 : XZR</code>と解釈されることがわかった。</p>
<p>キャリーフラグはどこでも更新されていないように見えるが、実は<code>CMP</code>命令で更新されており、上の表を見ると<code>CMP Xm, Xn</code>という命令だと<code>Xm &lt; Xn</code>ならばキャリーフラグ 0 が入ることがわかる。</p>
<p>よって、<code>X1 = C == 0 ? X2 : XZR</code>は今回の場合<code>X1 = Xm &lt; Xn ? X2 : XZR</code>と扱うことができる。</p>
<p>更に、コード内 CMP 命令は<code>CMP X1, #13</code>というものだったので、最終的に<code>X1 = X1 &lt; 13 ? X2 : XZR</code>という命令が得られる。</p>
<p>これを擬似コードで書くと、</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>X1 <span class="token operator">&lt;</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> X2<span class="token punctuation">;</span> <span class="token comment">// X2 = X1 + 1</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> XZR<span class="token punctuation">;</span> <span class="token comment">// XZR = 0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>となり、X1（現在のスペシャルの ID）の値が 12 以下の場合は X1 の値を 1 増やし、13 以上のときは 0 を返すという処理が実行できていたわけです。</p>
<div class="custom-container tip"><p class="custom-container-title">今更ながら思ったのだが</p>
<p>LO サフィックスは C（キャリーフラグ）が 0 ということしか見ていないので、値が負であるかどうかは考慮されていない。</p>
<p>今回のコードでは問題なかったが N（正負フラグ）が 1（負数）であることもチェックすべきである。</p>
<p>なので LO（<code>C = 0</code>のみチェック）よりも LS（<code>C = 0</code>または<code>Z = 1</code>）で判定したほうが良かった。</p>
</div>
<h2 id="コードを修正しよう" tabindex="-1"><a class="header-anchor" href="#コードを修正しよう" aria-hidden="true">#</a> コードを修正しよう</h2>
<p>スプラトゥーン 2 におけるスペシャルの内容と ID は以下の表のようになっています。</p>
<table>
<thead>
<tr>
<th style="text-align:center">id</th>
<th style="text-align:center">Name</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">SuperMissile</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">SuperArmor</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">LauncherSplash</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">LauncherSuction</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">LauncherQuick</td>
</tr>
<tr>
<td style="text-align:center">5</td>
<td style="text-align:center">LauncherCurling</td>
</tr>
<tr>
<td style="text-align:center">6</td>
<td style="text-align:center">LauncherRobo</td>
</tr>
<tr>
<td style="text-align:center">7</td>
<td style="text-align:center">WaterCutter</td>
</tr>
<tr>
<td style="text-align:center">8</td>
<td style="text-align:center">Jetpack</td>
</tr>
<tr>
<td style="text-align:center">9</td>
<td style="text-align:center">SuperLanding</td>
</tr>
<tr>
<td style="text-align:center">10</td>
<td style="text-align:center">RainCloud</td>
</tr>
<tr>
<td style="text-align:center">11</td>
<td style="text-align:center">AquaBall</td>
</tr>
<tr>
<td style="text-align:center">12</td>
<td style="text-align:center">SuperBubble</td>
</tr>
<tr>
<td style="text-align:center">13</td>
<td style="text-align:center">Shachihoko</td>
</tr>
<tr>
<td style="text-align:center">14</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">15</td>
<td style="text-align:center">RainCloudEnemy</td>
</tr>
<tr>
<td style="text-align:center">16</td>
<td style="text-align:center">MissileMissilePosition</td>
</tr>
<tr>
<td style="text-align:center">17</td>
<td style="text-align:center">SuperBall</td>
</tr>
<tr>
<td style="text-align:center">18</td>
<td style="text-align:center">SuperStamp</td>
</tr>
<tr>
<td style="text-align:center">19</td>
<td style="text-align:center">BigLaser</td>
</tr>
</tbody>
</table>
<p>前回のコードではスペシャル ID を 1 ずつズラし、13 まで増えると 0 に戻すという処理をしていましたが、そうしないと 14 番目の空っぽのデータにアクセスしてゲームがクラッシュしてしまっていたからです。</p>
<p>で、前回はガチホコまでスペシャルを移動させたら 0 のマルチミサイルに戻すという処理をしていたので、17, 18, 19 の ID を持つナイスダマやウルトラハンコに変更することができませんでした。</p>
<p>今回はコードを改良してナイスダマなどにも変更できるようにします。</p>
<p>ただ、15, 16 はパッと見た感じプレイヤーが使えそうなスペシャルではないのでここでは考えないものとします。</p>
<p>いきなりアセンブラを書くのは難しいので、まずはフローチャートから考えてみましょう。</p>
<p><img src="https://pbs.twimg.com/media/E2Rlck8VoAAIbw5?format=png" alt=""></p>
<p>要するに 13 のときと 19 のときで二回条件文を書けば良いことになります。</p>
<p>これを擬似コードで書くとこうなります。</p>
<p>else 節の中でまた if 文を書かなければいけないことになります。</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>X1 <span class="token operator">==</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> <span class="token number">17</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>X1 <span class="token operator">==</span> <span class="token number">19</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    X1 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    X1 <span class="token operator">=</span> X1 <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>これだとややこしいので、以下のように書き換えます。</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>X1 <span class="token operator">==</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> <span class="token number">17</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> X1 <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>X1 <span class="token operator">==</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  X1 <span class="token operator">=</span> X1
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>つまり、最初の IF 文で 17 にするか、1 を足すかを判定し、次の IF 文で 1 足された数が 20 かどうか（さっきまでの値が 19 だったかどうか）を判定しするというわけです。</p>
<p>こうすれば IF 文が入れ子にならないので簡単にかけます。</p>
<div class="custom-container tip"><p class="custom-container-title">IF 文（条件文の入れ子）について</p>
<p>入れ子になった条件文は B（ジャンプ）命令などを使わないと書けないと思う、多分。</p>
</div>
<p>まず、最初の IF 文は次のように書けます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LDR X1, [X0, #0x450]
CMP X1, #13
ADD X2, X1, #1      // X2 = X1 + 1
MOV X3, #17         // X3 = 17
CSEL X1, X3, X2, EQ // X1 = X1 == 13 ? X3 : X2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>X1 = X1 == 13 ? X3 : X2</code>の部分は<code>X2 = X1 + 1, X3 = 17</code>ということがわかっているので、<code>X1 = X1 == 13 ? 17 : X1 + 1</code>と解釈できるので「13 以外なら 1 を足し、13 なら 17 にする」というコードが実装できます。</p>
<p>次の IF 文は「20 以下ならそのまま、そうでないなら 0」というコードを書けば良いです。</p>
<p>0 にするのはゼロレジスタである XZR が使えるので、</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>CMP X1, #20
CSEL X1, X1, XZR, LO // X1 = X1 &lt; 20 ? X1 : XZR
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>と書くことができます。</p>
<p>つまり、これら二つをまとめると以下のコードになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LDR X1, [X0, #0x450]
CMP X1, #13
ADD X2, X1, #1
MOV X3, #17
CSEL X1, X3, X2, EQ
CMP X1, #20
CSEL X1, X1, XZR, LO
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="コードを書く" tabindex="-1"><a class="header-anchor" href="#コードを書く" aria-hidden="true">#</a> コードを書く</h2>
<p>ここまでをまとめると次のようにかけることになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C STP X29, X30, [SP, #-0x10]!
0104C950 MOV X29, SP
0104C954 ADRP X0, #0x01CB1000
0104C958 LDR X0, [X0, #0xCF8]
0104C95C LDR X0, [X0]
0104C960 BL #0x9A3CC
0104C964 LDR X1, [X0, #0x450]
0104C968 CMP X1, #13
0104C96C ADD X2, X1, #1
0104C970 MOV X3, #17
0104C974 CSEL X1, X3, X2, EQ
0104C978 CMP X1, #20
0104C97C CSEL X1, X1, XZR, LO
0104C980 STR X1, [X0, #0x450]
0104C984 NOP
0104C988 NOP
0104C98C NOP
0104C990 LDP X29, X30, [SP], #0x10
0104C994 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>あとはこれを<a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>に突っ込んであげればおしまいです。</p>
<div class="custom-container danger"><p class="custom-container-title">BL 命令がズレる件について</p>
<p><a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>で BL 命令を変換するとナゾのオフセットがついて変換したコードがバグってしまうので BL 命令だけは必ず単体で変換するようにしましょう。</p>
</div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change Special by Signal (5.4.0) [tkgling]
@disabled
0104C94C FD7BBFA9 // STP X29, X30, [SP, #-0x10]!
0104C950 FD030091 // MOV X29, SP
0104C954 80E500B0 // ADRP X0, #0x01CB1000
0104C958 007C46F9 // LDR X0, [X0, #0xCF8]
0104C95C 000040F9 // LDR X0, [X0]
0104C960 F3680294 // BL #0x9A3CC
0104C964 012842F9 // LDR X1, [X0, #0x450]
0104C968 3F3400F1 // CMP X1, #13
0104C96C 22040091 // ADD X2, X1, #1
0104C970 230280D2 // MOV X3, #17
0104C974 4100839A // CSEL X1, X3, X2, EQ
0104C978 3F5000F1 // CMP X1, #20
0104C97C 21309F9A // CSEL X1, X1, XZR, LO
0104C980 012802F9 // STR X1, [X0, #0x450]
0104C984 1F2003D5 // NOP
0104C988 1F2003D5 // NOP
0104C98C 1F2003D5 // NOP
0104C990 FD7BC1A8 // LDP X29, X30, [SP], #0x10
0104C994 C0035FD6 // RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><video controls src="https://video.twimg.com/ext_tw_video/1397378347756253184/pu/vid/1280x720/XjsHhgwjEO_S4-uh.mp4"></video></p>
<p>ナイス玉やハンコへの切り替え、センパイキャノンも撃ててますね。</p>
<h2 id="if-文の書き方まとめ" tabindex="-1"><a class="header-anchor" href="#if-文の書き方まとめ" aria-hidden="true">#</a> IF 文の書き方まとめ</h2>
<table>
<thead>
<tr>
<th style="text-align:center">三項演算子</th>
<th style="text-align:center">アセンブラ</th>
<th style="text-align:center">IF 文</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>Xd = X1 == X2 ? Xm : Xn</code></td>
<td style="text-align:center"><code>CMP X1, X2</code> <br> <code>CSEL Xd, Xm, Xn, EQ</code></td>
<td style="text-align:center"><code>IF (X1 == X2) { Xd = Xm } ELSE { Xd = Xn }</code></td>
</tr>
<tr>
<td style="text-align:center"><code>Xd = X1 != X2 ? Xm : Xn</code></td>
<td style="text-align:center"><code>CMP X1, X2</code> <br> <code>CSEL Xd, Xm, Xn, NE</code></td>
<td style="text-align:center"><code>IF (X1 != X2) { Xd = Xm } ELSE { Xd = Xn }</code></td>
</tr>
<tr>
<td style="text-align:center"><code>Xd = X1 &lt;= X2 ? Xm : Xn</code></td>
<td style="text-align:center"><code>CMP X1, X2</code> <br> <code>CSEL Xd, Xm, Xn, LE</code></td>
<td style="text-align:center"><code>IF (X1 &lt;= X2) { Xd = Xm } ELSE { Xd = Xn }</code></td>
</tr>
<tr>
<td style="text-align:center"><code>Xd = X1 &lt; X2 ? Xm : Xn</code></td>
<td style="text-align:center"><code>CMP X1, X2</code> <br> <code>CSEL Xd, Xm, Xn, LS</code></td>
<td style="text-align:center"><code>IF (X1 &lt; X2) { Xd = Xm } ELSE { Xd = Xn }</code></td>
</tr>
<tr>
<td style="text-align:center"><code>Xd = X1 &gt;= X2 ? Xm : Xn</code></td>
<td style="text-align:center"><code>CMP X1, X2</code> <br> <code>CSEL Xd, Xm, Xn, GE</code></td>
<td style="text-align:center"><code>IF (X1 &gt;= X2) { Xd = Xm } ELSE { Xd = Xn }</code></td>
</tr>
<tr>
<td style="text-align:center"><code>Xd = X1 &gt; X2 ? Xm : Xn</code></td>
<td style="text-align:center"><code>CMP X1, X2</code> <br> <code>CSEL Xd, Xm, Xn, GT</code></td>
<td style="text-align:center"><code>IF (X1 &gt; X2) { Xd = Xm } ELSE { Xd = Xn }</code></td>
</tr>
</tbody>
</table>
<p>演算子の向きはどちらか一方だけ覚えておけばもう一方はレジスタを入れ替えるだけなので覚えなくても大丈夫だったりします。</p>
<h2 id="課題" tabindex="-1"><a class="header-anchor" href="#課題" aria-hidden="true">#</a> 課題</h2>
<p>以下のコードと同様の効果を持つコードを別のアセンブラで実装してください。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C968 3F3400F1 // CMP X1, #13
0104C96C 22040091 // ADD X2, X1, #1
0104C970 230280D2 // MOV X3, #17
0104C974 4100839A // CSEL X1, X3, X2, EQ
0104C978 3F5000F1 // CMP X1, #20
0104C97C 21309F9A // CSEL X1, X1, XZR, LO
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>命令数は増えても減ってもいいですが、空き命令があと三つしかないので最大九命令までとします。</p>
<h3 id="回答例" tabindex="-1"><a class="header-anchor" href="#回答例" aria-hidden="true">#</a> 回答例</h3>
<p><code>0104C974 4110839A // CSEL X1, X2, X3, NE</code>とすれば条件文と中身のどちらも反転させるので「反転の反転」で元のコードと同じ効果を持ちます。</p>
<p>記事は以上。</p>
</template>
