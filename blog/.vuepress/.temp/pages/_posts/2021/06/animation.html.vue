<template><h1 id="swiftui-でのアニメーション" tabindex="-1"><a class="header-anchor" href="#swiftui-でのアニメーション" aria-hidden="true">#</a> SwiftUI でのアニメーション</h1>
<p>SwiftUI では View に視覚効果を付ける Modifier があります。</p>
<p>視覚効果には大雑把に分けて<code>animation</code>と<code>transition</code>の二つがあります。それぞれ何が違うのかということなのですが、<code>animation</code>はプロパティの値が変わる際に視覚効果が発生するのに対して、<code>transition</code>は View の表示と非表示が切り替わる際にしか発生しないということです。</p>
<h2 id="transition-発生のタイミング" tabindex="-1"><a class="header-anchor" href="#transition-発生のタイミング" aria-hidden="true">#</a> Transition 発生のタイミング</h2>
<p>では「表示と非表示」のタイミングとはどういうことなのかを考えてみます。</p>
<p>ぱっと思った感じでは<code>onAppear</code>か<code>onDisapper</code>のどちらかが呼ばれるタイミングの気がしますが、ひょっとしたら<code>scenePhase</code>の切り替えタイミングでも呼ばれるかもしれません。</p>
<p>考えても仕方がないので、実際にコードを書いて確かめてみることにします。</p>
<p>デモコードについてはカピバラ通信さんの<a href="https://capibara1969.com/2442/" target="_blank" rel="noopener noreferrer">【SwiftUI】トランジション（transition）の使い方<OutboundLink/></a>を参考にさせていただきました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 期待通りの動作をしないコード</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> transition<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">VStack</span> <span class="token punctuation">{</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                transition<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"TRANSITION"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> transition <span class="token punctuation">{</span>
                <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token punctuation">.</span>slide<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>さて、上のコードはボタンをタップすると<code>@State</code>の値が変わり、<code>@State</code>の値が変わったことでビューが再描画され、青い円が表示されたり非表示になったりを繰り返します。</p>
