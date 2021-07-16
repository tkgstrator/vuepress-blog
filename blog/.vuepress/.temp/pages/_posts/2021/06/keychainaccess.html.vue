<template><h1 id="keychainaccess" tabindex="-1"><a class="header-anchor" href="#keychainaccess" aria-hidden="true">#</a> <a href="https://github.com/kishikawakatsumi/KeychainAccess" target="_blank" rel="noopener noreferrer">KeychainAccess<OutboundLink/></a></h1>
<p>KeychainAccess とは Keychain に簡単にアクセスすることができるライブラリのこと。</p>
<p>ユーザのパスワードのような気密性の高いデータは UserDefaults や DB ではなく Keychain に保存することが推奨されている。</p>
<p>その Keychain は使いにくいことで有名だったのだが、KeychainAccess を使うことで簡単に利用することができる。</p>
<p><a href="https://tkgstrator.work/posts/2021/04/15/keychain.html" target="_blank" rel="noopener noreferrer">前回の記事<OutboundLink/></a>では KeychainAccess を使ってデータ書き込みや読み込みを簡単にするための Extension について解説しました。</p>
<h2 id="service-と-server" tabindex="-1"><a class="header-anchor" href="#service-と-server" aria-hidden="true">#</a> Service と Server</h2>
<p>KeychainAccess ではインスタンス生成時に引数をつけることで<code>Server</code>か<code>Service</code>かのどちらかを選択することができます。</p>
<blockquote>
<p>ちなみに何もつけなかった場合にはアプリのバンドル ID がそのまま使われるみたいです</p>
</blockquote>
<p>今までは慣習的に<code>Server</code>を利用していたのですが、<code>Service</code>との違いは何なのでしょうか？</p>
<p>また、場合によっては一つのサービスについて複数のアカウント情報を保持し、ログイン時などにどちらのアカウントを選択するかユーザに選ばせたいような場合もあります。そのような複数アカウント機能を KeychainAccess で実装するにはどうすればよいでしょうか。</p>
<h3 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h3>
<p>公式ドキュメントにもあるようにウェブサイトでのパスコードの保存に使う。</p>
<p>例えば、以下のようなコードを書いたとしよう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> keychain<span class="token punctuation">:</span> <span class="token builtin">Keychain</span>
keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token string">"AAA"</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"AAA"</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// -> AAA</span>

keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token string">"BBB"</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"BBB"</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// -> BBB</span>

keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token string">"AAA"</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// -> BBB</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>二つのインスタンスは異なるものなので<code>AAA</code>の値は保存されそうなのだが、実は上書きされてしまう。</p>
<p>というのも、この<code>server</code>の値には URL に変換可能な文字列を代入する必要があるからだ。<code>KeychainAccess</code>ライブラリの内部で<code>String</code>から<code>URL</code>に変換される際に、変換不可能な倍には<code>server</code>には空文字が割り当てられている。</p>
<p><code>AAA</code>も<code>BBB</code>も URL に変換不可能なのでどちらも<code>server=&quot;&quot;</code>が割り当てられているのと同じ状態になり、そのため二つは同一のインスタンスになってしまっている。</p>
<p>そのため、データが上書きされてしまっているのだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> keychain<span class="token punctuation">:</span> <span class="token builtin">Keychain</span>
keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://tkgstrator.work"</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"AAA"</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// -> AAA</span>

keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://tkgstrator.works"</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"BBB"</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// -> BBB</span>

keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://tkgstrator.work"</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// -> AAA</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>このように URL に変換可能な文字列または直接 URL を指定した場合には正しくデータが保存される。</p>
<h3 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h3>
<p>基本的には Server と同じなのですが、任意の文字列が利用できるという点が異なります。それ以外は全て同じです。</p>
<h2 id="keychain-へのデータ保存" tabindex="-1"><a class="header-anchor" href="#keychain-へのデータ保存" aria-hidden="true">#</a> Keychain へのデータ保存</h2>
<p>ここを勘違いしてしまっていたのですが、Keychain へのデータの保存は辞書型ではないようです。</p>
<p>KeychainAccess のインスタンスの中身は以下のようになっており、これらが配列として保存されています。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">Server</th>
<th style="text-align:center">Service</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">authenticationType</td>
<td style="text-align:center">Enum</td>
<td style="text-align:center">Enum</td>
</tr>
<tr>
<td style="text-align:center">synchronizable</td>
<td style="text-align:center">Bool</td>
<td style="text-align:center">Bool</td>
</tr>
<tr>
<td style="text-align:center">accessGroup</td>
<td style="text-align:center">BundleID</td>
<td style="text-align:center">BundleID</td>
</tr>
<tr>
<td style="text-align:center">class</td>
<td style="text-align:center">Enum</td>
<td style="text-align:center">Enum</td>
</tr>
<tr>
<td style="text-align:center">key</td>
<td style="text-align:center">String</td>
<td style="text-align:center">String</td>
</tr>
<tr>
<td style="text-align:center">value</td>
<td style="text-align:center">Any</td>
<td style="text-align:center">Any</td>
</tr>
<tr>
<td style="text-align:center">accessibility</td>
<td style="text-align:center">Enum</td>
<td style="text-align:center">Enum</td>
</tr>
<tr>
<td style="text-align:center">protocol</td>
<td style="text-align:center">Enum</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">server</td>
<td style="text-align:center">URL</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">service</td>
<td style="text-align:center">-</td>
<td style="text-align:center">String</td>
</tr>
</tbody>
</table>
<p>つまり、例えば<code>keychain[&quot;price&quot;] = 100</code>のようなコードを書いたとしてもどこにも<code>keychain[&quot;price&quot;]</code>のデータはないということです。</p>
<p>じゃあどうやって保存されているのかというと、以下のように<code>key</code>が<code>price</code>で<code>value</code>が<code>100</code>のデータ（正確には上のようにもっといろんなデータが入っているが）が配列に追加されているだけだということです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
        <span class="token string">"key"</span><span class="token punctuation">:</span> <span class="token string">"price"</span><span class="token punctuation">,</span>
        <span class="token string">"value"</span><span class="token punctuation">:</span> <span class="token string">"100"</span><span class="token punctuation">,</span>
        <span class="token string">"server"</span><span class="token punctuation">:</span> <span class="token string">"tkgstrator.work"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string">"key"</span><span class="token punctuation">:</span> <span class="token string">"name"</span><span class="token punctuation">,</span>
        <span class="token string">"value"</span><span class="token punctuation">:</span> <span class="token string">"apple"</span>
        <span class="token string">"server"</span><span class="token punctuation">:</span> <span class="token string">"tkgstrator.work"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>これがどう困るかというと、サブアカウントのようなものを利用するときに困ります。</p>
<p>何故なら、このままだとどのアカウントのデータかを区別することができないからです。</p>
<p>値をユニークに保つために、Keychain では同一の<code>key</code>をもつことは許されていません。そうすれば単にデータが上書きされてしまうだけです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
        <span class="token string">"key"</span><span class="token punctuation">:</span> <span class="token string">"userId"</span><span class="token punctuation">,</span>
        <span class="token string">"value"</span><span class="token punctuation">:</span> <span class="token string">"XXXXXXXX"</span><span class="token punctuation">,</span>
        <span class="token string">"server"</span><span class="token punctuation">:</span> <span class="token string">"tkgstrator.work"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string">"key"</span><span class="token punctuation">:</span> <span class="token string">"userId"</span><span class="token punctuation">,</span>
        <span class="token string">"value"</span><span class="token punctuation">:</span> <span class="token string">"YYYYYYYY"</span><span class="token punctuation">,</span>
        <span class="token string">"server"</span><span class="token punctuation">:</span> <span class="token string">"tkgstrator.work"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>単なる配列ならこのようなデータも保存できますが、これは同一のキーなのでどちらか一方しか保存できません。最初に書き込んだ方のデータは失われます。</p>
