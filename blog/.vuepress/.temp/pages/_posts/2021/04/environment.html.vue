<template><h2 id="environmentvalues" tabindex="-1"><a class="header-anchor" href="#environmentvalues" aria-hidden="true">#</a> EnvironmentValues</h2>
<p><a href="https://developer.apple.com/documentation/swiftui/environmentvalues" target="_blank" rel="noopener noreferrer">Apple のドキュメント<OutboundLink/></a>にたくさん載っているのでこれを学んでいきましょう。</p>
<h3 id="locale" tabindex="-1"><a class="header-anchor" href="#locale" aria-hidden="true">#</a> locale</h3>
<p>現在のロケールの環境変数。</p>
<h3 id="timezone" tabindex="-1"><a class="header-anchor" href="#timezone" aria-hidden="true">#</a> timeZone</h3>
<p>タイムゾーンを取得する。Swift では<code>TimeZone.current</code>で取得することもできるが、環境変数を使うほうが良さそうである。</p>
<h3 id="linelimit" tabindex="-1"><a class="header-anchor" href="#linelimit" aria-hidden="true">#</a> lineLimit</h3>
<p>テキストで折返しをするかどうかの環境変数。1 だと折り返さず三点リーダで省略される。</p>
<h3 id="linespacing" tabindex="-1"><a class="header-anchor" href="#linespacing" aria-hidden="true">#</a> lineSpacing</h3>
<h3 id="multilinetextalignment" tabindex="-1"><a class="header-anchor" href="#multilinetextalignment" aria-hidden="true">#</a> multilineTextAlignment</h3>
<p>複数行に渡るテキストをどこで揃えるかどうか。</p>
<h3 id="minimumscalefactor" tabindex="-1"><a class="header-anchor" href="#minimumscalefactor" aria-hidden="true">#</a> minimumScaleFactor</h3>
<p>テキストにおける指定フォントサイズに対して何%まで小さくすることを認めるかの環境変数。</p>
<p>例えば、0.5 としておいてフォントサイズを 20 と指定すればデバイスや表示したい文字の長さによってフォントサイズを 10 まで小さくする。</p>
<h3 id="sizecategory" tabindex="-1"><a class="header-anchor" href="#sizecategory" aria-hidden="true">#</a> sizeCategory</h3>
<h3 id="truncationmode" tabindex="-1"><a class="header-anchor" href="#truncationmode" aria-hidden="true">#</a> truncationMode</h3>
<h3 id="textcase" tabindex="-1"><a class="header-anchor" href="#textcase" aria-hidden="true">#</a> textCase</h3>
<h3 id="font" tabindex="-1"><a class="header-anchor" href="#font" aria-hidden="true">#</a> font</h3>
<p>デフォルトのフォントを指定。</p>
<h3 id="editmode" tabindex="-1"><a class="header-anchor" href="#editmode" aria-hidden="true">#</a> editMode</h3>
<p>編集機能を有効化しているかどうかの環境変数</p>
<h3 id="isenabled" tabindex="-1"><a class="header-anchor" href="#isenabled" aria-hidden="true">#</a> isEnabled</h3>
<p>ユーザの操作を受け付けるかどうかの環境変数。</p>
<h3 id="presentationmode" tabindex="-1"><a class="header-anchor" href="#presentationmode" aria-hidden="true">#</a> presentationMode</h3>
<p>現在のビューが別のビューから呼ばれているかどうかの環境変数。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 定義</span>
@<span class="token function">Environment</span><span class="token punctuation">(</span>\<span class="token punctuation">.</span>presentationMode<span class="token punctuation">)</span> <span class="token keyword">var</span> present<span class="token punctuation">:</span> <span class="token builtin">Bool</span>

<span class="token comment">// 現在のビューを閉じる</span>
present<span class="token punctuation">.</span>wrappedValue<span class="token punctuation">.</span><span class="token function">dismiss</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>このようにすれば画面を閉じることができる、便利。</p>
<h3 id="imagescale" tabindex="-1"><a class="header-anchor" href="#imagescale" aria-hidden="true">#</a> imageScale</h3>
<p>画像のサイズを指定できる。<code>small</code>、<code>medium</code>、<code>large</code>の三つがあった気がするが
<code>large</code>でも全然大きくなくて困る。</p>
<p><code>extraLarge</code>みたいな Enum が欲しい、実装方法ないのかな。</p>
</template>
