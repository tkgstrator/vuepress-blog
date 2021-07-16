<template><h1 id="ipswitch-誰でもできるコード開発-8" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-8" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #8</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2020/05/27/ipswitch07.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #7<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="リアルタイムスペシャル変更コード" tabindex="-1"><a class="header-anchor" href="#リアルタイムスペシャル変更コード" aria-hidden="true">#</a> リアルタイムスペシャル変更コード</h2>
<p>なんとなくつくってみたくなったのでつくった。</p>
<p>Starlight だと簡単だったけど、それだと面白くないのでいつもどおりシグナル Hook してみました。</p>
<h2 id="必要なデータたち" tabindex="-1"><a class="header-anchor" href="#必要なデータたち" aria-hidden="true">#</a> 必要なデータたち</h2>
<p>今回のコードは関数 Hook なので開発難易度は高めです。</p>
<p>プレイヤーにセットされているスペシャル情報をとってくるためには<code>Game::Player</code>クラスが必要なのですが、これを取得するためには<code>Game::PlayerMgr</code>を使って<code>getControlledPerformer()</code>を呼び出す必要があります。</p>
<h3 id="game-playermgr-クラスを探そう" tabindex="-1"><a class="header-anchor" href="#game-playermgr-クラスを探そう" aria-hidden="true">#</a> Game::PlayerMgr クラスを探そう</h3>
<p>となれば、最初に探すべきは<code>Game::PlayerMgr</code>クラスのインスタンスですが、これは<code>PlayerMgr</code>とテキスト検索をかければ見つかります。</p>
<p>以下のような命令群が見つかると思うのですが、後半部分の ADRP 命令で読み込んでいるところが<code>PlayerMgr</code>クラスのインスタンスになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>008A9F44                 ADRP            X8, #aPlayermgr@PAGE ; "PlayerMgr"
008A9F48                 ADD             X8, X8, #aPlayermgr@PAGEOFF ; "PlayerMgr"
008A9F4C                 ADD             X0, SP, #0x80+var_70
008A9F50                 MOV             X1, SP
008A9F54                 MOV             X2, XZR
008A9F58                 STR             X8, [SP,#0x80+var_78]
008A9F5C                 BL              _ZN2Lp3Sys23ActorMemProfilerAutoValC2ERKN4sead14SafeStringBaseIcEENS0_16ActorMemProfiler4FuncE ; Lp::Sys::ActorMemProfilerAutoVal::ActorMemProfilerAutoVal(sead::SafeStringBase&lt;char> const&amp;,Lp::Sys::ActorMemProfiler::Func)
008A9F60                 ADRP            X8, #off_4157578@PAGE
008A9F64                 LDR             X8, [X8,#off_4157578@PAGEOFF]
008A9F68                 LDR             X8, [X8] ; Game::PlayerMgr::sInstance
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>なので、今回の場合は 04157578 が求めているアドレスになります。</p>
<h3 id="sendsignalevent-を探そう" tabindex="-1"><a class="header-anchor" href="#sendsignalevent-を探そう" aria-hidden="true">#</a> SendSignalEvent() を探そう</h3>
<p>バイナリ検索で<code>A1 C3 1F B8 A8 C3 5F B8 F3 03 00 AA</code>と調べると見つけられると思います。</p>
<p>以下のような命令群が、<code>SendSignalEvent()</code>です。</p>
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
00E79830                 BL              _ZN4Game14PlayerCloneObj21pushPlayerSignalEventERKNS_22PlayerSignalCloneEventE ; Game::PlayerCloneObj::pushPlayerSignalEvent(Game::PlayerSignalCloneEvent const&amp;)
00E79834                 LDP             X29, X30, [SP,#0x10+var_s0]
00E79838                 AND             W0, W0, #1
00E7983C                 LDR             X19, [SP+0x10+var_10],#0x20
00E79840                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="getcontrolledperformer-を探そう" tabindex="-1"><a class="header-anchor" href="#getcontrolledperformer-を探そう" aria-hidden="true">#</a> getControlledPerformer() を探そう</h3>
<p>バイナリ検索で<code>43 00 91 08 C8 85 B9 09 24 46 B9</code>と調べると見つけられると思います。</p>
<p>以下のような命令群が<code>getControlledPerformer()</code>です。</p>
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
00F07B64                 MOV             X19, XZR
00F07B68                 LDP             X29, X30, [SP,#0x10+var_s0]
00F07B6C                 MOV             X0, X19
00F07B70                 LDR             X19, [SP+0x10+var_10],#0x20
00F07B74                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="ここまでの情報をまとめよう" tabindex="-1"><a class="header-anchor" href="#ここまでの情報をまとめよう" aria-hidden="true">#</a> ここまでの情報をまとめよう</h3>
<p>さて、ここまで調べたデータをまとめると以下のようになります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">クラス</th>
<th style="text-align:center">3.1.0</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Game::PlayerMgr::sInstance</td>
<td style="text-align:center">04157578</td>
</tr>
<tr>
<td style="text-align:center">Game::PlayerCloneHandle::sendSignalEvent</td>
<td style="text-align:center">00E797FC</td>
</tr>
<tr>
<td style="text-align:center">Game::PlayerMgr::getControlledPerformer</td>
<td style="text-align:center">00F07B1C</td>
</tr>
</tbody>
</table>
<p>ではここから<code>sendSignalEvent()</code>の命令を上書きして、ナイスを押すとスペシャルを切り替えられるようにしましょう。</p>
<h2 id="sendsignalevent-を書き換えよう" tabindex="-1"><a class="header-anchor" href="#sendsignalevent-を書き換えよう" aria-hidden="true">#</a> sendSignalEvent() を書き換えよう</h2>
<p>シグナルを送るコードは上のようになっています。</p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>ここに書かれている命令を、</p>
<ol>
<li><code>Game::PlayerMgr</code>インスタンスを読み込む。</li>
<li><code>Game::PlayerMgr::getControlledPerformer()</code>を呼び出して<code>Game::Player</code>クラスを取得。</li>
<li><code>Game::Player</code>クラスのスペシャル ID の値を上書きする。</li>
</ol>
<p>という命令に上書きすることが今回の目標です。</p>
<h3 id="コールスタックを書こう" tabindex="-1"><a class="header-anchor" href="#コールスタックを書こう" aria-hidden="true">#</a> コールスタックを書こう</h3>
<p>ここで注意するのは上三行と下三行はコールスタックで、BL 命令などで分岐した際にスタックポインタが戻ってくる位置を保存しておくために必要な命令です。</p>
<p>上書きするコードが全く BL 命令などを使わないのであれば消してしまって構わないのですが、今回は<code>getControlledPerformer()</code>を呼び出すのでコールスタックが必要になります。</p>
<p>ただし、上のコードは二回の分岐命令に対応したコールスタックなので、一回しか BL 命令を呼ばないのであればコールスタック自体を書き換えることは可能です。</p>
<p>その場合は以下のようにそれぞれ一行ずつコードを省略することができます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC STP X29, X30, [SP, #-0x10]!
00E79800 MOV X29, SP
00E79804
00E79808
00E7980C
00E79810
00E79814
00E79818
00E7981C
00E79820
00E79824
00E79828
00E7982C
00E79830
00E79834
00E79838
00E7983C
00E79840 LDP X29, X30, [SP], #0x10
00E79844 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="インスタンスを呼び出す" tabindex="-1"><a class="header-anchor" href="#インスタンスを呼び出す" aria-hidden="true">#</a> インスタンスを呼び出す</h3>
<p>インスタンスを呼び出すコードは何度か説明しているのですが今回も説明します！</p>
<p>これはテンプレートとして覚えたほうが早いのですが、以下の三手一組のコードがインスタンスを呼び出して X0 レジスタに格納するコードです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0xXXXXX000
LDR X0, [X0, #0xYYY]
LDR X0, [X0]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>やることは XXXXX と YYY の値を求めるだけなので簡単ですね。</p>
<p>これらを求めるためには「目的アドレス」と「呼び出し元アドレス」の二つが必要になります。目的アドレスは今回呼び出したい「<code>Game::PlayerMgr</code>クラスのインスタンスのアドレス」、「呼び出し元アドレス」は本来は「命令を上書きしたいアドレス」なのですが 0x1000 以下のズレはオフセットで補正できるので「<code>sendSignalEvent()</code>のアドレス」と考えても問題ありません。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Game::PlayerMgr::sInstance</th>
<th style="text-align:center">Game::PlayerCloneHandle::sendSignalEvent</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">04157578</td>
<td style="text-align:center">00E797FC</td>
</tr>
</tbody>
</table>
<ul>
<li>XXXXX の求め方</li>
</ul>
<p>目的アドレスと Hook アドレスの下三桁無くした、目的アドレス - Hook アドレスの計算結果が XXXXX になります。</p>
<p>$04157-00E79=032DE$</p>
<p>これは Windows 標準の電卓で簡単に計算することができます。</p>
<ul>
<li>YYY の求め方</li>
</ul>
<p>目的アドレスの下三桁なので 578 になります。</p>
<p>ここまでをまとめると、<code>Game::PlayerMgr</code>のインスタンスを呼び出すテンプレートの命令は以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>あとはこのコードを最初に書いた上書き命令のテンプレートにくっつけるだけです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC STP X29, X30, [SP, #-0x10]!
00E79800 MOV X29, SP
00E79804 ADRP X0, #0x32DE000
00E79808 LDR X0, [X0, #0x578]
00E7980C LDR X0, [X0]
00E79810
00E79814
00E79818
00E7981C
00E79820
00E79824
00E79828
00E7982C
00E79830
00E79834
00E79838
00E7983C
00E79840 LDP X29, X30, [SP], #0x10
00E79844 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="getcontrolledperformer-を呼び出そう" tabindex="-1"><a class="header-anchor" href="#getcontrolledperformer-を呼び出そう" aria-hidden="true">#</a> getControlledPerformer() を呼び出そう</h3>
<p><code>getControlledPerformer()</code>は BL 命令で呼び出すことができます。</p>
<p>BL 命令で必要なのは「呼び出し先アドレス」と「呼び出し元アドレス」の二つです。先程のインスタンスを呼び出すときと違い、オフセットがないのでアドレスが一つでもズレると正しく呼び出せずにクラッシュすることに気をつけましょう。</p>
<table>
<thead>
<tr>
<th style="text-align:center">getControlledPerformer()</th>
<th style="text-align:center">BL 命令をコールするアドレス</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">00F07B1C</td>
<td style="text-align:center">00E79810</td>
</tr>
</tbody>
</table>
<p>呼び出し先アドレスはすぐにわかるのですが「呼び出し元はどこか」となりますよね。</p>
<p>$00F07B1C-00E79810=0008E30C$</p>
<p>ここも Windows 謹製の電卓を使って差を計算しましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC STP X29, X30, [SP, #-0x10]!
00E79800 MOV X29, SP
00E79804 ADRP X0, #0x32DE000
00E79808 LDR X0, [X0, #0x578]
00E7980C LDR X0, [X0]
00E79810 BL #0x8E30C
00E79814
00E79818
00E7981C
00E79820
00E79824
00E79828
00E7982C
00E79830
00E79834
00E79838
00E7983C
00E79840 LDP X29, X30, [SP], #0x10
00E79844 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>さて、ここまでで<code>Game::PlayerMgr</code>を呼び出し、<code>getControlledPerformer()</code>をコールし、自分が操作しているプレイヤー情報（<code>Game::Player</code>）のインスタンスのポインタが X0 レジスタにコピーされました。</p>
<h3 id="スペシャル情報を書き換えよう" tabindex="-1"><a class="header-anchor" href="#スペシャル情報を書き換えよう" aria-hidden="true">#</a> スペシャル情報を書き換えよう</h3>
<p>スペシャル情報がどこにあるのかという問題になるのですが、これは Starlight による解析からプレイヤー情報の 0x450 番目のアドレスに格納されていることがわかっています。</p>
<p>なので、スペシャル ID を 0 にしたければ以下のようなアセンブラを書けば良いことになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STR XZR, [X0, #0x450]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これはゼロレジスタを X0[0x450] に上書きする命令です。</p>
<p>ゼロレジスタということは、次の命令と等価になります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>MOV X1, #0
STR X1, [X0, #0x450]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>二行かかる命令が一行で書けるので楽というわけですね。</p>
<p>ちなみに ID が 0 のスペシャルはマルチミサイルなので、このコードは「ナイスを押せばスペシャルがマルチミサイルになる」という効果を持つコードです。</p>
<p>意味があるんだかないんだかよくわかりませんね。</p>
<p>ここまでをまとめると以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC STP X29, X30, [SP, #-0x10]!
00E79800 MOV X29, SP
00E79804 ADRP X0, #0x32DE000
00E79808 LDR X0, [X0, #0x578]
00E7980C LDR X0, [X0]
00E79810 BL #0x8E30C
00E79814 STR XZR, [X0, #0x450]
00E79818 NOP
00E7981C NOP
00E79820 NOP
00E79824 NOP
00E79828 NOP
00E7982C NOP
00E79830 NOP
00E79834 NOP
00E79838 NOP
00E7983C NOP
00E79840 LDP X29, X30, [SP], #0x10
00E79844 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>大量にある NOP 命令は「何もしない」という意味を持ちます。</p>
<p>とりあえず場所だけ確保しておいて、何かやりたいことが増えたら NOP を上書きしていけば良いです。</p>
<p>これは、ナイスを押すとスペシャルがマルチミサイルになります。</p>
<p>しかしこれでは意味がないので、ナイスを押せばどんどんスペシャルが変わるようにしましょう。</p>
<h3 id="ナイスを押すごとに変化させよう" tabindex="-1"><a class="header-anchor" href="#ナイスを押すごとに変化させよう" aria-hidden="true">#</a> ナイスを押すごとに変化させよう</h3>
<p>ナイスを押すごとに変化させたければ「現在の値を読み取る」「値を書き換える」「現在の値を書き戻す」という三つの処理が必要になります。</p>
<p>メモリの値を直接書き換えることはできないので、一度レジスタにコピーする必要があります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LDR X1, [X0, #0x450]
ADD X1, X1, #1
STR X1, [X0, #0x450]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>例えばこのように書けば現在の値を読み取って X1 レジスタにコピーし、その値に 1 を加えて書き戻すという動作ができます。</p>
<p>一見これでいいような気がするのですが、このままだとナイスを押すたびに値がどんどん大きくなってしまいます。</p>
<p>スプラトゥーンで定義されているスペシャルの数は決まっているので、それを超えるとバグの原因になるわけです。</p>
<p>実際、上の命令をそのままコード化すると 3.1.0 の場合はスペシャルがダイオウイカに、5.4.0 の場合はスペシャルがガチホコになった段階でクラッシュしてしまいます。</p>
<p>ダイオウイカは ID が 17 なので「読み取った値が 17 だったら 0 に戻す」という処理を書けば良いことになります。</p>
<p>また、ガチホコは ID が 13 なので「読み取った値が 13 だったら 0 に戻す」という処理を書けば良いことになります。</p>
<p>これは C++だと三項演算子を使って以下のように上手くかけるのですが、アセンブラではそういう事はできないので地道に実装しましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>X1 = X1 == 13 ? 0 : ++X1;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="アセンブラで-if-文を書こう" tabindex="-1"><a class="header-anchor" href="#アセンブラで-if-文を書こう" aria-hidden="true">#</a> アセンブラで IF 文を書こう</h3>
<p>結論からいってしまえば、次のコードで IF 文は実現できます。</p>
<p>が、適当に書いたのでいろいろなんか変です。</p>
<p>ここを直すのを宿題ということで。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// ダイオウイカ
LDR X1, [X0, #0x450] // X1 = X0[0x450];
CMP X1, #17          // NZCV = X1 >= 17 ? 1 : 0
LDR X1, [X0, #0x450] // X1 = X0[0x450];
ADD X2, X1, #1       // X2 = X1 + 1;
CSEL X1, X2, XZR, LO // X1 = NZCV == 0 ? X2 : XZR
STR X1, [X0, #0x450] // X0[0x450] = X1

// ガチホコ
LDR X1, [X0, #0x450] // X1 = X0[0x450];
CMP X1, #13          // NZCV = X1 >= 13 ? 1 : 0
LDR X1, [X0, #0x450] // X1 = X0[0x450];
ADD X2, X1, #1       // X2 = X1 + 1;
CSEL X1, X2, XZR, LO // X1 = NZCV == 0 ? X2 : XZR
STR X1, [X0, #0x450] // X0[0x450] = X1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>CSEL 命令は NZCV レジスタという特別なレジスタの値をみて、条件フラグに応じて返す値を変える命令です。</p>
<p>じゃあその NZCV レジスタにどこで値を代入したんだって話になるんですが、それを行うのが CMP 命令です。</p>
<p>ただし、CMP 命令を実行するとレジスタの値が変化してしまうので再度読み込みが必要になります（ややこしい）</p>
<p>要するに CMP 命令は NZCV レジスタにフラグをつけるだけの役目しかないということです。</p>
<h2 id="完成したもの" tabindex="-1"><a class="header-anchor" href="#完成したもの" aria-hidden="true">#</a> 完成したもの</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change Special by Signal (3.1.0) [tkgling]
@disabled
00E797FC FD7BBFA9 // STP X29, X30, [SP, #-0x10]!
00E79800 FD030091 // MOV X29, SP
00E79804 E09601D0 // ADRP X0, #0x32DE000
00E79808 00BC42F9 // LDR X0, [X0, #0x578]
00E7980C 000040F9 // LDR X0, [X0]
00E79810 C3380294 // BL #0x8E30C
00E79814 012842F9 // LDR X1, [X0, #0x450]
00E79818 3F4400F1 // CMP X1, #17
00E7981C 012842F9 // LDR X1, [X0, #0x450]
00E79820 22040091 // ADD X2, X1, #1
00E79824 41309F9A // CSEL X1, X2, XZR, LO
00E79828 012802F9 // STR X1, [X0, #0x450]
00E7982C 1F2003D5 // NOP
00E79830 1F2003D5 // NOP
00E79834 1F2003D5 // NOP
00E79838 1F2003D5 // NOP
00E7983C 1F2003D5 // NOP
00E79840 FD7BC1A8 // LDP X29, X30, [SP], #0x10
00E79844 C0035FD6 // RET

// Change Special by Signal (5.4.0) [tkgling]
@disabled
0104C94C FD7BBFA9 // STP X29, X30, [SP, #-0x10]!
0104C950 FD030091 // MOV X29, SP
0104C954 80E500B0 // ADRP X0, #0x1CB1000
0104C958 007C46F9 // LDR X0, [X0, #0xCF8]
0104C95C 000040F9 // LDR X0, [X0]
0104C960 F3680294 // BL #0x9A3CC
0104C964 012842F9 // LDR X1, [X0, #0x450]
0104C968 3F3400F1 // CMP X1, #13
0104C96C 012842F9 // LDR X1, [X0, #0x450]
0104C970 22040091 // ADD X2, X1, #1
0104C974 41309F9A // CSEL X1, X2, XZR, LO
0104C978 012802F9 // STR X1, [X0, #0x450]
0104C97C 1F2003D5 // NOP
0104C980 1F2003D5 // NOP
0104C984 1F2003D5 // NOP
0104C988 1F2003D5 // NOP
0104C98C 1F2003D5 // NOP
0104C990 FD7BC1A8 // LDP X29, X30, [SP], #0x10
0104C994 C0035FD6 // RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p><video controls src="https://video.twimg.com/ext_tw_video/1406147127789572100/pu/vid/1280x720/xiiVJL-4wQTfq5x_.mp4"></video></p>
<p>3.1.0 のコード。</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1323408602737090560/pu/vid/1280x720/QIB619OGvnD1EWlm.mp4"></video></p>
<p>5.4.0 のコード。</p>
<p>まあ動画を見てもらえばわかるのですが、色んなところがバグっています。</p>
<h3 id="既存のバグ一覧" tabindex="-1"><a class="header-anchor" href="#既存のバグ一覧" aria-hidden="true">#</a> 既存のバグ一覧</h3>
<ul>
<li>発動しないスペシャルがある
<ul>
<li>まともに使えるのはインクアーマー、スプラッシュボムピッチャー、スーパーチャクチのみ</li>
<li>わかばシューターを使っている影響かもしれない</li>
</ul>
</li>
<li>ナイスを押すと何故か一回目にマルチミサイルになる
<ul>
<li>1 足されるはずなのに 0 で初期化されている</li>
<li>0x450 が間違っているか、まあなんか間違ってる</li>
<li>条件分岐かもしれない</li>
</ul>
</li>
<li>イカスフィアとバブルは普通に発動するとクラッシュする
<ul>
<li>モデルデータ読み込んでないからとか多分そんなんの</li>
</ul>
</li>
<li>ナイスダマとウルトラハンコがない
<ul>
<li>ID が離れたところにあるので 1 足してるだけではでてこない</li>
<li>ID が何かは知らんが、やれば実装できる</li>
</ul>
</li>
<li>ガチホコを持つと何故かマルチミサイルを構える
<ul>
<li>わけがわからん</li>
</ul>
</li>
</ul>
<p>みなさんへの宿題はスペシャルをちゃんと発動できるようにすることと、切り替えをちゃんとできるようにすること、ということで！</p>
<p>ちなみに、ダイオウイカなどは Debug Menu がなくなった時になくなりました。</p>
<p>記事は以上。</p>
</template>
