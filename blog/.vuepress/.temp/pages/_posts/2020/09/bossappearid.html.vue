<template><h2 id="サーモンラン完全解析" tabindex="-1"><a class="header-anchor" href="#サーモンラン完全解析" aria-hidden="true">#</a> サーモンラン完全解析</h2>
<p>バイト開始時の初期シードから計算できる全てのパラメータを求めるアルゴリズムを解析しようという試みです。</p>
<p>現在のところ、以下の要素が初期シードから計算可能であることがわかっており、いくつかのものについては<a href="https://twitter.com/container12345" target="_blank" rel="noopener noreferrer">@container12345<OutboundLink/></a>氏により完全解析されています。</p>
<table>
<thead>
<tr>
<th style="text-align:center">パラメータ</th>
<th style="text-align:center">進捗</th>
<th style="text-align:center">クラス</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">潮位</td>
<td style="text-align:center">完全解析済</td>
<td style="text-align:center">Game::Coop::Setting</td>
</tr>
<tr>
<td style="text-align:center">イベント</td>
<td style="text-align:center">完全解析済</td>
<td style="text-align:center">Game::Coop::Setting</td>
</tr>
<tr>
<td style="text-align:center">キンシャケ探しアタリ位置</td>
<td style="text-align:center">完全解析済</td>
<td style="text-align:center">Game::Coop::EventGeyser</td>
</tr>
<tr>
<td style="text-align:center">キンシャケ探しゴール位置</td>
<td style="text-align:center">ほぼ解析済*</td>
<td style="text-align:center">Game::Coop::EventGeyser</td>
</tr>
<tr>
<td style="text-align:center">ランダム支給ブキ</td>
<td style="text-align:center">未解析</td>
<td style="text-align:center">未調査</td>
</tr>
<tr>
<td style="text-align:center">支給スペシャル</td>
<td style="text-align:center">未解析</td>
<td style="text-align:center">未調査</td>
</tr>
<tr>
<td style="text-align:center">オオモノ湧き順</td>
<td style="text-align:center">未解析</td>
<td style="text-align:center">Game::Coop::EnemyDirector</td>
</tr>
<tr>
<td style="text-align:center">シャケ湧き方向変化</td>
<td style="text-align:center">未解析</td>
<td style="text-align:center">Game::Coop::EnemyDirector</td>
</tr>
<tr>
<td style="text-align:center">ラッシュイベントのターゲット</td>
<td style="text-align:center">未解析</td>
<td style="text-align:center">Game::Coop::EnemyDirector</td>
</tr>
<tr>
<td style="text-align:center">霧イベントの金イクラ</td>
<td style="text-align:center">未解析</td>
<td style="text-align:center">未調査</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">解析について</p>
<p>オオモノの湧き順とシャケの湧き方向変化については解析が完了しました。</p>
<p>代替オオモノについてはわかっていない点が多いものの、再現が困難なので解析する予定は今のところありません。</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">難破船ドンブラコについて</p>
<p>キンシャケ探しゴール位置は難破船ドンブラコと通常潮と満潮での特定の一箇所のゴール位置のみが計算できていません。これは 3.2.0 からキンシャケ探しイベントにおいてドンブラコのみ別の計算式が使われるようになったためです。</p>
</div>
<p>逆に言うとこれ以外のものは初期シードから簡単に決まらない可能性が高いです。ハコビヤイベントのシャケコプターの飛来位置やグリルイベントのターゲットも初期シードから決まっているはずなのですが、リトライしても同じ状態が再現されないためです。</p>
<h3 id="前回までの進捗" tabindex="-1"><a class="header-anchor" href="#前回までの進捗" aria-hidden="true">#</a> 前回までの進捗</h3>
<p>さて、前回は<code>Game::Coop::EnemyDirector</code>クラスが二つの乱数生成器をもち、一方はザコシャケの計算に使い、もう一方はオオモノ出現と湧き方向変化に使われていそうだという話をしました。</p>
<p>オオモノの湧きを完全解析するのであれば、乱数消費が「オオモノの湧き」によるものなのか「湧き方向の変化」によるものなのかを区別しなければなりません。</p>
<p>しかし、湧き方向変化はキケン度 MAX とたつじん 80%では 8、それ以外では 6 という風になっているため、一律に定義することができません。なので今回は湧き方向変化を 8 回と決め打ちしてプログラムを組むことにしました。</p>
<p>WAVE の潮位とイベントの検索アルゴリズムも、実はたつじんとそれ以下では異なっています。でもアルゴリズムはたつじん以上にしか対応していません。それと同じように、本アルゴリズムもあくまでもキケン度 MAX の湧きを計算するものにします。</p>
<h2 id="逆アセンブラの擬似コードを解析する" tabindex="-1"><a class="header-anchor" href="#逆アセンブラの擬似コードを解析する" aria-hidden="true">#</a> 逆アセンブラの擬似コードを解析する</h2>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
  v78 <span class="token operator">=</span> v11<span class="token punctuation">;</span>
  v12 <span class="token operator">=</span> Game<span class="token double-colon punctuation">::</span>Coop<span class="token double-colon punctuation">::</span><span class="token class-name">EnemyRareType</span><span class="token double-colon punctuation">::</span><span class="token function">getArray_</span><span class="token punctuation">(</span>v8<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>v12 <span class="token operator">&lt;=</span> v78<span class="token punctuation">)</span>
    v13 <span class="token operator">=</span> <span class="token operator">*</span><span class="token punctuation">(</span>v12 <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span>
    v13 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">(</span>v12 <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">4L</span> <span class="token operator">*</span> v78<span class="token punctuation">)</span><span class="token punctuation">;</span>
  v75 <span class="token operator">=</span> <span class="token operator">*</span>v13<span class="token punctuation">;</span>
  v8 <span class="token operator">=</span> Game<span class="token double-colon punctuation">::</span>Coop<span class="token double-colon punctuation">::</span><span class="token class-name">EnemyDirector</span><span class="token double-colon punctuation">::</span><span class="token function">getEnemyActiveMax_</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>v75<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v75 <span class="token operator">>=</span> <span class="token number">0x17</span><span class="token punctuation">)</span>
    v14 <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token keyword">this</span><span class="token operator">-></span>dword6A0<span class="token punctuation">;</span>
  <span class="token keyword">else</span>
    v14 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">this</span><span class="token operator">-></span>dword6A0 <span class="token operator">+</span> v75<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>v8 <span class="token operator">></span> <span class="token operator">*</span>v14<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token operator">++</span>v10<span class="token punctuation">;</span>
    v8 <span class="token operator">=</span> sead<span class="token double-colon punctuation">::</span><span class="token class-name">Random</span><span class="token double-colon punctuation">::</span><span class="token function">getUe32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>v83<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token operator">!</span><span class="token punctuation">(</span>v8 <span class="token operator">*</span> v10 <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span>
      v84 <span class="token operator">=</span> v75<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span> v11 <span class="token operator">&lt;=</span> <span class="token number">6</span><span class="token punctuation">)</span>
    <span class="token operator">++</span>v11<span class="token punctuation">;</span>
  <span class="token keyword">else</span>
    v11 <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span> v11 <span class="token operator">!=</span> v9<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> v10 <span class="token punctuation">)</span>
  v85 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>最初に逆アセンブラから得られた生コードがこれでした。神プログラマはこれでもいけるのかもしれませんが、ぼくにとってはこれだけではほとんど意味不明でした。</p>
