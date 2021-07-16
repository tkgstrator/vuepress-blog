<template><h1 id="swiftlint" tabindex="-1"><a class="header-anchor" href="#swiftlint" aria-hidden="true">#</a> <a href="https://github.com/realm/SwiftLint" target="_blank" rel="noopener noreferrer">SwiftLint<OutboundLink/></a></h1>
<p>SwiftLint とは realm が開発した GitHub Swift Style Guide に準拠するようにコードを分析して警告やエラーをだしてくれる解析ツールのこと。</p>
<p>割と使う人が多いらしいのだが、個人的にはあんまり好きではない。</p>
<p>が、使うとなったときに設定方法がいまいちわからなかったので設定可能なルールやその内容を解説していく。</p>
<h2 id="インストール" tabindex="-1"><a class="header-anchor" href="#インストール" aria-hidden="true">#</a> インストール</h2>
<p>公式では CocoaPods でのインストール方法が推奨されているが、特に理由がないなら brew を使ってローカルにインストールしてしまうほうが良いと思う。</p>
<h3 id="cocoapods" tabindex="-1"><a class="header-anchor" href="#cocoapods" aria-hidden="true">#</a> CocoaPods</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pod 'SwiftLint'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="mint" tabindex="-1"><a class="header-anchor" href="#mint" aria-hidden="true">#</a> Mint</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mint install realm/SwiftLint
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="homebrew" tabindex="-1"><a class="header-anchor" href="#homebrew" aria-hidden="true">#</a> Homebrew</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>brew install swiftlint
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> Build</h3>
<p>ソースコードから直接ビルドする方法もある。この場合、Xcode12 以上が要求されるので注意。</p>
<h3 id="pkg" tabindex="-1"><a class="header-anchor" href="#pkg" aria-hidden="true">#</a> PKG</h3>
<p>公式レポジトリで PKG(<code>SwiftLint.pkg</code>)が<a href="https://github.com/realm/SwiftLint/releases/tag/0.43.1" target="_blank" rel="noopener noreferrer">配布<OutboundLink/></a>されているのでそれをインストールしてしまっても良い。</p>
<h2 id="設定方法" tabindex="-1"><a class="header-anchor" href="#設定方法" aria-hidden="true">#</a> 設定方法</h2>
<p>Xcode を開いてプロジェクトを選択したら<code>Build Phases</code>を選び、左上の<code>+</code>を押して<code>New Run Script Phase</code>を作成。</p>
<p>このとき、SwiftLint のインストール方法によって書くコマンドが変わってくるので注意しよう。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Mint以外</span>
<span class="token comment"># Type a script or drag a script file from your workspace to insert its path.</span>
<span class="token keyword">if</span> <span class="token function">which</span> swiftlint <span class="token operator">></span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span>
  swiftlint autocorret --format
  swiftlint
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Mint</span>
<span class="token comment"># Type a script or drag a script file from your workspace to insert its path.</span>
<span class="token keyword">if</span> <span class="token function">which</span> mint <span class="token operator">></span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span>
  mint run swiftlint swiftlint autocorrect --format
  mint run swiftlint swiftlint
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"warning: Mint not installed, download from https://github.com/yonaskolb/Mint"</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="ルール一覧" tabindex="-1"><a class="header-anchor" href="#ルール一覧" aria-hidden="true">#</a> ルール一覧</h2>
<p>全部まとめてるとそれだけで時間を無限に消費してしまうので詳しくは<a href="https://realm.github.io/SwiftLint/rule-directory.html" target="_blank" rel="noopener noreferrer">ドキュメント<OutboundLink/></a>をみてください。</p>
<p>自分がよく遭遇する警告・エラーについては以下の通り。</p>
<h3 id="comma-spacing" tabindex="-1"><a class="header-anchor" href="#comma-spacing" aria-hidden="true">#</a> Comma Spacing</h3>
<p>カンマは前にスペースがあってはダメで、後ろに一つだけつけるべきだというルール。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Good</span>
<span class="token keyword">func</span> <span class="token function">abc</span><span class="token punctuation">(</span>a<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> b<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token comment">// Bad</span>
<span class="token keyword">func</span> <span class="token function">abc</span><span class="token punctuation">(</span>a<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">,</span>b<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="colon-spacing" tabindex="-1"><a class="header-anchor" href="#colon-spacing" aria-hidden="true">#</a> Colon Spacing</h3>
<p>コロンの後にはスペースを一つあけるべきだというルール。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">//Good</span>
<span class="token keyword">let</span> abc<span class="token punctuation">:</span> <span class="token builtin">Void</span>

<span class="token comment">// Bad</span>
<span class="token keyword">let</span> abc<span class="token punctuation">:</span><span class="token builtin">Void</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="identifier-name" tabindex="-1"><a class="header-anchor" href="#identifier-name" aria-hidden="true">#</a> Identifier Name</h3>
<p>命名する場合には小文字から始まるか、全て大文字であるべきだというルール。例外として変数名で static 変数か定数の場合は大文字から始まっても良い。また、変数名は短すぎても長すぎてもいけない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Good</span>
<span class="token keyword">let</span> myLet <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">var</span> myVar <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">let</span> <span class="token constant">URL</span><span class="token punctuation">:</span> <span class="token constant">URL</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span>

<span class="token comment">// Bad</span>
<span class="token keyword">let</span> <span class="token builtin">MyLet</span> <span class="token operator">=</span> <span class="token number">0</span>   <span class="token comment">// 大文字から始まってはいけない</span>

<span class="token keyword">let</span> _myLet <span class="token operator">=</span> <span class="token number">0</span>  <span class="token comment">// _から始まってはいけない</span>

<span class="token keyword">var</span> id  <span class="token operator">=</span> <span class="token number">0</span>     <span class="token comment">// 短すぎる</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="legacy-random" tabindex="-1"><a class="header-anchor" href="#legacy-random" aria-hidden="true">#</a> Legacy Random</h3>
<p>古い擬似乱数生成関数を使うべきではない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Good</span>
<span class="token builtin">Int</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">)</span>

<span class="token builtin">Double</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">8.6</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">111.34</span><span class="token punctuation">)</span>

<span class="token builtin">Float</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment">// Bad</span>
<span class="token function">arc4random</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>

<span class="token function">arc4random_uniform</span><span class="token punctuation">(</span><span class="token number">83</span><span class="token punctuation">)</span>

<span class="token function">drand48</span><span class="token punctuation">(</span><span class="token number">52</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="type-name" tabindex="-1"><a class="header-anchor" href="#type-name" aria-hidden="true">#</a> Type Name</h3>
<p>型名は英数字のみで戦闘は大文字、長さは 3-40 の範囲にするべき。</p>
<div class="custom-container tip"><p class="custom-container-title">Type Name について</p>
<p>型名というのはクラス名や構造体名、Enum 名、プロトコル名などが該当する。</p>
<p>また、忘れやすいが<code>typealias</code>も Type Name 扱いなので覚えておきたい。</p>
</div>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Good</span>
<span class="token keyword">class</span> <span class="token class-name">MyType</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">_MyType</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// Bad</span>
<span class="token keyword">class</span> <span class="token class-name">myType</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>	    <span class="token comment">// 小文字から始まってはいけない</span>

<span class="token keyword">class</span> <span class="token class-name">_MyType</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>    <span class="token comment">// _から始まってはいけない</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="force-try" tabindex="-1"><a class="header-anchor" href="#force-try" aria-hidden="true">#</a> Force Try</h3>
<p><code>try!</code>は避けるべきだというルール。</p>
<div class="custom-container tip"><p class="custom-container-title">`try!`について</p>
<p><code>try?</code>と<code>try!</code>はどちらもエラーが発生した場合に無視するという点は同じだが、<code>try!</code>が即座にクラッシュするのに対して<code>try?</code>は<code>nil</code>を返してクラッシュしないという違いがある。</p>
<p>返り値を返すタイプの関数に対して<code>try?</code>を使うのは当然<code>nil</code>に対する処理があるはずなのでバグは発生しない可能性が高い。だが、返り値を返さないタイプの場合は、そこで本来はデータが書き込まれたりしているはずなのにエラーが発生した場合は<code>try?</code>の場合はデータが書き込まれずその後の処理でエラーが発生する場合がある。</p>
</div>
<h3 id="line-length" tabindex="-1"><a class="header-anchor" href="#line-length" aria-hidden="true">#</a> Line Length</h3>
<p>一行は 120 文字以内にすべきだというルール。120 文字以上だと警告がでて、200 文字以上だとエラーがでます。</p>
<h2 id="swiftlint-を使わない理由" tabindex="-1"><a class="header-anchor" href="#swiftlint-を使わない理由" aria-hidden="true">#</a> SwiftLint を使わない理由</h2>
<p>いろいろ便利そうな SwiftLint なのだが、それを使わない理由もまたあります。</p>
<h3 id="静的解析しかできない" tabindex="-1"><a class="header-anchor" href="#静的解析しかできない" aria-hidden="true">#</a> 静的解析しかできない</h3>
<p>一番の問題がこれで、静的解析しかできないのでビルドするまでエラーがでるかどうかわからないというのがあります。</p>
<p>Xcode のデフォルトだとコンパイラが自動でエラー吐いてくれるのでそれと比べると見劣りしてしまいます。</p>
<h3 id="自動修正がない" tabindex="-1"><a class="header-anchor" href="#自動修正がない" aria-hidden="true">#</a> 自動修正がない</h3>
<p>次に、エラーは出すが具体的にどう修正していいかわからないという問題があります。</p>
<p>まあエラーコード読めばわかるんですけど、<code>id</code>とか<code>key</code>とかが使えないとちょっと不便なんですよね。</p>
<h3 id="swift-package-manager-に使えない" tabindex="-1"><a class="header-anchor" href="#swift-package-manager-に使えない" aria-hidden="true">#</a> Swift Package Manager に使えない</h3>
<p>これも困る問題の一つで、Swift Package Manager では<code>New Run Script Phase</code>が使えないので必然的に SwiftLint も動作しません。</p>
<p>同梱したデモアプリなどのプロジェクトから SwiftLint を動かせば動作はするのですが、ちょっとめんどくさいんですよね。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/51oNaYCeAIL._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B079YD4FJ1/?tag=tkgstrator0f-22" target="_blank">【食品添加物】ハッカ油P 20ml(アロマ・お風呂・虫よけ)</a></li>
<li class="price">￥409 (￥20 / ミリリットル)</li>
</ul>
</div>
</template>
