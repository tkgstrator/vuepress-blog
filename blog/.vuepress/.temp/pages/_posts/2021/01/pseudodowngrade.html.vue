<template><h2 id="ダウングレードの必要性" tabindex="-1"><a class="header-anchor" href="#ダウングレードの必要性" aria-hidden="true">#</a> ダウングレードの必要性</h2>
<p>ニンテンドースイッチにおいてゲームをダウングレードすることのメリットはあまりありません。</p>
<p>というのも、最新のバージョンでないとオンライン対戦はできませんし、イカッチャなどの LanPlay でさえバージョンが異なるとできないためです。</p>
<p>パッチなども最新のバージョンで動くように日々改良されていっているので、更新が止まっているなどの特殊な場合を除いて最新のバージョンにアップデートして困ることはありません。</p>
<p>では、なぜダウングレードをするのでしょうか？</p>
<p>それは、スプラトゥーンにおいてバージョン 3.1.0 でないと Starlight（Starlion を含む）が動作しないためです。</p>
<h2 id="疑似ダウングレードが求められるワケ" tabindex="-1"><a class="header-anchor" href="#疑似ダウングレードが求められるワケ" aria-hidden="true">#</a> 疑似ダウングレードが求められるワケ</h2>
<p>しかし、ダウングレード自体は該当するバージョンの NSP を持っていれば難しいことはありません。</p>
<p>Goldleaf や Tinfoil などの NSP インストーラがあれば簡単にバージョンを下げることができます。</p>
<p>なぜ、ここで完全なダウングレードではなく、疑似ダウングレードが求められるのでしょうか？</p>
<p>それは、（ゲームにもよりますが）完全なダウングレードをしてしまうとセーブデータのバージョンの不整合から「最新のアップデータを適応してください」というエラーが表示されて低いバージョンのゲームを起動することができなくなってしまうためです。</p>
<p>例えば、スプラトゥーンの場合ですと今まで起動した中で最も新しいバージョンの情報が NAND に刻まれているために、本体を初期化させるか、Goldleaf などで起動バージョンのリセットなどしない限りダウングレードしたバージョンを起動させることができなくなります。</p>
<p>最新のバージョンで遊ぶのと、古いバージョンで改造を研究するのとを切り替えるために毎回本体を初期化/アップデータの再インストールしていてはめんどくさいことこの上ないわけです。</p>
<h2 id="疑似ダウングレード用のファイルの作成" tabindex="-1"><a class="header-anchor" href="#疑似ダウングレード用のファイルの作成" aria-hidden="true">#</a> 疑似ダウングレード用のファイルの作成</h2>
<p>ここではスプラトゥーンのダウングレードを前提に話を進めていきます。</p>
<p>スプラトゥーン以外でも手法としては全く同じなので同様の手順でダウングレードできます。</p>
<h3 id="必要なもの" tabindex="-1"><a class="header-anchor" href="#必要なもの" aria-hidden="true">#</a> 必要なもの</h3>
<ol>
<li>1.0.0 の NSP または NCA</li>
<li>ダウングレードしたいバージョンの NSP または NCA</li>
<li>該当する title.keys</li>
</ol>
<p>絶対に持っていなければいけないのはこの三つです。</p>
<p>ゲームのカートリッジがあれば 1.0.0 は簡単に入手できるので、問題は 3.1.0 の NSP を入手できるかになります。リージョン（JP 版、NA 版、EU 版）は問わないのでどれでも好きなバージョンで構いません。</p>
<p>title.keys に関しては用意した NSP が EU 版であれば EU 版のタイトルキー、NA 版であれば NA 版のタイトルキーが必要になります。</p>
<p>1.0.0 が JP 版、3.1.0 が NA 版といったハイブリットも可能ですが、この場合は JP 版と NA 版の二つのタイトルキーが必要になります。</p>
<p>タイトルキーに関しては Lockpick で抜き出しても良いですが、ググるとインターネットの広大な海にぽつんと落ちていたりするのでそちらでも構いません。</p>
<p>最終的に以下のような形式の title.keys が得られたら大丈夫です。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>01003BC0000A08000000000000000003 = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
01003C700009C8000000000000000003 = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
0100F8F0000A28000000000000000003 = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>あとはこの title.keys を.switch というフォルダの中にコピーします。</p>
<p><a href="https://github.com/shadowninja108/HACGUI/releases" target="_blank" rel="noopener noreferrer">HACGUI<OutboundLink/></a>を一度でも使った事があれば既に title.keys が.switch フォルダ内に作られているのでこの作業は不要だったりします。</p>
<p><code>C:\Users\&lt;USER NAME&gt;\.switch</code></p>
<p>.switch フォルダはミュージックとかピクチャのフォルダがあるところと同じところに作成します。</p>
<p><img src="https://pbs.twimg.com/media/Eq_Vy5zVQAAwbqm?format=png" alt=""></p>
<h3 id="追加で必要なもの" tabindex="-1"><a class="header-anchor" href="#追加で必要なもの" aria-hidden="true">#</a> 追加で必要なもの</h3>
<ol>
<li><a href="https://github.com/SciresM/hactool/releases" target="_blank" rel="noopener noreferrer">hactool<OutboundLink/></a></li>
<li><a href="https://github.com/Thealexbarney/LibHac/releases" target="_blank" rel="noopener noreferrer">hacotoolnet<OutboundLink/></a></li>
<li><a href="https://sevenzip.osdn.jp/" target="_blank" rel="noopener noreferrer">7-Zip<OutboundLink/></a></li>
</ol>
<p>NSP を展開するのに hactool を使うので、既に NCA として持っている場合は hactool は不要です。</p>
<p>hacotoolnet は NCA からバイナリファイルを作るために使い、7-Zip はそのバイナリファイルを FAT32 で扱えるように分割するために使います。</p>
<p><img src="https://pbs.twimg.com/media/Eq_N-haVkAAxszt?format=png" alt=""></p>
<p>とりあえず必要な 7-Zip をインストールした上で、NSP のファイル名を 310.nsp と 100.nsp に変えておきましょう（わかりやすくするためで、必須ではないです）</p>
<p><img src="https://pbs.twimg.com/media/Eq_OMZTUwAAsGRI?format=png" alt=""></p>
<p>ZIP を解凍して実行ファイルを展開できたら、いよいよダウングレード用のファイルの作成開始です。</p>
<h3 id="nsp-を-nca-に展開しよう" tabindex="-1"><a class="header-anchor" href="#nsp-を-nca-に展開しよう" aria-hidden="true">#</a> NSP を NCA に展開しよう</h3>
<p>hactool を使って NSP から NCA を抽出するためのコマンドを載せておきますので、これを適当な名前のバッチファイルとして保存してください。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hactool -t pfs0 --pfs0dir=%~n1 %1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>あとは、このバッチファイルに NSP をドラッグアンドドロップすれば NCA として抽出してくれます。</p>
<p><img src="https://pbs.twimg.com/media/Eq_Rtt9VkAAdnnN?format=png" alt=""></p>
<p>抽出した NCA のうち、最も大きなものをそれぞれ 100.nca、310.nca という風にリネームします。</p>
<p><img src="https://pbs.twimg.com/media/Eq_R2m3VkAANdK6?format=png" alt=""></p>
<h3 id="_3-1-0-の-main-を取り出す" tabindex="-1"><a class="header-anchor" href="#_3-1-0-の-main-を取り出す" aria-hidden="true">#</a> 3.1.0 の main を取り出す</h3>
<p>コマンドプロンプトを開いて以下のコマンドを入力します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hactool -t nca --exefsdir=exefs 310.nca
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>すると exefs というフォルダの中に 3.1.0 の実行ファイル（main）が展開されます。</p>
<p><img src="https://pbs.twimg.com/media/Eq_lUMPVgAAY8fX?format=png" alt=""></p>
<h3 id="nca-からバイナリ作成" tabindex="-1"><a class="header-anchor" href="#nca-からバイナリ作成" aria-hidden="true">#</a> NCA からバイナリ作成</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hactoolnet 310.nca --basenca 100.nca --romfs romfs.bin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>次に、上のコマンドをコマンドを入力します。</p>
<p>先程 NCA のリネームをしたのはここでダラダラと長いコマンドを打つのがわかりにくかったからです。</p>
<p><img src="https://pbs.twimg.com/media/Eq_bhkIUwAEUS5R?format=png" alt=""></p>
<p>すると 4GB くらいのバイナリファイルが完成します。</p>
<p>ここで問題となるのは 4.7GB のファイルは FAT32 のフォーマットにコピーできないというところです。</p>
<p>なのでこの romfs.bin を FAT32 で扱えるように分割しなきゃいけないわけです。</p>
<h3 id="_7-zip-で分割する" tabindex="-1"><a class="header-anchor" href="#_7-zip-で分割する" aria-hidden="true">#</a> 7-Zip で分割する</h3>
<p>7-Zip を起動して romfs.bin をひらきます。</p>
<p><img src="https://pbs.twimg.com/media/Eq_cOrqU0AEWvk-?format=png" alt=""></p>
<p>romfs.bin に辿り着いたら右クリックから「ファイル分割」を選択します。</p>
<p><img src="https://pbs.twimg.com/media/Eq_clnTUYAAUGlP?format=png" alt=""></p>
<p><img src="https://pbs.twimg.com/media/Eq_cxA0VgAALOse?format=png" alt=""></p>
<p>ファイルサイズは「4294901760」を指定します。</p>
<p><img src="https://pbs.twimg.com/media/Eq_ddCBVEAAgwn3?format=png" alt=""></p>
<p><img src="https://pbs.twimg.com/media/Eq_fadLVoAAa3Dq?format=png" alt=""></p>
<p>ファイル分割をすると romfs.bin.001 と romfs.bin.002 というファイルができると思うのでこれらをそれぞれ 00 と 01 にリネームします。</p>
<p><img src="https://pbs.twimg.com/media/Eq_fjR-U0AAMTcQ?format=png" alt=""></p>
<p>リネームができたら romfs.bin を削除した上で romfs.bin という名前のフォルダを作成し、フォルダの中に 00 と 01 のファイルを移動させます。</p>
<p>すると、以下の六つのファイルができているはずです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>romfs.bin/00

