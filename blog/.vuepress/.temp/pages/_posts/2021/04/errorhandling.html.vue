<template><h2 id="エラーの扱いについて" tabindex="-1"><a class="header-anchor" href="#エラーの扱いについて" aria-hidden="true">#</a> エラーの扱いについて</h2>
<p>Swift では Error 型と NSError 型を使うことができる。Error 型は SwiftUI で使われる一般的なエラー型ではあるがエラーコードがなかったりとかゆいところに手が届かなかったりする。</p>
<p>ここでは独自の Error 型を定義し、それを柔軟に使っていくためのチュートリアルを解説する。</p>
<h2 id="独自のエラー型を定義しよう" tabindex="-1"><a class="header-anchor" href="#独自のエラー型を定義しよう" aria-hidden="true">#</a> 独自のエラー型を定義しよう</h2>
<p>エラーの定義である Enum は Error を継承することはもちろん、ついでに CaseIterable を継承しておくと良い。</p>
<p>今回はアプリが「不明」「期限切れ」「空」「無効」の四パターンのエラーを返すものを想定した。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">enum</span> <span class="token builtin">APPError</span><span class="token punctuation">:</span> <span class="token builtin">Error</span><span class="token punctuation">,</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> unknown
    <span class="token keyword">case</span> expired
    <span class="token keyword">case</span> empty
    <span class="token keyword">case</span> invalid
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>それは Enum を使ってこのように書けるが、これだけだと意味がないので、この APPError に対してエラーの詳細やエラーコードを割り当てていく。</p>
<h2 id="エラーコード" tabindex="-1"><a class="header-anchor" href="#エラーコード" aria-hidden="true">#</a> エラーコード</h2>
<p>エラーコードは CustomNSError を継承すれば定義することができる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">APPError</span><span class="token punctuation">:</span> <span class="token builtin">CustomNSError</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> errorCode<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token keyword">self</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>unknown<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token number">9999</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>expired<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token number">10000</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>empty<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token number">2000</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>invalid<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token number">3000</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="エラー詳細" tabindex="-1"><a class="header-anchor" href="#エラー詳細" aria-hidden="true">#</a> エラー詳細</h2>
<p>エラー詳細は<code>errorDescription</code>というメンバ変数に割り当てる。これは<code>LocalizedError</code>を継承すれば String?型で定義することができる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">APPError</span><span class="token punctuation">:</span> <span class="token builtin">LocalizedError</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> errorDescription<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token keyword">self</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>unknown<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token string">"ERROR_UNKNOWN"</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>expired<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token string">"ERROR_EXPIRED"</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>empty<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token string">"ERROR_EMPTY"</span>
        <span class="token keyword">case</span> <span class="token punctuation">.</span>invalid<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token string">"ERROR_INVALID"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>これで独自に定義したエラーに対してエラーコードとエラー詳細を設定することができた。</p>
