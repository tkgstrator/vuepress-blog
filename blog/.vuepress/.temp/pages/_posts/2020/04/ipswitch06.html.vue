<template><h1 id="ipswitch-誰でもできるコード開発-6" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-6" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #6</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2019/09/12/ipswitch05.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #5<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="hook-の仕組み" tabindex="-1"><a class="header-anchor" href="#hook-の仕組み" aria-hidden="true">#</a> Hook の仕組み</h2>
<p>今回はナイスの動作を Hook して別の割り当てにしてしまおうという試みです。</p>
<p>Hook というのが自分でもよくわかってないのですが、本来の動作の命令を上書きして任意の関数を呼び出したりそういうのが Hook なんじゃないかとおもっています、違ったらごめんなさい。</p>
<p>まず、Hook するコードを書くために必要なことは三つです。</p>
<ul>
<li>Hook したい関数のアドレス</li>
</ul>
<p>今回はナイスの動作を Hook したいのでそのアドレスを調べる必要があります。</p>
<p>これはバージョンごとに異なるので、アップデートのたびに更新しなければいけません。</p>
<ul>
<li>目的のインスタンスのアドレス</li>
</ul>
<p>インスタンスのポインタを習得する必要があるので、インスタンスのアドレスが必要になります。</p>
<p>今回は、サーモンランにおけるプレイヤー情報をナイスを使って操作することを考えてみましょう。</p>
<p>これもバージョンごとに異なるので、アップデートのたびに更新する必要があります。</p>
<ul>
<li>目的のインスタンスの構造体</li>
</ul>
<p>一番難しいのがこれで、仮に上の二つをクリアしたとしてもどこに何のデータが入っているのかがわからなければデータを使うことができません。</p>
<p>今回は目的のインスタンスの構造体はわかっているものとして話を進めます。</p>
<h3 id="hook-したい関数のアドレス" tabindex="-1"><a class="header-anchor" href="#hook-したい関数のアドレス" aria-hidden="true">#</a> Hook したい関数のアドレス</h3>
<p>ナイスを押したときに呼び出される関数は<code>Game::PlayerCloneHandle::sendSignalEvent()</code>で、これはアドレス 00E797FC にかかれています。</p>
<p>見ればわかるのですが、<code>sendSignalEvent()</code>自体は命令長が 17 の関数です。</p>
<p>17 もあるということはたくさん上書きしても大丈夫ということですね。</p>
<p>最後に RET 命令を必ず書かなければいけないので、実質 16 命令書くことができます。</p>
<p>というわけで、一つ目の目標であった「Hook したい関数のアドレス」はわかったことになります。</p>
<h3 id="目的のインスタンスのアドレス" tabindex="-1"><a class="header-anchor" href="#目的のインスタンスのアドレス" aria-hidden="true">#</a> 目的のインスタンスのアドレス</h3>
<p>今回はサーモンランのプレイヤー情報を弄りたいのですが、それらを制御するクラスは<code>Game::Coop::PlayerDirector</code>です。</p>
<p>このクラスがどこでインスタンスを生成しているか調べれば良いのです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>005A6154                 ADRP            X8, #off_4165DB8@PAGE
005A6158                 LDR             X8, [X8,#off_4165DB8@PAGEOFF]
005A615C                 STR             XZR, [X8] ; Cmn::Singleton&lt;Game::Coop::PlayerDirector>::GetInstance_(void)::sInstance
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>調べると、こんな感じで 005A615C 付近に見つかり、04165DB8 からインスタンスのアドレスを読み込んでいることがわかります。</p>
<p>よって、インスタンスのアドレスは 04165DB8 ということがわかりました。</p>
<h3 id="インスタンスの構造体" tabindex="-1"><a class="header-anchor" href="#インスタンスの構造体" aria-hidden="true">#</a> インスタンスの構造体</h3>
<p>「インスタンスのポインタがわかれば何が便利なのか」ということなんですが、それは一言でいうと「インスタンスの構造がわかっていればポインタ（先頭アドレス）がわかれば好きなデータにアクセスできる」ということに尽きます。</p>
<p>例えば、サーモンランにおけるプレイヤー情報は以下のようになっています。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>struct Game::Coop::PlayerDirector
{
  _BYTE gap[0x370];
  Game::Coop::Player player[4];
};

struct Game::Coop::Player
{
  uint32_t mRoundBankedPowerIkuraNum;
  uint32_t mGotGoldenIkuraNum;
  uint32_t mRoundBankedGoldenIkuraNum;
  uint32_t mTotalBankedGoldenIkuraNum;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>これはかなり大雑把な構造なので、実際にはもっといろんな要素がある。</p>
<p>つまり、<code>PlayerDirector</code>のポインタを見つけたら先頭から 370 バイトまでは何が入っているかわからないが、その後に四人分のプレイヤー情報が入っていることがわかるのです。</p>
<p>正確には先頭の 880 バイトには<code>Cmn::Actor</code>と<code>sead::IDisposer</code>が入っていますが、今回は使わないので無視します。</p>
<h3 id="game-coop-playerdirector" tabindex="-1"><a class="header-anchor" href="#game-coop-playerdirector" aria-hidden="true">#</a> Game::Coop::PlayerDirector</h3>
<p>よって、<code>Game::Coop::PlayerDirector</code>の構造体をまとめると以下のようになります。</p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>つまり、<code>Game::Coop::PlayerDirector</code>のインスタンスのポインタが分かればそこから 370 バイト後ろにズラしたところに一人目のプレイヤーの<code>mRoundBankedPowerIkuraNum</code>のデータが入っています。</p>
<p>二人目なら 470 という感じで、先頭さえわかればすべてのデータに自由にアクセスできます。</p>
<h2 id="アセンブラを書こう" tabindex="-1"><a class="header-anchor" href="#アセンブラを書こう" aria-hidden="true">#</a> アセンブラを書こう</h2>
<p>IPSwitch 向けコードを書くといっても最終的に機械語に翻訳する作業が必要なだけで、元々のコードはアセンブラで書く必要があります。</p>
<p>いきなりアセンブラを考えると難しいのでゆっくり解説していきます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Game::Coop::PlayerDirector</th>
<th style="text-align:center">sendSignalEvent()</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">04165DB8</td>
<td style="text-align:center">00E797FC</td>
</tr>
</tbody>
</table>
<h3 id="インスタンスのアドレスを読み込む" tabindex="-1"><a class="header-anchor" href="#インスタンスのアドレスを読み込む" aria-hidden="true">#</a> インスタンスのアドレスを読み込む</h3>
<p>まず最初にやらないといけないのはインスタンスを読み込むということです。</p>
<p>「どうすればいいんだ？」って思うかもしれませんが、どんなインスタンスを読み込む場合にも以下の三つの命令があれば読み込めます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0xXXXXX000
LDR X0, [X0, #0xYYY]
LDR X0, [X0]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>今回は X0 レジスタを使っても問題ないですが、Hook する関数によっては X1 や X2 など好きなレジスタを使ってください。</p>
<p>その際は全部 X0 から X1 や X2 などに置き換えること！</p>
<ul>
<li>XXXXX の求め方</li>
</ul>
<p>目的アドレスと Hook アドレスの下三桁無くした、目的アドレス - Hook アドレスの計算結果が XXXXX になります。</p>
<p>$04165-00E79=032EC$</p>
<p>これは Windows 標準の電卓で簡単に計算することができます。</p>
<ul>
<li>YYY の求め方</li>
</ul>
<p>目的アドレスの下三桁なので DB8 になります。</p>
<h3 id="データを取得する" tabindex="-1"><a class="header-anchor" href="#データを取得する" aria-hidden="true">#</a> データを取得する</h3>
<p>さて、XXXXX と YYY の値がわかったので先程のテンプレの命令に当てはめると以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32EC000
LDR X0, [X0, #0xDB8]
LDR X0, [X0]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>実はこれで正しく<code>PlayerDirector</code>のポインタが取得できており、その値が X0 レジスタに入っています。</p>
<p>ではさっそく、データを習得するコードを書いてみましょう。</p>
<p>実はデータ取得に必要なコードはたった一種類なので、使い方さえ覚えてしまえば非常に簡単です。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LDR X1, [X0, #0x370] // X1 = mRoundBankedPowerIkuraNum
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>それがこの LDR 命令で、これは X0 レジスタ（今回の場合は<code>PlayerDirecotr</code>のポインタ）から 370 ズラしたところにあるデータを X1 レジスタにコピーするという命令です。</p>
<p>370 ズラしたところには先ほど説明したように一人目のプレイヤーの赤イクラ数が入っています。</p>
<p>つまり、これだけでデータの読み込みができてしまうのです。</p>
<h3 id="データの変更" tabindex="-1"><a class="header-anchor" href="#データの変更" aria-hidden="true">#</a> データの変更</h3>
<p>ただ、これだと読み込んだだけで使いみちがないので、その値を更新したいと思います。</p>
<p>演算に使える命令はたくさんありますが、よく使うのはこの辺りでしょう。</p>
<table>
<thead>
<tr>
<th style="text-align:center">命令</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">MOV</td>
<td style="text-align:center">代入</td>
</tr>
<tr>
<td style="text-align:center">ADD</td>
<td style="text-align:center">加算</td>
</tr>
<tr>
<td style="text-align:center">SUB</td>
<td style="text-align:center">減算</td>
</tr>
<tr>
<td style="text-align:center">MUL</td>
<td style="text-align:center">乗算</td>
</tr>
<tr>
<td style="text-align:center">AND</td>
<td style="text-align:center">論理積</td>
</tr>
<tr>
<td style="text-align:center">ORR</td>
<td style="text-align:center">論理和</td>
</tr>
<tr>
<td style="text-align:center">EOR</td>
<td style="text-align:center">排他的論理和</td>
</tr>
</tbody>
</table>
<p>除算はあんまり使わないかな、多分。</p>
<h3 id="arm-命令の書き方一覧" tabindex="-1"><a class="header-anchor" href="#arm-命令の書き方一覧" aria-hidden="true">#</a> ARM 命令の書き方一覧</h3>
<p>今回は読み込んだ赤イクラ取得数を 9999 増やすコードを書いてみます。</p>
<p>Windows のプログラマモードの電卓で 9999 を 16 進数に直すと 270F であることがわかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LDR X1, [X0, #0x370] // X1 = mRoundBankedPowerIkuraNum
MOV X1, #0x270F      // X1 = 0x270F
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>元々の値を 9999 に代入します。</p>
<h3 id="データの書き込み" tabindex="-1"><a class="header-anchor" href="#データの書き込み" aria-hidden="true">#</a> データの書き込み</h3>
<p>さて、ここまではテンプレの三命令でインスタンスのポインタを読み込み、LDR 命令で赤イクラ数を習得し、9999 を足すところまで書くことができました。</p>
<p>でもこれだとただ計算をしただけなので、その結果を返さなければいけません。</p>
<p>データを戻す命令は STR 命令で、使い方は LDR 命令と全く同じです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STR X1, [X0, #0x370] // X1 = mRoundBankedPowerIkuraNum
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="コード化する" tabindex="-1"><a class="header-anchor" href="#コード化する" aria-hidden="true">#</a> コード化する</h2>
<p>今までの三工程をまとめると以下のようになります。</p>
<p>最後の RET 命令はおまじないのようなもので、Hook する関数にも依りますが基本的には必要になってきます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADRP X0, #0x32EC000
LDR X0, [X0, #0xDB8]
LDR X0, [X0]
LDR X1, [X0, #0x370] // X1 = mRoundBankedPowerIkuraNum
MOV X1, #0x270F      // X1 = 0x270F
STR X1, [X0, #0x370] // X1 = mRoundBankedPowerIkuraNum
RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>命令の長さは全部で 8 となり、<code>sendSignalEvent()</code>の長さである 17 以下で収めることができました。</p>
<p>あとはこのアセンブラを<a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a>で変換するだけです。</p>
<p>このとき出力される ARM HEX という値が今回欲しかったコードになります。</p>
<p>BL 命令はまとめて変換するとオフセットがズレるバグがあるので、BL 命令の箇所だけは必ず個別に変換してください。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>60970190
00DC46F9
000040F9
01B841F9
E1E184D2
01B801F9
C0035FD6
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>あとはこれを IPSwitch 形式に書き換えれば作業は終了です。</p>
<h3 id="ipswitch-形式に書き換え" tabindex="-1"><a class="header-anchor" href="#ipswitch-形式に書き換え" aria-hidden="true">#</a> IPSwitch 形式に書き換え</h3>
<p><code>sendSignalEvent()</code>の先頭からドンドン上書きするだけなので以下のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Get 9999 Power Eggs by Signal (3.1.0) [tkgling]
@disabled
00E797FC 60970190 // ADRP X0, #0x32EC000
00E79800 00DC46F9 // LDR X0, [X0, #0xDB8]
00E79804 000040F9 // LDR X0, [X0]
00E79808 01B841F9 // LDR X1, [X0, #0x370]
00E7980C E1E184D2 // MOV X1, #0x270F
00E79810 01B801F9 // STR X1, [X0, #0x370]
00E79814 C0035FD6 // RET

// Get 9999 Power Eggs by Signal (5.4.0) [tkgling]
@disabled
0104C94C 00E60090 // ADRP X0, #0x1CC0000
0104C950 007047F9 // LDR X0, [X0, #0xEE0]
0104C954 000040F9 // LDR X0, [X0]
0104C958 01B841F9 // LDR X1, [X0, #0x370]
0104C95C E1E184D2 // MOV X1, #0x270F
0104C960 01B801F9 // STR X1, [X0, #0x370]
0104C964 C0035FD6 // RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="演習問題" tabindex="-1"><a class="header-anchor" href="#演習問題" aria-hidden="true">#</a> 演習問題</h3>
<p>ナイスを押すと一人目のプレイヤー（player[0]）の<code>mRoundBankedGoldenIkuraNum</code>の数が 999 になるコードを書いてください。</p>
<p>player[0] の<code>mRoundBankedGoldenIkuraNum</code>が先頭からいくらズレているかをチェックすれば難しくないはず。</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1255593531315453952/pu/vid/1280x720/GYDa38vvBTsI4vvo.mp4"></video></p>
<p>ナイスを押した瞬間に納品数が 999 になるのでクリアできます。</p>
<p>ただ、何らかのチェックが働いているのか、リザルト画面でのスコアには正しく反映されません。</p>
<p>記事は以上。</p>
</template>