<p>そして、<code>transition</code>はビューの「表示/非表示」の切り替わりのタイミングで視覚効果を発生させるので、青い円が表示されるときや消えるときには<code>slide</code>が発生するはずなのですが、このコードでは発生しません。何故か。</p>
<p>もう一度、何故青い円が視覚効果を引き起こすのか、考えてみましょう。</p>
<ol>
<li>ボタンをタップする</li>
<li><code>transition</code>の値が切り替わる</li>
<li>ビューが再レンダリングされる</li>
<li><code>Circle</code>の表示と非表示が切り替わる</li>
<li><code>transision(.slide)</code>が実行される</li>
</ol>
<p>つまり、結局はボタンを押して<code>transition.toggle()</code>が実行されることが視覚効果を引き起こしています。そして、<code>transition</code>での視覚効果を発生させるには「その原因となるプロパティの値の変更を<code>withAnimation</code>のクロージャ内で発生させる」ということが必要になってきます。</p>
<p>要するに「このプロパティの変更で何らかの視覚効果が発生するよ」ということを SwiftUI フレームワークに対して明示しなければいけません。</p>
<div class="custom-container warning"><p class="custom-container-title">必ずしも明示する必要はないらしい</p>
<p>「明示しなければいけない」と書いたが、必ずしも明示する必要はないらしい。が、まあ念の為に明示することを心がけたほうが良いだろう。</p>
</div>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 正常に動作するコード</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> transition<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">VStack</span> <span class="token punctuation">{</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                withAnimation <span class="token punctuation">{</span>
                    transition<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"TRANSITION"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> transition <span class="token punctuation">{</span>
                <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token punctuation">.</span>slide<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>するとボタンを押すと左から青い円が現れて、もう一度ボタンを押すと右に消えていく視覚効果を発生させることができました。</p>
<h3 id="transition-の種類" tabindex="-1"><a class="header-anchor" href="#transition-の種類" aria-hidden="true">#</a> Transition の種類</h3>
<p>今回は左から現れて右に消えていく視覚効果でしたが、逆に右から現れて左に消えていく視覚効果を実装したい場合にはどうすれば良いでしょうか。</p>
<p>実は Transition には次の六種類しか存在しません。<code>slide</code>は常に左から現れて右に消えるため、右から現れて左に消すことはできないということです。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Transition</th>
<th style="text-align:center">視覚効果</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">slide</td>
<td style="text-align:center">左から現れて右に消える</td>
</tr>
<tr>
<td style="text-align:center">move</td>
<td style="text-align:center">指定した方向から現れて指定した方向に消える</td>
</tr>
<tr>
<td style="text-align:center">opacity</td>
<td style="text-align:center">透明度が徐々に上がり現れ、徐々に下がり消える</td>
</tr>
<tr>
<td style="text-align:center">scale</td>
<td style="text-align:center">徐々に大きくなり現れ、徐々に小さくなり消える</td>
</tr>
<tr>
<td style="text-align:center">offset</td>
<td style="text-align:center">指定された位置に移動しながら表示/非表示</td>
</tr>
<tr>
<td style="text-align:center">identity</td>
<td style="text-align:center">視覚効果を利用しない</td>
</tr>
</tbody>
</table>
<p><code>move</code>は<code>slide</code>と同じような視覚効果を持ちますが、現れた方向に消えていってしまうため右から表示させると右に消えていってしまいます。</p>
<p>じゃあどうすればいいかというと表示時と非表示時の視覚効果を変えればよいのです。</p>
<h2 id="transition-の非対称化" tabindex="-1"><a class="header-anchor" href="#transition-の非対称化" aria-hidden="true">#</a> Transition の非対称化</h2>
<p><code>transition</code>を非対称にするには<code>.asymmetric(insertion:, removal:)</code>が利用できます。</p>
<p>さっき説明したように、表示時と非表示時の視覚効果を切り替えることができるので、これを利用すれば右から出現して左に消えていく視覚効果を実装することができます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 右から現れて左に消えていくtransitionの実装</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> transition<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">VStack</span> <span class="token punctuation">{</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                withAnimation <span class="token punctuation">{</span>
                    transition<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"TRANSITION"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> transition <span class="token punctuation">{</span>
                <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">asymmetric</span><span class="token punctuation">(</span>insertion<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span>edge<span class="token punctuation">:</span> <span class="token punctuation">.</span>trailing<span class="token punctuation">)</span><span class="token punctuation">,</span> removal<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span>edge<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="transition-の合成" tabindex="-1"><a class="header-anchor" href="#transition-の合成" aria-hidden="true">#</a> Transition の合成</h3>
<p><code>transition</code>は複数組み合わせることもできます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 不透明度を変えながらスライドするアニメーション</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> transition<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">VStack</span> <span class="token punctuation">{</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                withAnimation <span class="token punctuation">{</span>
                    transition<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"TRANSITION"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> transition <span class="token punctuation">{</span>
                <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token builtin">AnyTransition</span><span class="token punctuation">.</span>slide<span class="token punctuation">.</span><span class="token function">combined</span><span class="token punctuation">(</span>with<span class="token punctuation">:</span> <span class="token punctuation">.</span>opacity<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>この場合、<code>AnyTransition</code>を指定しなければコンパイルエラーが発生します。</p>
<h2 id="transition-が呼ばれるタイミング" tabindex="-1"><a class="header-anchor" href="#transition-が呼ばれるタイミング" aria-hidden="true">#</a> Transition が呼ばれるタイミング</h2>
<h3 id="tabview-の場合" tabindex="-1"><a class="header-anchor" href="#tabview-の場合" aria-hidden="true">#</a> TabView の場合</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> selection<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">TabView</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token punctuation">.</span>slide<span class="token punctuation">)</span>
                <span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"1.circle"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
                <span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token punctuation">.</span>scale<span class="token punctuation">)</span>
                <span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"2.circle"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
                <span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>タブが切り替わるたびにアニメーションが発生するかと思ったが、実際には全く発生しなかった。</p>
<p>おそらく、<code>selection</code>の値が変わったときに<code>withAnimation</code>が呼ばれていないのが原因だと思われる。</p>
<p>これらを解決する方法がいくつかありそうなのだが、あまりにめんどくさいのでここでは触れないことにする。</p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/61827496/swiftui-how-to-animate-a-tabview-selection" target="_blank" rel="noopener noreferrer">SwiftUI: How to animate a TabView selection?<OutboundLink/></a></p>
<p><a href="https://prafullkumar77.medium.com/swiftui-animate-tab-bar-tab-switch-with-a-crossdissolve-slide-38e23bc77e0d" target="_blank" rel="noopener noreferrer">SwiftUI: Animate Tab bar tab switch with a CrossDissolve slide?<OutboundLink/></a></p>
</blockquote>
<h3 id="navigationview-の場合" tabindex="-1"><a class="header-anchor" href="#navigationview-の場合" aria-hidden="true">#</a> NavigationView の場合</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> circle<span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Circle"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> circle<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">transition</span><span class="token punctuation">(</span><span class="token punctuation">.</span>slide<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>表示されたときに視覚効果が発生するならこれならいけるのではと思ったのですが、いけませんでした。</p>
<h3 id="解決方法" tabindex="-1"><a class="header-anchor" href="#解決方法" aria-hidden="true">#</a> 解決方法</h3>
<p>直接的に<code>transition</code>を利用する方法ではないが、View が表示されるたびに TabView でも NavigationView でも<code>transition</code>のような効果を発揮する Extension を作成した。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">transitionScale</span><span class="token punctuation">(</span><span class="token number">_</span> animation<span class="token punctuation">:</span> <span class="token builtin">Animation</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">,</span> scale<span class="token punctuation">:</span> <span class="token builtin">Binding</span><span class="token operator">&lt;</span><span class="token builtin">CGFloat</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        onAppear <span class="token punctuation">{</span>
            <span class="token function">withAnimation</span><span class="token punctuation">(</span>animation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                scale<span class="token punctuation">.</span>wrappedValue <span class="token operator">=</span> <span class="token number">1.0</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span>onDisappear <span class="token punctuation">{</span>
            <span class="token function">withAnimation</span><span class="token punctuation">(</span>animation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                scale<span class="token punctuation">.</span>wrappedValue <span class="token operator">=</span> <span class="token number">0.0</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>scale<span class="token punctuation">.</span>wrappedValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">transitionScale</span><span class="token punctuation">(</span><span class="token number">_</span> animation<span class="token punctuation">:</span> <span class="token builtin">Animation</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token constant">nil</span><span class="token punctuation">,</span> opacity<span class="token punctuation">:</span> <span class="token builtin">Binding</span><span class="token operator">&lt;</span><span class="token builtin">Double</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        onAppear <span class="token punctuation">{</span>
            <span class="token function">withAnimation</span><span class="token punctuation">(</span>animation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                opacity<span class="token punctuation">.</span>wrappedValue <span class="token operator">=</span> <span class="token number">1.0</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span>onDisappear <span class="token punctuation">{</span>
            <span class="token function">withAnimation</span><span class="token punctuation">(</span>animation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                opacity<span class="token punctuation">.</span>wrappedValue <span class="token operator">=</span> <span class="token number">0.0</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span>opacity<span class="token punctuation">.</span>wrappedValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>例えばこういう Extension を書けばそのオブジェクトが表示されるたびにこのメソッドが呼ばれるので、あたかも<code>transition</code>のように振る舞うことができる。</p>
</template>
