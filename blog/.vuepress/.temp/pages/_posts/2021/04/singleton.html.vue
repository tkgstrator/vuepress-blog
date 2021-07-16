<template><h2 id="swift5-singleton" tabindex="-1"><a class="header-anchor" href="#swift5-singleton" aria-hidden="true">#</a> Swift5 + Singleton</h2>
<p>今回 Singleton を学ぶにあたって<a href="https://qiita.com/satoru_pripara/items/725b66fd0dfb301cd80c" target="_blank" rel="noopener noreferrer">こちらの記事<OutboundLink/></a>を参考にさせていただいた。</p>
<p>非常にわかりやすかったのでこの記事を読むよりもおすすめしたい。</p>
<h2 id="singleton-とはなにか" tabindex="-1"><a class="header-anchor" href="#singleton-とはなにか" aria-hidden="true">#</a> Singleton とはなにか</h2>
<p>要するにたった一つしかないオブジェクトのこと。</p>
<p>アプリやライブラリのコア部分を司る機能を管理しているオブジェクトが常に同じ一つであってほしいという仕組み。そうでないと例えば二つのオブジェクトが同時にデータを書き換えたりしてしまうとデータの不整合が生じたりしていろいろとめんどくさいことになってしまう。</p>
<p>では「オブジェクトをたった一つしかつくられないためにどうしたらいいのか」というのが Singleton の考え方になるわけである。</p>
<h2 id="singleton-の実装" tabindex="-1"><a class="header-anchor" href="#singleton-の実装" aria-hidden="true">#</a> Singleton の実装</h2>
<p>まずは継承を防ぐために<code>final</code>修飾子をつけ、値型の<code>struct</code>ではなく<code>class</code>を使うようにする。</p>
<p><code>class</code>と<code>struct</code>の最も大きな違いの一つに、コピーができるかできないかというのがある。これは Python や Javascript でよくあることなのだが、例えば A の現在のデータをスワップしたりして同じクラスの B を作りたいとしよう。</p>
<p>このときシャローコピーをすると A のコピーを B としてつくると A と B が全く同一のオブジェクトになってしまう。これは鏡写しのようなもので、A をスワップした時点で B の内容も変わってしまうのだ。</p>
<p>これを防ぐためにはディープコピーと呼ばれるコピーの仕方をおこなう必要がある。要するに、クラスの場合はコピーしたとしても実体ではなくメモリのポインタがコピーされるだけなのだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">final</span> <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppManager</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>更に、外部から呼び出されないようにイニシャライザをプライベートにする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">init</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>最後にオブジェクトをたった一つだけ生成するために、</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> appManager <span class="token operator">=</span> <span class="token function">AppManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>として<code>static</code>変数で宣言する。</p>
<h2 id="スレッドセーフにする" tabindex="-1"><a class="header-anchor" href="#スレッドセーフにする" aria-hidden="true">#</a> スレッドセーフにする</h2>
<p>これについては現状、自分では利用する場面がないが覚えておいて損はないのでメモをしておく。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token function">DispatchQueue</span><span class="token punctuation">(</span>label<span class="token punctuation">:</span> <span class="token string">"AppManager"</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token keyword">let</span> userDefaults <span class="token operator">=</span> <span class="token builtin">UserDefaults</span><span class="token punctuation">.</span>standard

<span class="token keyword">func</span> <span class="token function">setValue</span><span class="token punctuation">(</span><span class="token number">_</span> value<span class="token punctuation">:</span> <span class="token builtin">Any</span><span class="token punctuation">,</span> forKey key<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">weak</span> <span class="token keyword">self</span><span class="token punctuation">]</span>
    queue<span class="token punctuation">.</span>sync <span class="token punctuation">{</span>
        userDefaults<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>ただ、全部の処理をシリアルキューにするとパフォーマンスが低下してしまうので読み込みは同時並行で実行するようにするなどの配慮があると良い。</p>
<h2 id="じゃあ結局どうするの" tabindex="-1"><a class="header-anchor" href="#じゃあ結局どうするの" aria-hidden="true">#</a> じゃあ結局どうするの</h2>
<p>これは非常に簡単で、Singleton としたいクラスは次のように書けば良い。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">final</span> <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> shared <span class="token operator">=</span> <span class="token function">AppManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token function">DispatchQueue</span><span class="token punctuation">(</span>label<span class="token punctuation">:</span> <span class="token string">"AppManager"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">let</span> value<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">100</span>
    <span class="token keyword">private</span> <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>これを使いたいときは次のようにする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token builtin">AppManager</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span>value <span class="token comment">// -> 100</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>一度クラスを作ってしまえばそれを Singleton にすること自体は難しくないと言えるだろう。</p>
</template>
