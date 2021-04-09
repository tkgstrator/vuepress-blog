---
title: "[IPSwitch] 誰でもできるコード開発 #9"
date: "2021-02-14"
category:
  - Hack
  - IPSwitch
---

## インスタンスをコールするコード

IPSwitch 形式のコードには単純に命令を上書きするものと、インスタンスを読み込んで中身を書き換えるものがあります。

前者の一例を挙げるとスペシャルウエポンの塗りポイントを 0 にするようなものが考えられます。

// Special Cost 0 \[tkgling\] \[3.1.0\]
@disabled
000847B4 3F0000F9 // STR WZR, \[X1\]

本来パラメータファイルから必要な塗りポイントを取得してレジスタに格納している命令が`0x000864E8`に書かれているのですが、それを上書きするパッチになります。

ゼロレジスタ（XZR）という読み込むと必ず 0 を返す特別なレジスタを使って X1 レジスタが保持するメモリアドレスに 0 というデータを書き込みます。X1 レジスタはそれぞれのブキのスペシャルウエポン発動に必要な塗りポイントのパラメータを格納する場所なので、このパッチがあれば必要塗りポイントが 0 になるという仕組みです。

このパッチはバージョンを問わず常に命令部`3F0000F9`の値は変わらず、ゲームのバージョンによって実行ファイル内の関数のアドレスがズレるだけなので「アドレスだけを移植すれば動作するコード」ということができるわけです。

それに対してインスタンスを参照するコードは命令部にプログラムのアドレスを参照する内容が書かれているので、アドレス部だけを変えても動作させることはできません。

### インスタンス参照コード

// Got 9999 Power Eggs by Signal \[tkgling\] \[3.1.0\]
@enabled
00E797FC 60970190 // ADRP X0, #0x32EC000
00E79800 00DC46F9 // LDR X0, \[X0, #0xDB8\]
00E79804 000040F9 // LDR X0, \[X0\] // X0 = PlayerDirector
00E79808 01B841F9 // LDR X1, \[X0, #0x370\] // X1 = mTotalBankedPowerIkuraNum
00E7980C 21084091 // ADD X1, X1, #0x2000 // X1 = X1 + 8192
00E79810 213C1C91 // ADD X1, X1, #0x70F // X1 = X1 + 1807
00E79814 01B801F9 // STR X1, \[X0, #0x370\] // mTotalBankedPowerIkuraNum = X1
00E79818 C0035FD6 // RET // Return

これはカモンかナイスを押せば赤イクラ取得数が 9999 になるコードですが、最初の二行のコードが PlayerDirector のインスタンスを読み込む内容になっています。

で、ここが大事なところでインスタンスのアドレスはスプラトゥーンの実行ファイル内にあり、バージョンが上がるとここの値も変わってしまうということです。つまり「アドレスと命令（命令内のアドレス）の両方を書き換えないと動かないコード」になるわけです。

バージョン 3.1.0 以降ではプログラム内のデバッグシンボルが削除されているので、インスタンスを探すのはめんどくさかったりします。

誰かが wiki みたいなのつくってインスタンスのまとめつくってくれたら楽なんですけどね。まあめんどくさいから誰もしないと思います。

## インスタンスを探そう

インスタンスとは要はクラスを実体化したものですので、クラスの数だけインスタンスの種類があることになります。

例えば、サーモンランに関するインスタンスはこれだけあります。

<table><tbody><tr><td class="has-text-align-center" data-align="center">クラス</td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">意味</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::RewardConfig</td><td class="has-text-align-center" data-align="center">04157FB0</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::RuleConfig</td><td class="has-text-align-center" data-align="center">04158008</td><td class="has-text-align-center" data-align="center">パラメータを設定する</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::LevelsConfig</td><td class="has-text-align-center" data-align="center">04160E00</td><td class="has-text-align-center" data-align="center">詳細なパラメータを設定する</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::Setting</td><td class="has-text-align-center" data-align="center">04160E08</td><td class="has-text-align-center" data-align="center">キケン度やステージなどの設定を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::VictoryClamDirector</td><td class="has-text-align-center" data-align="center">04162050</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::CameraHolder</td><td class="has-text-align-center" data-align="center">04164DF0</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::GraphMgr</td><td class="has-text-align-center" data-align="center">04164E40</td><td class="has-text-align-center" data-align="center">GraphNodeを司る？</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::ItemDirector</td><td class="has-text-align-center" data-align="center">04165738</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::EnemyDirector</td><td class="has-text-align-center" data-align="center">04165740</td><td class="has-text-align-center" data-align="center">シャケを司るクラス</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::PlayerDirector</td><td class="has-text-align-center" data-align="center">04165DB8</td><td class="has-text-align-center" data-align="center">サーモンランのプレイヤー情報を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::EventDirector</td><td class="has-text-align-center" data-align="center">04167BC0</td><td class="has-text-align-center" data-align="center">夜イベントなどの情報を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::SeaSurfaceMgr</td><td class="has-text-align-center" data-align="center">04167C20</td><td class="has-text-align-center" data-align="center">潮位の変化を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::GuideDirector</td><td class="has-text-align-center" data-align="center">04167E18</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::Moderator</td><td class="has-text-align-center" data-align="center">04168C78</td><td class="has-text-align-center" data-align="center">クマサンの挙動を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::ResultPlayReport</td><td class="has-text-align-center" data-align="center">04169050</td><td class="has-text-align-center" data-align="center">リザルトデータを司る</td></tr></tbody></table>

