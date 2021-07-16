<template><h2 id="スリープ処理は難しい" tabindex="-1"><a class="header-anchor" href="#スリープ処理は難しい" aria-hidden="true">#</a> スリープ処理は難しい</h2>
<p>アプリを開発しているうえで必要になってくるのが、なにか重い処理をしたときにそれが外部端末あるいはサーバに負荷がかかることを防ぐために短期間での同時アクセスをしないようにするという仕組みである。</p>
<p>アプリ自体がアプリ自体に重い処理をさせるのであればどこにも迷惑をかけないのでいいのだが、外部サーバに大量にリクエストを投げていては困るというわけである。</p>
<p>なので例えばサーバに何かを問い合わせる処理 A は 5 秒おきにしか実行しないというような場合を考えよう。つまり、A を行ってから 5 秒間は何もしないという動作が欲しいのである。</p>
<p>この仕様を満たすアプリを設計するためのコードの書き方について解説する。</p>
<h2 id="スレッドを理解する" tabindex="-1"><a class="header-anchor" href="#スレッドを理解する" aria-hidden="true">#</a> スレッドを理解する</h2>
<p>Swift では<code>main</code>スレッドと<code>global</code>スレッドの二つが存在する。</p>
<p><code>main</code>スレッドでは<code>Main Queue</code>のみが実行され、<code>global</code>スレッドでは<code>Global Queue</code>だけが実行される。どちらのスレッドに処理（<code>Queue</code>）を追加するかは基本的にシステムが自動的に行なってくれるのだが<code>DispatchQueue</code>を指定することで任意のスレッドに処理を渡すことができる。</p>
<p><code>Global Queue</code>には実行優先度があり、高い方から順に<code>high</code>、<code>default</code>、<code>low</code>、<code>background</code>となっている。</p>
<p>ただし、これらの実行優先度を直接指定することはなく、普通は Enum を使って指定する
:w</p>
<h3 id="userinteractive" tabindex="-1"><a class="header-anchor" href="#userinteractive" aria-hidden="true">#</a> userInteractive</h3>
<p>UI の更新など、即座にタスクが実行されてほしい場合に利用する。</p>
<h3 id="userinitiated" tabindex="-1"><a class="header-anchor" href="#userinitiated" aria-hidden="true">#</a> userInitiated</h3>
<p>ボタンのタップなどで非同期に処理をする場合に利用する。優先度<code>high</code>が割り当てられる。</p>
<h3 id="default" tabindex="-1"><a class="header-anchor" href="#default" aria-hidden="true">#</a> default</h3>
<p>デフォルトの優先度。</p>
<h3 id="utility" tabindex="-1"><a class="header-anchor" href="#utility" aria-hidden="true">#</a> utility</h3>
<p>プログレスバーや、計算処理、ダウンロード処理などで使う。</p>
<h3 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> background</h3>
<p>すぐには利用しないデータのプリフェッチなどで使う。</p>
<h3 id="unspecified" tabindex="-1"><a class="header-anchor" href="#unspecified" aria-hidden="true">#</a> unspecified</h3>
<p>特筆すべき優先度がないことを示す。システム側で自動的に優先度が割り当てられる。</p>
<h2 id="さまざまなスリープ処理" tabindex="-1"><a class="header-anchor" href="#さまざまなスリープ処理" aria-hidden="true">#</a> さまざまなスリープ処理</h2>
<p>Swift にはさまざまなスリープ処理があるのだが、まずは単にスリープ処理を入れることだけを考えてみる。</p>
<p>これは自分も含め、初学者がよく引っかかってしまうトラップになっているので備忘録として残しておきたい。</p>
<p>今回はテストアプリとして、ボタンを押すと 1 秒おきに時刻を取得し、それをリストとしてリアルタイムで反映させるものを考えよう。</p>
<p>プログラムとしてはひどく基本的なものなのでコード自体の詳しい解説は割愛する。</p>
<h3 id="sleep-を使う" tabindex="-1"><a class="header-anchor" href="#sleep-を使う" aria-hidden="true">#</a> sleep を使う</h3>
<p>Swift には標準で<code>sleep</code>コマンドがあるのでそれを利用する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> dateList<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
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
        <span class="token keyword">for</span> <span class="token number">_</span> <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
            <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>ところがこのコードは想定通りの動作をしない。というのも<code>runDispatchQueue</code>がメインスレッドで実行されてしまうからだ。</p>
