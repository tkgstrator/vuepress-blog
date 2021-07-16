<template><h2 id="swiftui-の再レンダリングの仕組みを理解する" tabindex="-1"><a class="header-anchor" href="#swiftui-の再レンダリングの仕組みを理解する" aria-hidden="true">#</a> SwiftUI の再レンダリングの仕組みを理解する</h2>
<h2 id="求められている仕様" tabindex="-1"><a class="header-anchor" href="#求められている仕様" aria-hidden="true">#</a> 求められている仕様</h2>
<p>親ビューを以下のように定義する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    @<span class="token builtin">State</span> <span class="token keyword">var</span> placeholders<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">PlaceholderView</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token function">PlaceholderView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">)</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span>placeholders<span class="token punctuation">)</span> <span class="token punctuation">{</span> placeholder <span class="token keyword">in</span>
                placeholder
                    <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                        placeholder<span class="token punctuation">.</span><span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>親ビューは子ビュー（PlaceholderView）の配列を持っておき、タップされるとその子ビューが持つメソッドである<code>animateState()</code>が呼ばれるという仕組みである。</p>
<p>で、子ビューを以下のように定義する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">PlaceholderView</span><span class="token punctuation">:</span> <span class="token builtin">View</span><span class="token punctuation">,</span> <span class="token builtin">Identifiable</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token function">UUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>uuidString

    @<span class="token builtin">State</span> <span class="token keyword">var</span> backgroundColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>clear
    @<span class="token builtin">State</span> <span class="token keyword">var</span> borderColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>blue

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">strokeBorder</span><span class="token punctuation">(</span>borderColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span>backgroundColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        backgroundColor <span class="token operator">=</span> <span class="token punctuation">.</span>black
        borderColor <span class="token operator">=</span> <span class="token punctuation">.</span>red
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>で、これを実行してみると確かに<code>Placeholder.animateState()</code>は呼び出されているのだが、<code>animateState()</code>内で backgroundColor の値を変えているのに Debug Area で内部データを見てみると変わっていない。</p>
<p>色々原因が思いつくのだが、その理由の一つは @State の値はそれ自身か子ビューからしか変更することができないという制約ため。この場合だと PlaceholderView の親ビューである ContentView から変更されようとしているので動かないというわけだ。</p>
<h2 id="改善手法" tabindex="-1"><a class="header-anchor" href="#改善手法" aria-hidden="true">#</a> 改善手法</h2>
<p>親ビューから呼ばれても変わらないので、自身から呼び出すように変更する。</p>
<p>自身といっても<code>var body</code>から呼ばれる必要があるようだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    @<span class="token builtin">State</span> <span class="token keyword">var</span> placeholders<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">PlaceholderView</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token function">PlaceholderView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">)</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span>placeholders<span class="token punctuation">)</span> <span class="token punctuation">{</span> placeholder <span class="token keyword">in</span>
                placeholder
                <span class="token comment">// ここでの処理を削除</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>まず、親ビューの処理を削除する。どうせ動かないのだから消しても問題はない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">PlaceholderView</span><span class="token punctuation">:</span> <span class="token builtin">View</span><span class="token punctuation">,</span> <span class="token builtin">Identifiable</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token function">UUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>uuidString

    @<span class="token builtin">State</span> <span class="token keyword">var</span> backgroundColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>clear
    @<span class="token builtin">State</span> <span class="token keyword">var</span> borderColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>blue

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">strokeBorder</span><span class="token punctuation">(</span>borderColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span>backgroundColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
            <span class="token comment">// ここに処理を追加</span>
            <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        backgroundColor <span class="token operator">=</span> <span class="token punctuation">.</span>black
        borderColor <span class="token operator">=</span> <span class="token punctuation">.</span>red
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>次に子ビューに処理を追加する。要するに「親ビュー -&gt; 子ビュー -&gt; 処理」という流れのうち「親ビュー -&gt; 子ビュー」の段階で State を変更できないような仕組みになっていたのでこれを「子ビュー -&gt; 処理」という直接処理をするような仕組みに変更するのである。</p>
<p>すると理想通りの動作をした。</p>
<h2 id="仕様を変更する" tabindex="-1"><a class="header-anchor" href="#仕様を変更する" aria-hidden="true">#</a> 仕様を変更する</h2>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    @<span class="token builtin">State</span> <span class="token keyword">var</span> passcode<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token operator">?</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">VStack</span><span class="token punctuation">(</span>spacing<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
                <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token number">_</span> <span class="token keyword">in</span>
                    <span class="token function">PlaceholderView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">addSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"COUNT"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">addSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        passcode<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token constant">nil</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> passcode<span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token operator">>=</span> <span class="token number">4</span> <span class="token punctuation">{</span>
            passcode<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">PlaceholderView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    @<span class="token builtin">State</span> <span class="token keyword">var</span> backgroundColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>clear
    @<span class="token builtin">State</span> <span class="token keyword">var</span> borderColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>blue

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">strokeBorder</span><span class="token punctuation">(</span>borderColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span>backgroundColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>ContentView のボタンをタップすればカウントが増えていき、4 になったら 0 に戻るというシンプルなプログラムである。</p>
<p>が、これでは何回ボタンが入力されたかをテキストで表示しておりダサい。最大入力数が 4 だとわかっているのだから、入力された文字の数だけ PlaceholderView の見た目を変更してユーザが認識できるような UI の方が理にかなっているのである。</p>
<p>では、ボタンが押されたときに子ビューである PlaceholderView の見た目を更新するためにはどうすればいいだろうか。</p>
<h3 id="結論から言うと" tabindex="-1"><a class="header-anchor" href="#結論から言うと" aria-hidden="true">#</a> 結論から言うと</h3>
<p>子ビューの見た目を親ビューからうまいこと変化させる仕組みは（多分）存在しません。</p>
<p>おとなしく Binding を使いましょう。例えば以下のように State で現在の状態を渡した場合には PlaceholderView が変更を受け取ることができません。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// NGなコード</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">var</span> length<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> passcode<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token operator">?</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> lockStates<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">LockState</span><span class="token punctuation">]</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>length<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length
        <span class="token keyword">self</span><span class="token punctuation">.</span>_lockStates <span class="token operator">=</span> <span class="token function">State</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">:</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token punctuation">.</span>inactive<span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> length<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">VStack</span><span class="token punctuation">(</span>spacing<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
                <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> index <span class="token keyword">in</span>
                    <span class="token function">PlaceholderView</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> lockStates<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>passcode<span class="token punctuation">.</span><span class="token builtin">count</span><span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">addSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"COUNT"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">addSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        passcode<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token constant">nil</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> passcode<span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token operator">>=</span> length <span class="token punctuation">{</span>
            passcode<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            lockStates<span class="token punctuation">[</span>passcode<span class="token punctuation">.</span><span class="token builtin">count</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">.</span>active
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">PlaceholderView</span><span class="token punctuation">:</span> <span class="token builtin">View</span><span class="token punctuation">,</span> <span class="token builtin">Identifiable</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token function">UUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>uuidString

    @<span class="token builtin">State</span> <span class="token keyword">var</span> backgroundColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>clear
    @<span class="token builtin">State</span> <span class="token keyword">var</span> borderColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>blue
    @<span class="token builtin">State</span> <span class="token keyword">var</span> lockState<span class="token punctuation">:</span> <span class="token builtin">LockState</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>state lockState<span class="token punctuation">:</span> <span class="token builtin">LockState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>_lockState <span class="token operator">=</span> <span class="token function">State</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">:</span> lockState<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">strokeBorder</span><span class="token punctuation">(</span>borderColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span>backgroundColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> lockState<span class="token punctuation">)</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
                <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        backgroundColor <span class="token operator">=</span> <span class="token punctuation">.</span>black
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token builtin">LockState</span><span class="token punctuation">:</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> active
    <span class="token keyword">case</span> inactive
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><p>値が変化する可能性のあるものを受け取り、それによってビューを再レンダリングするためには State ではなく Binding を受け取る必要があるためです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">var</span> length<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> passcode<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token operator">?</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> lockStates<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">LockState</span><span class="token punctuation">]</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>length<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length
        <span class="token keyword">self</span><span class="token punctuation">.</span>_lockStates <span class="token operator">=</span> <span class="token function">State</span><span class="token punctuation">(</span>initialValue<span class="token punctuation">:</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token punctuation">.</span>inactive<span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> length<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">VStack</span><span class="token punctuation">(</span>spacing<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
                <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> index <span class="token keyword">in</span>
                    <span class="token function">PlaceholderView</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> $lockStates<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>passcode<span class="token punctuation">.</span><span class="token builtin">count</span><span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">addSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"COUNT"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">addSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        passcode<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token constant">nil</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> passcode<span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token operator">>=</span> length <span class="token punctuation">{</span>
            passcode<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            lockStates <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token punctuation">.</span>inactive<span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> length<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            lockStates<span class="token punctuation">[</span>passcode<span class="token punctuation">.</span><span class="token builtin">count</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">.</span>active
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">PlaceholderView</span><span class="token punctuation">:</span> <span class="token builtin">View</span><span class="token punctuation">,</span> <span class="token builtin">Identifiable</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> id<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token function">UUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>uuidString
    @<span class="token builtin">State</span> <span class="token keyword">var</span> backgroundColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>clear
    @<span class="token builtin">State</span> <span class="token keyword">var</span> borderColor<span class="token punctuation">:</span> <span class="token builtin">Color</span> <span class="token operator">=</span> <span class="token punctuation">.</span>blue
    <span class="token comment">// ここをBindingにして変更を受け取れるようにする</span>
    @<span class="token builtin">Binding</span> <span class="token keyword">var</span> lockState<span class="token punctuation">:</span> <span class="token builtin">LockState</span>

    <span class="token comment">// ここもBinding型を受け取れるようにする</span>
    <span class="token keyword">init</span><span class="token punctuation">(</span>state lockState<span class="token punctuation">:</span> <span class="token builtin">Binding</span><span class="token operator">&lt;</span><span class="token builtin">LockState</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// この書き方大事なので覚えておく</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>_lockState <span class="token operator">=</span> lockState
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">strokeBorder</span><span class="token punctuation">(</span>borderColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span>backgroundColor<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">16</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> lockState<span class="token punctuation">)</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
                <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">animateState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        backgroundColor <span class="token operator">=</span> <span class="token punctuation">.</span>black
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token builtin">LockState</span><span class="token punctuation">:</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> active
    <span class="token keyword">case</span> inactive
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView_Previews</span><span class="token punctuation">:</span> <span class="token builtin">PreviewProvider</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">var</span> previews<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">ContentView</span><span class="token punctuation">(</span>length<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br></div></div><p>というわけで、これでボタンを押せばそれに応じて背景色が変わるようにできました。</p>
<p>要するに、受け取る側が Binding でさえ受け取ってしまえば変更可能だということです。</p>
<p>じゃあ Binding で渡せばいいので<code>animateState(state: Binding&lt;LockState&gt;)</code>みたいにすればよいのではないかという気もしてくる。</p>
<p>が、そうすると今度は SwiftUI が構造体で定義してしまうので値を変更できない。変更するためには<code>mutating</code>を付ける必要がある。なんかいろいろめんどくさそうなので普通にイニシャライザで渡してしまったほうが良いかもしれない。</p>
<h3 id="おまけ" tabindex="-1"><a class="header-anchor" href="#おまけ" aria-hidden="true">#</a> おまけ</h3>
<p>このままだと一瞬でボタンの中身が切り替わってしまうので、ゆっくり切り替わるように実装する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>withAnimation <span class="token punctuation">{</span>
    <span class="token function">animateState</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>こうやって<code>withAnimation</code>をつければアニメーションをつけて変化してくれるので便利。</p>
<h2 id="一通りの動作を実装してみる" tabindex="-1"><a class="header-anchor" href="#一通りの動作を実装してみる" aria-hidden="true">#</a> 一通りの動作を実装してみる</h2>
</template>
