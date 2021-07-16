<template><h1 id="プロトコルとは" tabindex="-1"><a class="header-anchor" href="#プロトコルとは" aria-hidden="true">#</a> プロトコルとは</h1>
<p>プロトコルとはそのプロトコルに準拠しているクラスや構造体に対して共通のルールを設定するものです。</p>
<p>感覚としてはジェネリクスに近いのでまずはジェネリクスの例から考えてみます。</p>
<h2 id="ジェネリクスの考え方" tabindex="-1"><a class="header-anchor" href="#ジェネリクスの考え方" aria-hidden="true">#</a> ジェネリクスの考え方</h2>
<p>例えば、二つの入力された整数の積を計算する関数を考えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 50</span>

<span class="token keyword">func</span> <span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>すると計算結果として正しく 50 を得ることができます。</p>
<p>ただ、これだと整数同士での掛け算にしか対応していません。もし次のように実数同士を引数に与えると型が違うので計算できないと言われてしまいます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span><span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Cannot convert value of type 'Double' to exptected argument type 'Int'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>それでは困るので「実数同士」でも計算できるようにしてみます。</p>
<p>Swift は関数のオーバーロードに対応しているので、全く同じ関数名でも引数が少し違えば定義可能です。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">multiple</span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> <span class="token builtin">Double</span><span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> <span class="token builtin">Double</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Double</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>しかし、よく考えるとこの実装方法は愚直であることに気付きます。一方だけが<code>Int</code>のときや、型が<code>CGFlaot</code>のときなどありとあらゆるパターンを考えていると関数の定義だけがどんどん増えてしまうからです。</p>
<p>そこで任意の型を引数にとれるように関数自体を改良します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">func</span> multiple<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> T<span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> T <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>というわけで、任意の型である<code>T</code>を引数としてとり、その結果として型<code>T</code>を返す関数に改良しました。</p>
<p>が、これはそのままではコンパイルエラーが発生します。</p>
<p>というのも、計算式の途中にある<code>a * b</code>が計算可能であるためには<code>T</code>が掛け算可能な型である必要があるためです。なので、<code>T</code>は単なる「任意の型」ではなく「任意の掛け算可能な型」として再定義します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">func</span> multiple<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">Numeric</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> T<span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> T <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>掛け算可能な型であることを明示するためには<code>T</code>が<code>Numeric</code>に準拠させればよいです。<code>FloatingPoint</code>に準拠させても同様の処理は可能ですが、<code>FloatingPoint</code>は実数であることを前提としているので返り値も必ず実数になってしまいます。</p>
<p>整数同士での計算は整数で返したいのでこの場合は<code>Numeric</code>の方が良いでしょう。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/31MOz9wtBkL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B07J6P93MB/?tag=tkgstrator0f-22" target="_blank">スイッチ用 RCMジグ RCMツール ショートコネクタ RCMクリップ 収納ケース付き (レッド)</a></li>
<li class="price">￥650</li>
</ul>
</div>
<h2 id="算術プロトコル" tabindex="-1"><a class="header-anchor" href="#算術プロトコル" aria-hidden="true">#</a> 算術プロトコル</h2>
<p>算術プロトコルにはたくさんあるのですが、まあとりあえず以下の三つがよく出てきます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">プロトコル</th>
<th style="text-align:center">加算</th>
<th style="text-align:center">減算</th>
<th style="text-align:center">乗算</th>
<th style="text-align:center">除算</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">AdditiveArithmetic</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Numeric</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">FloatingPoint</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">YES</td>
</tr>
</tbody>
</table>
<p>除算までサポートしようとすると FloatingPoint を利用する必要があるわけですね。</p>
<p>そこで、二つの数を引数にとって<code>a / b</code>の値を返す<code>divide()</code>の関数を以下のようにつくります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">func</span> divide<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">FloatingPoint</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> T<span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> T <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">/</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>これはこれで別に問題なく動作するのですが、整数型同士で計算した場合少し違和感があります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">print</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span>             <span class="token comment">// 2</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">divide</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>    <span class="token comment">// 2.0</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>というのも単に整数型同士で除算した場合は、計算結果も整数になるのに対して、<code>divide()</code>を利用した場合は返り値が<code>FloatingPoint</code>型のために必ず実数で出力されてしまうという点です。</p>
<p>また、<code>Int</code>型は<code>FloatinPoint</code>に準拠していないため以下のコードのように変数の型を明示してしまうとコンパイルエラーが発生してしまいます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> a<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">let</span> b<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">5</span>

