<template><h2 id="salmonia3-の開発について" tabindex="-1"><a class="header-anchor" href="#salmonia3-の開発について" aria-hidden="true">#</a> Salmonia3 の開発について</h2>
<p>今更感は否めないのだが、なんだかんだで開発は続いています。</p>
<p>2022 年の 1 月 1 日までサーモンランのシフトは公開されているので、まあ半年前までにはいいところまで完成させたいですよね。最初は 2 の機能を引き継ぐ感じで開発をしていたのですが、ライブラリを勉強する機会があったので通信部分をライブラリに置き換えて開発しようということになりました。</p>
<p>で、ライブラリ開発やネットワーク部分は初めて扱うので少々時間がかかってしまいました。四月の段階でやたらとプログラミングの記事が多かったのはその通信部分をずっと勉強していたからです。</p>
<h2 id="ライブラリのメリット" tabindex="-1"><a class="header-anchor" href="#ライブラリのメリット" aria-hidden="true">#</a> ライブラリのメリット</h2>
<p>苦労してライブラリを導入するメリットが何なのかということなのですが、一番は自分のプログラミング技術の向上です。また、ライブラリとして公開することで誰でも簡単に導入できるので別のアプリを作成するときにいちいち通信部分を気にしなくて良くなります。</p>
<p>これだけだと開発者側しかメリットがなさそうですが、それ以外にも利用者側にも大きなメリットがあります。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">ライブラリ</th>
<th style="text-align:center">旧式</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">レスポンス</td>
<td style="text-align:center">構造体</td>
<td style="text-align:center">JSON</td>
</tr>
<tr>
<td style="text-align:center">導入</td>
<td style="text-align:center">簡単</td>
<td style="text-align:center">自分で実装</td>
</tr>
<tr>
<td style="text-align:center">セッション再生成</td>
<td style="text-align:center">自動</td>
<td style="text-align:center">手動</td>
</tr>
<tr>
<td style="text-align:center">アカウントデータ</td>
<td style="text-align:center">Keychain に保存</td>
<td style="text-align:center">DB や UserDefaults に保存</td>
</tr>
<tr>
<td style="text-align:center">アプリアンインストール時</td>
<td style="text-align:center">データを保持</td>
<td style="text-align:center">データが消滅</td>
</tr>
<tr>
<td style="text-align:center">非同期通信</td>
<td style="text-align:center">自動</td>
<td style="text-align:center">手動</td>
</tr>
</tbody>
</table>
<p>まず、今回のライブラリではニンテンドーオンラインにログインするための情報をセキュアな情報として Keychain に保存することにしました。今まではデータベースや UserDefaults という領域に保存していたので（一応安全とはいえ）ちょっとセキュリティ的に怪しいところがあったのですが、Keychain を使うことで安全性が増しました。</p>
<p>また、Keychain はアプリとは別にデータが保存されているので、アプリを削除したとしても iTunes アカウントにログイン情報が残っています。機種変更しても iPhone がウェブサイトのパスワードを覚えていて自動入力できるのをご存知だと思うのですが、あれと同じ原理です。</p>
<p>つまり、アプリの不具合などでアンインストールした場合でも再ログインは不要です。</p>
<h2 id="ライブラリのデメリット" tabindex="-1"><a class="header-anchor" href="#ライブラリのデメリット" aria-hidden="true">#</a> ライブラリのデメリット</h2>
<p>更に、ライブラリは JSON を構造体に変換して返してくれます。これによって、開発者がキーの値を間違えたり型を勘違いしたりすることもなくなります。</p>
<p>まさにいいことづくめではないかとおもっていたのですが、ここで大きな問題が発生しました。</p>
<p>それは、リザルトを Salmon Stats にアップロードするときには JSON または String 型ではないといけないということでした。</p>
<p>というのも、ライブラリは元の JSON を構造体に変換するときに「流石にこのデータは要らないでしょ」というデータを全て捨ててしまっているためです。構造体自体は Codable に準拠しているので構造体を JSON に再び変換することは可能なのですが、ネストが変わってしまっているために Salmon Stats が受け付けることのできないデータに変わってしまっているのです。</p>
<div class="custom-container tip"><p class="custom-container-title">構造体から JSON に復元したデータ</p>
<p>より洗練されたデータ構造（自称）にしているため、いくつかのデータが失われている。</p>
<p>例えば、本来は何のオオモノをたおしたかというデータは配列ではなく辞書配列なのだがそれらのデータはここでは失われている。</p>
</div>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"golden_eggs"</span><span class="token operator">:</span> <span class="token number">136</span><span class="token punctuation">,</span>
  <span class="token property">"grade_point"</span><span class="token operator">:</span> <span class="token number">999</span><span class="token punctuation">,</span>
  <span class="token property">"power_eggs"</span><span class="token operator">:</span> <span class="token number">4435</span><span class="token punctuation">,</span>
  <span class="token property">"wave_details"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"golden_ikura_pop_num"</span><span class="token operator">:</span> <span class="token number">59</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">48</span><span class="token punctuation">,</span>
      <span class="token property">"water_level"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">1545</span><span class="token punctuation">,</span>
      <span class="token property">"quota_num"</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
      <span class="token property">"event_type"</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"golden_ikura_pop_num"</span><span class="token operator">:</span> <span class="token number">66</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
      <span class="token property">"water_level"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">1945</span><span class="token punctuation">,</span>
      <span class="token property">"quota_num"</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
      <span class="token property">"event_type"</span><span class="token operator">:</span> <span class="token number">6</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"golden_ikura_pop_num"</span><span class="token operator">:</span> <span class="token number">69</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">46</span><span class="token punctuation">,</span>
      <span class="token property">"water_level"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">945</span><span class="token punctuation">,</span>
      <span class="token property">"quota_num"</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
      <span class="token property">"event_type"</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"boss_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"time"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"start_time"</span><span class="token operator">:</span> <span class="token number">1611360000</span><span class="token punctuation">,</span>
    <span class="token property">"end_time"</span><span class="token operator">:</span> <span class="token number">1611511200</span><span class="token punctuation">,</span>
    <span class="token property">"play_time"</span><span class="token operator">:</span> <span class="token number">1611395933</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"kuma_point"</span><span class="token operator">:</span> <span class="token number">687</span><span class="token punctuation">,</span>
  <span class="token property">"results"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"special_id"</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
      <span class="token property">"special_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"weapon_list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1010</span><span class="token punctuation">,</span> <span class="token number">2050</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"boss_kill_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
      <span class="token property">"dead_count"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">910</span><span class="token punctuation">,</span>
      <span class="token property">"player_type"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"species"</span><span class="token operator">:</span> <span class="token string">"inklings"</span><span class="token punctuation">,</span>
        <span class="token property">"style"</span><span class="token operator">:</span> <span class="token string">"girl"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">"help_count"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"まゆしぃのかみ"</span><span class="token punctuation">,</span>
      <span class="token property">"pid"</span><span class="token operator">:</span> <span class="token string">"3f89c3791c43ea57"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"special_id"</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
      <span class="token property">"special_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"weapon_list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2050</span><span class="token punctuation">,</span> <span class="token number">1010</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"boss_kill_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
      <span class="token property">"dead_count"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">1337</span><span class="token punctuation">,</span>
      <span class="token property">"player_type"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"species"</span><span class="token operator">:</span> <span class="token string">"inklings"</span><span class="token punctuation">,</span>
        <span class="token property">"style"</span><span class="token operator">:</span> <span class="token string">"boy"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">"help_count"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxx"</span><span class="token punctuation">,</span>
      <span class="token property">"pid"</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxxxxxxxx"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"special_id"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">"special_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"weapon_list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">20010</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2050</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"boss_kill_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
      <span class="token property">"dead_count"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">1513</span><span class="token punctuation">,</span>
      <span class="token property">"player_type"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"species"</span><span class="token operator">:</span> <span class="token string">"octolings"</span><span class="token punctuation">,</span>
        <span class="token property">"style"</span><span class="token operator">:</span> <span class="token string">"girl"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">"help_count"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxx"</span><span class="token punctuation">,</span>
      <span class="token property">"pid"</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxxxxxxxx"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"special_id"</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span>
      <span class="token property">"special_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"weapon_list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">1010</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"boss_kill_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">"golden_ikura_num"</span><span class="token operator">:</span> <span class="token number">31</span><span class="token punctuation">,</span>
      <span class="token property">"dead_count"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">"ikura_num"</span><span class="token operator">:</span> <span class="token number">675</span><span class="token punctuation">,</span>
      <span class="token property">"player_type"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"species"</span><span class="token operator">:</span> <span class="token string">"octolings"</span><span class="token punctuation">,</span>
        <span class="token property">"style"</span><span class="token operator">:</span> <span class="token string">"girl"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">"help_count"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxx"</span><span class="token punctuation">,</span>
      <span class="token property">"pid"</span><span class="token operator">:</span> <span class="token string">"xxxxxxxxxxxxxxxx"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"job_id"</span><span class="token operator">:</span> <span class="token number">3501</span><span class="token punctuation">,</span>
  <span class="token property">"grade_point_delta"</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
  <span class="token property">"job_result"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"is_clear"</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"stage_id"</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
  <span class="token property">"job_score"</span><span class="token operator">:</span> <span class="token number">158</span><span class="token punctuation">,</span>
  <span class="token property">"job_rate"</span><span class="token operator">:</span> <span class="token number">435</span><span class="token punctuation">,</span>
  <span class="token property">"boss_kill_counts"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"danger_rate"</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token property">"grade"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">"schedule"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"weapon_list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1010</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2050</span><span class="token punctuation">,</span> <span class="token number">-1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"stage_id"</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
    <span class="token property">"start_time"</span><span class="token operator">:</span> <span class="token number">1611360000</span><span class="token punctuation">,</span>
    <span class="token property">"end_time"</span><span class="token operator">:</span> <span class="token number">1611511200</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br></div></div><h2 id="考えられる解決策" tabindex="-1"><a class="header-anchor" href="#考えられる解決策" aria-hidden="true">#</a> 考えられる解決策</h2>
