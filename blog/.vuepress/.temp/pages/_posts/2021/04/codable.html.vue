<template><h2 id="変数名とキーが一致している場合" tabindex="-1"><a class="header-anchor" href="#変数名とキーが一致している場合" aria-hidden="true">#</a> 変数名とキーが一致している場合</h2>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>こういう値を返す JSON を考える。例えばユーザ名を指定してそのユーザの情報を返すような API が想定されるだろう。</p>
<p>「変数名とキーが一致している」としたのは JSON 側ではスネークケースであることが多いのに対して、Swift ではキャメルケースでの命名規則が推奨されているためだ。つまり JSON 側では<code>user_name</code>というキーがあれば、その値は Swift 側では<code>userName</code>として取得したいのである。</p>
<p>が、今回の API ではたまたまアンダーバーがなくそのような変換が不要だと想定する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> email<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>

<span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// SwiftyJSONを利用した場合</span>
    <span class="token keyword">let</span> user<span class="token punctuation">:</span> <span class="token builtin">UserInfo</span> <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> json<span class="token punctuation">.</span><span class="token function">rawData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// Dictionary&lt;String, Any>の場合</span>
    <span class="token keyword">let</span> user<span class="token punctuation">:</span> <span class="token builtin">UserInfo</span> <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> json<span class="token punctuation">.</span><span class="token function">rawData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
    <span class="token comment">// エラー処理</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="変数名とキーが一致していない場合" tabindex="-1"><a class="header-anchor" href="#変数名とキーが一致していない場合" aria-hidden="true">#</a> 変数名とキーが一致していない場合</h2>
<p>変数名とキーが一致していない場合、いくつかの対応がある。</p>
<ul>
<li>手動で変数とキーの対応表である CodingKey を書く
<ul>
<li>最もめんどくさく、最も推奨しない</li>
<li>キーが多く、ネストが深い JSON だと対応表だけで数百行になる</li>
</ul>
</li>
<li>キーと変数名に一定の規則がある場合
<ul>
<li><code>JSONDecoder()</code>の自動変換機能が使える</li>
<li>キーの命名規則がスネークケースでないとめんどくさいのが難点</li>
</ul>
</li>
<li>変数名をキーから決める
<ul>
<li>確実に一意にはなるが、自分が使いたい変数名にならない場合がある</li>
</ul>
</li>
</ul>
<h3 id="自分で対応表を書く場合" tabindex="-1"><a class="header-anchor" href="#自分で対応表を書く場合" aria-hidden="true">#</a> 自分で対応表を書く場合</h3>
<p>例えば以下のような JSON を扱うことを考えます。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>これは先程の考えを推し進めれば次のように構造体をつくれば Decodable で一発で変換できる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> user_id<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> user_name<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> user_email<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>しかし、Swift はキャメルケースが命名規則なので、この変数名は正直センスがない。別の言い方をすればイカしていないのである。</p>
<p>Swift の命名規則に従えばこれらの変数は以下のように定義されるべきである。スネークケースからキャメルケースの変換は簡単で、アンダーバーを削除してアンダーバーの最初のアルファベットを大文字にするだけである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>ただ、これではそのままデコードできないのでそこを繋げるための対応表を書く。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">let</span> <span class="token builtin">UserInfoKeys</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">CodingKey</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> userId     <span class="token operator">=</span> <span class="token string">"user_id"</span>
    <span class="token keyword">case</span> userName   <span class="token operator">=</span> <span class="token string">"user_name"</span>
    <span class="token keyword">case</span> userEmail  <span class="token operator">=</span> <span class="token string">"user_email"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Enum の名前は今回は変数名と揃えたが、区別がつくなら別に何でも良い。ただし、rawValue だけはキーと一致させる必要がある。</p>
