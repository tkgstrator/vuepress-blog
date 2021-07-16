<template><h2 id="realm-がクラッシュする問題" tabindex="-1"><a class="header-anchor" href="#realm-がクラッシュする問題" aria-hidden="true">#</a> Realm がクラッシュする問題</h2>
<p>Realm はモバイル向けのデータベースで、軽量かつ高速でいろいろなアプリで利用されています。</p>
<p>有名どころだと ikaWidget2 や Salmon Rec などが Realm を採用しています。Salmonia が Realm を採用したのも、これらの二つのアプリが Realm を採用していて勉強しやすかったというのがあります。</p>
<h2 id="realm-のリレーション" tabindex="-1"><a class="header-anchor" href="#realm-のリレーション" aria-hidden="true">#</a> Realm のリレーション</h2>
<p>Realm には<code>LinkingObject</code>という各テーブル同士を繋げるような仕組みがあります。これだけだとさっぱりわからないので、公式ドキュメントを使って例を作ります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">RealmSwift</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>例えば、上のように<code>Dog</code>クラスを作成し、犬の名前と年齢をデータベースに保存していく場合を考えます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">name</th>
<th style="text-align:center">age</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Taro</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">Hanako</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Wanko</td>
<td style="text-align:center">5</td>
</tr>
</tbody>
</table>
<p>すると、こんな感じでどんどんレコードを追加していくことができます。</p>
<p>これだけでも十分データベースとして役割は果たせているのですが、実際に運用していくだけでは少し物足りない気もします。</p>
<p>野良犬でなければ犬には必ず飼い主がいるので、飼い主情報も保存したいとします。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> gender <span class="token operator">=</span> <span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>飼い主情報としては名前と性別を今回は保存することにしました。</p>
<table>
<thead>
<tr>
<th style="text-align:center">name</th>
<th style="text-align:center">gender</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Alice</td>
<td style="text-align:center">female</td>
</tr>
<tr>
<td style="text-align:center">Bob</td>
<td style="text-align:center">male</td>
</tr>
</tbody>
</table>
<p>すると、例えば上のようなレコードが追加されるわけです。</p>
<p>ここで大事になるのは「飼い主は複数の犬を飼っている可能性がある」が、「一匹の犬には複数の飼い主がいることはない」ということです。</p>
<p>このような関係を「多対一」の関係と呼び、それぞれの飼い主が飼っている犬の情報も保存しておきたいわけです。</p>
<h2 id="list-を使って実装する" tabindex="-1"><a class="header-anchor" href="#list-を使って実装する" aria-hidden="true">#</a> List を使って実装する</h2>
<p>そこで、飼い主が飼い犬の情報を保存できるようにクラスを改良します。一人の Person クラスのオブジェクトが複数の Dog クラスのオブジェクトを持ちたいのですが、これは Realm では<code>List</code>を使って実装できます。</p>
<p><code>List</code>は<code>Int</code>や<code>String</code>型などの情報の他に<code>Realm Object</code>自体をもリスト化することができます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> gender <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">let</span> dogs <span class="token operator">=</span> <span class="token builtin">List</span><span class="token operator">&lt;</span><span class="token builtin">Dog</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 追加</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>つまり、このように書くことができるというわけです。</p>
<table>
<thead>
<tr>
<th style="text-align:center">name</th>
<th style="text-align:center">gender</th>
<th style="text-align:center">dogs</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Alice</td>
<td style="text-align:center">female</td>
<td style="text-align:center">Taro, Hanako</td>
</tr>
<tr>
<td style="text-align:center">Bob</td>
<td style="text-align:center">male</td>
<td style="text-align:center">Wanko</td>
</tr>
</tbody>
</table>
<p>こういうデータベース構造をつくれば、このように「Alice という女性が Taro と Hanako を飼っている」「Bob という男性が Wanko を飼っている」という情報が簡潔に保存できることになります。</p>
<p>この構造があれば、飼い主情報がわかればそれぞれの飼い犬情報が取得できます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> dogs <span class="token operator">=</span> alice<span class="token punctuation">.</span>dogs
<span class="token keyword">for</span> dog <span class="token keyword">in</span> dogs <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span>name<span class="token punctuation">,</span> dog<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上は擬似コードなのでそのままでは動作しませんが、このようなコードを書くことで Alice の飼い犬情報をループして全ての飼い犬の名前と年齢を表示させることができます。</p>
<p>ここまでできれば問題なさそうな気がするのですが、「飼い主情報から飼い犬情報は参照できる」が「それぞれの犬から飼い主情報を参照できない」という問題が残ります。</p>
<p>つまり「年齢が三歳以上の飼い犬がいる飼い主の名前」を調べようとしたときに、「三歳以上の犬 -&gt; その飼い主」のデータを読み込むことができないのです。</p>
<div class="custom-container tip"><p class="custom-container-title">愚直な解決策</p>
<p>もちろん、全ての飼い主をループして、更にその飼い犬をループして三歳以上の犬がいれば～という条件分を書くことはできます。</p>
<p>ただし、それを実装すると二重ループが必要になり実行速度が犠牲になってしまう。</p>
</div>
<p>この問題を解決するのが逆方向の参照（バックリンク）である<code>Linking Object</code>になります。</p>
<h2 id="linking-object" tabindex="-1"><a class="header-anchor" href="#linking-object" aria-hidden="true">#</a> Linking Object</h2>
<p><code>Linking Object</code>は以下のように<code>List</code>に対してリンクを張ります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">RealmSwift</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> owner <span class="token operator">=</span> <span class="token function">LinkingObjects</span><span class="token punctuation">(</span>fromType<span class="token punctuation">:</span> <span class="token builtin">Person</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> property<span class="token punctuation">:</span> <span class="token string">"dogs"</span><span class="token punctuation">)</span> <span class="token comment">// 追加</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> gender <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">let</span> dogs <span class="token operator">=</span> <span class="token builtin">List</span><span class="token operator">&lt;</span><span class="token builtin">Dog</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>今回の場合ですと、<code>Person</code>クラスの<code>dogs</code>というプロパティが<code>Dog</code>クラスへの多対一のリンクになっているので、そのバックリンクとして<code>Linking Object</code>を設定します。</p>
<p>このようなリンクを張っておけば、</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> dog <span class="token operator">=</span> taro
<span class="token function">print</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span>owner<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// Alice</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>のような感じで飼い主情報を参照することができます、便利ですね。</p>
<h2 id="アプリクラッシュの条件" tabindex="-1"><a class="header-anchor" href="#アプリクラッシュの条件" aria-hidden="true">#</a> アプリクラッシュの条件</h2>
<p>ここまでで LinkingObjects が何故必要か、あるとどう便利なのかを解説しましたが、ここからコーディングの際のトラップについて解説します。</p>
<p>Realm は SwiftUI を正式サポートしていないため、力技で実装することになるのですがそのためいろいろなところでエラーが発生したりします。</p>
<p>今回はその中でも最も困る「レコードを削除するとアプリがクラッシュする」問題について解説します。</p>
<p>このときデバッグコンソールに出力されるエラーメッセージは以下のとおりです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>*** Terminating app due to uncaught exception 'RLMException', reason: 'Object has been deleted or invalidated.'
terminating with uncaught exception of type NSException
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>要するに削除されて「有効でない」または「削除済み」のデータにアクセスしようとしてエラーが発生しているわけですね。</p>
<h3 id="_1-リアルタイム反映させている" tabindex="-1"><a class="header-anchor" href="#_1-リアルタイム反映させている" aria-hidden="true">#</a> 1. リアルタイム反映させている</h3>
<p>一つ目の発生条件は、削除しようとしているクラスに対して<code>observe</code>で SwiftUI に再レンダリングをかけているということです。再レンダリング処理をしていなければ当該の問題は発生しませんが、そうするとレコードを追加しても SwiftUI 側に反映されないので、再レンダリング処理をしていない人はいないと思います。</p>
<div class="custom-container tip"><p class="custom-container-title">再レンダリングについて</p>
<p>SwiftUI は構造体を使っているため、プロパティが変化したことを SwiftUI フレームワークに伝えて画面を再レンダリングするための仕組みがあります。</p>
</div>
<p>それが<code>@State</code>や<code>@Binding</code>や<code>@ObservedObject</code>における<code>@Published</code>になるのですが、これをそのまま Realm でやろうとすると失敗します。</p>
<p>というのも<code>@Published</code>はインスタンスの値自体が変わったタイミングでしか通知がこないので、インスタンスの内部状態が変わってもその変更を受け取れないためです。</p>
<p>そこで<code>observe</code> メソッドを利用して、Realm のデータベースに変更が起きる度にクロージャ内の処理を実行し、クロージャ内で<code>@Published</code>の値を変更すれば、</p>
<p><code>Realm -&gt; observe -&gt; Closure -&gt; @Published -&gt; SwiftUI</code>という流れで再レンダリングがかかります。</p>
<p>これらの仕様については<a href="https://qiita.com/chocoyama/items/af172b32f492b706c96d" target="_blank" rel="noopener noreferrer">こちらの記事<OutboundLink/></a>が大変参考になりました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Combine</span>