<span class="token function">print</span><span class="token punctuation">(</span><span class="token function">divide</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Global function 'divide' requires that 'Int' conform to 'FloatingPoint'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="暫定処置" tabindex="-1"><a class="header-anchor" href="#暫定処置" aria-hidden="true">#</a> 暫定処置</h3>
<p><code>FloatingPoint</code>と<code>Int</code>に互換性がない以上は一つの関数で処理するのは難しそうなので以下のようにコードを改良するのが一つの手ではあります。</p>
<p>それか、引数に代入するときに<code>Double</code>や<code>CGFloat</code>などにキャストします。もっと上手い解決策がありそうなのですが、わからなかったのでとりあえずこれで対応しています。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">func</span> divide<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">FloatingPoint</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> T<span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> T <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">/</span> b
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token number">_</span> a<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">,</span> <span class="token number">_</span> b<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">/</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="プロトコルを型として利用する" tabindex="-1"><a class="header-anchor" href="#プロトコルを型として利用する" aria-hidden="true">#</a> プロトコルを型として利用する</h2>
<p>さて、ここまでの話はプロトコルを使って変数の引数を柔軟に扱おうという話でした。</p>
<p>ここからは更に一方進んでプロトコルに準拠したクラスや構造体をつくり、それらを変数として扱いたい場合を考えます。</p>
<p>話がややこしいので具体例を出します。例えば Dog クラスと Cat クラスを作成し、プロパティとして名前をもたせるとします。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>そして、次に飼い主のクラスを作成します。愚直に書くと以下のようになります。</p>
<p>猫を飼っている人がいるかも知れませんし、犬を買っている人がいるかも知れないので犬と猫のどちらもプロパティにもつ必要があります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> cats<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Cat</span><span class="token punctuation">]</span>
    <span class="token keyword">let</span> dogs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Dog</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>ここで問題になるのは、動物の種類が増えるとプロパティ名が無数に増えていってしまい可読性が低下するという点です。</p>
<h3 id="プロトコルで解決する" tabindex="-1"><a class="header-anchor" href="#プロトコルで解決する" aria-hidden="true">#</a> プロトコルで解決する</h3>
<p>そこで、犬と猫をどちらも一括で扱えるような<code>Animal</code>プロトコルを作成します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span> <span class="token comment">// Required</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// Required</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">:</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// Required</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> animals<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Animal</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="イニシャライザを定義する" tabindex="-1"><a class="header-anchor" href="#イニシャライザを定義する" aria-hidden="true">#</a> イニシャライザを定義する</h3>
<p>このままだとわかりにくいのでイニシャライザをつけてコンパイルが通るようにします。</p>
<p>プロトコルで設定されている変数や関数は必ずそのプロトコルを準拠するクラスなどでは宣言しなければいけません。変数の場合はそのままかけばいいのですが、イニシャライザの場合は<code>required</code>とつけてプロトコルの準拠のために必要であることを明示する必要があります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">protocol</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span> <span class="token comment">// Required</span>
    <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// Required</span>

    <span class="token keyword">required</span> <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Required</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">:</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">required</span> <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Required</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token comment">// Required</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> animals<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Animal</span><span class="token punctuation">]</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>animals<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Animal</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>animals <span class="token operator">=</span> animals
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="サンプルコード" tabindex="-1"><a class="header-anchor" href="#サンプルコード" aria-hidden="true">#</a> サンプルコード</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> mike<span class="token punctuation">:</span> <span class="token builtin">Cat</span> <span class="token operator">=</span> <span class="token function">Cat</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string">"Mike"</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> nike<span class="token punctuation">:</span> <span class="token builtin">Dog</span> <span class="token operator">=</span> <span class="token function">Dog</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string">"Nike"</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> tom <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span>animals<span class="token punctuation">:</span> <span class="token punctuation">[</span>mike<span class="token punctuation">,</span> nike<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> animal <span class="token keyword">in</span> tom<span class="token punctuation">.</span>animals <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>animal<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// Mike, Nike</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>For 文の中でそれぞれ異なるクラスのオブジェクトをループさせているのに<code>animal.name</code>で名前を呼び出せるのは、<code>animal</code>が<code>Animal</code>プロトコルに準拠しており、必ず<code>name</code>のプロパティを持っていることが担保されているためです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span> <span class="token comment">// &lt;- Required</span>
    <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>もしここでこの行をコメントアウトすると<code>Value of type 'Animal' has no member 'name'</code>とコンパイルエラーが表示されます。</p>
