<template><h2 id="netlify-の最大の問題点" tabindex="-1"><a class="header-anchor" href="#netlify-の最大の問題点" aria-hidden="true">#</a> Netlify の最大の問題点</h2>
<p>Netlify は GitHub にプッシュされた内容を自動でビルドして更新してくれるというスグレモノではあるものの、無料枠が 300 分しかなくそれ以上のビルドをすると料金がかかってしまう仕組みになっている。</p>
<p>単なるウェブサイトなら気にもならないのだが、本ページのようなブログだと誤字修正などで頻繁にプッシュするため小さなビルド時間も積み重なってかなり食ってしまう。</p>
<p>現時点でも 58/300 を使い切ってしまっており、このままの更新ペースを維持した場合とても無料枠に収まりきりそうにないのである。</p>
<h2 id="github-actions-を使う" tabindex="-1"><a class="header-anchor" href="#github-actions-を使う" aria-hidden="true">#</a> GitHub Actions を使う</h2>
<p>その点、GitHub Actions であればパブリックなレポジトリに関してはビルド制限がまったくないのでこれを利用する。</p>
<div class="custom-container tip"><p class="custom-container-title">うちのブログは</p>
<p>うちのブログは Vssue を利用しているためにブログのレポジトリにプライベートキーが載っていたりする。</p>
<p>そのため公開レポジトリにはできないのだが、それでも GitHub Actions なら 2000 分のビルドクレジットがあるので Netlify の実に 6 倍以上である。当分、ビルド時間に関して心配は要らなさそうだ。</p>
</div>
<h2 id="実装してみる" tabindex="-1"><a class="header-anchor" href="#実装してみる" aria-hidden="true">#</a> 実装してみる</h2>
<p><a href="https://qiita.com/nwtgck/items/e9a355c2ccb03d8e8eb0" target="_blank" rel="noopener noreferrer">Netlifyへのデプロイをビルド時間0で行うためのGitHub Actions<OutboundLink/></a>でキーの取得から設定まで載っているので利用させていただきましょう。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>// キャッシュ無効
<span class="token key atrule">name</span><span class="token punctuation">:</span> Netlify

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>opened<span class="token punctuation">,</span> synchronize<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">18.04</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"14"</span>

      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn build

      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npx netlify<span class="token punctuation">-</span>cli deploy <span class="token punctuation">-</span><span class="token punctuation">-</span>prod <span class="token punctuation">-</span><span class="token punctuation">-</span>dir=./blog/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NETLIFY_AUTH_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NETLIFY_AUTH_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">NETLIFY_SITE_ID</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NETLIFY_SITE_ID <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>せっかくなので最新の Node.js を利用するようにしたのと、Netlify にデプロイするときにプロダクションとして扱うようにしました。</p>
<p>これで、GitHub にプッシュするだけで自動的にビルドが行われ、ビルドされたデータが Netlify に送られて更新されるというわけです。</p>
<div class="custom-container warning"><p class="custom-container-title">Netlify の設定</p>
<p>当たり前だが、Netlify からデプロイ時のビルドをしないように変更しておこう。</p>
<p>そうでないと二回ビルドされてしまって意味がない。</p>
</div>
<p>で、これでもいいのですが、どうせならキャッシュを使って GitHub Actions のビルド時間も減らします。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>// キャッシュ有効化
<span class="token key atrule">name</span><span class="token punctuation">:</span> Netlify

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>opened<span class="token punctuation">,</span> synchronize<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">18.04</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"14"</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Get yarn cache directory path
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache<span class="token punctuation">-</span>dir<span class="token punctuation">-</span>path
        <span class="token key atrule">run</span><span class="token punctuation">:</span> echo "<span class="token punctuation">:</span><span class="token punctuation">:</span>set<span class="token punctuation">-</span>output name=dir<span class="token punctuation">:</span><span class="token punctuation">:</span>$(yarn cache dir)"

      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache <span class="token comment"># use this to check for `cache-hit` (`steps.yarn-cache.outputs.cache-hit != 'true'`)</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.yarn<span class="token punctuation">-</span>cache<span class="token punctuation">-</span>dir<span class="token punctuation">-</span>path.outputs.dir <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles('<span class="token important">**/yarn.lock')</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ${{ runner.os }}-yarn-</span>

      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn build

      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npx netlify<span class="token punctuation">-</span>cli deploy <span class="token punctuation">-</span><span class="token punctuation">-</span>prod <span class="token punctuation">-</span><span class="token punctuation">-</span>dir=./blog/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NETLIFY_AUTH_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NETLIFY_AUTH_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">NETLIFY_SITE_ID</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NETLIFY_SITE_ID <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>初回のみ必ずキャッシュがミスヒットするので余計に時間がかかりますが、二回目以降は速くなるはずです。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">Using Cache</th>
