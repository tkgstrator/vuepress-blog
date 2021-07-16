<template><h2 id="プロトコル" tabindex="-1"><a class="header-anchor" href="#プロトコル" aria-hidden="true">#</a> プロトコル</h2>
<p>プロトコルを学ぶにあたって、なぜプロトコルが必要なのかを理解しておく必要がある。</p>
<p>これに関しては<a href="https://qiita.com/Howasuto/items/546e615325f9feca55f7" target="_blank" rel="noopener noreferrer">こちらの記事<OutboundLink/></a>が大変参考になりました。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>「プロトコルはクラスや構造体が実装するプロパティとメソッドの最低限の決まり事を設定する機能」とおぼえておけば良い</p>
</div>
<p>同様の機能としてスーパークラスというものがあるが、Swift の構造体にはスーパークラスという概念がない。そのため、代わりにプロトコルを使うというわけである。</p>
<h2 id="プロトコルのメリット" tabindex="-1"><a class="header-anchor" href="#プロトコルのメリット" aria-hidden="true">#</a> プロトコルのメリット</h2>
<p>参考文献を見ながら自分でも確認する感じで読みすすめていきました。</p>
<h3 id="実装をあとから変更できる" tabindex="-1"><a class="header-anchor" href="#実装をあとから変更できる" aria-hidden="true">#</a> 実装をあとから変更できる</h3>
<p>プロトコルは定義（プロパティ名や型）だけを指定できるので、実際そこにどんな値を入れるかはクラスや構造体ごとに変えることができる。</p>
<h3 id="構造体にもつかえる" tabindex="-1"><a class="header-anchor" href="#構造体にもつかえる" aria-hidden="true">#</a> 構造体にもつかえる</h3>
<p>先程も述べたように Swift では構造体に対して継承ができません。</p>
<p>が、プロトコルであればほとんど同じようなことができます。</p>
<h3 id="複数継承できる" tabindex="-1"><a class="header-anchor" href="#複数継承できる" aria-hidden="true">#</a> 複数継承できる</h3>
<p>クラスは一つしか継承できませんが、プロトコルであれば複数適用することができます。</p>
<h2 id="プロトコルを考える" tabindex="-1"><a class="header-anchor" href="#プロトコルを考える" aria-hidden="true">#</a> プロトコルを考える</h2>
<p>API と通信を行なうためには以下のような情報が必要になります。</p>
<ul>
<li>基本 URL
<ul>
<li>API サーバの URL</li>
<li>&quot;https://tkgling.netlify.app/api/&quot;</li>
</ul>
</li>
<li>パス
<ul>
<li>&quot;session_token&quot;</li>
</ul>
</li>
<li>エンドポイント
<ul>
<li>たたく API の URL</li>
<li>基本 URL とパスの組み合わせ</li>
<li>&quot;https://tkgling.netlify.app/api/session_token&quot;</li>
</ul>
</li>
<li>メソッド
<ul>
<li>POST とか GET とか PUT とか</li>
</ul>
</li>
<li>ヘッダー
<ul>
<li>認証情報を入れたりとか</li>
</ul>
</li>
<li>エンコーディング方式
<ul>
<li>URL エンコードか JSON エンコードかパラメータエンコードか</li>
</ul>
</li>
<li>パラメータ
<ul>
<li>Body に入れるデータ</li>
</ul>
</li>
</ul>
<p>なのでこれらを全部プロトコルで定義してしまえばいいような気がしますが、パラメータはメソッドが GET のときには不要ですし、ライブラリ化するときには一つの API サーバに対して通信することを想定しているのですから基本 URL も不要です。</p>
<p>パスと基本 URL があればいいのでエンドポイントも不要ですし、ヘッダーが常に認証情報しか保たないのであればこれもやはり不要です。エンコーディング方式も「POST と PUT 以外であれば URL エンコード」というような仕様になっていれば、実際に必要なのは次の三つの情報になります。</p>
<h2 id="プロトコルを書いてみる" tabindex="-1"><a class="header-anchor" href="#プロトコルを書いてみる" aria-hidden="true">#</a> プロトコルを書いてみる</h2>
<p>例えば以下のようなシンプルなものを考えてみます。</p>
<h3 id="単純なプロトコルのみ" tabindex="-1"><a class="header-anchor" href="#単純なプロトコルのみ" aria-hidden="true">#</a> 単純なプロトコルのみ</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span> <span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> paramaters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>method <span class="token operator">=</span> method
        <span class="token keyword">self</span><span class="token punctuation">.</span>parameters <span class="token operator">=</span> paramaters
        <span class="token keyword">self</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>そして以下のように実行してみます。</p>