<p>最後に構造体のイニシャライザを書いたらそれらをくっつけるだけである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
   <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
   <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
   <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>

   <span class="token keyword">private</span> <span class="token keyword">let</span> <span class="token builtin">UserInfoKeys</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">CodingKey</span> <span class="token punctuation">{</span>
   <span class="token keyword">case</span> userId     <span class="token operator">=</span> <span class="token string">"user_id"</span>
   <span class="token keyword">case</span> userName   <span class="token operator">=</span> <span class="token string">"user_name"</span>
   <span class="token keyword">case</span> userEmail  <span class="token operator">=</span> <span class="token string">"user_email"</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">init</span><span class="token punctuation">(</span>from decoder<span class="token punctuation">:</span> <span class="token builtin">Decoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span>
       <span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token builtin">UserInfoKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span>
       <span class="token comment">// 処理を書く</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>これは Playground で簡単に再現できるのでやってみましょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Foundation</span>

<span class="token comment">// JSONファイルを定義</span>
<span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token string">""</span>"
<span class="token punctuation">{</span>
    <span class="token string">"user_id"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string">"user_name"</span><span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token string">"user_email"</span><span class="token punctuation">:</span> <span class="token string">"tkgling@gmail.com"</span>
<span class="token punctuation">}</span>
<span class="token string">""</span>"

<span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token function">Data</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>utf8<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token comment">// UserInfoの定義</span>
<span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>

    <span class="token comment">// プロパティとキーの対応</span>
    <span class="token keyword">private</span> <span class="token keyword">enum</span> <span class="token builtin">UserInfoKeys</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">CodingKey</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> userId <span class="token operator">=</span> <span class="token string">"user_id"</span>
        <span class="token keyword">case</span> userName <span class="token operator">=</span> <span class="token string">"user_name"</span>
        <span class="token keyword">case</span> userEmail <span class="token operator">=</span> <span class="token string">"user_email"</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// イニシャライザ</span>
    <span class="token keyword">init</span><span class="token punctuation">(</span>from decoder<span class="token punctuation">:</span> <span class="token builtin">Decoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token builtin">UserInfoKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span>

        userId <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">Int</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>userId<span class="token punctuation">)</span>
        userName <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>userName<span class="token punctuation">)</span>
        userEmail <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>userEmail<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>このコードで正しく、次のような結果を得ることができます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 実行結果</span>
<span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@gmail.com"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>が、やってみればわかるのですが途方もなくめんどくさいです。プロパティが 10 くらいならやる気もおきますが、それを超えるとめんどうなだけです。</p>
<h3 id="スネークケースからキャメルケースへの変換" tabindex="-1"><a class="header-anchor" href="#スネークケースからキャメルケースへの変換" aria-hidden="true">#</a> スネークケースからキャメルケースへの変換</h3>
<p>単にスネークケースからキャメルケースに変換するだけであれば JSONDecoder の<code>convertFromSnakeCase</code>のプロパティが使えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Foundation</span>

<span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token string">""</span>"
<span class="token punctuation">{</span>
    <span class="token string">"user_id"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string">"user_name"</span><span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token string">"user_email"</span><span class="token punctuation">:</span> <span class="token string">"tkgling@gmail.com"</span>
<span class="token punctuation">}</span>
<span class="token string">""</span>"

<span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertFromSnakeCase
    <span class="token keyword">return</span> decoder
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token function">Data</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>utf8<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>これは JSONDecoder のプロパティに予め<code>.convertFromSnakeCase</code>を適用させた状態で使っているため、JSON を読み込んだ段階でキーが全てキャメルケースに変換されています。</p>
<p>よって、対応表を書かなくとも一発でデータを取得することができます。</p>
<h3 id="json-のキーをプロパティ名にする" tabindex="-1"><a class="header-anchor" href="#json-のキーをプロパティ名にする" aria-hidden="true">#</a> JSON のキーをプロパティ名にする</h3>
<p>こちらは Swift での命名規則よりも JSON 側の命名規則を優先する場合、または JSON 側がキャメルケースになっている場合などに使えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Foundation</span>

<span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token string">""</span>"
<span class="token punctuation">{</span>
    <span class="token string">"user_id"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string">"user_name"</span><span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token string">"user_email"</span><span class="token punctuation">:</span> <span class="token string">"tkgling@gmail.com"</span>
<span class="token punctuation">}</span>
<span class="token string">""</span>"

