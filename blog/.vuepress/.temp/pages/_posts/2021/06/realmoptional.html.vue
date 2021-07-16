<template><h1 id="realmswift" tabindex="-1"><a class="header-anchor" href="#realmswift" aria-hidden="true">#</a> <a href="https://github.com/realm/realm-cocoa/releases/tag/v10.8.1" target="_blank" rel="noopener noreferrer">RealmSwift<OutboundLink/></a></h1>
<p>最近 RealmSwift のバージョンが上がったらしく、それに伴ってデータベースに保存するオプショナル型の扱いが変わりました。</p>
<p>調べてもドキュメントは 10.5.0 くらいまでしか対応してなかったので自分で新しいコーディング方法を調べました。</p>
<h2 id="realmproperty" tabindex="-1"><a class="header-anchor" href="#realmproperty" aria-hidden="true">#</a> RealmProperty</h2>
<p>今まで<code>RealmOptional</code>を使っていたものが<code>RealmProperty</code>に変わりました。それだけでなく、ちょっとだけ宣言の方法も変わったのでそれもご紹介。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Deprecated</span>
<span class="token keyword">let</span> zipcode <span class="token operator">=</span> <span class="token builtin">RealmOptional</span><span class="token operator">&lt;</span><span class="token builtin">Int</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// Modern</span>
<span class="token keyword">let</span> zipcode <span class="token operator">=</span> <span class="token builtin">RealProperty</span><span class="token operator">&lt;</span><span class="token builtin">Int</span><span class="token operator">?</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>要するに<code>RealmOptional</code>を<code>RealmProperty</code>に書き換えて、明示的にオプショナルであることを宣言するようにすれば良い。</p>
<p><code>Int</code>だけじゃなくて<code>Bool</code>にも使える、便利。</p>
<p><code>Optional</code>だけじゃなくて他にもアップデートがあって、<code>UUID</code>や<code>NSUUID</code>も新たに保存できるようになったようです。</p>
<h2 id="extension-の書き方" tabindex="-1"><a class="header-anchor" href="#extension-の書き方" aria-hidden="true">#</a> Extension の書き方</h2>
<p>型が<code>Int</code>ではなくなったので Extension の書き方も変わりました。</p>
<p>例えば、強制的にアンラップするような以下のコードは次のように書き換えられます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Deprecated</span>
<span class="token keyword">extension</span> <span class="token builtin">RealmOptional</span> <span class="token keyword">where</span> <span class="token builtin">Value</span> <span class="token operator">==</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> intValue<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">guard</span> <span class="token keyword">let</span> value<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>value <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">0</span> <span class="token punctuation">}</span>
        <span class="token keyword">return</span> value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Modern</span>
<span class="token keyword">extension</span> <span class="token builtin">RealmProperty</span> <span class="token keyword">where</span> <span class="token builtin">Value</span> <span class="token operator">==</span> <span class="token builtin">Int</span><span class="token operator">?</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> intValue<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token punctuation">{</span>
        <span class="token keyword">guard</span> <span class="token keyword">let</span> value<span class="token punctuation">:</span> <span class="token builtin">Int</span> <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>value <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">0</span> <span class="token punctuation">}</span>
        <span class="token keyword">return</span> value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>まあそれだけで特に面白いところはなかったのですが。</p>
<p>記事は以上。</p>
</template>
