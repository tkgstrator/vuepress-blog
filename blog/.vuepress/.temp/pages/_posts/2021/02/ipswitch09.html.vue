<template><h1 id="ipswitch-誰でもできるコード開発-9" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-9" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #9</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2020/11/02/ipswitch08.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #8<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="インスタンスをコールするコード" tabindex="-1"><a class="header-anchor" href="#インスタンスをコールするコード" aria-hidden="true">#</a> インスタンスをコールするコード</h2>
<p>IPSwitch 形式のコードには単純に命令を上書きするものと、インスタンスを読み込んで中身を書き換えるものがあります。</p>
<p>前者の一例を挙げるとスペシャルウエポンの塗りポイントを 0 にするようなものが考えられます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Special Cost 0 (3.1.0) [tkgling]
@disabled
000847B4 3F0000F9 // STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>本来パラメータファイルから必要な塗りポイントを取得してレジスタに格納している命令が<code>000864E8</code>に書かれているのですが、それを上書きするパッチになります。</p>
<p>ゼロレジスタ（XZR）という読み込むと必ず 0 を返す特別なレジスタを使って X1 レジスタが保持するメモリアドレスに 0 というデータを書き込みます。</p>
<p>X1 レジスタはそれぞれのブキのスペシャルウエポン発動に必要な塗りポイントのパラメータを格納する場所なので、このパッチがあれば必要塗りポイントが 0 になるという仕組みです。</p>
<p>このパッチはバージョンを問わず常に命令部<code>3F0000F9</code>の値は変わらず、ゲームのバージョンによって実行ファイル内の関数のアドレスがズレるだけなので「アドレスだけを移植すれば動作するコード」ということができるわけです。</p>
<p>それに対してインスタンスを参照するコードは命令部にプログラムのアドレスを参照する内容が書かれているので、アドレス部だけを変えても動作させることはできません。</p>
<h2 id="インスタンス参照コード" tabindex="-1"><a class="header-anchor" href="#インスタンス参照コード" aria-hidden="true">#</a> インスタンス参照コード</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Get 9999 Power Eggs by Signal (3.1.0) [tkgling]
@disabled
0104C94C 60970190 // ADRP X0, #0x32EC000
0104C950 00DC46F9 // LDR X0, [X0, #0xDB8]
0104C954 000040F9 // LDR X0, [X0]         // X0 = PlayerDirector
0104C958 01B841F9 // LDR X1, [X0, #0x370] // X1 = mRoundBankedPowerIkuraNum
0104C95C E1E184D2 // MOV X1, #0x270F      // X1 = 0x270F
0104C960 01B801F9 // STR X1, [X0, #0x370] // mRoundBankedPowerIkuraNum = X1
0104C964 C0035FD6 // RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>これはカモンかナイスを押せば赤イクラ取得数が 9999 になるコードですが、最初の二行のコードが<code>PlayerDirector</code>のインスタンスを読み込む内容になっています。</p>
<p>で、ここが大事なところでインスタンスのアドレスはスプラトゥーンの実行ファイル内にあり、バージョンが上がるとここの値も変わってしまうということです。</p>
<p>つまり「アドレスと命令（命令内のアドレス）の両方を書き換えないと動かないコード」になるわけです。</p>
<p>バージョン 3.1.0 以降ではプログラム内のデバッグシンボルが削除されているので、インスタンスを探すのはめんどくさかったりします。</p>
<p>誰かが wiki みたいなのつくってインスタンスのまとめつくってくれたら楽なんですけどね。</p>
<p>まあめんどくさいから誰もしないと思います。</p>
<h2 id="インスタンスを探そう" tabindex="-1"><a class="header-anchor" href="#インスタンスを探そう" aria-hidden="true">#</a> インスタンスを探そう</h2>
<p>インスタンスとは要はクラスを実体化したものですので、クラスの数だけインスタンスの種類があることになります。</p>
<p>例えば、サーモンランに関するインスタンスはこれだけあります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">クラス</th>
<th style="text-align:center">3.1.0</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Game::Coop::RewardConfig</td>
<td style="text-align:center">04157FB0</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::RuleConfig</td>
<td style="text-align:center">04158008</td>
<td style="text-align:center">パラメータを設定する</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::LevelsConfig</td>
<td style="text-align:center">04160E00</td>
<td style="text-align:center">詳細なパラメータを設定する</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::Setting</td>
<td style="text-align:center">04160E08</td>
<td style="text-align:center">キケン度やステージなどの設定を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::VictoryClamDirector</td>
<td style="text-align:center">04162050</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::CameraHolder</td>
<td style="text-align:center">04164DF0</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::GraphMgr</td>
<td style="text-align:center">04164E40</td>
<td style="text-align:center">GraphNode を司る？</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::ItemDirector</td>
<td style="text-align:center">04165738</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::EnemyDirector</td>
<td style="text-align:center">04165740</td>
<td style="text-align:center">シャケを司るクラス</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::PlayerDirector</td>
<td style="text-align:center">04165DB8</td>
<td style="text-align:center">サーモンランのプレイヤー情報を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::EventDirector</td>
<td style="text-align:center">04167BC0</td>
<td style="text-align:center">夜イベントなどの情報を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::SeaSurfaceMgr</td>
<td style="text-align:center">04167C20</td>
<td style="text-align:center">潮位の変化を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::GuideDirector</td>
<td style="text-align:center">04167E18</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::Moderator</td>
<td style="text-align:center">04168C78</td>
<td style="text-align:center">クマサンの挙動を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::ResultPlayReport</td>
<td style="text-align:center">04169050</td>
<td style="text-align:center">リザルトデータを司る</td>
</tr>
</tbody>
</table>
<h3 id="game-playermgr-sinstance" tabindex="-1"><a class="header-anchor" href="#game-playermgr-sinstance" aria-hidden="true">#</a> Game::PlayerMgr::sInstance</h3>
<p>ナワバリバトルやガチマッチで使うプレイヤーデータを司るクラスです。</p>
<p>チーム変更や、持っているブキやスペシャルを変更したりする場合にはこのクラスを使います。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">3.1.0</th>
<th style="text-align:center">5.4.0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">アドレス</td>
<td style="text-align:center">04157578</td>
<td style="text-align:center">02CFDCF8</td>
</tr>
<tr>
<td style="text-align:center">検索位置</td>
<td style="text-align:center">005C5758</td>
<td style="text-align:center">007605C0</td>
</tr>
<tr>
<td style="text-align:center">検索バイナリ</td>
<td style="text-align:center">08 C0 50 39 1F 01 00 71 E0 13 80 9A</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<p>このインスタンスの見つけ方ですが<code>Game::Coop::Utl::GetPlayer()</code>という関数がプレイヤーのデータを取得する際に<code>Game::PlayerMgr</code>を呼び出しているので、それを利用します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>005C5758                 MOV             W8, W0
005C575C                 TBNZ            W8, #0x1F, loc_5C5794
005C5760                 STP             X29, X30, [SP,#-0x10+var_s0]!
005C5764                 MOV             X29, SP
005C5768                 ADRP            X9, #off_4157578@PAGE
005C576C                 LDR             X9, [X9,#off_4157578@PAGEOFF]
005C5770                 LDR             X0, [X9] ; this
005C5774                 MOV             W1, W8  ; unsigned int
005C5778                 BL              _ZNK4Game9PlayerMgr18getAllKindPlayerAtEj ; Game::PlayerMgr::getAllKindPlayerAt(uint)
005C577C                 LDP             X29, X30, [SP+var_s0],#0x10
005C5780                 CBZ             X0, locret_5C5790
005C5784                 LDRB            W8, [X0,#0x430]
005C5788                 CMP             W8, #0
005C578C                 CSEL            X0, XZR, X0, NE
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>見ると 005C5778 で<code>_ZNK4Game9PlayerMgr18getAllKindPlayerAtEj</code>が呼び出されています。</p>
<p>これを<a href="http://demangler.com/" target="_blank" rel="noopener noreferrer">デマングル<OutboundLink/></a>すると<code>Game::PlayerMgr::getAllKindPlayerAt(unsigned int) const</code>ということがわかります。</p>
<p><code>Game::Coop::Utl</code>クラス内で<code>Game::PlayerMgr</code>クラスのメソッドが呼びだされているので、呼び出す前に必ずそのクラスのインスタンスを呼び出していなければいけません。</p>
<p>となると 04157578 が探していた<code>Game::PlayerMgr</code>クラスのアドレスであることがわかるのです。</p>
<p>つまり、<code>Game::PlayerMgr</code>を探すためには先に<code>Game::Coop::Utl::GetPlayer()</code>のサブルーチンを探せば良いことになります。</p>
<p>このサブルーチンは比較的特徴的な命令を持っているので、</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>005C5784                 LDRB            W8, [X0,#0x430]
005C5788                 CMP             W8, #0
005C578C                 CSEL            X0, XZR, X0, NE
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>この三つの命令群をバイナリ検索すれば簡単に見つけられます。</p>
<p>これを ARM64 に変換すると<code>08 C0 50 39 1F 01 00 71 E0 13 80 9A</code>になります。</p>
<p>これをバイナリ検索すれば 5.4.0 の場合 007605EC がヒットすると思います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>007605C0                 MOV             W8, W0
007605C4                 TBNZ            W8, #0x1F, loc_7605FC
007605C8                 STP             X29, X30, [SP,#-0x10+var_s0]!
007605CC                 MOV             X29, SP
007605D0                 ADRP            X9, #off_2CFDCF8@PAGE
007605D4                 LDR             X9, [X9,#off_2CFDCF8@PAGEOFF]
007605D8                 LDR             X0, [X9]
007605DC                 MOV             W1, W8
007605E0                 BL              sub_10E6CFC
007605E4                 LDP             X29, X30, [SP+var_s0],#0x10
007605E8                 CBZ             X0, locret_7605F8
007605EC                 LDRB            W8, [X0,#0x430]
007605F0                 CMP             W8, #0
007605F4                 CSEL            X0, XZR, X0, NE
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>すると 02CFDCF8 が 5.4.0 における<code>Game::PlayerMgr</code>のアドレスだとわかるわけです。</p>
<h3 id="game-coop-playerdirector" tabindex="-1"><a class="header-anchor" href="#game-coop-playerdirector" aria-hidden="true">#</a> Game::Coop::PlayerDirector</h3>
<p>サーモンランで使うプレイヤーデータを司るクラスです。</p>
<p>金イクラ数や赤イクラ数の変更などをする場合にはこのクラスを使います。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">3.1.0</th>
<th style="text-align:center">5.4.0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">アドレス</td>
<td style="text-align:center">04165DB8</td>
<td style="text-align:center">02D0CEE0</td>
</tr>
<tr>
<td style="text-align:center">検索位置</td>
<td style="text-align:center">005A615C</td>
<td style="text-align:center">0073EC84</td>
</tr>
<tr>
<td style="text-align:center">検索バイナリ</td>
<td style="text-align:center">F3 03 00 AA 74 22 0D D1 08 41 00 91</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<p>このインスタンスは<code>Game::Coop::PlayerDirector</code>のでデコンストラクタを使って探すのが楽ではないかと思います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>005A6130                 STP             X20, X19, [SP,#-0x10+var_10]!
005A6134                 STP             X29, X30, [SP,#0x10+var_s0]
005A6138                 ADD             X29, SP, #0x10
005A613C                 ADRP            X8, #off_4168FF8@PAGE
005A6140                 LDR             X8, [X8,#off_4168FF8@PAGEOFF]
005A6144                 MOV             X19, X0
005A6148                 SUB             X20, X19, #0x348
005A614C                 ADD             X8, X8, #0x10
005A6150                 STR             X8, [X19]
005A6154                 ADRP            X8, #off_4165DB8@PAGE
005A6158                 LDR             X8, [X8,#off_4165DB8@PAGEOFF]
005A615C                 STR             XZR, [X8] ; Cmn::Singleton&lt;Game::Coop::PlayerDirector>::GetInstance_(void)::sInstance
005A6160                 BL              _ZN4sead9IDisposerD2Ev ; sead::IDisposer::~IDisposer()
005A6164                 ADRP            X8, #off_4156138@PAGE
005A6168                 LDR             X8, [X8,#off_4156138@PAGEOFF]
005A616C                 ADD             X8, X8, #0x10
005A6170                 STR             X8, [X20]
005A6174                 LDP             X29, X30, [SP,#0x10+var_s0]
005A6178                 SUB             X0, X19, #0x230 ; this
005A617C                 LDP             X20, X19, [SP+0x10+var_10],#0x20
005A6180                 B               _ZN4sead3JobD2Ev ; sead::Job::~Job()
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>何が書いてあるかさっぱりだと思うのですが、上から 10 行目の 04165DB8 が<code>Game::Coop::PlayerDirector</code>のアドレスになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>005A6144                 MOV             X19, X0
005A6148                 SUB             X20, X19, #0x348
005A614C                 ADD             X8, X8, #0x10
005A6150                 STR             X8, [X19]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>幸いなことにこのサブルーチンにも特徴的な命令があり、これをバイナリに変換すると<code>F3 03 00 AA 74 22 0D D1 08 41 00 91 68 02 00 F9</code>となります。</p>
<p>これは似たようなサブルーチンがいくつかあるので、しっかりと見極めましょう。</p>
<p>5.4.0 の場合はバイナリ検索では次の 12 回のサブルーチンがヒットすると思うのですが、10 回目にヒットするところが<code>Game::Coop::PlayerDirector</code>のデコンストラクタのサブルーチンになります。</p>
<p>バージョンによって何回目のサブルーチンなのかは変わる可能性がありますが、候補は 6 つしかないのでそのときは適当に全部試してみてください。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>006E3310, 006E3364
006F3054, 006F30A8
006FF75C, 006FF7B0
0070A74C, 0070A7A0
0073EC30, 0073EC84
01386678, 013866CC
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>なので 0073EC84 のサブルーチンをチェックします。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0073EC84                 STP             X20, X19, [SP,#var_20]!
0073EC88                 STP             X29, X30, [SP,#0x20+var_10]
0073EC8C                 ADD             X29, SP, #0x20+var_10
0073EC90                 ADRP            X8, #off_2D100B8@PAGE
0073EC94                 LDR             X8, [X8,#off_2D100B8@PAGEOFF]
0073EC98                 MOV             X19, X0
0073EC9C                 SUB             X20, X19, #0x348
0073ECA0                 ADD             X8, X8, #0x10
0073ECA4                 STR             X8, [X19]
0073ECA8                 ADRP            X8, #off_2D0CEE0@PAGE
0073ECAC                 LDR             X8, [X8,#off_2D0CEE0@PAGEOFF]
0073ECB0                 STR             XZR, [X8]
0073ECB4                 BL              sub_171A9C8
0073ECB8                 ADRP            X8, #off_2CFCF90@PAGE
0073ECBC                 LDR             X8, [X8,#off_2CFCF90@PAGEOFF]
0073ECC0                 ADD             X8, X8, #0x10
0073ECC4                 SUB             X0, X19, #0x230
0073ECC8                 STR             X8, [X20]
0073ECCC                 BL              nullsub_1290
0073ECD0                 LDP             X29, X30, [SP,#0x20+var_10]
0073ECD4                 MOV             X0, X20 ; void *
0073ECD8                 LDP             X20, X19, [SP+0x20+var_20],#0x20
0073ECDC                 B               _ZdlPv  ; operator delete(void *)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>同様に上から 10 番目の命令を見ればアドレスが 02D0CEE0 であることがわかります。</p>
<h2 id="イクラ個数変更コードを移植しよう" tabindex="-1"><a class="header-anchor" href="#イクラ個数変更コードを移植しよう" aria-hidden="true">#</a> イクラ個数変更コードを移植しよう</h2>
<p>イクラの個数変更コードはチーム変更よりも簡単です。</p>
<p>何故なら、<code>Game::Coop::PlayerDirector</code>が全てのプレイヤーの情報を持っているため、わざわざ<code>getControlledPerformer</code>のような操作しているプレイヤー情報を取得する必要がないのです。</p>
<p>もちろん、もっと複雑なコードにする場合は BL 命令で他のサブルーチンを呼び出す必要があるのでちょっとややこしいことになります。</p>
<h3 id="イクラ個数変更コードテンプレート" tabindex="-1"><a class="header-anchor" href="#イクラ個数変更コードテンプレート" aria-hidden="true">#</a> イクラ個数変更コードテンプレート</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0xXXXXX000
LDR X0, [X0, #0xYYY]
LDR X0, [X0]
MOV W1, #0x270F
STR W1, [X0, #0x370]
MOV W1, #0x3E7
STR W1, [X0, #0x378]
STR W1, [X0, #0x37C]
RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>なんでこういうコードになっているかというと、それは以前のコードを見ていただきたいのですが、その記事が若干わかりにくいので簡単に解説。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Game::Coop::PlayerDirector
  0x000 Cmn::Actor actor
  0x348 sead::IDisposer
  0x368 char char0x368
  0x370 Game::Coop::Player player[0]
    0x370 mRoundBankedPowerIkuraNum
    0x374 mGotGoldenIkuraNum
    0x378 mRoundBankedGoldenIkuraNum
    0x37C mTotalBankedGoldenIkuraNum
  0x470 Game::Coop::Player player[1]
    0x470 mRoundBankedPowerIkuraNum
    0x474 mGotGoldenIkuraNum
    0x478 mRoundBankedGoldenIkuraNum
    0x47C mTotalBankedGoldenIkuraNum
  0x570 Game::Coop::Player player[2]
    0x570 mRoundBankedPowerIkuraNum
    0x574 mGotGoldenIkuraNum
    0x578 mRoundBankedGoldenIkuraNum
    0x57C mTotalBankedGoldenIkuraNum
  0x670 Game::Coop::Player player[3]
    0x670 mRoundBankedPowerIkuraNum
    0x674 mGotGoldenIkuraNum
    0x678 mRoundBankedGoldenIkuraNum
    0x67C mTotalBankedGoldenIkuraNum
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>こんな感じで<code>Game::Coop::PlayerDirector</code>クラスは四人分のデータをもっているので、先頭アドレスを調べてそこの値を上書きしてしまう方法が使えます。</p>
<p>自分がホストをしているのであれば、自分の情報は先頭になるので先頭アドレスから 0x370 ズレたところにデータが入っています。</p>
<p>赤イクラの数を変えたいのであれば 0x370 を、金イクラの数を変えたいのであれば 0x378 を変えれば良いとなるわけです。また、保険として 0x37C も変えておけば完璧です。</p>
<h3 id="テンプレートを完成させよう" tabindex="-1"><a class="header-anchor" href="#テンプレートを完成させよう" aria-hidden="true">#</a> テンプレートを完成させよう</h3>
<p>同じように<code>sendSignalEvent</code>をに上書きをします。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C ADRP X0, #0xXXXXX000
0104C950 LDR X0, [X0, #0xYYY]
0104C954 LDR X0, [X0]
0104C958 MOV W1, #0x270F
0104C95C STR W1, [X0, #0x370]
0104C960 MOV W1, #0x3E7
0104C964 STR W1, [X0, #0x378]
0104C968 STR W1, [X0, #0x37C]
0104C96C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">XXXXX</td>
<td style="text-align:center">Game::PlayerMgr のアドレスを使って計算する</td>
</tr>
<tr>
<td style="text-align:center">YYY</td>
<td style="text-align:center">XXXXX000 に対するオフセット <br> Game::PlayerMgr のアドレスを使って計算する</td>
</tr>
<tr>
<td style="text-align:center">AAAAAAAA</td>
<td style="text-align:center">Game::PlayerMgr::getControlledPerformer のアドレス</td>
</tr>
<tr>
<td style="text-align:center">BBBBBBBB</td>
<td style="text-align:center">この命令が書かれるアドレス</td>
</tr>
</tbody>
</table>
<p>$02CD0-0104C=01CC0$</p>
<p>なので XXXXX は 01CC0 となり、YYY は EE0 となります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C ADRP X0, #0x1CC0000
0104C950 LDR X0, [X0, #0xEE0]
0104C954 LDR X0, [X0]
0104C958 MOV W1, #0x270F
0104C95C STR W1, [X0, #0x370]
0104C960 MOV W1, #0x3E7
0104C964 STR W1, [X0, #0x378]
0104C968 STR W1, [X0, #0x37C]
0104C96C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>これを<a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>で変換するとこうなります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Get 999 Golden Eggs and 9999 Power Eggs by Signal [tkgling]
@disabled
0104C94C 00E60090 // ADRP X0, #0x1CC0000
0104C950 007047F9 // LDR X0, [X0, #0xEE0]
0104C954 000040F9 // LDR X0, [X0]
0104C958 E1E18452 // MOV W1, #0x270F
0104C95C 017003B9 // STR W1, [X0, #0x370]
0104C960 E17C8052 // MOV W1, #0x3E7
0104C964 017803B9 // STR W1, [X0, #0x378]
0104C968 017C03B9 // STR W1, [X0, #0x37C]
0104C96C C0035FD6 // RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>というコードが得られます。</p>
<h3 id="動作テストをしてみる" tabindex="-1"><a class="header-anchor" href="#動作テストをしてみる" aria-hidden="true">#</a> 動作テストをしてみる</h3>
<p><video controls src="https://video.twimg.com/ext_tw_video/1397085846642122756/pu/vid/1280x720/c-eoYIcexoDnhCmi.mp4"></video></p>
<p>上手くイクラを取得することができました。</p>
<p>ただ、リザルト画面でのスコアに正しく反映されないのは相変わらずです。</p>
<p>ここを直すのも宿題の一つということで！</p>
<h2 id="チーム変更コードを移植しよう" tabindex="-1"><a class="header-anchor" href="#チーム変更コードを移植しよう" aria-hidden="true">#</a> チーム変更コードを移植しよう</h2>
<p>インスタンスのアドレスが分かったので、あとはコードを移植するだけになります。</p>
<p>全てをそのまま使うことはできないのですが、テンプレートがあるのでそれを使えば空いているところに値を入れるだけで移植ができます。</p>
<h3 id="チーム変更コードテンプレート" tabindex="-1"><a class="header-anchor" href="#チーム変更コードテンプレート" aria-hidden="true">#</a> チーム変更コードテンプレート</h3>
<p>以下は、全てのバージョンで正しく動作するチーム変更コードです。</p>
<p>バージョンによって異なるのは<code>XXXXX</code>、<code>YYY</code>、<code>AAAAAAAA</code>、<code>BBBBBBBB</code>の値だけです。つまり、各バージョンにおいてこれら四つの値を突き止めることが移植することに繋がります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STP X29, X30, [SP, #-0x10]!
MOV X29, SP
ADRP X0, #0xXXXXX000
LDR X0, [X0, #0xYYY]
LDR X0, [X0]
BL #0xAAAAAAAA - 0xBBBBBBBB
LDR X1, [X0, #0x328]
EOR X1, X1, #1
STR X1, [X0, #0x328]
LDR X1, [X0, #0x488]
STR X1, [X0, #0x38]
LDP X29, X30, [SP], #0x10
RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>それぞれのパラメータの意味をいかに解説します。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">XXXXX</td>
<td style="text-align:center">Game::PlayerMgr のアドレスを使って計算する</td>
</tr>
<tr>
<td style="text-align:center">YYY</td>
<td style="text-align:center">XXXXX000 に対するオフセット <br> Game::PlayerMgr のアドレスを使って計算する</td>
</tr>
<tr>
<td style="text-align:center">AAAAAAAA</td>
<td style="text-align:center">Game::PlayerMgr::getControlledPerformer のアドレス</td>
</tr>
<tr>
<td style="text-align:center">BBBBBBBB</td>
<td style="text-align:center">この命令が書かれるアドレス</td>
</tr>
</tbody>
</table>
<p>これらの値を計算するためにはあと二つのアドレスがわからなければいけません。</p>
<p>というのも、チーム変更は「自分が操作しているプレイヤー」のチーム情報がわからないといけないからです。</p>
<p>「自分が操作しているプレイヤー」の情報をとってくるには<code>Game::PlayerMgr</code>が利用できます。</p>
<p>これは全てのプレイヤーの情報を持っているので、このクラスを利用して「自分が操作してるプレイヤー」の情報だけをとってきます。</p>
<p>自分が操作しているプレイヤーが全プレイヤーの何番目なのかは固定ではないのですが（ホストであれば常に 0 番目であることが保証されます）、<code>Game::PlayerMgr::getControlledPerformer</code>というサブルーチンを使えば「自分が操作しているプレイヤー」の情報が取得できます。</p>
<p>よって、まずはこのサブルーチンを呼び出すことを考えます。</p>
<p>サブルーチン呼び出しには「呼び出したいサブルーチンが定義されているアドレス」と「サブルーチンを呼び出すアドレス」の二つが必要です。</p>
<p>「呼び出すアドレス」はコード開発者が自由に決められるのでどうやって決めるかはのちのち解説します。</p>
<p>よって、まずは<code>Game::PlayerMgr::getControlledPerformer</code>が定義されているアドレスを探しましょう。</p>
<h3 id="game-playermgr-getcontrolledperformer" tabindex="-1"><a class="header-anchor" href="#game-playermgr-getcontrolledperformer" aria-hidden="true">#</a> Game::PlayerMgr::getControlledPerformer</h3>
<table>
<thead>
<tr>
<th style="text-align:center">サブルーチン</th>
<th style="text-align:center">3.1.0</th>
<th style="text-align:center">5.4.0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Game::PlayerMgr::getControlledPerformer</td>
<td style="text-align:center">00F07B1C</td>
<td style="text-align:center">010E6D2C</td>
</tr>
</tbody>
</table>
<p><code>getControlledPerformer()</code>は<code>Game::PlayerMgr</code>クラスのサブルーチンなので先程まで探していたアドレス付近にあります。
これもやはり特徴的な命令があるので簡単に見つけられます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00F07B1C                 STR             X19, [SP,#-0x10+var_10]!
00F07B20                 STP             X29, X30, [SP,#0x10+var_s0]
00F07B24                 ADD             X29, SP, #0x10
00F07B28                 LDRSW           X8, [X0,#0x5C8]
00F07B2C                 LDR             W9, [X0,#0x624]
00F07B30                 CMP             W9, W8
00F07B34                 B.LE            loc_F07B64
00F07B38                 LDR             X10, [X0,#0x638]
00F07B3C                 LDR             W9, [X0,#0x630]
00F07B40                 ADD             X11, X10, X8,LSL#3
00F07B44                 CMP             W9, W8
00F07B48                 CSEL            X8, X11, X10, HI
00F07B4C                 LDR             X19, [X8]
00F07B50                 CBZ             X19, loc_F07B68
00F07B54                 LDRB            W8, [X19,#0x430]
00F07B58                 CBZ             W8, loc_F07B68
00F07B5C                 BL              _ZN2Lp3Utl31printStackTraceIfLastWarningAddEv ; Lp::Utl::printStackTraceIfLastWarningAdd(void)
00F07B60                 B               loc_F07B68
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>バイナリ検索で<code>08 C8 85 B9 09 24 46 B9 3F 01 08 6B 8D 01 00 54</code>とすれば 010E6D38 がヒットすると思います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>010E6D2C                 STR             X19, [SP,#-0x10+var_10]!
010E6D30                 STP             X29, X30, [SP,#0x10+var_s0]
010E6D34                 ADD             X29, SP, #0x10
010E6D38                 LDRSW           X8, [X0,#0x5C8]
010E6D3C                 LDR             W9, [X0,#0x624]
010E6D40                 CMP             W9, W8
010E6D44                 B.LE            loc_10E6D74
010E6D48                 LDR             X10, [X0,#0x638]
010E6D4C                 LDR             W9, [X0,#0x630]
010E6D50                 ADD             X11, X10, X8,LSL#3
010E6D54                 CMP             W9, W8
010E6D58                 CSEL            X8, X11, X10, HI
010E6D5C                 LDR             X19, [X8]
010E6D60                 CBZ             X19, loc_10E6D78
010E6D64                 LDRB            W8, [X19,#0x430]
010E6D68                 CBZ             W8, loc_10E6D78
010E6D6C                 BL              sub_19F8C5C
010E6D70                 B               loc_10E6D78
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>するとやはり一発で見つかります。</p>
<p>サブルーチンのアドレスというのは「サブルーチンの先頭アドレス」を意味するので、この場合は 010E6D2C ということになります。</p>
<p>これで「呼び出したいサブルーチンのアドレス」は分かったので、次は「呼び出すアドレス」を決めます。</p>
<p>「探す」ではなく「決める」と書いたのは、ここまで分かった情報で「好きなアドレスから<code>Game::PlayerMgr</code>クラスを読み込み、<code>getControlledPerformer()</code>をコールして自分のプレイヤー情報を読み込み、チームを変更する」というコードは書けるからです。</p>
<p>しかし、このままでは自分が好きなタイミングでチームを変更することができません。</p>
<p>要するに、ナイスやカモンを押したタイミングでチームを変えたいので、ナイスやカモンの本来の動作をチーム変更コードに上書きしたいわけです。</p>
<p>なので、今回はナイスやカモンの挙動のうち、上書きしてもゲームの動作に問題ない箇所を探せば良いことになります。</p>
<h3 id="game-playerclonehandle-sendsignalevent" tabindex="-1"><a class="header-anchor" href="#game-playerclonehandle-sendsignalevent" aria-hidden="true">#</a> Game::PlayerCloneHandle::sendSignalEvent</h3>
<p>上書きしても大丈夫なナイスやカモンをコールしたときに呼び出されるサブルーチンとしていつも使っているのが<code>Game::PlayerCloneHandle::sendSignalEvent()</code>です。</p>
<p>これは別にこのサブルーチンでなくても他のサブルーチンでも代用できます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">サブルーチン</th>
<th style="text-align:center">3.1.0</th>
<th style="text-align:center">5.4.0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Game::PlayerCloneHandle::sendSignalEvent</td>
<td style="text-align:center">00E797FC</td>
<td style="text-align:center">0104C94C</td>
</tr>
</tbody>
</table>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC                 STR             X19, [SP,#-0x10+var_10]!
00E79800                 STP             X29, X30, [SP,#0x10+var_s0]
00E79804                 ADD             X29, SP, #0x10
00E79808                 STUR            W1, [X29,#var_4]
00E7980C                 LDUR            W8, [X29,#var_4]
00E79810                 MOV             X19, X0
00E79814                 STRB            W8, [SP,#0x10+var_8]
00E79818                 BL              _ZNK4Game15CloneHandleBase14isOfflineSceneEv ; Game::CloneHandleBase::isOfflineScene(void)
00E7981C                 TBZ             W0, #0, loc_E79828
00E79820                 MOV             W0, #1
00E79824                 B               loc_E79834
00E79828                 LDR             X0, [X19,#0x10]
00E7982C                 ADD             X1, SP, #0x10+var_8
00E79830                 BL              _ZN4Game14PlayerCloneObj21pushPlayerSignalEventERKNS_22PlayerSignalCloneEventE ; Game::PlayerCloneObj::pushPlayerSignalEvent
00E79834                 LDP             X29, X30, [SP,#0x10+var_s0]
00E79838                 AND             W0, W0, #1
00E7983C                 LDR             X19, [SP+0x10+var_10],#0x20
00E79840                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>これも特徴的な命令があるのでバイナリ検索で<code>FD 43 00 91 A1 C3 1F B8 A8 C3 5F B8 F3 03 00 AA</code>と検索すれば一発で見つかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C                 STR             X19, [SP,#var_20]!
0104C950                 STP             X29, X30, [SP,#0x20+var_10]
0104C954                 ADD             X29, SP, #0x20+var_10
0104C958                 STUR            W1, [X29,#-4]
0104C95C                 LDUR            W8, [X29,#-4]
0104C960                 MOV             X19, X0
0104C964                 STRB            W2, [SP,#0x20+var_17]
0104C968                 STRB            W8, [SP,#0x20+var_18]
0104C96C                 BL              sub_5BC880
0104C970                 TBZ             W0, #0, loc_104C97C
0104C974                 MOV             W0, #1
0104C978                 B               loc_104C988
0104C97C                 LDR             X0, [X19,#0x10]
0104C980                 ADD             X1, SP, #0x20+var_18
0104C984                 BL              sub_104E590
0104C988                 LDP             X29, X30, [SP,#0x20+var_10]
0104C98C                 AND             W0, W0, #1
0104C990                 LDR             X19, [SP+0x20+var_20],#0x20
0104C994                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>これで命令を呼び出したいアドレスを決めることができました。</p>
<h3 id="テンプレートを完成させよう-1" tabindex="-1"><a class="header-anchor" href="#テンプレートを完成させよう-1" aria-hidden="true">#</a> テンプレートを完成させよう</h3>
<p>さて、ここで<code>Game::PlayerCloneHandle::sendSignalEvent</code>の内容全てをテンプレートで上書きします。</p>
<p>テンプレートの方が命令が少ないので余った部分には何もしないを意味する NOP を埋めておきます。</p>
<p>埋めていなくても RET 命令があるためここの命令は実行されないのですが、解説ではわかりやすさを重視して入れておきます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C STP X29, X30, [SP, #-0x10]!
0104C94C MOV X29, SP
0104C94C ADRP X0, #0xXXXXX000
0104C94C LDR X0, [X0, #0xYYY]
0104C94C LDR X0, [X0]
0104C94C BL #0xAAAAAAAA - 0xBBBBBBBB
0104C94C LDR X1, [X0, #0x328]
0104C94C EOR X1, X1, #1
0104C94C STR X1, [X0, #0x328]
0104C94C LDR X1, [X0, #0x488]
0104C94C STR X1, [X0, #0x38]
0104C94C LDP X29, X30, [SP], #0x10
0104C94C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>あとはこの四つのパラメータを計算したら終わりです。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">XXXXX000</td>
<td style="text-align:center">下三桁が 0 の値 Game::PlayerMgr のアドレスを使って計算する</td>
</tr>
<tr>
<td style="text-align:center">YYY</td>
<td style="text-align:center">XXXXX000 に対するオフセット <br> Game::PlayerMgr のアドレスを使って計算する</td>
</tr>
<tr>
<td style="text-align:center">AAAAAAAA</td>
<td style="text-align:center">Game::PlayerMgr::getControlledPerformer のアドレス</td>
</tr>
<tr>
<td style="text-align:center">BBBBBBBB</td>
<td style="text-align:center">この命令が書かれるアドレス</td>
</tr>
</tbody>
</table>
<p>これらを計算するのに必要なデータも載せます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">求め方</th>
<th style="text-align:center">値</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">XXXXX</td>
<td style="text-align:center">計算式は後述</td>
<td style="text-align:center">01CB1</td>
</tr>
<tr>
<td style="text-align:center">YYY</td>
<td style="text-align:center">Game::PlayerMgr のアドレスの下三桁</td>
<td style="text-align:center">CF8</td>
</tr>
<tr>
<td style="text-align:center">AAAAAAAA</td>
<td style="text-align:center">Game::PlayerMgr::getControlledPerformer のアドレス</td>
<td style="text-align:center">010E6D2C</td>
</tr>
<tr>
<td style="text-align:center">BBBBBBBB</td>
<td style="text-align:center">BL 命令が書かれるアドレス</td>
<td style="text-align:center">0104C960</td>
</tr>
</tbody>
</table>
<p>ここで XXXXX 以外の値は簡単にわかります。問題は XXXXX なのですが、これは</p>
<p><code>Game::PlayerMgr</code>のアドレスの上五桁からこの命令（ADRP）が書かれるアドレスの上五桁を引いたものになります。今回の場合ですと、</p>
<p>$02CFD-0104C=01CB1$</p>
<p>となり、XXXXX = 01CB1 となります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0104C94C STP X29, X30, [SP, #-0x10]!
0104C94C MOV X29, SP
0104C94C ADRP X0, #0x1CB1000
0104C94C LDR X0, [X0, #0xCF8]
0104C94C LDR X0, [X0]
0104C94C BL #0x9A3CC
0104C94C LDR X1, [X0, #0x328]
0104C94C EOR X1, X1, #1
0104C94C STR X1, [X0, #0x328]
0104C94C LDR X1, [X0, #0x488]
0104C94C STR X1, [X0, #0x38]
0104C94C LDP X29, X30, [SP], #0x10
0104C94C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>ここまでをまとめるとこうなります。</p>
<p>あとはこれを<a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>で変換すれば IPSwitch 形式のコードが得られます。</p>
<p>BL 命令はまとめて変換するとオフセットがズレるバグがあるので、BL 命令の箇所だけは必ず個別に変換してください。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Swap Team Color by Signal (5.4.0) [tkgling]
@disabled
0104C94C FD7BBFA9 // STP X29, X30, [SP, #-0x10]!
0104C94C FD030091 // MOV X29, SP
0104C94C 80E500B0 // ADRP X0, #0x1CB1000
0104C94C 007C46F9 // LDR X0, [X0, #0xCF8]
0104C94C 000040F9 // LDR X0, [X0]
0104C94C F3680294 // BL #0x9A3CC
0104C94C 019441F9 // LDR X1, [X0, #0x328]
0104C94C 210040D2 // EOR X1, X1, #1
0104C94C 019401F9 // STR X1, [X0, #0x328]
0104C94C 014442F9 // LDR X1, [X0, #0x488]
0104C94C 011C00F9 // STR X1, [X0, #0x38]
0104C94C FD7BC1A8 // LDP X29, X30, [SP], #0x10
0104C94C C0035FD6 // RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="動作テストをしてみる-1" tabindex="-1"><a class="header-anchor" href="#動作テストをしてみる-1" aria-hidden="true">#</a> 動作テストをしてみる</h3>
<p><video controls src="https://video.twimg.com/ext_tw_video/1397085676164632577/pu/vid/1280x720/vP10raBucY9XVDty.mp4"></video></p>
<p>記事は以上。</p>
</template>
