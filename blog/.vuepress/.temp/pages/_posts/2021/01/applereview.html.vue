<template><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>審査に引っかかった項目をポチポチと直し続けて今に至ります。</p>
<p>さて、今回またリジェクトをくらったのでその箇所の解説と直し方をメモしていきます。</p>
<h2 id="引っかかった規約" tabindex="-1"><a class="header-anchor" href="#引っかかった規約" aria-hidden="true">#</a> 引っかかった規約</h2>
<p>今回引っかかったのは三項目ですが、以前とは違うところで引っかかりました。</p>
<h3 id="_1-5-safety-developer-information" tabindex="-1"><a class="header-anchor" href="#_1-5-safety-developer-information" aria-hidden="true">#</a> 1. 5 Safety: Developer Information</h3>
<blockquote>
<p>The support URL specified in your app’s metadata, <a href="https://twitter.com/tkgling" target="_blank" rel="noopener noreferrer">https://twitter.com/tkgling<OutboundLink/></a>, does not properly navigate to the intended destination.</p>
</blockquote>
<p>サポート URL に Twitter アカウント載せたら怒られました！！！！！</p>
<p>なのでサポート用のページ作ります！！！！</p>
<h3 id="_2-1-performance-app-completeness" tabindex="-1"><a class="header-anchor" href="#_2-1-performance-app-completeness" aria-hidden="true">#</a> 2. 1 Performance: App Completeness</h3>
<blockquote>
<p>We’re looking forward to reviewing your app, but we were unable to sign in with the demo account credentials you provided.</p>
</blockquote>
<p>「レビューするためにデモアカウントにログインしようとしたらできないんだが？」って言われた。</p>
<p>それもそのはずで、ニンテンドーが二段階認証を要求するようになったため。</p>
<p>ログイン時には必ず登録してあるメールアドレスにログイン用のコードが送られるようになっているのだ。これがなんとも言えないくそめんどくさい仕様で、レビューのときにどうすればええんや？ってなっている。</p>
<h3 id="_2-3-performance-accurate-metadata" tabindex="-1"><a class="header-anchor" href="#_2-3-performance-accurate-metadata" aria-hidden="true">#</a> 2. 3 Performance: Accurate Metadata</h3>
<blockquote>
<p>We noticed that your app name or subtitle to be displayed on the App Store includes the following trademarked term or popular app name, which is not appropriate for use in these metadata items.</p>
</blockquote>
<p>「App Store に表示されるアプリ名やサブタイトルに有名なアプリの名前が入ってるから、使うのはふさわしくないよ」という忠告を頂きました。</p>
<p>なんのこっちゃろって思ったら「Salmon Run/サーモンラン」っていう言葉がダメらしいです。</p>
<p>え、ダメなの？？？</p>
<h3 id="ログインできない問題について" tabindex="-1"><a class="header-anchor" href="#ログインできない問題について" aria-hidden="true">#</a> ログインできない問題について</h3>
<p>これについてはこちらではどうしようもない問題なので、任天堂がログイン方式を変えたからでもアカウントは使えなくなったと説明するしかなかった。</p>
<blockquote>
<p>Nintendo have changed login method required e-mail verification in order to sign in. So, we can not provide demo account credentials of the username and password.</p>
</blockquote>
<p>というふうに返事を送ったのだが、これで伝わるのかどうかは微妙。</p>
<p>というのも、以前頭のおかしいレビュワーにあたってひたすら同じ文言のやりとりをした覚えがあるため。もうあのような惨劇は繰り返してはいけないので、次きたらまた担当者変えてもらう。</p>
<p>ちゃんと正常に動作しているときの動画も載せたけど、なんとかなるだろうか？</p>
<h3 id="サーモンランという名称問題" tabindex="-1"><a class="header-anchor" href="#サーモンランという名称問題" aria-hidden="true">#</a> サーモンランという名称問題</h3>
<p>サーモンランという名称自体は固有名詞ではなく、一般名詞だから使っても問題ないでしょ。他にサーモンランって名前のつくアプリあるの？</p>
<p>っていう形で若干抗議してみた。通ればラッキーくらいの気持ちでやろうと思う。</p>
<h2 id="既存のバグ" tabindex="-1"><a class="header-anchor" href="#既存のバグ" aria-hidden="true">#</a> 既存のバグ？</h2>
<p>突っ込まれてはいないものの、不具合としてこちらがわで認識しているものをまとめる。</p>
<h3 id="swiftystorekit" tabindex="-1"><a class="header-anchor" href="#swiftystorekit" aria-hidden="true">#</a> SwiftyStoreKit</h3>
<p>SwiftyStoreKit には<code>retrieveProductsInfo()</code>というアプリ内課金のプロダクト ID を指定するとその情報を返してくれる API が存在する。</p>
<p>で、この API はシミュレータ上では正しく動作するのだが、実機で動かそうとすると以下のようなエラーを出力する。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Invalid product identifier: work.tkgstrator.Salmonia2.Accounts
Invalid product identifier: work.tkgstrator.Salmonia2.Consumable.Donation
Invalid product identifier: work.tkgstrator.Salmonia2.MonthlyPass
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>最初はリリースビルドだけのバグかと思ったのだが、そうではないようだ。</p>
<p>リリースビルドだけのバグであるなら、デバッグビルドが Configuration.storekit を参照していることから単に SwiftyStoreKit の通信の実装に問題があるのかと考えることもできるのだが、同じデバッグビルドでも実機だと上手く動かないというのは腑に落ちない。</p>
<p>これが解消しない限り、リリースすることはできないだろう。</p>
<h3 id="purchase-の処理が異常に遅い問題" tabindex="-1"><a class="header-anchor" href="#purchase-の処理が異常に遅い問題" aria-hidden="true">#</a> Purchase の処理が異常に遅い問題</h3>
<p><a href="https://github.com/bizz84/SwiftyStoreKit/issues/506" target="_blank" rel="noopener noreferrer">App purchasing is extremely slow<OutboundLink/></a></p>
<p>調べてみたらなにやら issue が上がっており、解決法も載っていたので自分のコードに反映させてみた。</p>
<p>ただ、上に述べたように SwiftyStoreKit が実機に対して<code>Invalid product identeifier</code>を返すのでそもそも購入処理が行えない。</p>
<p>なので、直ったかどうかがわからないという状況になっている。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>ライブラリが原因で上手く動かないというのはなんとも気持ちの悪い感じがする。</p>
<p>早急にリリースしたいのだけれど。</p>
<p>記事は以上。</p>
</template>
