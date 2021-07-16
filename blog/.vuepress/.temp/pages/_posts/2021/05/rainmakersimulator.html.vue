<template><h2 id="グラフノードの記述" tabindex="-1"><a class="header-anchor" href="#グラフノードの記述" aria-hidden="true">#</a> グラフノードの記述</h2>
<p>空間の大きさを $N×M$ だとすると、格子点は全部で最大 $NM$ 存在する。グラフ理論的には頂点数が $NM$ あるので、それぞれの頂点を結ぶ辺は最大 $(NM)^2$ 存在することになる。</p>
<p>つまり、空間を表現するのに頂点数 $NM+(NM)^2$ だけのメモリを消費することになる。合計すると $NM×(NM+1)$ になるが、定数倍は無視することが多いので単に $(NM)^2$ で良い。</p>
<p>これは N と M が小さいうちはいいが、ある程度大きくなってくると途端にメモリの消費量が増えることを意味する。頂点があるかどうか、辺があるかどうかは Boolean を使えば 1 ビットで表現できるものの、N = 100、M = 300 くらいになってくると $(NM)^2=900000000$ bit にも達する。</p>
<p>するとこれだけで 100MB 以上もメモリを消費する計算になる。第一、こんな巨大な配列をいちいち初期化していたら時間がかかってしょうがないだろう。</p>
<h2 id="最適化を考える" tabindex="-1"><a class="header-anchor" href="#最適化を考える" aria-hidden="true">#</a> 最適化を考える</h2>
<p>とはいえ、よく考えればこんなに巨大なメモリ空間は必要にならないことがわかる。</p>
<p>格子点状のグラフを考えるのであれば、隣接するグラフは高々四つしかないからだ。つまり、頂点数 + 頂点数 × 4 程度のメモリがあれば良いことになる。</p>
<p>するとわずか 18.75KB になる。この程度であれば（それでもかなり大きいメモリ空間にはなるが）まあまあ許容できるだろう。</p>
<h2 id="距離を計算する" tabindex="-1"><a class="header-anchor" href="#距離を計算する" aria-hidden="true">#</a> 距離を計算する</h2>
<p>では、格子点の情報が読み込めたとする。</p>
<p>ここでは地点 $P(x1, y1)$ から $Q(x2, y2)$ への距離を求めたいとする。もしも格子点が完全グラフであれば $Abs(x1-x2)+Abs(y1-y2)$ で一発で計算できるのだが、実際には連結していない頂点があるためこの方法では計算できない。</p>
<p>なので以前紹介したダイクストラ法で距離を計算したいと思います。</p>
<h3 id="アルゴリズム" tabindex="-1"><a class="header-anchor" href="#アルゴリズム" aria-hidden="true">#</a> アルゴリズム</h3>
<p>ダイクストラ法を使うためには頂点、辺、コストの三つの情報が必要です。コストは辺の情報の一つといえるので、実際には意識する必要はありません。</p>
<p>グラフ理論ではグラフは頂点と辺で構成されると定義されることが多い（$G=(V,E)$ などと表される）のでここでもそれを利用しましょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">var</span> vertex<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Vertex</span><span class="token punctuation">]</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>vertex<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Vertex</span><span class="token punctuation">]</span><span class="token punctuation">,</span> edge<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Edge</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>vertex <span class="token operator">=</span> vertex
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Edge</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">var</span> vertices<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token builtin">Vertex</span><span class="token punctuation">,</span> <span class="token builtin">Vertex</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">var</span> length<span class="token punctuation">:</span> <span class="token builtin">Int</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>vertices<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token builtin">Vertex</span><span class="token punctuation">,</span> <span class="token builtin">Vertex</span><span class="token punctuation">)</span><span class="token punctuation">,</span> length<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>vertices <span class="token operator">=</span> vertices
        <span class="token keyword">self</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Vertex</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">var</span> point<span class="token punctuation">:</span> <span class="token builtin">CGPoint</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>point <span class="token operator">=</span> <span class="token function">CGPoint</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> x<span class="token punctuation">,</span> y<span class="token punctuation">:</span> y<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>point<span class="token punctuation">:</span> <span class="token builtin">CGPoint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>point <span class="token operator">=</span> point
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>本来は<code>E -&gt; V × V</code>なのでいちいち<code>Edge</code>は<code>Vertex</code>の情報を持つ必要がないのですが、格子グラフはエッジが一つの頂点あたり高々 4 つしかないので Sparse Graph と考えて良いです。</p>
<p>そのため、バカ正直に<code>E -&gt; V × V</code>と考えるよりも<code>Edge</code>自体にどことどこの頂点を繋いでいるものかという情報を持たせたほうが楽です。</p>
<p>あとはこれらのクラスに対してダイクストラ法を適用します。</p>
</template>