<h2 id="エラーの呼び出し" tabindex="-1"><a class="header-anchor" href="#エラーの呼び出し" aria-hidden="true">#</a> エラーの呼び出し</h2>
<p>SwiftUI においては<code>throw ERROR</code>とすることでエラーを呼び出すことができる。これは普通の return などと違い、放置すればクラッシュするので<code>try?</code>でエラーをなかったことにするか<code>do catch</code>で適切にハンドリングする必要がある。</p>
<p>エラーが呼び出される関数には必ず呼び出される可能性があることを明示しなければならない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// OK</span>
<span class="token keyword">func</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token builtin">APPError</span><span class="token punctuation">.</span>allCases<span class="token punctuation">.</span><span class="token function">randomElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span><span class="token operator">?</span> <span class="token builtin">APPError</span><span class="token punctuation">.</span>unknown<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>例えばこれは定義された APPError 型から適当に一つ選んでエラーを発生させるコードである。<code>randomElement()</code>が nil を返す場合があるのでその場合にはとりあえず不明なエラーを返すようにした。</p>
<p>ここでの<code>throws</code>(throw ではない)はエラーが発生したときにエラーハンドリングをせずにこの関数を呼び出した関数に「エラー自体」を伝達することを意味する。</p>
<p>なぜならこの関数は<code>do catch</code>でエラーハンドリングをしていないにもかかわらず関数内に<code>throw</code>があるためにエラーを発生させる可能性があるためである。エラーを発生させる可能性(<code>throw</code>)があるが、<code>do catch</code>がない関数には必ず<code>throws</code>でエラーを投げる可能性があることを明示しなければならないのだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// NG</span>
<span class="token keyword">func</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token builtin">APPError</span><span class="token punctuation">.</span>allCases<span class="token punctuation">.</span><span class="token function">randomElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span><span class="token operator">?</span> <span class="token builtin">APPError</span><span class="token punctuation">.</span>unknown<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>なのでこのように<code>throws</code>がない関数はコンパイルエラーが発生する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// OK</span>
<span class="token keyword">func</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token builtin">APPError</span><span class="token punctuation">.</span>allCases<span class="token punctuation">.</span><span class="token function">randomElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span><span class="token operator">?</span> <span class="token builtin">APPError</span><span class="token punctuation">.</span>unknown<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"ERROR"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>このように<code>do catch</code>を使ってエラーハンドリングをし、関数からエラーが投げられないようにすれば<code>throws</code>を書かなくて済む。ただ、これだとエラーが発生したときに ERROR という文字列が表示されるだけで、これではエラーハンドリングとは言えない。</p>
<h3 id="エラー処理をする" tabindex="-1"><a class="header-anchor" href="#エラー処理をする" aria-hidden="true">#</a> エラー処理をする</h3>
<p>まず、エラーの中身を見たときはこのように書けば良い。多くのプログラミング言語では<code>catch</code>で error が定義されている。Swift の場合もそうなので定義しなくても<code>error</code>という変数でエラーの内容をとってくることができる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>もしも独自の変数名を与えたい場合は次のようにかけば良い。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">let</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>throwError()</code>は APPError 型を返すのだが、実際にどんな値を受け取っているのか見てみると<code>empty</code>や<code>invalid</code>という値が返っていていた。</p>
<p>つまり、受け取っているのはただの Enum だということだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>localizedDescription<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>では肝心の中身を見る話だかこれは<code>error.errorCode</code>や<code>error.errorDescription</code>のように受け取ることができない。SwiftUI で受け取ることができるのはあくまでも Error 型であり、Error 型は<code>localizedDescripion</code>というメンバ変数しか持たないためだ。</p>
<p>ただ、<code>localizedDescription</code>を表示すると<code>errorDescription</code>の値を表示することはできた。問題は<code>errorCode</code>をどうやって受け取るかである。</p>
<p>Swift で使えるエラーには<code>Error</code>、<code>NSError</code>、<code>CustomNSError</code>などがあるが、今回のケースではエラーコードを利用するために<code>CustomNSError</code>を継承しているのでこれを利用する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> customNSError <span class="token operator">=</span> error <span class="token keyword">as</span><span class="token operator">?</span> <span class="token builtin">CustomNSError</span>
    <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>errorCode<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>つまり、上のように CustomNSError にキャストすることでエラーコードを表示することができるようになる。</p>
<h2 id="アラートでエラー発生" tabindex="-1"><a class="header-anchor" href="#アラートでエラー発生" aria-hidden="true">#</a> アラートでエラー発生</h2>
<p>エラーが発生したときにそれを検知してアラートを表示したいケースが多いが、そのたびに何度も Alert の定義を書くのはめんどくさいのでエラーが発生しそうなところに使える ViewModifier を定義した。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">AlertView</span><span class="token punctuation">:</span> <span class="token builtin">ViewModifier</span> <span class="token punctuation">{</span>
    @<span class="token builtin">Binding</span> <span class="token keyword">var</span> isPresented<span class="token punctuation">:</span> <span class="token builtin">Bool</span>
    <span class="token keyword">let</span> error<span class="token punctuation">:</span> <span class="token builtin">CustomNSError</span>

    <span class="token keyword">func</span> <span class="token function">body</span><span class="token punctuation">(</span>content<span class="token punctuation">:</span> <span class="token builtin">Content</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        content
            <span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $isPresented<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">Alert</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"ERROR"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">:</span> <span class="token function">Text</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>localizedDescription<span class="token punctuation">)</span><span class="token punctuation">,</span> dismissButton<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">alert</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> <span class="token builtin">Binding</span><span class="token operator">&lt;</span><span class="token builtin">Bool</span><span class="token operator">></span><span class="token punctuation">,</span> error<span class="token punctuation">:</span> <span class="token builtin">CustomNSError</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token keyword">guard</span> <span class="token keyword">let</span> error <span class="token operator">=</span> error <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">AnyView</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">AnyView</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">modifier</span><span class="token punctuation">(</span><span class="token function">AlertView</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> isPresented<span class="token punctuation">,</span> error<span class="token punctuation">:</span> error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>これは単にエラーが発生したら表示するだけなので再利用するのは簡単である。ViewModifier の中身を変えれば自由にカスタマイズすることもできる。</p>
</template>
