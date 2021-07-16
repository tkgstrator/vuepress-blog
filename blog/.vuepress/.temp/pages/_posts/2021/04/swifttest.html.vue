<template><h2 id="swift-package-manager" tabindex="-1"><a class="header-anchor" href="#swift-package-manager" aria-hidden="true">#</a> Swift Package Manager</h2>
<p>Swift Package Manager（以下、SPM）で作成したライブラリをデモアプリに組み込んでテストしたいと思うときがある。</p>
<p>が、SPM は Git のレポジトリから取り込む形にしか対応しているように見えない。実はローカルで使う方法もあるのだが、今回はその方法を紹介する。</p>
<h3 id="salmon-stats-ライブラリ" tabindex="-1"><a class="header-anchor" href="#salmon-stats-ライブラリ" aria-hidden="true">#</a> Salmon Stats ライブラリ</h3>
<p><a href="https://github.com/tkgstrator/SalmonStats" target="_blank" rel="noopener noreferrer">Swift で使える Salmon Stats ライブラリ<OutboundLink/></a>を SPM で開発したのだが、でもアプリがついていないのでいまいちわかりにくい感じになっている。</p>
<p>ちなみに現在対応しているのは次の機能。</p>
<ul>
<li>シフト統計の取得
<ul>
<li>グローバルのみ取得</li>
</ul>
</li>
<li>シフト記録の取得
<ul>
<li>赤イクラ記録</li>
<li>金イクラ記録</li>
</ul>
</li>
<li>ユーザメタデータの取得
<ul>
<li>バイト回数とかのデータ</li>
</ul>
</li>
<li>ユーザのリザルトの取得
<ul>
<li>最大 200 件まで取得</li>
</ul>
</li>
</ul>
<p>というわけで、まずは GitHub から Salmon Stats ライブラリを取得する。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:tkgstrator/SalmonStats.git
Cloning into <span class="token string">'SalmonStats'</span><span class="token punctuation">..</span>.
remote: Enumerating objects: <span class="token number">73</span>, done.
remote: Counting objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">73</span>/73<span class="token punctuation">)</span>, done.
remote: Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">54</span>/54<span class="token punctuation">)</span>, done.
remote: Total <span class="token number">73</span> <span class="token punctuation">(</span>delta <span class="token number">20</span><span class="token punctuation">)</span>, reused <span class="token number">52</span> <span class="token punctuation">(</span>delta <span class="token number">10</span><span class="token punctuation">)</span>, pack-reused <span class="token number">0</span>
Receiving objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">73</span>/73<span class="token punctuation">)</span>, <span class="token number">15.29</span> KiB <span class="token operator">|</span> <span class="token number">5.10</span> MiB/s, done.
Resolving deltas: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">20</span>/20<span class="token punctuation">)</span>, done.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>clone したら SalmonStats ディレクトリ以下に Xcode で新プロジェクトを作成する。</p>
<h3 id="新プロジェクトを作成" tabindex="-1"><a class="header-anchor" href="#新プロジェクトを作成" aria-hidden="true">#</a> 新プロジェクトを作成</h3>
<p>Xcode から<code>SalmonStatsDemo</code>という新プロジェクトを作成する。</p>
<p><img src="/assets/images/01.png" alt=""></p>
<p>この段階ではまだローカルパッケージが読み込まれていない。</p>
<p><img src="/assets/images/02.png" alt=""></p>
<p>次にこのデモアプリのプロジェクトに対して SalmonStats のディレクトリをそのままドラッグアンドドロップしてライブラリを追加する。</p>
<p>注意点としては「コピーする」は選択しなくて良いというところです。</p>
<p><img src="/assets/images/03.png" alt=""></p>
<p>ちゃんとできると上の画像のように SalmonStats のライブラリを読み込んでくれます。</p>
<p>ちなみに、プロジェクトを作成するときに<code>IDETemplateMacros.plist</code>を作成しておくと便利です。詳しくは<a href="https://capibara1969.com/1151/" target="_blank" rel="noopener noreferrer">カピ通信<OutboundLink/></a>さんが解説されています。</p>
<p>最後に、デモアプリに対してライブラリを追加します。</p>
<p><img src="/assets/images/04.png" alt=""></p>
<h2 id="デモアプリ形式の便利なところ" tabindex="-1"><a class="header-anchor" href="#デモアプリ形式の便利なところ" aria-hidden="true">#</a> デモアプリ形式の便利なところ</h2>
<p>SPM で読み込んだ場合にはライブラリのソースコードを変更できないという問題がありますが、このようにローカルでライブラリを読み込んだ場合にはライブラリのコードを変えながらデモアプリでチェックできます。</p>
<p>GitHub などにコミットする必要もなく、手間が省けるというわけです。</p>
<h3 id="既存のバグ" tabindex="-1"><a class="header-anchor" href="#既存のバグ" aria-hidden="true">#</a> 既存のバグ</h3>
<p>CombineExpectations をライブラリに追加したままローカルや SPM で別のアプリに追加するとクラッシュします。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">PackageDescription</span>