<th style="text-align:center">Without Cache</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Set up job</td>
<td style="text-align:center">4s</td>
<td style="text-align:center">3s</td>
</tr>
<tr>
<td style="text-align:center">Run actions/checkout@v2</td>
<td style="text-align:center">6s</td>
<td style="text-align:center">4s</td>
</tr>
<tr>
<td style="text-align:center">Run actions/setup-node@v2</td>
<td style="text-align:center">1s</td>
<td style="text-align:center">1s</td>
</tr>
<tr>
<td style="text-align:center">Get yarn cache directory path</td>
<td style="text-align:center">2s</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Run actions/cache@v2</td>
<td style="text-align:center">1s</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Run yarn install</td>
<td style="text-align:center">34s</td>
<td style="text-align:center">28s</td>
</tr>
<tr>
<td style="text-align:center">Run yarn build</td>
<td style="text-align:center">66s</td>
<td style="text-align:center">65s</td>
</tr>
<tr>
<td style="text-align:center">Run npx netlify-cli deploy</td>
<td style="text-align:center">62s</td>
<td style="text-align:center">57s</td>
</tr>
<tr>
<td style="text-align:center">Post Run actions/cache@v2</td>
<td style="text-align:center">9s</td>
<td style="text-align:center">0s</td>
</tr>
<tr>
<td style="text-align:center">Post Run actions/checkout@v2</td>
<td style="text-align:center">0s</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Complete job</td>
<td style="text-align:center">0s</td>
<td style="text-align:center">0s</td>
</tr>
<tr>
<td style="text-align:center">Total</td>
<td style="text-align:center">200s</td>
<td style="text-align:center">158s</td>
</tr>
</tbody>
</table>
<p>一回目をやった感じだと 40 秒くらい遅い結果に。果たして二回目は？</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">Using Cache</th>
<th style="text-align:center">Using Cache</th>
<th style="text-align:center">Without Cache</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Set up job</td>
<td style="text-align:center">4s</td>
<td style="text-align:center">5s</td>
<td style="text-align:center">3s</td>
</tr>
<tr>
<td style="text-align:center">Run actions/checkout@v2</td>
<td style="text-align:center">6s</td>
<td style="text-align:center">7s</td>
<td style="text-align:center">4s</td>
</tr>
<tr>
<td style="text-align:center">Run actions/setup-node@v2</td>
<td style="text-align:center">1s</td>
<td style="text-align:center">0s</td>
<td style="text-align:center">1s</td>
</tr>
<tr>
<td style="text-align:center">Get yarn cache directory path</td>
<td style="text-align:center">2s</td>
<td style="text-align:center">4s</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Run actions/cache@v2</td>
<td style="text-align:center">1s</td>
<td style="text-align:center">2s</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Run yarn install</td>
<td style="text-align:center">34s</td>
<td style="text-align:center">11s</td>
<td style="text-align:center">28s</td>
</tr>
<tr>
<td style="text-align:center">Run yarn build</td>
<td style="text-align:center">66s</td>
<td style="text-align:center">65s</td>
<td style="text-align:center">65s</td>
</tr>
<tr>
<td style="text-align:center">Run npx netlify-cli deploy</td>
<td style="text-align:center">62s</td>
<td style="text-align:center">59s</td>
<td style="text-align:center">57s</td>
</tr>
<tr>
<td style="text-align:center">Post Run actions/cache@v2</td>
<td style="text-align:center">9s</td>
<td style="text-align:center">2s</td>
<td style="text-align:center">0s</td>
</tr>
<tr>
<td style="text-align:center">Post Run actions/checkout@v2</td>
<td style="text-align:center">0s</td>
<td style="text-align:center">1s</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Complete job</td>
<td style="text-align:center">0s</td>
<td style="text-align:center">0s</td>
<td style="text-align:center">0s</td>
</tr>
<tr>
<td style="text-align:center">Total</td>
<td style="text-align:center">200s</td>
<td style="text-align:center">156s</td>
<td style="text-align:center">158s</td>
</tr>
</tbody>
</table>
<p>思ったよりも速くならなかった！！！</p>
<p>まあでも三分以下でビルドできるということは一ヶ月に 600 回はブログを更新できるということです。一日 20 回ペースでプッシュしなければ大丈夫なので、まあ多分大丈夫でしょう。</p>
<p><code>yarn</code>ではなく<code>node_modules</code>自体をキャッシュしたほうが高速化できるそう（<code>yarn install</code>が一秒で終わるとかなんとか）なのですが、まあそんなに変わらないので今回はパスということで。</p>
<p>記事は以上。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/51IAyqqAEhL._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08KD4ZXQZ/?tag=tkgstrator0f-22" target="_blank">魔女の旅々 Blu-ray BOX 上巻</a></li>
<li class="price">￥11,880 (中古品)</li>
</ul>
</div>
</template>
