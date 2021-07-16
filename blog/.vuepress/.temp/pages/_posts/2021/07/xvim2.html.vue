<template><h1 id="xvim2-bigsur" tabindex="-1"><a class="header-anchor" href="#xvim2-bigsur" aria-hidden="true">#</a> XVim2 + BigSur</h1>
<p>XVim2 は Xcode で Vim のキーバインドを有効化するためのプラグインで、Vimmer なぼくは重宝していたのですが BigSur では AppleID にサインインできなくなるという致命的な問題がありました。</p>
<p>BigSur がリリースされてから随分経ち、根本的ではないもの解決法がでてきたのでそれを試したいと思います。</p>
<p><img src="https://pbs.twimg.com/media/EtiKWICVgAI2x7R?format=png" alt=""></p>
<blockquote>
<p>BigSur + XVim2 で発生するエラーメッセージ</p>
</blockquote>
<h2 id="xvim2-の導入方法" tabindex="-1"><a class="header-anchor" href="#xvim2-の導入方法" aria-hidden="true">#</a> XVim2 の導入方法</h2>
<p>実は XVim2 には自己署名以外にも複数導入方法が存在する。</p>
<p>そもそも、自己署名をするのはオリジナルの状態では自己署名した XVim2 プラグインを Xcode が読み込めないことに起因する。</p>
<p>つまり、自己署名プラグインを強制的に読み込ませるような設定にすれば、わざわざ Xcode に自己署名を施さなくても良くなり、そうなれば BigSur でのサインイン問題は発生しないというわけである。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Xcode</th>
<th style="text-align:center">macOS</th>
<th style="text-align:center">方式</th>
<th style="text-align:center">アーキテクチャ</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">自己署名<br>BigSur サインイン問題</td>
<td style="text-align:center">設定不要</td>
<td style="text-align:center">プラグイン方式</td>
<td style="text-align:center">x64/arm64</td>
</tr>
<tr>
<td style="text-align:center">署名削除</td>
<td style="text-align:center">^</td>
<td style="text-align:center">^</td>
<td style="text-align:center">x64</td>
</tr>
<tr>
<td style="text-align:center">オリジナル</td>
<td style="text-align:center">ライブラリ整合性チェック無効化</td>
<td style="text-align:center">^</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">^</td>
<td style="text-align:center">ライブラリ整合性チェック無効化+SIP 無効化</td>
<td style="text-align:center">^</td>
<td style="text-align:center">x64/arm64</td>
</tr>
<tr>
<td style="text-align:center">^</td>
<td style="text-align:center">^</td>
<td style="text-align:center">SIMBL</td>
<td style="text-align:center">x64</td>
</tr>
</tbody>
</table>
<p>実際、上の表のようにサインイン問題が発生するのは Xcode に自己署名を行った場合のみであることがわかる。</p>
<div class="custom-container warning"><p class="custom-container-title">署名削除について</p>
<p>ちなみに、署名削除の方法は<code>tccd</code>問題が発生するために行ってはならないとされている。<code>tccd</code>問題ってなんぞ？</p>
<p>あと、Markdown はデフォルトでテーブルの連結に対応してほしいです。</p>
</div>
<h3 id="ライブラリ整合性チェック無効化" tabindex="-1"><a class="header-anchor" href="#ライブラリ整合性チェック無効化" aria-hidden="true">#</a> ライブラリ整合性チェック無効化</h3>
<p>まず最初に Xcode でのライブラリの署名のチェック機能をオフにします。</p>
<p>よくわからないのですが、以下のコマンドでいけるようです。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> defaults <span class="token function">write</span> /Library/Preferences/com.apple.security.libraryvalidation.plist DisableLibraryValidation -bool <span class="token boolean">true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="sip-無効化" tabindex="-1"><a class="header-anchor" href="#sip-無効化" aria-hidden="true">#</a> SIP 無効化</h3>
<p>SIP とは System Integrity Protection の略で、まあ要するにセキュリティ保護を無効化します。</p>
<p>通常モードからでは変更できないので、リカバリーモードとして起動する必要があります。</p>
<p><code>Command+R</code>を押しながら macOS を起動して、ターミナルを開いて以下のコマンドを入力します。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>csrutil disable
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>あとは Xcode 自体に署名をせず、普通にプラグイン形式で XVim2 を読み込めば動作します。</p>
<h2 id="xcode13" tabindex="-1"><a class="header-anchor" href="#xcode13" aria-hidden="true">#</a> <a href="https://developer.apple.com/xcode/" target="_blank" rel="noopener noreferrer">Xcode13<OutboundLink/></a></h2>
<p>とはいうものの、Xcode13 では Vim mode が実装されているので Xcode に XVim2 を導入するメリットはあまりありません。</p>
<p>ん、ということは今までは BigSur のサインイン問題でアップデートを渋っていたのですが、Xcode13 の Vim mode を使うためにも逆に積極的に BigSur を使うべきだという話になりそうですね。</p>
<p>というわけで、テストするために BigSur にアップデートしてみます。</p>
<p>XVim2、いままでありがとう。</p>
</template>