<p>POST という値でメソッドを初期化しているので、当然結果は POST が出力されます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token function">Request</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token string">"session_token"</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// POST</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span><span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// POST</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="extension-で拡張する" tabindex="-1"><a class="header-anchor" href="#extension-で拡張する" aria-hidden="true">#</a> Extension で拡張する</h3>
<p>次に、Extension で拡張して既に定義されているプロパティに何らかの値を持たせてみます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">"GET"</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span> <span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> paramaters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>method <span class="token operator">=</span> method
        <span class="token keyword">self</span><span class="token punctuation">.</span>parameters <span class="token operator">=</span> paramaters
        <span class="token keyword">self</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>するとこれも先程と同じくどちらも POST という値を返します。</p>
<p>どうやら、Extension で何らかの値を設定してもクラス側で上書きされる（または Extension の値よりもクラスの値が優先して呼び出される）ようです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token function">Request</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token string">"session_token"</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// POST</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span><span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// POST</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="パラメータを消してみる" tabindex="-1"><a class="header-anchor" href="#パラメータを消してみる" aria-hidden="true">#</a> パラメータを消してみる</h3>
<p>Extension で定義しているのでプロトコルから method を取り除いてみます。</p>
<p>するとプロトコルを適用している Request は必ずしも method プロパティをもつ必要がなくなります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token comment">// methodを削除</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">"GET"</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須ではない</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span> <span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> paramaters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>method <span class="token operator">=</span> method
        <span class="token keyword">self</span><span class="token punctuation">.</span>parameters <span class="token operator">=</span> paramaters
        <span class="token keyword">self</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>この状態で同じように実行してみるとなんと結果が変わってしまいました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token function">Request</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token string">"session_token"</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// POST</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span><span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// GET</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="クラスからも消してみる" tabindex="-1"><a class="header-anchor" href="#クラスからも消してみる" aria-hidden="true">#</a> クラスからも消してみる</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">"GET"</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span> <span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> paramaters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>parameters <span class="token operator">=</span> paramaters
        <span class="token keyword">self</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>クラスからもプロパティを消して<code>request.method</code>が呼び出すことができるのかどうかは気になるところなのですが、Request クラスは RequestType を継承しているため問題なく呼び出すことができます。</p>
