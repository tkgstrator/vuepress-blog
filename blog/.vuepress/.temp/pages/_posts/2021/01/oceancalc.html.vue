<template><h2 id="wave-内容とは" tabindex="-1"><a class="header-anchor" href="#wave-内容とは" aria-hidden="true">#</a> WAVE 内容とは</h2>
<p>サーモンランでは少なくとも以下の九つの内容がバイト開始時に決定されています。</p>
<ol>
<li>各 WAVE の潮位</li>
<li>各 WAVE のイベント内容</li>
<li>各 WAVE のシャケの湧き方向</li>
<li>各 WAVE の出現するオオモノシャケの種類</li>
<li>キンシャケ探しイベントでのアタリ位置</li>
<li>霧イベントでのキンシャケのドロップ数</li>
<li>ラッシュイベントでの最初にヒカリバエがつくプレイヤー</li>
<li>ランダム時に支給されるブキ</li>
<li>支給されるスペシャルウェポン</li>
</ol>
<p>これらの内容を WAVE 中のプレイヤーの行動などで変化させることは絶対にできません。</p>
<h3 id="サーモンラン通信プロトコル" tabindex="-1"><a class="header-anchor" href="#サーモンラン通信プロトコル" aria-hidden="true">#</a> サーモンラン通信プロトコル</h3>
<p>サーモンランはバイト開始時に<code>Cnet::PacketSeqEventCoopSetting::PacketSeqEventCoopSetting()</code>という関数が呼び出され、ホストが接続しているクライアントに対して設定されたパラメータを送信します。</p>
<p>送信される内容は以下の通り。</p>
<ul>
<li>初期シード（サーモンランのゲームの全てを司る値）</li>
<li>インクの色（イカちゃんチームの色のみ変更可能）</li>
<li>BGM の種類（通常用とランダム用があるみたい）</li>
<li>遊ぶステージ（ナワバリのステージなどを選ぶとクラッシュする）</li>
</ul>
<p>ここで大事になるのが初期シードであり、これが先程述べた九つの WAVE 内容全てを決定する値になります。</p>
<h2 id="各パラメータの計算アルゴリズム" tabindex="-1"><a class="header-anchor" href="#各パラメータの計算アルゴリズム" aria-hidden="true">#</a> 各パラメータの計算アルゴリズム</h2>
<p>アルゴリズム自体は C++、Python、Javascript などに移植しているのですが、今回は最もわかりやすいと思われる Python のコードを紹介します。</p>
<h3 id="初期シードから擬似乱数生成" tabindex="-1"><a class="header-anchor" href="#初期シードから擬似乱数生成" aria-hidden="true">#</a> 初期シードから擬似乱数生成</h3>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>乱数生成器は初期シードで初期化され、その後<code>getU32()</code>を呼び出すことで乱数を生成します。</p>
<p>ここで大事なことは、初期シードさえわかればその後生成される全ての乱数は予測可能だということです。</p>
<h3 id="潮位・イベント決定アルゴリズム" tabindex="-1"><a class="header-anchor" href="#潮位・イベント決定アルゴリズム" aria-hidden="true">#</a> 潮位・イベント決定アルゴリズム</h3>
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
            <span class="token builtin">sum</span> <span class="token operator">+=</span> mEventProb<span class="token punctuation">[</span>event<span class="token punctuation">]</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token builtin">sum</span> <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> mEventProb<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">=</span> event
        <span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">for</span> tide <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> tide <span class="token operator">==</span> <span class="token number">0</span> <span class="token keyword">and</span> <span class="token number">1</span> <span class="token operator">&lt;=</span> self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token keyword">and</span> self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token number">3</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            <span class="token builtin">sum</span> <span class="token operator">+=</span> mTideProb<span class="token punctuation">[</span>tide<span class="token punctuation">]</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token builtin">sum</span> <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> mTideProb<span class="token punctuation">[</span>tide<span class="token punctuation">]</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>mTide<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">if</span> self<span class="token punctuation">.</span>mEvent<span class="token punctuation">[</span>wave<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">6</span> <span class="token keyword">else</span> tide
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>アルゴリズムではまず最初にイベントを決定します。</p>
<p>WAVE1 のイベントは完全にランダムに選ばれますが、WAVE2 以降は「一つ前の WAVE と同じイベントではない」「一つ前の WAVE はイベントなしではない」という条件が付きます。</p>
<p>なので、連続して同じイベントが発生することは絶対にありません。</p>
<p>イベントが決まったあとに潮位を決定しますが、初期状態は通常潮位に設定されています。</p>
<p>ここで潮位を計算するのですが、潮位が干潮になった場合「イベントがキンシャケ探しかグリルかラッシュ」ならその計算をなかったことにします。そして、ドスコイ大量発生の場合はどんな潮位であっても強制的に干潮に変化します。</p>
<p>まあこれはコードを読んだ方がわかりやすいですね。</p>
<h3 id="各-wave-シード生成アルゴリズム" tabindex="-1"><a class="header-anchor" href="#各-wave-シード生成アルゴリズム" aria-hidden="true">#</a> 各 WAVE シード生成アルゴリズム</h3>
<p>サーモンランには最も基本となる初期シードの他に、WAVE ごとの細かいパラメータを決定する WAVE シードがあります。WAVE は三つ存在するので、WAVE シードは三つあるわけです。</p>
<p>そして、大事なことは全ての WAVE シードは初期シードから生成されるということです。</p>
<p>なので、初期シードが決まった時点で WAVE シードも予測可能になります。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">setWaveMgr</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>init<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mGameSeed<span class="token punctuation">)</span>
self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span>
self<span class="token punctuation">.</span>mWaveMgr <span class="token operator">=</span> <span class="token punctuation">[</span>
WaveMgr<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>mGameSeed<span class="token punctuation">)</span><span class="token punctuation">,</span>
WaveMgr<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
WaveMgr<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>興味深いのは WAVE1 の WAVE シードは初期シードであるということです。</p>
<p>そして WAVE2 は初期シードから二回目に生成された乱数が使われます。何故一回、乱数をむだうちしているのかはわかりません。</p>
<h3 id="キンシャケ探しアタリ位置計算アルゴリズム" tabindex="-1"><a class="header-anchor" href="#キンシャケ探しアタリ位置計算アルゴリズム" aria-hidden="true">#</a> キンシャケ探しアタリ位置計算アルゴリズム</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">getGeyserPos</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>init<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mWaveSeed<span class="token punctuation">)</span>
mReuse <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">]</span>
mPos <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"D"</span><span class="token punctuation">,</span> <span class="token string">"E"</span><span class="token punctuation">,</span> <span class="token string">"F"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">]</span>
mSucc <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">for</span> idx <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
<span class="token keyword">for</span> sel <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>mPos<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
index <span class="token operator">=</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>sel <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">0x20</span>
mPos<span class="token punctuation">[</span>sel<span class="token punctuation">]</span><span class="token punctuation">,</span> mPos<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> mPos<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> mPos<span class="token punctuation">[</span>sel<span class="token punctuation">]</span>
mReuse<span class="token punctuation">[</span>sel<span class="token punctuation">]</span><span class="token punctuation">,</span> mReuse<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> mReuse<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> mReuse<span class="token punctuation">[</span>sel<span class="token punctuation">]</span>
mSucc <span class="token operator">+=</span> mPos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">if</span> mReuse<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">return</span> mSucc
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>キンシャケ探しのアタリ位置を計算するためには「キンシャケ探しのアタリ位置候補」と「乱数消費フラグ」の二つが必要になります。</p>
<p>今回は朽ちた方舟ポラリスの満潮時のアタリ位置を計算するコードをご紹介します。</p>
<p>乱数消費フラグがなんのためにあるかと言うと、アタリ位置に対してゴール候補が二箇所以上ある場合はどちらのゴールに向かうかを計算するために一回余計に乱数が消費されるためです。</p>
<p>満潮ポラリスは常にゴール候補が一つしかないので、全てのアタリ位置に対して乱数消費フラグは False になっています。</p>
<h3 id="湧き方向計算アルゴリズム" tabindex="-1"><a class="header-anchor" href="#湧き方向計算アルゴリズム" aria-hidden="true">#</a> 湧き方向計算アルゴリズム</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">getEnemyAppearId</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> previousId<span class="token punctuation">)</span><span class="token punctuation">:</span>
mArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
mIndex <span class="token operator">=</span> <span class="token number">0</span>
w6 <span class="token operator">=</span> <span class="token number">3</span>
x6 <span class="token operator">=</span> <span class="token number">3</span>
v5 <span class="token operator">=</span> previousId
w7 <span class="token operator">=</span> mArray
<span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token punctuation">(</span><span class="token builtin">id</span> <span class="token operator">&amp;</span> <span class="token number">0x80000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
w8 <span class="token operator">=</span> w6 <span class="token operator">-</span> <span class="token number">1</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
v17 <span class="token operator">=</span> w8
w9 <span class="token operator">=</span> w7<span class="token punctuation">[</span>mIndex<span class="token punctuation">]</span>
<span class="token keyword">if</span> w9 <span class="token operator">&lt;</span> <span class="token builtin">id</span><span class="token punctuation">:</span>
<span class="token keyword">break</span>
w6 <span class="token operator">-=</span> w9 <span class="token operator">==</span> <span class="token builtin">id</span>
<span class="token keyword">if</span> w9 <span class="token operator">==</span> <span class="token builtin">id</span><span class="token punctuation">:</span>
<span class="token keyword">break</span>
w8 <span class="token operator">=</span> v17 <span class="token operator">-</span> <span class="token number">1</span>
mIndex <span class="token operator">+=</span> <span class="token number">1</span>
<span class="token keyword">if</span> <span class="token keyword">not</span> v17<span class="token punctuation">:</span>
<span class="token keyword">break</span>

    mIndex <span class="token operator">=</span> <span class="token number">0</span>
    x7 <span class="token operator">=</span> mArray
    x8 <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> w6 <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span>

    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        x9 <span class="token operator">=</span> x7<span class="token punctuation">[</span>mIndex<span class="token punctuation">]</span>
        x10 <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">if</span> x8 <span class="token operator">==</span> <span class="token number">0</span> <span class="token keyword">else</span> x8 <span class="token operator">-</span> <span class="token number">1</span>
        x11 <span class="token operator">=</span> x9 <span class="token keyword">if</span> x8 <span class="token operator">==</span> <span class="token number">0</span> <span class="token keyword">else</span> v5
        x12 <span class="token operator">=</span> <span class="token number">5</span> <span class="token keyword">if</span> x9 <span class="token operator">==</span> v5 <span class="token keyword">else</span> x8 <span class="token operator">==</span> <span class="token number">0</span>
        <span class="token keyword">if</span> x9 <span class="token operator">!=</span> v5<span class="token punctuation">:</span>
            x8 <span class="token operator">=</span> <span class="token number">0xFFFFFFFF</span> <span class="token operator">&amp;</span> x10
            <span class="token builtin">id</span> <span class="token operator">=</span> x11
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x12 <span class="token operator">&amp;</span> <span class="token number">7</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">5</span> <span class="token keyword">and</span> <span class="token punctuation">(</span>x12 <span class="token operator">&amp;</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>
        x6 <span class="token operator">-=</span> <span class="token number">1</span>
        mIndex <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> x6<span class="token punctuation">:</span>
            <span class="token keyword">return</span> v5
    <span class="token keyword">return</span> <span class="token builtin">id</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>Python ではポインタが使えないため、アセンブラから上手く復元することができませんでした。</p>
