<template><h2 id="completion-の必要性" tabindex="-1"><a class="header-anchor" href="#completion-の必要性" aria-hidden="true">#</a> Completion の必要性</h2>
<p>正直な話を言うと、SwiftUI で Completion が使えなくてもさほど困らない。困らないのだが、あった方が嬉しいのである。</p>
<p>例えば、イカのような仕様を満たすビューを書きたいとする。</p>
<ul>
<li>NavigationLink を踏むとパスコード入力画面を表示</li>
<li>パスコードが合っていれば別のビューに遷移</li>
<li>間違っていればそのままの画面を表示</li>
</ul>
<p>要するにパスコードチェックを目的のビューとの間にはさもうというわけだ。</p>
<p>これは以下のようなコードを書けば実装することができる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>@<span class="token builtin">State</span> <span class="token keyword">var</span> isAuthorized<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token comment">// 中略</span>

<span class="token builtin">ZStack</span> <span class="token punctuation">{</span>
    <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">DestinationView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> isActive<span class="token punctuation">:</span> $isAuthorized<span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">PasscodeLock</span><span class="token punctuation">(</span>$isAuthorized<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>パスコード認証が通ったかどうかの情報を State で保持しておき、その値を PasscodeLock 内で変化させる。通れば<code>isAuthorized</code>が<code>true</code>になり、<code>true</code>になれば NavigationLink が動作して別のビューに遷移する。</p>
<p>ただ、これをやると<code>isAuthorized</code>という変数をビューに渡さなければいけないのがめんどうだし、何より ZStack を使って実装するのが如何にもゴミコードという感じがする。</p>
<p><code>PasscodeLock</code>はパスコードが通ったかどうかだけをチェックしてほしいのである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>@<span class="token builtin">State</span> <span class="token keyword">var</span> isPresented<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> isPresented<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"AUTHORIZE"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">DestinationView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">passcodeLock</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $isPresented<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">PasscodeLockView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> completion <span class="token keyword">in</span>
            <span class="token keyword">switch</span> completion <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token punctuation">.</span>finished<span class="token punctuation">:</span>
                    <span class="token keyword">break</span>
                <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span>
                    <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>例えばこのような記述ができるとありがたい。パスコードが通ったどうかを completion で返し、その値によって親ビュー側で分岐処理を書きたい。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code>@<span class="token builtin">State</span> <span class="token keyword">var</span> isPresented<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token builtin">ZStack</span> <span class="token punctuation">{</span>
    <span class="token function">NavigationLink</span><span class="token punctuation">(</span>destination<span class="token punctuation">:</span> <span class="token function">DestinationView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> isActive<span class="token punctuation">:</span> $isPresented<span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">EmptyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">PasscodeLockView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> completion <span class="token keyword">in</span>
        <span class="token keyword">switch</span> completion <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token punctuation">.</span>finished<span class="token punctuation">:</span>
                isPresented<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>こういう書き方もできる。が、これは結局 ZStack を使っているのでゴミコード具合はあまり変わっていない気もする。</p>
<p>まあ実際にどうやって使うかはさておき、Completion を返すようなビューは書けるのかどうかが気になるわけである。似たような仕組みを持つものに<a href="https://github.com/stleamist/BetterSafariView" target="_blank" rel="noopener noreferrer">BetterSafariView<OutboundLink/></a>があり、これの書き方はかなり参考になる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token punctuation">.</span><span class="token function">webAuthenticationSession</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $startingWebAuthenticationSession<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">WebAuthenticationSession</span><span class="token punctuation">(</span>
        url<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://github.com/login/oauth/authorize"</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span>
        callbackURLScheme<span class="token punctuation">:</span> <span class="token string">"github"</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span> callbackURL<span class="token punctuation">,</span> error <span class="token keyword">in</span>
        <span class="token function">print</span><span class="token punctuation">(</span>callbackURL<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">prefersEphemeralWebBrowserSession</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>これは要するに<code>isPresented</code>の値が true であれば<code>WebAuthenticationSession()</code>が呼び出され、それが閉じるときに callBakcURL と error が返ってくるという仕組みになっている。</p>
<p>これはまさに求めていた仕様そのものである。</p>
<p>この部分を実装する<a href="https://github.com/stleamist/BetterSafariView/blob/main/Sources/BetterSafariView/WebAuthenticationSession/WebAuthenticationSession.swift" target="_blank" rel="noopener noreferrer">ソースコード<OutboundLink/></a>を読んでみたのだが、正直言ってちんぷんかんぷんだった。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>
    url<span class="token punctuation">:</span> <span class="token constant">URL</span><span class="token punctuation">,</span>
    callbackURLScheme<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token operator">?</span><span class="token punctuation">,</span>
    completionHandler<span class="token punctuation">:</span> @escaping <span class="token punctuation">(</span><span class="token number">_</span> callbackURL<span class="token punctuation">:</span> <span class="token constant">URL</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">_</span> error<span class="token punctuation">:</span> <span class="token builtin">Error</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">self</span><span class="token punctuation">.</span>url <span class="token operator">=</span> url
    <span class="token keyword">self</span><span class="token punctuation">.</span>callbackURLScheme <span class="token operator">=</span> callbackURLScheme
    <span class="token keyword">self</span><span class="token punctuation">.</span>completionHandler <span class="token operator">=</span> completionHandler
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>重要となるのはここで、イニシャライザで completionHandler を指定しているのがわかる。で、ここまではわかるのだ。</p>
<p><code>self.completionHandler</code>に<code>completionHandler</code>をくっつけているのだが、<code>self.completionHandler</code>というのがよくわからないのである。</p>
<p>ソースコードを見るとこう書いてある。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">typealias</span> <span class="token builtin">CompletionHandler</span> <span class="token operator">=</span> <span class="token builtin">ASWebAuthenticationSession</span><span class="token punctuation">.</span><span class="token builtin">CompletionHandler</span> <span class="token comment">// &lt;- CompletionHandler</span>
<span class="token comment">/// A completion handler for the web authentication session.</span>
<span class="token keyword">public</span> <span class="token keyword">typealias</span> <span class="token builtin">OnCompletion</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">_</span> result<span class="token punctuation">:</span> <span class="token builtin">Result</span><span class="token operator">&lt;</span><span class="token constant">URL</span><span class="token punctuation">,</span> <span class="token builtin">Error</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span>

<span class="token comment">// MARK: Representation Properties</span>

<span class="token keyword">let</span> url<span class="token punctuation">:</span> <span class="token constant">URL</span>
<span class="token keyword">let</span> callbackURLScheme<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token operator">?</span>
<span class="token keyword">let</span> completionHandler<span class="token punctuation">:</span> <span class="token builtin">CompletionHandler</span> <span class="token comment">// &lt;- CompletionHandler</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><code>typealias</code>というのは C++でいうところの<code>define</code>のようなものだと勝手に思っている。つまり、上のコードは以下のコードと等価ということになる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> completionHandler <span class="token operator">=</span> <span class="token builtin">ASWebAuthenticationSession</span><span class="token punctuation">.</span><span class="token builtin">CompletionHandler</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>だが困ったことに作ろうとしている<code>PasscodeLockView</code>にはこのような completionHandler が存在しない。どうしたらいいのだろうか。</p>
<h2 id="発展させる" tabindex="-1"><a class="header-anchor" href="#発展させる" aria-hidden="true">#</a> 発展させる</h2>
<p>ここまでの話は単にパスコードを入力するだけの機能を考えた場合の話である。実際にはもっと複雑なリクエストが要求される。</p>
<p>例えば<a href="https://github.com/yankodimitrov/SwiftPasscodeLock" target="_blank" rel="noopener noreferrer">PasscodeLock<OutboundLink/></a>では<code>Enter</code>、<code>Set</code>、<code>Change</code>、<code>Remove</code>の四つのモードがサポートされている。</p>
<p>これらはそれぞれ</p>
<ul>
<li>Enter
<ul>
<li>パスコードを入力して一致するかチェックする</li>
</ul>
</li>
<li>Set
<ul>
<li>新たにパスコードを入力する</li>
<li>古いパスコードは要求されない</li>
</ul>
</li>
<li>Change
<ul>
<li>設定されたパスコードを変更する</li>
<li>古いパスコードが要求される</li>
</ul>
</li>
<li>Remove
<ul>
<li>パスコードを入力する</li>
<li>キャンセルで処理を中断させられる</li>
</ul>
</li>
</ul>
<p>といった違いがある。Remove に関しては Enter とほとんど同じなのでここでは無視できるとして、これを SwiftUI に拡張しつつ使いやすさも兼ねたライブラリにするためには、</p>
<ul>
<li>Enter
<ul>
<li>引数
<ul>
<li>現在のパスコード</li>
<li>生体認証を使うかどうかのフラグ</li>
</ul>
</li>
<li>返り値
<ul>
<li>パスコードと一致したかどうか</li>
</ul>
</li>
</ul>
</li>
<li>Set
<ul>
<li>引数なし</li>
<li>返り値
<ul>
<li>設定された新たなパスコード</li>
</ul>
</li>
</ul>
</li>
<li>Change
<ul>
<li>引数
<ul>
<li>現在のパスコード</li>
</ul>
</li>
<li>返り値
<ul>
<li>再設定されたパスコード</li>
<li>パスコードと一致したかどうか</li>
<li>のどちらか（これは Result を使えば対応可能）</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>というような仕様を満たせば良いことになる。つまり、例えば以下のような実装が考えられる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Enter</span>
<span class="token function">PasscodeEnterView</span><span class="token punctuation">(</span>passcode<span class="token punctuation">:</span> passcode<span class="token punctuation">,</span> withBiometrics<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span>
    <span class="token comment">// 成功したかどうかのフラグresultによって処理を変える</span>
<span class="token punctuation">}</span>

<span class="token function">PasscodeSetView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span>
    <span class="token comment">// resultに新たなパスコードが入っている</span>
<span class="token punctuation">}</span>

<span class="token function">PasscodeChangeView</span><span class="token punctuation">(</span>passcode<span class="token punctuation">:</span> passcode<span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span>
    <span class="token comment">// 成功したかどうかのフラグresultによって処理を変える</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>これらはまとめしまっても良いだろう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Enter</span>
<span class="token function">PasscodeView</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> <span class="token punctuation">.</span>enter<span class="token punctuation">,</span> passcode<span class="token punctuation">:</span> passcode<span class="token punctuation">,</span> withBiometrics<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span>
    <span class="token comment">// 成功したかどうかのフラグresultによって処理を変える</span>
<span class="token punctuation">}</span>

<span class="token comment">// Set</span>
<span class="token function">PasscodeView</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span>
    <span class="token comment">// 成功したかどうかのフラグresultによって処理を変える</span>
<span class="token punctuation">}</span>

<span class="token comment">// Change</span>
<span class="token function">PasscodeView</span><span class="token punctuation">(</span>state<span class="token punctuation">:</span> <span class="token punctuation">.</span>change<span class="token punctuation">,</span> passcode<span class="token punctuation">:</span> passcode<span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span>
    <span class="token comment">// 成功したかどうかのフラグresultによって処理を変える</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><code>withBiometrics</code>はオプショナルでデフォルト値をオフにしておけばいいし、<code>set</code>では旧パスコードは不要だが無視するようにすればいい。</p>
<p>より良いのはイニシャライザを複数用意することだろう。</p>
<p>が、結局これは完了ハンドラが呼べないと使えない。</p>
<h2 id="完了ハンドラを書いてみよう" tabindex="-1"><a class="header-anchor" href="#完了ハンドラを書いてみよう" aria-hidden="true">#</a> 完了ハンドラを書いてみよう</h2>
<p>書き方が合っているのかどうかはわからないんが、一応完了ハンドラ的なものは書けた。</p>
<p>以下はパスコードを入力して設定されたものと同じであれば<code>Result</code>として<code>success</code>を返し、間違っていれば<code>failure</code>を返すようなものである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>

    <span class="token comment">// 完了ハンドラを決定する</span>
    <span class="token keyword">typealias</span> <span class="token builtin">CompletionHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token builtin">Result</span><span class="token operator">&lt;</span><span class="token builtin">Bool</span><span class="token punctuation">,</span> <span class="token builtin">Error</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span>
    <span class="token keyword">let</span> completionHandler<span class="token punctuation">:</span> <span class="token builtin">CompletionHandler</span>

    <span class="token comment">// パスコードは5にしておく</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> passcode<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token number">5</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span>completionHandler<span class="token punctuation">:</span> @escaping <span class="token builtin">CompletionHandler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>completionHandler <span class="token operator">=</span> completionHandler
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">GeometryReader</span> <span class="token punctuation">{</span> geometry <span class="token keyword">in</span>
            <span class="token function">LazyVGrid</span><span class="token punctuation">(</span>columns<span class="token punctuation">:</span> <span class="token function">Array</span><span class="token punctuation">(</span>repeating<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">flexible</span><span class="token punctuation">(</span>minimum<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> maximum<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">,</span> spacing<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">count</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">,</span> spacing<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> pinnedViews<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">ForEach</span><span class="token punctuation">(</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> number <span class="token keyword">in</span>
                    <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">addSign</span><span class="token punctuation">(</span>sender<span class="token punctuation">:</span> number<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>number<span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">overlay</span><span class="token punctuation">(</span><span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stroke</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">,</span> lineWidth<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token punctuation">.</span><span class="token function">buttonStyle</span><span class="token punctuation">(</span><span class="token function">CircleButtonStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">biometricsAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"touchid"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">resizable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">addSign</span><span class="token punctuation">(</span>sender<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">buttonStyle</span><span class="token punctuation">(</span><span class="token function">CircleButtonStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Delete"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">60</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> geometry<span class="token punctuation">.</span>size<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> geometry<span class="token punctuation">.</span>size<span class="token punctuation">.</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">edgesIgnoringSafeArea</span><span class="token punctuation">(</span><span class="token punctuation">.</span>all<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">addSign</span><span class="token punctuation">(</span>sender<span class="token punctuation">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ボタンを押したときの処理</span>
        <span class="token keyword">if</span> sender <span class="token operator">==</span> passcode <span class="token punctuation">{</span>
            <span class="token comment">// 一致していればSuccess(True)を返す</span>
            <span class="token function">completionHandler</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 一致していなければSuccess(False)を返す</span>
            <span class="token function">completionHandler</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ボタンをかっこよくするためだけのコード</span>
<span class="token keyword">struct</span> <span class="token builtin">CircleButtonStyle</span><span class="token punctuation">:</span> <span class="token builtin">ButtonStyle</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">makeBody</span><span class="token punctuation">(</span>configuration<span class="token punctuation">:</span> <span class="token builtin">Configuration</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        configuration<span class="token punctuation">.</span>label
            <span class="token punctuation">.</span><span class="token function">foregroundColor</span><span class="token punctuation">(</span>configuration<span class="token punctuation">.</span>isPressed <span class="token operator">?</span> <span class="token builtin">Color</span><span class="token punctuation">.</span>white <span class="token punctuation">:</span> <span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">overlay</span><span class="token punctuation">(</span><span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stroke</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">,</span> lineWidth<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">contentShape</span><span class="token punctuation">(</span><span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">foregroundColor</span><span class="token punctuation">(</span>configuration<span class="token punctuation">.</span>isPressed <span class="token operator">?</span> <span class="token builtin">Color</span><span class="token punctuation">.</span>blue <span class="token punctuation">:</span> <span class="token builtin">Color</span><span class="token punctuation">.</span>clear<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><p>ここで大事なのは「一致していなければエラーを返す」というわけではないということである。あくまでもエラーというのは想定していない挙動をしたときに返すべきである。</p>
<p>なので、パスコードが一致しなかった場合にはパスコードチェックプロセスは正しく動作したが、パスコードが間違っていたという意味で<code>success(false)</code>を返す方が良いのではないかと考えた。</p>
<p>で、めちゃくちゃ話がとぶのだがこのコードを書けるようになるまでに随分苦労した。このような処理が必要になる場面は多々あると思うのだが、&quot;SwiftUI completion&quot;、&quot;SwiftUI closure&quot;などと探しても全く参考文献が見つからないのだ。</p>
<p>まじでこれどうやって書くんだと悩んでいたとき、ふと BetterSafariView のコードを見ていてひらめいたのである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">typealias</span> <span class="token builtin">CompletionHandler</span> <span class="token operator">=</span> <span class="token builtin">ASWebAuthenticationSession</span><span class="token punctuation">.</span><span class="token builtin">CompletionHandler</span> <span class="token comment">// &lt;- CompletionHandler</span>
<span class="token comment">/// A completion handler for the web authentication session.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>この部分で CompletionHandler を設定しているのだが、<code>ASWebAuthenticationSession.CompletionHandler</code>はあくまでも ASWebAuthenticationSession の完了ハンドラなので使えない。が、完了ハンドラ自体を自分で定義すればよいのではないかと。</p>
<p>この完了ハンドラ自体は<a href="https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession/completionhandler" target="_blank" rel="noopener noreferrer">Apple のドキュメント<OutboundLink/></a>に載っていたのですぐに特定できた。</p>
<p>すると、これは単に以下のコードであることがわかった。要するに、完了ハンドラはこう書けばいいのである。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">public</span> <span class="token keyword">typealias</span> <span class="token builtin">CompletionHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token constant">URL</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token builtin">Error</span><span class="token operator">?</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Void</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>そしてこのコードを見ていてふと思い出したのが<a href="https://github.com/tkgstrator/PasscodeLock/blob/267257eefe9d266d688b7b02f74aabe5b1c05730/PasscodeLock/PasscodeLockViewController.swift#L39" target="_blank" rel="noopener noreferrer">この部分の謎コード<OutboundLink/></a>でした。</p>
<p>コピペせずに頑張って手打ちしていたのが功を奏したと言えます。コピペしていたら記憶に残ることはなかったでしょう。</p>
</template>