<p>現在、ライブラリでは<code>JSON -&gt;（自動変換）-&gt; 構造体 -&gt;（手動変換）-&gt; 整形済み構造体</code>というプロセスで変換を行っている。</p>
<p>自動変換だけでは使い勝手があまり良くなく、Salmon Stats とのレスポンスとの兼ね合いもありこのような処理になっている。</p>
<p>で、復元する際に<code>整形済み構造体 -&gt;（自動変換）-&gt; JSON</code>というふうに間を一段階飛ばしてしまっているので正しくない形でデータが返ってきてしまっているのである。</p>
<p>これに対する対応として一番愚直なのは今は単に JSONEncoder で自動変換しているところを愚直に書き直すという方法である。</p>
<p>しかしこれをやると何のために自動変換して JSON から構造体にしたのかがわからない。わからないのだが、これしかないような気もしている。</p>
<p>どうせ整形済み構造体にするときに一度手動変換を書いたのでその逆の変換を書くだけなのだが、正直に言うとあんまり書きたくない。というのも、<a href="https://github.com/tkgstrator/SplatNet2/blob/main/Sources/SplatNet2/SplatNet2.swift" target="_blank" rel="noopener noreferrer">変換するだけのコード<OutboundLink/></a>で 200 行くらいあるからだ。</p>
<p>似たようなことをするだけとはいえ、めんどくさいなあと。</p>
<h2 id="現在の実装部分" tabindex="-1"><a class="header-anchor" href="#現在の実装部分" aria-hidden="true">#</a> 現在の実装部分</h2>
<table>
<thead>
<tr>
<th style="text-align:center">機能</th>
<th style="text-align:center">Salmonia2</th>
<th style="text-align:center">Salmonia3</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">リザルト保存</td>
<td style="text-align:center">対応</td>
<td style="text-align:center">対応</td>
</tr>
<tr>
<td style="text-align:center">リザルトアップロード</td>
<td style="text-align:center">対応</td>
<td style="text-align:center">未対応</td>
</tr>
<tr>
<td style="text-align:center">リザルト取り込み</td>
<td style="text-align:center">対応</td>
<td style="text-align:center">対応</td>
</tr>
</tbody>
</table>
<p>まだベータ版でしか対応していないのですが、リザルト取り込みにも仮対応しています。</p>
<p>取得件数が多いと（5000 件あると 10 分くらい）すごい時間がかかるのですが、こればかりは仕方ないです。</p>
<h2 id="今後の展望" tabindex="-1"><a class="header-anchor" href="#今後の展望" aria-hidden="true">#</a> 今後の展望</h2>
<p>通信部分ばかりを改良しているせいで目に見える機能があんまり増えていないのですが、一番の根幹の部分なので頑張って完成させたいです。</p>
</template>
