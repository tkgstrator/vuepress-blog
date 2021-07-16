<template><h1 id="変数プロパティ" tabindex="-1"><a class="header-anchor" href="#変数プロパティ" aria-hidden="true">#</a> 変数プロパティ</h1>
<p>Swift におけるプロパティとは、要するに型を構成する要素の一つ。プロパティなんて一つしかないんじゃないかと思うかもしれないが、実際には Swift には以下の五つのプロパティが存在する。</p>
<ul>
<li>Stored</li>
<li>Computed</li>
<li>Instance</li>
<li>Static</li>
<li>Class</li>
</ul>
<p>それぞれ何が違い、どのようにして利用するかを考えてみよう。</p>
<p>なお、執筆にあたり<a href="https://qiita.com/akeome/items/2197a635ac616ab2f8e2" target="_blank" rel="noopener noreferrer">【Swift】プロパティについてのまとめ<OutboundLink/></a>を大変参考にさせていただきました。</p>
<h2 id="プロパティの分類" tabindex="-1"><a class="header-anchor" href="#プロパティの分類" aria-hidden="true">#</a> プロパティの分類</h2>
<ol>
<li>再代入可能かどうか</li>
<li>値を保持するかどうか</li>
<li>どこに値を保存するか</li>
</ol>
<h2 id="再代入可能かどうか" tabindex="-1"><a class="header-anchor" href="#再代入可能かどうか" aria-hidden="true">#</a> 再代入可能かどうか</h2>
<p>再代入可能かどうかでプロパティを<code>let</code>として定義するか、<code>var</code>として定義するかが変わります。</p>
<p><code>let</code>は定数なので一度代入すると、その値を上書きすることはできません。</p>
<h3 id="let" tabindex="-1"><a class="header-anchor" href="#let" aria-hidden="true">#</a> let</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">100</span>
price <span class="token operator">=</span> <span class="token number">200</span> <span class="token comment">// NG</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="var" tabindex="-1"><a class="header-anchor" href="#var" aria-hidden="true">#</a> var</h3>
<p><code>var</code>は再代入可能ですが、<code>var</code>を使っているのに再代入をしていないと「その変数は<code>let</code>で十分だよね」とコンパイラに警告されます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">100</span>
price <span class="token operator">=</span> <span class="token number">200</span> <span class="token comment">// OK</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="値を保持するかどうか" tabindex="-1"><a class="header-anchor" href="#値を保持するかどうか" aria-hidden="true">#</a> 値を保持するかどうか</h2>
<p>さて、次の分類は値を保持するかどうかです。</p>
<p>値を保持するプロパティを<code>Stored Property</code>、保持しないプロパティを<code>Computed Property</code>といいます。</p>
<h3 id="stored" tabindex="-1"><a class="header-anchor" href="#stored" aria-hidden="true">#</a> Stored</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">// Stored</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これは単なる<code>Stored Property</code>で、この書き方が一番馴染むという方が多いと思います。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">willSet</span> <span class="token punctuation">{</span>
        <span class="token comment">// 処理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">didSet</span> <span class="token punctuation">{</span>
        <span class="token comment">// 処理</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><code>Stored Property</code>はこのように値が書き換えられる直前と直後に何らかの処理を実行することができます。</p>
