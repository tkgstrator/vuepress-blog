<template><h2 id="urlrequest-はいいぞ" tabindex="-1"><a class="header-anchor" href="#urlrequest-はいいぞ" aria-hidden="true">#</a> URLRequest はいいぞ</h2>
<p>URLRequest は Swift で HTTP 通信をするための標準ライブラリである。が、実際にアプリを組むとなると簡単で高機能な Alamofire を使ってしまいがちであった。</p>
<p>ただ、作りたい自作ライブラリが HTTP 通信を必要とし、そのライブラリを使いたいアプリも HTTP 通信が必要になるとライブラリにもアプリにも Alamofire を導入せねばならず、なんとなく気持ち悪い印象を受ける。</p>
<p>複雑怪奇なライブラリならさておき、SplatNet2 程度のライブラリなら GET と POST がリクエストできれば良いので Alamofire のような高機能ライブラリも、それを受け取るための SwiftyJSON も不要なはずなのだ。</p>
<p>よって、今回は原点回帰をして外部ライブラリなしに API を叩いて通信するためのコードを書いていく。</p>
<h2 id="swift-のクラスの理解を深める" tabindex="-1"><a class="header-anchor" href="#swift-のクラスの理解を深める" aria-hidden="true">#</a> Swift のクラスの理解を深める</h2>
<p>Swift でライブラリをつくる際は<code>public class</code>にしなければ呼び出せないことが知られている。</p>
<p>例えば<code>OAuth</code>クラスをライブラリ化したいのであれば以下のように書かなければいけない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// OK</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OAuth</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// OK</span>
open <span class="token keyword">class</span> <span class="token class-name">OAuth</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// NG</span>
<span class="token keyword">class</span> <span class="token class-name">OAuth</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>なお、<code>public</code>に代えて上のように<code>open</code>を指定することもできる。<code>public</code>ではできない別モジュールからの継承が<code>open</code>では可能になるようだが、具体的な使いみちはいまのところ思いつかない。</p>
<h3 id="クラス変数とクラス関数" tabindex="-1"><a class="header-anchor" href="#クラス変数とクラス関数" aria-hidden="true">#</a> クラス変数とクラス関数</h3>
<p>クラス直下に書いた変数はクラス変数として扱われる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OAuth</span> <span class="token punctuation">{</span>

    <span class="token keyword">let</span> version<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token string">"1.10.0"</span>

    <span class="token comment">// OK</span>
    <span class="token keyword">public</span> <span class="token keyword">func</span> <span class="token function">getVersion1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// NG</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">func</span> <span class="token function">getVersion2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>この場合バージョン情報として定義した<code>version</code>がクラス変数になり、そのバージョンを取得する<code>getVersion()</code>という関数を考えよう。</p>
<p>このとき関数は<code>public func</code>か<code>public class func</code>のように定義できるのだが、この違いをわかっておかないとのちのちめんどくさいことになる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// public func</span>
<span class="token keyword">let</span> oauth<span class="token punctuation">:</span> <span class="token builtin">OAuth</span> <span class="token operator">=</span> <span class="token function">OAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
oauth<span class="token punctuation">.</span><span class="token function">getVersion1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>public func</code>の場合はクラス関数なのでクラスを実体化させてからでないと使うことができない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// public class func</span>
<span class="token builtin">OAuth</span><span class="token punctuation">.</span><span class="token function">getVersion2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>それに対して<code>public class func</code>は OAuth クラスのクラス関数なので使いたいクラス自体を明示すれば使うことができる。</p>
<p>ここで重要になるのは<code>version</code>がただのクラス変数であり、クラスがインスタンス化されるまで取得できないということだ。よって、<code>getVersion2</code>ではまだ実体化していない version を取得することができない。このプログラムはコンパイルエラーを返すのである。</p>
<p>これを防ぐためには<code>version</code>の値をクラスが常に保存しておくようにする。プログラミング言語等によってはクラス変数化する<code>class let version = &quot;1.10.0&quot;</code>のような書き方ができるが、Swift ではできない。その代わり<code>static</code>が用意されているのでそちらを利用する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OAuth</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token keyword">let</span> version<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token string">"1.10.0"</span>

    <span class="token comment">// NG</span>
    <span class="token keyword">public</span> <span class="token keyword">func</span> <span class="token function">getVersion1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// OK</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">func</span> <span class="token function">getVersion2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>ただし、こうすると今度は<code>getVersion1()</code>が正しく値をとってこれなくなる。値をとってこれるようにするためには、</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">func</span> <span class="token function">getVersion1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token builtin">OAuth</span><span class="token punctuation">.</span>version<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>のように OAuth クラスの変数を呼び出すようにコードを変えなければいけない。</p>
<h2 id="httpheaders-と-httpheader-を定義しよう" tabindex="-1"><a class="header-anchor" href="#httpheaders-と-httpheader-を定義しよう" aria-hidden="true">#</a> HTTPHeaders と HTTPHeader を定義しよう</h2>
<p>HTTPHeaders と HTTPHeader はどちらも Alamofire で使われる構造体である。非常に便利なので同じテクニックを使わせてもらうことにした。</p>
<p>HTTPHeaders のソースコードは<a href="https://github.com/Alamofire/Alamofire/blob/097e1f03166d49b31f824507fb85ad843b14fc13/Source/HTTPHeaders.swift" target="_blank" rel="noopener noreferrer">ここ<OutboundLink/></a>にあるが、今回はすべてを利用するわけではないので便利そうなところだけ参考にさせていただいた。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// HTTPHeader.swift</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token builtin">HTTPHeader</span><span class="token punctuation">:</span> <span class="token builtin">Hashable</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">let</span> name<span class="token punctuation">:</span> <span class="token builtin">String</span>
    <span class="token keyword">public</span> <span class="token keyword">let</span> value<span class="token punctuation">:</span> <span class="token builtin">String</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
        <span class="token keyword">self</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">Array</span> <span class="token keyword">where</span> <span class="token builtin">Element</span> <span class="token operator">==</span> <span class="token builtin">HTTPHeader</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">index</span><span class="token punctuation">(</span>of name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Int</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> name <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">lowercased</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> firstIndex <span class="token punctuation">{</span> $<span class="token number">0</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">lowercased</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> name <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>HTTPHeader は単一のヘッダー情報を持つ構造体で、それをまとめたものが HTTPHeaders である。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token builtin">HTTPHeaders</span> <span class="token punctuation">{</span>
    <span class="token comment">// HTTPHeaderの配列</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">HTTPHeader</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 重複してないか調べて追加する関数</span>
    <span class="token keyword">public</span> <span class="token keyword">mutating</span> <span class="token keyword">func</span> <span class="token function">update</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">update</span><span class="token punctuation">(</span><span class="token function">HTTPHeader</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> value<span class="token punctuation">:</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">mutating</span> <span class="token keyword">func</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token number">_</span> header<span class="token punctuation">:</span> <span class="token builtin">HTTPHeader</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 重複していなければ追加</span>
        <span class="token keyword">guard</span> <span class="token keyword">let</span> index <span class="token operator">=</span> headers<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> header<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            headers<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 重複していれば値を更新</span>
        headers<span class="token punctuation">.</span><span class="token function">replaceSubrange</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>index<span class="token punctuation">,</span> with<span class="token punctuation">:</span> <span class="token punctuation">[</span>header<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">HTTPHeaders</span><span class="token punctuation">:</span> <span class="token builtin">ExpressibleByDictionaryLiteral</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>dictionaryLiteral elements<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">String</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        elements<span class="token punctuation">.</span>forEach<span class="token punctuation">{</span> <span class="token function">update</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> $<span class="token number">0.0</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> $<span class="token number">0.1</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>そしてここで重要なのがこの<code>ExpressibleByDictionaryLiteral</code>で、これを利用することでなんと辞書型から直接 HTTPHeaders のインスタンスをつくることができるようになる。</p>
<p>つまり、下のように辞書をそのまま指定するだけで簡単に HTTPHeader 型に変換できるのだ、すごい。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> header<span class="token punctuation">:</span> <span class="token builtin">HTTPHeaders</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">"User-Agent"</span><span class="token punctuation">:</span> <span class="token string">"USER_AGENT"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="httpmethod-を定義しよう" tabindex="-1"><a class="header-anchor" href="#httpmethod-を定義しよう" aria-hidden="true">#</a> HTTPMethod を定義しよう</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token builtin">HTTPMethod</span><span class="token punctuation">:</span> <span class="token builtin">RawRepresentable</span><span class="token punctuation">,</span> <span class="token builtin">Equatable</span><span class="token punctuation">,</span> <span class="token builtin">Hashable</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> delete    <span class="token operator">=</span> <span class="token function">HTTPMethod</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string">"DELETE"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> <span class="token keyword">get</span>       <span class="token operator">=</span> <span class="token function">HTTPMethod</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string">"GET"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> post      <span class="token operator">=</span> <span class="token function">HTTPMethod</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string">"POST"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> put       <span class="token operator">=</span> <span class="token function">HTTPMethod</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string">"PUT"</span><span class="token punctuation">)</span>

    <span class="token keyword">public</span> <span class="token keyword">let</span> rawValue<span class="token punctuation">:</span> <span class="token builtin">String</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>rawValue <span class="token operator">=</span> rawValue
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Alamofire ではたくさんのメソッドが対応しているが、この四つがあれば基本的には何でもできるだろうということでこの四つにのみ対応した。</p>
<h2 id="get-しよう" tabindex="-1"><a class="header-anchor" href="#get-しよう" aria-hidden="true">#</a> GET しよう</h2>
<h2 id="post-しよう" tabindex="-1"><a class="header-anchor" href="#post-しよう" aria-hidden="true">#</a> POST しよう</h2>
<p>POST ではデータを送信する必要があり、多くの API は<code>application/json</code>を受け取るようになっているが、たまに頭のおかしい API は<code>application/x-www-form-urlencoded</code>のような<code>Content-Type</code>を要求してくる。<code>application/form-data</code>のような更におかしなものも存在するが、ここではこの二つだけに絞ろう。</p>
<p>Alamofire であればこれの対応は簡単で<code>parameters</code>のエンコーディングで<code>JSONEncoding.default</code>を指定すれば<code>JSON</code>形式でパラメータを変換でき、<code>URLEncoding.default</code>を指定すれば<code>x-www-form-urlencoded</code>に対応できる。</p>
<h3 id="json-を-post-しよう" tabindex="-1"><a class="header-anchor" href="#json-を-post-しよう" aria-hidden="true">#</a> JSON を POST しよう</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
