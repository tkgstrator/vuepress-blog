<template><h2 id="はじめに" tabindex="-1"><a class="header-anchor" href="#はじめに" aria-hidden="true">#</a> はじめに</h2>
<p>なんでこんな記事書いたかというと、書かないととんでもないこと言い出しそうな人がいそうなので。</p>
<p>データは全て 4.7.0 の Coop_Levels.bprm を参照しています。</p>
<h2 id="イベントパラメータ" tabindex="-1"><a class="header-anchor" href="#イベントパラメータ" aria-hidden="true">#</a> イベントパラメータ</h2>
<p>キケン度 MAX のみのパラメータだけを記します。</p>
<p>他のキケン度も値が違うだけで、設定されているパラメータは全く同じです。</p>
<h3 id="ザコシャケ出現重み" tabindex="-1"><a class="header-anchor" href="#ザコシャケ出現重み" aria-hidden="true">#</a> ザコシャケ出現重み</h3>
<table>
<thead>
<tr>
<th style="text-align:center">シャケ名</th>
<th style="text-align:center">重み</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ドスコイ</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">シャケ</td>
<td style="text-align:center">10</td>
</tr>
<tr>
<td style="text-align:center">コジャケ</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<p>重みは出現重みを意味しているので、キケン度 MAX だと 4/15 の確率でドスコイが出現するということを表している。</p>
<p>ここのパラメータを全て 0 にすると一切のザコシャケが出現せず、オオモノオンリーモードになります。</p>
<h3 id="不明" tabindex="-1"><a class="header-anchor" href="#不明" aria-hidden="true">#</a> 不明</h3>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">W1</th>
<th style="text-align:center">W2</th>
<th style="text-align:center">W3</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">出現間隔 [H1]</td>
<td style="text-align:center">30</td>
<td style="text-align:center">30</td>
<td style="text-align:center">30</td>
</tr>
<tr>
<td style="text-align:center">同時活動数 [H1]</td>
<td style="text-align:center">22</td>
<td style="text-align:center">24</td>
<td style="text-align:center">26</td>
</tr>
<tr>
<td style="text-align:center">ノルマ</td>
<td style="text-align:center">21</td>
<td style="text-align:center">23</td>
<td style="text-align:center">25</td>
</tr>
<tr>
<td style="text-align:center">出現間隔 [H2]</td>
<td style="text-align:center">20</td>
<td style="text-align:center">20</td>
<td style="text-align:center">20</td>
</tr>
<tr>
<td style="text-align:center">同時活動数 [H2]</td>
<td style="text-align:center">28</td>
<td style="text-align:center">30</td>
<td style="text-align:center">32</td>
</tr>
<tr>
<td style="text-align:center">出現数</td>
<td style="text-align:center">20</td>
<td style="text-align:center">22</td>
<td style="text-align:center">24</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>出現間隔 [H1] の正式なパラメータ名は mEnemyAppearInterval1stHalf だが、どう訳していいのかわからないのでとりあえず出現間隔とした。</p>
<p>また、同時活動数 [H1] も同様に mEnemyActiveMax1stHalf なのだが、同時活動数と訳した。</p>
</div>
<h3 id="霧イベント" tabindex="-1"><a class="header-anchor" href="#霧イベント" aria-hidden="true">#</a> 霧イベント</h3>
<table>
<thead>
<tr>
<th style="text-align:center">レア出現サイクル</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">5</td>
</tr>
</tbody>
</table>
<p>金シャケは五体に一体でるという計算だろうか。</p>
<p>Rare = (N - 1)/5</p>
<p>つまり、こういう床関数で表せることになるのだがあっているのかな？</p>
<table>
<thead>
<tr>
<th style="text-align:center">ノルマ数</th>
<th style="text-align:center">金シャケ数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">17</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">18</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">19</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">20</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">21</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">22</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">23</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">24</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">25</td>
<td style="text-align:center">4</td>
</tr>
</tbody>
</table>
<h3 id="イベント" tabindex="-1"><a class="header-anchor" href="#イベント" aria-hidden="true">#</a> イベント</h3>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">活動数</th>
<th style="text-align:center">間隔</th>
<th style="text-align:center">倍率</th>
<th style="text-align:center">重み</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">金シャケ探し</td>
<td style="text-align:center">32</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">100</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">ヒカリバエ</td>
<td style="text-align:center">32</td>
<td style="text-align:center">10</td>
<td style="text-align:center">100</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">ハコビヤ</td>
<td style="text-align:center">15</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">100</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">霧</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">100</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">なし</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">100</td>
<td style="text-align:center">18</td>
</tr>
<tr>
<td style="text-align:center">ドスコイ</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">100</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">グリル</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">-1</td>
<td style="text-align:center">100</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<p>ここから全ての夜 WAVE 発生確率は 1/25 = 4%であることがわかります。</p>
<p>SalmonRec の統計を見てもおおよそこの範囲に収まっており、正しい推論という証拠の一つになりますね。</p>
<h3 id="ラッシュ" tabindex="-1"><a class="header-anchor" href="#ラッシュ" aria-hidden="true">#</a> ラッシュ</h3>
<table>
<thead>
<tr>
<th style="text-align:center">レア出現サイクル</th>
<th style="text-align:center">ザコシャケ速度倍率</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">20</td>
<td style="text-align:center">3.5</td>
</tr>
</tbody>
</table>
<p>ザコシャケ速度倍率は金シャケも含めたシャケの移動速度です。</p>
<p>レア出現サイクルは 20 となっており、シャケの同時活動数が 32 なことから普通にプレイしていると金シャケは同時に一体か二体しか現れないことがわかります。</p>
<p>ザコシャケを 19 体倒して金シャケだけ残す、っていうプレイをしていると金シャケが 32 体同時に現れるはずなんですがそんなプレイ可能なんでしょうかね？</p>
<h3 id="ハコビヤ" tabindex="-1"><a class="header-anchor" href="#ハコビヤ" aria-hidden="true">#</a> ハコビヤ</h3>
<table>
<thead>
<tr>
<th style="text-align:center">各ザコシャケ同時活動数</th>
<th style="text-align:center">体力</th>
<th style="text-align:center">不明</th>
<th style="text-align:center">シャケコプター速度</th>
<th style="text-align:center">シャケコプター活動数</th>
<th style="text-align:center">シャケコプター間隔</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">35000</td>
<td style="text-align:center">5</td>
<td style="text-align:center">2</td>
<td style="text-align:center">15</td>
<td style="text-align:center">50</td>
</tr>
</tbody>
</table>
<p>間隔はフレーム単位なので 10 秒に 12 体出現するペースだということがわかる。</p>
<p>母艦の金イクラ回収ペースは 3 秒に 1 つ（だったような）なので、リスキルすればするほど金イクラは増えていく計算になります。</p>
<p>母艦の体力は 35000（ゲーム上は 3500 扱い）なので、1 発 60 ダメージでフルチャで 60 発撃てるハイドラントはフルチャ一回（ダメージ 3600）で追い返せる計算になります。</p>
<h3 id="グリル" tabindex="-1"><a class="header-anchor" href="#グリル" aria-hidden="true">#</a> グリル</h3>
<table>
<thead>
<tr>
<th style="text-align:center">二体目追加</th>
<th style="text-align:center">間隔</th>
<th style="text-align:center">グリル速度倍率</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">10</td>
<td style="text-align:center">3</td>
<td style="text-align:center">2.3</td>
</tr>
</tbody>
</table>
<p>10 秒で二体目のグリルが追加で、移動速度が 2.3 倍という意味。</p>
<h3 id="潮" tabindex="-1"><a class="header-anchor" href="#潮" aria-hidden="true">#</a> 潮</h3>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">満潮</th>
<th style="text-align:center">通常</th>
<th style="text-align:center">干潮</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">活動倍率</td>
<td style="text-align:center">100</td>
<td style="text-align:center">100</td>
<td style="text-align:center">100</td>
</tr>
<tr>
<td style="text-align:center">重み</td>
<td style="text-align:center">1</td>
<td style="text-align:center">3</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<p>オオモノの同時活動数に違いはなく、それぞれの潮の高さの確率が違うだけです。</p>
<p>通常が 60%で、干潮と満潮がそれぞれ 20%です。</p>
<h3 id="カンケツセン" tabindex="-1"><a class="header-anchor" href="#カンケツセン" aria-hidden="true">#</a> カンケツセン</h3>
<table>
<thead>
<tr>
<th style="text-align:center">ザコ活動数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">48</td>
</tr>
</tbody>
</table>
<h3 id="その他" tabindex="-1"><a class="header-anchor" href="#その他" aria-hidden="true">#</a> その他</h3>
<table>
<thead>
<tr>
<th style="text-align:center">キケン度</th>
<th style="text-align:center">ドスコイ同時活動数</th>
<th style="text-align:center">シャケ同時活動数</th>
<th style="text-align:center">コジャケ同時活動数</th>
<th style="text-align:center">湧き方向変更回数</th>
<th style="text-align:center">ミサイルイベント</th>
<th style="text-align:center">オオモノフォロワー数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">1000</td>
<td style="text-align:center">7</td>
<td style="text-align:center">0</td>
<td style="text-align:center">0</td>
<td style="text-align:center">8</td>
<td style="text-align:center">00000000</td>
<td style="text-align:center">0</td>
</tr>
</tbody>
</table>
<p>ミサイルイベントは mEventMissile なのだが、何を意味しているか不明。</p>
<p>オオモノフォロワー数は mRareFollowerNum なのだが、これも同様に不明。</p>
<p>シャケとコジャケの同時活動数が 0 になっているが、これは 制限がない ということを意味していると思われる。</p>
<h2 id="シャケパラメータ" tabindex="-1"><a class="header-anchor" href="#シャケパラメータ" aria-hidden="true">#</a> シャケパラメータ</h2>
<p>Coop_System.bprm から wiki に載っていないデータのみ取り扱いました。</p>
<p>同時出現数が 4 のシャケは多分オオモノのことを指します。</p>
<p>ここを変えれば同じ種類のオオモノが三体以上でるんでしょうか？</p>
<p>この数字を 32 などにしてもオオモノの出現数は変わりませんでした。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">速度 [基本]</th>
<th style="text-align:center">速度 [地上]</th>
<th style="text-align:center">速度 [水中]</th>
<th style="text-align:center">同時出現数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Bomber</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0.8</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Bullet</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">8</td>
</tr>
<tr>
<td style="text-align:center">Cup</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0.8</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">Snake</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Tower</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Large</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0.6</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">32</td>
</tr>
<tr>
<td style="text-align:center">Bagman</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1.2</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">32</td>
</tr>
<tr>
<td style="text-align:center">Dozer</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Small</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1.2</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">32</td>
</tr>
<tr>
<td style="text-align:center">Cannon</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0.7</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">Puncher</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">Diver</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1.6</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Bullet</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0.5</td>
<td style="text-align:center">1</td>
<td style="text-align:center">32</td>
</tr>
<tr>
<td style="text-align:center">Escape</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">Rocket</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Golden</td>
<td style="text-align:center">0.8</td>
<td style="text-align:center">0.6</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">8</td>
</tr>
<tr>
<td style="text-align:center">CupTwins</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">BagmanLarge</td>
<td style="text-align:center">0.6</td>
<td style="text-align:center">1.2</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">BulletPunch</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">Shield</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1.3</td>
<td style="text-align:center">1</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">Flyer</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">Geyser</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">Standard</td>
<td style="text-align:center">1</td>
<td style="text-align:center">0.8</td>
<td style="text-align:center">1.5</td>
<td style="text-align:center">32</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>速度 [基本] は動作の動きなので、早くするとオオモノのスキがなくなります。</p>
</div>
<h2 id="ブキパラメータ" tabindex="-1"><a class="header-anchor" href="#ブキパラメータ" aria-hidden="true">#</a> ブキパラメータ</h2>
<p>4.4.0 の武器のパラーメータ一覧とその解説です。</p>
<p><a href="https://leanny.github.io/param/" target="_blank" rel="noopener noreferrer">Splatoon 2 Parameter<OutboundLink/></a></p>
<h3 id="クマチャー" tabindex="-1"><a class="header-anchor" href="#クマチャー" aria-hidden="true">#</a> クマチャー</h3>
<p>バージョンが 4.4.0 ですが、クマチャーのパラメータ一覧とその解説は以下のリンクにあります。</p>
<p><a href="https://leanny.github.io/param/parameter_charger_jp.html#tabs-8" target="_blank" rel="noopener noreferrer">Splatoon 2 Parameter - Charger v4.4.0<OutboundLink/></a></p>
<p>チャージ時間が存在せず、射撃準備 6 フレームだけで 200 ダメージを与えられる瞬間最高火力がぶっちぎり 1 位の違法改造ブキ。</p>
<p>1 秒に与えられるダメージ（DPS）は 1200 とスライド後スパッタリー 675 を大きく上回り、まさに最強の名にふさわしい性能を持っている。</p>
<h3 id="クマスロ" tabindex="-1"><a class="header-anchor" href="#クマスロ" aria-hidden="true">#</a> クマスロ</h3>
<p>クマスロも同様に、4.4.0 のパラメータ一覧とその解説です。</p>
<p><a href="https://leanny.github.io/param/parameter_slosher_jp.html#tabs-4" target="_blank" rel="noopener noreferrer">Splatoon 2 Parameter - Slosher v4.4.0<OutboundLink/></a></p>
<p>インク消費 25%とクマサン印のチャージャーを上回る脅威の燃費性能の悪さを誇る。</p>
<p>そのかわり地形以外の全てのオブジェクトを貫通する性能をもち、忌まわしきカタパッドを一撃で鎮めることのできる神ブキでもある。</p>
<p>まわりのウズでもダメージは 150 あるが、直撃ダメージは 360 もあるのでなるべく直撃を狙いたい。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>wiki では直撃最高 DPS が 540 となっているが、そのパラメータが見つからなかった。</p>
<p>540 であればバクダンが二確のはずなのでそれはおかしい気がする。</p>
<p>ひょっとしたら曲射利用なのかもしれないが、要検証。</p>
<p>https://wikiwiki.jp/splatoon2mix</p>
</div>
<h3 id="クマブキの確定数一覧" tabindex="-1"><a class="header-anchor" href="#クマブキの確定数一覧" aria-hidden="true">#</a> クマブキの確定数一覧</h3>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">HP</th>
<th style="text-align:center">クマチャー</th>
<th style="text-align:center">クマスロ</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ドスコイ</td>
<td style="text-align:center">400</td>
<td style="text-align:center">2</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">バクダン</td>
<td style="text-align:center">300、1000</td>
<td style="text-align:center">2、-</td>
<td style="text-align:center">1、3</td>
</tr>
<tr>
<td style="text-align:center">ヘビ</td>
<td style="text-align:center">500</td>
<td style="text-align:center">3</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">テッパン</td>
<td style="text-align:center">500、600</td>
<td style="text-align:center">6</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">タワー</td>
<td style="text-align:center">60*7</td>
<td style="text-align:center">7</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">モグラ</td>
<td style="text-align:center">1200</td>
<td style="text-align:center">6</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">コウモリ</td>
<td style="text-align:center">900</td>
<td style="text-align:center">5</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">カタパッド</td>
<td style="text-align:center">360</td>
<td style="text-align:center">-</td>
<td style="text-align:center">1</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>クマチャーの対テッパンは自分で動きを止めてから弱点を狙うと 6 発も消費してしまうので非常に効率が悪い。</p>
<p>その性能を遺憾なく発揮したいのであれば誰かに弱点を向けてもらおう。</p>
<p>クマチャーの対タワーは連射すると同じ鍋に二回あたってしまって確定数が増える場合があるので、少し間隔をあけて撃つと良い。</p>
<p>wiki ではテッパンがスタンを含んで三確とあるが、それはおかしい。</p>
<p>スタンさせるためにはまず三発当てないといけない。</p>
<p>スタンさせた状態で、という意味だろうか？</p>
<p>https://wikiwiki.jp/splatoon2mix</p>
</div>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>とりあえず xml で定義されているサーモンランのパラメータについてはおおよそ触れてみました。</p>
<p>また面白そうなパラメータが見つかったら記事にしようと思います。</p>
<p>記事は以上。</p>
</template>
