<template><h1 id="ipswitch-誰でもできるコード開発-7" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-7" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #7</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2020/04/30/ipswitch06.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #6<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="チーム変更コード" tabindex="-1"><a class="header-anchor" href="#チーム変更コード" aria-hidden="true">#</a> チーム変更コード</h2>
<p>チーム変更コードとは試合中に自分のプレイヤーの属するチームを変更するパッチのことで、スプラトゥーンのゲームは試合中にチームが切り替わることなんて想定していないのでへんてこな現象が起きたりします。</p>
<h3 id="starlight-による実装" tabindex="-1"><a class="header-anchor" href="#starlight-による実装" aria-hidden="true">#</a> Starlight による実装</h3>
<p><video controls src="https://video.twimg.com/ext_tw_video/1265284420073852928/pu/vid/1280x720/Du-XzvWY9sHls-4W.mp4"></video></p>
<p>Starlight にはコントローラの入力を取得するクラス<code>Collector::mController</code>があるので、これを利用することで任意のタイミングで好きなコードを実行できます。</p>
<p>ところが 3.1.0 以降のバージョンは Starlight が動作しないので、好きなタイミングでコントローラの入力を取得してコードを実行することはできません。</p>
<h3 id="ipswitch-による実装" tabindex="-1"><a class="header-anchor" href="#ipswitch-による実装" aria-hidden="true">#</a> IPSwitch による実装</h3>
<p>任意のタイミングでキー入力をすることはできないのですが、似たような動作を IPSwitch を使って再現することは可能です。</p>
<p>それが前回の講座で紹介したナイスやカモンのシグナルを Hook してナイスの動作を別の命令に上書きしてしまうというものでした。</p>
<p>ナイス自体は試合中であればいつでも呼び出せるので、Starlight によるキー入力を再現することができるのです。</p>
<h2 id="チーム変更コードの仕組み" tabindex="-1"><a class="header-anchor" href="#チーム変更コードの仕組み" aria-hidden="true">#</a> チーム変更コードの仕組み</h2>
<p>Starlight によるチーム変更の擬似コードは以下のようになります。</p>
<p>実際にはインスタンスの NULL チェックを行わないとクラッシュします。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Game::PlayerMgr *mPlayerMgr = Collector::mPlayerMgrInstance;
Game::Player *mPlayer = mPlayerMgrS->getControlledPerformer();
if (Collector::mController.isPressed(Controller::Buttons::UpDpad))
    mPlayer->mTeam ^= 1;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>チーム情報を保存しているデータは<code>Cmn::Actor-&gt;mTeam</code>で、これは 0、1、2 のいずれかの値を取ります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">mTeam</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">Alpha</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">Bravo</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">Neutral</td>
