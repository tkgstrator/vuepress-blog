<template><h2 id="xvim2" tabindex="-1"><a class="header-anchor" href="#xvim2" aria-hidden="true">#</a> XVim2</h2>
<p>XVim2 は Xcode に Vim のショートカットキーを導入できる神アプリ。</p>
<p>Mac を初期化するたびに必ず導入していたのだが、どうも Big Sur へのアップデートで XVim2 が正しく動かなくなったようだ。</p>
<h2 id="ログインできないバグ" tabindex="-1"><a class="header-anchor" href="#ログインできないバグ" aria-hidden="true">#</a> ログインできないバグ</h2>
<p>さて、Xcode でアプリ開発する上で実機で動作させようとすると必ずアプリに対して署名をする必要がある。</p>
<p>で、その署名はどうするかというと Xcode で Apple ID でログインすれば自動的に Xcode が署名を生成してくれるという仕組みになっている。この辺の仕組みについてはほとんど自動化されているので、Xcode で Apple ID でログインしなければならないということを真面目に意識している人は少ないだろう。</p>
<p><img src="https://pbs.twimg.com/media/EtiKSlvVIAY3Pge?format=png" alt=""></p>
<p>で、どうもこの Apple ID へログインするためのセッションを開始できないバグが発生したようだ。</p>
<p>XVim2 でプラグインを読み込ませるために Xcode に自己証明書で署名を上書きしているのが問題な気はしている。</p>
<p><img src="https://pbs.twimg.com/media/EtiKWICVgAI2x7R?format=png" alt=""></p>
<p>[On macOS Big Sur, after codesign Xcode and try to login to my account, got &quot;Couldn’t communicate with a helper application&quot;])(https://github.com/XVimProject/XVim2/issues/340)</p>
<p>最初はなんのバグかわからなかったのだが、調べていると XVim2 の issue として挙がっているのを確認した。一応関連する issue は見て回ったが、どうも現段階で抜本的な解決方法はないようだ。</p>
<p>というか、スレッドでなされている対策が署名を上書きしない Xcode と上書きした Xcode の二種類を用意するなどと解説されていたりする。容量が 20GB を超える Xcode を二つも共存させる方法はスマートとは言い難いだろう。</p>
<p>困ったことといえば、この issue 自体が二ヶ月以上も前に報告されているにもかかわらず、解決の目処が立っていないということだ。普通、こういう問題が上がった場合、まずは暫定的な対処方法が提案され、その後リポジトリ自体にアップデートが入って正式対応するという流れが筋である。</p>
<p>しかし、未だに暫定的な対処方法すら一つも挙がってこない。これは若干まずい気がしている。</p>
<h3 id="app-store-からダウンロードし直す" tabindex="-1"><a class="header-anchor" href="#app-store-からダウンロードし直す" aria-hidden="true">#</a> App Store からダウンロードし直す</h3>
<p><img src="https://pbs.twimg.com/media/EtlTyotUcAMvWFP?format=png" alt=""></p>
<p>時間はかかったが、インストールし直すとなんの障害もなくログインすることができた。</p>
<p>もちろん、自己署名をしていないので XVim2 などのプラグインをロードすることはできない。</p>
<p>なので結局 Xcode12.5beta を導入して Xcode12.4 で XVim2 を使ってコーディング、Xcode12.5 でビルドして提出という方法を取ることになった。とてもめんどくさい。</p>
<p>ちなみに Xcode12.5 は<a href="https://developer.apple.com/download/" target="_blank" rel="noopener noreferrer">このリンク<OutboundLink/></a>からダウンロードできます。</p>
<h2 id="おまけ" tabindex="-1"><a class="header-anchor" href="#おまけ" aria-hidden="true">#</a> おまけ</h2>
<p>Admob を Xcode12 で動かそうとすると、Info.plist にパラメータを設定しているにも関わらず初期化エラーが発生してしまう。</p>
<p>そんなときに以下のサイトをお見かけして解決しました。</p>
<p><a href="https://exgyaruo.com/swift/terminating-app-due-to-uncaught-exception-gadinvalidinitializationexception" target="_blank" rel="noopener noreferrer">【Swift5】Terminating app due to uncaught exception ‘GADInvalidInitializationException’<OutboundLink/></a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;key>GADIsAdManagerApp&lt;/key>
&lt;true/>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Info.plist に追加で上の内容を追記すればいいらしいです。</p>
</template>