<p>そして、このときは（当たり前ですが）Extension 側のプロパティが呼ばれるということです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token function">Request</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span> <span class="token string">"session_token"</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// GET</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span><span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// GET</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>ここまでをまとめるとこうなります。</p>
<p>つまり、プロトコルには宣言されていないが Extension で宣言したプロパティは、静的型付けをして呼び出すと Extension 側の値が呼び出されるということになります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">プロトコル宣言</th>
<th style="text-align:center">Extension</th>
<th style="text-align:center">クラス宣言</th>
<th style="text-align:center">メソッド</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">あり</td>
<td style="text-align:center">あり</td>
<td style="text-align:center">必須</td>
<td style="text-align:center">静的/動的</td>
<td style="text-align:center">クラス</td>
</tr>
<tr>
<td style="text-align:center">あり</td>
<td style="text-align:center">なし</td>
<td style="text-align:center">必須</td>
<td style="text-align:center">静的/動的</td>
<td style="text-align:center">クラス</td>
</tr>
<tr>
<td style="text-align:center">なし</td>
<td style="text-align:center">あり</td>
<td style="text-align:center">あり</td>
<td style="text-align:center">静的</td>
<td style="text-align:center">Extension</td>
</tr>
<tr>
<td style="text-align:center">なし</td>
<td style="text-align:center">あり</td>
<td style="text-align:center">あり</td>
<td style="text-align:center">動的</td>
<td style="text-align:center">クラス</td>
</tr>
<tr>
<td style="text-align:center">なし</td>
<td style="text-align:center">あり</td>
<td style="text-align:center">なし</td>
<td style="text-align:center">静的/動的</td>
<td style="text-align:center">Extension</td>
</tr>
</tbody>
</table>
<h2 id="この仕様を利用する" tabindex="-1"><a class="header-anchor" href="#この仕様を利用する" aria-hidden="true">#</a> この仕様を利用する</h2>
<p>この仕様を利用すれば必須パラメータはプロトコルに直接書き、オプショナルなパラメータは Extension に書いてそのプロトコルを継承したクラスを書くのがスマートな方法になりそうです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> baseURL<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token string">"https://tkgling.netlify.app/api/"</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token constant">nil</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">ParameterEncoding</span> <span class="token punctuation">{</span> <span class="token builtin">URLEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span> <span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token comment">// 必須</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// 必須</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> paramaters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>method <span class="token operator">=</span> method
        <span class="token keyword">self</span><span class="token punctuation">.</span>parameters <span class="token operator">=</span> paramaters
        <span class="token keyword">self</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>このデータに対しては以下のようにアクセスできる。Request クラスで定義しておらず、必須でないプロパティにアクセスできるのは便利な気がしている。</p>
<p>もしもユーザがそれらのプロパティが必要だと思えば、クラスに書いてしまえばいいのである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 型はRequestでなくRequestTypeにすること</span>
<span class="token keyword">func</span> <span class="token function">remote</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span> <span class="token comment">// Request</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>parameters<span class="token punctuation">)</span> <span class="token comment">// Request</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token comment">// Request</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>headers<span class="token punctuation">)</span> <span class="token comment">// RequestType</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>baseURL<span class="token punctuation">)</span> <span class="token comment">// RequestType</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// RequestType</span>
    <span class="token comment">// すべてのデータにアクセスできる！！</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> request <span class="token operator">=</span> <span class="token function">Request</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token string">"token"</span><span class="token punctuation">)</span>
<span class="token function">remote</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> request<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="計算プロパティにしてみる" tabindex="-1"><a class="header-anchor" href="#計算プロパティにしてみる" aria-hidden="true">#</a> 計算プロパティにしてみる</h2>
<p>現在の Extension はこの様になっているが、エンコーディングの部分はメソッドの値によって動的に切り替えたいわけである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> baseURL<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token string">"https://tkgling.netlify.app/api/"</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token constant">nil</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">ParameterEncoding</span> <span class="token punctuation">{</span> <span class="token builtin">URLEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>単純に<code>self.method</code>で切り替えるようにすると後で上書きしたときに（今回の場合は get しか method に設定されていないので上書きされることはないが）データを正しくとってくることができなくなってしまう。</p>
<p>よって、encoding の値を参照する度に毎回 method の値を調べ、その値によって変わるような仕組みにしたいのである。</p>
<p>これは計算プロパティで簡単に実装できる。つまり、以下のように書けば良い。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> baseURL<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token string">"https://tkgling.netlify.app/api/"</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token constant">nil</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">ParameterEncoding</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token keyword">self</span><span class="token punctuation">.</span>method <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token punctuation">.</span>post<span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token builtin">JSONEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span>
                <span class="token keyword">case</span> <span class="token punctuation">.</span>put<span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token builtin">JSONEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span>
                <span class="token keyword">default</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token builtin">URLEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>これの良いところは全ての設定を RequestType プロトコルで行なうことで、実際に Request クラスを書くユーザに対しては秘匿になっている点である。</p>
