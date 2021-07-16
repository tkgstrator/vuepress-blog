<template><h2 id="生体認証ロック" tabindex="-1"><a class="header-anchor" href="#生体認証ロック" aria-hidden="true">#</a> 生体認証ロック</h2>
<p>以前も記事で解説したのだが、Swift では<code>LocalAuthentication</code>をインポートするだけで簡単に生体認証の仕組みをつくることができる。</p>
<p>が、実際にはそれだけでは想定している動作が実現できないのでサンプルコードを使ってデモアプリを作成してみようと思う。</p>
<h2 id="生体認証の仕様" tabindex="-1"><a class="header-anchor" href="#生体認証の仕様" aria-hidden="true">#</a> 生体認証の仕様</h2>
<p>生体認証を利用するアプリとしては高いセキュリティが要求される銀行系のアプリなどが考えられる。</p>
<p>例えばりそな銀行のアプリで確かめてみる。すると次のような仕様であることがわかった。</p>
<ul>
<li>ログイン画面で生体認証が自動で表示される</li>
<li>画面をバックグラウンドにして復帰するとパスコード画面が表示される</li>
<li>ロックを解除すると最後にひらいていた画面が表示される</li>
</ul>
<p>また、生体認証をキャンセルした場合次のような挙動を示した</p>
<ul>
<li>生体認証をキャンセル</li>
<li>画面をバックグラウンドにしてから復帰すると再度生体認証が自動表示</li>
</ul>
<p>大事になるのは「生体認証が自動で表示」と「バックグラウンドでロックがかかる」という点だと思われる。「生体認証が自動で表示」に関しては<code>onAppear</code>で対応できそうな気がするが「バックグラウンドでロックがかかる」というのはバックグラウンドに移行したことを検知できないと実装できない。どうやってその仕組みを実装するのだろうか。</p>
<h2 id="environment-をつかう" tabindex="-1"><a class="header-anchor" href="#environment-をつかう" aria-hidden="true">#</a> Environment をつかう</h2>
<p>これも以前解説したのだが、SwiftUI にはいくつかの環境変数が自動でセットされている。あとはそれを呼び出すだけで使えるのである。</p>
<p>その中に<code>scenePhase</code>というものがあり、これは<code>active</code>、<code>inactive</code>、<code>background</code>の三つの状態のいずれかを保持している。これらを使えば上手く仕様を満たすことができそうだ。</p>
<h2 id="生体認証フラグ" tabindex="-1"><a class="header-anchor" href="#生体認証フラグ" aria-hidden="true">#</a> 生体認証フラグ</h2>
<p>このアプリの仕様を満たすためには二つの生体認証フラグが必要になる。一つはデバイスが生体認証登録されているかという<code>isBiometricsAvailable</code>で、もう一つはアプリ自体で生体認証を有効化しているかという<code>isBiometricsEnabled</code>である。</p>
<p>指紋登録などをしていなければそもそもアプリで生体認証を有効化できないし、指紋登録をしていてもアプリで生体認証を使いたくないという場合が考えられるからだ。</p>
<p>で、ここで次のようなフローチャートを考える。</p>
<table>
<thead>
<tr>
<th style="text-align:center">状態</th>
<th style="text-align:center">生体認証</th>
<th style="text-align:center">パスコード認証</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Biometrics</td>
<td style="text-align:center">OK</td>
<td style="text-align:center">OK</td>
</tr>
<tr>
<td style="text-align:center">Enter</td>
<td style="text-align:center">-</td>
<td style="text-align:center">OK</td>
</tr>
<tr>
<td style="text-align:center">Wrong</td>
<td style="text-align:center">-</td>
<td style="text-align:center">OK</td>
</tr>
</tbody>
</table>
<p><img src="/assets/images/biometricsflowchart01.png" alt=""></p>
<h3 id="isbiometricsavailable" tabindex="-1"><a class="header-anchor" href="#isbiometricsavailable" aria-hidden="true">#</a> isBiometricsAvailable</h3>
<p>生体認証が可能かどうかは<code>canEvaluatePolicy</code>で簡単に取得できる。</p>
<p>今回は計算プロパティにしているが、アプリの起動中にこれらが変わることは考えなくても良さそうなので、普通のプロパティにしておいてもいいかもしれない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// AppLocker.swift</span>
<span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">LocalAuthentication</span>