<h3 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> Computed</h3>
<p>一方、<code>Computed Property</code>では値がどこかに保持されているわけではなく別のプロパティから値を計算して返すような場合に使います。</p>
<p>例えば、ある商品とその商品の税込みの値段を計算した場合を考えましょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> taxIncludedPrice<span class="token punctuation">:</span> <span class="token builtin">Int</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price
        <span class="token keyword">self</span><span class="token punctuation">.</span>taxIncludedPrice <span class="token operator">=</span> <span class="token function">Int</span><span class="token punctuation">(</span><span class="token function">Double</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token function">Item</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>taxIncludedPrice<span class="token punctuation">)</span> <span class="token comment">// -> 220</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>これを<code>Stored Property</code>だけを使って実装すると上のようになります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> taxIncludedPrice<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token function">Int</span><span class="token punctuation">(</span><span class="token function">Double</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span>price<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token function">Item</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>taxIncludedPrice<span class="token punctuation">)</span> <span class="token comment">// -> 220</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>これを<code>Computed Property</code>を利用すると上のように書けます。要するに、税込価格は常に税抜価格の 1.1 倍なので税抜価格のデータにアクセスするたびに値段を計算して返すという仕様になっているわけです。</p>
<p>値を参照するごとに実際の値を計算するので計算プロパティ(<code>Computed Property</code>)と呼ばれているわけです。注意点としては、計算に時間がかかるようなデータを計算プロパティに入れてしまうと、アクセスするたびに計算をしてしまうのでアプリが重くなる原因になります。</p>
<p><code>Stored Property</code>であれば一度値を計算すればその値をメモリに保存しておくので二回目以降は光速にアクセスできます。</p>
<p><code>Stored Property</code>では<code>willSet</code>と<code>didSet</code>を使うことができましたが、<code>Computed Property</code>では<code>get</code>と<code>set</code>が利用できます。</p>
<ul>
<li>get
その値を読み込んだときに、返すデータを計算する処理を記述する</li>
<li>set
その値にデータを代入したときに行う処理を記述する</li>
</ul>
<p>さきほどのコードには<code>get</code>しか書かれていないため、<code>taxIncludedPrice</code>に値を代入することはできません。これは<code>let</code>と似たような挙動をすることを意味します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token function">Item</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>taxIncludedPrice<span class="token punctuation">)</span> <span class="token comment">// -> 220</span>
apple<span class="token punctuation">.</span>taxIncludedPrice <span class="token operator">=</span> <span class="token number">400</span> <span class="token comment">// Cannot assign to property: 'taxIncludedPrice' is get-only peoperty</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>これでも別に不満はないのですが、税込価格を入力すれば自動で税抜価格を計算し直してくれるようにしましょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> taxIncludedPrice<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token function">Int</span><span class="token punctuation">(</span><span class="token function">Double</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span>price<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span>
            <span class="token keyword">self</span><span class="token punctuation">.</span>price <span class="token operator">=</span> <span class="token function">Int</span><span class="token punctuation">(</span><span class="token function">Double</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1.1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token function">Item</span><span class="token punctuation">(</span>price<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>price<span class="token punctuation">,</span> apple<span class="token punctuation">.</span>taxIncludedPrice<span class="token punctuation">)</span> <span class="token comment">// -> 200, 220</span>
apple<span class="token punctuation">.</span>taxIncludedPrice <span class="token operator">=</span> <span class="token number">330</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>price<span class="token punctuation">,</span> apple<span class="token punctuation">.</span>taxIncludedPrice<span class="token punctuation">)</span> <span class="token comment">// -> 300, 330</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>すると、<code>taxIncludedPrice</code>に代入した時点で<code>price</code>の値が更新されました。</p>
<div class="custom-container warning"><p class="custom-container-title">Computed Property について</p>
<p>他の言語の Computed Property と異なり、Swift では自分自身の値をどこかに保存しておくことはできません。</p>
<p>なので、Computed Property の<code>setter</code>は別の変数に値を保存するためにあります。</p>
</div>
<h2 id="どこに値を保存するか" tabindex="-1"><a class="header-anchor" href="#どこに値を保存するか" aria-hidden="true">#</a> どこに値を保存するか</h2>
<h3 id="instance" tabindex="-1"><a class="header-anchor" href="#instance" aria-hidden="true">#</a> Instance</h3>
<p><code>Instance Property</code>はそのインスタンスが保持しているプロパティです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> price<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">100</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token function">Item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>price<span class="token punctuation">)</span> <span class="token comment">// -> 100</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>なのでクラスや構造体を一度実体化(インスタンスを作成)しなければ利用することができません。</p>
<h3 id="static" tabindex="-1"><a class="header-anchor" href="#static" aria-hidden="true">#</a> Static</h3>
<p><code>Static Property</code>は型自身に保存されるプロパティです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">var</span> madeIn<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token string">"Japan"</span>
<span class="token punctuation">}</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token builtin">Item</span><span class="token punctuation">.</span>madeIn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>Static Property</code>にすればインスタンス化せずに利用することができます。</p>
<h3 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> Class</h3>
<p><code>Class Property</code>は<code>Static Property</code>と同じく、インスタンス化せずに利用できるプロパティです。</p>
<p>どちらも利用方法はほとんど同じなのですが、<code>Class Property</code>は軽傷クラスからオーバーライド(定義の上書き)が可能です。</p>
<p>また、<code>Class Property</code>は必ず<code>Computed Property</code>で宣言しなければいけません。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">var</span> madeIn<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span>
        <span class="token string">"Japan"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Apple</span><span class="token punctuation">:</span> <span class="token builtin">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">class</span> <span class="token class-name">var</span> madeIn<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span>
        <span class="token string">"Yamanashi"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token builtin">Apple</span><span class="token punctuation">.</span>madeIn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="それぞれのプロパティの使い方" tabindex="-1"><a class="header-anchor" href="#それぞれのプロパティの使い方" aria-hidden="true">#</a> それぞれのプロパティの使い方</h2>
