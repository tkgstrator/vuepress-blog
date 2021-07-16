<template><h2 id="google-schedule-api" tabindex="-1"><a class="header-anchor" href="#google-schedule-api" aria-hidden="true">#</a> Google Schedule API</h2>
<p><a href="https://console.developers.google.com/start/api?id=calendar&amp;hl=ja" target="_blank" rel="noopener noreferrer">ここ<OutboundLink/></a>からプロジェクト作成と API の有効化を行なう。</p>
<p>OAuth 2.0 の認証情報を設定し、最後に認証情報を JSON として保存。</p>
<p>すると、以下のような JSON ファイルがダウンロードされるはず。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"installed"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"client_id"</span><span class="token operator">:</span> <span class="token string">"XXXXXXXXXXX-YYYYYYYYYYYYYYYYY.apps.googleusercontent.com"</span><span class="token punctuation">,</span>
    <span class="token property">"project_id"</span><span class="token operator">:</span> <span class="token string">"local-reference-XXXXXX"</span><span class="token punctuation">,</span>
    <span class="token property">"auth_uri"</span><span class="token operator">:</span> <span class="token string">"https://accounts.google.com/o/oauth2/auth"</span><span class="token punctuation">,</span>
    <span class="token property">"token_uri"</span><span class="token operator">:</span> <span class="token string">"https://oauth2.googleapis.com/token"</span><span class="token punctuation">,</span>
    <span class="token property">"auth_provider_x509_cert_url"</span><span class="token operator">:</span> <span class="token string">"https://www.googleapis.com/oauth2/v1/certs"</span><span class="token punctuation">,</span>
    <span class="token property">"client_secret"</span><span class="token operator">:</span> <span class="token string">"ZZZZZZZZZZZZZZZZZZZZ"</span><span class="token punctuation">,</span>
    <span class="token property">"redirect_uris"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"urn:ietf:wg:oauth:2.0:oob"</span><span class="token punctuation">,</span> <span class="token string">"http://localhost"</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>取得した JSON を適当に <code>credentials.json</code>という名前に変更。この名前にするのは特に理由はなくて、Google のチュートリアルがそうなっているから。</p>
<h2 id="python-で実装" tabindex="-1"><a class="header-anchor" href="#python-で実装" aria-hidden="true">#</a> Python で実装</h2>
<p>一番ラクなのは Python なので Python でいろいろ動かしていきます。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> __future__ <span class="token keyword">import</span> print_function
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime
<span class="token keyword">import</span> os<span class="token punctuation">.</span>path
<span class="token keyword">import</span> json
<span class="token keyword">from</span> googleapiclient<span class="token punctuation">.</span>discovery <span class="token keyword">import</span> _discovery_service_uri_options<span class="token punctuation">,</span> build
<span class="token keyword">from</span> google_auth_oauthlib<span class="token punctuation">.</span>flow <span class="token keyword">import</span> InstalledAppFlow
<span class="token keyword">from</span> google<span class="token punctuation">.</span>auth<span class="token punctuation">.</span>transport<span class="token punctuation">.</span>requests <span class="token keyword">import</span> Request
<span class="token keyword">from</span> google<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>credentials <span class="token keyword">import</span> Credentials