<span class="token keyword">let</span> package <span class="token operator">=</span> <span class="token function">Package</span><span class="token punctuation">(</span>
    name<span class="token punctuation">:</span> <span class="token string">"SalmonStats"</span><span class="token punctuation">,</span>
    platforms<span class="token punctuation">:</span>  <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">iOS</span><span class="token punctuation">(</span><span class="token punctuation">.</span>v13<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token function">macOS</span><span class="token punctuation">(</span><span class="token punctuation">.</span>v10_15<span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    products<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">library</span><span class="token punctuation">(</span>
            name<span class="token punctuation">:</span> <span class="token string">"SalmonStats"</span><span class="token punctuation">,</span>
            targets<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"SalmonStats"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    dependencies<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">package</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token string">"https://github.com/Alamofire/Alamofire.git"</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token string">"5.4.2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">.</span><span class="token function">package</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token string">"https://github.com/groue/CombineExpectations.git"</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token string">"0.7.0"</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    targets<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span>
            name<span class="token punctuation">:</span> <span class="token string">"SalmonStats"</span><span class="token punctuation">,</span>
            dependencies<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"Alamofire"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">.</span><span class="token function">testTarget</span><span class="token punctuation">(</span>
            name<span class="token punctuation">:</span> <span class="token string">"SalmonStatsTests"</span><span class="token punctuation">,</span>
            dependencies<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"SalmonStats"</span><span class="token punctuation">,</span> <span class="token string">"CombineExpectations"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>どうも CombineExpectations は testTarget にしか追加してはダメなようだった。</p>
<h3 id="サンプルコード" tabindex="-1"><a class="header-anchor" href="#サンプルコード" aria-hidden="true">#</a> サンプルコード</h3>
<p>例えば以下のようなコードを書けば Salmon Stats から 10 万番目のリザルトを取得できる。</p>
<p>イニシャライザで宣言するとビューを呼び出す前にアクセスしてしまうので<code>onAppear</code>で宣言するのが適切かもしれない。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// onAppearで呼び出す場合</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">SalmonStats</span>
<span class="token keyword">import</span> <span class="token builtin">Combine</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> task<span class="token punctuation">:</span> <span class="token builtin">AnyCancellable</span><span class="token operator">?</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span>onAppear <span class="token punctuation">{</span>
                task <span class="token operator">=</span> <span class="token builtin">SalmonStats</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span>resultId<span class="token punctuation">:</span> <span class="token number">1000000</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">sink</span><span class="token punctuation">(</span>receiveCompletion<span class="token punctuation">:</span> <span class="token punctuation">{</span> completion <span class="token keyword">in</span>
                        <span class="token keyword">switch</span> completion <span class="token punctuation">{</span>
                        <span class="token keyword">case</span> <span class="token punctuation">.</span>finished<span class="token punctuation">:</span>
                            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"FINISHED"</span><span class="token punctuation">)</span>
                        <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span>
                            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"ERROR"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span> receiveValue<span class="token punctuation">:</span> <span class="token punctuation">{</span> response <span class="token keyword">in</span>
                        <span class="token function">dump</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// イニシャライザで呼び出す場合</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">SalmonStats</span>
<span class="token keyword">import</span> <span class="token builtin">Combine</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> task<span class="token punctuation">:</span> <span class="token builtin">AnyCancellable</span><span class="token operator">?</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        task <span class="token operator">=</span> <span class="token builtin">SalmonStats</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span>resultId<span class="token punctuation">:</span> <span class="token number">100000</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">sink</span><span class="token punctuation">(</span>receiveCompletion<span class="token punctuation">:</span> <span class="token punctuation">{</span> completion <span class="token keyword">in</span>
                <span class="token keyword">switch</span> completion <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token punctuation">.</span>finished<span class="token punctuation">:</span>
                    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"FINISHED"</span><span class="token punctuation">)</span>
                <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span>
                    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"ERROR"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> receiveValue<span class="token punctuation">:</span> <span class="token punctuation">{</span> response <span class="token keyword">in</span>
                <span class="token function">dump</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>ただ、SwiftUI は struct 型なのでクロージャの中で self を書き換えることができない。これは mutating でも同じことである。詳しくは<a href="https://gist.github.com/takasek/1c92935ceafb8340eb7fbc9d0f8379eb" target="_blank" rel="noopener noreferrer">ここの GitHub Gist<OutboundLink/></a>を読めばいいことがあるかもしれない。</p>
<p>よって、イニシャライザを使った場合は受け取ったデータである resopnse を処理することができない。なので普通に<code>onAppear</code>でいいような気がしてきました。</p>
<h2 id="デモアプリ" tabindex="-1"><a class="header-anchor" href="#デモアプリ" aria-hidden="true">#</a> デモアプリ</h2>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">SalmonStats</span>
<span class="token keyword">import</span> <span class="token builtin">Combine</span>


<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> result<span class="token punctuation">:</span> <span class="token builtin">Response</span><span class="token punctuation">.</span><span class="token builtin">ResultCoop</span><span class="token operator">?</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> task<span class="token punctuation">:</span> <span class="token builtin">AnyCancellable</span><span class="token operator">?</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">List</span> <span class="token punctuation">{</span>
            <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"BOSS APPEARANCES"</span><span class="token punctuation">)</span>
                <span class="token function">Spacer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>result<span class="token operator">?</span><span class="token punctuation">.</span>bossAppearanceCount <span class="token operator">?</span><span class="token operator">?</span> <span class="token number">0</span><span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">onAppear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">getResultFromSalmonStats</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">getResultFromSalmonStats</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        task <span class="token operator">=</span> <span class="token builtin">SalmonStats</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span>resultId<span class="token punctuation">:</span> <span class="token number">100000</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">sink</span><span class="token punctuation">(</span>receiveCompletion<span class="token punctuation">:</span> <span class="token punctuation">{</span> completion <span class="token keyword">in</span>
                        <span class="token keyword">switch</span> completion <span class="token punctuation">{</span>
                        <span class="token keyword">case</span> <span class="token punctuation">.</span>finished<span class="token punctuation">:</span>
                            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"FINISHED"</span><span class="token punctuation">)</span>
                        <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span>
                            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"ERROR"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span> receiveValue<span class="token punctuation">:</span> <span class="token punctuation">{</span> response <span class="token keyword">in</span>
                        result <span class="token operator">=</span> response
                        <span class="token function">dump</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>ビルドすると以下のように表示できる。</p>
<p>Combine は非同期処理なのでデータの読み込みが終わるまでは 0 と表示されているが、読み込みが完了すると正しい 63 という値に修正される。</p>
<p><img src="/assets/images/06.png" alt=""></p>
<p>ところで<code>onAppear</code>ってダサいなあって思っているので前みたいに<code>viewDidLoad</code>とかで呼び出せるようになってくれないかなあと。</p>
</template>
