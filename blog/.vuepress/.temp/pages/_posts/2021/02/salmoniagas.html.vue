<template><h2 id="android-利用者向けである" tabindex="-1"><a class="header-anchor" href="#android-利用者向けである" aria-hidden="true">#</a> Android 利用者向けである</h2>
<p>Salmonia というよりは、単なるリザルト（JSON）アップローダなのだが、まあそこには目をつむってほしい。</p>
<p>Android 版の Salmonia はリザルトアップロード機能しかなく、iOS 版のようにデータ分析などができない。よって、本記事は Android を所持している方向けで、そういう人はパソコンがあるなら絶対に導入したほうがいいです。</p>
<p>iPhone や iPad があるならこれを導入した上で Salmonia2 を使えば、より便利にサーモンランを楽しむことができるでしょう。</p>
<h3 id="google-apps-script-の設定など" tabindex="-1"><a class="header-anchor" href="#google-apps-script-の設定など" aria-hidden="true">#</a> Google Apps Script の設定など</h3>
<p>GAS のアカウント開設や、設定の大まかな方法は以前と変わっていません。</p>
<p>また、iksm_session の取得には PC 版の Salmonia が必須です。</p>
<p>最近コードを大幅に変えて安定性を向上させたので、ぜひともそっちを使ってみてください。</p>
<p><a href="https://github.com/tkgstrator/Salmonia/releases/tag/v1.11.0" target="_blank" rel="noopener noreferrer">Windows 版 Salmonia 1.11.0<OutboundLink/></a></p>
<div class="custom-container tip"><p class="custom-container-title">最新のバージョン</p>
<p>古いバージョンの Salmonia を使っていると正しく iksm_session が取得できないので気をつけてください。</p>
</div>
<p>え、じゃあ何が変わったんだとなるわけですが、複数アカウントに対応したのが今回の一番の目玉です。</p>
<h3 id="サブ垢対応のコード" tabindex="-1"><a class="header-anchor" href="#サブ垢対応のコード" aria-hidden="true">#</a> サブ垢対応のコード</h3>
<p><a href="https://gist.github.com/tkgstrator/3f190327b114ec6ce9d7405559e600fe" target="_blank" rel="noopener noreferrer">Salmonia for GAS<OutboundLink/></a></p>
<h3 id="プロパティについて" tabindex="-1"><a class="header-anchor" href="#プロパティについて" aria-hidden="true">#</a> プロパティについて</h3>
<p>プロパティは JSON 形式にのみ対応しています。</p>
<p>JSON 形式と言われてもよくわからないと思うので、テンプレートを置いておくのでそのとおりに書いてみてください。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>IKSM_SESSION => ["IKSM_SESSION_1", "IKSM_SESSION_2"]
API_TOKEN => API_TOKEN
JOB_NUM => ["0", "0"]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>IKSM_SESSION</code>と<code>JOB_NUM</code>だけは読み込みの都合上、ダブルクオーテーションで囲む必要があります。<code>API_TOKEN</code>だけはそのままであることに注意してください。</p>
<p><img src="https://pbs.twimg.com/media/EtYPFKAVkAEjv4s?format=png" alt=""></p>
<p>こんな感じで書き込めたら今まで通り指定したトリガーで実行されます。</p>
<p><img src="https://pbs.twimg.com/media/EtYQDKaUcAAPV-a?format=png" alt=""></p>
<p>こんな感じでどんどんリザルトを自動取得してくれます。実はアップロードが正しくできているかは未確認なのだが、多分大丈夫でしょう（ヨシ</p>
<p>記事は以上。</p>
</template>