<span class="token comment"># カレンダーに対して読み書きできるスコープを設定</span>
SCOPES <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"https://www.googleapis.com/auth/calendar"</span><span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 初回起動は token.jsonがないので認証が必要になる</span>
    creds <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token string">"token.json"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        creds <span class="token operator">=</span> Credentials<span class="token punctuation">.</span>from_authorized_user_file<span class="token punctuation">(</span><span class="token string">"token.json"</span><span class="token punctuation">,</span> SCOPES<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> creds <span class="token keyword">or</span> <span class="token keyword">not</span> creds<span class="token punctuation">.</span>valid<span class="token punctuation">:</span>
        <span class="token keyword">if</span> creds <span class="token keyword">and</span> creds<span class="token punctuation">.</span>expired <span class="token keyword">and</span> creds<span class="token punctuation">.</span>refresh_token<span class="token punctuation">:</span>
            creds<span class="token punctuation">.</span>refresh<span class="token punctuation">(</span>Request<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            flow <span class="token operator">=</span> InstalledAppFlow<span class="token punctuation">.</span>from_client_secrets_file<span class="token punctuation">(</span>
                <span class="token string">"credentials.json"</span><span class="token punctuation">,</span> SCOPES<span class="token punctuation">)</span>
            creds <span class="token operator">=</span> flow<span class="token punctuation">.</span>run_local_server<span class="token punctuation">(</span>port<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token comment"># 二回目以降は token.json を読み込む</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"token.json"</span><span class="token punctuation">,</span> <span class="token string">"w"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> token<span class="token punctuation">:</span>
            token<span class="token punctuation">.</span>write<span class="token punctuation">(</span>creds<span class="token punctuation">.</span>to_json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    service <span class="token operator">=</span> build<span class="token punctuation">(</span><span class="token string">"calendar"</span><span class="token punctuation">,</span> <span class="token string">"v3"</span><span class="token punctuation">,</span> credentials<span class="token operator">=</span>creds<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>実行すると認証用の URL にとばされる。このとき、たとえプロジェクトを作成したアカウントであっても信頼できるユーザに追加されていないとアクセスが拒否されてしまう。</p>
<p>OAuth 同意画面から「信頼できるユーザ」として追加するのを忘れないようにしておこう。</p>
<h2 id="予定の書き込み" tabindex="-1"><a class="header-anchor" href="#予定の書き込み" aria-hidden="true">#</a> 予定の書き込み</h2>
<p>予定を書き込むには以下のフォーマットが使える。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>body <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"summary"</span><span class="token punctuation">:</span> <span class="token string">"SUMMARY"</span>
    <span class="token string">"start"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"dateTime"</span><span class="token punctuation">:</span> <span class="token string">"START TIME WITH ISO FORMAT"</span><span class="token punctuation">,</span>
        <span class="token string">"timeZone"</span><span class="token punctuation">:</span> <span class="token string">"TIMEZONE"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">"end"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"dateTime"</span><span class="token punctuation">:</span> <span class="token string">"END TIME WITH ISO FORMAT"</span><span class="token punctuation">,</span>
        <span class="token string">"timeZone"</span><span class="token punctuation">:</span> <span class="token string">"TIMEZONE"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
event <span class="token operator">=</span> service<span class="token punctuation">.</span>events<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>insert<span class="token punctuation">(</span>calendarId<span class="token operator">=</span><span class="token string">"primary"</span><span class="token punctuation">,</span> body<span class="token operator">=</span>body<span class="token punctuation">)</span><span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>カレンダー ID は<code>primary</code>を設定しているけれど、自分が作成したカレンダー ID なら何でも使えます。</p>
<p>例えば以前に解説した<a href="https://tkgstrator.work/posts/2021/05/10/googlecalendar.html" target="_blank" rel="noopener noreferrer">サーモンランのシフトのカレンダー<OutboundLink/></a>の ID は<code>9ojdd871h0bjhutscdulijib1g@group.calendar.google.com</code>になります。この値はカレンダーの設定から「カレンダーの統合」を参照すれば見ることができます。</p>
<p><code>colorId</code>などで色を付けることもできるのですが、共有すると色の設定は消えてしまうのであまり意味がなかったりします。あくまで個人用の設定です。</p>
<p>サーモンランのシフトをカレンダーに登録するときは UNIX のタイムスタンプを ISO フォーマットに変換して～という処理を行いました。</p>
<p>変換自体は以下のようなコードで行なえます。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime

start_time <span class="token operator">=</span> datetime<span class="token punctuation">.</span>fromtimestamp<span class="token punctuation">(</span>schedule<span class="token punctuation">[</span><span class="token string">"start_time"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>isoformat<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>もしもコードを全文見たい方がいれば<a href="https://gist.github.com/tkgstrator/030f5a98bea56b7e33c5e00cf897caf9" target="_blank" rel="noopener noreferrer">GitHub Gist<OutboundLink/></a>で公開しているのでご自由に改変してどうぞ。</p>
<p>Salmonia シリーズでも利用している第 1 回から第 914 回までの全シフトの情報もついでに公開しているのでご自由にご利用下さい。</p>
<p>というかこれ、次のシフトが公開されたときに自分でまたカレンダーに登録するために使いそうですね。</p>
<p>記事は以上。</p>
</template>