<h2 id="プロトコルに準拠した-enum-を作成する" tabindex="-1"><a class="header-anchor" href="#プロトコルに準拠した-enum-を作成する" aria-hidden="true">#</a> プロトコルに準拠した Enum を作成する</h2>
<p>今回考えて悩んだのはここでした。</p>
<p>いまネットワーク系のライブラリを作成しているのですが、そのライブラリは通信が失敗した際にはエラーを返します。ここではそのライブラリが返すエラーは<code>APIErrorA</code>という<code>Enum</code>だとします。</p>
<p>そして仮にエラーの種類が二種類しかないとすると、次のように定義すれば良いわけです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">enum</span> <span class="token builtin">APIErrorA</span><span class="token punctuation">:</span> <span class="token builtin">Error</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> forbidden
    <span class="token keyword">case</span> invalid
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>そして次にそのライブラリを使用するアプリを考えてみます。アプリは基本的にはこの<code>APIErrorA</code>を使ってエラーを表示すれば良いのですが、エラーを更に細分化したい場合があります。</p>
<p>例えば、ある XXX というエンドポイントを叩いて<code>invalid</code>が返ってきた場合には<code>invalidXXX</code>, YYY というエンドポイントの場合は<code>invalidYYY</code>という具合です。</p>
<p>ライブラリ側に追加すればそれはそれで解決なのですが、アクセスするエンドポイント名ごとに Enum を増やしていてはほとんどの人は使わない無意味な<code>case</code>がライブラリに組み込まれてしまいます。</p>
<p>そのような定義はライブラリではなくアプリ側で実装すべきです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// コンパイルエラー</span>
<span class="token keyword">extension</span> <span class="token builtin">APIErrorA</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> invalidXXX
    <span class="token keyword">case</span> invalidYYY
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>という風に Extension で追加できれば良いのですが、実は Extension を使って Enum の case を追加することは不可能です。</p>
<p>となれば新たにエラーのクラスを作成するしかありません。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">enum</span> <span class="token builtin">APIErrorB</span><span class="token punctuation">:</span> <span class="token builtin">Error</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> invalidXXX
    <span class="token keyword">case</span> invalidYYY
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>こうすれば実装はできるのですが、利用する上で大変不便です。</p>
<p>何故なら、ライブラリは<code>APIErrorA</code>の Enum で返してくるので当然受け取る側の変数も<code>let error: APIErrorA</code>のように<code>APIErrorA</code>型であることを明示しなければなりませんが、こうなるとアプリが返してくるはずの<code>APIErrorB</code>のエラーを受け取れないからです。</p>
<p>エラーを受け取る変数を二つ用意すればいいのですが、それをやると先程の動物の例と同じように冗長なコードになってしまいます。</p>
<p>そこでライブラリ側にはエラーの拡張を許すようにプロトコルを使ってエラーを定義します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// ライブラリ</span>
<span class="token keyword">protocol</span> <span class="token builtin">PlatformError</span><span class="token punctuation">:</span> <span class="token builtin">LocalizedError</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token builtin">APIError</span><span class="token punctuation">:</span> <span class="token builtin">PlatformError</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> forbidden
    <span class="token keyword">case</span> invalid
<span class="token punctuation">}</span>