<span class="token keyword">class</span> <span class="token class-name">Dogs</span><span class="token punctuation">:</span> <span class="token builtin">ObservableObject</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span><span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">)</span> <span class="token keyword">var</span> dogs <span class="token operator">=</span> realm<span class="token punctuation">.</span><span class="token function">objects</span><span class="token punctuation">(</span><span class="token builtin">Dog</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> token<span class="token punctuation">:</span> <span class="token builtin">NotificationToken</span><span class="token operator">?</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        token <span class="token operator">=</span> realm<span class="token punctuation">.</span><span class="token function">objects</span><span class="token punctuation">(</span><span class="token builtin">Dog</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span><span class="token punctuation">.</span>observe <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token number">_</span> <span class="token keyword">in</span>
            <span class="token keyword">self</span><span class="token punctuation">.</span>objectWillChange<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">deinit</span> <span class="token punctuation">{</span>
        token<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>例えば、常に最新の<code>RealmSwift.Results&lt;Dog&gt;</code>を持ちたい場合には次のような<code>ObservableObject</code>を継承したクラスを定義します。</p>
<p>これは<code>dogs</code>が常に最新の<code>RealmSwift.Results&lt;Dog&gt;</code>を持っているにも関わらず、View が再レンダリングされないことを防ぐため、Realm の<code>Dog</code>のデータベースに何らかの変更があった場合に<code>self.objectWillChange.send()</code>で SwiftUI に再レンダリングを促すためのコードです。</p>
<p><code>dogs</code>自体は最新のデータを持っているので、再レンダリングがかかれば望んでいるデータが手に入るというわけですね。</p>
<div class="custom-container tip"><p class="custom-container-title">再レンダリングのタイミング</p>
<p>コードを読めばわかるのだが<code>NotificationToken</code>は<code>realm.objects(Dog.self)</code>から発行されている。つまり<code>realm.obbjects(Dog.self)</code>のレコードが変更されたときにしかこのクロージャは呼び出されない。</p>
</div>
<h3 id="再レンダリングの不思議" tabindex="-1"><a class="header-anchor" href="#再レンダリングの不思議" aria-hidden="true">#</a> 再レンダリングの不思議</h3>
<p>ここで以下の<code>Dog</code>クラスを管轄する<code>Dogs</code>クラスと<code>Person</code>クラスを管轄する<code>Persons</code>クラスを考える。</p>
<p>なお、<code>Dog</code>と<code>Person</code>は以下の定義を用い、今回はお互いが完全に独立したものとして扱う。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Realm.swift</span>
<span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">RealmSwift</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> gender <span class="token operator">=</span> <span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// RealmModel.swift</span>
<span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">RealmSwift</span>
<span class="token keyword">import</span> <span class="token builtin">Combine</span>

