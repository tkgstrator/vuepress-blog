<template><h2 id="paramhash" tabindex="-1"><a class="header-anchor" href="#paramhash" aria-hidden="true">#</a> ParamHash</h2>
<p><a href="https://github.com/tkgstrator/ParamHash/releases" target="_blank" rel="noopener noreferrer">ParamHash<OutboundLink/></a></p>
<p>解説すると長くなるのだが、スプラトゥーン 2 では XML のパラメータファイルが BPRM、BYML、BYAML といったファイルに暗号化されている。</p>
<p>この暗号化自体は<a href="https://github.com/exelix11/TheFourthDimension/releases" target="_blank" rel="noopener noreferrer">The4Dimension<OutboundLink/></a>というツールを使えば復号できるのだが、パラメータ名が CRC32 でハッシュ化されているためそのままでは読むことができない。</p>
<p>また、CRC32 はハッシュであり暗号化ではないため一意の復号もできない。そこで、スプラトゥーン 2 で定義されているパラメータ名を片っ端から抽出して、それを CRC32 でハッシュ化し、ハッシュリストをつくることにした。</p>
<h3 id="パラメータ名の抽出とハッシュ化" tabindex="-1"><a class="header-anchor" href="#パラメータ名の抽出とハッシュ化" aria-hidden="true">#</a> パラメータ名の抽出とハッシュ化</h3>
<p>やり方は全くわからなかったので、<a href="https://twitter.com/shadowninja108" target="_blank" rel="noopener noreferrer">@shadowninja108<OutboundLink/></a>氏に協力を依頼した。</p>
<p>すると一時間も経たずに 5.4.0 向けのパラメータファイルを抽出してくれた、やはり天才である。</p>
<p>あとはそのパラメータファイルを CRC32 でハッシュ化し、それを CSV として出力すれば良い。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> zlib

<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>INPUTFILE<span class="token punctuation">,</span> mode<span class="token operator">=</span><span class="token string">"r"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"param.csv"</span><span class="token punctuation">,</span> mode<span class="token operator">=</span><span class="token string">"w"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> w<span class="token punctuation">:</span>
<span class="token keyword">for</span> line <span class="token keyword">in</span> f<span class="token punctuation">:</span>
param <span class="token operator">=</span> line<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token builtin">hash</span> <span class="token operator">=</span> <span class="token builtin">format</span><span class="token punctuation">(</span>zlib<span class="token punctuation">.</span>crc32<span class="token punctuation">(</span>param<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"ascii"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xFFFFFFFF</span><span class="token punctuation">,</span> <span class="token string">"x"</span><span class="token punctuation">)</span>
param <span class="token operator">=</span> param<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span>
w<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hash</span><span class="token punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token punctuation">{</span>param<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">[</span><span class="token punctuation">}</span></span><span class="token string">\\n"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>それ自体は上のようなコードで実装できる。とても簡単である。</p>
<p>これで全てのハッシュを出力できたかと思ったのだが、shadowninja108 氏の手法では一部のパラメータを抽出し損ねているようでサーモンランに関するパラメータが全く見つからなかった。</p>
<p>そこで<a href="https://twitter.com/leanyoshi" target="_blank" rel="noopener noreferrer">@leanyoshi<OutboundLink/></a>氏が公開しており旧バージョンの ParamHash でも使っていた CSV ファイルを組み合わせることにした。</p>
<p>重複するものを削除して全部で 11159 通りの<a href="https://github.com/tkgstrator/ParamHash/blob/python/param.csv" target="_blank" rel="noopener noreferrer">パラメータとハッシュのリスト<OutboundLink/></a>が完成した。</p>
<h2 id="使い方" tabindex="-1"><a class="header-anchor" href="#使い方" aria-hidden="true">#</a> 使い方</h2>
<p>使い方についてはリリースページを見ていただきたいのだが、The4Dimension と組み合わせることで BPRM、BYML、BYAML を XML に復号し、復号した XML のハッシュをパラメータ名に置換するところまでを自動で行ってくれる。</p>
<p>また、逆変換にも対応しており、置換された XML をハッシュ化し、暗号化することにも対応した。</p>
<p>なので、このツールを使えば編集するファイルはパラメータ名に置換された XML ファイルだけということになる。</p>
<p>いままで「XML に復号」「XML のハッシュを置換」「置換した XML と比較して置換前 XML を編集」「置換前 XML を暗号化」という作業が必要だったのが、「置換済み XML に復号」「置換済み XML を編集」「置換済み XML を暗号化」という風に一つ作業を減らすことができるようになった。</p>
<p>ちまちまパラメータ名を比較しながら作業しなくて良いのでミスも減るし、全てのファイルを一度に変換できるので楽になったはずだ。</p>
<h3 id="おまけ" tabindex="-1"><a class="header-anchor" href="#おまけ" aria-hidden="true">#</a> おまけ</h3>
<p>Python って本当に楽、あと焼き肉食べたい。</p>
<p>で、気付いたのだがパラメータ名からハッシュにする際に型を無視してしまっているので逆変換はできないことに気付いた（ダメじゃん</p>
<p>なので逆変換はしないでください！！</p>
<p>記事は以上。</p>
</template>
