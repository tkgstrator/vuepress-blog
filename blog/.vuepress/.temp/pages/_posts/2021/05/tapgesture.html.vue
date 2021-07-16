<template><h2 id="タップジェスチャーを取得する方法" tabindex="-1"><a class="header-anchor" href="#タップジェスチャーを取得する方法" aria-hidden="true">#</a> タップジェスチャーを取得する方法</h2>
<p>タイトルだけ見て「なんだそれ」って思った方もいるかも知れない。ただ単にタップされたかどうかをとってきたいのであれば、<code>onTapGesture()</code> を使えば苦もなく実装できるからだ。</p>
<p>ところがこれでは上手くいかないような状況がある。というのも<code>onTapGesture()</code>は同時に一つしか実行できないためだ。これがどういうふうに困るかというのは次の図を見ればわかるのではないかと思う。</p>
<p><img src="https://pbs.twimg.com/media/E0r0uuyUYAAHOKL?format=png" alt=""></p>
<p>要するにタップしたときの挙動が TabView 自体に備わっているのでめんどくさいことになるのである。</p>
<h2 id="デモアプリ" tabindex="-1"><a class="header-anchor" href="#デモアプリ" aria-hidden="true">#</a> デモアプリ</h2>
<p>例えば以下のコードはタブの中に表示されているコンテンツをタップするとそのタブの番号を返すコードである。</p>
<p>ビルドしてみればわかるが、確かに<code>Tab Content 1</code>をタップすれば<code>1</code>と表示されるし、<code>Tab Content 2</code>をタップすれば<code>2</code>と表示される。ここまでは問題がないように思える。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> selection<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">TabView</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">,</span>
                content<span class="token punctuation">:</span>  <span class="token punctuation">{</span>
                    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab Content 1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab1"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab Content 2"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab2"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab Content 3"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab3"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>ではこの TabView 自体がタップされたときに別の挙動をしたい場合はどうすればよいだろうか。単純に思いつくのは TabView 自体にも<code>onTapGesture()</code>を追加する方法である。TabView 自体に<code>onTapGesture()</code>を追加してどういう意味があるのかと思うだろうが、ちょっと前の記事で触れたように「指定時間操作がなければ別の画面に遷移する」というような機能を実装しようとしたら「最後にアプリを操作した時間」というのが必要になる。</p>
<p>よって、最も大きいビュー自体をタップされたかどうかを検知する必要があるというわけだ。</p>
<h3 id="tabview" tabindex="-1"><a class="header-anchor" href="#tabview" aria-hidden="true">#</a> TabView</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> selection<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">TabView</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">,</span>
                content<span class="token punctuation">:</span>  <span class="token punctuation">{</span>
                    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab Content 1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab1"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab Content 2"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab2"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab Content 3"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Tab3"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token comment">// 追加</span>
            <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"TabView"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>で、やってみればわかるのだがこのアプリは想定通りの動作をしない。というのも TabView 自体がタップされた場所で<code>$selection</code>の値を変更してタブを切り替えるという動作が実装されているからだ。</p>
<p>つまり、TabView 自体に<code>onTapGesture()</code>をつけた時点でそちらの機能が優先されてしまい、タブが切り替わらなくなってしまうのである。</p>
<p>第一、この方式はあまり推奨されない。何故ならこれだと TabView のタップされた判定しかとってこれないからだ。他のビューでも同様にタップされたかの判定を書く必要が生じるが、それはオブジェクト指向に反する。</p>
<h3 id="app-swift" tabindex="-1"><a class="header-anchor" href="#app-swift" aria-hidden="true">#</a> App.swift</h3>
<p>ならばアプリのルートに対して<code>onTapGesture()</code>をつければいいじゃないかという話になるが、やはりこれもタブの切替ができなくなってしまう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>@main
<span class="token keyword">struct</span> <span class="token builtin">TouchDemoApp</span><span class="token punctuation">:</span> <span class="token builtin">App</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">Scene</span> <span class="token punctuation">{</span>
        <span class="token builtin">WindowGroup</span> <span class="token punctuation">{</span>
            <span class="token function">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span>
                    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"TAPPED"</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="解決策" tabindex="-1"><a class="header-anchor" href="#解決策" aria-hidden="true">#</a> 解決策</h2>
<p>どうしたものかと頭を悩ませていたのだが、世界中の知識が集まる<a href="https://stackoverflow.com/questions/63927489/how-to-track-all-touches-across-swiftui-app" target="_blank" rel="noopener noreferrer">StackOverflow<OutboundLink/></a>に解決策が載っていた。</p>
<p>まず、以下のような Extension を作成する。これは SwiftUI というよりは Objective-C に近いのではないかと勝手に思っている。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">UIApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">addTapGestureRecognizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">guard</span> <span class="token keyword">let</span> window <span class="token operator">=</span> windows<span class="token punctuation">.</span><span class="token builtin">first</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
        <span class="token keyword">let</span> tapGesture <span class="token operator">=</span> <span class="token function">UITapGestureRecognizer</span><span class="token punctuation">(</span>target<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> #<span class="token function">selector</span><span class="token punctuation">(</span>tapAction<span class="token punctuation">)</span><span class="token punctuation">)</span>
        tapGesture<span class="token punctuation">.</span>requiresExclusiveTouchType <span class="token operator">=</span> <span class="token boolean">false</span>
        tapGesture<span class="token punctuation">.</span>cancelsTouchesInView <span class="token operator">=</span> <span class="token boolean">false</span>
        tapGesture<span class="token punctuation">.</span>delegate <span class="token operator">=</span> <span class="token keyword">self</span>
        window<span class="token punctuation">.</span><span class="token function">addGestureRecognizer</span><span class="token punctuation">(</span>tapGesture<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token atrule">@objc</span> <span class="token keyword">func</span> <span class="token function">tapAction</span><span class="token punctuation">(</span><span class="token number">_</span> sender<span class="token punctuation">:</span> <span class="token builtin">UITapGestureRecognizer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"tapped"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">UIApplication</span><span class="token punctuation">:</span> <span class="token builtin">UIGestureRecognizerDelegate</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">func</span> <span class="token function">gestureRecognizer</span><span class="token punctuation">(</span><span class="token number">_</span> gestureRecognizer<span class="token punctuation">:</span> <span class="token builtin">UIGestureRecognizer</span><span class="token punctuation">,</span> shouldRecognizeSimultaneouslyWith otherGestureRecognizer<span class="token punctuation">:</span> <span class="token builtin">UIGestureRecognizer</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span> <span class="token comment">// もし他のジェスチャーと競合したくない場合はfalseを設定する</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>最後にこの関数を<code>onAppear()</code>を使って ContentView 自体に適用する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>@main
<span class="token keyword">struct</span> <span class="token builtin">TouchDemoApp</span><span class="token punctuation">:</span> <span class="token builtin">App</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">Scene</span> <span class="token punctuation">{</span>
        <span class="token builtin">WindowGroup</span> <span class="token punctuation">{</span>
            <span class="token function">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onAppear</span><span class="token punctuation">(</span>perform<span class="token punctuation">:</span> <span class="token builtin">UIApplication</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span>addTapGestureRecognizer<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>なんとこれだけで終わりである、神かな？</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/416ZqsPCCjL._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/4815604061/?tag=tkgstrator0f-22" target="_blank">SwiftUI 徹底入門</a></li>
<li class="price">￥7,054</li>
</ul>
</div>
</template>