<p>つまり、<code>sleep(1)</code>はメインスレッドを 1 秒間停止するという意味になり、それを 10 回繰り返すのでトータル 10 秒間メインスレッドが停止してしまう。</p>
<p>メインスレッドが停止するということは画面の再描画がされないのでフリーズしたような状態になってしまうことを意味する。更に「処理 -&gt;1 秒停止」なので処理中はメインスレッドが動いているため画面の再描画がされそうな気もするのだが、実際にはされないことにも注意しよう。</p>
<table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">main</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">フリーズ</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">されない</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しい</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">正しい</td>
</tr>
</tbody>
</table>
<h3 id="thread-sleep-を使う" tabindex="-1"><a class="header-anchor" href="#thread-sleep-を使う" aria-hidden="true">#</a> Thread.sleep を使う</h3>
<p>では<code>sleep</code>ではなく<code>Thread.sleep</code>を使ってみてはどうかということになるが、これも結局<code>rundDispatchQueue()</code>がメインスレッドで実行されているのでメインスレッドが止まってしまう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token number">_</span> <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
        <span class="token builtin">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>forTimeInterval<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">main</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">フリーズ</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">されない</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しい</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">正しい</td>
</tr>
</tbody>
</table>
<h2 id="serial-queue-で実行してみよう" tabindex="-1"><a class="header-anchor" href="#serial-queue-で実行してみよう" aria-hidden="true">#</a> Serial Queue で実行してみよう</h2>
<p>では次に<code>DispatchQueue.global</code>を使い、処理を<code>Global Queue</code>として渡すことにする。</p>
<p><code>DispatchQueue.global</code>には async（非同期）と async（同期）の二つがあり、更に並列処理か逐次処理がある。つまり、全部で四通りの実行の仕方があることになる。</p>
<p>ただし、今回は負荷をかけないためのコーディングについて考えるので並列処理（同時に複数実行）は考えず、逐次処理（同時に一つだけ実行）を考える。</p>
<div class="custom-container tip"><p class="custom-container-title">Sleep について</p>
<p><code>DispatchQueue.global</code>内で<code>sleep</code>または<code>Thread.sleep</code>を使ってみたのですが、どちらでも動作に違いはありませんでした。</p>
</div>
<h3 id="serial-sync" tabindex="-1"><a class="header-anchor" href="#serial-sync" aria-hidden="true">#</a> Serial + Sync</h3>
<p><code>sync</code>を指定すると<code>DispatchQueue</code>のクロージャが全部終了してから呼び出し元に制御を返します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> dateList<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">// 逐次処理</span>
    <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token function">DispatchQueue</span><span class="token punctuation">(</span>label<span class="token punctuation">:</span> <span class="token string">"work.tkgstrator.dispatch_queue_serial"</span><span class="token punctuation">)</span>

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
            queue<span class="token punctuation">.</span>sync <span class="token punctuation">{</span>
                dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span>loop<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> \<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
                <span class="token builtin">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>forTimeInterval<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>よってこれは以下のように動作します。</p>
<ul>
<li>メインスレッドが<code>runDispatchQueue</code>を実行</li>
<li>グローバルスレッドがループを実行
<ul>
<li>その間メインスレッドはグローバルスレッドが完了するのを待つ</li>
<li>待っている間は当然<code>sleep</code>しているとの同じ状態</li>
</ul>
</li>
<li>グローバルスレッドが制御を返す</li>
<li><code>dateList</code>が変化しているので画面の再描画が行われる</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">ナゼ？</p>
<p><code>DispatchQueue</code>ではグローバルスレッドを指定しているはずなのだが、何故かメインスレッドで実行される。</p>
<p>これに限らず、<code>Sync</code>を使うとメインスレッドで実行されてしまう。そういう宿命なのだろうか。</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">main</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">フリーズ</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">されない</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しい</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">正しい</td>
</tr>
</tbody>
</table>
<p>しかも実行してみると<code>Global Queue</code>として実行しているはずなのに何故かメインスレッドで実行されています、謎です。</p>
<h3 id="serial-async" tabindex="-1"><a class="header-anchor" href="#serial-async" aria-hidden="true">#</a> Serial + Async</h3>
<p>次に<code>Async</code>を使って実行してみます。</p>
<p>これはメインスレッドを止めずに裏で実行するような感じですので期待通りの結果が得られます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span>loop<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> \<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
            <span class="token builtin">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>forTimeInterval<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>つまり、ちゃんと 1 秒毎にデータが 1 つずつ増えていき、その順番も内容も間違っていないということです。</p>
<table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">global</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">正常動作</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">される</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しい</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">正しい</td>
</tr>
</tbody>
</table>
<h2 id="別のスレッドを動かす" tabindex="-1"><a class="header-anchor" href="#別のスレッドを動かす" aria-hidden="true">#</a> 別のスレッドを動かす</h2>
<h3 id="sync-main-sync" tabindex="-1"><a class="header-anchor" href="#sync-main-sync" aria-hidden="true">#</a> Sync + Main.Sync</h3>
<p><code>Sync</code>内で<code>Main.Async</code>を動かすとどうなるのでしょうか。</p>
<p>これをすると<code>dateList.append()</code>を行うのと<code>sleep</code>をするスレッドが同じであるにも関わらず、先にすぐに処理が終わる<code>dateList.append()</code>を実行した後に 10 秒間のスリープ処理が入ります。</p>
<p>つまり、ボタンを押した瞬間にフリーズして全く同じデータ（ボタンを押した時刻）が 10 秒後に描画されます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span>loop<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> \<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span>loop<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> \<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
            <span class="token builtin">DispatchQueue</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
                <span class="token builtin">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>forTimeInterval<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">main</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">フリーズ</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">されない</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しくない</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">不明</td>
</tr>
</tbody>
</table>
<h3 id="async-main-async" tabindex="-1"><a class="header-anchor" href="#async-main-async" aria-hidden="true">#</a> Async + Main.Async</h3>
<p>次に<code>Async</code>内でメインスレッドを動かしてみます。</p>
<p>すると、<code>dateList.append()</code>と<code>sleep</code>が別スレッドで実行されるため、ボタンを押して 1 秒後に画面が一気に再描画されます。つまり、データは全部同一の時刻が表示されるため、中身は正しくありません。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span>loop<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> \<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
            <span class="token function">print</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span>loop<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> \<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>isMainThread<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
            <span class="token builtin">DispatchQueue</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
                <span class="token builtin">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>forTimeInterval<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">global</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">1 秒フリーズ</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">1 秒後される</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しくない</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">不明</td>
</tr>
</tbody>
</table>
<h2 id="asyncafter-を使う" tabindex="-1"><a class="header-anchor" href="#asyncafter-を使う" aria-hidden="true">#</a> AsyncAfter を使う</h2>
<p>メインスレッドには指定時間後に処理を実行する<code>DispatchQueue.main.asyncAfter</code>という仕様が存在します。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">private</span> <span class="token keyword">func</span> <span class="token function">runDispatchQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dateList<span class="token punctuation">.</span><span class="token function">removeAll</span><span class="token punctuation">(</span>keepingCapacity<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> loop <span class="token keyword">in</span> <span class="token number">0</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">{</span>
        <span class="token builtin">DispatchQueue</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span><span class="token function">asyncAfter</span><span class="token punctuation">(</span>deadline<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">TimeInterval</span><span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            dateList<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>"\<span class="token punctuation">(</span><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>description<span class="token punctuation">)</span> on \<span class="token punctuation">(</span><span class="token builtin">Thread</span><span class="token punctuation">.</span>current<span class="token punctuation">)</span>"<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>このとき<code>.now() + 定数</code>という書き方をしてしまうと定数秒後に 10 回のループが同時に実行されてしまうので、現在時刻である<code>.now()</code>から少しずつズレて実行できるように<code>deadline</code>の値は変数にすべきです。</p>
<p>こうすれば想定通りの仕様を満たします。<code>DispatchQueue.global.async</code>を使ったときと違うのはメインスレッドで実行されるという点でしょう。</p>
<div class="custom-container danger"><p class="custom-container-title">処理の重さに注意</p>
<p>ただし、注意しなければいけないのは時間がかかる処理に対してはこの手法は使えないということです。何故なら、処理の予約がボタンを押した瞬間に<code>Main Queue</code>として保存されているためです。</p>
<p>例えば、5 秒かかるような処理に対してこのコードを書くと、処理が終わっていないにも関わらず次の Queue が実行されてしまいます。<code>DispatchQueue.global.async</code>の場合は処理が終わってから +1 秒後というコードのため、このような問題は発生しません。</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">詳細</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">実行スレッド</td>
<td style="text-align:center">main</td>
</tr>
<tr>
<td style="text-align:center">アプリ</td>
<td style="text-align:center">正常動作</td>
</tr>
<tr>
<td style="text-align:center">再描画</td>
<td style="text-align:center">される</td>
</tr>
<tr>
<td style="text-align:center">データ</td>
<td style="text-align:center">正しい</td>
</tr>
<tr>
<td style="text-align:center">データ並び</td>
<td style="text-align:center">正しい</td>
</tr>
</tbody>
</table>
<h3 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h3>
<p>スリープ処理をしたいのであれば<code>DispatchQueue.global.async</code>を使おう。</p>
</template>
