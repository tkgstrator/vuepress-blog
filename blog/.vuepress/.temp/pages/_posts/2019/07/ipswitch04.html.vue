<template><h1 id="ipswitch-誰でもできるコード開発-4" tabindex="-1"><a class="header-anchor" href="#ipswitch-誰でもできるコード開発-4" aria-hidden="true">#</a> [IPSwitch] 誰でもできるコード開発 #4</h1>
<h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>今回の内容は以下の記事の続きになります。</p>
<p><a href="https://tkgstrator.work/posts/2019/07/02/ipswitch03.html" target="_blank" rel="noopener noreferrer">[IPSwitch] 誰でもできるコード開発 #3<OutboundLink/></a></p>
<p>この記事を読むにあたって必ず目を通して理解しておいてください。</p>
<h2 id="byml-の値を読み取る" tabindex="-1"><a class="header-anchor" href="#byml-の値を読み取る" aria-hidden="true">#</a> BYML の値を読み取る</h2>
<p>今回は BYML の値を読み取ってパラメータを設定するところを弄りたいと思います。</p>
<p>スプラトゥーンのパラメータは基本的に Byml で制御されているのでそういったサブルーチンはかなりの頻度で呼び出されます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">型</th>
<th style="text-align:center">サブルーチン名</th>
<th style="text-align:center">使用数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">真理数</td>
<td style="text-align:center">tryGetBoolByKey</td>
<td style="text-align:center">318</td>
</tr>
<tr>
<td style="text-align:center">整数</td>
<td style="text-align:center">tryGetIntByKey</td>
<td style="text-align:center">451</td>
</tr>
<tr>
<td style="text-align:center">文字列</td>
<td style="text-align:center">tryGetStringByKey</td>
<td style="text-align:center">357</td>
</tr>
</tbody>
</table>
<p>少なくとも 1000 回は BYML を読み込んでいることがわかりますね。</p>
<p>では、実際にチャレンジしてみましょう。</p>
<h2 id="lp-utl-byamliter-trygetstringbykey" tabindex="-1"><a class="header-anchor" href="#lp-utl-byamliter-trygetstringbykey" aria-hidden="true">#</a> Lp::Utl::ByamlIter::tryGetStringByKey</h2>
<p>以下はブキがロックされているかどうかを調べるサブルーチンです。</p>
<p>さて、気になるのは整数型ではなく文字列型を調べるというところですね。</p>
<p>これは別名、<code>Lp::Utl::ByamlIter::tryGetStringByKey</code>と呼ばれるサブルーチンで Key が Byml のどこにあるのかを検索してくれるものです。</p>
<p>整数で指定するものは値段、ランク、ダメージなど整数で扱えるもの、文字列で指定するのはスペシャルの種類、ブキの名前などですね。</p>
<p><code>tryGetIntByKey</code>に関しては前回の記事で解説したので説明は不要でしょう。</p>
<p>さて、今回は文字列型を取得してそれをなんか計算して何かしらの値を返すサブルーチンである<code>tryGetStringByKey()</code>を使ってブキの開放を行なってみましょう。</p>
<h3 id="ブキ情報パラメータ" tabindex="-1"><a class="header-anchor" href="#ブキ情報パラメータ" aria-hidden="true">#</a> ブキ情報パラメータ</h3>
<p>ブキがブキチのところで買えるかどうかは WeaponInfo_Main.byml で制御されています。</p>
<p>どんなパラメータが存在するかというのは以下参照。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Addition</td>
<td style="text-align:center">リリース済みかどうか</td>
</tr>
<tr>
<td style="text-align:center">CoopAddition</td>
<td style="text-align:center">0 以上だとサーモンランで使用可</td>
</tr>
<tr>
<td style="text-align:center">IsPressRelease</td>
<td style="text-align:center">不明</td>
</tr>
<tr>
<td style="text-align:center">Price</td>
<td style="text-align:center">値段</td>
</tr>
<tr>
<td style="text-align:center">Rank</td>
<td style="text-align:center">解放されるランク</td>
</tr>
<tr>
<td style="text-align:center">Special</td>
<td style="text-align:center">スペシャル</td>
</tr>
<tr>
<td style="text-align:center">SpecialCost</td>
<td style="text-align:center">スペシャル必要量</td>
</tr>
<tr>
<td style="text-align:center">Sub</td>
<td style="text-align:center">サブウェポン</td>
</tr>
</tbody>
</table>
<p>本当はもっとあるのですが、最低限このくらい控えておけば大丈夫でしょう。</p>
<p>Lock というところでブキが販売されているかどうかのチェックをおこなっているので、ここがどんな値を取りうるかを調べます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">None</td>
<td style="text-align:center">ロックなし</td>
</tr>
<tr>
<td style="text-align:center">Bcat</td>
<td style="text-align:center">Bcat で解放</td>
</tr>
<tr>
<td style="text-align:center">NotForeSale</td>
<td style="text-align:center">販売なし</td>
</tr>
<tr>
<td style="text-align:center">Mission</td>
<td style="text-align:center">ミッション達成で開放</td>
</tr>
<tr>
<td style="text-align:center">Other</td>
<td style="text-align:center">不明</td>
</tr>
</tbody>
</table>
<p>要するに全てのブキに対して None を返せばロックが外れるという仕組みです。</p>
<p>ただし、Rank 制限はこれとはまた別に引っかかってくるのでこちらも解除する必要があります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00038EA4                 ADRP            X2, #aLock@PAGE ; "Lock"
00038EA8                 SUB             X0, X29, #-var_C8 ; this
00038EAC                 ADD             X1, SP, #0x630+src ; char **
00038EB0                 ADD             X2, X2, #aLock@PAGEOFF ; "Lock"
00038EB4                 STR             WZR, [SP,#0x630+var_20C]
00038EB8                 BL              _ZNK2Lp3Utl9ByamlIter17tryGetStringByKeyEPPKcS3_ ; Lp::Utl::ByamlIter::tryGetStringByKey(char const**,char const*)
00038EBC                 MOV             W21, WZR
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>このコードがどのように動いているかを考えましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Lp::Utl::ByamlIter::tryGetIntByKey((Lp::Utl::ByamlIter *)&amp;v269, (int *)&amp;v260, "SpecialCost");
v263 = 0;
Lp::Utl::ByamlIter::tryGetStringByKey((Lp::Utl::ByamlIter *)&amp;v269, (const char **)&amp;v239, "Lock");
v120 = 0;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>擬似コードだとこのようになっているので、何かの変数に値を代入しているわけではありません。</p>
<p>こういう場合は前回も説明したように X1 レジスタが示すアドレスに値を格納していることが多いです。</p>
<p>つまり、大雑把にいえば以下のようなコードを書きたいわけです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>STR "None", [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>ところがレジスタに文字列は代入できません、できるのは文字列があるポインタを代入することくらいです。</p>
<p>これは困りましたね...</p>
<h3 id="enum-とは" tabindex="-1"><a class="header-anchor" href="#enum-とは" aria-hidden="true">#</a> Enum とは</h3>
<p>さてここで使われるのが Enum という仕組みです。</p>
<p>Enum というのはこれまた大雑把にいうと配列のようなものです（正確には列挙型というらしい）</p>
<p>文字列のイテレータ（ポインタ）が Enum の何番目にあるのかを返して、それに対してパラメータを設定するわけです。</p>
<p>つまり、最初の<code>Lp::Utl::ByamlIter::tryGetStringByKey</code>は指定した文字列があるポインタを返し、そのポインタが参照している値が Enum の配列の何番目にあるのかを返すサブルーチンがまた別にあるということです。</p>
<p>この辺、解釈超適当なので大幅に間違っている可能性アリ。</p>
<p>「そんな都合がいいサブルーチンある？」と思うかもしれませんが、あります。</p>
<h3 id="cmn-weapondata-locktype-text-int" tabindex="-1"><a class="header-anchor" href="#cmn-weapondata-locktype-text-int" aria-hidden="true">#</a> Cmn::WeaponData::LockType::text_(int)</h3>
<p>直後にあるこのサブルーチンがポインタから値を設定するサブルーチンです。</p>
<p>このサブルーチン、あまりに長いので省略しますが次のような箇所を見てみるとたしかに Enum を使って TextPtr（テキストポインタ）を操作していそうなことがわかります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00053DFC                 BL              _ZN4sead8EnumUtil10parseText_EPPcS1_i ; sead::EnumUtil::parseText_(char **,char *,int)
00053E00                 STR             X21, [X24] ; Cmn::WeaponData::LockType::text_(int)::spTextPtr
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>ここでの各自のパラメータにおける Enum の値（これが正しい書き方なのかわからん）は以下のとおりです。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">Enum</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">None</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">Bcat</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">NotForSale</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">Mission</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">MissionBcat</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Other</td>
<td style="text-align:center">5</td>
</tr>
</tbody>
</table>
<p>None が 0 なのがいいですね、0 に設定するのは楽なので。</p>
<h2 id="擬似コード" tabindex="-1"><a class="header-anchor" href="#擬似コード" aria-hidden="true">#</a> 擬似コード</h2>
<p>さて、ここまでの話をまとめると<code>tryGetStringBykey()</code>は文字列があるポインタを返すのでそのままでは上手く値を上書きできないということでした。</p>
<p>ところが、そのポインタを使って Enum（配列）のイテレータを返す<code>LockType::text()</code>というサブルーチンがあり、これを利用することで値を設定できそうという流れでした。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Lp::Utl::ByamlIter::tryGetStringByKey((Lp::Utl::ByamlIter *)&amp;v269, (const char **)&amp;v239, "Lock");
v120 = 0;
while (1)
{
    v224 = off_3DFE3D8;
    v225 = v239;
    v121 = (char *)Cmn::WeaponData::LockType::text_((Cmn::WeaponData::LockType *)v120);
    v222 = off_3DFE3D8;
    v223 = v121;
    ((void(__fastcall *)(__int64(__fastcall ***)()))v224[3])(&amp;v224);
    ((void(__fastcall *)(__int64(__fastcall ***)()))v224[3])(&amp;v224);
    v122 = v225;
    ((void(__fastcall *)(__int64(__fastcall ***)()))v222[3])(&amp;v222);
    if (v122 == v223)
        break;
    v123 = 0LL;
    v124 = v223 + 1;
    do
    {
        v125 = (unsigned __int8)v225[v123];
        if (v125 != (unsigned __int8)v223[v123])
            break;
        if (v125 == (unsigned __int8)sead::SafeStringBase&lt;char>::cNullChar)
            goto LABEL_244;
        v126 = (unsigned __int8)v225[v123 + 1];
        if (v126 != (unsigned __int8)v124[v123])
            break;
        if (v126 == (unsigned __int8)sead::SafeStringBase&lt;char>::cNullChar)
            goto LABEL_244;
        v127 = (unsigned __int8)v225[v123 + 2];
        if (v127 != (unsigned __int8)v124[v123 + 1])
            break;
        if (v127 == (unsigned __int8)sead::SafeStringBase&lt;char>::cNullChar)
            goto LABEL_244;
        v123 += 3LL;
    } while (v123 &lt; 524289);
    if ((signed int)++v120 >= 6)
        goto LABEL_245;
}
LABEL_244 : v263 = v120;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>さて、このサブルーチンをどういじっていいのかわからないと思いますが（ここを解析するのにすっごい時間がかかった）</p>
<p>最終的に goto LABEL_244 に到達して v263=v120 という処理をおこなっていることに注目すれば何となく分かると思います。</p>
<p>ここでは v120 は W21 レジスタで、v263 は [SP, #0x424] を意味しています。</p>
<p>つまり、W21 レジスタの中身を &quot;わざわざ&quot; メモリにコピーしているということです。</p>
<p>本来は W21 レジスタの中身をコピーしているところを None（Enum だと 0）をコピーすればいいのでゼロレジスタを使います。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//  Before
STR W21, [SP,#0x424]

// After
STR WZR, [SP,#0x424]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>さて、これで常に Lock の値として None を返すコードが書けます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Unlock Weapon (3.1.0) [tkgling]
@disabled
00038F98 FF2704B9 // STR WZR, [SP, #0x424]

// Unlock Weapon (5.4.0) [tkgling]
@disabled
000865E8 FF2704B9 // STR WZR, [SP, #0x424]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ところがこれはランクが足りない場合には購入できません。</p>
<p>ランクによるロックは以下のアセンブリで与えられます。</p>
<p>ついでなので値段も変更してしまいましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>00038D1C                 LDR             X1, [SP,#0x630+var_5C8] ; int *
00038D20                 ADRP            X2, #aPrice@PAGE ; "Price"
00038D24                 SUB             X0, X29, #-var_C8 ; this
00038D28                 ADD             X2, X2, #aPrice@PAGEOFF ; "Price"
00038D2C                 BL              _ZNK2Lp3Utl9ByamlIter14tryGetIntByKeyEPiPKc ; Lp::Utl::ByamlIter::tryGetIntByKey(int *,char const*)
00038D30                 LDR             X1, [SP,#0x630+var_5D0] ; int *
00038D34                 ADRP            X2, #aRank@PAGE ; "Rank"
00038D38                 SUB             X0, X29, #-var_C8 ; this
00038D3C                 ADD             X2, X2, #aRank@PAGEOFF ; "Rank"
00038D40                 BL              _ZNK2Lp3Utl9ByamlIter14tryGetIntByKeyEPiPKc ; Lp::Utl::ByamlIter::tryGetIntByKey(int *,char const*)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>以下のようにどちらも値をレジスタに直接代入していないので、[X1] レジスタにコピーするコードを書きましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Lp::Utl::ByamlIter::tryGetIntByKey((Lp::Utl::ByamlIter *)&amp;v269, &amp;v261, "Price");
Lp::Utl::ByamlIter::tryGetIntByKey((Lp::Utl::ByamlIter *)&amp;v269, &amp;v262, "Rank");
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>やることが同じなのでどちらも同じコードが書けます、違うのはアドレスだけです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Free Weapon
STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Unlock All Weapon
STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>これを ARM to HEX で変換してアドレスを追加して IPSwitch で使える形式にします。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Free Weapon (3.1.0) [tkgling]
@disabled
00038D2C 3F0000B9 // STR WZR, [X1]

// Free Weapon (5.4.0) [tkgling]
@disabled
0008637C 3F0000B9 // STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Unlock All Weapon (3.1.0) [tkgling]
@disabled
00038D40 3F0000B9 // STR WZR, [X1]

// Unlock All Weapon (5.4.0) [tkgling]
@disabled
00086390 3F0000B9 // STR WZR, [X1]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="全ブキ開放" tabindex="-1"><a class="header-anchor" href="#全ブキ開放" aria-hidden="true">#</a> 全ブキ開放</h2>
<p>やろうと思ったのですが、クマブキやその他の未リリースブキの開放のためのパラメータがわかんなかったので中途半端になっちゃいました。</p>
<p>一応別のコードを使って全ブキをデバッグ状態っぽく開放すれば購入はできるのですが、いろいろバグっているので公開は控えます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Unlock All Weapon (3.1.0) [tkgling]
@disabled
00038D2C 3F0000B9 // STR WZR, [X1]
00038D40 3F0000B9 // STR WZR, [X1]
00038F98 FF2704B9 // STR WZR, [SP, #0x424]

// Unlock All Weapon (5.4.0) [tkgling]
@disabled
0008637C 3F0000B9 // STR WZR, [X1]
00086390 3F0000B9 // STR WZR, [X1]
000865E8 FF2704B9 // STR WZR, [SP, #0x424]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>というわけで、とりあえずクマブキやその他のヘンテコなブキ以外は全部開放できるコードをつくりました。</p>
<p>ランクが低くても全てのブキが購入でき、未リリースブキも買えます。</p>
<p>記事は以上。</p>
</template>
