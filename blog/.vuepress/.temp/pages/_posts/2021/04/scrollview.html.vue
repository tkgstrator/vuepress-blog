<template><h2 id="scrollviewreader" tabindex="-1"><a class="header-anchor" href="#scrollviewreader" aria-hidden="true">#</a> ScrollViewReader</h2>
<p>ScrollViewReader は iOS14 以降で使える List や ScrollView で使える便利な機能である。</p>
<h2 id="自動スクロール" tabindex="-1"><a class="header-anchor" href="#自動スクロール" aria-hidden="true">#</a> 自動スクロール</h2>
<p>以下のコードは一見すると要素数 100 のリストを自動生成し、View を表示すると同時に 20 番目にジャンプするコードだが正しく動作しない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token builtin">ScrollViewReader</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
        <span class="token builtin">List</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> idx <span class="token keyword">in</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>idx<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">onAppear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            value<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> anchor<span class="token punctuation">:</span> <span class="token punctuation">.</span>top<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>この場合だと<code>value.scrollTo(20, anchor: .top)</code>の 20 は Hashable である必要があるのだが、List のそれぞれの要素について適切な ID が割り当てられていないからだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token builtin">ScrollViewReader</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
        <span class="token builtin">List</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> idx <span class="token keyword">in</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>idx<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">onAppear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            value<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> anchor<span class="token punctuation">:</span> <span class="token punctuation">.</span>top<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>このように適切に ID を割り当てれば View 表示と同時にジャンプする。ただ、このままだといきなりジャンプするのでアニメーションを挟んでゆったりとした動作にしたい場合には<code>withAnimation</code>を使えば良い。</p>
<p><code>withAnimation</code>のネスト内で変数の値を変化させたとき、その変数の変化でビューの再描画が行われたときにアニメーションを発生させることができるようになる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token builtin">ScrollViewReader</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
        <span class="token builtin">List</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> idx <span class="token keyword">in</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>idx<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">onAppear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            withAnimation <span class="token punctuation">{</span>
                value<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> anchor<span class="token punctuation">:</span> <span class="token punctuation">.</span>top<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>よって、完成するコードは上のようになる。</p>
<h2 id="横スクロールを実装する" tabindex="-1"><a class="header-anchor" href="#横スクロールを実装する" aria-hidden="true">#</a> 横スクロールを実装する</h2>
<h3 id="tabview-を使う" tabindex="-1"><a class="header-anchor" href="#tabview-を使う" aria-hidden="true">#</a> TabView を使う</h3>
<p>愚直な方法が TabView を利用する方法である。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">TabView</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> idx <span class="token keyword">in</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"CONTENT"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">tabViewStyle</span><span class="token punctuation">(</span><span class="token function">PageTabViewStyle</span><span class="token punctuation">(</span>indexDisplayMode<span class="token punctuation">:</span> <span class="token punctuation">.</span>always<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>ただし、TabView は SwiftUI2.0 からはタブの状態を保持するようになったためデータをたくさん描画するタブを無数に生成するとメモリを大量に消費する。</p>
<p>画面下部に表示される Index を押せば一応画面は遷移できるが小さくて押しにくいので微妙だったりする。これは ScrollViewReader を組み合わせ上手くできる。</p>
<h3 id="scrollview-lazyhstack-を使う" tabindex="-1"><a class="header-anchor" href="#scrollview-lazyhstack-を使う" aria-hidden="true">#</a> ScrollView + LazyHStack を使う</h3>
<p>Lazy なので呼び出されるまで画面を描画せず、そのためメモリを消費しにくいという利点がある。</p>
<p>ただ、横幅指定をしてもちょうど中央に来たときに止めることができないので真面目に実装しようとするとゴリゴリのコーディングが必要になる。TabView だけで 100 件くらいならなんとかなりそうなので、それ以上の表示を要求されるときだけで良いかもしれない。</p>
<p>次期バージョンで LazyHStack に step みたいな機能がついてくれると嬉しい。</p>
</template>
