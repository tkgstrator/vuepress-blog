<template><h1 id="sideload-とは" tabindex="-1"><a class="header-anchor" href="#sideload-とは" aria-hidden="true">#</a> Sideload とは</h1>
<div class="custom-container tip"><p class="custom-container-title">Sideload とは</p>
<p>サイドローディングとは、アプリケーションストアを通じてアプリの配布や管理を行っているシステムにおいて、正規のアプリケーションストアを経由せずにアプリを入手し、インストールすることである。</p>
</div>
<blockquote>
<p><a href="https://qiita.com/ChikuwaJB/items/f9ab56d0d753bec678b0" target="_blank" rel="noopener noreferrer">非脱獄向け Tweak（？）巷で話題の Sideload を試してみたらかなりの可能性を感じた話。<OutboundLink/></a></p>
<p><a href="https://ichitaso.com/iphone/sideload/" target="_blank" rel="noopener noreferrer">【iOS9.3 対応】Xcode を使った非脱獄デバイスでアプリを Sideload する方法<OutboundLink/></a></p>
</blockquote>
<p>これは最近の脱獄にも使われており、<a href="https://unc0ver.dev/" target="_blank" rel="noopener noreferrer">Uncover<OutboundLink/></a>や<a href="https://taurine.app/" target="_blank" rel="noopener noreferrer">TAURINE<OutboundLink/></a>も Sideload を使って自己署名を使ってアプリをインストールし、そのアプリから脱獄をおこなう仕組みになっている。</p>
<p>Sideload 自体は公式の機能であるので何ら違法性はないのだが、開発者でないアカウントの場合はインストールする際の署名の有効期限が七日しかないという制約がある。開発者アカウントの場合は一年間有効なのだが、開発者になるためには年間 12000 円程度かかるので、このためだけにわざわざ開発者になる必要はない。</p>
<p>で、ここで Unc0ver や TAURINE が自己署名でインストール可能なのはそれらが署名されていない IPA であり、自己署名可能だからである。</p>
<p>AppStore からインストールした IPA には既にアプリ開発者の署名がされているため、それらに更に署名を施すことはできない。つまり、X というアプリを購入した A くんの iPhone や iTunes から IPA を抜き出し、それを B くんの署名で B くんの iPhone にインストールすることはできない。</p>
<p>要するに、海賊行為はできないようになっているのである。</p>
<h2 id="署名の解除" tabindex="-1"><a class="header-anchor" href="#署名の解除" aria-hidden="true">#</a> 署名の解除</h2>
<p>が、署名を解除する方法は存在する。もちろん普通の状態ではできない。インストールされたアプリから署名を解除するにはデバイスが脱獄されている必要がある。</p>
<p>脱獄されたデバイスから署名を解除した IPA をダンプする方法はいくつかあります。</p>
<h3 id="dumpdecrypted" tabindex="-1"><a class="header-anchor" href="#dumpdecrypted" aria-hidden="true">#</a> <a href="https://github.com/stefanesser/dumpdecrypted" target="_blank" rel="noopener noreferrer">dumpdecrypted<OutboundLink/></a></h3>
<p>セキュリティ専門家の Stegen Esser 氏が開発したダンプツール。</p>
<p>流石に最近は動かないのではないだろうか。</p>
<h3 id="clutch" tabindex="-1"><a class="header-anchor" href="#clutch" aria-hidden="true">#</a> <a href="https://github.com/KJCracks/Clutch/wiki/Tutorial" target="_blank" rel="noopener noreferrer">Clutch<OutboundLink/></a></h3>
<p>iOS10 くらいまでは使えていた覚えがあるダンプツール。</p>
<p>最近は使えないイメージがある。</p>
<h3 id="rasticrac" tabindex="-1"><a class="header-anchor" href="#rasticrac" aria-hidden="true">#</a> <a href="https://github.com/easonoutlook/Rasticrac" target="_blank" rel="noopener noreferrer">Rasticrac<OutboundLink/></a></h3>
<p>Clutch が使えなくなった後に使っていたダンプツール。</p>
<p>最近、公開されていないイメージがある。</p>
<h3 id="bfinject" tabindex="-1"><a class="header-anchor" href="#bfinject" aria-hidden="true">#</a> <a href="https://github.com/BishopFox/bfinject" target="_blank" rel="noopener noreferrer">bfinject<OutboundLink/></a></h3>
<p>Rasticrac が消滅した後にしばらく使っていたダンプツール。</p>
<p>iOS13 くらいまでは動いていたけど最近はご無沙汰している。</p>
<h3 id="bfdecrypt" tabindex="-1"><a class="header-anchor" href="#bfdecrypt" aria-hidden="true">#</a> <a href="https://github.com/BishopFox/bfdecrypt/" target="_blank" rel="noopener noreferrer">bfdecrypt<OutboundLink/></a></h3>
<p>bfinject を利用したダンプツール。</p>
<p>多分 iOS14 でも動く</p>
<h3 id="clutch2" tabindex="-1"><a class="header-anchor" href="#clutch2" aria-hidden="true">#</a> <a href="https://github.com/KJCracks/Clutch2" target="_blank" rel="noopener noreferrer">Clutch2<OutboundLink/></a></h3>
<p>Clutch が進化したやつだけど、最終コミットが 8 年前なのでもう動かなさそう。</p>
<h3 id="crackerxi" tabindex="-1"><a class="header-anchor" href="#crackerxi" aria-hidden="true">#</a> CrackerXI+</h3>
<p>現状最もオススメできる IPA 復号ツール。</p>
<p>当たり前だけど、海賊行為には利用しないこと。</p>
<p>標準レポジトリにはないので<RouterLink to="/_posts/2021/06/cydia:/url/https:/cydia.saurik.com/api/share#?source=http:/cydia.iphonecake.com/">AppCake</RouterLink>をタップして追加しよう。</p>
<p>で、ただインストールしただけだと動かないらしいので CrackXI+をインストールする前に、</p>
<ul>
<li><RouterLink to="/_posts/2021/06/cydia:/url/https:/cydia.saurik.com/api/share#?source=https:/cydia.akemi.ai/">AppSync Unified</RouterLink>
<ul>
<li>署名のないアプリをインストールすることができるようにする</li>
</ul>
</li>
<li>New Term 2
<ul>
<li>必要かどうかはわからんけど、なんか書いてあった</li>
</ul>
</li>
</ul>
<p>を先にインストールしておくこと。そうでないと CrackerXI+が動作しない。また、将来的に必要になるので以下のツールもインストールしておくことを推奨する。</p>
<ul>
<li>Apple File Conduit &quot;2&quot; (iOS 11+, arm64)
<ul>
<li>root 領域へのアクセスを許可する</li>
</ul>
</li>
<li>Filza File Manager
<ul>
<li>Web サーバを立てられる便利なユーティリティツール</li>
</ul>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">インストール順を間違えた場合</p>
<p>先に CrackerXI をインストールしてしまっていた場合には CrackerXI を再インストールすれば良い。</p>
</div>
<h2 id="crackerxi-の使い方" tabindex="-1"><a class="header-anchor" href="#crackerxi-の使い方" aria-hidden="true">#</a> CrackerXI+の使い方</h2>
<p><img src="https://pbs.twimg.com/media/E4jlD6kUYAAf2Ao?format=png" alt=""></p>
<p>単に起動して署名解除をしようとすると<code>Enable CrackerXI hook in settings tab.</code>と表示されるので<code>Settings</code>から設定を更新しよう。</p>
<p><img src="https://pbs.twimg.com/media/E4jlD6iVUAcsq0U?format=png" alt=""></p>
<p>ここで<code>CrackerXI hook</code>を有効化します。</p>
<p><img src="https://pbs.twimg.com/media/E4jlD6jVgAEVGPZ?format=png" alt=""></p>
<p>有効化しているとちゃんと動作します。このとき<code>YES, Full IPA</code>を選択します。</p>
<p><img src="https://pbs.twimg.com/media/E4jnQoNVUAYveLZ?format=png" alt=""></p>
<p>アプリを選択すると一度画面が切り替わったあとで再び<code>CrackerXI+</code>がひらきます。</p>
<p><img src="https://pbs.twimg.com/media/E4jnQoOUUAMS0jH?format=png" alt=""></p>
<p>こんな表示がでたらダンプは成功です。</p>
<h2 id="ダンプした-ipa-をコピー" tabindex="-1"><a class="header-anchor" href="#ダンプした-ipa-をコピー" aria-hidden="true">#</a> ダンプした IPA をコピー</h2>
<p>ダンプした IPA は<code>/var/mobile/Documents/CrackerXI</code>の中に保存されているので、それをパソコンにコピーします。</p>
<p>これは<code>Filza File Manager</code>の<code>WebDAV Server</code>の機能を使えば簡単です。</p>
<p><img src="https://pbs.twimg.com/media/E4jl4CPVoAIisY6?format=png" alt=""></p>
<p><code>Filze File Maanger</code>をひらいたら下にある歯車マークを押します。</p>
<p><img src="https://pbs.twimg.com/media/E4jl4CQUUAEhqJh?format=png" alt=""></p>
<p>そこで<code>Enable WebDAV Server</code>を有効化します。更に下を見ると</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Listening at https://192.168.1.13:11111
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>と書いてあるので、パソコンでそのアドレスにアクセスします。</p>
<div class="custom-container tip"><p class="custom-container-title">Listening アドレスについて</p>
<p>この値は人によって異なるのでちゃんと自分の表示されている値を確認してください。</p>
</div>
<p><img src="https://pbs.twimg.com/media/E4jrWivVIAIlZa2?format=png" alt=""></p>
<p>URL にアクセスするとこのようにデバイスの内部データにアクセスできます。</p>
<p><code>/var/mobile/Documents/CrackerXI</code>に移動するとダンプした IPA があることがわかります。</p>
<p><img src="https://pbs.twimg.com/media/E4jrbIAVUAUcf7o?format=png" alt=""></p>
<p>ダウンロードしたいクリックすると以下のような画面に変わります。</p>
<p><img src="https://pbs.twimg.com/media/E4jrdZdVEAAwYCN?format=png" alt=""></p>
<p>ここで<code>Download</code>を押せば IPA ファイルがデバイスからパソコンにコピーされます。</p>
<h2 id="ここまでの流れ" tabindex="-1"><a class="header-anchor" href="#ここまでの流れ" aria-hidden="true">#</a> ここまでの流れ</h2>
<p>さて、ここまでできれば Sideload 用の IPA は用意できました。</p>
<p>しかし、よく考えるとここまでの一連の流れは意味がないことがわかると思います。</p>
<p>というのも、インストールされたアプリの署名を解除して自己署名でインストールする意味がないからです。それなら最初から署名の期限もない AppStore 公式の署名を使えばよいではないかと。</p>
<p>なので、単にダンプした IPA をインストールするのではなく、IPA に<code>dylib</code>を同梱します。</p>
<h3 id="dylib-とは" tabindex="-1"><a class="header-anchor" href="#dylib-とは" aria-hidden="true">#</a> dylib とは</h3>
<p><code>dylib</code>とは超簡単に言うと実行時にアプリケーションのバイナリが参照するライブラリファイルのことです。</p>
<p>これを同梱するとどんな意味があるかというと、<code>dylib</code>に何らかの処理を行うメソッドを書き込んでアプリ起動時にそれを参照するようにすれば本来のアプリの挙動とは違う動作を行なうことができるようになります。</p>
<p>つまり、本来は脱獄 Tweak として動作させていた処理をアプリ自身から行わせることができるということになるわけです。しかも脱獄 Tweak は署名がされていないので非脱獄環境では動作させることができませんが、Sideload であれば自己署名した IPA のバイナリが呼び出すため Sandbox の制約に引っかかることもありません。</p>
<h3 id="sideload-の限界" tabindex="-1"><a class="header-anchor" href="#sideload-の限界" aria-hidden="true">#</a> Sideload の限界</h3>
<p>とはいっても、全ての脱獄アプリを動作させることができるわけではありません。動作させられるのはアプリのバイナリに Hook するタイプの Tweak に限られます。</p>
<p>また、そのような Tweak も全てが動作するわけではなく外部フレームワークを要求するものについては一部動かすことができません。</p>
<h2 id="ここからの流れ" tabindex="-1"><a class="header-anchor" href="#ここからの流れ" aria-hidden="true">#</a> ここからの流れ</h2>
<p>次に必要になるのはアプリを改造するための dylib を作成することです。</p>
<p>しかし、これは<a href="https://tkgstrator.work/posts/2021/06/21/theossetup.html" target="_blank" rel="noopener noreferrer">THEOS JAILED<OutboundLink/></a>の開発環境を整えたり、Objective-C や Swift などの知識が必要で一朝一夕でできる作業ではありません。</p>
<p>じゃあめんどくさいなあってなるところなんですが、世の中には他の開発者が作成した Tweak が山のようにあるのでそれを利用します。</p>
<p>要するに、</p>
<ol>
<li>公開されている脱獄 Tweak のうち Sideload で利用できるものを探す</li>
<li>その Tweak が Hook しているアプリを AppStore から取得する</li>
<li>そのアプリの署名を解除する</li>
<li>IPA に dylib を同梱した上で再度 IPA にパッケージングする</li>
<li>改造した IPA を自己署名でインストールする</li>
</ol>
<p>という流れになります。</p>
<h2 id="カスタマイズした-ipa-の作成方法" tabindex="-1"><a class="header-anchor" href="#カスタマイズした-ipa-の作成方法" aria-hidden="true">#</a> カスタマイズした IPA の作成方法</h2>
<p>今回は Twitter のプロモーションのツイートを非表示にする方法を考えてみます。</p>
<p>Twitter のように超有名なアプリは脱獄 Tweak の開発も盛んなので、調べれば簡単に目的のものが見つかります。</p>
<h3 id="脱獄-tweak-から-deb-を入手する" tabindex="-1"><a class="header-anchor" href="#脱獄-tweak-から-deb-を入手する" aria-hidden="true">#</a> 脱獄 Tweak から DEB を入手する</h3>
<p>今回は Hao Nguyen 氏が開発した<a href="https://www.ios-repo-updates.com/repository/bigboss/package/com.haoict.twitternoads/" target="_blank" rel="noopener noreferrer">Twitter No Ads<OutboundLink/></a>を利用します。</p>
<p>最新のバージョンは 0.0.2 なのでそれをダウンロードします。</p>
<h3 id="deb-を展開する" tabindex="-1"><a class="header-anchor" href="#deb-を展開する" aria-hidden="true">#</a> DEB を展開する</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> dpkg
dpkg -x XXXXXXXX.deb YYYYYYYY
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">DEB 展開について</p>
<p><code>XXXXXXXX</code>にはダウンロードした<code>DEB</code>のファイル名、YYYYYYYY には展開した先のフォルダを指定して下さい。</p>
<p>フォルダがない時は自動的に作成されるので、適当で大丈夫です。</p>
</div>
<p><img src="https://pbs.twimg.com/media/E4j0IqFVgAA1vHZ?format=png" alt=""></p>
<p>すると目的の<code>dylib</code>が手に入ります。</p>
<h3 id="ipa-に-dylib-を同梱させる" tabindex="-1"><a class="header-anchor" href="#ipa-に-dylib-を同梱させる" aria-hidden="true">#</a> IPA に DYLIB を同梱させる</h3>
<p>ここが一番めんどくさいところなのですが、<code>IPA</code>に<code>DYLIB</code>を同梱させた上でバイナリから<code>DYLIB</code>を実行するようにパッチを当ててくれるツールがあります。</p>
<ul>
<li><a href="https://github.com/brandonplank/iPAPatcher/releases" target="_blank" rel="noopener noreferrer">iPAPatcher<OutboundLink/></a>
<ul>
<li>Catalina 以上であれば動作する</li>
<li>おそらく今後のアップデートはなし</li>
</ul>
</li>
<li><a href="https://github.com/EamonTracey/iPatch" target="_blank" rel="noopener noreferrer">iPatch<OutboundLink/></a>
<ul>
<li>Big Sur 以上で動作する</li>
<li>今後のアップデートもありそう</li>
</ul>
</li>
</ul>
<p>上の二つがとりあえず見つかったのですが、自分は macOS が Catalina でしたので必然的に<code>iPAPatcher</code>を使うことになりました。</p>
<p><img src="https://pbs.twimg.com/media/E4j1RlSVoAMw--H?format=png" alt=""></p>
<p>まったく難しい作業はなく、ダンプした署名解除済みの<code>IPA</code>と先程展開した<code>dylib</code>を選択するだけです</p>
<p><img src="https://pbs.twimg.com/media/E4j1cwjVcAce7F5?format=png" alt=""></p>
<p>選択したら<code>Patching.</code>を選択します。</p>
<p><img src="https://pbs.twimg.com/media/E4j1elwVEAEZKUW?format=png" alt=""></p>
<p>IPA のサイズにもよるのですが、二分ほどで終わると思います。</p>
<h3 id="ipa-をインストールする" tabindex="-1"><a class="header-anchor" href="#ipa-をインストールする" aria-hidden="true">#</a> IPA をインストールする</h3>
<p>ここまでできれば作成された IPA をインストールするだけです。</p>
<ul>
<li><a href="http://www.cydiaimpactor.com/" target="_blank" rel="noopener noreferrer">Cydia Impactor<OutboundLink/></a></li>
<li><a href="https://www.iosappsigner.com/" target="_blank" rel="noopener noreferrer">iOS App Signer<OutboundLink/></a></li>
<li><a href="https://pangu8.com/sideloadly/" target="_blank" rel="noopener noreferrer">Sideloadly<OutboundLink/></a></li>
</ul>
<p>いろいろツールはあるのですが、個人的には<a href="https://pangu8.com/sideloadly/" target="_blank" rel="noopener noreferrer">Sideloadly<OutboundLink/></a>が好きなのでそれをおすすめしておきます。</p>
<p>これ以外にも Xcode を利用する方法などいろいろあります。</p>
<p>完成した IPA をインストールすれば無事に全てのプロモーションが消えます。</p>
<p>記事は以上。</p>
</template>
