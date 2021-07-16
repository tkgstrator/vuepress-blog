<template><h2 id="swiftui-における-alignment-とは" tabindex="-1"><a class="header-anchor" href="#swiftui-における-alignment-とは" aria-hidden="true">#</a> SwiftUI における Alignment とは</h2>
<p>Alignment とは要するに「右揃え」「中央揃え」「左揃え」のようなテキストやオブジェクトなどのグループをどこを基準に揃えるかというパラメータのことである。</p>
<p>で、Alignment については<a href="https://qiita.com/shiz/items/0c41d20a2cb7b0748875" target="_blank" rel="noopener noreferrer">こちらの記事<OutboundLink/></a>ででまとめてくれていたりする。</p>
<p>ただ、それを読んだだけでは自分がしっかりと理解できなかったのでその解説となります。</p>
<h2 id="コードから理解する" tabindex="-1"><a class="header-anchor" href="#コードから理解する" aria-hidden="true">#</a> コードから理解する</h2>
<p>各コードと、その時どんなふうに描画されるかを確認して見ましょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 基本コード</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>
<span class="token keyword">import</span> <span class="token builtin">PlaygroundSupport</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token builtin">PlaygroundPage</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>liveView <span class="token operator">=</span> <span class="token function">UIHostingController</span><span class="token punctuation">(</span>rootView<span class="token punctuation">:</span> <span class="token function">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">コードについて</p>
<p>以後、これの<code>body</code>だけを変えたものを書いていきます。</p>
</div>
<h3 id="text-を-stack-要素に入れる" tabindex="-1"><a class="header-anchor" href="#text-を-stack-要素に入れる" aria-hidden="true">#</a> Text を Stack 要素に入れる</h3>
<p>以下の四つは全く同じ見た目になります。つまり、Stack 内に入れるデータが一つしかない場合は見た目の変化が起こりません。</p>
<p>ちなみに見た目としては画面中央揃えでテキストが表示されます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token builtin">HStack</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token builtin">VStack</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token builtin">ZStack</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><img src="https://pbs.twimg.com/media/E1T3fUXVEAAvrFL?format=png" alt=""></p>
<table>
<thead>
<tr>
<th style="text-align:center">テキストが一つ</th>
<th style="text-align:center">-</th>
<th style="text-align:center">HStack</th>
<th style="text-align:center">VStack</th>
<th style="text-align:center">ZStack</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">全体の Alignment</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
</tr>
<tr>
<td style="text-align:center">文字の Alignment</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
</tr>
</tbody>
</table>
<h3 id="text-二つを-stack-に入れる" tabindex="-1"><a class="header-anchor" href="#text-二つを-stack-に入れる" aria-hidden="true">#</a> Text 二つを Stack に入れる</h3>
<p>テキストを二つ入れると、それぞれの Stack の特徴はでるようになりますが、やはり全体としては中央揃えになります。</p>
<p>なんでなんだろうなあと考えてみたのですが、HStack や VStack などは<code>body</code>に対して何の Alignment もかかっていないので変化しないのだと思います。</p>
<p>つまり、SwiftUI においては何もしなければ「中央揃え」が適用されるということになります。</p>
<p><img src="https://pbs.twimg.com/media/E1T70nyVkAUEPXp?format=png" alt=""></p>
<table>
<thead>
<tr>
<th style="text-align:center">テキストが二つ</th>
<th style="text-align:center">-</th>
<th style="text-align:center">HStack</th>
<th style="text-align:center">VStack</th>
<th style="text-align:center">ZStack</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">全体の Alignment</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
</tr>
<tr>
<td style="text-align:center">文字の Alignment</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
<td style="text-align:center">中央揃え</td>
</tr>
</tbody>
</table>
<h3 id="stack-に-alignment-をつける" tabindex="-1"><a class="header-anchor" href="#stack-に-alignment-をつける" aria-hidden="true">#</a> Stack に Alignment をつける</h3>
<p>オプションで各 Stack には<code>Container Alignment</code>をつけることができます。</p>
<p>ただし、HStack には<code>leading</code>はつけられませんし、VStack に<code>top</code>を指定することはできません。これってちょっと不便な気がするのですが、どうなんでしょう？</p>
<table>
<thead>
<tr>
<th style="text-align:center">Container Alignment</th>
<th style="text-align:center">HStack</th>
<th style="text-align:center">VStack</th>
<th style="text-align:center">ZStack</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">leading</td>
<td style="text-align:center">-</td>
<td style="text-align:center">○</td>
<td style="text-align:center">○</td>
</tr>
<tr>
<td style="text-align:center">center</td>
<td style="text-align:center">-</td>
<td style="text-align:center">○</td>
<td style="text-align:center">○</td>
</tr>
<tr>
<td style="text-align:center">trailing</td>
<td style="text-align:center">-</td>
<td style="text-align:center">○</td>
<td style="text-align:center">○</td>
</tr>
<tr>
<td style="text-align:center">top</td>
<td style="text-align:center">○</td>
<td style="text-align:center">-</td>
<td style="text-align:center">○</td>
</tr>
<tr>
<td style="text-align:center">center</td>
<td style="text-align:center">○</td>
<td style="text-align:center">-</td>
<td style="text-align:center">○</td>
</tr>
<tr>
<td style="text-align:center">bottom</td>
<td style="text-align:center">○</td>
<td style="text-align:center">-</td>
<td style="text-align:center">○</td>
</tr>
</tbody>
</table>
<p>VStack のイメージはこんな感じで、何もしなければコンテナ自体の大きさは可変で中に入れる要素ピッタリの大きさまで広がります。</p>
<p>コンテナ自体の大きさが可変であるため「コンテナ内の上から順番に積み上げていく」という意味である<code>top</code>を指定することができないというわけです。</p>
<p><img src="https://pbs.twimg.com/media/E1T_vyiUcAEEhTp?format=png" alt=""></p>
<p>しかし、SwiftUI には<code>Frame Alignment</code>というものがあるので、例えば<code>frame(height: 200)</code>などを指定してコンテナのサイズを固定させて上から積み上げていくというのは需要がありそうな気もします。</p>
<p><img src="https://pbs.twimg.com/media/E1UA9hfUUAETs9b?format=png" alt=""></p>
<div class="custom-container warning"><p class="custom-container-title">middle じゃないじゃん</p>
<p>何も考えずに垂直方向の中央揃えを middle って書いてましたが、実際には center になります。</p>
</div>
<h3 id="stack-に-frame-alignment-をつける" tabindex="-1"><a class="header-anchor" href="#stack-に-frame-alignment-をつける" aria-hidden="true">#</a> Stack に Frame Alignment をつける</h3>
<p>というわけで VStack に対して<code>Frame Alignment</code>を適用してみます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token function">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"by tkgstrator.work"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ただし、このコードだと<code>.frame(alignment: .leading)</code>は何の効果も持たず、<code>center</code>を指定した場合と全く同じ見た目になります。</p>
<p>ただし、以下のように<code>Frame Alignment</code>に対して<code>width</code>要素を付けると見た目が変わります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token function">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"by tkgstrator.work"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>何故なら VStack の幅は可変で常に内部のオブジェクトぴったりになるように大きさが変わっているからです。つまり、VStack（または HStack に対して）<code>Frame Alignment</code>だけを指定するのは全く意味がありません。ダグドリオに十万ボルトするくらい意味がないです。</p>
<p><img src="https://pbs.twimg.com/media/E1UKtENUcAEney1?format=png" alt=""></p>
<div class="custom-container tip"><p class="custom-container-title">Frame Alignment について</p>
<p>幅を指定しないときは VStack と Frame の幅は完全に一致しています。</p>
<p>なので、Frame 内で VStack を左寄せすることはできません。Frame 要素の幅を指定することで VStack を Frame 内で幅寄せすることができるようになるわけです。</p>
</div>
<p>点線の部分は実際には見えないので、オブジェクトだけが左に寄ったように見えるわけです。</p>
<p><img src="https://pbs.twimg.com/media/E1ULaWoVkAcOB-n?format=png" alt=""></p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 確認用コード</span>
<span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token function">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
        <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"by tkgstrator.work"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>gray<span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>red<span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>実際に表示してみるとこのようになります。赤い背景が Frame でが設定された上で全体の中央になっており（デフォルト）、灰色の背景の VStack が Frame 内で左寄せになり、その中のテキストが中央揃えになっていることがわかります。</p>
<h2 id="テキストで空文字を表示する" tabindex="-1"><a class="header-anchor" href="#テキストで空文字を表示する" aria-hidden="true">#</a> テキストで空文字を表示する</h2>
<p>VStack はサイズを自動的に変えると説明したが、これが逆にめんどくさい仕様になる場合もある。</p>
<p>例えば、何かのフラグが有効のときだけ「有効」と表示し、そうでないときは何も表示しないようなコードを考える。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> isPresented<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">VStack</span> <span class="token punctuation">{</span>
            <span class="token function">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
                <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"by tkgstrator.work"</span><span class="token punctuation">)</span>
                <span class="token function">Text</span><span class="token punctuation">(</span>isPresented <span class="token operator">?</span> <span class="token string">"ENABLED"</span> <span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>gray<span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>top<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>red<span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">Button</span><span class="token punctuation">(</span>action<span class="token punctuation">:</span> <span class="token punctuation">{</span> isPresented<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"SWITCH"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token builtin">Color</span><span class="token punctuation">.</span>blue<span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>これはボタンを押せば<code>isPresented</code>の値が切り替わり、切り替わる度にテキストが空文字から<code>&quot;ENABLED&quot;</code>の表示を交互に切り替えるプログラムである。</p>
</template>
