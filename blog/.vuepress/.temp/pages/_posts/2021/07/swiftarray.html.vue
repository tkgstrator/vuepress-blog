<template><h1 id="配列の操作方法" tabindex="-1"><a class="header-anchor" href="#配列の操作方法" aria-hidden="true">#</a> 配列の操作方法</h1>
<h2 id="乱数の配列の作成" tabindex="-1"><a class="header-anchor" href="#乱数の配列の作成" aria-hidden="true">#</a> 乱数の配列の作成</h2>
<p>Swift には標準乱数ライブラリがあるので、それを使ってテスト用の配列を作成します。</p>
<p>今回は要素数 100、Int 型で 0 から 20 までのいずれかの数字が入っているような配列を考えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">{</span> <span class="token number">_</span> <span class="token keyword">in</span> <span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これは上のように<code>map</code>と<code>Int.random(in: Range&lt;Int&gt;)</code>を利用して簡単に作成できます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">20</span>
    <span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="要素を取得" tabindex="-1"><a class="header-anchor" href="#要素を取得" aria-hidden="true">#</a> 要素を取得</h2>
<h3 id="n-番目の値を取得" tabindex="-1"><a class="header-anchor" href="#n-番目の値を取得" aria-hidden="true">#</a> N 番目の値を取得</h3>
<p>これは単にインデックスを使うことで取得できます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span><span class="token number">50</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// -> 4</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// -> Index out of range</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>このとき、コンパイラはインデックスが配列の要素数未満であることを確認しません。なので<code>items[200]</code>のように存在しないインデックスを参照しようとすると<code>Index out of range</code>でコケます。</p>
<p>繰り返しますが、コンパイラはインデックスの正当性をチェックせず、チェックするような関数も存在しないためインデックスが要素数未満を指定しているかどうかはプログラマがチェックする必要があります。何故なら、Swift のコーディング規約ではインデックス外の参照はエラーではなくバグだと捉えているためです。</p>
<h3 id="先頭や末尾の値を取得" tabindex="-1"><a class="header-anchor" href="#先頭や末尾の値を取得" aria-hidden="true">#</a> 先頭や末尾の値を取得</h3>
<p>先頭や末尾の場合は特別な<code>first</code>や<code>last</code>という特別なプロパティが利用できます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token builtin">first</span><span class="token punctuation">)</span> <span class="token comment">// -> Optional(17)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token builtin">last</span><span class="token punctuation">)</span>  <span class="token comment">// -> Optional(8)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>これらの便利なところはインデックス外参照が発生せず、クラッシュしないということです。つまり、配列の要素数が 0 なら<code>nil</code>が返ってきて、それ以外であればオプショナルで値が返ってきます。</p>
<h3 id="要素からランダムに取得" tabindex="-1"><a class="header-anchor" href="#要素からランダムに取得" aria-hidden="true">#</a> 要素からランダムに取得</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">randomElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> Optional(15)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これも配列が空である可能性を考慮して、空っぽであれば<code>nil</code>を返します。</p>
<h4 id="ランダムに複数選択" tabindex="-1"><a class="header-anchor" href="#ランダムに複数選択" aria-hidden="true">#</a> ランダムに複数選択</h4>
<h3 id="n-要素取得" tabindex="-1"><a class="header-anchor" href="#n-要素取得" aria-hidden="true">#</a> N 要素取得</h3>
<p>先頭・末尾から N 個の要素を取得する場合には<code>prefix()</code>と<code>suffix()</code>が利用できます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token keyword">prefix</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [17, 1, 15, 18, 14]</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">suffix</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [17, 2, 10, 15, 20]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>指定する要素数として配列の要素数よりも大きい値を指定した場合は単純に全要素が返ってきます。</p>
<h2 id="計算プロパティ" tabindex="-1"><a class="header-anchor" href="#計算プロパティ" aria-hidden="true">#</a> 計算プロパティ</h2>
<h3 id="要素数" tabindex="-1"><a class="header-anchor" href="#要素数" aria-hidden="true">#</a> 要素数</h3>
<p>要素数は常に<code>count</code>で取得できます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">)</span> <span class="token comment">// -> 100</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>類似するプロパティとしてメモリが確保しているサイズを返す<code>capacity</code>があります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span>capacity<span class="token punctuation">)</span> <span class="token comment">// -> 100</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>基本的にはこれらは同じ値を返しますが、配列を全削除するときにメモリを解放すれば<code>count = capacity = 0</code>になりますが、解放しなければ<code>capacity</code>の値は保存されます。</p>
<h3 id="配列が空かどうか" tabindex="-1"><a class="header-anchor" href="#配列が空かどうか" aria-hidden="true">#</a> 配列が空かどうか</h3>
<p>配列が空かどうかは、<code>if items.count == 0</code>でも判定できますが、この場合にはより簡潔に書ける<code>isEmpty</code>のプロパティを利用したほうが良いでしょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Bad</span>
<span class="token keyword">if</span> items<span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
    <span class="token comment">// Code</span>
