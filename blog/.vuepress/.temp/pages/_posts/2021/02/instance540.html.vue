<template><h2 id="_5-4-0-向けインスタンスアドレス" tabindex="-1"><a class="header-anchor" href="#_5-4-0-向けインスタンスアドレス" aria-hidden="true">#</a> 5.4.0 向けインスタンスアドレス</h2>
<table>
<thead>
<tr>
<th style="text-align:center">クラス</th>
<th style="text-align:center">3.1.0</th>
<th style="text-align:center">5.4.0</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Game::PlayerMgr</td>
<td style="text-align:center">04157578</td>
<td style="text-align:center">02CFDCF8</td>
<td style="text-align:center">ガチマッチなどのプレイヤー情報</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::RuleConfig</td>
<td style="text-align:center">04158008</td>
<td style="text-align:center">-</td>
<td style="text-align:center">パラメータを設定する</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::LevelsConfig</td>
<td style="text-align:center">04160E00</td>
<td style="text-align:center">-</td>
<td style="text-align:center">詳細なパラメータを設定する</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::Setting</td>
<td style="text-align:center">04160E08</td>
<td style="text-align:center">-</td>
<td style="text-align:center">キケン度やステージなどの設定を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::EnemyDirector</td>
<td style="text-align:center">04165740</td>
<td style="text-align:center">-</td>
<td style="text-align:center">シャケを司るクラス</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::PlayerDirector</td>
<td style="text-align:center">04165DB8</td>
<td style="text-align:center">02D0CEE0</td>
<td style="text-align:center">サーモンランのプレイヤー情報を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::EventDirector</td>
<td style="text-align:center">04167BC0</td>
<td style="text-align:center">-</td>
<td style="text-align:center">夜イベントなどの情報を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::Moderator</td>
<td style="text-align:center">04168C78</td>
<td style="text-align:center">-</td>
<td style="text-align:center">クマサンの挙動を司る</td>
</tr>
<tr>
<td style="text-align:center">Game::Coop::ResultPlayReport</td>
<td style="text-align:center">04169050</td>
<td style="text-align:center">-</td>
<td style="text-align:center">リザルトデータを司る</td>
</tr>
</tbody>
</table>
<h2 id="hook-するアドレスまとめ" tabindex="-1"><a class="header-anchor" href="#hook-するアドレスまとめ" aria-hidden="true">#</a> Hook するアドレスまとめ</h2>
<p>クラスの定義のアドレスは変わっていなかったのですが、Hook する関数はズレていたので載せておきます。</p>
<h3 id="game-playermgr-getcontrolledperformer" tabindex="-1"><a class="header-anchor" href="#game-playermgr-getcontrolledperformer" aria-hidden="true">#</a> Game::PlayerMgr::getControlledPerformer</h3>
<p>自分自身のプレイヤーのインスタンスを取得するために必要な関数。</p>
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
<p>5.3.1 からズレました</p>
<h3 id="game-playerclonehandle-sendsignalevent" tabindex="-1"><a class="header-anchor" href="#game-playerclonehandle-sendsignalevent" aria-hidden="true">#</a> Game::PlayerCloneHandle::sendSignalEvent</h3>
<p>ナイスやカモンを Hook するための関数。</p>
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
<p>5.3.1 からズレました</p>
<h2 id="移植しよう" tabindex="-1"><a class="header-anchor" href="#移植しよう" aria-hidden="true">#</a> 移植しよう</h2>
<p>例のテンプレートをペタペタと埋めるだけ。</p>
<p>sendSignalEvent のアドレスが変わったのでまずはそこをズラそう。</p>
<h3 id="シグナルで-999-納品" tabindex="-1"><a class="header-anchor" href="#シグナルで-999-納品" aria-hidden="true">#</a> シグナルで 999 納品</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) [5.4.0]
0104C94C ADRP X0, #0xXXXXX000
0104C950 LDR X0, [X0, #0xYYY]
0104C954 LDR X0, [X0]
0104C958 MOV W1, #0x270F
0104C95C STR W1, [X0, #0x370]
0104C960 MOV W1, #0x3E7
0104C964 STR W1, [X0, #0x378]
0104C968 STR W1, [X0, #0x37C]
0104C96C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>こちらは BL 命令を使わないのでコールスタックは不要。XXXXX と YYY の値を計算したらおしまい。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Game::Coop::PlayerDirector : 02D0CEE0 -> 02D0C
ADRP : 0104C94C -> 0104C

XXXXX = 02D0C - 0104C = 01CC0
YYY = EE0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) [5.4.0]
0104C94C ADRP X0, #0x01CC0000
0104C950 LDR X0, [X0, #0xEE0]
0104C954 LDR X0, [X0]
0104C958 MOV W1, #0x270F
0104C95C STR W1, [X0, #0x370]
0104C960 MOV W1, #0x3E7
0104C964 STR W1, [X0, #0x378]
0104C968 STR W1, [X0, #0x37C]
0104C96C RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>これを ARM64 に変換するところは簡単ですので自分でやってみましょう。</p>
<h3 id="金イクラを消してみよう" tabindex="-1"><a class="header-anchor" href="#金イクラを消してみよう" aria-hidden="true">#</a> 金イクラを消してみよう</h3>
<p>イクラを取得すると取った瞬間になかったことになるコードです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Game::Coop::PlayerDirector : 02D0CEE0 -> 02D0C
ADRP : 0073C604 -> 0073C

XXXXX = 02D0C - 0073C = 02594
YYY = EE0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0073C604 ADRP X0, #0x25D0000
0073C608 LDR X0, [X0, #0xEE0]
0073C60C LDR X0, [X0]
0073C610 STR WZR, [X0, #0x374]
0073C614 RET
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Lost Cashed GoldenEggs [tkgling]
@disabled
0073C604 802E0190
0073C608 007047F9
0073C60C 000040F9
0073C610 1F7403B9
0073C614 C0035FD6
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="おまけ" tabindex="-1"><a class="header-anchor" href="#おまけ" aria-hidden="true">#</a> おまけ</h2>
<p>これだけだと記事の内容として寂しいのでいくつかのコードを載せておきます。5.4.0 で動きます。</p>
<h3 id="金イクラがいっぱい" tabindex="-1"><a class="header-anchor" href="#金イクラがいっぱい" aria-hidden="true">#</a> 金イクラがいっぱい</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Infinite Golden Eggs [tkgling]
@disabled
0066739C 0031881A // Salmonids
0068D680 40018052 // Snatchers
006CF59C 40018052 // Chinooks
00667398 48018052 // Boss Salmonids
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>シャケが金イクラを 10 個ドロップするようになります。ただし、キンシャケ探しのキンシャケ・ラッシュのキンシャケ・霧のキンシャケ・グリルの四つのオオモノについては別パラメータで設定されているため変化しません。</p>
<h3 id="切断チェック回避" tabindex="-1"><a class="header-anchor" href="#切断チェック回避" aria-hidden="true">#</a> 切断チェック回避</h3>
<p>本来であれば 60 秒間操作せずにいると回線落ち扱いになるのですが、3600 秒放置しないと落ちないようになります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Disable MovelessPlayer Checker [tkgling]
@disabled
00F8EAD0 094C9D52
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>記事は以上。</p>
</template>