<p>各変数の構造体を推定し、これを手作業で正しい C++コードに修正する必要があります。</p>
<p>ここで気になるのは<code>v12</code>で、<code>getArray()</code>の返り値を使っていることから配列であることが予想されます。これは<code>*(v12 + 1)</code>と<code>*v12</code>と<code>*(v12 + 1) + 4LL * v78</code>という記述からも裏付けられます。</p>
<p>これは C++におけるポインタの挙動を示しており、<code>v12</code>は次のような構造をもっているのではないかと推察されるのです。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">array</span> <span class="token punctuation">{</span>
<span class="token class-name">uint32_t</span> mLength<span class="token punctuation">;</span>
<span class="token class-name">uint32_t</span> <span class="token operator">*</span>ptr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>つまり、<code>*v12</code>が配列の長さを<code>*(v12 + 1)</code>が<code>v12[0]</code>を表しているというわけです。また、<code>4LL * v78</code>という記述から配列は 4 バイトずつズレています。4 バイトズレるということは 32 ビットなのですから、配列は<code>int</code>型であることがわかるというわけです。</p>
<p>そして、このような構造体は実はキンシャケ探しイベントのアタリ位置を求める際に使われていました。それがまさに<code>sead::PtrArrayImpl</code>クラスで、これはスプラトゥーンにおける標準的な配列クラスです。</p>
<p>配列ということはわかったのですが、ここでそれは一度置いておいて、それ以外のコードを見やすくするところからはじめました。</p>
<p>最後の<code>if</code>文は要らなさそうだったので削除し、また途中の<code>v75 &gt;= 0x17</code>は IPSwitch で該当する命令を無効化しても湧き順に全く変化が起きなかったため（おそらくオオモノ数が上限に達した場合にのみ使われる）、同様に削除しました。</p>
<p>ここまでくると割とスッキリしてなんだかわかりそうな気がしてきます。</p>
<h3 id="実機での検証" tabindex="-1"><a class="header-anchor" href="#実機での検証" aria-hidden="true">#</a> 実機での検証</h3>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code>sead<span class="token double-colon punctuation">::</span>Random rnd<span class="token punctuation">;</span>
rnd<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>sead<span class="token double-colon punctuation">::</span><span class="token class-name">Randon</span><span class="token double-colon punctuation">::</span><span class="token function">getU32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