romfs.bin/01

exefs/main

exefs/main.npdm

exefs/rtld

exefs/sdk
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="ハッシュチェック" tabindex="-1"><a class="header-anchor" href="#ハッシュチェック" aria-hidden="true">#</a> ハッシュチェック</h3>
<p>次に、ファイルのハッシュチェックを行います。</p>
<p>ダウングレード用のファイルに少しでもミスがあれば起動しなくなるためです。用意したファイルが正しいものかどうか事前に調べておくことで「ファイルの作成ミス」なのか「ファイルの配置ミス」なのかがわかるというわけです。</p>
<p>今回用意した 00 と 01 のファイルと exefs フォルダ内の各ファイルを右クリックして「CRC SHA」から「SHA-256」を選択します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>romfs.bin/00
SHA256: 05D93198CC6E2A00FC44121B108545C5D055C21B3DB4C6079428A4DD5313C79B

romfs.bin/01
SHA256: 8BAC3E94995A71F26A7C9068EEA274B6E58706361023B68B8E9DC766D8554F6F

exefs/main
SHA256: 01D6121F0B4736337F1B8AB6CA51B3EEE74E29B27A88185026BB71E6599D5F72

exefs/main.npdm
SHA256: C714AA2B91D50E9F12DC2EEACA637D3F1D39B0EFAD0E76FC3C0A806132782F41

