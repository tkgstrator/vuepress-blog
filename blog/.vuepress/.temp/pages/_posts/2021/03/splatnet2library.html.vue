<template><h2 id="splatnet2-ライブラリ" tabindex="-1"><a class="header-anchor" href="#splatnet2-ライブラリ" aria-hidden="true">#</a> SplatNet2 ライブラリ</h2>
<p><a href="https://github.com/tkgstrator/SplatNet2/tree/develop" target="_blank" rel="noopener noreferrer">SplatNet2<OutboundLink/></a></p>
<p>Swift で簡単に API を叩けるライブラリ、のつもりで作成したのだがあまりにもゴミコードだったので泣いています。</p>
<p>まあ簡単にいえば iksm_session をとってきたり更新したり、サーモンラン用のリザルトをとってきたりとできるコードだったのですがあまりに酷いので書き直すことにしました。</p>
<p>iOS13 以降には Combine という面白い仕組みがあるのでこれを利用すればクロージャの数を減らしつつ良いコードが書けそうな気がします。</p>
<p>Salmonia3 は以下の参考記事を利用させていただいて Realm にデータを書き込む際に Codable を使って一気に変換しているのですが、よく考えたら API のレスポンスをライブラリが上手く整形してやればこんな処理は不要なわけです。</p>
<p><a href="https://qiita.com/cottpan/items/b75abd5d4e4ce73e00f2" target="_blank" rel="noopener noreferrer">【Swift4】Realm+Codableを使ったお手軽なDB Part.1（モデル編）<OutboundLink/></a></p>
<p>つまり、何らかのクラスや構造体を返してしまえばいちいちキーなんて使わなくてもメンバ変数を使ってパパっと値をとってこれるわけです。</p>
<p>ライブラリからエラーを起こさずに値が返ってきている時点でちゃんとデータが入っていることは間違いなく、（返り値に対する）バリデーションも不要になります。これはなんか高便利そうですね？</p>
<h2 id="combine-alamofire" tabindex="-1"><a class="header-anchor" href="#combine-alamofire" aria-hidden="true">#</a> Combine + Alamofire</h2>
<p>というわけで、以下の記事を参考に Combine を使ってタスクを渡してそれをクロージャで処理できるライブラリをつくることにしました。</p>
<p><a href="https://qiita.com/shira-shun/items/778e65308f26860664fc" target="_blank" rel="noopener noreferrer">Combine+Alamofire+SwiftUIでAPI実行<OutboundLink/></a></p>
<p>クロージャを使う仕組みは<code>@escaping</code>を使うのと対して変わらないのですが、API を叩く際のプロトコルを決めておくことで新しいエンドポイントがでたときにも柔軟に対応することができます。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">APIProtocol</span> <span class="token punctuation">{</span>
    associatedtype <span class="token builtin">ResponseType</span><span class="token punctuation">:</span> <span class="token builtin">Decodable</span>

    <span class="token keyword">var</span> method<span class="token punctuation">:</span> <span class="token builtin">HTTPMethod</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> baseURL<span class="token punctuation">:</span> <span class="token constant">URL</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> path<span class="token punctuation">:</span> <span class="token builtin">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token keyword">set</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">[</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> allowConstrainedNetworkAccess<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">APIProtocol</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> baseURL<span class="token punctuation">:</span> <span class="token constant">URL</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string">"https://app.splatoon2.nintendo.net/api/"</span><span class="token punctuation">)</span><span class="token operator">!</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> headers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">String</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">[</span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">nil</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> allowConstrainedNetworkAccess<span class="token punctuation">:</span> <span class="token builtin">Bool</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>そして API プロトコルを継承したリクエストプロトコルを作ります</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">protocol</span> <span class="token builtin">RequestProtocol</span><span class="token punctuation">:</span> <span class="token builtin">APIProtocol</span><span class="token punctuation">,</span> <span class="token builtin">URLRequestConvertible</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> parameters<span class="token punctuation">:</span> <span class="token builtin">Parameters</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">JSONEncoding</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">extension</span> <span class="token builtin">RequestProtocol</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> encoding<span class="token punctuation">:</span> <span class="token builtin">JSONEncoding</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">JSONEncoding</span><span class="token punctuation">.</span><span class="token keyword">default</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">func</span> <span class="token function">asURLRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">URLRequest</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> request <span class="token operator">=</span> <span class="token function">URLRequest</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> baseURL<span class="token punctuation">.</span><span class="token function">appendingPathComponent</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span>
        request<span class="token punctuation">.</span>httpMethod <span class="token operator">=</span> method<span class="token punctuation">.</span>rawValue
        request<span class="token punctuation">.</span>allHTTPHeaderFields <span class="token operator">=</span> headers
        request<span class="token punctuation">.</span>timeoutInterval <span class="token operator">=</span> <span class="token function">TimeInterval</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
        request<span class="token punctuation">.</span>allowsConstrainedNetworkAccess <span class="token operator">=</span> allowConstrainedNetworkAccess

        <span class="token keyword">if</span> <span class="token keyword">let</span> params <span class="token operator">=</span> parameters <span class="token punctuation">{</span>
            request <span class="token operator">=</span> <span class="token keyword">try</span> encoding<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> with<span class="token punctuation">:</span> params<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> request
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>ここでは Alamofire の構造体が良かったのでそのまま利用したとのこと。なので<code>import Alamofire</code>を忘れないようにしましょう。</p>
<p>参考記事では URLEncoding を採用していますが、SplatNet2 はほぼすべてのリクエストで JSONEncoding しかつかわないので問題ないでしょう。唯一の例外が s2s API なのですがそれはそれでまた別の話。</p>
<p>なので Encoding として型は JSONEncoding ではなくて Encoding のようなものを持ちたかったのですが、それがなかったので少し別の方法を考えなくてはいけません。</p>
<p><code>asURLRequest()</code>で URLRequest を作成してそれを Alamofire で実行するという仕組みです。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">Foundation</span>
<span class="token keyword">import</span> <span class="token builtin">Combine</span>
<span class="token keyword">import</span> <span class="token builtin">Alamofire</span>
<span class="token keyword">import</span> <span class="token builtin">SwiftyJSON</span>

<span class="token keyword">struct</span> <span class="token builtin">NetworkPublisher</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">let</span> contentType <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"application/json"</span><span class="token punctuation">[</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">let</span> retryCount <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">static</span> <span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">static</span> <span class="token keyword">func</span> publish<span class="token operator">&lt;</span>T<span class="token punctuation">:</span> <span class="token builtin">RequestProtocol</span><span class="token punctuation">,</span> V<span class="token punctuation">:</span> <span class="token builtin">Decodable</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token number">_</span> request<span class="token punctuation">:</span> T<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">Future</span><span class="token operator">&lt;</span>V<span class="token punctuation">.</span><span class="token builtin">ResponseType</span><span class="token punctuation">,</span> <span class="token builtin">APIError</span><span class="token operator">></span> <span class="token punctuation">{</span>

        <span class="token keyword">return</span> <span class="token builtin">Future</span> <span class="token punctuation">{</span> promise <span class="token keyword">in</span>
            <span class="token keyword">let</span> alamofire <span class="token operator">=</span> <span class="token constant">AF</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>statusCode<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token number">300</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>contentType<span class="token punctuation">:</span> contentType<span class="token punctuation">)</span>
                <span class="token punctuation">.</span>cURLDescription <span class="token punctuation">{</span> request <span class="token keyword">in</span>
                    <span class="token function">print</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token punctuation">.</span>responseJSON <span class="token punctuation">{</span> response <span class="token keyword">in</span>
                    <span class="token keyword">switch</span> response<span class="token punctuation">.</span>result <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token keyword">let</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
                        <span class="token keyword">do</span> <span class="token punctuation">{</span>
                            <span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token function">JSON</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rawData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>V<span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> json<span class="token punctuation">)</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
                            <span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                            <span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token builtin">APIError</span><span class="token punctuation">.</span>invalid<span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                    <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span>
                        <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
                        <span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token builtin">APIError</span><span class="token punctuation">.</span>failure<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            alamofire<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token builtin">APIError</span><span class="token punctuation">:</span> <span class="token builtin">Error</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> failure
    <span class="token keyword">case</span> invalid
    <span class="token keyword">case</span> requests
    <span class="token keyword">case</span> unavailable
    <span class="token keyword">case</span> upgrade
    <span class="token keyword">case</span> unknown
    <span class="token keyword">case</span> badrequests
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><p>今回は意味もなく（おい）SwiftyJSON を導入しているので JSONDecoder のところの記述が少し異なります。</p>
<p>まあ多分気にしなくても大丈夫。</p>
<h2 id="進捗情報" tabindex="-1"><a class="header-anchor" href="#進捗情報" aria-hidden="true">#</a> 進捗情報</h2>
<p>とりあえずリザルトの ID をを指定すれば取得できるようにはなりました。</p>
<p>SplatNet2 のバグなのかは知らないのですが、イベントなしの WAVE のキーが water-levels とかいう謎な値になっています。まあひょっとしたら-と返すのがダサくてそうしたのかもしれません。</p>
<p>Wave も Event も Enum でそれぞれ値があるのですが、このまま文字列で返したほうがいいのかどうかは考えどころですね。</p>
<p>いまは Swift 風に LCC で変数名を設定していて、ネストも SplatNet2 準拠なのですが時刻のデータなどは普通にネストに入れてしまってもいいような気がします（startTime、endTime、playTime）の三つが並んでいるのが若干違和感。</p>
<p>で、ここまで書いておいてステージ ID が取れていないことに気付いたのですが、今日中に頑張って直したいと思います。</p>
</template>
