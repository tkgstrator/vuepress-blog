<template><h2 id="非同期処理と同期処理" tabindex="-1"><a class="header-anchor" href="#非同期処理と同期処理" aria-hidden="true">#</a> 非同期処理と同期処理</h2>
<p>非同期処理と同期処理の考え方は非常にややこしくて、この記事を執筆している現在でもよくわかっていません。</p>
<p>あくまでも自分なりの考え、納得の仕方なので本来の仕様とは違うのかもしれないですが、いろいろなコードを書いてどのように実行されるか考えていきましょう。</p>
<p>なお、スレッド処理については<a href="https://tkgstrator.work/posts/2021/05/17/threadsleep.html" target="_blank" rel="noopener noreferrer">前回の記事<OutboundLink/></a>で軽く解説しているので先に目を通しておくと良いかもしれません。</p>
<h2 id="逐次処理と並列処理" tabindex="-1"><a class="header-anchor" href="#逐次処理と並列処理" aria-hidden="true">#</a> 逐次処理と並列処理</h2>
<p>ややこしいのが非同期処理と同期処理とは別に逐次処理（Serial）と並列処理（Concurrent）があるというところです。</p>
<h3 id="逐次処理" tabindex="-1"><a class="header-anchor" href="#逐次処理" aria-hidden="true">#</a> 逐次処理</h3>
<p>一度に一つのタスクが実行されることを保証する。ただし、全てのタスクが同一のスレッドで実行されるとは限らない。</p>
<div class="custom-container tip"><p class="custom-container-title">逐次処理について</p>
<p>例えばあるループを逐次処理で行うと、0 番目、1 番目、2 番目の順に Queue に追加されていく。逐次処理なので 1 番目の処理は 0 番目が終わるまで開始されないことが保証される。</p>
<p>当然、出力も 0 番目からのように順序が保存される。</p>
</div>
<h3 id="並列処理" tabindex="-1"><a class="header-anchor" href="#並列処理" aria-hidden="true">#</a> 並列処理</h3>
<p>一度に一つ以上のタスクが実行される。ただし、処理の順番は Queue に追加された順に行われる。</p>
<div class="custom-container tip"><p class="custom-container-title">並列処理について</p>
<p>例えばあるループを逐次処理で行うと、0 番目、1 番目、2 番目の順に Queue に追加されていく。並列処理なので 1 番目が実行されるのは 0 番目より後だが、0 番目が終了するのを待たずに 1 番目が実行される。</p>
<p>0 番目の処理が重かった場合には 1 番目の出力が先に行われることも当然ある。</p>
</div>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h3 id="並列処理-async" tabindex="-1"><a class="header-anchor" href="#並列処理-async" aria-hidden="true">#</a> 並列処理 + Async</h3>
<p>このコードは以下のように動作する。</p>
<ul>
<li>メソッドが呼ばれる</li>
<li>10 回のループが一瞬で実行される（重い処理がないため）
<ul>
<li>10 個の Queue が追加される</li>
</ul>
</li>
<li>0 番目から実行されるが、0 番目の終了を待たずに 1 番目が実行される
<ul>
<li>今回は処理の内容が軽いので基本的には実行された順に出力されるが、たまにズレたりする（並列処理なので当然）</li>
</ul>
</li>
</ul>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> dateList<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">// 並列処理のQueueを作成</span>
    <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token function">DispatchQueue</span><span class="token punctuation">(</span>label<span class="token punctuation">:</span> <span class="token string">"work.tkgstrator.dispatch_queue_serial"</span><span class="token punctuation">,</span> attributes<span class="token punctuation">:</span> <span class="token punctuation">.</span>concurrent<span class="token punctuation">)</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">List</span> <span class="token punctuation">{</span>
            <span class="token function">ForEach</span><span class="token punctuation">(</span>dateList<span class="token punctuation">,</span> id<span class="token punctuation">:</span>\<span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> date <span class="token keyword">in</span>
                <span class="token function">Text</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span>
            <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Run"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
                dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>以下の出力結果を見ればわかるのですが、違うスレッドで処理が実行されており、その順番もバラバラであることがわかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>1 -> on &lt;NSThread: 0x6000027c2100>{number = 3, name = (null)}
2 -> on &lt;NSThread: 0x6000027e4680>{number = 11, name = (null)}
4 -> on &lt;NSThread: 0x6000027e4680>{number = 11, name = (null)}
0 -> on &lt;NSThread: 0x6000027e6440>{number = 6, name = (null)}
6 -> on &lt;NSThread: 0x6000027e4680>{number = 11, name = (null)}
8 -> on &lt;NSThread: 0x6000027e6440>{number = 6, name = (null)}
3 -> on &lt;NSThread: 0x6000027c2100>{number = 3, name = (null)}
7 -> on &lt;NSThread: 0x6000027d04c0>{number = 9, name = (null)}
5 -> on &lt;NSThread: 0x6000027d81c0>{number = 5, name = (null)}
9 -> on &lt;NSThread: 0x6000027e4680>{number = 11, name = (null)}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">SwiftUI との兼ね合いについて</p>
<p>実際に実行してみればわかるのだが、リストが正しく 10 件表示されるときと 10 件表示されないときある。これはメソッドの実行間隔が速すぎることに起因していると思われる。</p>
<p>つまり、SwiftUI が@State の値の変化をチェックしてビューを再描画するのが間に合っていないということになる。これ、どうやって対応すればいいんでしょうね。</p>
</div>
<h3 id="並列処理-sync" tabindex="-1"><a class="header-anchor" href="#並列処理-sync" aria-hidden="true">#</a> 並列処理 + Sync</h3>
<p>このコードは以下のように動作する。</p>
<ul>
<li>メソッドが呼ばれる</li>
<li>10 回のループが一瞬で実行される（重い処理がないため）
<ul>
<li>10 個の Queue が追加される</li>
</ul>
</li>
<li>処理がメインスレッドで行われる
<ul>
<li>メインスレッドは一つしかないので逐次実行される</li>
</ul>
</li>
</ul>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>sync <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>出力は順番が保存され、メインスレッドで実行されていることがわかる。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
1 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
2 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
3 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
4 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
5 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
6 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
7 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
8 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
9 -> on &lt;NSThread: 0x600000188540>{number = 1, name = main}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>ただし、メインスレッドで実行しているので<code>Queue.sync</code>内に重い処理があった場合はフリーズする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 10秒間フリーズするコード</span>
<span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>sync <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token builtin">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>forTimeInterval<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="逐次処理-async" tabindex="-1"><a class="header-anchor" href="#逐次処理-async" aria-hidden="true">#</a> 逐次処理 + Async</h3>
<p>これはグローバルスレッドで処理が実行され、逐次実行なので順番が保存される。</p>
<p>また、この場合は SwiftUI で正しく検知できるのかリストの要素数が減ったりすることもない。</p>
<p>グローバルスレッドなので重い処理を挟んでもフリーズすることがない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 並列処理から逐次処理に切り替え</span>
<span class="token comment">// let queue = DispatchQueue.global(qos: .utility)</span>
<span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token function">DispatchQueue</span><span class="token punctuation">(</span>label<span class="token punctuation">:</span> <span class="token string">"work.tkgstrator.dispatch_queue_serial"</span><span class="token punctuation">)</span>

<span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="逐次処理-sync" tabindex="-1"><a class="header-anchor" href="#逐次処理-sync" aria-hidden="true">#</a> 逐次処理 + Sync</h3>
<p>これは並列処理 + Sync をしているのと全く同じ結果が得られる。</p>
<p>つまり、メインスレッドで実行され、順番も保存されるが重い処理を書くとフリーズする。メインスレッドで実行されるときは、重い処理を書くとフリーズするというのは覚えておこう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 並列処理から逐次処理に切り替え</span>
<span class="token comment">// let queue = DispatchQueue.global(qos: .utility)</span>
<span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token function">DispatchQueue</span><span class="token punctuation">(</span>label<span class="token punctuation">:</span> <span class="token string">"work.tkgstrator.dispatch_queue_serial"</span><span class="token punctuation">)</span>

<span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>sync <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>loop<span class="token delimiter variable">)</span></span> -> on <span class="token interpolation"><span class="token delimiter variable">\(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>ここまでをまとめると以下の通り。</p>
<p>SwiftUI で使う場合には<code>Serial + Async</code>の組み合わせが良いのかもしれませんね。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">非同期（Async）</th>
<th style="text-align:center">同期（Sync）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">逐次（Serial）</td>
<td style="text-align:center">グローバルスレッド<br>順番は保存される<br>正常動作</td>
<td style="text-align:center">メインスレッド<br>順番は保存される<br>フリーズする</td>
</tr>
<tr>
<td style="text-align:center">並列処理（Concurrent）</td>
<td style="text-align:center">グローバルスレッド<br>順番は保存されない<br>SwiftUI が検知できない場合がある</td>
<td style="text-align:center">メインスレッド<br>順番は保存される<br>フリーズする</td>
</tr>
</tbody>
</table>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