<p>要するに、コードを書く人間はエンコーディング方式を全く気にせず Request クラス（ないしは RequestType プロトコルを適用したクラス）を書くことができるわけである。</p>
<p>そして、デフォルトでは POST リクエストであれば自動的に JSONEncoding.default が使われてしまうのだが、もしもあるリクエストは POST メソッドなのだが JSONEncoding.default とは違うエンコーディングが使いたければ、</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token comment">// Extensionの値が上書きされる！</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">ParameterEncoding</span> <span class="token operator">=</span> <span class="token builtin">JSONEncoding</span><span class="token punctuation">.</span>queryString
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>勝手に自分でエンコーディングを設定すればよいのである。</p>
<p>ただし、これは Request クラスのプロパティとして設定されているので RequestType プロトコルで呼び出したメソッドに対してはそのまま<code>request.encoding</code>と呼び出すと予期しない値を参照してしまう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// RequestTypeプロトコルとして呼び出す</span>
<span class="token keyword">func</span> <span class="token function">remote</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// RequsetType -> URLEncoding</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span><span class="token operator">!</span> <span class="token builtin">Request</span><span class="token punctuation">)</span><span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// Request -> JSONEncoding.queryString</span>
<span class="token punctuation">}</span>

<span class="token comment">// Requestクラスとして呼び出す</span>
<span class="token keyword">func</span> <span class="token function">remote</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> <span class="token builtin">Request</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// Request -> JSONEncoding.queryString</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span><span class="token operator">!</span> <span class="token builtin">Request</span><span class="token punctuation">)</span><span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// Request -> JSONEncoding.queryString</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>ただ、下の Request クラスとして呼び出すメソッドは書きたくない。これだとたった一つの Request クラスでしか引数にできない。</p>
<p>ライブラリとしては個別の RequestType プロトコルの適用クラスではなく、引数は常に RequestType プロトコル準拠の全てのクラスというようにしたいのである。</p>
<h3 id="読み込み側で対応してみる" tabindex="-1"><a class="header-anchor" href="#読み込み側で対応してみる" aria-hidden="true">#</a> 読み込み側で対応してみる</h3>
<p>ジェネリクスで対応できないかとやってみた。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> baseURL<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token string">"https://tkgling.netlify.app/api/"</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token constant">nil</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">ParameterEncoding</span> <span class="token punctuation">{</span> <span class="token builtin">URLEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Request</span><span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span> <span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span>

    <span class="token keyword">required</span> <span class="token keyword">init</span><span class="token punctuation">(</span>method<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>method <span class="token operator">=</span> method
        <span class="token keyword">self</span><span class="token punctuation">.</span>parameters <span class="token operator">=</span> parameters
        <span class="token keyword">self</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path
        <span class="token keyword">self</span><span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token builtin">JSONEncoding</span><span class="token punctuation">.</span>queryString
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// この三つは同値と思われる</span>
<span class="token keyword">func</span> <span class="token function">remote</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> <span class="token builtin">RequestType</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> remote<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token keyword">where</span> T<span class="token punctuation">:</span> <span class="token builtin">RequestType</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span><span class="token operator">!</span> T<span class="token punctuation">)</span><span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// RequsetType -> URLEncoding</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> remote<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">RequestType</span><span class="token operator">></span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span>request <span class="token keyword">as</span><span class="token operator">!</span> T<span class="token punctuation">)</span><span class="token punctuation">.</span>encoding<span class="token punctuation">)</span> <span class="token comment">// RequsetType -> URLEncoding</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>すると読み込み時ではちゃんと Request 型としているのに、<code>encoding</code>のプロパティを参照すると何故か RequestType の Extension の値の方が参照されてしまう。</p>
<p>しかしどうもクラスのプロパティを参照することはできないみたいなのでこちらの方向は諦めた。上手いこと RequestType プロトコルの値を変えてしまうほうが楽そうだ。</p>
</template>