sead<span class="token double-colon punctuation">::</span>PtrArratImpl mEnemyArray <span class="token operator">=</span> Game<span class="token double-colon punctuation">::</span>Coop<span class="token double-colon punctuation">::</span><span class="token class-name">EnemyRareType</span><span class="token double-colon punctuation">::</span><span class="token function">getArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
u32 mLength <span class="token operator">=</span> mEnemyArray<span class="token punctuation">.</span>mLength<span class="token punctuation">;</span>
u32 mWeight <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
u32 mProb <span class="token operator">=</span> <span class="token number">0</span>
u32 mTmpId <span class="token operator">=</span> <span class="token number">0</span>
u32 mRareId <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">do</span> <span class="token punctuation">{</span>
  sead<span class="token double-colon punctuation">::</span>PtrArrayImpl mRareType <span class="token operator">=</span> Game<span class="token double-colon punctuation">::</span>Coop<span class="token double-colon punctuation">::</span><span class="token class-name">EnemyRareRype</span><span class="token double-colon punctuation">::</span><span class="token function">getArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>mRareType<span class="token operator">-></span>mLength <span class="token operator">&lt;=</span> mProb<span class="token punctuation">)</span>
    mTmpId <span class="token operator">=</span> mRareType<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token keyword">else</span>
    mTmpId <span class="token operator">=</span> mRareType<span class="token punctuation">[</span>mProb<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token operator">++</span>mWeight<span class="token punctuation">;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>rnd<span class="token punctuation">.</span><span class="token function">getU32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> mWeight <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    mRareId <span class="token operator">=</span> mTmpId<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>mProb <span class="token operator">&lt;=</span> <span class="token number">6</span><span class="token punctuation">)</span>
    <span class="token operator">++</span>mProb<span class="token punctuation">;</span>
  <span class="token keyword">else</span>
    mProb <span class="token operator">=</span> <span class="token number">6</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>mProb <span class="token operator">!=</span> mLength<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>次に先程推定した<code>sead::PtrArrayImpl</code>のコードを入れ、見やすくしたものが上になります。</p>
<p>ここで問題となるのは While 文の終了条件で、これは<code>mEnemyArray.mLength</code>の長さに依存していることがわかります。この値は果たして定数なのか、それとも変数なのかという問題です。</p>
<p>また、同様に<code>mRareType</code>も同じことが言えます。わざわざ二度呼び出しているということは呼び出すたびに値が変わるような関数なのでしょうか？</p>
<h3 id="mtmpid-の値を固定する" tabindex="-1"><a class="header-anchor" href="#mtmpid-の値を固定する" aria-hidden="true">#</a> mTmpId の値を固定する</h3>
<p>さて、ここで気になるのは一度仮のオオモノ ID として mTmpId を計算し、それがある条件を満たしたときのみ mRareId に代入して最終的なオオモノ ID として使われているということです。</p>
<p>そこで IPSwitch を使い、この mTmpId を常に mRareType[0[を返すようにしました。こうすることで<code>EnemyRareType</code>の配列の 0 番目に何が入っているのかがわかるというわけです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Always load mRateType 0 [tkgling]
@disabled
00546718 48818A9A
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>すると、全てのオオモノがバクダン化しました。よって、配列の先頭はバクダンを示す値が入っていることがわかりました。</p>
<p>そしてぼくは先頭の要素がバクダンになるような配列を既に知っていました。よくイカリングを見ている方ならわかると思うのですが、イカリングにおけるオオモノシャケの並び順なのです。</p>
<p>もしもイカリングにおける配列と、プログラムにおける配列が同じであれば、<code>mRareType = {&quot;Steelhead&quot;, &quot;Flyfish&quot;, &quot;Scrapper&quot;, &quot;Steel Eel&quot;, &quot;Tower&quot;, &quot;Maws&quot;, &quot;Drizzler&quot;}</code>となり、二番目のオオモノはカタパッドになるはずです。</p>
<p>それを検証するため、次は While の継続条件である<code>mLength</code>を弄ることにしました。これは結局配列を先頭から見ていき、「バクダン出現の条件を満たすか」「カタパッド出現の条件を満たすか」という風にオオモノ出現チェックを行うアルゴリズムです。</p>
<p>つまり、このチェックは配列の長さである七回実行され、七回あるために全てのオオモノの出現チェックがされるわけです。よって、ここのチェック回数を二回にしてしまえば「バクダンかカタパッド」の出現チェックしか行われないことになり、出現するオオモノがバクダンとカタパッドだけになるはずです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change mLength to 2 [tkgling]
@disabled
005466E4 56008052
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>そして、このパッチを当てたところ予想通り出現するオオモノがバクダンとカタパッドだけになりました！断定するには早いですが、オオモノの配列はイカリングのものと同じと考えて良さそうです。</p>
<h3 id="復元した-c-コード" tabindex="-1"><a class="header-anchor" href="#復元した-c-コード" aria-hidden="true">#</a> 復元した C++コード</h3>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code><span class="token keyword">for</span><span class="token punctuation">(</span>u32 mProb <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> mProb <span class="token operator">&lt;</span> mRareType<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>mProb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>mRareType<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> mProb<span class="token punctuation">)</span>
    mTmpId <span class="token operator">=</span> mRareType<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span>
    mTmpId <span class="token operator">=</span> mRareType<span class="token punctuation">[</span>mProb<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>rnd<span class="token punctuation">.</span><span class="token function">getU32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>mProb <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span>
    mRareId <span class="token operator">=</span> mTmpId<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>そして while 文を for 文に変換しておしまいです。</p>
<p>実はここにいたるまでに乱数生成器の初期化に定数をいれてどんなオオモノが出力されるか検証していました。その結果が画像の上の方のやつで 0 と 1 ならテッパン、2 ならタワーという感じです。</p>
<p>問題はこれが正しいかどうかをチェックすることです。要は、コードが合っていたとしても考えがどこかで間違っていたら正しいコードを書いても意味がないからです。オオモノ湧きアルゴリズムが正しいかどうか試すためには、このアルゴリズムに対して適当な初期シードを与え（先程調べた 0 や 1 が望ましい）、実機と同じ予測ができるかを確かめる必要があります。</p>
<p>いちいちコンパイルするのがめんどくさかったので、これを Javascript に移植し、動作テストをしてみることにしました。</p>
<p>Javascript はポインタ・構造体・32 ビット以上のビットシフトが使えないことを除けば基本的には C++と互換性があるのでほとんど同じようにコードを書くことができました。</p>
<p>そして、このコードを実行させたところ<code>mInitialSeed</code>を与えることで正しく実機と同じオオモノ予測をすることができました！</p>
<h2 id="湧き方向とオオモノ出現" tabindex="-1"><a class="header-anchor" href="#湧き方向とオオモノ出現" aria-hidden="true">#</a> 湧き方向とオオモノ出現</h2>
<p>ここまでできれば根幹となる計算アルゴリズムは正しいので、次は各 WAVE の乱数消費回数の文だけループさせてやればいいことになります。</p>
<p>WAVE1 ですとオオモノの湧きは 20 回で、湧き方向変化が 8 回（変化が 8 回ということは 9 回消費されている）なので $20 + 8 + 1$ 回乱数が消費されることになります。</p>
<p>Starlight で乱数生成器の中身を覗くとゲーム開始時に一度乱数が消費されている事がわかっていたため、次のような感じで乱数が消費されていき、初期化も合わせて 30 回呼び出されているのではないかと予想できます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">回数</th>
<th style="text-align:center">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">初期化？</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">一回目湧き方向計算</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">一匹目オオモノ出現</td>
</tr>
</tbody>
</table>
<h3 id="starlight-で湧き方向変更回数を調べる" tabindex="-1"><a class="header-anchor" href="#starlight-で湧き方向変更回数を調べる" aria-hidden="true">#</a> Starlight で湧き方向変更回数を調べる</h3>
<p>そこで Starlight を使い、乱数生成器の内部状態が変わった回数をカウントするコードを書きました。</p>
<p>すると 29 回乱数が消費されなければいけないにも関わらず何故か 25 回しかカウントされませんでした。これは何故でしょうか？</p>
<h3 id="乱数消費はクロックレベルのオーダー" tabindex="-1"><a class="header-anchor" href="#乱数消費はクロックレベルのオーダー" aria-hidden="true">#</a> 乱数消費はクロックレベルのオーダー</h3>
<p>これは当然のことで、Starlight は「常に」乱数生成器の内部状態を見れているわけではありません。チェックする間隔というものが当然存在します。そして、その頻度に比べて乱数消費の間隔があまりにも速すぎるのです。</p>
<p>つまり、本当は二回消費されているにも関わらず、あっという間に二回消費されてしまうためにその変更を検知できず、一回とカウントしてしまうところに問題があったわけです。</p>
<p>しかし、以前の研究では Starlight はオオモノが同時に二体出現した場合でも正しく乱数生成をチェックできていました。速すぎてチェックできない状況というのはどういうケースでしょうか？</p>
<p>それは湧き方向変化とオオモノ出現が同時に行われるケースです。</p>
<h3 id="乱数消費表" tabindex="-1"><a class="header-anchor" href="#乱数消費表" aria-hidden="true">#</a> 乱数消費表</h3>
<p>書くのがめんどくさいので WAVE1 のものだけ載せておきます。詳しく知りたい人はソースコードを読んでください。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">内容</th>
<th style="text-align:center">秒数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">初期化</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">オオモノ出現（1）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">オオモノ出現（2）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">88 秒</td>
</tr>
<tr>
<td style="text-align:center">5</td>
<td style="text-align:center">オオモノ出現（3）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">6</td>
<td style="text-align:center">オオモノ出現（4）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">7</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">78 秒</td>
</tr>
<tr>
<td style="text-align:center">8</td>
<td style="text-align:center">オオモノ出現（5）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">9</td>
<td style="text-align:center">オオモノ出現（6）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">10</td>
<td style="text-align:center">オオモノ出現（7）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">11</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">68 秒</td>
</tr>
<tr>
<td style="text-align:center">12</td>
<td style="text-align:center">オオモノ出現（8）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">13</td>
<td style="text-align:center">オオモノ出現（9）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">14</td>
<td style="text-align:center">オオモノ出現（10）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">15</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">58 秒</td>
</tr>
<tr>
<td style="text-align:center">16</td>
<td style="text-align:center">オオモノ出現（11）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">17</td>
<td style="text-align:center">オオモノ出現（12）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">18</td>
<td style="text-align:center">オオモノ出現（13）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">19</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">48 秒</td>
</tr>
<tr>
<td style="text-align:center">20</td>
<td style="text-align:center">オオモノ出現（14）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">21</td>
<td style="text-align:center">オオモノ出現（15）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">22</td>
<td style="text-align:center">オオモノ出現（16）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">23</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">38 秒</td>
</tr>
<tr>
<td style="text-align:center">24</td>
<td style="text-align:center">オオモノ出現（17）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">25</td>
<td style="text-align:center">オオモノ出現（18）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">26</td>
<td style="text-align:center">オオモノ出現（19）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">27</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">28 秒</td>
</tr>
<tr>
<td style="text-align:center">28</td>
<td style="text-align:center">オオモノ出現（20）</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">29</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">18 秒</td>
</tr>
<tr>
<td style="text-align:center">30</td>
<td style="text-align:center">湧き方向</td>
<td style="text-align:center">8 秒</td>
</tr>
</tbody>
</table>
<p>最初、湧き方向変化は 8 回かと思っていたのですが、乱数は 10 回消費されていることがわかりました。まあひょっとしたら乱数が消費されているだけで湧き方向は変わっていないのかもしれませんが。</p>
<h2 id="今後の展望" tabindex="-1"><a class="header-anchor" href="#今後の展望" aria-hidden="true">#</a> 今後の展望</h2>
<p>結局これをやって何がしたかったというと、サーモンランの WAVE として取りうるものの中から、最も難しい（と思われる）WAVE をプレイしたかったんですよね。</p>
<p>いや、本当にそれだけです。Ocean Calc とかぶっちゃけどうでもいいです。</p>
<p>問題は「難しい」をどうやって評価するかなのですが、まあざっくりいえばカタパとコウモリばっかり湧けばかなりきついと思います。通常潮で遠くのタワーとカタパばっかりっていうのもまあ難しそうな気はするのですが、回収が難しいというよりも処理が難しいという方に重点を起きたい感じはします。</p>
<p><a href="https://twitter.com/asicssix" target="_blank" rel="noopener noreferrer">@asicssix<OutboundLink/></a>氏がサーモンランの統計データから各オオモノの金イクラ納品期待値を計算してくれているので、それを使って期待される納品数が最低の WAVE とかを探してみるのも面白いかもしれませんね。</p>
<p>記事は以上。</p>
</template>
