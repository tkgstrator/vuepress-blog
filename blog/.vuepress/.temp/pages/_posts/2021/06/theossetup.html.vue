<template><h1 id="theos" tabindex="-1"><a class="header-anchor" href="#theos" aria-hidden="true">#</a> THEOS</h1>
<p>THEOS は脱獄 Tweak を作成するためのプラットフォームです。</p>
<p>単なる広告非表示 Tweak から GUI も整った高度な脱獄アプリまで何でもつくることができます。</p>
<h2 id="theos-のセットアップ" tabindex="-1"><a class="header-anchor" href="#theos-のセットアップ" aria-hidden="true">#</a> THEOS のセットアップ</h2>
<p>THEOS は Windows、iOS、macOS、Linux のプラットフォームをサポートしているようですが、とりあえず macOS を利用するのが簡単です。</p>
<p>iOS でも開発はできるので macOS を持っていない方は脱獄した iOS に環境を作り、SSH 接続して PC でコードを書くことになると思います。Windows や Linux はめんどくさいので今回は割愛します。</p>
<h3 id="必要なもの" tabindex="-1"><a class="header-anchor" href="#必要なもの" aria-hidden="true">#</a> 必要なもの</h3>
<ul>
<li>macOS
<ul>
<li>Mavericks(10.9)以上であれば問題ないようです</li>
</ul>
</li>
<li>Xcode
<ul>
<li>とりあえず最新のものをインストールしておけばよいです</li>
</ul>
</li>
<li>Objective-C、Swift への情熱
<ul>
<li>最低限のプログラミングスキルは必須</li>
</ul>
</li>
<li>エラーにもくじけない心</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">セットアップについて</p>
<p>すべてのコマンドは必ずユーザ権限で実行するようにしてください。要するに、<code>root</code>で実行してはダメだし、<code>sudo</code>をつけてもダメだということです。</p>
</div>
<h3 id="homebrew-のインストール" tabindex="-1"><a class="header-anchor" href="#homebrew-のインストール" aria-hidden="true">#</a> Homebrew のインストール</h3>
<p>以下のコマンドでインストールします。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/bin/bash -c <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh<span class="token variable">)</span></span>"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>それなりに時間がかかるのでじっくり待ちます。</p>
<h3 id="ldid、xz-のインストール" tabindex="-1"><a class="header-anchor" href="#ldid、xz-のインストール" aria-hidden="true">#</a> ldid、xz のインストール</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> ldid xz
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これも同様に待ちます。</p>
<h3 id="環境変数の設定" tabindex="-1"><a class="header-anchor" href="#環境変数の設定" aria-hidden="true">#</a> 環境変数の設定</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Catalina(macOS 10.15) 以上の方</span>
<span class="token builtin class-name">echo</span> <span class="token string">"export THEOS=~/theos"</span> <span class="token operator">>></span> ~/.zprofile
<span class="token builtin class-name">source</span> ~/.zprofile
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Catalina(macOS 10.14) 未満の方</span>
<span class="token builtin class-name">echo</span> <span class="token string">"export THEOS=~/theos"</span> <span class="token operator">>></span> ~/.profile
<span class="token builtin class-name">source</span> ~/.profile
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">おまけ</p>
<p><a href="https://twitter.com/p1atdev" target="_blank" rel="noopener noreferrer">@p1atdev<OutboundLink/></a>氏の<a href="https://zenn.dev/platina/articles/cc2dcfa20711e2" target="_blank" rel="noopener noreferrer">記事<OutboundLink/></a>にもあるように、コマンド一発で theos を呼び出せるようにしておくと良いかもしれません。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> ~/.zprofile
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>でファイルをひらき、<code>alias theos=&quot;$THEOS/bin/nic.pl&quot;</code>を追記して保存。</p>
</div>
<h3 id="theos-のインストール" tabindex="-1"><a class="header-anchor" href="#theos-のインストール" aria-hidden="true">#</a> THEOS のインストール</h3>
<p>インストールといっても GitHub からクローンしてくるだけです、簡単。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone --recursive https://github.com/theos/theos.git <span class="token variable">$THEOS</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="sdk-のインストール" tabindex="-1"><a class="header-anchor" href="#sdk-のインストール" aria-hidden="true">#</a> SDK のインストール</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -LO https://github.com/theos/sdks/archive/master.zip
<span class="token assign-left variable">TMP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>mktemp -d<span class="token variable">)</span></span>
<span class="token function">unzip</span> master.zip -d <span class="token variable">$TMP</span>
<span class="token function">mv</span> <span class="token variable">$TMP</span>/sdks-master/*.sdk <span class="token variable">$THEOS</span>/sdks
<span class="token function">rm</span> -r master.zip <span class="token variable">$TMP</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>これを全部一気にターミナルにコピーして実行。iOS14.4 までの SDK しかないので、それ以上のものが使いたい場合は各自手に入れよう。</p>
<h3 id="実行してみる" tabindex="-1"><a class="header-anchor" href="#実行してみる" aria-hidden="true">#</a> 実行してみる</h3>
<p><code>$THEOS/bin/nic.pl</code>と実行して以下のように表示されれば成功</p>
<p><img src="https://pbs.twimg.com/media/E4VdYyqVgAY6fgM?format=png" alt=""></p>
<h2 id="theos-jailed-のセットアップ" tabindex="-1"><a class="header-anchor" href="#theos-jailed-のセットアップ" aria-hidden="true">#</a> THEOS JAILED のセットアップ</h2>
<p>脱獄していなくても動作させられる Tweak を作成できる神ツール。</p>
<p>一時期はやった Sideload などで使われている。興味がある人は是非追加してみよう。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone --recursive https://github.com/kabiroberai/theos-jailed
<span class="token builtin class-name">cd</span> theos-jailed
./install
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>こうすると標準の THEOS に入獄用 Tweak 作成のテンプレートが追加される。</p>
<p><code>$THEOS/bin/nic.pl</code>と実行して以下のように表示されれば成功</p>
<p><img src="https://pbs.twimg.com/media/E4Vh6K_UUAAH3Kg?format=png" alt=""></p>
<p>さっきまでの結果と比べて<code>[8.] iphone/jailed</code>という項目が追加されているのがわかります。</p>
<p>ここまでできればセットアップは完了です。</p>
</template>