<p>これの対策として考えられるのが<code>Server</code>ないしは<code>Service</code>の値を変更することです。こうすれば別のデータとして扱えます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">var</span> keychain<span class="token punctuation">:</span> <span class="token builtin">Keychain</span>
keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://tkgstrator.work/account01"</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
keychain<span class="token punctuation">[</span><span class="token string">"userId"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"XXXXXXXX"</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>server<span class="token punctuation">:</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://tkgstrator.work/account02"</span><span class="token punctuation">)</span><span class="token operator">!</span><span class="token punctuation">,</span> protocolType<span class="token punctuation">:</span> <span class="token punctuation">.</span>https<span class="token punctuation">)</span>
keychain<span class="token punctuation">[</span><span class="token string">"userId"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"YYYYYYYY"</span>
<span class="token function">print</span><span class="token punctuation">(</span>keychain<span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>つまり、このようにしてしまえば良いわけです。</p>
<p>ただし、この方法は次の観点から実装を見送りました。</p>
<ul>
<li>Keychain を切り替えるのがめんどくさい
<ul>
<li>切り替えるのは良いとして、そのための<code>Server</code>などのリストはどうやって保存するのか</li>
<li>それも Keychain に入れれば仕様がややこしくなってしまう</li>
</ul>
</li>
<li>アカウント数が増えたときに切り替えるのがめんどくさい
　　- アカウント数の分だけ Keychain のインスタンスを用意するのはめんどくさい</li>
</ul>
<h2 id="構造体を-keychain-に保存する" tabindex="-1"><a class="header-anchor" href="#構造体を-keychain-に保存する" aria-hidden="true">#</a> 構造体を Keychain に保存する</h2>
<p>そこで考えたのが、<code>userId = XXXXXXXX</code>のようなデータを保存するのではなく、キーとしてユーザ固有の値を与え、データにユーザ情報を全部入れてしまえばよいのではないかという方法でした。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Before</span>
keychain<span class="token punctuation">[</span><span class="token string">"userId"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"XXXXXXXX"</span>
keychain<span class="token punctuation">[</span><span class="token string">"password"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"YYYYYYYY"</span>
keychain<span class="token punctuation">[</span><span class="token string">"balancee"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"ZZZZZZZZ"</span>

<span class="token comment">// After</span>
keychain<span class="token punctuation">[</span><span class="token string">"XXXXXXXX"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">User</span><span class="token punctuation">(</span>password<span class="token punctuation">:</span> <span class="token string">"YYYYYYYY"</span><span class="token punctuation">,</span> balance<span class="token punctuation">:</span> <span class="token string">"ZZZZZZZZ"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>しかし、これはこのままではビルドが通りません。Keychain に保存できるのは Data 型が String 型だと決まっているからです。</p>
<h3 id="codable-を利用する" tabindex="-1"><a class="header-anchor" href="#codable-を利用する" aria-hidden="true">#</a> Codable を利用する</h3>
<p>ですが、Swift には構造体を Data 型に変換するためのプロトコルがあります。</p>
<p>それが当ブログでも何度か取り上げた<code>Codbale</code>というプロトコルで、これを使えば構造体を JSONEncoder で Data 型に変換できます。</p>
<p>いちいちデータをエンコードしたりデコードしたりはめんどくさいので、Extension を使ってそれらの部分をうまく処理してやりましょう。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Keychianに保存する構造体をCodable準拠にする</span>
<span class="token keyword">struct</span> <span class="token builtin">Account</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> userId<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">var</span> password<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token keyword">var</span> membership<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>構造体を Codable にするには単に適合させるだけで良いです。何か特別なことをする必要はありません。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// Extension</span>
<span class="token keyword">extension</span> <span class="token builtin">Keychain</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">setValue</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> account<span class="token punctuation">:</span> <span class="token builtin">Account</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> encoder<span class="token punctuation">:</span> <span class="token builtin">JSONEncoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> encoder <span class="token operator">=</span> <span class="token function">JSONEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            encoder<span class="token punctuation">.</span>keyEncodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertToSnakeCase
            <span class="token keyword">return</span> encoder
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> encoder<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>account<span class="token punctuation">)</span>
        <span class="token keyword">try</span> <span class="token keyword">set</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> key<span class="token punctuation">:</span> forKey<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">getValue</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Account</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertFromSnakeCase
            <span class="token keyword">return</span> decoder
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">guard</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token function">getData</span><span class="token punctuation">(</span>forKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">Account</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token function">fatalError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>これはエラーを認めてそれを返すようなメソッドですが、ネットワークからレスポンスを受け取っているわけではないので実際にエラーが発生することは（おそらく殆どない）と思われます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// エラーを握りつぶす場合</span>
<span class="token keyword">extension</span> <span class="token builtin">Keychain</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">setValue</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> account<span class="token punctuation">:</span> <span class="token builtin">Account</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> encoder<span class="token punctuation">:</span> <span class="token builtin">JSONEncoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> encoder <span class="token operator">=</span> <span class="token function">JSONEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            encoder<span class="token punctuation">.</span>keyEncodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertToSnakeCase
            <span class="token keyword">return</span> encoder
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">guard</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> encoder<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>account<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
        <span class="token keyword">try</span><span class="token operator">?</span> <span class="token keyword">set</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> key<span class="token punctuation">:</span> forKey<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">func</span> <span class="token function">getValue</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Account</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertFromSnakeCase
            <span class="token keyword">return</span> decoder
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">guard</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token function">getData</span><span class="token punctuation">(</span>forKey<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token constant">nil</span> <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">try</span><span class="token operator">?</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token builtin">Account</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>エラーが発生しないようなケースであれば<code>try?</code>でエラーを握りつぶしてしまうのもアリです。</p>
<p>自分の場合はエラーが発生しないケースでしたので、後者を選択しました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">extension</span> <span class="token builtin">Keychain</span> <span class="token punctuation">{</span>
    <span class="token keyword">func</span> <span class="token function">removeValue</span><span class="token punctuation">(</span>account<span class="token punctuation">:</span> <span class="token builtin">Account</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token operator">?</span> <span class="token function">remove</span><span class="token punctuation">(</span>account<span class="token punctuation">.</span>userId<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>最後に、データを削除できるようにしておいても良いかもしれません。</p>
<h3 id="使い方" tabindex="-1"><a class="header-anchor" href="#使い方" aria-hidden="true">#</a> 使い方</h3>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>service<span class="token punctuation">:</span> <span class="token string">"work.tkgstrator"</span><span class="token punctuation">)</span>

<span class="token comment">// データ読み込み(ない場合はnilが返ってくる)</span>
<span class="token keyword">guard</span> <span class="token keyword">let</span> account <span class="token operator">=</span> keychain<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token string">"tkgling"</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>

<span class="token comment">// データ書き込み</span>
<span class="token keyword">let</span> account<span class="token punctuation">:</span> <span class="token builtin">Account</span> <span class="token operator">=</span> <span class="token function">Account</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
keychain<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>account<span class="token punctuation">:</span> account<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="構造体が-nil-を許容する場合" tabindex="-1"><a class="header-anchor" href="#構造体が-nil-を許容する場合" aria-hidden="true">#</a> 構造体が Nil を許容する場合</h3>
<p>構造体にオプショナル型のプロパティをつけても正しく動作しました。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">struct</span> <span class="token builtin">Account</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> userId<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token operator">?</span>
    <span class="token keyword">var</span> password<span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token operator">?</span>
    <span class="token keyword">var</span> membership<span class="token punctuation">:</span> <span class="token builtin">Bool</span>

    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ただし、キーだけはオプショナルではダメなので、今回のように<code>userId</code>をキーにする場合は書き込む前に<code>userId</code>が<code>nil</code>でないかだけはチェックする必要があります。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> keychain <span class="token operator">=</span> <span class="token function">Keychain</span><span class="token punctuation">(</span>service<span class="token punctuation">:</span> <span class="token string">"work.tkgstrator"</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> account<span class="token punctuation">:</span> <span class="token builtin">Account</span> <span class="token operator">=</span> <span class="token function">Account</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
account<span class="token punctuation">.</span>userId <span class="token operator">=</span> <span class="token string">"tkgstrator"</span>
keychain<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>account<span class="token punctuation">:</span> account<span class="token punctuation">)</span>

<span class="token keyword">guard</span> <span class="token keyword">let</span> account <span class="token operator">=</span> keychain<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>userId<span class="token punctuation">:</span> <span class="token string">"tkgstrator"</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
<span class="token function">print</span><span class="token punctuation">(</span>account<span class="token punctuation">)</span>
<span class="token comment">// Account(userId: Optional("tkgstrator"), password: nil, membership: nil)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>こうすれば直感的にデータを取得できるので便利でした。</p>
</template>
