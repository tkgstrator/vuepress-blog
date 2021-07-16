<template><h2 id="キンシャケ探しのゴール位置" tabindex="-1"><a class="header-anchor" href="#キンシャケ探しのゴール位置" aria-hidden="true">#</a> キンシャケ探しのゴール位置</h2>
<p>キンシャケ探しのアタリ位置は常に ID 順に初期化されている。</p>
<p>なので、どの ID が実際にどの位置に対応するかはキンシャケ探しを長くプレイして全部のアタリ位置がアタリになるまで繰り返して対応表をつくるだけでよい。</p>
<p>ではゴール位置も同じようにやればいいじゃないかと思うが実はそう簡単ではない。</p>
<h3 id="ゴール位置配列は整列されていない" tabindex="-1"><a class="header-anchor" href="#ゴール位置配列は整列されていない" aria-hidden="true">#</a> ゴール位置配列は整列されていない</h3>
<p>例えばトキシラズいぶし工房の満潮を考えてみよう。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">C</th>
<th style="text-align:center">D</th>
<th style="text-align:center">E</th>
<th style="text-align:center">F</th>
<th style="text-align:center">G</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center">-</td>
<td style="text-align:center">x</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">x</td>
<td style="text-align:center">◯</td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">x</td>
<td style="text-align:center">-</td>
<td style="text-align:center">x</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">x</td>
<td style="text-align:center">-</td>
<td style="text-align:center">x</td>
<td style="text-align:center">x</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">x</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">x</td>
<td style="text-align:center">-</td>
<td style="text-align:center">x</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">x</td>
<td style="text-align:center">x</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<p>この表は C がアタリならゴール位置は E か G というように読む。ゴール候補が E か G のどちらかであるなら配列は、</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code>mGoalPos <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">{</span><span class="token string">'E'</span><span class="token punctuation">,</span> <span class="token string">'G'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'F'</span><span class="token punctuation">,</span> <span class="token string">'G'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'C'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'D'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'C'</span><span class="token punctuation">,</span> <span class="token string">'D'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>このように表現可能であればわかりやすい。が、実際には</p>
<div class="language-cpp ext-cpp line-numbers-mode"><pre v-pre class="language-cpp"><code>mGoalPos <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">{</span><span class="token string">'G'</span><span class="token punctuation">,</span> <span class="token string">'E'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'F'</span><span class="token punctuation">,</span> <span class="token string">'G'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'C'</span><span class="token punctuation">,</span> <span class="token string">'C'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'D'</span><span class="token punctuation">,</span> <span class="token string">'D'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">'D'</span><span class="token punctuation">,</span> <span class="token string">'C'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>というような配列になっている。アタリ位置が D しかないにも関わらず、D、D という配列を持っていることにしないと上手く計算できないのだ。まあこれはプログラムを少し変えれば対応できそうな気もする。</p>
<p>大事なのは「ゴール候補の配列はソートされていない」ということなのだ。</p>
<h2 id="調べてみた" tabindex="-1"><a class="header-anchor" href="#調べてみた" aria-hidden="true">#</a> 調べてみた</h2>
<p>各ステージで各アタリ位置に対するゴール候補全ての組み合わせを試してどうズレているかをチェックすれば良い。</p>
<h3 id="シェケナダム" tabindex="-1"><a class="header-anchor" href="#シェケナダム" aria-hidden="true">#</a> シェケナダム</h3>
<p>とりあえず 30 回ほど開栓を試みた。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>mDest <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"4"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// A</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"4"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// B</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"4"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// C</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// D</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// E</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"4"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// F</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// G</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"4"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// H</span>
  <span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// I</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">アタリ位置</th>