### Game::PlayerMgr::sInstance

ナワバリバトルやガチマッチで使うプレイヤーデータを司るクラスです。

チーム変更や、持っているブキやスペシャルを変更したりする場合にはこのクラスを使います。

<table><tbody><tr><td class="has-text-align-center" data-align="center"></td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.3.1</td></tr><tr><td class="has-text-align-center" data-align="center">アドレス</td><td class="has-text-align-center" data-align="center">0x04157578</td><td class="has-text-align-center" data-align="center">0x02CFDCF8</td></tr><tr><td class="has-text-align-center" data-align="center">検索位置</td><td class="has-text-align-center" data-align="center">0x005C5758</td><td class="has-text-align-center" data-align="center">0x007605C0</td></tr><tr><td class="has-text-align-center" data-align="center">検索バイナリ</td><td class="has-text-align-center" data-align="center">08 C0 50 39 1F 01 00 71 E0 13 80 9A</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

このインスタンスの見つけ方ですが`Game::Coop::Utl::GetPlayer()`という関数がプレイヤーのデータを取得する際に`Game::PlayerMgr`を呼び出しているので、それを利用します。

// Game::Coop::Utl::GetPlayer(Game::Coop::Utl \*\_\_hidden this, int) \[3.1.0\]
005C5758 MOV W8, W0
005C575C TBNZ W8, #0x1F, loc_5C5794
005C5760 STP X29, X30, \[SP,#-0x10+var_s0\]!
005C5764 MOV X29, SP
005C5768 ADRP X9, #off_4157578@PAGE
005C576C LDR X9, \[X9,#off_4157578@PAGEOFF\]
005C5770 LDR X0, \[X9\] ; this
005C5774 MOV W1, W8 ; unsigned int
005C5778 BL \_ZNK4Game9PlayerMgr18getAllKindPlayerAtEj
005C577C LDP X29, X30, \[SP+var_s0\],#0x10
005C5780 CBZ X0, locret_5C5790
005C5784 LDRB W8, \[X0,#0x430\]
005C5788 CMP W8, #0
005C578C CSEL X0, XZR, X0, NE

見ると 0x005C5778 で`_ZNK4Game9PlayerMgr18getAllKindPlayerAtEj`が呼び出されています。これを[デマングル](http://demangler.com/)すると`Game::PlayerMgr::getAllKindPlayerAt(unsigned int) const`ということがわかります。

`Game::Coop::Utl`クラス内で`Game::PlayerMgr`クラスのメソッドが呼びだされているので、呼び出す前に必ずそのクラスのインスタンスを呼び出していなければいけません。となると 0x4157578 が探していた`Game::PlayerMgr`クラスのアドレスであることがわかるのです。

つまり、`Game::PlayerMgr`を探すためには先に`Game::Coop::Utl::GetPlayer()`のサブルーチンを探せば良いことになります。このサブルーチンは比較的特徴的な命令を持っているので、

005C5784 LDRB W8, \[X0,#0x430\]
005C5788 CMP W8, #0
005C578C CSEL X0, XZR, X0, NE

この三つの命令群をバイナリ検索すれば簡単に見つけられます。これを ARM64 に変換すると`08 C0 50 39 1F 01 00 71 E0 13 80 9A`になります。これをバイナリ検索すれば 5.3.1 の場合 0x007605EC がヒットすると思います。

// Game::Coop::Utl::GetPlayer(Game::Coop::Utl \*\_\_hidden this, int) \[5.3.1\]
007605C0 MOV W8, W0
007605C4 TBNZ W8, #0x1F, loc_7605FC
007605C8 STP X29, X30, \[SP,#-0x10+var_s0\]!
007605CC MOV X29, SP
007605D0 ADRP X9, #off_2CFDCF8@PAGE
007605D4 LDR X9, \[X9,#off_2CFDCF8@PAGEOFF\]
007605D8 LDR X0, \[X9\]
007605DC MOV W1, W8
007605E0 BL \_ZNK4Game9PlayerMgr18getAllKindPlayerAtEj
007605E4 LDP X29, X30, \[SP+var_s0\],#0x10
007605E8 CBZ X0, locret_7605F8
007605EC LDRB W8, \[X0,#0x430\]
007605F0 CMP W8, #0
007605F4 CSEL X0, XZR, X0, NE

すると 0x02CFDCF8 が 5.3.1 における`Game::PlayerMgr`のアドレスだとわかるわけです。

### Game::Coop::PlayerDirector

サーモンランで使うプレイヤーデータを司るクラスです。

金イクラ数や赤イクラ数の変更などをする場合にはこのクラスを使います。

<table><tbody><tr><td class="has-text-align-center" data-align="center"></td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.3.1</td></tr><tr><td class="has-text-align-center" data-align="center">アドレス</td><td class="has-text-align-center" data-align="center">0x04165DB8</td><td class="has-text-align-center" data-align="center">0x02D0CEE0</td></tr><tr><td class="has-text-align-center" data-align="center">検索位置</td><td class="has-text-align-center" data-align="center">0x005A615C</td><td class="has-text-align-center" data-align="center">0x0073EC84</td></tr><tr><td class="has-text-align-center" data-align="center">検索バイナリ</td><td class="has-text-align-center" data-align="center">F3 03 00 AA 74 22 0D D1 08 41 00 91</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

このインスタンスは`Game::Coop::PlayerDirector`のでデコンストラクタを使って探すのが楽ではないかと思います。

// Game::Coop::PlayerDirector::~PlayerDirector(Game::Coop::PlayerDirector \*\_\_hidden this) \[3.1.0\]
005A6130 STP X20, X19, \[SP,#-0x10+var_10\]!
005A6134 STP X29, X30, \[SP,#0x10+var_s0\]
005A6138 ADD X29, SP, #0x10
005A613C ADRP X8, #off_4168FF8@PAGE
005A6140 LDR X8, \[X8,#off_4168FF8@PAGEOFF\]
005A6144 MOV X19, X0
005A6148 SUB X20, X19, #0x348
005A614C ADD X8, X8, #0x10
005A6150 STR X8, \[X19\]
005A6154 ADRP X8, #off_4165DB8@PAGE
005A6158 LDR X8, \[X8,#off_4165DB8@PAGEOFF\]
005A615C STR XZR, \[X8\]
005A6160 BL \_ZN4sead9IDisposerD2Ev
005A6164 ADRP X8, #off_4156138@PAGE
005A6168 LDR X8, \[X8,#off_4156138@PAGEOFF\]
005A616C ADD X8, X8, #0x10
005A6170 STR X8, \[X20\]
005A6174 LDP X29, X30, \[SP,#0x10+var_s0\]
005A6178 SUB X0, X19, #0x230 ; this
005A617C LDP X20, X19, \[SP+0x10+var_10\],#0x20
005A6180 B \_ZN4sead3JobD2Ev

何が書いてあるかさっぱりだと思うのですが、上から 10 行目の 0x04165DB8 が`Game::Coop::PlayerDirector`のアドレスになります。

005A6144 MOV X19, X0
005A6148 SUB X20, X19, #0x348
005A614C ADD X8, X8, #0x10
005A6150 STR X8, \[X19\]

幸いなことにこのサブルーチンにも特徴的な命令があり、これをバイナリに変換すると`F3 03 00 AA 74 22 0D D1 08 41 00 91 68 02 00 F9`となります。これは似たようなサブルーチンがいくつかあるので、しっかりと見極めましょう。

5.3.1 の場合はバイナリ検索では次の 12 回のサブルーチンがヒットすると思うのですが、10 回目にヒットするところが`Game::Coop::PlayerDirector`のデコンストラクタのサブルーチンになります。バージョンによって何回目のサブルーチンなのかは変わる可能性がありますが、候補は 6 つしかないのでそのときは適当に全部試してみてください。

006E3310, 006E3364
006F3054, 006F30A8
006FF75C, 006FF7B0
0070A74C, 0070A7A0
0073EC30, 0073EC84
01386678, 013866CC

なので 0x0073EC84 のサブルーチンをチェックします。

// Game::Coop::PlayerDirector::~PlayerDirector(Game::Coop::PlayerDirector \*\_\_hidden this) \[5.3.1\]
0073EC84 STP X20, X19, \[SP,#var_20\]!
0073EC88 STP X29, X30, \[SP,#0x20+var_10\]
0073EC8C ADD X29, SP, #0x20+var_10
0073EC90 ADRP X8, #off_2D100B8@PAGE
0073EC94 LDR X8, \[X8,#off_2D100B8@PAGEOFF\]
0073EC98 MOV X19, X0
0073EC9C SUB X20, X19, #0x348
0073ECA0 ADD X8, X8, #0x10
0073ECA4 STR X8, \[X19\]
0073ECA8 ADRP X8, #off_2D0CEE0@PAGE
0073ECAC LDR X8, \[X8,#off_2D0CEE0@PAGEOFF\]
0073ECB0 STR XZR, \[X8\]
0073ECB4 BL sub_171A9C8
0073ECB8 ADRP X8, #off_2CFCF90@PAGE
0073ECBC LDR X8, \[X8,#off_2CFCF90@PAGEOFF\]
0073ECC0 ADD X8, X8, #0x10
0073ECC4 SUB X0, X19, #0x230
0073ECC8 STR X8, \[X20\]
0073ECCC BL nullsub_198
0073ECD0 LDP X29, X30, \[SP,#0x20+var_10\]
0073ECD4 MOV X0, X20 ; void \*
0073ECD8 LDP X20, X19, \[SP+0x20+var_20\],#0x20
0073ECDC B \_ZdlPv ; operator delete(void \*)

同様に上から 10 番目の命令を見ればアドレスが 0x02D0CEE0 であることがわかります。

## チーム変更コードを移植しよう

インスタンスのアドレスが分かったので、あとはコードを移植するだけになります。

全てをそのまま使うことはできないのですが、テンプレートがあるのでそれを使えば空いているところに値を入れるだけで移植ができます。

### チーム変更コードテンプレート

STP X29, X30, \[SP, #-0x10\]!
MOV X29, SP
ADRP X8, #0xXXXXX000
LDR X8, \[X8, #0xYYY\]
LDR X0, \[X8\]
BL #0xAAAAAAAA - 0xBBBBBBBB
LDR X8, \[X0, #0x328\]
EOR X8, X8, #1
STR X8, \[X0, #0x328\]
LDP X29, X30, \[SP\], #0x10
RET

チーム変更コードの移植に必要なのは四つの値です。

<table><tbody><tr><td class="has-text-align-center" data-align="center">パラメータ</td><td class="has-text-align-center" data-align="center">意味</td></tr><tr><td class="has-text-align-center" data-align="center">XXXXX</td><td class="has-text-align-center" data-align="center">Game::PlayerMgrのアドレスを使って計算する</td></tr><tr><td class="has-text-align-center" data-align="center">YYY</td><td class="has-text-align-center" data-align="center">XXXXX000に対するオフセット<br>Game::PlayerMgrのアドレスを使って計算する</td></tr><tr><td class="has-text-align-center" data-align="center">AAAAAAAA</td><td class="has-text-align-center" data-align="center">Game::PlayerMgr::getControlledPerformerのアドレス</td></tr><tr><td class="has-text-align-center" data-align="center">BBBBBBBB</td><td class="has-text-align-center" data-align="center">この命令が書かれるアドレス</td></tr></tbody></table>

必要な四つのパラメータ

これらの値を計算するためにはあと二つのアドレスがわからなければいけません。というのも、チーム変更は「自分が操作したいプレイヤー」のチーム情報がわからないといけないからです。`Game::PlayerMgr`は全てのプレイヤーの情報を管理しているので、そこから「自分のプレイヤー」の情報だけをとってくる必要があります。

これには`Game::PlayerMgr::getControlledPerformer`が使えますので、まずはこのサブルーチンを呼び出すことを考えます。サブルーチン呼び出しには「呼び出したいサブルーチンが定義されているアドレス」と「サブルーチンを呼び出すアドレス」の二つが必要です。

よって、まずは`Game::PlayerMgr::getControlledPerformer`が定義されているアドレスを探しましょう。

### Game::PlayerMgr::getControlledPerformer

<table><tbody><tr><td class="has-text-align-center" data-align="center">サブルーチン</td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.3.1</td></tr><tr><td class="has-text-align-center" data-align="center">Game::PlayerMgr::getControlledPerformer</td><td class="has-text-align-center" data-align="center">0x00F07B1C</td><td class="has-text-align-center" data-align="center">0x010E6E38</td></tr></tbody></table>

Game::PlayerMgr::getControlledPerformer

getControlledPerformer()は`Game::PlayerMgr`クラスのサブルーチンなので先程まで探していたアドレス付近にあります。これもやはり特徴的な命令があるので簡単に見つけられます。

// Game::PlayerMgr::getControlledPerformer(Game::PlayerMgr \*\_\_hidden this) \[3.1.0\]
00F07B1C STR X19, \[SP,#-0x10+var_10\]!
00F07B20 STP X29, X30, \[SP,#0x10+var_s0\]
00F07B24 ADD X29, SP, #0x10
00F07B28 LDRSW X8, \[X0,#0x5C8\]
00F07B2C LDR W9, \[X0,#0x624\]
00F07B30 CMP W9, W8
00F07B34 B.LE loc_F07B64
00F07B38 LDR X10, \[X0,#0x638\]
00F07B3C LDR W9, \[X0,#0x630\]
00F07B40 ADD X11, X10, X8,LSL#3
00F07B44 CMP W9, W8
00F07B48 CSEL X8, X11, X10, HI
00F07B4C LDR X19, \[X8\]
00F07B50 CBZ X19, loc_F07B68
00F07B54 LDRB W8, \[X19,#0x430\]
00F07B58 CBZ W8, loc_F07B68
00F07B5C BL \_ZN2Lp3Utl31printStackTraceIfLastWarningAddEv
00F07B60 B loc_F07B68

バイナリ検索で`08 C8 85 B9 09 24 46 B9 3F 01 08 6B 8D 01 00 54`とすれば 0x010E6E44 がヒットすると思います。

// Game::PlayerMgr::getControlledPerformer(Game::PlayerMgr \*\_\_hidden this) \[5.3.1\]
010E6E38 STR X19, \[SP,#-0x10+var_10\]!
010E6E3C STP X29, X30, \[SP,#0x10+var_s0\]
010E6E40 ADD X29, SP, #0x10
010E6E44 LDRSW X8, \[X0,#0x5C8\]
010E6E48 LDR W9, \[X0,#0x624\]
010E6E4C CMP W9, W8
010E6E50 B.LE loc_10E6E80
010E6E54 LDR X10, \[X0,#0x638\]
010E6E58 LDR W9, \[X0,#0x630\]
010E6E5C ADD X11, X10, X8,LSL#3
010E6E60 CMP W9, W8
010E6E64 CSEL X8, X11, X10, HI
010E6E68 LDR X19, \[X8\]
010E6E6C CBZ X19, loc_10E6E84
010E6E70 LDRB W8, \[X19,#0x430\]
010E6E74 CBZ W8, loc_10E6E84
010E6E78 BL sub_19F8C5C
010E6E7C B loc_10E6E84

するとやはり一発で見つかります。サブルーチンのアドレスというのは「サブルーチンの先頭アドレス」を意味するので、この場合は 0x10E6E38 ということになります。

これで「呼び出したいサブルーチンのアドレス」は分かったので、次は「呼び出すアドレス」を決めます。

「探す」ではなく「決める」と書いたのは、ここまで分かった情報で「好きなアドレスから Game::PlayerMgr クラスを読み込み、getControlledPerformer()をコールして自分のプレイヤー情報を読み込み、チームを変更する」というコードは書けるからです。しかし、このままでは自分が好きなタイミングでチームを変更することができません。

要するに、ナイスやカモンを押したタイミングでチームを変えたいので、ナイスやカモンの本来の動作をチーム変更コードに上書きしたいわけです。なので、今回はナイスやカモンの挙動のうち、上書きしてもゲームの動作に問題ない箇所を探せば良いことになります。

### Game::PlayerCloneHandle::sendSignalEvent

上書きしても大丈夫なナイスやカモンをコールしたときに呼び出されるサブルーチンとしていつも使っているのが`Game::PlayerCloneHandle::sendSignalEvent()`です。

これは別にこのサブルーチンでなくても他のサブルーチンでも代用できます。

<table><tbody><tr><td class="has-text-align-center" data-align="center">サブルーチン</td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.3.1</td></tr><tr><td class="has-text-align-center" data-align="center">Game::PlayerCloneHandle::sendSignalEvent</td><td class="has-text-align-center" data-align="center">0x00E797FC</td><td class="has-text-align-center" data-align="center">0x0104CA58</td></tr></tbody></table>

Game::PlayerCloneHandle::sendSignalEvent

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[3.1.0\]
00E797FC STR X19, \[SP,#var_20\]!
00E79800 STP X29, X30, \[SP,#0x20+var_10\]
00E79704 ADD X29, SP, #0x20+var_10
00E79708 STUR W1, \[X29,#-4\]
00E7970C LDUR W8, \[X29,#-4\]
00E79710 MOV X19, X0
00E79714 STRB W2, \[SP,#0x20+var_17\]
00E79708 STRB W8, \[SP,#0x20+var_18\]
00E7971C BL \_ZNK4Game15CloneHandleBase14isOfflineSceneEv
00E79720 TBZ W0, #0, loc_1042848
00E79724 MOV W0, #1
00E79728 B loc_1042854
00E7972C LDR X0, \[X19,#0x10\]
00E79730 ADD X1, SP, #0x20+var_18
00E79734 BL \_ZN4Game14PlayerCloneObj21pushPlayerSignalEventERKNS_22PlayerSignalCloneEventE
00E79738 LDP X29, X30, \[SP,#0x20+var_10\]
00E7973C AND W0, W0, #1
00E79740 LDR X19, \[SP+0x20+var_20\],#0x20
00E79744 RET

これも特徴的な命令があるのでバイナリ検索で`FD 43 00 91 A1 C3 1F B8 A8 C3 5F B8 F3 03 00 AA`と検索すれば一発で見つかります。

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.3.1\]
0104CA58 STR X19, \[SP,#var_20\]!
0104CA5C STP X29, X30, \[SP,#0x20+var_10\]
0104CA60 ADD X29, SP, #0x20+var_10
0104CA64 STUR W1, \[X29,#-4\]
0104CA68 LDUR W8, \[X29,#-4\]
0104CA6C MOV X19, X0
0104CA70 STRB W2, \[SP,#0x20+var_17\]
0104CA74 STRB W8, \[SP,#0x20+var_18\]
0104CA78 BL sub_5BC880
0104CA7C TBZ W0, #0, loc_104CA88
0104CA80 MOV W0, #1
0104CA84 B loc_104CA94
0104CA88 LDR X0, \[X19,#0x10\]
0104CA8C ADD X1, SP, #0x20+var_18
0104CA90 BL sub_104E69C
0104CA94 LDP X29, X30, \[SP,#0x20+var_10\]
0104CA98 AND W0, W0, #1
0104CA9C LDR X19, \[SP+0x20+var_20\],#0x20
0104CAA0 RET

これで命令を呼び出したいアドレスを決めることができました。

### テンプレートを完成させよう

さて、ここで Game::PlayerCloneHandle::sendSignalEvent の内容全てをテンプレートで上書きします。テンプレートの方が命令が少ないので余った部分には何もしないを意味する NOP を埋めておきます。

埋めていなくても RET 命令があるためここの命令は実行されないのですが、解説ではわかりやすさを重視して入れておきます。

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.3.1\]
0104CA58 STP X29, X30, \[SP, #-0x10\]!
0104CA5C MOV X29, SP
0104CA60 ADRP X8, #0xXXXXX000
0104CA64 LDR X8, \[X8, #0xYYY\]
0104CA68 LDR X0, \[X8\]
0104CA6C BL #0xAAAAAAAA - 0xBBBBBBBB
0104CA70 LDR X8, \[X0, #0x328\]
0104CA74 EOR X8, X8, #1
0104CA78 STR X8, \[X0, #0x328\]
0104CA7C LDP X29, X30, \[SP\], #0x10
0104CA80 RET
0104CA84 NOP
0104CA88 NOP
0104CA8C NOP
0104CA90 NOP
0104CA94 NOP
0104CA98 NOP
0104CA9C NOP
0104CAA0 NOP

あとはこの四つのパラメータを計算したら終わりです。

<table><tbody><tr><td class="has-text-align-center" data-align="center">パラメータ</td><td class="has-text-align-center" data-align="center">意味</td></tr><tr><td class="has-text-align-center" data-align="center">XXXXX000</td><td class="has-text-align-center" data-align="center">下三桁が0の値<br>Game::PlayerMgrのアドレスを使って計算する</td></tr><tr><td class="has-text-align-center" data-align="center">YYY</td><td class="has-text-align-center" data-align="center">XXXXX000に対するオフセット<br>Game::PlayerMgrのアドレスを使って計算する</td></tr><tr><td class="has-text-align-center" data-align="center">AAAAAAAA</td><td class="has-text-align-center" data-align="center">Game::PlayerMgr::getControlledPerformerのアドレス</td></tr><tr><td class="has-text-align-center" data-align="center">BBBBBBBB</td><td class="has-text-align-center" data-align="center">この命令が書かれるアドレス</td></tr></tbody></table>

必要な四つのパラメータ

これらを計算するのに必要なデータも載せます。

<table><tbody><tr><td class="has-text-align-center" data-align="center">パラメータ</td><td class="has-text-align-center" data-align="center">求め方</td><td class="has-text-align-center" data-align="center">値</td></tr><tr><td class="has-text-align-center" data-align="center">XXXXX</td><td class="has-text-align-center" data-align="center">計算式は後述</td><td class="has-text-align-center" data-align="center">01CB1</td></tr><tr><td class="has-text-align-center" data-align="center">YYY</td><td class="has-text-align-center" data-align="center">Game::PlayerMgrのアドレスの下三桁</td><td class="has-text-align-center" data-align="center">CF8</td></tr><tr><td class="has-text-align-center" data-align="center">AAAAAAAA</td><td class="has-text-align-center" data-align="center">Game::PlayerMgr::getControlledPerformerのアドレス</td><td class="has-text-align-center" data-align="center">010E6E38</td></tr><tr><td class="has-text-align-center" data-align="center">BBBBBBBB</td><td class="has-text-align-center" data-align="center">BL命令が書かれるアドレス</td><td class="has-text-align-center" data-align="center">0104CA6C</td></tr></tbody></table>

ここで XXXXX 以外の値は簡単にわかります。問題は XXXXX なのですが、これは

Game::PlayerMgr のアドレスの上五桁からこの命令（ADRP）が書かれるアドレスの上五桁を引いたものになります。今回の場合ですと、

Game::PlayerMgr : 02CFDCF8 -> 02CFD
ADRP : 0104CA60 -> 0104C

XXXXX = 02CFD - 0104C = 01CB1

となり、XXXXX=01CB1 となります。

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.3.1\]
0104CA58 STP X29, X30, \[SP, #-0x10\]!
0104CA5C MOV X29, SP
0104CA60 ADRP X8, #0x01CB1000
0104CA64 LDR X8, \[X8, #0xCF8\]
0104CA68 LDR X0, \[X8\]
0104CA6C BL #0x010E6E38 - 0x0104CA6C
0104CA70 LDR X8, \[X0, #0x328\]
0104CA74 EOR X8, X8, #1
0104CA78 STR X8, \[X0, #0x328\]
0104CA7C LDP X29, X30, \[SP\], #0x10
0104CA80 RET
0104CA84 NOP
0104CA88 NOP
0104CA8C NOP
0104CA90 NOP
0104CA94 NOP
0104CA98 NOP
0104CA9C NOP
0104CAA0 NOP

ここまでをまとめるとこうなります。あとはこれを ARM to HEX Converter で変換すれば IPSwitch 形式のコードが得られます。BL 命令はまとめて変換するとオフセットがズレるバグがあるので、BL 命令の箇所だけは必ず個別に変換してください。

0104CA58 FD7BBFA9
0104CA5C FD030091
0104CA60 88E500B0
0104CA64 087D46F9
0104CA68 000140F9
0104CA6C F3680294 // BL
0104CA70 089441F9
0104CA74 080140D2
0104CA78 089401F9
0104CA7C FD7BC1A8
0104CA80 C0035FD6
0104CA84 1F2003D5
0104CA88 1F2003D5
0104CA8C 1F2003D5
0104CA90 1F2003D5
0104CA94 1F2003D5
0104CA98 1F2003D5
0104CA9C 1F2003D5
0104CAA0 1F2003D5

これだと無意味に長くてわかりにくいので NOP を消したりして簡易表示すると以下のようになります。

// Swap Team Color by Signal \[tkgling\]
@disabled
0104CA58 FD7BBFA9FD030091
0104CA60 88E500B0087D46F9
0104CA68 000140F9F3680294
0104CA70 089441F9080140D2
0104CA78 089401F9FD7BC1A8
0104CA80 C0035FD6

### 動作テストをしてみる

5.3.1 で動作するチーム変更コード

今までと同じように普通に動作します。

## イクラ個数変更コードを移植しよう

イクラの個数変更コードはチーム変更よりも簡単です。

何故なら、Game::Coop::PlayerDirector が全てのプレイヤーの情報を持っているため、わざわざ getControlledPerformer のような操作しているプレイヤー情報を取得する必要がないのです。

もちろん、もっと複雑なコードにする場合は BL 命令で他のサブルーチンを呼び出す必要があるのでちょっとややこしいことになります。

### イクラ個数変更コードテンプレート

ADRP X0, #0xXXXXX000
LDR X0, \[X0, #0xYYY\]
LDR X0, \[X0\]
MOV W1, #0x270F
STR W1, \[X0, #0x370\]
MOV W1, #0x3E7
STR W1, \[X0, #0x378\]
STR W1, \[X0, #0x37C\]
RET

なんでこういうコードになっているかというと、それは以前のコードを見ていただきたいのですが、その記事が若干わかりにくいので簡単に解説。

https://tkgstrator.work/?p=27289

![](https://pbs.twimg.com/media/EW0DrbuWAAEbRE3?format=png&name=4096x4096)

クラスの構造

こんな感じで Game::Coop::PlayerDirector クラスは四人分のデータをもっているので、先頭アドレスを調べてそこの値を上書きしてしまう方法が使えます。

自分がホストをしているのであれば、自分の情報は先頭になるので先頭アドレスから 0x370 ズレたところにデータが入っています。

赤イクラの数を変えたいのであれば 0x370 を、金イクラの数を変えたいのであれば 0x378 を変えれば良いとなるわけです。また、保険として 0x37C も変えておけば完璧です。

### テンプレートを完成させよう

同じように sendSignalEvent をに上書きをします。

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.3.1\]
0104CA58 ADRP X0, #0xXXXXX000
0104CA5C LDR X0, \[X0, #0xYYY\]
0104CA60 LDR X0, \[X0\]
0104CA64 MOV W1, #0x270F
0104CA68 STR W1, \[X0, #0x370\]
0104CA6C MOV W1, #0x3E7
0104CA70 STR W1, \[X0, #0x378\]
0104CA74 STR W1, \[X0, #0x37C\]
0104CA78 RET
0104CA7C NOP
0104CA80 NOP
0104CA84 NOP
0104CA88 NOP
0104CA8C NOP
0104CA90 NOP
0104CA94 NOP
0104CA98 NOP
0104CA9C NOP
0104CAA0 NOP

<table><tbody><tr><td class="has-text-align-center" data-align="center">パラメータ</td><td class="has-text-align-center" data-align="center">意味</td></tr><tr><td class="has-text-align-center" data-align="center">XXXXX000</td><td class="has-text-align-center" data-align="center">下三桁が0の値<br>Game::Coop::PlayerDirectorのアドレスを使って計算する</td></tr><tr><td class="has-text-align-center" data-align="center">YYY</td><td class="has-text-align-center" data-align="center">XXXXX000に対するオフセット<br>Game::Coop::PlayerDirectorのアドレスを使って計算する</td></tr></tbody></table>

必要な四つのパラメータ

Game::Coop::PlayerDirector : 02D0CEE0 -> 02CD0
ADRP : 0104CA58 -> 0104C

XXXXX = 02CD0 - 0104C = 01CC0

なので XXXXX は 01CC0 となり、YYY は EE0 となります。

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.3.1\]
0104CA58 ADRP X0, #0x01CC0000
0104CA5C LDR X0, \[X0, #0xEE0\]
0104CA60 LDR X0, \[X0\]
0104CA64 MOV W1, #0x270F
0104CA68 STR W1, \[X0, #0x370\]
0104CA6C MOV W1, #0x3E7
0104CA70 STR W1, \[X0, #0x378\]
0104CA74 STR W1, \[X0, #0x37C\]
0104CA78 RET
0104CA7C NOP
0104CA80 NOP
0104CA84 NOP
0104CA88 NOP
0104CA8C NOP
0104CA90 NOP
0104CA94 NOP
0104CA98 NOP
0104CA9C NOP
0104CAA0 NOP

これを ARM to HEX Converter で変換するとこうなります。

0104CA58 00E60090
0104CA5C 007047F9
0104CA60 000040F9
0104CA64 E1E18452
0104CA68 017003B9
0104CA6C E17C8052
0104CA70 017803B9
0104CA74 017C03B9
0104CA78 C0035FD6
0104CA7C 1F2003D5
0104CA80 1F2003D5
0104CA84 1F2003D5
0104CA88 1F2003D5
0104CA8C 1F2003D5
0104CA90 1F2003D5
0104CA94 1F2003D5
0104CA98 1F2003D5
0104CA9C 1F2003D5
0104CAA0 1F2003D5

NOP の部分は実際には不要なので整形した上で余計なコードを削除すると、

// Got 9999 PowerEggs and 999 GoldenEggs by sendSignal \[tkgling\]
@disabled
0104CA58 00E60090007047F9
0104CA60 000040F9E1E18452
0104CA68 017003B9E17C8052
0104CA70 017803B9017C03B9
0104CA78 C0035FD6

というコードが得られます。

### 動作テストをしてみる

上手くイクラを取得することができました。

記事は以上。