<span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>useDefaultKeys
    <span class="token keyword">return</span> decoder
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token function">Data</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>utf8<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> user_id<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> user_name<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> user_email<span class="token punctuation">:</span> <span class="token builtin">String</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="自動で型変換しよう" tabindex="-1"><a class="header-anchor" href="#自動で型変換しよう" aria-hidden="true">#</a> 自動で型変換しよう</h2>
<p>JSON が持っている型と、Swift で扱いたい型が違う場合があります。その際には<code>DateEncodingStrategy</code>と<code>DateDecodingStrategy</code>を使えば簡単に相互変換ができます。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>アカウントが作成された時間が UnixTimestamp で保存されているのですが、これを Date 型に変換したい場合などが考えられます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertFromSnakeCase
    decoder<span class="token punctuation">.</span>dateDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>secondsSince1970
    <span class="token keyword">return</span> decoder
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>このときはこのように JSONDecoder を拡張してやれば Date 型に自動で変換してくれます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 実行結果</span>
<span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@gmail.com"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>このデコード方式はいまのところ以下のものが対応している様子でした。</p>
<ul>
<li>ISO8601 形式(.iso8601)
<ul>
<li>万能かつ最強</li>
<li>これを使っていればとりあえず怒られることはない</li>
<li>昔は使えなかったっぽいのだが、いつの間にか対応していた</li>
</ul>
</li>
<li>標準フォーマット(.secondsSince1970)
<ul>
<li><code>yyyy-mm-dd HH:mm:ss</code>形式のやつ</li>
</ul>
</li>
<li>標準フォーマット(.millisecondsSince1970)
<ul>
<li>上のやつのミリ秒まで使えるパターン</li>
</ul>
</li>
</ul>
<p>ただ、Realm などは Date 型にプライマリキーをつけられないなどの制約があるので、データベースに保存するつもりならわざわざ Date 型に変換する意味はないような気もします。</p>
<h2 id="いろいろな構造の-json-に対する対応" tabindex="-1"><a class="header-anchor" href="#いろいろな構造の-json-に対する対応" aria-hidden="true">#</a> いろいろな構造の JSON に対する対応</h2>
<h3 id="配列" tabindex="-1"><a class="header-anchor" href="#配列" aria-hidden="true">#</a> 配列</h3>
<p>ではちょっと複雑化したネスト付きの JSON を考えよう。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
  <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"tkgling"</span><span class="token punctuation">,</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>このように配列が入っている場合も、構造体のプロパティとして配列を与えてやれば JSONDecoder は自動で変換してくれます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token keyword">let</span> accounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 実行結果</span>
