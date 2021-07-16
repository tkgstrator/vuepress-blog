<template><h2 id="altserver" tabindex="-1"><a class="header-anchor" href="#altserver" aria-hidden="true">#</a> AltServer</h2>
<p>やりたいことは Twitter の公式アプリの広告を非表示にしたいだけなのだが、いろいろと手順が長い。</p>
<p>しかし、一度やってしまえばあとは自動で全部やってくれるので楽である。</p>
<h3 id="必要なもの" tabindex="-1"><a class="header-anchor" href="#必要なもの" aria-hidden="true">#</a> 必要なもの</h3>
<p>Windows を使っている前提で解説していきます。</p>
<p>以下を読んでよくわからんかった人は画像付きでインストール手順を載せてくれている<a href="https://gigazine.net/news/20201115-altstore/" target="_blank" rel="noopener noreferrer">GIGAZINE さんの記事<OutboundLink/></a>を読みましょう。</p>
<ul>
<li><a href="https://www.apple.com/itunes/" target="_blank" rel="noopener noreferrer">iTunes<OutboundLink/></a></li>
<li><a href="https://support.apple.com/en-us/HT204283" target="_blank" rel="noopener noreferrer">iCloud<OutboundLink/></a></li>
</ul>
<p>まず最初にこれらをインストールすること。Microsoft Store からインストールした iTunes などはサポートされていないので、一度アンインストールするなりしよう。</p>
<p>インストールしたら iCloud を起動して、自分が使っている Apple ID でログインします。</p>
<ul>
<li><a href="https://altstore.io/" target="_blank" rel="noopener noreferrer">AltServer<OutboundLink/></a></li>
</ul>
<p>ログインができたら AltServer をダウンロードします。</p>
<p>setup.exe を起動するとインストールが始まり、iTunes と iCloud がインストールされていればなんの苦労もなく完了するはず。</p>
<p>インストールできたらデバイスとパソコンを有線で接続して（一応 Wi-Fi 経由でもできるが、こちらのほうが確実）、Install AltStore からデバイスを選択。</p>
<p><img src="https://pbs.twimg.com/media/ErWBZCwUYAEXKMW?format=png" alt=""></p>
<p>Apple ID でのログインを求められるので入力すると、デバイス側に AltStore がインストールされる。</p>
<p>ここまでできたら完了。AltServer はアプリの署名をするために必要なので、起動しっぱなしにしておくこと。</p>
<h2 id="非公式アプリたち" tabindex="-1"><a class="header-anchor" href="#非公式アプリたち" aria-hidden="true">#</a> 非公式アプリたち</h2>
<p><a href="https://iosninja.io/ipa-library" target="_blank" rel="noopener noreferrer">IPA Library<OutboundLink/></a></p>
<p>公式アプリに byld を追加して機能を強化した改造アプリとでも呼ぶべきアプリたちが公開されているのがこの iOS Ninja である。</p>
<p>一応このサイトからでもダウンロードはできるのだが、ダウンロードしてから「AltStore でひらく」という手順を踏まねばならずめんどくさい。</p>
<p>URLScheme を利用して GitHub のリリースページを使えばいいのに、っていうことでボタン一つでインストールできるようにしてみた。</p>
<p>AltServer で署名を行うので AltServer を起動しているパソコンと同一のネットワークに繋がっていなければいけないことに注意。</p>
<h3 id="twitter-owl-2020-12-02" tabindex="-1"><a class="header-anchor" href="#twitter-owl-2020-12-02" aria-hidden="true">#</a> Twitter Owl (2020/12/02)</h3>
<ul>
<li>動画保存</li>
<li>広告無し</li>
<li>いいねをつける前に確認ダイアログ表示</li>
<li>Face ID による認証</li>
</ul>
<p><a href="altstore://install?url=https://github.com/tkgstrator/Pleiades/releases/download/IPAs/Twitter.8.44.1.Owl.1.5.ipa">Twitter Owl v8.44.1</a></p>
<p>広告がブロックできるのでとりあえずこれ使っておけばいいのでは感があります。</p>
<h3 id="twitter-2019-4-19" tabindex="-1"><a class="header-anchor" href="#twitter-2019-4-19" aria-hidden="true">#</a> Twitter++ (2019/4/19)</h3>
<ul>
<li>動画保存</li>
<li>Youtube の動画保存</li>
<li>デフォルトブラウザでリンクを開く</li>
<li>投稿画面からメディア選択時にキーボードを表示</li>
<li>140 文字以上のツイートが投稿可能（画像として自動でツイートしてくれる）</li>
<li>いいねをつける前に確認ダイアログ表示</li>
<li>フルスクリーン表示</li>
<li>ブロックしている人の動画ツイートが見れる</li>
</ul>
<p>最後のアップデートが 2019 年 4 月と二年近く前なのでこっちはスルーでいいかも。</p>
<p><a href="altstore://install?url=https://github.com/tkgstrator/Pleiades/releases/download/IPAs/TwitterPlus_v7.47_T1.2r-82.ipa">Twitter++ v7.47</a></p>
<h3 id="twitch-2020-8-11" tabindex="-1"><a class="header-anchor" href="#twitch-2020-8-11" aria-hidden="true">#</a> Twitch++ (2020/8/11)</h3>
<ul>
<li>クリップを保存</li>
<li>広告を無効化</li>
</ul>
<p>Twitch++ v9.3.1</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>非脱獄でアプリに自己署名が行える点はものすごく便利。</p>
<p>URLScheme を利用することでブラウザからパッとインストールできてしまうのも画期的だが、やはり同一ネットワークに繋がっていなければならず Sideload が有効期限が七日しかないのがネック。</p>
<p>せっかくデベロッパーアカウントを持っているのに、なぜか Free Developer Account でしかログインできないのがさっぱりわからない。Cydia Impactor だとデベロッパーアカウントか個人アカウントかをログイン時に選べたのでそこはめんどくさいなあって。</p>
<p>っというか、やっていることは THEOS を使ってバイナリ込みのアプリを作成しているだけのように思う。以前、自分も同じようにやってみたのだが、なぜかアプリがちゃんと動作しなかった。</p>
<p>やり方が悪かったのかなあ......</p>
<p>記事は以上。</p>
</template>