<p>また、これらのコードは最適化できていないため読んでも意味のわからないものになっています。</p>
<p>ちなみに、previousId は一つ前の湧き方向を意味します。何故かはわからないのですが、previousId が 1 だと、この関数は殆どの場合（絶対かもしれない）1 以外を返します。</p>
<h3 id="出現オオモノ計算アルゴリズム" tabindex="-1"><a class="header-anchor" href="#出現オオモノ計算アルゴリズム" aria-hidden="true">#</a> 出現オオモノ計算アルゴリズム</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">getEnemyId</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
mRnd <span class="token operator">=</span> NSRandom<span class="token punctuation">.</span>NSRandom<span class="token punctuation">(</span><span class="token punctuation">)</span>
mRnd<span class="token punctuation">.</span>init<span class="token punctuation">(</span>self<span class="token punctuation">.</span>rnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    mRareId <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> mProb <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token punctuation">(</span>mRnd<span class="token punctuation">.</span>getU32<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>mProb <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">0x20</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            mRareId <span class="token operator">=</span> mProb
    <span class="token keyword">return</span> mRareId
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>出現するオオモノは湧き方向に比べて簡単です。</p>
<p>オオモノが出現することが呼び出されるたびに新たに乱数生成器を乱数で初期化し、生成した乱数から計算します。計算方法も単純で、7 で割ったあまりによって出現するオオモノが決まるだけです。</p>
<h2 id="未解決アルゴリズム" tabindex="-1"><a class="header-anchor" href="#未解決アルゴリズム" aria-hidden="true">#</a> 未解決アルゴリズム</h2>
<ol>
<li>霧イベントでのキンシャケのドロップ数</li>
<li>ラッシュイベントでの最初にヒカリバエがつくプレイヤー</li>
<li>ランダム時に支給されるブキ</li>
<li>支給されるスペシャルウェポン</li>
</ol>
<p>この四つに関しては、未だにアルゴリズムが解析できていないため初期シードから予測することができません。</p>
<p>霧イベントについては、どの関数がドロップ数を決めているかまでは分かっているのですが「どの乱数生成器が使われているか」がわかっていないため、予測することができていません。</p>
<p>まあこれが一番解析しやすそうな気はするので、誰か頼んだ。</p>
<h2 id="ocean-calc" tabindex="-1"><a class="header-anchor" href="#ocean-calc" aria-hidden="true">#</a> Ocean Calc</h2>
<p><a href="https://salmonrun-records.netlify.app/ocean/" target="_blank" rel="noopener noreferrer">LanPlay Records<OutboundLink/></a></p>
<p>で、今まで紹介した全アルゴリズムを搭載した WAVE 内容予測アプリがこの Ocean Calc です。</p>
<p>計算アルゴリズムはオンラインプレイでも LanPlay でも同じなので、一度遊んだシードを特定することができれば、それ以後の全ての湧き方向やイベント内容を先読みすることができます。</p>
<p>@<a href="https://www.youtube.com/watch?v=uX9lMgpcrlA" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>例えば、ポラリス満潮キンシャケ探しの現在の世界記録である 122 納品を達成したときのシードは<code>0xFABAD087</code>であることがわかっています。</p>
<p><a href="https://salmonrun-records.netlify.app/ocean/?seed=0xFABAD087" target="_blank" rel="noopener noreferrer">LanPlay Records<OutboundLink/></a></p>
<p>上のリンクで実際にどんな WAVE 内容なのかがチェックできるので、ズレていないことを確かめてみてください。</p>
<p>これを利用すればキンシャケ探しで一発でアタリ位置を見つけることが可能ですし、稼げない WAVE だということが始める前からわかるわけです。</p>
<h2 id="seedhack-とは" tabindex="-1"><a class="header-anchor" href="#seedhack-とは" aria-hidden="true">#</a> SeedHack とは</h2>
<p>ぼくが勝手につくった言葉で、ホストが送信するシードをパッチを使って強制的に変更することで任意の WAVE を呼び出すことができるハックのことです。</p>
<p>イカッチャにおいてもやりたいイベントの組み合わせの WAVE を引くのはとてつもなく低い確率になるので、初期シードを好きなものにすることで確実に毎回同じ WAVE が来るようにするわけです。</p>
<p>SeedHack 自体は初期シードを変更しているだけですので、言ってしまえば乱数調整と同じでそれ自体に納品数を増やしたりパラメータを強化したりする効果は全くありません。好きな WAVE を呼び寄せることができると言うだけです。</p>
<p>で、その呼び寄せたい WAVE はキンシャケ探しのアタリ位置なども事前に計算しているので、一回も外すことなくアタリを当てられるというだけです。</p>
<p>@<a href="https://www.youtube.com/watch?v=0P9IlQ-9ciM" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>自分がアップロードしている多くの LanPlay の動画はこのハックを使って理想の WAVE を呼び寄せています。でないと「いい WAVE」がくるのを待って水没を繰り返すのが時間の無駄だからです。</p>
<p>結論から言えば、SeedHack 自体はパッチを使用してはいるものの完全なチートとは言えません。時間をかければ誰でも同じ状況が再現できます。</p>
<p>ちなみに 404 納品を達成したシードは以下のリンクから見れます。</p>
<p><a href="https://salmonrun-records.netlify.app/ocean/?seed=0xFABAD087" target="_blank" rel="noopener noreferrer">LanPlay Records<OutboundLink/></a></p>
<p>記事は以上、勝ったなガハハ。</p>
</template>