<span class="token keyword">class</span> <span class="token class-name">Dogs</span><span class="token punctuation">:</span> <span class="token builtin">ObservableObject</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> objectWillChange<span class="token punctuation">:</span> <span class="token builtin">ObservableObjectPublisher</span> <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span><span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">)</span> <span class="token keyword">var</span> dogs <span class="token operator">=</span> realm<span class="token punctuation">.</span><span class="token function">objects</span><span class="token punctuation">(</span><span class="token builtin">Dog</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> token<span class="token punctuation">:</span> <span class="token builtin">NotificationToken</span><span class="token operator">?</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        token <span class="token operator">=</span> realm<span class="token punctuation">.</span><span class="token function">objects</span><span class="token punctuation">(</span><span class="token builtin">Dog</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span><span class="token punctuation">.</span>observe <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token number">_</span> <span class="token keyword">in</span>
            <span class="token comment">// 何もしない</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">deinit</span> <span class="token punctuation">{</span>
        token<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Persons</span><span class="token punctuation">:</span> <span class="token builtin">ObservableObject</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> objectWillChange<span class="token punctuation">:</span> <span class="token builtin">ObservableObjectPublisher</span> <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span><span class="token punctuation">(</span><span class="token keyword">set</span><span class="token punctuation">)</span> <span class="token keyword">var</span> persons <span class="token operator">=</span> realm<span class="token punctuation">.</span><span class="token function">objects</span><span class="token punctuation">(</span><span class="token builtin">Person</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> token<span class="token punctuation">:</span> <span class="token builtin">NotificationToken</span><span class="token operator">?</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        token <span class="token operator">=</span> realm<span class="token punctuation">.</span><span class="token function">objects</span><span class="token punctuation">(</span><span class="token builtin">Person</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span><span class="token punctuation">.</span>observe <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token keyword">self</span><span class="token punctuation">]</span> <span class="token number">_</span> <span class="token keyword">in</span>
            <span class="token keyword">self</span><span class="token punctuation">.</span>objectWillChange<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">deinit</span> <span class="token punctuation">{</span>
        token<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>これはやればわかると思うのだが、<code>Dog</code>にデータを追加してもビューは再レンダリングされず、<code>Person</code>にデータを追加したときにだけ再レンダリングがかかる。これは実際、そのように動作する。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">追加</th>
<th style="text-align:center">削除</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Dogs</td>
<td style="text-align:center">されない</td>
<td style="text-align:center">されない</td>
</tr>
<tr>
<td style="text-align:center">Persons</td>
<td style="text-align:center">再レンダリング</td>
<td style="text-align:center">再レンダリング</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">勘違いしやすい点</p>
<p>ここで勘違いされやすいのは<code>Dogs</code>はいつまで経っても更新されないと思ってしまうことである。</p>
<p>それは誤りで、データベースが更新される度に<code>Persons</code>クラスは絶えず更新されている。ただ、その更新が行われたということを SwiftUI が検知できず、ビューが再レンダリングされていないだけなのである。</p>
<p>つまり<code>Person -&gt; Dog</code>という順でデータを更新された場合には最初の<code>Person</code>の更新の時点までしかビューが再レンダリングされないが、<code>Dog -&gt; Person</code>の順でデータを更新した場合には<code>Dog</code>は正しく最新の情報が表示されるのである。</p>
</div>
<h3 id="リンクを張ってみる" tabindex="-1"><a class="header-anchor" href="#リンクを張ってみる" aria-hidden="true">#</a> リンクを張ってみる</h3>
<p>では次に、Realm.swift だけ更新し、<code>Person -&gt; Dog</code>への多対一のリンク(List)を持つようにする。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Realm.swift</span>
<span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">RealmSwift</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> owner <span class="token operator">=</span> <span class="token function">LinkingObjects</span><span class="token punctuation">(</span>fromType<span class="token punctuation">:</span> <span class="token builtin">Person</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> property<span class="token punctuation">:</span> <span class="token string">"dogs"</span><span class="token punctuation">)</span> <span class="token comment">// 追加</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> gender <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">let</span> dogs <span class="token operator">=</span> <span class="token builtin">RealmSwift</span><span class="token punctuation">.</span><span class="token builtin">List</span><span class="token operator">&lt;</span><span class="token builtin">Dog</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 順リンクを追加</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>すると先ほどと同じで、やはり Dog が更新されたタイミングでしか再レンダリングはかからない。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">追加</th>
<th style="text-align:center">削除</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Dogs</td>
<td style="text-align:center">されない</td>
<td style="text-align:center">されない</td>
</tr>
<tr>
<td style="text-align:center">Persons</td>
<td style="text-align:center">再レンダリング</td>
<td style="text-align:center">再レンダリング</td>
</tr>
</tbody>
</table>
<p>これ自体に特別な意味はないのだが、Dog クラスと Person クラスにこのような関係性がある場合「Dog だけを追加する」というような状態がないのがわかるだろうか？</p>
<p>例えば Bob が新たに Wataru という犬を飼いはじめ、それをデータベースに入力する場合を考えよう。このとき、単純に Wataru という犬のレコードを Dog クラスに追加するのは意味がない。何故なら、Dog クラスには「誰が飼い主であるか」という情報をプロパティではなくバックリンクでしか持っていないためである。</p>
<table>
<thead>
<tr>
<th style="text-align:center">name</th>
<th style="text-align:center">age</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Taro</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">Hanako</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Wanko</td>
<td style="text-align:center">5</td>
</tr>
<tr>
<td style="text-align:center">Wataru</td>
<td style="text-align:center">3</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th style="text-align:center">name</th>
<th style="text-align:center">gender</th>
<th style="text-align:center">dogs</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Alice</td>
<td style="text-align:center">female</td>
<td style="text-align:center">Taro, Hanako</td>
</tr>
<tr>
<td style="text-align:center">Bob</td>
<td style="text-align:center">male</td>
<td style="text-align:center">Wanko</td>
</tr>
</tbody>
</table>
<p>もしも単純に<code>Dog</code>クラスに追加した場合には次のように<code>Person</code>クラスの<code>dogs</code>の配列が更新されないため、Wataru のバックリンクを参照したときに<code>nil</code>が返ってきてしまう。</p>
<p>これを防ぐためには「Bob の<code>dogs</code>プロパティに Wataru を追加する」という処理を行わねばならない。つまり、バックリンクを持つデータベースにデータが「追加」されるのであれば、それは「バックリンク先だけで再レンダリング処理考えれば良い」ということになる。</p>
<div class="custom-container tip"><p class="custom-container-title">Realm の挙動について</p>
<p>今回のように<code>Person -&gt; Dog</code>のリレーションがある場合、<code>Person</code>にデータを追加する際は必ず「子（Dog）」-&gt;「親（Person）」の順でデータベースの更新がかかるので、<code>Person</code>クラスの変更だけをチェックするような仕組みにすれば良い。</p>
</div>
<h3 id="データ更新" tabindex="-1"><a class="header-anchor" href="#データ更新" aria-hidden="true">#</a> データ更新</h3>
<p>なので「追加」という観点から見ればバックリンクを持つデータベースには再レンダリング処理を記述しなくていいことになるが、今回のケースでは実は<code>Dog</code>クラスにも再レンダリングのコードを書かなければいけない。</p>
<p>というのも、再レンダリングが必要になるのは何も「データ追加」だけではなく「データ更新」の場合にも必要になるからである。</p>
<p>例えば、飼い犬の名前を変えたい場合などは別に<code>Person</code>クラスのデータは一切更新しない。こういう場合は<code>Person</code>のデータが変わっただけで再レンダリング処理をしていると飼い犬の名前が変更されたときに SwiftUI が再レンダリングをかけることができない。</p>
<h3 id="_2-プライマリキーを設定している" tabindex="-1"><a class="header-anchor" href="#_2-プライマリキーを設定している" aria-hidden="true">#</a> 2. プライマリキーを設定している</h3>
<p>二つ目の条件は削除しようとしているデータベースにプライマリキーが設定されているということです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">:</span> <span class="token builtin">Object</span> <span class="token punctuation">{</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">dynamic</span> <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> owner <span class="token operator">=</span> <span class="token function">LinkingObjects</span><span class="token punctuation">(</span>fromType<span class="token punctuation">:</span> <span class="token builtin">Person</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> property<span class="token punctuation">:</span> <span class="token string">"dogs"</span><span class="token punctuation">)</span>

    <span class="token comment">// 追加</span>
    <span class="token keyword">override</span> <span class="token keyword">static</span> <span class="token keyword">func</span> <span class="token function">primaryKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">String</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"name"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>このように飼い犬の名前が重複しないように（名前は重複しやすいので、名前にプライマリキーをつけることは基本的にありませんが）プライマリキーを設定すると削除時にクラッシュします。</p>
<h2 id="結論" tabindex="-1"><a class="header-anchor" href="#結論" aria-hidden="true">#</a> 結論</h2>
<p>いろいろ調べてクラッシュする原因をだいぶ突き止めた気がする。</p>
<p>困ったことは<code>NavigationView</code>を使った場合と<code>TabView</code>を使った場合で挙動が異なるということ。まじで意味わからん。</p>
<h3 id="navigationview-の場合" tabindex="-1"><a class="header-anchor" href="#navigationview-の場合" aria-hidden="true">#</a> NavigationView の場合</h3>
<p><img src="https://pbs.twimg.com/media/E2JMfZqVcAAqmdU?format=png" alt=""></p>
<p>NavigationView の場合は<code>objectWillChange</code>を指定しなくても<code>NavigationLink</code>で遷移すると<code>ForEach</code>の中身が自動で再レンダリングされるようだ。</p>
<p>ただし、<code>ForEach</code>以外は再レンダリングされないので<code>objectWillChange</code>を使わなくても良いということではない。</p>
<p>「追加」は問題ないが「削除」を<code>ForEach</code>と同じビューで実行してはいけない。</p>
<div class="custom-container tip"><p class="custom-container-title">削除と同じビューとは</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token builtin">From</span> <span class="token punctuation">{</span>
    <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">deleteAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"DELETE"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// dogsのレコードを削除する</span>
    <span class="token function">ForEach</span><span class="token punctuation">(</span>dogs<span class="token punctuation">)</span> <span class="token punctuation">{</span> dog <span class="token keyword">in</span>
        <span class="token function">Text</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// ForEachなのでwillObjectChangeがなくても更新される</span>
    <span class="token punctuation">}</span>
    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"<span class="token interpolation"><span class="token delimiter variable">\(</span>dogs<span class="token punctuation">.</span><span class="token builtin">count</span><span class="token delimiter variable">)</span></span>"</span><span class="token punctuation">)</span> <span class="token comment">// ForEachでないので更新されない</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>のように dogs(RealmSwift.Results)自体を弄るような関数を同じビューに書いてはいけないということを意味する。</p>
</div>
<p>その場合、プライマリキーがあれば<code>Invalidate</code>を、なければ<code>Index out of range</code>のエラーを返す。これは<code>objectWillChange</code>があってもなくても関係ないので覚えておくこと。</p>
<p><a href="https://llcc.hatenablog.com/entry/2020/04/26/205254" target="_blank" rel="noopener noreferrer">Realm Swift + SwiftUI でテーブル表示・編集・削除<OutboundLink/></a>のページにもあるように<code>RealmSwift.Results</code>ではなく、それを配列に変換したものなどを使うと良い。</p>
<h3 id="tabview-の場合" tabindex="-1"><a class="header-anchor" href="#tabview-の場合" aria-hidden="true">#</a> TabView の場合</h3>
<p><img src="https://pbs.twimg.com/media/E2JMixiVIAIwiUu?format=png" alt=""></p>
<p>TabView の場合、NavigationView のように別のビューが表示されている扱いではなく「全てのタブが同時に表示されている」ような状態になっている。</p>
<p>なので例えば、A、B、C 三つのタブがあり、A のタブで<code>ForEach</code>でレコードの中身を表示していて B のタブでプライマリキーが設定されているレコードの削除を行うと<code>Invalidate</code>がでる。</p>
<p>また、NavigationView と違い、View を再表示したときに強制再レンダリングが発生しないため<code>objectWillChange</code>を書かないと何も反映されない。</p>
<div class="custom-container tip"><p class="custom-container-title">TabView と NavigationView の違い</p>
<p>要するに「TabView において A でレコード表示、B でレコード削除」というのは「一つの View でレコード表示、レコード削除」をしているのとほとんど同じ状態になっている。</p>
<p>ただし、<code>index out of range</code>のエラーは何故か発生しないのでプライマリキーが設定されていないのであればエラーは起きない。ここが不思議なところの一つである。ただし、NavigationView と同じように「A でレコード表示、A でレコード削除」とすればやはり<code>index out of range</code>が発生する。</p>
</div>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">NavigationView</th>
<th style="text-align:center">TabView</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">objectWillChange</td>
<td style="text-align:center">ForEach 内は自動更新</td>
<td style="text-align:center">必須</td>
</tr>
<tr>
<td style="text-align:center">同一ビューでレコード追加</td>
<td style="text-align:center">問題なし</td>
<td style="text-align:center">問題なし</td>
</tr>
<tr>
<td style="text-align:center">同一ビューでレコード削除</td>
<td style="text-align:center">Invalidate/Index out of range</td>
<td style="text-align:center">Invalidate/Index out of range</td>
</tr>
<tr>
<td style="text-align:center">別ビューでレコード追加</td>
<td style="text-align:center">問題なし</td>
<td style="text-align:center">問題なし</td>
</tr>
<tr>
<td style="text-align:center">別ビューでレコード削除</td>
<td style="text-align:center">問題なし</td>
<td style="text-align:center">Invalidate/問題なし</td>
</tr>
</tbody>
</table>
<div class="custom-container warning"><p class="custom-container-title">Invalidate について</p>
<p>現状、プライマリキーを設定している場合にしか発生しないようだ。</p>
</div>
</template>
