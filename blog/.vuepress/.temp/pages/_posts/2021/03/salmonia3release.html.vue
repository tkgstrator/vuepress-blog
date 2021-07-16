<template><h2 id="salmonia3" tabindex="-1"><a class="header-anchor" href="#salmonia3" aria-hidden="true">#</a> Salmonia3</h2>
<p><a href="https://apps.apple.com/us/app/salmonia3/id1558344150" target="_blank" rel="noopener noreferrer">Salmonia3<OutboundLink/></a></p>
<p>秘密裏に進めていた Salmonia3 の App Store の審査ですが、二回のリジェクトを経て無事リリースすることができました。</p>
<p>上の URL からインストールすることができるので試してみてください。</p>
<h3 id="salmonia2-はどうなったの" tabindex="-1"><a class="header-anchor" href="#salmonia2-はどうなったの" aria-hidden="true">#</a> Salmonia2 はどうなったの</h3>
<p>Salmonia2 を使われていた方ならご存知かと思うのですが、Test Flight 版として Salmonia2 の開発は進めていました。</p>
<p>にもかかわらず何故リリースしたのが Salmonia3 なのかと疑問に思われる方もいるかも知れません。本記事では Salmonia3 の展望と、何故 2 ではなく 3 をリリースしたのかについて解説します。</p>
<h2 id="salmonia3-をリリースしたわけ" tabindex="-1"><a class="header-anchor" href="#salmonia3-をリリースしたわけ" aria-hidden="true">#</a> Salmonia3 をリリースしたわけ</h2>
<p>一番の理由は Salmonia2 のプロジェクトが大きくなりすぎたことが挙げられます。</p>
<p>開発を始めたのはちょうどトロントがロックダウンに入って暇を持て余していた 2020 年の 6 月頃だったと記憶しているのですが、開発中に一回プロジェクトを中断して新しく作り直したという経緯があります。</p>
<p>というのも、書けば書くほどコードが複雑化して「これ、もっと楽に書けたよな？」と思い返すことが増えたためです。</p>
<p>なのでいま開発していた Salmonia2 は Salmonia2 のバージョン 2 とも言えるわけです。</p>
<p>この Salmonia2 は割といい感じに開発できていたのですが、「しっかりしたものができてからリリースしよう」と考えていたためようやく形になるまでに半年ほどかかってしまいました。</p>
<p>大まかな機能が全て完成したのがちょうど 2020 年の 12 月頃になります。このあたりからは新規機能の追加ではなく、リリースに向けてのバグ調整などを行っていました。</p>
<h3 id="審査が通らない" tabindex="-1"><a class="header-anchor" href="#審査が通らない" aria-hidden="true">#</a> 審査が通らない</h3>
<p>ところが、Salmonia2 はなかなか審査に通りませんでした。というか、今でもまだ通っていません。</p>
<p>その理由は 1 では実装してこなかった Google Analytics や Admob や In app purchase などが挙げられます。ここの理解が不十分だったために、コーディングが甘く、審査に何度も弾かれました。</p>
<p>特に課金処理は SwiftyStoreKit を使っており、コーディング自体は楽なのですがい iTunes Store から課金情報がとってこれないなど Apple 側にバグとしか思えないような問題があって大変にめんどくさかったです。</p>
<p>アカウントがログインできないとかしょうもないことをずっとつつかれるのでこれをリリースするのは諦めてしまいました。</p>
<h3 id="シンプルなアプリに機能を追加していく" tabindex="-1"><a class="header-anchor" href="#シンプルなアプリに機能を追加していく" aria-hidden="true">#</a> シンプルなアプリに機能を追加していく</h3>
<p>個人的には Test Flight 版でずっと開発を続けてもいいのですが、導入がめんどくさい上にやはり App Store から検索できないというのは大きなディスアドバンテージです。</p>
<p>しかも、Test Flight 版では課金処理ができませんし、広告も載せられません。つまり完全にボランティアです。</p>
<p>今は一部の方からご支援を頂いていますが、これは一部のユーザに負担をかけ続けてしまうことになります。それは避けたいところです。</p>
<p>そこで、まずは基本的な機能がついたアプリをリリースし、アップデートでどんどん機能を移植していくことにしました。広告や課金処理がなければアプリをリリースするのはさほど難しくないですし、アップデートで弾かれるのであればそれまではアップデートがないバージョンのアプリとして使って頂けることになります。</p>
<p>また、感覚的にも最初の審査が一番キツく、アップデート自体は比較的甘い気がしています。なので、「とりあえずはアプリをリリースする」という方針に切り替えることにしました。</p>
<h2 id="salmonia2-と-3-の比較" tabindex="-1"><a class="header-anchor" href="#salmonia2-と-3-の比較" aria-hidden="true">#</a> Salmonia2 と 3 の比較</h2>
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
<td style="text-align:center">リザルト取得</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
<tr>
<td style="text-align:center">リザルトアップロード</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">リザルト詳細</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">△</td>
</tr>
<tr>
<td style="text-align:center">リザルト取り込み</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">シフト統計</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">将来のシフト閲覧</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">△</td>
</tr>
<tr>
<td style="text-align:center">WAVE 記録閲覧</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">複数アカウント</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">ゲーミング機能</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">広告表示</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">△</td>
</tr>
<tr>
<td style="text-align:center">Salmon Stats 閲覧</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
<tr>
<td style="text-align:center">ステージ記録</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">✕</td>
</tr>
</tbody>
</table>
<p>というわけで、現在のところはリザルトを取得してローカルに保存するだけの機能しかありません。</p>
<p>アップロード機能がないのでアプリを削除するなどしてしまうと全ての記録が失われます。Google Apps Script や PC 版の Salmonia を使うなどして別途アップロードしてください。</p>
<h3 id="なんでアップロード機能を削除したのか" tabindex="-1"><a class="header-anchor" href="#なんでアップロード機能を削除したのか" aria-hidden="true">#</a> なんでアップロード機能を削除したのか</h3>
<p>アップロード機能をなくしたのは単純にログイン機能が未完成なためです。</p>
<p>現在は WebKit という最新の SwiftUI では削除されている機能を無理やり再現して実装していますが、これが個人的には好きではありません。</p>
<p>WebKit を使って認証情報を取得するというプロセス自体がバグを生みやすく、ログイン失敗自体がそもそも多いためです。</p>
<p>Salmon Stats の認証自体は単に Twitter 認証をしているだけなので Salmon Stats 側が API を整備してくれれば認証率 100%の素晴らしいシステムができます。こういうシステムができるということがわかっている以上、わざわざ認証率の低いレガシーな実装をする気になれないのです。</p>
<p>ただ、手動でアップロード用のトークンを設定できるような機能はそのうち実装する予定です。</p>
<h3 id="実装の優先度について" tabindex="-1"><a class="header-anchor" href="#実装の優先度について" aria-hidden="true">#</a> 実装の優先度について</h3>
<p>まず、必要最低限の機能であるリザルトの詳細を見れる機能を実装します。</p>
<p>既に機能自体は実装しており Apple の審査待ち状態です。審査が通ればリリースができるので、早ければ来週の頭には公開できると思います。</p>
<p>Salmon Stats と連携するところはめんどくさいのでリザルトの取り込み機能は遅くなるかもしれません。広告機能や課金処理を優先しようと思います。</p>
<p>このあたりは Salmonia に限らずアプリ開発で生計を立てる上で将来的に必ず必要になってくるので。</p>
<h3 id="旧バージョンの対応について" tabindex="-1"><a class="header-anchor" href="#旧バージョンの対応について" aria-hidden="true">#</a> 旧バージョンの対応について</h3>
<p>Salmonia1 の方は 3 の機能が充実次第、App Store から削除してサポートを終了することを予定しています。</p>
<p>1 は iOS9 以上のサポートしかしていないので、こちらはもう切ってしまってもよいかなあと。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>アプリ開発の広告収入で生活したい！！！！</p>
<p>あと、最近喫茶ステラと死神の蝶っていう美少女ゲームにでてくる四季ナツメさんが可愛いと思い始めています。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/512GMIqA2WL._SL200_.jpg"></img>
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08935SPLQ/?tag=tkgstrator0f-22" target="_blank">喫茶ステラと死神の蝶 オリジナルサウンドトラック(ボックス付き)</a></li>
<li class="price">￥4,979 (中古品)</li>
</ul>
</div>
<p>記事は以上。</p>
</template>
