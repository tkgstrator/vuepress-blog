<template><h2 id="starlight-をアプデした" tabindex="-1"><a class="header-anchor" href="#starlight-をアプデした" aria-hidden="true">#</a> Starlight をアプデした</h2>
<p><a href="https://github.com/tkgstrator/Starlight" target="_blank" rel="noopener noreferrer">Starlight<OutboundLink/></a></p>
<h3 id="変更点" tabindex="-1"><a class="header-anchor" href="#変更点" aria-hidden="true">#</a> 変更点</h3>
<ul>
<li>ビルド環境を構築済みの Docker に依存するように変更。
<ul>
<li>ソースコードにエラーがなければ必ずビルドに成功します。</li>
<li>keystone や keystone-engine の構築に失敗することなし。</li>
<li>devkitpro のアプデに悩まされることなし。</li>
<li>python のバージョンに悩まされることなし。</li>
<li>簡単に言うとビルドが死ぬほど簡単。</li>
</ul>
</li>
<li>デフォルトでぼくのソースコードをビルドできる。
<ul>
<li>サーモンランの解析は捗る！</li>
</ul>
</li>
<li>WSL2 の利用が（多分）必須。
<ul>
<li>WSL2 自体はまだベータ機能なのでちょっと導入が面倒かも。</li>
<li>まあそれでもビルド環境つくるよりは簡単。</li>
</ul>
</li>
<li>Ubuntu は 18.04 を推奨。
<ul>
<li>16.04 だとデフォルトで python3 が入ってない。</li>
<li>20.04 はシンタックスがなんか変。</li>
</ul>
</li>
</ul>
<p>まあ、導入がめっちゃ楽になったと思ってもらえればダイジョブ。</p>
<h2 id="導入方法" tabindex="-1"><a class="header-anchor" href="#導入方法" aria-hidden="true">#</a> 導入方法</h2>
<p>まず最初に WSL2 で Ubuntu18.04 の環境を用意する必要があります。</p>
<p>WSL1 だと Docker は Hyper-V でしかサポートされておらず、Windows 10 Home だと Hyper-V が有効化できないからです。</p>
<p>WSL2 では WSL2 distro という謎システムで Hyper-V を使わずに Docker を使える仕組みが整備されています。</p>
<p>WSL2 で Ubuntu18.04 をインストールしつつ、Docker 環境を整える方法は以下の記事がわかりやすいです！</p>
<p><a href="https://dev.to/birdsea/windows-subsystem-for-linux-2-docker-for-wsl2-3dpm" target="_blank" rel="noopener noreferrer">Windows Subsystem for Linux 2でDocker for WSL2を使う<OutboundLink/></a></p>
<p>で、無事に Docker がインストールできたとしましょう。</p>
<h3 id="docker-の設定" tabindex="-1"><a class="header-anchor" href="#docker-の設定" aria-hidden="true">#</a> Docker の設定</h3>
<p><code>docker info</code>と入力して、どんな反応が返ってくるか調べます。</p>
<p><img src="https://pbs.twimg.com/media/EYWJbYvWAAAaOLL?format=png" alt=""></p>
<p><code>docker info</code>失敗例です。</p>
<p>ズラーッとよくわからんログが表示されれば良いですが、デフォルトだと docker コマンドは sudo 権限でしか動かないので<code>permission denied</code>と怒られると思います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo gpasswd -a $USER docker
exit
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>なので上のコマンドを入力して、exit で一度 Ubuntu を再起動（Windows は再起動しなくて OK）して設定を有効化します。</p>
<p>これは docker コマンドを sudo 権限で動かせるようにするのだ。</p>
<p><img src="https://pbs.twimg.com/media/EYWJzoJX0AAhFLD?format=png" alt=""></p>
<p><code>docker info</code>成功例です。</p>
<p>再起動後に再び<code>docker info</code>と入力すれば、無事に Docker にアクセスできます。</p>
<p>あと、初期状態だと<code>make</code>もインストールされていない可能性が高いのでインストールしましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt update
sudo apt upgrade
sudo apt install -y python3 make
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="starlight-の導入" tabindex="-1"><a class="header-anchor" href="#starlight-の導入" aria-hidden="true">#</a> Starlight の導入</h3>
<p>ここからはものすごく簡単です。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/tkgstrator/Starlight.git
cd Starlight
make
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>詳しいことは Starlight のレポジトリの<a href="https://github.com/tkgstrator/Starlight/blob/master/README_JP.md" target="_blank" rel="noopener noreferrer">README<OutboundLink/></a>に書いてあるのでそれを読んでもらえば大丈夫かと。</p>
<p>もしわからないことがあれば以下のリンクから Discord サーバに参加して、直接きいていただければ返事します。</p>
<p><a href="https://discord.gg/vUVBJFAKvZ" target="_blank" rel="noopener noreferrer">LanPlay-JP<OutboundLink/></a></p>
<h2 id="おまけ" tabindex="-1"><a class="header-anchor" href="#おまけ" aria-hidden="true">#</a> おまけ</h2>
<p>@<a href="https://www.youtube.com/watch?v=q23Pkyddjb4" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>解説動画をつくってみたので、参考にしてください。</p>
<p>記事は以上。</p>
</template>