<span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">,</span> accounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"tkgling"</span><span class="token punctuation">,</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>ちなみに今回は String 型で単純に受け取っていますが、以下のように好きな構造体を割り当てることもできます。</p>
<h3 id="オブジェクト配列" tabindex="-1"><a class="header-anchor" href="#オブジェクト配列" aria-hidden="true">#</a> オブジェクト配列</h3>
<p>オブジェクトを配列として持っている場合を考える。</p>
<p>このときは先程とは違い、何番目のアカウントの id や created_at に直接アクセスできるような仕組みになっているとありがたいわけである。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
  <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">,</span>
      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>この場合はオブジェクトが配列になっているだけなのだから、次のように構造体を定義すれば良い。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token keyword">let</span> accounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Account</span><span class="token punctuation">]</span>

    <span class="token keyword">struct</span> <span class="token builtin">Account</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span>
        <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">,</span> accounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Page_Contents</span><span class="token punctuation">.</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token function">Account</span><span class="token punctuation">(</span>id<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">Page_Contents</span><span class="token punctuation">.</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token function">Account</span><span class="token punctuation">(</span>id<span class="token punctuation">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="オブジェクト" tabindex="-1"><a class="header-anchor" href="#オブジェクト" aria-hidden="true">#</a> オブジェクト</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
  <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>ここで少し問題になるのは、ユーザがアカウントを作成していれば確実に情報は入っていますが、アカウントを作成していない場合には<code>accounts</code>の中身が想定しているものと変わるケースがあるということです。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// パターン1</span>
<span class="token comment">// accountsそのものをレスポンスに含まない</span>
<span class="token punctuation">{</span>
    <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// パターン2</span>
<span class="token comment">// レスポンスに含むが、ないことを示す</span>
<span class="token punctuation">{</span>
    <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
    <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">// パターン3</span>
<span class="token comment">// レスポンスに含めるが、それぞれのパラメータがないことを示す</span>
<span class="token punctuation">{</span>
    <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
    <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"id"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>それぞれについて対応策を考えていきますが、結局はどこのパラメータとして<code>nil</code>を許容するかという問題になります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// パターン1, 2の場合</span>
<span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token keyword">let</span> accounts<span class="token punctuation">:</span> <span class="token builtin">Account</span><span class="token operator">?</span> <span class="token comment">// オプショナル</span>

    <span class="token keyword">struct</span> <span class="token builtin">Account</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span>
        <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 実行結果</span>
<span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">,</span> accounts<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>パターン 2 の場合は<code>accounts</code>に<code>nil</code>が入る可能性があるため、該当部分をオプショナルに変更します。</p>
<p>ちなみに Swift は変数をもったりもたなかったりというようなことが（多分）できないのでパターン 1 の JSON は強制的にパターン 2 と同じデータに変換されます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// パターン3の場合</span>
<span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token keyword">let</span> accounts<span class="token punctuation">:</span> <span class="token builtin">Account</span>

    <span class="token keyword">struct</span> <span class="token builtin">Account</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token operator">?</span>
        <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span><span class="token operator">?</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 実行結果</span>
<span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">,</span> accounts<span class="token punctuation">:</span> <span class="token function">Optional</span><span class="token punctuation">(</span><span class="token builtin">Page_Contents</span><span class="token punctuation">.</span><span class="token builtin">UserInfo</span><span class="token punctuation">.</span><span class="token function">Account</span><span class="token punctuation">(</span>id<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>パターン 3 の場合は<code>accounts</code>自体はかならずあるが、中身のデータが有るかどうかがわからないのでこうなります。</p>
<h3 id="オブジェクト-1" tabindex="-1"><a class="header-anchor" href="#オブジェクト-1" aria-hidden="true">#</a> オブジェクト</h3>
<p>気が狂いそうになるのがこのパターン。Swift は変数名の先頭を数字にできないため、以下のような構造をしていると単純にデータをとってくることができなくなる。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
  <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"1"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token property">"2"</span><span class="token operator">:</span> <span class="token string">"tkgstrator"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>このようなケースでは accounts のキーが必要な場合と不要な場合が存在する。今回のケースではキーは順序を保証するためだけの情報なので（Swift の配列は順序が保証されるので）あってもなくてもいいことになる。</p>
<p>ちなみにただデータを取得したいだけであればこう書ける。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">let</span> userName<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> userEmail<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
    <span class="token keyword">let</span> accounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 実行結果</span>
<span class="token function">UserInfo</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> userName<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> userEmail<span class="token punctuation">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">,</span> accounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="オブジェクトのオブジェクト" tabindex="-1"><a class="header-anchor" href="#オブジェクトのオブジェクト" aria-hidden="true">#</a> オブジェクトのオブジェクト</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">"user_name"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
  <span class="token property">"user_email"</span><span class="token operator">:</span> <span class="token string">"tkgling@sample.com"</span><span class="token punctuation">,</span>
  <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span><span class="token punctuation">,</span>
  <span class="token property">"accounts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"1"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"2"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">,</span>
      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>さっきのを更に拡張するとこうなります。JSON では順序がないため順序を保持するために辞書に ID を割り振っているケースがあります。</p>
<p>これはやはり辞書のキーが数字のため単純に置き換えることができません。</p>
<p>これ、未だに自動で Decodable な struct に変換するための書き方がわからないです。</p>
<h3 id="ルートがオブジェクト" tabindex="-1"><a class="header-anchor" href="#ルートがオブジェクト" aria-hidden="true">#</a> ルートがオブジェクト</h3>
<p>最後にこういうパターンの対応作。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span>
    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">,</span>
    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token number">1617267600</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>単にデータをとってきたいだけなら以下のように書けば良い。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> data<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">UserInfo</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token builtin">UserInfo</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token function">Data</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>utf8<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">struct</span> <span class="token builtin">UserInfo</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">let</span> createdAt<span class="token punctuation">:</span> <span class="token builtin">Date</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 実行結果</span>
<span class="token punctuation">[</span><span class="token builtin">Page_Contents</span><span class="token punctuation">.</span><span class="token function">UserInfo</span><span class="token punctuation">(</span>id<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">Page_Contents</span><span class="token punctuation">.</span><span class="token function">UserInfo</span><span class="token punctuation">(</span>id<span class="token punctuation">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">,</span> createdAt<span class="token punctuation">:</span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">04</span><span class="token operator">-</span><span class="token number">01</span> <span class="token number">09</span><span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">:</span><span class="token number">00</span> <span class="token operator">+</span><span class="token number">0000</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="codable-から-codable-へ" tabindex="-1"><a class="header-anchor" href="#codable-から-codable-へ" aria-hidden="true">#</a> Codable から Codable へ</h2>
<p>例えば、Salmon Stats はシフト統計のデータを取得しようとすると以下のようなレスポンスを返す。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">ShiftStats</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
    <span class="token comment">// グローバルのみ対応</span>
    <span class="token keyword">var</span> global<span class="token punctuation">:</span> <span class="token builtin">Stats</span>
    <span class="token keyword">struct</span> <span class="token builtin">Stats</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> bossAppearance3<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance6<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance9<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance12<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance13<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance14<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance15<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance16<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearance21<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossAppearanceCount<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination3<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination6<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination9<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination12<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination13<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination14<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination15<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination16<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossElimination21<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossEliminationCount<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> clearGames<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> clearWaves<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> games<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> goldenEggs<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> powerEggs<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> rescue<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>一応<code>convertFromSnakeCase</code>を使えば自動でこの形に変換できるのだが、これをこのまま返すのは如何にもという感じがする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">ShiftStats</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
    <span class="token comment">// グローバルのみ対応</span>
    <span class="token keyword">var</span> global<span class="token punctuation">:</span> <span class="token builtin">Stats</span>
    <span class="token keyword">struct</span> <span class="token builtin">Stats</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> clearGames<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> clearWaves<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> games<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> goldenEggs<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> powerEggs<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> rescue<span class="token punctuation">:</span> <span class="token builtin">Int</span>
        <span class="token keyword">var</span> bossCounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span>
        <span class="token keyword">var</span> bossKillCounts<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>せめてこういった感じのレスポンスにすべきである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">static</span> <span class="token keyword">func</span> publish<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">RequestProtocol</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> request<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Future</span><span class="token operator">&lt;</span>T<span class="token punctuation">.</span><span class="token builtin">ResponseType</span><span class="token punctuation">,</span> <span class="token builtin">APIError</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token builtin">Future</span> <span class="token punctuation">{</span> promise <span class="token keyword">in</span>
    <span class="token comment">// 中略</span>
    <span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>V<span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>ところがデータを処理する関数はジェネリクスを使ってこのように書かれている。</p>
<p>要するにリクエストプロトコル自体に変換したい構造体 ResponseType が指定されており、デコーダはその構造体に自動で変換しているというわけである。</p>
<p>で、ここの処理を変更するわけにはいかない。ここを変えてしまうと Codable で自動変換することができなくなってしまう。よって、一度自動変換してプロパティに突っ込んだデータを人間が読みやすい構造体に変換してから返したいわけである。</p>
</template>