exefs/rtld
SHA256: 3522D56DDA056D4C7BA6F9508D6D1805D9A751B5A189A8700F9714CE06FB6C5A

exefs/sdk
SHA256: 1AD3BA3CB35303A7C713231F2E49346EF40C42DEB8A7526B6305A0B6358282FD
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>ここの値が異なっている場合はファイルが壊れているか、手順のどこかを間違っている可能性があります。</p>
<h3 id="アーカイブ化する" tabindex="-1"><a class="header-anchor" href="#アーカイブ化する" aria-hidden="true">#</a> アーカイブ化する</h3>
<p>このままだと単に romfs.bin というフォルダの中に 00 と 01 というファイルが入っている状態になってしまうので、romfs.bin というフォルダをファイルとして扱えるようにアーカイブ化します。</p>
<p><img src="https://pbs.twimg.com/media/Eq_mlG2VkAAr7Kh?format=png" alt=""></p>
<p>といってもやることは簡単で、romfs.bin のフォルダを開いてから詳細設定を開いて「アーカイブする」にチェックを入れるだけです。</p>
<p><img src="https://pbs.twimg.com/media/Eq_mwhYUwAAEmhj?format=png" alt=""></p>
<p>チェックを入れられたら、ダウングレード用のファイルの作成は完了です。</p>
<h3 id="ファイルのコピー" tabindex="-1"><a class="header-anchor" href="#ファイルのコピー" aria-hidden="true">#</a> ファイルのコピー</h3>
<p>ここまでできたらあとはダウングレード用のファイルを<code>sdmc:/atmosphere/contents/titleid</code>にコピーするだけです。</p>
<p>titleid にはダウングレードしたいスプラトゥーンの ID を入力しましょう。</p>
<p>この手法の便利なところは先ほど作成したダウングレード用のファイルはどのリージョンに対しても使えるということです。</p>
<p>つまり、JP 版の 3.1.0 の NSP から作ったファイルで NA 版や EU 版をダウングレードすることもできます。</p>
<p>しかも、製品版だけでなく体験版でさえもダウングレード可能なので、（中身は 5.2.0 相当）を 3.1.0 にすることもできます。</p>
<p>今回の手順で一番詰まると思うのは romfs.bin が正しくアーカイブとして認識されないことだと思うのですが、Goldleaf でひらいたときに romfs.bin がフォルダではなくファイルとして認識されていればアーカイブ化は成功しています。</p>
<p><img src="https://pbs.twimg.com/media/Eq_o_dPVEAEAeQQ?format=png" alt=""></p>
<p>記事は以上。</p>
</template>