<span class="token comment">// ライブラリを利用するアプリ</span>
<span class="token keyword">enum</span> <span class="token builtin">APPError</span><span class="token punctuation">:</span> <span class="token builtin">PlatformError</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> invalidXXX
    <span class="token keyword">case</span> invalidYYY
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>今回はプロトコルに準拠させるだけなので別にプロトコル内には何も書かなくて大丈夫です。</p>
<p>このようにプロトコルに何も特別なことを書かない場合は簡単に利用することができます。</p>
<h3 id="プロトコルの罠" tabindex="-1"><a class="header-anchor" href="#プロトコルの罠" aria-hidden="true">#</a> プロトコルの罠</h3>
<p>ところが、<code>PlatformError</code>を<code>LocalizedError</code>だけでなく<code>Identifiable</code>にも準拠させるとコンパイルエラーが発生します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">PlatformError</span><span class="token punctuation">:</span> <span class="token builtin">LocalizedError</span><span class="token punctuation">,</span> <span class="token builtin">Identifiable</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> errors<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">PlatformError</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">APIError</span><span class="token punctuation">.</span>forbidden<span class="token punctuation">,</span> <span class="token builtin">APPError</span><span class="token punctuation">.</span>change<span class="token punctuation">]</span> <span class="token comment">// Protocol 'PlatformError' can only be used as a generic nostraint because it has Self or associated type requirements</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>コンパイルエラーを読むと「プロトコルが<code>associated type</code>の要件を持っているから」とあります。</p>
<p>ここで<code>Identifiable</code>プロトコルの<a href="https://developer.apple.com/documentation/swift/identifiable" target="_blank" rel="noopener noreferrer">ドキュメント<OutboundLink/></a>を読んでみると、</p>
<div class="custom-container tip"><p class="custom-container-title">Identifiable</p>
<p>associatedtype ID</p>
<p>A type representing the stable identity of the entity associated with an instance.</p>
<p>Required</p>
</div>
<p>と書いており<code>Identifiable</code>に準拠したことで<code>assosiated type</code>が要件に加わり、そのためにコンパイルエラーが発生したことがわかります。</p>
<p><a href="https://qiita.com/omochimetaru/items/b41e7699ea25a324aefa" target="_blank" rel="noopener noreferrer">Swift のジェネリックなプロトコルの変数はなぜ作れないのか、コンパイル後の中間言語を見て考えた<OutboundLink/></a>にもあるように、</p>
<div class="custom-container tip"><p class="custom-container-title">導入</p>
<p>Swift では通常のプロトコルは変数の型として使用することができますが、</p>
<p>型パラメータ(associated type)を持つジェネリックなプロトコルの変数は作れません。</p>
</div>
<p>とあるように、プロトコルを<code>Identifiable</code>準拠にした段階でプロトコルを変数の型として利用することができなくなってしまうのです。</p>
<p>また、<code>Identifiable</code>でなくても<code>associatedtype</code>をプロトコル内に書いた段階で変数の型としては利用できなくなります。</p>
<h2 id="enum-caseiterable" tabindex="-1"><a class="header-anchor" href="#enum-caseiterable" aria-hidden="true">#</a> Enum + CaseIterable</h2>
<p><code>Identifaible</code>に準拠させてしまうとめんどくさいことはわかりましたが、<code>CaseIterable</code>はどうでしょうか？</p>
<p>調べてみると<a href="https://developer.apple.com/documentation/swift/caseiterable" target="_blank" rel="noopener noreferrer">ドキュメント<OutboundLink/></a>には次のようにあります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>static var allCases: Self.AllCases
    A collection of all values of this type.
    Required.
associatedtype AllCases
    A type that can represent a collection of all values of this type.
    Required.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>つまり、CaseIterable に準拠させると<code>associatedtype</code>が設定されるので変数としてはプロトコルを指定できないことになります。</p>
<p>よって、アプリとライブラリのエラーを全て一括で配列にする<code>PlatformError.allCases</code>は利用できないということになります。</p>
<p>まあでもプロトコルには適応できないというだけであって、それぞれの Enum に対して<code>CaseIterable</code>準拠させれば似たようなことはできます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// サンプルコード</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">protocol</span> <span class="token builtin">PlatformError</span><span class="token punctuation">:</span> <span class="token builtin">LocalizedError</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> rawValue<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token builtin">APIError</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">PlatformError</span><span class="token punctuation">,</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> forbidden
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token builtin">APPError</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">PlatformError</span><span class="token punctuation">,</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> change
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ErrorTypeList</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> errors<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">PlatformError</span><span class="token punctuation">]</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>errors<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">PlatformError</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>errors <span class="token operator">=</span> errors
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> errorType <span class="token operator">=</span> <span class="token function">ErrorTypeList</span><span class="token punctuation">(</span>errors<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token builtin">APPError</span><span class="token punctuation">.</span>allCases <span class="token operator">+</span> <span class="token builtin">APIError</span><span class="token punctuation">.</span>allCases<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> error <span class="token keyword">in</span> errorType<span class="token punctuation">.</span>errors <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span> <span class="token comment">// -> chnage, forbidden</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>プロトコルにプロトコルを準拠させる時は<code>associatedtype</code>がついているか気をつけようね！！！</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/31lUTkystbL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B001U7651A/?tag=tkgstrator0f-22" target="_blank">コカ・コーラ ドクターペッパー 500mlPET×24本</a></li>
<li class="price">￥2,120 (￥88 / 本)</li>
</ul>
</div>
</template>