<span class="token punctuation">}</span>

<span class="token comment">// Good</span>
<span class="token keyword">if</span> items<span class="token punctuation">.</span><span class="token builtin">isEmpty</span> <span class="token punctuation">{</span>
    <span class="token comment">// Code</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="最小値・最大値を取得" tabindex="-1"><a class="header-anchor" href="#最小値・最大値を取得" aria-hidden="true">#</a> 最小値・最大値を取得</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> Optional(0)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> Optional(20)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>最小値・最大値もともにオプショナルで返ってきます。</p>
<h3 id="和を取得" tabindex="-1"><a class="header-anchor" href="#和を取得" aria-hidden="true">#</a> 和を取得</h3>
<p>Python 等であれば<code>sum()</code>を使って一括で取得できるのですが、Swift にはありません。そこで、取得できるように<code>Extension</code>を定義します。</p>
<p>今回の場合は配列の要素が Int 型であるものに対して<code>sum()</code>を定義しました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Collection</span> <span class="token keyword">where</span> <span class="token builtin">Element</span> <span class="token operator">==</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">+</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>このままだと Int 型にしか適用できないのですが、CGFloat や Double でも同様のことはできるはずなので、これを拡張して、</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Collection</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Numeric</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Element</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">+</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>このようにすれば<code>Numeric</code>プロトコルに適合する全ての型に対して<code>sum()</code>を定義することができます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> 1021</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="平均を取得" tabindex="-1"><a class="header-anchor" href="#平均を取得" aria-hidden="true">#</a> 平均を取得</h3>
<p>平均を求める際は除算が必要になるので Int 型の場合は型を担保できません。</p>
<p>よって、Int 型とそれ以外で Extension を分ける必要があります。Int 型の平均を Int 型で必要とする場合は少ないと思うので、今回は Double 型に変換することにしました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Int型 -> Double型</span>
<span class="token keyword">extension</span> <span class="token builtin">Collection</span> <span class="token keyword">where</span> <span class="token builtin">Element</span> <span class="token operator">==</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">avg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Double</span> <span class="token punctuation">{</span>
        <span class="token function">Double</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">+</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token function">Double</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Int型以外</span>
<span class="token keyword">extension</span> <span class="token builtin">Collection</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">FloatingPoint</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">avg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Element</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">+</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token function">Element</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">avg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> 10.108910891089108</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="配列の並び替え" tabindex="-1"><a class="header-anchor" href="#配列の並び替え" aria-hidden="true">#</a> 配列の並び替え</h2>
<p>配列を並び替えておくと検索が高速になります。</p>
<p>整頓されていないリストに対しての値検索は要素数が k であれば $O(k)$かかるところが、整序済みであれば$O(\ln k)$で済むからです。</p>
<h3 id="ソーティング" tabindex="-1"><a class="header-anchor" href="#ソーティング" aria-hidden="true">#</a> ソーティング</h3>
<p>ソートするコードは<code>sort()</code>と<code>sorted()</code>がありますが、利用方法がまったく異なるため注意が必要です。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">sort()</th>
<th style="text-align:center">sorted()</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">返り値</td>
<td style="text-align:center">Void</td>
<td style="text-align:center">ソートされた配列</td>
</tr>
<tr>
<td style="text-align:center">配列</td>
<td style="text-align:center">更新される</td>
<td style="text-align:center">変わらない</td>
</tr>
</tbody>
</table>
<p>ここで大事なのは<code>sorted()</code>はソートした配列を返すのでそれを受け取らないと意味がなく、<code>sort()</code>は元の配列をソートするので<code>var</code>でないと利用できないという点です。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>imtes<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// -> ()</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [0, 0, 0, 0, 0, 1, 1, 1, 1, ... , 20]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>元の配列を保存しておきたい場合には<code>sorted()</code>を利用し、<code>let sortedItems = items.sorted()</code>のように書くと良いでしょう。</p>
<p>で、内部ではクイックソートが動いていたはずなので一般的な配列に対しては殆どの場合で最速です。自分でソーティングライブラリを書く必要はありません。</p>
<h3 id="ランダム" tabindex="-1"><a class="header-anchor" href="#ランダム" aria-hidden="true">#</a> ランダム</h3>
<p>ランダムの並び替えには<code>shuffle()</code>と<code>shuffled()</code>があります。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">shuffle()</th>
<th style="text-align:center">shuffled()</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">返り値</td>
<td style="text-align:center">Void</td>
<td style="text-align:center">シャッフルされた配列</td>
</tr>
<tr>
<td style="text-align:center">配列</td>
<td style="text-align:center">更新される</td>
<td style="text-align:center">変わらない</td>
</tr>
</tbody>
</table>
<p>これもソーティングと同じく配列を保存する<code>shuffled()</code>と保存しない<code>shuffle()</code>で区別されています。</p>
<h3 id="逆順" tabindex="-1"><a class="header-anchor" href="#逆順" aria-hidden="true">#</a> 逆順</h3>
<p>配列を逆順にするには<code>reverse()</code>と<code>reversed()</code>があります。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">reverse()</th>
<th style="text-align:center">reversed()</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">返り値</td>
<td style="text-align:center">Void</td>
<td style="text-align:center">ReversedCollection</td>
</tr>
<tr>
<td style="text-align:center">配列</td>
<td style="text-align:center">更新される</td>
<td style="text-align:center">変わらない</td>
</tr>
</tbody>
</table>
<p>注意点としては<code>reversed()</code>は逆順になった配列が返ってくるのではなく<code>ReversedCollection</code>が返ってくるという点です。</p>
<p>これは<code>reversed()</code>されたプロパティが参照された際に初めて配列の値が確定するプロパティになります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> reversedItems <span class="token operator">=</span> items<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>reversedItems<span class="token punctuation">)</span> <span class="token comment">// ReversedCollection&lt;Int></span>