<span class="token keyword">class</span> <span class="token class-name">AppLocker</span><span class="token punctuation">:</span> <span class="token builtin">Observablebject</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> isBiometricsAvailable<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">canEvaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> error<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="isbiometricsenabled" tabindex="-1"><a class="header-anchor" href="#isbiometricsenabled" aria-hidden="true">#</a> isBiometricsEnabled</h3>
<p>次に、アプリ側で生体認証を有効化しているかどうかの状態をとってくる。これはひょっとしたらアプリ起動中に設定をころころ変えるかもしれないので常に最新の値をとってきて反映させられるように<code>@Published</code>で値をとってくるようにする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// AppLocker.swift</span>
<span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">LocalAuthentication</span>

<span class="token keyword">class</span> <span class="token class-name">AppLocker</span><span class="token punctuation">:</span> <span class="token builtin">ObservableObject</span> <span class="token punctuation">{</span>
    @<span class="token builtin">Published</span> <span class="token keyword">var</span> isBiometricsEnabled<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> isBiometricsAvailable<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">canEvaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> error<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>更に、アプリがロックされているかどうかの状態も必要なのでそれも変数に加えておく。また、生体認証をするためのメソッドも必要なので追加しておこう</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// AppLocker.swift</span>
<span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">LocalAuthentication</span>

<span class="token keyword">class</span> <span class="token class-name">AppLocker</span><span class="token punctuation">:</span> <span class="token builtin">ObservableObject</span> <span class="token punctuation">{</span>
    @<span class="token builtin">Published</span> <span class="token keyword">var</span> isAppLocked<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// アプリがロックされているか</span>

    @<span class="token builtin">Published</span> <span class="token keyword">var</span> isBiometricsEnabled<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 生体認証が有効化されているかどうか</span>

    <span class="token keyword">private</span> <span class="token keyword">var</span> isBiometricsAvailable<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span> <span class="token comment">// 生体認証が利用可能かどうか</span>
        <span class="token keyword">return</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">canEvaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> error<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">authorizeWithBiometrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        context<span class="token punctuation">.</span><span class="token function">evaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> localizedReason<span class="token punctuation">:</span> <span class="token string">"AUTHORIZED WITH BIOMETRICS"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>success<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token keyword">in</span>
            <span class="token function">print</span><span class="token punctuation">(</span>success<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="メソッドに処理を入れる" tabindex="-1"><a class="header-anchor" href="#メソッドに処理を入れる" aria-hidden="true">#</a> メソッドに処理を入れる</h3>
<p>このままだと<code>authorizeWithBiometrics()</code>で認証が成功しても何も反応がなくなってしまう。そこで、認証成功した場合には<code>isAppLocked</code>の値を<code>false</code>にする処理を追加する。</p>
<p>このとき、<code>isAppLocked</code>は<code>@Published</code>なのでメインスレッドでしか更新できないことに注意する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// AppLocker.swift</span>
<span class="token keyword">func</span> <span class="token function">authorizeWithBiometrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span><span class="token function">evaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> localizedReason<span class="token punctuation">:</span> <span class="token string">"AUTHORIZED WITH BIOMETRICS"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token punctuation">(</span>success<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token keyword">in</span>
        <span class="token comment">// メインスレッドで更新する</span>
        <span class="token builtin">DispatchQueue</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
            <span class="token keyword">if</span> success <span class="token punctuation">{</span>
                isAppLocked <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// エラーの内容を表示</span>
                <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="ここまでの概要" tabindex="-1"><a class="header-anchor" href="#ここまでの概要" aria-hidden="true">#</a> ここまでの概要</h2>
<p>ここまでをまとめると以下のようなコードが完成する。</p>
<p>一見するとこれでうまくいきそうなのだが、実はバグが存在している。</p>
<h3 id="app-swift" tabindex="-1"><a class="header-anchor" href="#app-swift" aria-hidden="true">#</a> App.swift</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// App.swift</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">LocalAuthentication</span>

@main
<span class="token keyword">struct</span> <span class="token builtin">BiometricsApp</span><span class="token punctuation">:</span> <span class="token builtin">App</span> <span class="token punctuation">{</span>
    @<span class="token builtin">StateObject</span> <span class="token keyword">var</span> appLocker <span class="token operator">=</span> <span class="token function">AppLocker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    @<span class="token function">Environment</span><span class="token punctuation">(</span>\<span class="token punctuation">.</span>scenePhase<span class="token punctuation">)</span> <span class="token keyword">var</span> scenePhase

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">Scene</span> <span class="token punctuation">{</span>
        <span class="token builtin">WindowGroup</span> <span class="token punctuation">{</span>
            <span class="token function">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">environmentObject</span><span class="token punctuation">(</span>appLocker<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> scenePhase<span class="token punctuation">)</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
                    <span class="token keyword">switch</span> value <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span>active<span class="token punctuation">:</span>
                        <span class="token comment">// アクティブになったときに生体認証を表示</span>
                        appLocker<span class="token punctuation">.</span><span class="token function">authorizeWithBiometrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span>background<span class="token punctuation">:</span>
                        appLocker<span class="token punctuation">.</span>isAppLocked <span class="token operator">=</span> <span class="token boolean">true</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span>inactive<span class="token punctuation">:</span>
                        <span class="token keyword">break</span>
                    @unknown <span class="token keyword">default</span><span class="token punctuation">:</span>
                        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"UNKNOWN"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="contentview-swift" tabindex="-1"><a class="header-anchor" href="#contentview-swift" aria-hidden="true">#</a> ContentView.swift</h3>
<p>特に面白いことはせず、<code>AppHomeView()</code>に飛ばすだけの処理をする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// ConentView.swift</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">AppHomeView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="apphomeview-swift" tabindex="-1"><a class="header-anchor" href="#apphomeview-swift" aria-hidden="true">#</a> AppHomeView.swift</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// AppHomeView.swift</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">AppHomeView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">EnvironmentObject</span> <span class="token keyword">var</span> appLocker<span class="token punctuation">:</span> <span class="token builtin">AppLocker</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">ZStack</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token operator">!</span>appLocker<span class="token punctuation">.</span>isAppLocked <span class="token punctuation">{</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"HELLO, WORLD"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">AppLockView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span>onAppear <span class="token punctuation">{</span>
            appLocker<span class="token punctuation">.</span><span class="token function">authorizeWithBiometrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="scenephase-のバグ" tabindex="-1"><a class="header-anchor" href="#scenephase-のバグ" aria-hidden="true">#</a> scenePhase のバグ</h2>
<p>scenePhase に由来するバグではないのだが、ここの判定はこのままでは意図しない動作を引き起こす。</p>
<p>というのも、この<code>scenePhase</code>の値が変化したチェックは<code>ContentView()</code>で行われているためである。つまり、生体認証画面のポップアップが表示された段階で<code>ContentView()</code>は<code>.inactive</code>になってしまい、</p>
<ul>
<li><code>ContentView()</code>が表示</li>
<li><code>.active</code>になるので生体認証画面が表示
<ul>
<li>この時点で<code>ContentView()</code>が<code>.inactive</code>になる</li>
<li>生体認証を終える</li>
</ul>
</li>
<li><code>ContentView()</code>が<code>.active</code>になる</li>
</ul>
<p>という処理が行われ、結果として何度認証を繰り返してもキャンセルしても無限に生体認証ダイアログが表示されてしまう。</p>
<p>これを回避するためには ContentView がバックグラウンドに移行した段階で何らかのフラグを設定し、生体認証を一回終えた時点でそのフラグを回収するような処理が考えられる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// App.swift</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">LocalAuthentication</span>

@main
<span class="token keyword">struct</span> <span class="token builtin">BiometricsApp</span><span class="token punctuation">:</span> <span class="token builtin">App</span> <span class="token punctuation">{</span>
    @<span class="token builtin">StateObject</span> <span class="token keyword">var</span> appLocker <span class="token operator">=</span> <span class="token function">AppLocker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    @<span class="token function">Environment</span><span class="token punctuation">(</span>\<span class="token punctuation">.</span>scenePhase<span class="token punctuation">)</span> <span class="token keyword">var</span> scenePhase

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">Scene</span> <span class="token punctuation">{</span>
        <span class="token builtin">WindowGroup</span> <span class="token punctuation">{</span>
            <span class="token function">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">environmentObject</span><span class="token punctuation">(</span>appLocker<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> scenePhase<span class="token punctuation">)</span> <span class="token punctuation">{</span> value <span class="token keyword">in</span>
                    <span class="token keyword">switch</span> value <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span>active<span class="token punctuation">:</span>
                        <span class="token keyword">if</span> appLocker<span class="token punctuation">.</span>isFirstLaunch <span class="token punctuation">{</span>
                            appLocker<span class="token punctuation">.</span>isFirstLaunch <span class="token operator">=</span> <span class="token boolean">false</span>
                            appLocker<span class="token punctuation">.</span><span class="token function">authorizeWithBiometrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span>background<span class="token punctuation">:</span>
                        appLocker<span class="token punctuation">.</span>isFirstLaunch <span class="token operator">=</span> <span class="token boolean">true</span>
                        appLocker<span class="token punctuation">.</span>isAppLocked <span class="token operator">=</span> <span class="token boolean">true</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span>inactive<span class="token punctuation">:</span>
                        <span class="token keyword">break</span>
                    @unknown <span class="token keyword">default</span><span class="token punctuation">:</span>
                        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"UNKNOWN"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// AppLocker.swift</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">LocalAuthentication</span>

<span class="token keyword">class</span> <span class="token class-name">AppLocker</span><span class="token punctuation">:</span> <span class="token builtin">ObservableObject</span> <span class="token punctuation">{</span>
    @<span class="token builtin">Published</span> <span class="token keyword">var</span> isAppLocked<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// アプリがロックされているか</span>

    @<span class="token builtin">Published</span> <span class="token keyword">var</span> isBiometricsEnabled<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 生体認証が有効化されているかどうか</span>

    @<span class="token builtin">Published</span> <span class="token keyword">var</span> isFirstLaunch<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 初回のチェックかどうかを調べる</span>

    <span class="token keyword">private</span> <span class="token keyword">var</span> isBiometricsAvailable<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span> <span class="token comment">// 生体認証が利用可能かどうか</span>
        <span class="token keyword">return</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">canEvaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> error<span class="token punctuation">:</span> <span class="token constant">nil</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">authorizeWithBiometrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> isFirstLaunch <span class="token punctuation">{</span>
            isFirstLaunch<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token function">LAContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            context<span class="token punctuation">.</span><span class="token function">evaluatePolicy</span><span class="token punctuation">(</span><span class="token punctuation">.</span>deviceOwnerAuthenticationWithBiometrics<span class="token punctuation">,</span> localizedReason<span class="token punctuation">:</span> <span class="token string">"AUTHORIZED WITH BIOMETRICS"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token punctuation">(</span>success<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token keyword">in</span>
                <span class="token builtin">DispatchQueue</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span>async <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> success <span class="token punctuation">{</span>
                        isAppLocked <span class="token operator">=</span> <span class="token boolean">false</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token function">print</span><span class="token punctuation">(</span>success<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>よって、上のようにコードを修正すれば「バックグラウンドから復帰したら生体認証表示」「画面が開いた直後に生体認証表示」の仕様を満たすことができる。</p>
</template>
