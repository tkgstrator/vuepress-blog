<template><h2 id="スプラトゥーンの乱数" tabindex="-1"><a class="header-anchor" href="#スプラトゥーンの乱数" aria-hidden="true">#</a> スプラトゥーンの乱数</h2>
<p>スプラトゥーンの乱数生成器は以下のような Python コードで表現できます。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">NSRandom</span><span class="token punctuation">:</span>
    mSeed1 <span class="token operator">=</span> <span class="token number">0x00000000</span>
    mSeed2 <span class="token operator">=</span> <span class="token number">0x00000000</span>
    mSeed3 <span class="token operator">=</span> <span class="token number">0x00000000</span>
    mSeed4 <span class="token operator">=</span> <span class="token number">0x00000000</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">def</span> <span class="token function">init</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> seed<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>mSeed1 <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">0x6C078965</span> <span class="token operator">*</span> <span class="token punctuation">(</span>seed <span class="token operator">^</span> <span class="token punctuation">(</span>seed <span class="token operator">>></span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>mSeed2 <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">0x6C078965</span> <span class="token operator">*</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed1 <span class="token operator">^</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed1 <span class="token operator">>></span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>mSeed3 <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">0x6C078965</span> <span class="token operator">*</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed2 <span class="token operator">^</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed2 <span class="token operator">>></span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>mSeed4 <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">0x6C078965</span> <span class="token operator">*</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed3 <span class="token operator">^</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed3 <span class="token operator">>></span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">getU32</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        n <span class="token operator">=</span> self<span class="token punctuation">.</span>mSeed1 <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> self<span class="token punctuation">.</span>mSeed1 <span class="token operator">&lt;&lt;</span> <span class="token number">11</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>mSeed1 <span class="token operator">=</span> self<span class="token punctuation">.</span>mSeed2
        self<span class="token punctuation">.</span>mSeed2 <span class="token operator">=</span> self<span class="token punctuation">.</span>mSeed3
        self<span class="token punctuation">.</span>mSeed3 <span class="token operator">=</span> self<span class="token punctuation">.</span>mSeed4
        self<span class="token punctuation">.</span>mSeed4 <span class="token operator">=</span> <span class="token punctuation">(</span>n <span class="token operator">^</span> <span class="token punctuation">(</span>n <span class="token operator">>></span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">^</span> self<span class="token punctuation">.</span>mSeed4 <span class="token operator">^</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mSeed4 <span class="token operator">>></span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> self<span class="token punctuation">.</span>mSeed4
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>コードを見ると Xorshift に近い感じがするのですが、ひょっとしたら独自の乱数生成器なのかもしれません。排他的論理和とビットシフトしか使わないので非常に高速に乱数を生成できるのが強みです。</p>
<p>今回はこの乱数が主役となります。</p>
<h2 id="乱数に偏りがありそう" tabindex="-1"><a class="header-anchor" href="#乱数に偏りがありそう" aria-hidden="true">#</a> 乱数に偏りがありそう</h2>
<p>Ocean Calc によって初期シードからイベント内容などを先読みできるようになり、いろいろと理想の WAVE を探す中で乱数による偏りがあるのではないかという予想がでてきました。</p>
<p>というのも、例えば満潮ラッシュで常に湧き方向が同じであるような WAVE を探すと WAVE2 か WAVE3 にしか存在しなかったり、満潮キンシャケ探しで同じ位置がアタリになりつづけるような WAVE も WAVE2 や WAVE3 にしか存在しなかったためです。</p>
<p>決め手となったのは WAVE1 のラッシュで初手の湧き方向が 1 であるシードがある程度調べても一つも見つからなかったことでした。スプラトゥーンの疑似乱数生成器に欠陥があると思われるのですが、一体どういう理由からこのような差が生じているのかを調べることにしました。</p>
<h3 id="wave-シードの実装ミス" tabindex="-1"><a class="header-anchor" href="#wave-シードの実装ミス" aria-hidden="true">#</a> WAVE シードの実装ミス？</h3>
<p>まず最初に初期シードから各 WAVE のイベント情報を決めるときのアルゴリズムと、各 WAVE の内容を決定する WAVE シードの選び方に問題があるのではないかと考えました。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">getWaveInfo</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    mEventProb <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
    mTideProb <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
    self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>init<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mGameSeed<span class="token punctuation">)</span>

    <span class="token keyword">for</span> wave <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">for</span> event <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>
                <span class="token punctuation">(</span>wave <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">and</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">and</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> event<span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            <span class="token builtin">sum</span> <span class="token operator">+=</span> mEventProb<span class="token punctuation">[</span>event<span class="token punctuation">[</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token builtin">sum</span> <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> mEventProb<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">=</span> event
        <span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">for</span> tide <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> tide <span class="token operator">==</span> <span class="token number">0</span> <span class="token keyword">and</span> <span class="token number">1</span> <span class="token operator">&lt;=</span> self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token keyword">and</span> self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token number">3</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            <span class="token builtin">sum</span> <span class="token operator">+=</span> mTideProb<span class="token punctuation">[</span>tide<span class="token punctuation">]</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token builtin">sum</span> <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> mTideProb<span class="token punctuation">[</span>tide<span class="token punctuation">]</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>mTide<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">if</span> self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">6</span> <span class="token keyword">else</span> tide
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>これは Python コードですが、WAVE の潮位やイベントを決める際には初期シードである mGameSeed を使って乱数生成器を初期化しています。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">setWaveMgr</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>init<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mGameSeed<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>mWaveMgr <span class="token operator">=</span> <span class="token punctuation">[</span>
        WaveMgr<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>mGameSeed<span class="token punctuation">)</span><span class="token punctuation">,</span>
        WaveMgr<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        WaveMgr<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>そして、WAVE でのオオモノシャケの出現などを決定する WAVE シードは初期シードから計算されるのですが、何故か WAVE1 の WAVE シードには初期シードが使われてしまっています。そして、意味もなく（全く何にも使われていない）一回無駄に乱数が生成されることがわかっています。</p>
<p>これは確認のしようがない以上推測に委ねるしかないのですが、本来は以下のように三回ちゃんと初期シードから生成された乱数を WAVE シードにするはずが、任天堂の実装ミスで初期シードを WAVE シードにしてしまったのではないかと考えられるのです。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">setWaveMgr</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>init<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mGameSeed<span class="token punctuation">)</span>
    self<span class="token punctuation">.</span>mWaveMgr <span class="token operator">=</span> <span class="token punctuation">[</span>
        WaveMgr<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        WaveMgr<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        WaveMgr<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>そしてこの WAVE シードの実装ミスと思われる不可解なコードがラッシュイベントにおけるランダム性に影響を与えることになりました。</p>
<h2 id="wave1-における偏り" tabindex="-1"><a class="header-anchor" href="#wave1-における偏り" aria-hidden="true">#</a> WAVE1 における偏り</h2>
<p>WAVE1 は WAVE シードが初期シードになっているため、一番影響が大きいと思われる WAVE です。</p>
<p>具体的にどんな偏りがあるのかを、イベントごとに調べてみました。</p>
<p>なお、昼イベントとドスコイ大量発生、霧では湧き方向とオオモノの種類にしか影響しないのでここでは考えないことにしました。</p>
<h3 id="ラッシュ" tabindex="-1"><a class="header-anchor" href="#ラッシュ" aria-hidden="true">#</a> ラッシュ</h3>
<p>ラッシュは WAVE1 に発生した場合、何故か初手は 1 湧きになりにくいことが知られていました。1000 万通りくらい調べても初手 1 湧きがないので「ないだろう」という予想だったのですが、実際に調べてみることにした。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">干潮</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">通常</td>
<td style="text-align:center">0.0000%(0 通り)</td>
<td style="text-align:center">52.6085%(70050477 通り)</td>
<td style="text-align:center">47.3914%(63103715 通り)</td>
</tr>
<tr>
<td style="text-align:center">満潮</td>
<td style="text-align:center">0.0000%(0 通り)</td>
<td style="text-align:center">47.3500%(21131287 通り)</td>
<td style="text-align:center">52.6499%(23496525 通り)</td>
</tr>
</tbody>
</table>
<p>というわけで、実際に WAVE1 のラッシュは絶対に初手は 1 湧きではないことが確定しました。</p>
<p>では何故 WAVE1 のラッシュの初手 1 湧きが発生しないのかということになるのですが、これはラッシュのイベント ID が 1 であることが重要になってきている気がします。</p>
<p>というのも、オオモノの湧き方向は 1 湧きが連続しないことは知られているのですが、最初の湧き方向を決める前に一回「ゲーム内では発生しない湧き方向変化」を初期化として行っていることが分かっています。そして、その後に最初のオオモノの湧き方向変化をするのですが、この「ゲーム内では発生しない湧き方向変化」がラッシュの場合では常に 1 になっている可能性があります。</p>
<p>これは実際にアルゴリズム解析をしなければわからないのですが、初期シードは「WAVE1 のイベント ID が 1 となるような乱数」を返したので、同じ初期シードで初期化された「WAVE1 の最初の湧き方向変化」も 1 が返ってきていてもおかしくありません。</p>
<p>少なくとも「アルゴリズム内には WAVE1 のラッシュの場合は初手 1 湧きにしない」といったコードは書かれていないので、これは任天堂の実装ミスの弊害の可能性があります。</p>
<h3 id="グリル" tabindex="-1"><a class="header-anchor" href="#グリル" aria-hidden="true">#</a> グリル</h3>
<p>グリルに関しては初手湧きは正しく 1 湧きが発生しました。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">1 湧き</th>
<th style="text-align:center">2 湧き</th>
<th style="text-align:center">3 湧き</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">干潮</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">通常</td>
<td style="text-align:center">22.2694%(29718747 通り)</td>
<td style="text-align:center">38.8657%(51866811 通り)</td>
<td style="text-align:center">38.8649%(51865710 通り)</td>
</tr>
<tr>
<td style="text-align:center">満潮</td>
<td style="text-align:center">22.2440%(9930800 通り)</td>
<td style="text-align:center">38.8861%(17360628 通り)</td>
<td style="text-align:center">38.8699%(17353391 通り)</td>
</tr>
</tbody>
</table>
<h3 id="キンシャケ探し" tabindex="-1"><a class="header-anchor" href="#キンシャケ探し" aria-hidden="true">#</a> キンシャケ探し</h3>
<p>盛大にバグってしまったのがこのキンシャケ探し。</p>
<p>キンシャケ探しのアタリ位置の決め方なのですが、</p>
<ol>
<li>カンケツセンの数だけループ（ポラリス満潮なら 4 回）</li>
<li>乱数を生成してカンケツセン数による剰余を計算</li>
<li>その剰余をインデックスとする（ポラリス満潮なら 0 ~ 3 のどれかになる）</li>
<li>ループ回数目とインデックス番目のカンケツセンの中身を入れ替える</li>
</ol>
<p>そして、ループが終わった後の 0 番目のカンケツセンの位置がアタリ位置になっています。</p>
<p>文字だけだとわかりにくいので簡単に説明すると、ポラリスの満潮の場合だと、<code>[A, B, C, D]</code>というような初期状態の配列を持っています。配列の中にはカンケツセン数の分だけ文字が入っているというわけです。</p>
<p>で、ゲーム開始前のカウントが 0 になった瞬間に乱数を生成してインデックスを計算します。ここでは仮にインデックスが 3 となったとしましょう。するとアルゴリズムは 3 番目のカンケツセンと 0 番目のカンケツセンの中身を入れ替えます。プログラムでは配列は 0 番目からスタートするので 3 番目である D と 0 番目である A を入れ替えて<code>[D, B, C, A]</code>となります。そして、これを 4 回繰り返します。もしもインデックスが 0 であれば 0 番目と 0 番目の位置を入れ替えるということなので、配列は変化しません。</p>
<p>で、最終的に<code>[C, A, B, D]</code>という配列になったとしましょう。アタリ位置は常に 0 番目なのでこの場合は C の位置のカンケツセンがアタリになります。</p>
<p>そしてここが WAVE シード実装ミスによる最大の弊害なのですが、初回のアタリ位置決定アルゴリズムを実行すると「配列の 0 番目の値は必ず初期配置から変化している」というとんでもないバグが見つかったのです。</p>
<p>絶対に 0 番目の値が初期配置から変化するということは「アタリ位置が必ず初期配置から変わっている」ということを意味しており、これはつまり「WAVE1 にキンシャケ探しがきたら満潮か通常かに関わらず、初手で&quot;絶対にアタリではないカンケツセン&quot;が存在する」と言えるということになります。</p>
<p>全てのステージと潮位においてカンケツセンの初期配置は分かっているので、どこが絶対にアタリにならないかは確実に判断することができます。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>ラッシュの湧き方向バグによる恩恵はそんなにないと思うが、キンシャケ探しによるインデックスバグは結構大きいのではないかと思っている。</p>
<p>更に追加で調べていると初手以外にも大きく偏りがあり、Ocean Calc の補助なしにアタリ位置を高い確率で予測できることがわかりました。つまり、パターンを覚えておけばハズレの開栓数を減らすことができるということです。</p>
<p>これは便利なのではないでしょうか、どうでしょう？</p>
</template>