<span class="token keyword">let</span> reversedItems<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> items<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>reversedItems<span class="token punctuation">)</span> <span class="token comment">// Collection&lt;Int></span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>つまり、単に変数に代入しただけであれば<code>Array</code>になっていないので通常の配列として利用したい場合は型を明示するか<code>Array()</code>で配列化する必要があります。</p>
<h2 id="配列の検索" tabindex="-1"><a class="header-anchor" href="#配列の検索" aria-hidden="true">#</a> 配列の検索</h2>
<h3 id="指定された値を含むかどうか" tabindex="-1"><a class="header-anchor" href="#指定された値を含むかどうか" aria-hidden="true">#</a> 指定された値を含むかどうか</h3>
<p><code>contanins()</code>は指定された値があるかどうかを Boolean で返します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> true</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="値を指定して検索" tabindex="-1"><a class="header-anchor" href="#値を指定して検索" aria-hidden="true">#</a> 値を指定して検索</h3>
<p>指定した値のインデックスを知りたい時は<code>index(of: )</code>が利用できます。これは存在しない場合には<code>nil</code>を返します。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">値</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">firstIndex(of: )</td>
<td style="text-align:center">オプショナル</td>
<td style="text-align:center">最初のインデックス</td>
</tr>
<tr>
<td style="text-align:center">lastIndex(of: )</td>
<td style="text-align:center">オプショナル</td>
<td style="text-align:center">最後のインデックス</td>
</tr>
<tr>
<td style="text-align:center">index(of: )</td>
<td style="text-align:center">オプショナル</td>
<td style="text-align:center">最初のインデックス</td>
</tr>
<tr>
<td style="text-align:center">index(after: )</td>
<td style="text-align:center">Int</td>
<td style="text-align:center">与えられた値+1</td>
</tr>
<tr>
<td style="text-align:center">index(before: )</td>
<td style="text-align:center">Int</td>
<td style="text-align:center">与えられた値-1</td>
</tr>
</tbody>
</table>
<p><code>index(after: )</code>と<code>index(before: )</code>の使いみちはイマイチわかりません。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">firstIndex</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> Optional(15)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">lastIndex</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// -> Optional(97)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>      <span class="token comment">// -> Optional(15)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span>after<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// -> 11</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span>before<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// -> 9</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="値を指定して全検索" tabindex="-1"><a class="header-anchor" href="#値を指定して全検索" aria-hidden="true">#</a> 値を指定して全検索</h3>
<p>全検索するメンバ関数がないので、Extension で実装します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">allIndices</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [15, 24, 46, 53, 68, 90, 97]</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Equatable</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">allIndices</span><span class="token punctuation">(</span>of value<span class="token punctuation">:</span> <span class="token builtin">Element</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token builtin">indices</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token keyword">self</span><span class="token punctuation">[</span>$<span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>この Extension は配列中の指定した値のインデックスの配列を返します。指定された値がない場合には空の配列を返します。</p>
<p><code>index(of: )</code>がオプショナルを返すので、それに合わせたいのであれば、</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Equatable</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">allIndices</span><span class="token punctuation">(</span>of value<span class="token punctuation">:</span> <span class="token builtin">Element</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token builtin">indices</span> <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token builtin">indices</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token keyword">self</span><span class="token punctuation">[</span>$<span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token builtin">indices</span><span class="token punctuation">.</span><span class="token builtin">isEmpty</span> <span class="token operator">?</span> <span class="token constant">nil</span> <span class="token punctuation">:</span> <span class="token builtin">indices</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>とすれば、指定された値がないときには<code>nil</code>が返り、そうでないときには全インデックスが Int 型で返ります。</p>
<h3 id="指定した値の要素数" tabindex="-1"><a class="header-anchor" href="#指定した値の要素数" aria-hidden="true">#</a> 指定した値の要素数</h3>
<p>指定した値の要素数を返すメンバ関数がないので、Extension で実装します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> 7</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Equatable</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">count</span><span class="token punctuation">(</span>of value<span class="token punctuation">:</span> <span class="token builtin">Element</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token operator">==</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">count</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="最頻値" tabindex="-1"><a class="header-anchor" href="#最頻値" aria-hidden="true">#</a> 最頻値</h3>
<p>最も出現した値を返します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">multimode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [(value: 11, count: 8), (value: 17, count: 8)]</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Hashable</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">multimode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">[</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">Element</span><span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> uniqueSet <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token punctuation">(</span>value<span class="token punctuation">:</span> $<span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> $<span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">let</span> maxCount <span class="token operator">=</span> uniqueSet<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span><span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> uniqueSet<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span><span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token operator">==</span> maxCount <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>今回はわかりやすさを重視して、最頻値を出現回数と共に全部出力するようにした。ループ回数を減らすために<code>Set</code>を利用したので<code>Hashabble</code>プロトコルに適合する型でしか動作しなくなったがまあ細かい問題ではないだろう。</p>
<p>単に唯一の最頻値の値が欲しい場合などは各自 Extension を改良するなどして対応してほしい。</p>
<h2 id="配列の操作" tabindex="-1"><a class="header-anchor" href="#配列の操作" aria-hidden="true">#</a> 配列の操作</h2>
<h3 id="重複の削除" tabindex="-1"><a class="header-anchor" href="#重複の削除" aria-hidden="true">#</a> 重複の削除</h3>
<p>重複する要素を削除したい場合には<code>Set</code>が利用できます。<code>Set</code>は<code>Array</code>とは異なるプロトコルなのですが相互変換可能で、<code>Set</code>は重複を許さないという条件があります。</p>
<p>なので、一度<code>Set</code>に変換してから再度<code>Array</code>に戻せば重複が取り除かれます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token function">Set</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [11, 18, 8, 2, 4, 5, 0, 14, 10, 17, 1, 15, 19, 12, 20, 16, 3, 9, 7, 6, 13]</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Hashable</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">removeDuplicated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">Element</span><span class="token operator">></span> <span class="token punctuation">{</span>
        <span class="token function">Array</span><span class="token punctuation">(</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ただし、この変換はユニークではないので実行ごとに値が変わることに注意してください。毎回同じ値が欲しい場合は、返り値をソーティングする必要があります。</p>
<h3 id="追加" tabindex="-1"><a class="header-anchor" href="#追加" aria-hidden="true">#</a> 追加</h3>
<p>配列に要素を追加する方法はいくつかあります。</p>
<h4 id="要素を追加" tabindex="-1"><a class="header-anchor" href="#要素を追加" aria-hidden="true">#</a> 要素を追加</h4>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

<span class="token comment">//</span>
items <span class="token operator">+</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token comment">// -> [1, 2, 3, 4]</span>

<span class="token comment">// Good</span>
items<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token comment">// -> [1, 2, 3, 4]</span>

<span class="token comment">// Good</span>
items<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token comment">// -> [1, 2, 3, 4]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>要素を一つ加えるというのは、要素数が 1 の配列を追加するとみなすことができます。</p>
<h4 id="配列を追加" tabindex="-1"><a class="header-anchor" href="#配列を追加" aria-hidden="true">#</a> 配列を追加</h4>
<p>演算子で追加する方法と<code>append(contentsOf: )</code>を利用する方法がありますが、後者のほうがわかりやすいと思います。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

<span class="token comment">//</span>
items <span class="token operator">+</span><span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token comment">// -> [1, 2, 3, 4, 5]</span>

<span class="token comment">// Good</span>
items<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token comment">// -> [1, 2, 3, 4, 5]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>ただし、元の配列を保存しておきたい場合には使えないので以下のように書く必要があります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> newItems<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> items <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token function">print</span><span class="token punctuation">(</span>newItems<span class="token punctuation">)</span> <span class="token comment">// -> [1, 2, 3, 4, 5]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="削除" tabindex="-1"><a class="header-anchor" href="#削除" aria-hidden="true">#</a> 削除</h3>
<p>追加に比べて削除は少し難しくなります。</p>
<p>削除するプロパティはたくさんあるのでちゃんと覚えておきたいですね。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">返り値</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">dropFirst()</td>
<td style="text-align:center">配列</td>
<td style="text-align:center">配列の最初の値を削除</td>
</tr>
<tr>
<td style="text-align:center">dropLast()</td>
<td style="text-align:center">配列</td>
<td style="text-align:center">配列の最後の値を削除</td>
</tr>
<tr>
<td style="text-align:center">dropFirst(k: Int)</td>
<td style="text-align:center">配列</td>
<td style="text-align:center">配列の最初の k 要素を削除</td>
</tr>
<tr>
<td style="text-align:center">dropLast(k: Int)</td>
<td style="text-align:center">配列</td>
<td style="text-align:center">配列の最後の k 要素を削除</td>
</tr>
<tr>
<td style="text-align:center">removeLast()</td>
<td style="text-align:center">配列の最後の値</td>
<td style="text-align:center">配列の最後の値を削除</td>
</tr>
<tr>
<td style="text-align:center">removeFirst()</td>
<td style="text-align:center">配列の最初の値</td>
<td style="text-align:center">配列の最初の値を削除</td>
</tr>
<tr>
<td style="text-align:center">popLast()</td>
<td style="text-align:center">配列の最後の値のオプショナル</td>
<td style="text-align:center">配列の最後の値を削除</td>
</tr>
<tr>
<td style="text-align:center">remove(at: Int)</td>
<td style="text-align:center">配列の N 番目の値</td>
<td style="text-align:center">配列の N 番目を削除</td>
</tr>
<tr>
<td style="text-align:center">removeAll()</td>
<td style="text-align:center">Void</td>
<td style="text-align:center">配列を全削除</td>
</tr>
<tr>
<td style="text-align:center">removeAll(keepingCapacity: Bool)</td>
<td style="text-align:center">Void</td>
<td style="text-align:center">配列を全削除</td>
</tr>
</tbody>
</table>
<p><code>removeAll()</code>以外は削除した値を返り値として持ちます。<code>removeFirst()</code>と<code>removeLast()</code>はオプショナルではないので空の配列に対して実行した場合には<code>Index out of range</code>と同様のエラーである<code>Can't remove first/last element from an empty collection</code>が発生します。</p>
<p>そして、何故か<code>popLast()</code>はあるのに<code>popFirst()</code>は存在しません。</p>
<h4 id="keepingcapacity" tabindex="-1"><a class="header-anchor" href="#keepingcapacity" aria-hidden="true">#</a> keepingCapacity</h4>
<p>keepingCapacity は確保したメモリを解放するかどうか、のパラメータな気がしています。</p>
<p>どちらも配列を削除したので<code>items.count</code>では<code>0</code>が返ってくるのですが<code>keepingCapacity: true</code>とした場合には<code>items.capcity</code>とすると<code>100</code>が返ってきます。</p>
<p>メモリを解放すれば空き容量が増えるわけですが、空っぽにした後にまたすぐに配列を代入するようなケースではメモリを解放してしまうとまた確保するための作業が必要になります。</p>
<h4 id="値を指定して削除" tabindex="-1"><a class="header-anchor" href="#値を指定して削除" aria-hidden="true">#</a> 値を指定して削除</h4>
<p><code>remove()</code>にはインデックスしか指定できないため、指定した値を持つ要素を削除することができません。</p>
<p>そこで<code>Extension</code>を使って指定した値を配列から削除できるようにします。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Numeric</span> <span class="token punctuation">{</span>
    <span class="token keyword">mutating</span> <span class="token keyword">func</span> <span class="token function">remove</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">Element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">firstIndex</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>at<span class="token punctuation">:</span> index<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ただ、これでは同一の値を持つ Element が複数あった場合には最初の一つしか削除できません。</p>
<p>Element の全てのインデックスを知りたい場合は以下の Extension を作成すると良いです。</p>
<h4 id="値を指定して全削除" tabindex="-1"><a class="header-anchor" href="#値を指定して全削除" aria-hidden="true">#</a> 値を指定して全削除</h4>
<p>指定した値を全て削除したい場合には削除すると考えるのではなく、指定された値以外で配列を再度生成することを考えるほうが楽です。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Equatable</span> <span class="token punctuation">{</span>
    <span class="token keyword">mutating</span> <span class="token keyword">func</span> <span class="token function">removeAll</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">Element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span> <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token operator">!=</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="複数の値を指定して全削除" tabindex="-1"><a class="header-anchor" href="#複数の値を指定して全削除" aria-hidden="true">#</a> 複数の値を指定して全削除</h4>
<p>複数の値を指定してそれを削除したい場合は<code>filter()</code>で<code>contains()</code>を利用すれば効率的に書けます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Equatable</span> <span class="token punctuation">{</span>
    <span class="token keyword">mutating</span> <span class="token keyword">func</span> <span class="token function">removeAll</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Element</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span> <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">!</span>value<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>$<span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="配列から配列を作成" tabindex="-1"><a class="header-anchor" href="#配列から配列を作成" aria-hidden="true">#</a> 配列から配列を作成</h2>
<p>配列から更に配列を作成するには<code>map</code>や<code>filter</code>が利用できます。</p>
<ul>
<li>map
<ul>
<li>全要素に対して変換を行なう</li>
</ul>
</li>
<li>compactMap
<ul>
<li>nil でない値に対して変換を行なう</li>
</ul>
</li>
<li>flatMap
<ul>
<li>nil でない値に対して変換を行なう</li>
<li>配列の次元を一つ落とす</li>
</ul>
</li>
</ul>
<h3 id="配列の次元を減らす" tabindex="-1"><a class="header-anchor" href="#配列の次元を減らす" aria-hidden="true">#</a> 配列の次元を減らす</h3>
<p><code>flatMap()</code>は減らせる場合に配列の次元を一つ減らします。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> words<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"Apple"</span><span class="token punctuation">,</span> <span class="token string">"Google"</span><span class="token punctuation">,</span> <span class="token string">"Facebook"</span><span class="token punctuation">,</span> <span class="token string">"Microsoft"</span><span class="token punctuation">,</span> <span class="token string">"Amazon"</span><span class="token punctuation">]</span>

<span class="token function">print</span><span class="token punctuation">(</span>words<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> ["A", "p", "p", "l", "e", "G", "o", "o", "g", "l", "e", "F", "a", "c", "e", "b", "o", "o", "k", "M", "i", "c", "r", "o", "s", "o", "f", "t", "A", "m", "a", "z", "o", "n"]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>二次元配列を一次元に戻したいときなどに使えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// ->[1, 2, 3, 1, 2, 3, 4, 5]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="二次元配列に変換" tabindex="-1"><a class="header-anchor" href="#二次元配列に変換" aria-hidden="true">#</a> 二次元配列に変換</h3>
<p>要素数が 100 の配列を要素数が 10 の配列 x10 の二次元配列にしたい場合があります。Python などでは<code>chunked()</code>というメソッドがあるのですが、Swift にはないので自作します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">chunked</span><span class="token punctuation">(</span>by<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [[17, 1, 15, 18, 14, 13, 14, 7, 3, 20], [5, 11, 14, 18, 5, 10, 14, 3, 11, 0], [1, 5, 19, 2, 10, 15, 17, 16, 11, 1], [4, 17, 18, 17, 17, 6, 18, 3, 2, 1], [17, 9, 2, 11, 15, 0, 10, 16, 6, 11], [4, 1, 14, 10, 9, 18, 13, 17, 19, 0], [11, 2, 5, 7, 7, 8, 4, 20, 10, 18], [6, 15, 7, 3, 14, 8, 2, 13, 18, 2], [1, 0, 11, 16, 19, 19, 1, 20, 12, 0], [10, 15, 3, 11, 16, 17, 2, 10, 15, 20]]</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">chunked</span><span class="token punctuation">(</span>by size<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token builtin">Element</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">stride</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> to<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">,</span> by<span class="token punctuation">:</span> size<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">{</span>
            <span class="token function">Array</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">[</span>$<span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token builtin">Swift</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>$<span class="token number">0</span> <span class="token operator">+</span> size<span class="token punctuation">,</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote>
<p>参考文献</p>
<p><a href="https://gist.github.com/sumitokamoi/22b8f30c2c1a3ef93cb1f03d4a7e8066" target="_blank" rel="noopener noreferrer">Swift で配列を n 個の要素に分割する<OutboundLink/></a></p>
</blockquote>
<h3 id="nil-を除去した配列" tabindex="-1"><a class="header-anchor" href="#nil-を除去した配列" aria-hidden="true">#</a> nil を除去した配列</h3>
<p>オプショナルの配列から<code>nil</code>を除去したい場合があります。</p>
<p><code>compactMap()</code>および<code>flatMap()</code>にはオプショナルを許容しないという制約があるので、これらを通せば安全にアンラップすることができます。</p>
<p>ただの<code>map()</code>ではダメなことと、<code>flatMap()</code>にはアンラップ以外にも配列の次元を 1 つ減らすという効果があるので<code>compactMap()</code>を使うのが安全かと思います。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token operator">?</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">nil</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token constant">nil</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token constant">nil</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span>

<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>        <span class="token comment">// -> [Optional(0), nil, Optional(2), Optional(3), nil, Optional(5), Optional(6), Optional(7), nil, Optional(9)]</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>    <span class="token comment">// -> [0, 2, 3, 5, 6, 7, 9]</span>
<span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">compactMap</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [0, 2, 3, 5, 6, 7, 9]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="二つの配列の和" tabindex="-1"><a class="header-anchor" href="#二つの配列の和" aria-hidden="true">#</a> 二つの配列の和</h3>
<p>Python では<code>add()</code>などで二つの配列の和を計算できるのですが、Swift ではできないので Extension で実装します。</p>
<p>配列の型が同じである必要がありますが、要素数は異なっていても構いません。その場合は小さい方に合わせて返ってきます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> itemsA<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> itemsB<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> itemsC <span class="token operator">=</span> itemsA<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>itemsB<span class="token punctuation">)</span> <span class="token comment">// -> [4, 6, 8, 10, 12]</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span><span class="token punctuation">:</span> <span class="token builtin">Numeric</span>  <span class="token punctuation">{</span>
    <span class="token keyword">func</span> add<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">Numeric</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> input<span class="token punctuation">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>T<span class="token operator">></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">zip</span><span class="token punctuation">(</span><span class="token keyword">self</span> <span class="token keyword">as</span><span class="token operator">!</span> <span class="token punctuation">[</span>T<span class="token punctuation">]</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $<span class="token number">0.0</span> <span class="token operator">+</span> $<span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="配列の和" tabindex="-1"><a class="header-anchor" href="#配列の和" aria-hidden="true">#</a> 配列の和</h3>
<p>二次元配列を与えると全てを足してその和を返すようなものを考えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> items<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> items<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -> [10, 13, 16, 19, 22]</span>

<span class="token keyword">func</span> sum<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">Numeric</span><span class="token operator">></span><span class="token punctuation">(</span>of arrays<span class="token punctuation">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">Array</span><span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>T<span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token builtin">first</span> <span class="token operator">=</span> arrays<span class="token punctuation">.</span><span class="token builtin">first</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> sum<span class="token punctuation">:</span> <span class="token punctuation">[</span>T<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> <span class="token builtin">first</span><span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">)</span>
        <span class="token keyword">let</span> <span class="token number">_</span> <span class="token operator">=</span> arrays<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">{</span> sum <span class="token operator">=</span> sum<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>$<span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> sum
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>書き方がダサいので多分もっとかっこよく書けます。</p>
</template>