<th style="text-align:center">予測</th>
<th style="text-align:center">実測</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">6</td>
<td style="text-align:center">A</td>
<td style="text-align:center">2</td>
<td style="text-align:center">G</td>
</tr>
<tr>
<td style="text-align:center">27</td>
<td style="text-align:center">A</td>
<td style="text-align:center">3</td>
<td style="text-align:center">D</td>
</tr>
<tr>
<td style="text-align:center">11</td>
<td style="text-align:center">B</td>
<td style="text-align:center">4</td>
<td style="text-align:center">I</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">C</td>
<td style="text-align:center">3</td>
<td style="text-align:center">H</td>
</tr>
<tr>
<td style="text-align:center">12</td>
<td style="text-align:center">C</td>
<td style="text-align:center">3</td>
<td style="text-align:center">H</td>
</tr>
<tr>
<td style="text-align:center">17</td>
<td style="text-align:center">C</td>
<td style="text-align:center">1</td>
<td style="text-align:center">E</td>
</tr>
<tr>
<td style="text-align:center">19</td>
<td style="text-align:center">C</td>
<td style="text-align:center">4</td>
<td style="text-align:center">G</td>
</tr>
<tr>
<td style="text-align:center">24</td>
<td style="text-align:center">C</td>
<td style="text-align:center">2</td>
<td style="text-align:center">D</td>
</tr>
<tr>
<td style="text-align:center">9</td>
<td style="text-align:center">E</td>
<td style="text-align:center">2</td>
<td style="text-align:center">H</td>
</tr>
<tr>
<td style="text-align:center">18</td>
<td style="text-align:center">E</td>
<td style="text-align:center">3</td>
<td style="text-align:center">B</td>
</tr>
<tr>
<td style="text-align:center">20</td>
<td style="text-align:center">E</td>
<td style="text-align:center">3</td>
<td style="text-align:center">B</td>
</tr>
<tr>
<td style="text-align:center">30</td>
<td style="text-align:center">E</td>
<td style="text-align:center">2</td>
<td style="text-align:center">H</td>
</tr>
<tr>
<td style="text-align:center">21</td>
<td style="text-align:center">F</td>
<td style="text-align:center">1</td>
<td style="text-align:center">A</td>
</tr>
<tr>
<td style="text-align:center">29</td>
<td style="text-align:center">F</td>
<td style="text-align:center">2</td>
<td style="text-align:center">G</td>
</tr>
<tr>
<td style="text-align:center">10</td>
<td style="text-align:center">G</td>
<td style="text-align:center">1</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">13</td>
<td style="text-align:center">G</td>
<td style="text-align:center">3</td>
<td style="text-align:center">A</td>
</tr>
<tr>
<td style="text-align:center">14</td>
<td style="text-align:center">G</td>
<td style="text-align:center">1</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">16</td>
<td style="text-align:center">G</td>
<td style="text-align:center">2</td>
<td style="text-align:center">C</td>
</tr>
<tr>
<td style="text-align:center">23</td>
<td style="text-align:center">G</td>
<td style="text-align:center">2</td>
<td style="text-align:center">C</td>
</tr>
<tr>
<td style="text-align:center">25</td>
<td style="text-align:center">G</td>
<td style="text-align:center">1</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">26</td>
<td style="text-align:center">G</td>
<td style="text-align:center">3</td>
<td style="text-align:center">A</td>
</tr>
<tr>
<td style="text-align:center">28</td>
<td style="text-align:center">G</td>
<td style="text-align:center">1</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">H</td>
<td style="text-align:center">4</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">15</td>
<td style="text-align:center">H</td>
<td style="text-align:center">4</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">I</td>
<td style="text-align:center">2</td>
<td style="text-align:center">B</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">I</td>
<td style="text-align:center">1</td>
<td style="text-align:center">H</td>
</tr>
<tr>
<td style="text-align:center">5</td>
<td style="text-align:center">I</td>
<td style="text-align:center">3</td>
<td style="text-align:center">A</td>
</tr>
<tr>
<td style="text-align:center">7</td>
<td style="text-align:center">I</td>
<td style="text-align:center">3</td>
<td style="text-align:center">A</td>
</tr>
<tr>
<td style="text-align:center">8</td>
<td style="text-align:center">I</td>
<td style="text-align:center">1</td>
<td style="text-align:center">H</td>
</tr>
<tr>
<td style="text-align:center">22</td>
<td style="text-align:center">I</td>
<td style="text-align:center">1</td>
<td style="text-align:center">H</td>
</tr>
</tbody>
</table>
<p>あとはこの結果をまとめればよい。</p>
<p>以下のフォームを埋めるだけなのでやり方が分かれば誰でもできる。より正確には数字とアルファベットが全単射になっていることを確認しなければいけないのだが、基本的には（配列の大きさが間違っていなければ）全単射になるはずである。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">1</th>
<th style="text-align:center">2</th>
<th style="text-align:center">3</th>
<th style="text-align:center">4</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">A</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">B</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">H</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">I</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
<p>で、A の 2 は G だとわかるし、3 は D だとわかる。あとは同じように埋めていく。</p>
<p>すると、以下のような表ができる。これ自体はまだデータ数が少ないので全てのマスが埋まっていない。</p>
<p>ただ、E、G、I に関してはゴール候補の配列の大きさが 3 であることがわかっているので 4 に対応するアルファベットは存在しない。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">1</th>
<th style="text-align:center">2</th>
<th style="text-align:center">3</th>
<th style="text-align:center">4</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">A</td>
<td style="text-align:center">?</td>
<td style="text-align:center">G</td>
<td style="text-align:center">D</td>
<td style="text-align:center">?</td>
</tr>
<tr>
<td style="text-align:center">B</td>
<td style="text-align:center">?</td>
<td style="text-align:center">?</td>
<td style="text-align:center">D</td>
<td style="text-align:center">?</td>
</tr>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center">E</td>
<td style="text-align:center">D</td>
<td style="text-align:center">H</td>
<td style="text-align:center">G</td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">?</td>
<td style="text-align:center">?</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center">?</td>
<td style="text-align:center">H</td>
<td style="text-align:center">B</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">A</td>
<td style="text-align:center">G</td>
<td style="text-align:center">?</td>
<td style="text-align:center">?</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">F</td>
<td style="text-align:center">C</td>
<td style="text-align:center">A</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">H</td>
<td style="text-align:center">?</td>
<td style="text-align:center">?</td>
<td style="text-align:center">?</td>
<td style="text-align:center">F</td>
</tr>
<tr>
<td style="text-align:center">I</td>
<td style="text-align:center">H</td>
<td style="text-align:center">B</td>
<td style="text-align:center">A</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>そして、全部の表が埋まらなくても一つを残して他が埋まれば残り一つは容易に求められる。</p>
<p>面倒くさい作業だが、これを繰り返せば全ステージのゴール位置の配列を求めることができる。</p>
<p>ただし、ドンブラコだけは 3.1.0 と 5.4.0 でアタリ位置を求めるアルゴリズムが異なるため、この手法だけで求めることができないことは注意していただきたい。</p>
</template>
