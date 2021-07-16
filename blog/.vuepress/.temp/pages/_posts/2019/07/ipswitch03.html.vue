<template><h1 id="ipswitch-誰でもできるコード開発-3" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-3" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #3</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2019/05/09/ipswitch02.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #2<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="関数の返り値を調べる" tabindex="-1"><a class="header-anchor" href="#関数の返り値を調べる" aria-hidden="true">#</a> 関数の返り値を調べる</h2>
<p>今回は関数の返り値を変えることで、動作やモードを切り換えるコードの開発について学びます。</p>
<p>ぶっちゃけると関数の返り値を変えるというのはリターンする値を上書きしてしまえばいいのですが、どこをどう変えればどのように変わるのかよくわからなかったので復習という感じです。</p>
<h3 id="bl-命令" tabindex="-1"><a class="header-anchor" href="#bl-命令" aria-hidden="true">#</a> BL 命令</h3>
<p>BL 命令とは条件分岐した後で、値をリターンする命令です。</p>
<p>擬似コードで書くとこのような感じになります</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if(x0 == 1){
    // 何かしらの処理
    return 1;
} else {
    // 何かしらの処理
    return 0;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>要するに、BL 命令はレジスタをいろいろいじった後で最終的になにかの値を返す命令なのです。</p>
<p>さて、ここで疑問「アセンブラってどうやって値を返すの？」って思った人もいると思います、素晴らしい疑問です。</p>
<p>自分もここがずっと引っかかっていたのですが、</p>
<p><strong>X0/W0 レジスタに必ず返り値がセットされているらしい</strong></p>
<p>という事に気付きました。</p>
<p>つまり、BL 命令は分岐先で何か処理をしたあとで X0/W0 レジスタに値をセットする命令だということです。</p>
<h2 id="zn4game4coop3utl7getruleev" tabindex="-1"><a class="header-anchor" href="#zn4game4coop3utl7getruleev" aria-hidden="true">#</a> _ZN4Game4Coop3Utl7GetRuleEv</h2>
<p>さて、BL 命令について理解したら<code>_ZN4Game4Coop3Utl7GetRuleEv</code>というサブルーチンに注目してみましょう。</p>
<p>この<code>Game4Coop3Utl7GetRuleEv</code>（以下、<code>GetRule()</code>と省略する）というなんだか長くてややこしいサブルーチンですが全体を見ると面白いことに気付きます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>005C3368                 ADRP            X8, #off_4156130@PAGE
005C336C                 LDR             X8, [X8,#off_4156130@PAGEOFF]
005C3370                 LDR             X8, [X8] ; Cmn::StaticMem::sInstance
005C3374                 CBZ             X8, loc_5C3380
005C3378                 LDR             W0, [X8,#0x72C]
005C337C                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>最終的に RET 命令で値をリターンしていることはわかり、さらにサブルーチンの定義から __int64 型（64 ビット整数）を返していることがわかります。</p>
<p>ではこのサブルーチンがどのように使われているかを調べます。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>IDA Pro があるならサブルーチン名を右クリックして Jump to xref to operand を選択すると<code>GetRule()</code>が使われている関数をすべて調べることができます。</p>
</div>
<p>すると例えば以下のようなコードが見つかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00568C04                 BL              _ZN4Game4Coop3Utl7GetRuleEv ; Game::Coop::Utl::GetRule(void)
00568C08                 LDR             X26, [X24,#8]
00568C0C                 CMP             W0, #2
00568C10                 ADD             X0, SP, #0x3D0+var_3C0 ; this
00568C14                 MOV             W8, #7
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>これだけだとわかりにくいと思うので、擬似コードに変換すると次のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>v12 = Game::Coop::Utl::GetRule(result);
v13 = *(_QWORD *)(v7 + 8);
  if ( v12 == 2 )
    v14 = 8;
  else
    v14 = 7;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>GetRule()</code>で何かしらを計算をして「その値が 2 だったら v14 に 8 を、そうでなければ v14 に 7 を代入しろ」という命令になっているわけです。</p>
<p>つまり、返り値として 2 は存在することがわかるのですが他にどんな値を返すパターンがあるのでしょう？</p>
<p>実はこの<code>GetRule()</code>は遊んでいるサーモンランの種類によって返り値が異なります。</p>
<table>
<thead>
<tr>
<th style="text-align:center">種類</th>
<th style="text-align:center">GetRule()</th>
<th style="text-align:center">機械語</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">オンライン</td>
<td style="text-align:center">1</td>
<td style="text-align:center">20008052</td>
</tr>
<tr>
<td style="text-align:center">イカッチャ</td>
<td style="text-align:center">2</td>
<td style="text-align:center">40008052</td>
</tr>
<tr>
<td style="text-align:center">チュートリアル</td>
<td style="text-align:center">3</td>
<td style="text-align:center">60008052</td>
</tr>
</tbody>
</table>
<p>例えばオンラインで遊んでいるかのようにデータをいじりたいときは、W0 の値を 1 にするような命令で<code>GetRule()</code>を上書きすれば良いことになります。</p>
<h3 id="getrule-が使われるサブルーチン" tabindex="-1"><a class="header-anchor" href="#getrule-が使われるサブルーチン" aria-hidden="true">#</a> GetRule() が使われるサブルーチン</h3>
<p>本当はもっといっぱいあるけど、面白そうなやつだけを列挙してみました。</p>
<p>引数がすっごい多いやつもあるのでここでは引数は省略します。</p>
<table>
<thead>
<tr>
<th style="text-align:center">サブルーチン</th>
<th style="text-align:center">アドレス</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Game::Coop::GuideDirector::showMessage_()</td>
<td style="text-align:center">00568C04</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::Moderator::Moderator()</td>
<td style="text-align:center">005960CC</td>
</tr>
<tr>
<td style="text-align:center">Game::SeqCoopResult::SeqCoopResult()</td>
<td style="text-align:center">005B3F6C</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::Setting::reset()</td>
<td style="text-align:center">005C11CC</td>
</tr>
</tbody>
</table>
<p>さて、それぞれ弄るとどんな結果になるのか見てましょう。</p>
<p><strong>showMessage_()</strong></p>
<p>ここを弄ると...！！</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Raspy Voice (3.1.0) [tkgling]
@disabled
00568C04 20008052 // MOV W0, #1

// Raspy Voice (5.4.0) [tkgling]
@disabled
006FF3AC 20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>どうなるかは自分で実際にコードを動かして試してみましょう！</p>
<p><strong>Moderator()</strong></p>
<p>モデレータっていうのは（恐らく）サーモンランを司る一番大きな要素です。</p>
<p>1 にすると<code>NormalRuleModerator()</code>でオンラインモードが呼び出されるはずですが、何故かブキが強制的にボールドになります。</p>
<p>どのブキを選んでも必ずボールドに変えられてしまいます、なんじゃそりゃ...</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>恐らくオンラインの情報から現在支給されるブキ情報をとってくるんだけど、オンラインに一回も繋いでいないのでブキデータがなく、初期値 0 のボールドマーカーが使われているんだと思います。</p>
</div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Force Splash-o-matic (3.1.0)
@disabled
005960CC 20008052 // MOV W0, #1

// Force Splash-o-matic (5.4.0)
@disabled
0072ED84 20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>変な値（2 とか）にすると何ももってないまま棒立ちするイカちゃんが見れます。</p>
<p><strong>SeqCoopResult()</strong></p>
<p>返り値を 1 にすると<code>Game::Coop::OnlineResultPlayReport()</code>が呼び出されるはず。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// SeqCoopResult (3.1.0)
@disabled
005B3F6C 20008052 // MOV W0, #1

// SeqCoopResult (5.4.0)
@disabled
0074EB5C 20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>なのですが、特に何も変わりませんでした。</p>
<p><strong>reset()</strong></p>
<p>値が 1 のときだけ<code>Cmn::Def::Coop::CalcOnlineEvalPoint()</code>というオンラインのクマサンポイントを計算するサブルーチンが呼び出されます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// CalcOnlineEvalPoint (3.1.0)
@disabled
005C11CC 20008052 // MOV W0, #1

// CalcOnlineEvalPoint (5.4.0)
@disabled
0075BF7C 20008052 // MOV W0, #1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>が、特になにか変わったような感じもしませんでした。</p>
<p>ここはオンラインもオフラインも似たようなことをしているみたいです。</p>
<h2 id="znk2lp3utl9byamliter14trygetintbykeyepipkc" tabindex="-1"><a class="header-anchor" href="#znk2lp3utl9byamliter14trygetintbykeyepipkc" aria-hidden="true">#</a> _ZNK2Lp3Utl9ByamlIter14tryGetIntByKeyEPiPKc</h2>
<p>次もいろいろなことに使えそうなサブルーチンを紹介します。</p>
<p>このサブルーチンは<code>Lp::Utl::ByamlIter::tryGetIntByKey()</code>という別名をもっており、その内容は次のようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>01A56ED0                 STR             X21, [SP,#-0x10+var_20]!
01A56ED4                 STP             X20, X19, [SP,#0x20+var_10]
01A56ED8                 STP             X29, X30, [SP,#0x20+var_s0]
01A56EDC                 ADD             X29, SP, #0x20
01A56EE0                 MOV             X21, X0
01A56EE4                 ADD             X0, SP, #0x20+var_18 ; this
01A56EE8                 MOV             X20, X2
01A56EEC                 MOV             X19, X1
01A56EF0                 BL              _ZN2Lp3Utl9ByamlDataC2Ev ; Lp::Utl::ByamlData::ByamlData(void)
01A56EF4                 ADD             X1, SP, #0x20+var_18 ; Lp::Utl::ByamlData *
01A56EF8                 MOV             X0, X21 ; this
01A56EFC                 MOV             X2, X20 ; char *
01A56F00                 BL              _ZNK2Lp3Utl9ByamlIter17getByamlDataByKeyEPNS0_9ByamlDataEPKc ; Lp::Utl::ByamlIter::getByamlDataByKey(Lp::Utl::ByamlData *,char const*)
01A56F04                 TBZ             W0, #0, loc_1A56F44
01A56F08                 ADD             X0, SP, #0x20+var_18 ; this
01A56F0C                 BL              _ZNK2Lp3Utl9ByamlData7getTypeEv ; Lp::Utl::ByamlData::getType(void)
01A56F10                 AND             W8, W0, #0xFF
01A56F14                 CMP             W8, #0xFF
01A56F18                 B.EQ            loc_1A56F44
01A56F1C                 ADD             X0, SP, #0x20+var_18 ; this
01A56F20                 BL              _ZNK2Lp3Utl9ByamlData7getTypeEv ; Lp::Utl::ByamlData::getType(void)
01A56F24                 AND             W8, W0, #0xFF
01A56F28                 CMP             W8, #0xD1
01A56F2C                 B.NE            loc_1A56F44
01A56F30                 ADD             X0, SP, #0x20+var_18 ; this
01A56F34                 BL              _ZNK2Lp3Utl9ByamlData8getValueEv ; Lp::Utl::ByamlData::getValue(void)
01A56F38                 STR             W0, [X19]
01A56F3C                 MOV             W0, #1
01A56F40                 B               loc_1A56F48
01A56F44                 MOV             W0, WZR
01A56F48                 LDP             X29, X30, [SP,#0x20+var_s0]
01A56F4C                 LDP             X20, X19, [SP,#0x20+var_10]
01A56F50                 LDR             X21, [SP+0x20+var_20],#0x30
01A56F54                 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>読むのめんどくせえなあって思った方は正解です。</p>
<p>スーパーハカーならこれを読んで意味が理解できると思うのですが、ぼくにはちんぷんかんぷんです。</p>
<p>ですが、サブルーチン名からおおよその予想は付きます。</p>
<p>これは Byaml ファイル（ブキのパラメータなどが設定されている xml）を読み込んで、その値を返す関数です。</p>
<p>そして、このサブルーチンは以下のように使われます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0004A59C                 ADRP            X2, #aAppversion@PAGE ; "AppVersion"
0004A5A0                 ADD             X0, SP, #0xA0+var_70 ; this
0004A5A4                 MOV             X1, X24 ; int *
0004A5A8                 ADD             X2, X2, #aAppversion@PAGEOFF ; "AppVersion"
0004A5AC                 BL              _ZNK2Lp3Utl9ByamlIter14tryGetIntByKeyEPiPKc ; Lp::Utl::ByamlIter::tryGetIntByKey(int *,char const*)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>これは UnlockGearInfo.byml を読み込んで、そこに書かれている<code>AppVersion</code>の値を取得する関数です。</p>
<p>もしも「あるギア X の<code>UnlockVersion</code>が現在のスプラのバージョンよりも低ければ開放する」という仕組みですね。</p>
<p>じゃあ「さっきと同じように BL 命令を上書きして適当に 0（True）を返すようにすればいいんじゃないの？」と思うのですが、それではいけません。</p>
<p>擬似コードを読めば何故ダメなのかわかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if ( !(result &amp; 1) )
          return result;
        if ( *((unsigned int *)v2 + 2) &lt;= v10 )
          v12 = (int *)*((_QWORD *)v2 + 2);
        else
          v12 = (int *)(*((_QWORD *)v2 + 2) + 12 * v10);
        Lp::Utl::ByamlIter::tryGetIntByKey((Lp::Utl::ByamlIter *)&amp;v43, v12, "AppVersion");;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>そう、このサブルーチン<code>tryGetIntByKey()</code>は返り値をレジスタに代入していないのです。</p>
<p>えっ「じゃあ返り値どこにいったんだ？」となるのですが、これはアドレスがレジスタに入っているのです。</p>
<p>つまり、以前スペシャルの値を 0 にしたときと同じくレジスタが参照するアドレスが保持する値を 0 にすればいいことになります。</p>
<p>よって前回と同じように以下のようなコードで実現できます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>なんで [X0] じゃなくて [X1] なのかはよくわかってませんが、まあとりあえず [X1] を指定しておけばいいと思います。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>本当はもっと書きたかったのですが、これ以上書くとあまりに長くなりすぎるので今回はここまでとしました。</p>
<p>金イクラドロップ数変更を最後になかなかコードを探す機会がなかったのですが今回新しくコードを見つけられて面白かったです。</p>
<p>こういうコードを探す系の記事はまあぶっちゃけると人気がないのですが、需要があり続ける限りちまちま書いていこうと思います。</p>
<p>記事は以上。</p>
</template>
