<template><h2 id="navigationview-の仕様" tabindex="-1"><a class="header-anchor" href="#navigationview-の仕様" aria-hidden="true">#</a> NavigationView の仕様</h2>
<p>今回はわかりやすくするため、左側の画面を Master、右側の画面を Detail と呼ぶことにします。</p>
<p>NavivationView の理解として最も重要なのは次の点でしょう。</p>
<ul>
<li>NavigationLink は親が NavigationView を継承していないと効かない</li>
<li>NavigationView は ContentView に適用するべきである
<ul>
<li>NavigationView 自体を入れ子にすると表示がおかしくなるのでしないこと</li>
</ul>
</li>
<li>NavigationLink の遷移先は常に Detail に表示される</li>
<li>Master を切り替えることはできない
<ul>
<li>Master 自体がフラグによって表示を変えるようにしないといけない</li>
</ul>
</li>
<li>iPad の場合
<ul>
<li>NavigationView を入れ子にすると TOP が Master となり、二つ目以降は Detail になる</li>
<li>Landscape モードではビューが分割される
<ul>
<li>理想的な動作である</li>
</ul>
</li>
<li>Portrait モードでは TOP は必ず起動時に非表示になっている
<ul>
<li>これを変えることは推奨されていないようだ</li>
<li>標準設定アプリはできているのに謎である</li>
</ul>
</li>
</ul>
</li>
<li>iPhone の場合
<ul>
<li>NavigationView を入れ子にすると TOP が Master となり、二つ目以降は無視される</li>
</ul>
</li>
</ul>
<h3 id="masterview-と-detailview" tabindex="-1"><a class="header-anchor" href="#masterview-と-detailview" aria-hidden="true">#</a> MasterView と DetailView</h3>
<p>ソースコードが肥大化したときにわかりにくくなるので、MasterView と DetailView の二つを作成して見やすくします。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">MasterView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">NavigationLink</span><span class="token punctuation">(</span>
            destination<span class="token punctuation">:</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Detail"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            label<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Navigate"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Nav"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">DetailView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Detail View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="完成させたい-ui" tabindex="-1"><a class="header-anchor" href="#完成させたい-ui" aria-hidden="true">#</a> 完成させたい UI</h3>
<p>目標としては iOS の標準の設定アプリのようなものですが、それを更に拡張したものとなります。</p>
<p>具体的には iPad と iPhone で表示方式を切り替えられるようにします。iPhone の方は理想的な動作ができているので、iPad でちゃんと動作させられるようになればよいわけです。</p>
<ul>
<li>iPad で SplitView を実現させる</li>
<li>Portrait と Landscape で同じ UI にする</li>
<li>起動直に Master が表示されている
<ul>
<li>ボタンで Master は非表示にできる</li>
</ul>
</li>
<li>起動直後に Detail が表示されている
<ul>
<li>Master の表示と非表示で Detail の画面サイズは動的に変化する</li>
</ul>
</li>
</ul>
<h2 id="navigationview-の理解を深める" tabindex="-1"><a class="header-anchor" href="#navigationview-の理解を深める" aria-hidden="true">#</a> NavigationView の理解を深める</h2>
<h3 id="masterview-だけ-navigationview-に入れる" tabindex="-1"><a class="header-anchor" href="#masterview-だけ-navigationview-に入れる" aria-hidden="true">#</a> MasterView だけ NavigationView に入れる</h3>
<p>でははじめに NavigationView に MasterView を入れてみます</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token function">MasterView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>これは Landscape モードでは問題ありませんが、Portrait モードのときに次の問題が発生します</p>
<ul>
<li>起動直後に MasterView が表示されない</li>
<li>起動直後に DetailView が表示されない</li>
<li>MasterView の表示/非表示で DetailView のサイズが変わらない
<ul>
<li>常にフルスクリーンのような状態になっている</li>
</ul>
</li>
</ul>
<h3 id="master-と-detail-のどちらも-navigationview-に入れる" tabindex="-1"><a class="header-anchor" href="#master-と-detail-のどちらも-navigationview-に入れる" aria-hidden="true">#</a> Master と Detail のどちらも NavigationView に入れる</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token function">MasterView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>NavigationLink を入れ子にすると TOP である MasterView が Master として表示され、DetailView が Detail として起動時に表示されるようになりました。</p>
<p>しかし、継続して次の問題が残ります。</p>
<ul>
<li>起動直後に MasterView が表示されない</li>
<li>MasterView の表示/非表示で DetailView のサイズが変わらない
<ul>
<li>常にフルスクリーンのような状態になっている</li>
</ul>
</li>
</ul>
<h3 id="naviationviewstyle-を設定する" tabindex="-1"><a class="header-anchor" href="#naviationviewstyle-を設定する" aria-hidden="true">#</a> NaviationViewStyle を設定する</h3>
<p>SwiftUI において NavigationView には三つのスタイルが用意されています</p>
<ul>
<li>DefaultNavigationViewStyle</li>
<li>DoubleColumnNavigationViewStyle</li>
<li>StackNavigationViewStyle</li>
</ul>
<p>このうち何もしなければ DefaultNavigationViewStyle が適用されます。StackNavigationViewStyle は iPad でも常に iPhone と同じ UI になります。</p>
<p>DoubleColumnNavigationViewStyle に関しては<a href="https://developer.apple.com/documentation/swiftui/navigationviewstyle" target="_blank" rel="noopener noreferrer">Apple 公式のドキュメント<OutboundLink/></a>において<code>A navigation view style represented by a primary view stack that navigates to a detail view.</code>という説明があります。</p>
<p>これだけではよくわからないので実際に利用してみます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token function">MasterView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">navigationViewStyle</span><span class="token punctuation">(</span><span class="token function">DoubleColumnNavigationViewStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>が、結果として何も変わりませんでした。iPhone でも iPad でも変わらなかったのでなんの効果があるのかわかりませんでした。</p>
<h3 id="navigationbarhidden" tabindex="-1"><a class="header-anchor" href="#navigationbarhidden" aria-hidden="true">#</a> navigationBarHidden</h3>
<p>NavigationBar を非表示にできる<code>.navigationBarHidden()</code>という仕組みがあるのでそれを利用してみます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>.navigationBarHidden()</code>を使うと Navigation の機能は残したまま、各種表示を非表示にできます。</p>
<h3 id="navigationtitle-の適用方法" tabindex="-1"><a class="header-anchor" href="#navigationtitle-の適用方法" aria-hidden="true">#</a> NavigationTitle の適用方法</h3>
<p>iOS14 からは<code>.navigationTitle()</code>が使えます。重要な点としてはこれは NavigationView 内の View に対して使わないと効かないということです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>なので例えば上のようなコードは全く効果がありません。これは<code>.navigationTitle()</code>が NavigationView 自体にかかってしまっているからです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="一つ前の画面に戻る" tabindex="-1"><a class="header-anchor" href="#一つ前の画面に戻る" aria-hidden="true">#</a> 一つ前の画面に戻る</h3>
<p>ボタンを押すと何らかの処理を実行し、その進行状況を表示するビューに遷移するとします。</p>
<p>処理が終わったあと、もとの画面に戻りたいときにどうすればよいでしょうか。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token function">MasterView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">ProgressView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">MasterView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Back to MasterView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Progress View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">MasterView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">NavigationLink</span><span class="token punctuation">(</span>
            destination<span class="token punctuation">:</span> <span class="token function">ProgressView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            label<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Progress Start"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Master"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">DetailView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Initial Detail View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>例えば上のようなコードを書いたとします。これは NavigationLink を動作させるたびにどんどんネストが深くなっていくため想定通りの動作をしません。</p>
<p>じゃあどうすればいいのかという話になりますが、presentationMode という標準 Environment を使うと驚くほどに実装できます。変更するのも戻る機能を実装したい View だけなので楽です。</p>
<p>この presentationMode は<code>isPresented</code>という「NavigationLink から遷移してきたか」という情報を持っており、これを使って動作を切り替えることができます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ProgressView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token function">Environment</span><span class="token punctuation">(</span>\<span class="token punctuation">.</span>presentationMode<span class="token punctuation">)</span> <span class="token keyword">var</span> present

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span>
            present<span class="token punctuation">.</span>wrappedValue<span class="token punctuation">.</span><span class="token function">dismiss</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Back to MasterView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Progress View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>注意点としては<code>wrappedValue.dismiss()</code>は画面の表示を切り替える動作のためメインスレッドで実行する必要があります。<code>DispatchQueue.global</code>を使う際は<code>DispatchQueue.main.async</code>を使うなどして必ずメインスレッドで実行するようにコーディングしましょう。</p>
<h2 id="navigationlink-の仕様" tabindex="-1"><a class="header-anchor" href="#navigationlink-の仕様" aria-hidden="true">#</a> NavigationLink の仕様</h2>
<h3 id="タップして遷移したい場合" tabindex="-1"><a class="header-anchor" href="#タップして遷移したい場合" aria-hidden="true">#</a> タップして遷移したい場合</h3>
<p>ボタンとしてタップしたら画面が遷移するような仕様を満たす使い方である。</p>
<p>たとえば、ボタンを押すと DetailView に遷移したい場合は以下のようなコードで実装できる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ProgressView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Go to DetailView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Progress View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="コードから遷移したい場合" tabindex="-1"><a class="header-anchor" href="#コードから遷移したい場合" aria-hidden="true">#</a> コードから遷移したい場合</h3>
<p>ではボタンを押さず、プログラムが何らかの処理をした結果で自動的に遷移したい場合はどうするか。</p>
<p>それには<code>isActive</code>というプロパティがあるのでこれが利用できる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ProgressView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> isActive<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

        <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> isActive<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Go to DetailView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> isActive<span class="token punctuation">:</span> $isActive<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Go to DetailView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Progress View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>あらかじめ@Stete で変更をチェックするための変数を確保しておき、それを NavigationLink の isActive プロパティに渡すのである。この場合だと、NavigationLink を直接押しても遷移するし、Button をタップしても isActive の値がフリップして初期状態の false から true に変わり NavigationLink が動作する。</p>
<p>これの問題点とすれば遷移するための NavigationLink を（半分無意味に）書いておかなければいけない点だろう。「コードでもタップでも遷移したい」場合ならこれでよいが、コードでしか遷移したくない場合にタップしたら遷移できてしまう NavigationLink を表示しっぱなしにしておくのは良くない</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ProgressView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> isActive<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

        <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> isActive<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Go to DetailView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> isActive<span class="token punctuation">:</span> $isActive<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Go to DetailView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">hidden</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Progress View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>のように<code>hidden()</code>属性をつければ非表示にはなるものの、これは見た目が消えているだけなのでこの View のスペースが消費されていてレイアウトがズレてしまう。</p>
<p>ズレないようにするためには NavigationLink の View として<code>EmptyView()</code>を指定すればよい。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ProgressView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> isActive<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> isActive<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Go to DetailView"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> isActive<span class="token punctuation">:</span> $isActive<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
                <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Progress View"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>これで基本的な場合についてはうまく動作させられるが、<code>List</code>ではたとえ<code>EmptyView()</code>であっても検知されて空っぽのカラムが作成されるという問題がある。<code>List</code>の場合は ZStack で対応するのが良いだろう。</p>
<h2 id="結局どうすべきなのか" tabindex="-1"><a class="header-anchor" href="#結局どうすべきなのか" aria-hidden="true">#</a> 結局どうすべきなのか</h2>
<p>ここまでの検証から以下のことがわかっている。</p>
<ul>
<li>iPad の Portrait と Landscape の見た目をおなじにする仕組みは存在しない
<ul>
<li>Apple の方針は「NavigationView は Portrait 時には非表示にできるべき」ということらしい</li>
<li>しかし、実用上これがものすごく困るということはないように思える</li>
</ul>
</li>
<li>Master は基本的に切り替えできない
<ul>
<li>Master 内で Switch 文などで表示したい内容を切り替えないといけない</li>
<li>Apple の方針として Master の内容は常に固定しておいてほしいのかもしれない</li>
</ul>
</li>
<li>NavigationView を入れ子構造にすることはできない
<ul>
<li>ContentView または SwiftApp に対して NavigationView を適用すべき</li>
<li>SwiftApp.swift に対して適用すると EnvironmentObject の問題が発生したりする</li>
<li>ContentView が無難なところかもしれない</li>
</ul>
</li>
<li>NavigationView に二つ以上の View を入れることができる
<ul>
<li>iPad の場合は一つ目が Master、二つ目が Detail の（初期表示）になる</li>
<li>iPhone または StackNavigationViewStyle のときは二つ目以降は無視される</li>
<li>無視されるという仕様上、iPad 向けで MasterView を構成するだけで良い</li>
</ul>
</li>
<li>NavigationLink を使うと常に Detail が更新される
<ul>
<li>一つ前の画面に戻りたいときは presentationMode を使うべきである</li>
</ul>
</li>
</ul>
<h3 id="どういう仕様にするか" tabindex="-1"><a class="header-anchor" href="#どういう仕様にするか" aria-hidden="true">#</a> どういう仕様にするか</h3>
<p>登録制のアプリの場合、起動直後に表示したいのはアカウント作成やログインを促す画面である。</p>
<p>そして、このときには SplitView 的な機能はオフであってほしい。そうでないとログインする前から様々な機能にアクセスできることになってしまう。</p>
<ul>
<li>ログイン前は SplitView はオフ
<ul>
<li>StackNavigationViewStyle を使えばできる</li>
<li>ログイン状態によって NavigationViewStyle を切り替える</li>
</ul>
</li>
<li>NavigationViewStyle
<ul>
<li>ログイン前は DetailView のみ表示</li>
<li>ログイン後は Master を MasterView に表示</li>
</ul>
</li>
</ul>
<p>引数によって NavigationViewStyle を直接変えることが難しかったので ViewModifier を使って実装することにした。</p>
<p>これを使えば View 簡単に NavigationViewStyle を変更することができる。そのままでも使いやすいのだがいちいち<code>.modifier()</code>を宣言するのが面倒だったので extension を使って更に便利にした。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">NavigationModifier</span><span class="token punctuation">:</span> <span class="token builtin">ViewModifier</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> style<span class="token punctuation">:</span> <span class="token builtin">Bool</span>

    <span class="token keyword">func</span> <span class="token function">body</span><span class="token punctuation">(</span>content<span class="token punctuation">:</span> <span class="token builtin">Content</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> style <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token boolean">true</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token function">AnyView</span><span class="token punctuation">(</span>
                content
                <span class="token punctuation">.</span><span class="token function">navigationViewStyle</span><span class="token punctuation">(</span><span class="token function">StackNavigationViewStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token boolean">false</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token function">AnyView</span><span class="token punctuation">(</span>
                content
                <span class="token punctuation">.</span><span class="token function">navigationViewStyle</span><span class="token punctuation">(</span><span class="token function">DoubleColumnNavigationViewStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">navigationStyle</span><span class="token punctuation">(</span>style<span class="token punctuation">:</span> <span class="token builtin">Bool</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">modifier</span><span class="token punctuation">(</span><span class="token function">NavigationModifier</span><span class="token punctuation">(</span>style<span class="token punctuation">:</span> style<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>これを使うことで<code>navigationStyle(style: Bool)</code>で NavigationViewStyle を切り替えられる。</p>
<p>ただ、このままでは StackNavigationViewStyle のときに MasterView が表示されてしまう。</p>
<p>StackNavigationViewStyle の仕様を変えるのは面倒なので、フラグの状態によって Master が MasterView を表示するか DetailView を表示するかを切り替えるのが得策かと思われる。</p>
<p>しかし、そうするなら最初からそうすればいいだけで、ViewModifier はつくらなくて良かったのではないかという気もしてくる。</p>
<h3 id="masterveiw" tabindex="-1"><a class="header-anchor" href="#masterveiw" aria-hidden="true">#</a> MasterVeiw</h3>
<p>あまり想定はしていなかったのだが<code>presentationMode</code>で View が Master かどうかをチェックできるようだ。StackNavigationViewStyle の場合は NavigationView の一つ目の View の<code>presentationMode</code>が false になるためそこにログインのために必要な View を表示するようにすれば良い。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">MasterView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token function">Environment</span><span class="token punctuation">(</span>\<span class="token punctuation">.</span>presentationMode<span class="token punctuation">)</span> <span class="token keyword">var</span> present

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> present<span class="token punctuation">.</span>wrappedValue<span class="token punctuation">.</span>isPresented <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token boolean">true</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token function">AnyView</span><span class="token punctuation">(</span>
                <span class="token function">NavigationLink</span><span class="token punctuation">(</span>
                    destination<span class="token punctuation">:</span> <span class="token function">ProgressView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    label<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Progress Start"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Master"</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token boolean">false</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token function">AnyView</span><span class="token punctuation">(</span><span class="token function">LoginView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token builtin">LoginView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Login View"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Login"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>この View 切り替えの仕組みと先程の ViewModifier を使えば仕様を満たすことができそうだ。</p>
<h2 id="tabview-との組み合わせ" tabindex="-1"><a class="header-anchor" href="#tabview-との組み合わせ" aria-hidden="true">#</a> TabView との組み合わせ</h2>
<p>さて、List にデータが多い場合目的の値を調べるのにずっと下の方までスクロールしなければならないような状況が考えられる。</p>
<p>10 や 20 なら大した手間でないから気にならないだろうが、50 や 100 となってくるとめんどくさく感じられるだろう。SwiftUI には iOS14 からリストの中のリストの機能である SidebarListStyle()というものが使える。</p>
<p>タブからフィルタリングするのも良いが、まずはこの新機能を試してみたい。</p>
<h3 id="sidebarliststyle" tabindex="-1"><a class="header-anchor" href="#sidebarliststyle" aria-hidden="true">#</a> SidebarListStyle</h3>
<p>listStyle としてこれを設定すると、Sidebar として使えるようになる。具体的にはリストをセクションごとに区切って閉じたり開いたりすることができるようになる。ただし、これには問題点があって、初期化の際にすべてのカラムが開けられた状態で表示されてしまう。</p>
<p>つまり、下の方まで見に行こうとしたら上から順番にリストを閉じていかなければならず、余計に手間がかかってしまう。今後のアップデートで改善されるかもしれないが、すぐに使えるような便利な機能ではなさそうだった。</p>
<h3 id="navigationview-で-sidebar-を実装する" tabindex="-1"><a class="header-anchor" href="#navigationview-で-sidebar-を実装する" aria-hidden="true">#</a> NavigationView で Sidebar を実装する</h3>
<p>NavigationView は iPad であれば三つまで入れることができるのだが、三つ目を入れると一つ目の View を Landscape でも固定することができなくなってしまう。</p>
<p>つまり Apple 公式サイトで紹介されている<a href="https://developer.apple.com/design/human-interface-guidelines/ios/views/split-views/" target="_blank" rel="noopener noreferrer">このアプリ<OutboundLink/></a>のようなレイアウトをつくることができない。常に Master を表示することができるオプションがあればいいのだが、少し調べた感じでは見つからなかった。</p>
<h3 id="tabbar-navigationview" tabindex="-1"><a class="header-anchor" href="#tabbar-navigationview" aria-hidden="true">#</a> Tabbar + NavigationView</h3>
<p>Apple ではあまり推奨されていないような書き方がされていたが、一応使える。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> selection <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token builtin">List</span> <span class="token punctuation">{</span>
                <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"EMPTY"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
                <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"EMPTY"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Menu"</span><span class="token punctuation">)</span>
            <span class="token function">TabView</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"flame"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"bolt"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span>tabItem <span class="token punctuation">{</span> <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"drop"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>リストと組み合わせればこういうのも書ける。ただし、この場合だと Detail に TabView が指定されているので NavigationLink を踏むなどして別画面に遷移すると Detail が切り替わるため TabView が消えてしまうことに注意。</p>
<p>NavigationView の方が上位（TabView はあくまでも Detail に対してのみ有効）なので、メニューを表示するとタブの幅は自動的に狭くなる。</p>
<h3 id="pagetabviewstyle" tabindex="-1"><a class="header-anchor" href="#pagetabviewstyle" aria-hidden="true">#</a> PageTabViewStyle</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
