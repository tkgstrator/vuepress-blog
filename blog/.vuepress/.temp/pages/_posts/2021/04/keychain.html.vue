<template><h2 id="keychain" tabindex="-1"><a class="header-anchor" href="#keychain" aria-hidden="true">#</a> Keychain</h2>
<p>そもそも Keychain を使うメリットは何なのかという事になります。</p>
<p>似たような仕組みに UserDefaults があるのですが、何が違うのかを考えてみましょう。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">UserDefaults</th>
<th style="text-align:center">Keychain</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">アプリ削除</td>
<td style="text-align:center">データ消失</td>
<td style="text-align:center">消えない</td>
</tr>
<tr>
<td style="text-align:center">データ保存先</td>
<td style="text-align:center">アプリ内</td>
<td style="text-align:center">Keychain</td>
</tr>
<tr>
<td style="text-align:center">暗号化</td>
<td style="text-align:center">されない</td>
<td style="text-align:center">される</td>
</tr>
<tr>
<td style="text-align:center">データの共有</td>
<td style="text-align:center">不可</td>
<td style="text-align:center">条件を満たせば可能</td>
</tr>
<tr>
<td style="text-align:center">他アプリからのデータ共有</td>
<td style="text-align:center">不可</td>
<td style="text-align:center">条件を満たせば可能</td>
</tr>
<tr>
<td style="text-align:center">利用目的</td>
<td style="text-align:center">非セキュアなデータ保存</td>
<td style="text-align:center">パスコードなどの保存</td>
</tr>
</tbody>
</table>
<p>データを共有するかどうかはおいといて、セキュアにデータを保存できるのが Keychain の強みとなります。アプリを削除してもデータが消えないというのは便利な気がしますね。</p>
<p>例えば Salmonia であれば Keychain に iksm_session を保存しておけばアプリを削除しても復活できるのは便利です。</p>
<h3 id="keychainaccess" tabindex="-1"><a class="header-anchor" href="#keychainaccess" aria-hidden="true">#</a> KeychainAccess</h3>
<p>Keychain にアクセスするのはめんどくさいのですが、<a href="https://github.com/kishikawakatsumi/KeychainAccess" target="_blank" rel="noopener noreferrer">KeychainAccess<OutboundLink/></a>というライブラリを使えば簡単にアクセスできます。</p>
<p>が、これを使っても少し面倒な一面があるのでそれを更に便利にするための Extension を考えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">KeychainAccess</span>

<span class="token keyword">var</span> keychain<span class="token punctuation">:</span> <span class="token builtin">Keychain</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> server <span class="token operator">=</span> <span class="token string">"tkgstrator.work"</span>
    <span class="token keyword">return</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> server<span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token builtin">KeyType</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> iksmSession <span class="token operator">=</span> <span class="token string">"iksmSession"</span>
    <span class="token keyword">case</span> sessionToken <span class="token operator">=</span> <span class="token string">"sessionToken"</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">Keychain</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">setValue</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token builtin">KeyType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token operator">?</span> keychain<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> key<span class="token punctuation">:</span> forKey<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">getValue</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token builtin">KeyType</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">String</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">try</span><span class="token operator">?</span> keychain<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>forKey<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">remove</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token builtin">KeyType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token operator">?</span> keychain<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token constant">nil</span><span class="token punctuation">,</span> key<span class="token punctuation">:</span> forKey<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span>

        <span class="token comment">// こっちでもいけるかも</span>
        <span class="token keyword">try</span><span class="token operator">?</span> keychain<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>forKey<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>例えば上のような Extension を考えます。すると以下のようなコードでデータの読み書きができるようになります。</p>
<p>今回データの読み書きに Enum を使ったのは Typo によるキー指定のミスをなくすためです。キーの数が多ければミスも増えると思うので、Enum を使ったほうが良いかもしれません。</p>
<p>ただ、Enum が多いと書くのが面倒なので一つや二つくらいであれば直接指定でもいいのかも。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// データ保存</span>
keychain<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token string">"IKSM SESSION"</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>iksmSession<span class="token punctuation">)</span>

<span class="token comment">// データ取得</span>
<span class="token keyword">let</span> iksmSession <span class="token operator">=</span> keychain<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>iksmSession<span class="token punctuation">)</span>

<span class="token comment">// データ削除</span>
keychain<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>iksmSession<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>NSData や String の保存には対応しているっぽいのですが、Bool や Int の保存は現状できないっぽい感じでしょうか。まあ必要とあらば上手く変換したりすればいけるのではないかと思います。</p>
<p>@<a href="https://www.youtube.com/watch?v=9fQr8ykquCA" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
</template>