</tr>
</tbody>
</table>
<p>Neutral は Alpha でも Bravo でもないチームで、観戦者などが割り当てられます。</p>
<p>ちなみに Neutral にはインクの色属性がないので、チームを Neutral に変更してからインクの飛沫を発生させるとゲームがクラッシュします。</p>
<p>サーモンランではプレイヤーは常に Alpha チームで、Bravo にはシャケが割り当てられているよ。</p>
<p>本来であれば<code>Cmn::Actor-&gt;mTeam</code>にアクセスするためには<code>Cmn::Actor</code>のポインタを調べなければいけないのですが、<code>Game::Player</code>クラスは<code>Cmn::Actor</code>クラスを継承しているので、<code>Game::Player</code>クラスのインスタンスを見つければ<code>Cmn::Actor</code>のアドレスはすぐに見つけることができます。</p>
<h3 id="game-player-クラス" tabindex="-1"><a class="header-anchor" href="#game-player-クラス" aria-hidden="true">#</a> Game::Player クラス</h3>
<p><code>Game::Player</code>クラスがどのような構造をしているかは Starlight のソースコードを見ればわかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0x000 Game::Player
0x000   Cmn::Actor mActor
0x000     Lp::Sys::Actor lpActor
0x2E8     Lp::Sys::XLinkIUser xlinkUser
0x320     uint64_t *xlink
0x328     uint32_t mTeam
0xXXX
0x348   _BYTE somestuff[0x138]
0x480   uint64_t mIndex
0x488   Cmn::PlayerInfo *mPlayerInfo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>本当はもっと大きいクラスなのですが、使いそうなのはせいぜい<code>Cmn::PlayerInfo</code>クラスまでだとおもうのでここまでにとどめました。</p>
<p>詳しく知りたい方は<a href="https://github.com/tkgstrator/Starlight/blob/master/include/Game/Player/Player.h" target="_blank" rel="noopener noreferrer">ソースコード<OutboundLink/></a>を読んでください。</p>
<p>さて、ここからわかるのは<code>Game::Player</code>クラスのインスタンス（ポインタ）がわかれば、そこから 0x328 だけズラしたところにチーム情報を格納する値が存在するということです。</p>
<p><code>Game::Player</code>クラスのインスタンスを呼び出すコードを書けばいいのですが、実は<code>Game::Player</code>クラスは前回の記事で紹介したように<code>Cmn::Singleton::GetInstance_(void)::sInstance</code>で呼び出されているわけではないのです。</p>
<p>ではどうすればいいのかということなのですが、<code>Game::Player</code>クラスを司っている<code>Game::PlayerMgr</code>クラスを利用するのです。</p>
<h3 id="インスタンスのアドレス" tabindex="-1"><a class="header-anchor" href="#インスタンスのアドレス" aria-hidden="true">#</a> インスタンスのアドレス</h3>
<p>インスタンスのアドレスを調べるのは適当に検索をかければいいのですが、今回はあらかじめ調べたものをご紹介します。</p>
<p>本講座の趣旨は与えられた情報からコードをつくることであって、情報を調べるところは省略しています。</p>
<p>というのも、誰かがすでに見つけている情報を「あなたも見つけてください」っていうのは単純に時間の無駄だから。</p>
<p>ぼくは秘密主義ではないのでそんな無駄なことをさせるつもりはありません。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Game::PlayerMgr::sInstance</th>
<th style="text-align:center">sendSignalEvent()</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">04157578</td>
<td style="text-align:center">00E797FC</td>
</tr>
</tbody>
</table>
<p><code>sendSignalEvent()</code>に関しては前回と同じです。</p>
<h3 id="インスタンスを呼び出す" tabindex="-1"><a class="header-anchor" href="#インスタンスを呼び出す" aria-hidden="true">#</a> インスタンスを呼び出す</h3>
<p>インスタンスを呼び出すためのテンプレートがあることは前回の記事で紹介しました。</p>
<p>おさらいとしてもう一度復習しましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0xXXXXX000
LDR X0, [X0, #0xYYY]
LDR X0, [X0]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>この三命令で X0 レジスタに呼び出したいインスタンスのポインタが入ります。</p>
<p>つまり、目的アドレス（今回の場合は<code>Game::PlayerMgr</code>のアドレス）と Hook したいサブルーチンのアドレス（ナイスを Hook するのであれば毎回同じ値）から XXXXX と YYY の値を求めればよいのです。</p>
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
<h3 id="テンプレートを完成させる" tabindex="-1"><a class="header-anchor" href="#テンプレートを完成させる" aria-hidden="true">#</a> テンプレートを完成させる</h3>
<p>さて、テンプレの命令セットに当てはめると以下のコードができます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>これで無事に X0 レジスタに<code>PlayerMgr</code>のインスタンスのポインタが取得できています。</p>
<p>次に<code>PlayerMgr</code>から自分が操作するプレイヤーの<code>Game::Player</code>インスタンスを取得します。</p>
<p>そうしないと自分でないプレイヤーのデータを弄ってしまうことになるからな。</p>
<p>自分の操作するプレイヤーの<code>Game::Player</code>インスタンスを取得するサブルーチンとして<code>Game::PlayerMgr::getControlledPerformer()</code>があるのでこれをつかいます。</p>
<h3 id="サブルーチンの呼び出し方" tabindex="-1"><a class="header-anchor" href="#サブルーチンの呼び出し方" aria-hidden="true">#</a> サブルーチンの呼び出し方</h3>
<p>さて、ここで問題となるのはサブルーチンの呼び出し方です。</p>
<p>ARM64 命令を見ればわかりますが、関数呼び出しは BL 命令を使って実装されています。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Game<span class="token operator">::</span>Player <span class="token operator">*</span>mPlayer <span class="token operator">=</span> Game<span class="token operator">::</span>PlayerMgr<span class="token operator">::</span><span class="token function">getControlledPerformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
BL _ZNK4Game9PlayerMgr22getControlledPerformerEv
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>この C++擬似コードと ARM64 命令は等価だぞ。</p>
<p>BL 命令というのは簡単にいえばジャンプ命令で、ジャンプした先のアドレスの命令を実行したあとで RET 命令で BL 命令の次の命令を実行します。</p>
<p><code>sendSignalEvent()</code>側では X0 レジスタは全く触れていませんが、BL 命令でジャンプした先の<code>getControlledPerformer()</code>が返り値を X0 レジスタにいれていす。</p>
<h3 id="サブルーチン呼び出しで注意すること" tabindex="-1"><a class="header-anchor" href="#サブルーチン呼び出しで注意すること" aria-hidden="true">#</a> サブルーチン呼び出しで注意すること</h3>
<p>プログラムを書く上では全く意識しないことなのですが、全ての関数（サブルーチン）には引数が必要です。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>class Game<span class="token operator">::</span>PlayerMgr <span class="token punctuation">{</span>
    Game<span class="token operator">::</span>Player<span class="token operator">*</span> <span class="token function">getControlledPerformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Game<span class="token operator">::</span>Player <span class="token operator">*</span>mPlayer <span class="token operator">=</span> Game<span class="token operator">::</span>PlayerMgr<span class="token operator">::</span><span class="token function">getControlledPerformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>例えば上の疑似コードは<code>getControlledPerformer()</code>はカッコの中が空っぽなので引数はないようにみえますが、実際には自分自身を引数としてとっています。</p>
<p>なので、本来は以下のように定義されます。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>class Game<span class="token operator">::</span>PlayerMgr <span class="token punctuation">{</span>
    Game<span class="token operator">::</span>Player<span class="token operator">*</span> <span class="token function">getControlledPerformer</span><span class="token punctuation">(</span>Game<span class="token operator">::</span>PlayerMgr <span class="token operator">*</span> __hidden this<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Game<span class="token operator">::</span>Player <span class="token operator">*</span>mPlayer <span class="token operator">=</span> Game<span class="token operator">::</span>PlayerMgr<span class="token operator">::</span><span class="token function">getControlledPerformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>要するに見えない引数（0 番目の引数）として自分自身のポインタをとっているので、BL 命令をコールする際には必ず X0 レジスタ（これが 0 番目の引数で、1 番めの引数は X1 レジスタとなる）に BL 命令ジャンプ先で実行されるサブルーチンのインスタンスのポインタが入っていなければいけません。</p>
<p><code>getControlledPerformer()</code>は<code>Game::PlayerMgr</code>クラスのサブルーチンなので、<code>Game::PlayerMgr</code>クラスのインスタンスを X0 レジスタに読み込んでおかなければいけなかったというわけです。</p>
<h3 id="bl-命令の書き方" tabindex="-1"><a class="header-anchor" href="#bl-命令の書き方" aria-hidden="true">#</a> BL 命令の書き方</h3>
<p>BL 命令はインスタンスのアドレスを読み込むのと違ってオフセットがないため少しややこしいです。</p>
<p>今回のケースですと、ジャンプしたいアドレスというのは<code>getControlledPerformer()</code>のアドレスですので、まずこの値を調べます。</p>
<p>また、BL 命令をコールするアドレスですが、今回は 0104C960 とします（本来この値は BL 命令を書く場所によって変わります）</p>
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
<p>ここまでわかれば、BL 命令を書くのは簡単です。</p>
<p>$00F07B1C-00E79810=0008E30C$</p>
<p>ちなみに、ARM64 命令は優しいのでいちいち差を電卓で計算しなくても以下のように書くことができます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>BL #0xF07B1C - 0xE79810
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これでアドレス E79810 から F07B1C へジャンプして<code>getControlledPerformer()</code>をコールする BL 命令が書けました。</p>
<p>BL 命令を呼ぶ前には必ず X0 レジスタに呼び出したい関数のインスタンスのポインタが入っていなければいけなかったので、ここまでをまとめると以下のコードが完成します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
BL #0x8E30C
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="チームを変更しよう" tabindex="-1"><a class="header-anchor" href="#チームを変更しよう" aria-hidden="true">#</a> チームを変更しよう</h3>
<p>さて、BL 命令が実行されたことにより X0 レジスタには<code>Game::Player</code>のインスタンス（自分が操作するプレイヤーのもの）が入っています。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0x000 Game::Player
0x000   Cmn::Actor mActor
0x000     Lp::Sys::Actor lpActor
0x2E8     Lp::Sys::XLinkIUser xlinkUser
0x320     uint64_t *xlink
0x328     uint32_t mTeam
0xXXX
0x348   _BYTE somestuff[0x138]
0x480   uint64_t mIndex
0x488   Cmn::PlayerInfo *mPlayerInfo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>チーム情報は<code>Game::Player</code>クラスの先頭から 0x328 番目に入っているので、この値を取得する必要があります。</p>
<p>X0 に入っているのはポインタなので、データを取得するには LDR 命令を使う必要があります。</p>
<p>この 0x328 番目に入っているという情報はたかはる氏のコードを参考にさせていただきました。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
BL #0x8E30C
LDR X1, [X0, #0x328] // X1 = mPlayer[0x328]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>これで X0 レジスタにチーム情報である mTeam のデータを読み込むことができました。</p>
<h3 id="レジスタの割り当てを考える" tabindex="-1"><a class="header-anchor" href="#レジスタの割り当てを考える" aria-hidden="true">#</a> レジスタの割り当てを考える</h3>
<p>さて、次に読み込んだデータを変更したいのですが<code>mTeam</code>の値は基本的には 0 か 1 が入っていることを思い出してください（2 は観戦者モード）</p>
<p>となると、チーム変更するためには保存されている値が 1 だったら 0 を、0 だったら 1 を返すコードが必要になります。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>X0 <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>X0 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>これを C++擬似コードで表すと上のようになるのですが、実は ARM で IF 文を実装しようとするとコスト（命令数がたくさん必要）でやっかいです。</p>
<p>ここは IF 文を使わずに出力することを考えましょう。</p>
<p>ARM64 にビット反転の演算があればそれを利用すればいいのですが、ドキュメントを探しても見つからなかった（検索力不足かも）ので別の演算で代用します。</p>
<p>現在のチーム情報は X1 レジスタに入っており、その値はほとんどの場合で 0 か 1 のどちらかです。</p>
<p>X1 レジスタを反転させる NOT X1（X1 レジスタの値を反転させる）のような命令はないのですが論理演算命令はいくつか実装されているので使えないか検討してみます。</p>
<ul>
<li>NOT 演算</li>
</ul>
<p>NOT 演算があれば 1 ならば 0、0 ならば 1 が出力できます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">NOT</th>
<th style="text-align:center">0 を入力</th>
<th style="text-align:center">1 を入力</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">-</td>
<td style="text-align:center">1 を出力</td>
<td style="text-align:center">0 を出力</td>
</tr>
</tbody>
</table>
<p>が、この命令はないのでこれは実装できません。</p>
<ul>
<li>AND 演算</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">AND</th>
<th style="text-align:center">0 を入力</th>
<th style="text-align:center">1 を入力</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0 と比較</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">1 と比較</td>
<td style="text-align:center">0</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<p>AND 演算は二つの入力がどちらも 1 であれば 1 を返す論理演算ですが、これでは上手く反転させることができません。</p>
<ul>
<li>OR 演算</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">AND</th>
<th style="text-align:center">0 を入力</th>
<th style="text-align:center">1 を入力</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0 と比較</td>
<td style="text-align:center">0</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">1 と比較</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<p>OR 演算は入力のどちらかが 1 であれば 1 を返す論理演算ですが、これもやはりそのままの値が出力されるか、どちらも 1 を返すかになってしまうのでダメです。</p>
<ul>
<li>ORN 演算</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">AND</th>
<th style="text-align:center">0 を入力</th>
<th style="text-align:center">1 を入力</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0 -&gt; 1 と比較</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">1 -&gt; 0 と比較</td>
<td style="text-align:center">0</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<p>ORN 演算は Xn レジスタと Xm レジスタを反転させた値で論理和を求めます。</p>
<p>いろいろ使い勝手のいい論理演算ですが、今回の場合は OR 演算と同じ結果になってしまうので使えません。</p>
<ul>
<li>XOR 演算</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">AND</th>
<th style="text-align:center">0 を入力</th>
<th style="text-align:center">1 を入力</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0 と比較</td>
<td style="text-align:center">0</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">1 と比較</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
</tbody>
</table>
<p>XOR 演算は排他的論理和といわれる論理演算です。</p>
<p>ARM64 では EOR 命令なのですが、今回は馴染みの深い XOR 演算として紹介します。</p>
<p>この演算は（ひどく大雑把にいえば）比較する二つの値が同じなら 0、異なれば 1 を返します。</p>
<p>ということは XOR 演算を用いて 0 と比較した場合には、</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(Constant, Input) => Output
(0, 0) => 0
(0, 1) => 1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>となるので 0 なら 0、1 なら 1 を返してしまい意味がないのですが、1 と比較する場合には、</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(Constant, Input) => Output
(1, 0) => 1
(1, 1) => 0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>となり、ビット反転を擬似的に実装できることがわかります。</p>
<p>変更した値を反映させるには LDR 命令の逆である STR 命令を使えばいいので、ここまでをまとめると以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
BL #0x8E30C
LDR X1, [X0, #0x328]
EOR X1, X1, #1
STR X1, [X0, #0x328]
LDR X1, [X0, #0x488]
STR X1, [X0, #0x38]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="コールスタック" tabindex="-1"><a class="header-anchor" href="#コールスタック" aria-hidden="true">#</a> コールスタック</h2>
<p>ここまでできたのであれば「あとは<a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>で HEX 化して終わりじゃないの？」って思う方もいるかも知れませんが、ここで最後のトラップである<a href="https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%BC%E3%83%AB%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF" target="_blank" rel="noopener noreferrer">コールスタック<OutboundLink/></a>が残っています。</p>
<p>ここで、オリジナル状態の<code>sendSignalEvent()</code>の ARM 命令を見返してみましょう。</p>
<p>先頭三行に何をしているのかよくわからない命令があると思います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC                 STR             X19, [SP,#-0x10+var_10]!
00E79800                 STP             X29, X30, [SP,#0x10+var_s0]
00E79804                 ADD             X29, SP, #0x10
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>これこそがコールスタックを実装している部分で、サブルーチン内に BL 命令があるのであれば必ず必要になります。</p>
<p>なんで必要になるかは細かく解説しているとこの記事の長さが倍になるので省略します。</p>
<p>とりあえず、サブルーチン内に BL 命令があるときは必ず書かなければいけないと覚えておいてください。</p>
<p>これを書かないと BL 命令後にプログラムカウンタが正しい位置に戻らず、フリーズしてしまいます。</p>
<h3 id="コールスタックの書き方" tabindex="-1"><a class="header-anchor" href="#コールスタックの書き方" aria-hidden="true">#</a> コールスタックの書き方</h3>
<p>コールスタックの書き方ですが、サブルーチンにいくつ BL 命令を書くかで変わってきます。</p>
<p>これを書き忘れててずっとフリーズし続けていたのはナイショです。</p>
<ul>
<li>BL 命令が一つの場合</li>
</ul>
<p>命令が一つだけの場合、以下のようにコールスタックを実装します（ここでは意味がわからなくても構いません）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STP X29, X30, [SP, #-0x10]!
MOV X29, SP

LDP X29, X30, [SP], #0x10
RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>サブルーチン開始直後に二つ、RET 命令の直前に一つ合計四命令だけ余計にコードを書いて実装します。</p>
<ul>
<li>BL 命令が二つの場合</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STR X19, [SP, #-0x20]!
STP X29, X30, [SP, #0x10]
ADD X29, SP, #0x10

LDP X29, X30, [SP, #0x10]
LDR X19, [SP], #0x20
RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>前後にそれぞれ一命令ずつ増えて全部で六命令となります。</p>
<p>前回の記事でコールスタックを上書きしても正しくコードが動いたのは、上書きしたコードの中に BL 命令がなかったためです。</p>
<p>今回は使っているため、このコードを書く必要があるというわけです。</p>
<h2 id="コードをまとめる" tabindex="-1"><a class="header-anchor" href="#コードをまとめる" aria-hidden="true">#</a> コードをまとめる</h2>
<p>今回は BL 命令が一つだけなので、その場合のコールスタックのテンプレートを使ってここまでのコードを全てまとめると以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STP X29, X30, [SP, #-0x10]!
MOV X29, SP

ADRP X0, #0x32DE000
LDR X0, [X0, #0x578]
LDR X0, [X0]
BL #0x8E30C
LDR X1, [X0, #0x328]
EOR X1, X1, #1
STR X1, [X0, #0x328]
LDR X1, [X0, #0x488]
STR X1, [X0, #0x38]

LDP X29, X30, [SP], #0x10
RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>あとはこのコードを<code>Game::PlayerCloneHandle::sendSignalEvent</code>に対して上書きすれば良いのでアドレスも考えると以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00E797FC STP X29, X30, [SP, #-0x10]!
00E79800 MOV X29, SP
00E79804 ADRP X0, #0x32DE000
00E79808 LDR X0, [X0, #0x578]
00E7980C LDR X0, [X0]
00E79810 BL #0x8E30C
00E79814 LDR X1, [X0, #0x328]
00E79818 EOR X1, X1, #1
00E7981C STR X1, [X0, #0x328]
00E79820 LDR X1, [X0, #0x488]
00E79824 STR X1, [X0, #0x38]
00E79828 LDP X29, X30, [SP], #0x10
00E7982C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>BL 命令はまとめて変換するとオフセットがズレるバグがあるので、BL 命令の箇所だけは必ず個別に変換してください。</p>
<p>ここで、なぜ先ほど BL 命令の説明をしたときに E79810 を使うと決めたかがわかると思います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Swap Team Color by Signal (3.1.0) [tkgling]
@disabled
00E797FC FD7BBFA9 // STP X29, X30, [SP, #-0x10]!
00E79800 FD030091 // MOV X29, SP
00E79804 E09601D0 // ADRP X0, #0x32DE000
00E79808 00BC42F9 // LDR X0, [X0, #0x578]
00E7980C 000040F9 // LDR X0, [X0]
00E79810 C3380294 // BL #0x8E30C
00E79814 019441F9 // LDR X1, [X0, #0x328]
00E79818 210040D2 // EOR X1, X1, #1
00E7981C 019401F9 // STR X1, [X0, #0x328]
00E79820 014442F9 // LDR X1, [X0, #0x488]
00E79824 011C00F9 // STR X1, [X0, #0x38]
00E79828 FD7BC1A8 // LDP X29, X30, [SP], #0x10
00E7982C C0035FD6 // RET

// Swap Team Color by Signal (5.4.0) [tkgling]
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>上の二つはどちらも等価なコードですが、可読性をとるなら上のコードを、利用するだけなら下のコードを使えば良いと思います。</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1265387270393286665/pu/vid/640x360/2ZaVg-8GadjzhnOB.mp4"></video></p>
<p>ちなみに、ナイスって書いてあるけど、カモンでも変わります。</p>
<p>記事は以上。</p>
</template>