<p>利用可能な組み合わせは以下の通り。</p>
<p>要するに<code>Class Property, Stored Property</code>の組み合わせだけが利用できないだけで、後は全て使えます。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">Instance</th>
<th style="text-align:center">Static</th>
<th style="text-align:center">Class</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Stored</td>
<td style="text-align:center">OK</td>
<td style="text-align:center">OK</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Computed</td>
<td style="text-align:center">OK</td>
<td style="text-align:center">OK</td>
<td style="text-align:center">OK</td>
</tr>
</tbody>
</table>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> priceA<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">100</span>               <span class="token comment">// Stored + Instance</span>
    <span class="token keyword">var</span> priceB<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>                   <span class="token comment">// Computed + Inscance</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token function">Int</span><span class="token punctuation">(</span>priceA <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span>
            priceA <span class="token operator">=</span> <span class="token function">Int</span><span class="token punctuation">(</span>newValue <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">var</span> priceC<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">150</span>        <span class="token comment">// Stored + Static</span>
    <span class="token keyword">static</span> <span class="token keyword">var</span> priceD<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>            <span class="token comment">// Computed + Static</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token function">Int</span><span class="token punctuation">(</span>priceC <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span>
            priceC <span class="token operator">=</span> <span class="token function">Int</span><span class="token punctuation">(</span>newValue <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">var</span> priceE<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>             <span class="token comment">// Computed + Class</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token function">Int</span><span class="token punctuation">(</span>priceD <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span>
            priceD <span class="token operator">=</span> <span class="token function">Int</span><span class="token punctuation">(</span>newValue <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Apple</span><span class="token punctuation">:</span> <span class="token builtin">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">class</span> <span class="token class-name">var</span> priceE<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>    <span class="token comment">// Computed + Class</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token function">Int</span><span class="token punctuation">(</span>priceD <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span>
            priceD <span class="token operator">=</span> <span class="token function">Int</span><span class="token punctuation">(</span>newValue <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> apple <span class="token operator">=</span> <span class="token function">Apple</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>apple<span class="token punctuation">.</span>priceA<span class="token punctuation">,</span> apple<span class="token punctuation">.</span>priceB<span class="token punctuation">)</span>               <span class="token comment">// -> 100, 50</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token builtin">Apple</span><span class="token punctuation">.</span>priceC<span class="token punctuation">,</span> <span class="token builtin">Apple</span><span class="token punctuation">.</span>priceD<span class="token punctuation">,</span> <span class="token builtin">Apple</span><span class="token punctuation">.</span>priceE<span class="token punctuation">)</span> <span class="token comment">// -> 150, 75, 25</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>ここでは<code>Item</code>では<code>priceE</code>の値は<code>priceD</code>の 1/2 と定義されているのですが、<code>Apple</code>では 1/3 というように再定義しているので、
<code>150/2/3=25</code>という値が返ってきています。</p>
<h2 id="stored-computed" tabindex="-1"><a class="header-anchor" href="#stored-computed" aria-hidden="true">#</a> Stored/Computed</h2>
<p>さて、ここでよくあるコーディングミスというか、もっと便利に書けるのに的なコードを紹介します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> priceA<span class="token punctuation">:</span> <span class="token builtin">Int</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        priceA <span class="token operator">=</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></template>
