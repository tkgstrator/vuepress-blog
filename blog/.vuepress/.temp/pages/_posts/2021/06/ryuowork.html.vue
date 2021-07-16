<template><h1 id="りゅうおうのおしごと" tabindex="-1"><a class="header-anchor" href="#りゅうおうのおしごと" aria-hidden="true">#</a> りゅうおうのおしごと</h1>
<p>りゅうおうのおしごととは将棋棋士が主人公のライトノベルで、アニメ化もされていたりとそこそこ人気があるようです。</p>
<p>で、なんでこれを遊ぼうかと思ったかというと定跡とかそういうのを勉強したかったのと、パソコンを起動してソフトと対局するのがめんどくさかったからです。</p>
<p>どうせソフトと対局するならそこそこ手加減してくれる女子小学生のほうがいいじゃないですか、はい。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/51yE5PdWDdL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08DRRVQRP/?tag=tkgstrator0f-22" target="_blank">りゅうおうのおしごと! - Switch</a></li>
<li class="price">￥4300</li>
</ul>
</div>
<h2 id="空-銀子戦の必勝手順" tabindex="-1"><a class="header-anchor" href="#空-銀子戦の必勝手順" aria-hidden="true">#</a> 空 銀子戦の必勝手順</h2>
<p>フリー対局モードではシナリオとは関係なく対局ができるのですが、プロ棋士扱いのキャラクターが異常に強いです。</p>
<p>銀星将棋の AI を搭載しているらしく、最強レベルのキャラクターは本当に強いです。膠着模様になるとぼく程度では時間攻めで大体ミスして負けます。</p>
<p>特に銀ちゃんは女流棋士の先生が一手十秒のハンデつきとはいえ、驚異的な粘りから逆転負けを食らうほどの実力だとか。</p>
<p>AI レベル的にはアマチュア高段クラスであるというのはまず間違いないでしょう。</p>
<p>まあ本気を出せばレーティングは 4000 を超えるはずなのでアマチュア高段（せいぜい 2300~2400 くらい）にしてくれているのは優しさともいえます。</p>
<h3 id="ai-の弱点を探る" tabindex="-1"><a class="header-anchor" href="#ai-の弱点を探る" aria-hidden="true">#</a> AI の弱点を探る</h3>
<p>どうもこの AI には定跡が設定されているようで、定跡範囲だとノータイムで指してきます、いくらなんでも早すぎです。</p>
<p>定跡範囲では相手のミスを誘ってリードを奪うことは不可能なので、早めに定跡を外す必要があります。</p>
<p>そして、これはコンシューマ向けの弱点とも言えるのですがあまりに考量時間を長くするとゲームとしての UX が悪くなってしまうので、ある程度で打ち切ってしまっているようです。</p>
<p>ここで問題になるのは、一直線の変化であればソフトは不要な変化を読まないので短い時間でも比較的強いのですが、こちらの研究範囲である選択肢の多い変化にもちこむとすべての変化を深く読み込むことができず「ちゃんと読めば悪手だとわかる手」を指してしまう場合があります。</p>
<p>これがソフトに勝つための一番合理的な方法ですので、これを突き詰めていくことにしましょう。</p>
<h3 id="空-銀子の弱点" tabindex="-1"><a class="header-anchor" href="#空-銀子の弱点" aria-hidden="true">#</a> 空 銀子の弱点</h3>
<p>銀ちゃんは得意戦法に「ひねり飛車」「相振飛車」と書いているにも関わらず、こちらが後手番で角道をあけて横歩取りを目指せばほぼ確実に横歩取りを指してきます。</p>
<p>逆に得意戦法に「空中戦法」がある月夜見坂さんは全然横歩取り指してきません。</p>
<p><img src="https://pbs.twimg.com/media/E4vH8zrVIAAv_08?format=png" alt=""></p>
<p>銀ちゃんは横歩取りを目指せばほぼ確実にこの四パターンのどれかになります。</p>
<p>相横歩取りをした場合は「3 三桂」か「3 三銀」に分岐し、3 六飛と引いたときに「同飛」か「7 四飛」にまた分岐します。「3 三桂」の場合は「3 六飛」としても「7 四飛」しか指してこないようです。</p>
<p>変化を多くするためには飛車角総交換をしたいのですが、相横歩取りは成功しないパターンも多いです。仮に分岐が 50%だとすると、「3 三銀、3 五飛、同飛、同歩」の最も激しい手順になる確率は 25%となります。</p>
<p>逆に 4 五角戦法をすれば変化の余地がないので 100%勝てます。</p>
<h2 id="相横歩取り" tabindex="-1"><a class="header-anchor" href="#相横歩取り" aria-hidden="true">#</a> 相横歩取り</h2>
<h3 id="_7-二金の場合" tabindex="-1"><a class="header-anchor" href="#_7-二金の場合" aria-hidden="true">#</a> 7 二金の場合</h3>
<p><img src="https://pbs.twimg.com/media/E4vF-5_VEAEdpg_?format=png" alt=""></p>
<p>7 二金は 8 三角打を防いだ手なのですが、正直疑問手です。というのも、8 三角打を防ぐためだけに壁形になってしまい、玉を固く囲うことができないからです。</p>
<p>実際、この 7 八金のせいで銀ちゃんはあっという間に負けてしまいます。</p>
<p><img src="https://pbs.twimg.com/media/E4vO2y6VoAguJI4?format=png" alt=""></p>
<p>まず、2 四歩打とします。これを放置すれば 2 三歩成、同金となり飛車打ちのスキが生じるので、2 二歩打と受けたり 2 七飛打とする手が有力視されています。</p>
<p>この手はソフト的には定跡だと思うのですが、銀ちゃん AI には定跡として載っていないようでここで考量時間を使います。</p>
<p>そしてほぼ 100%、2 七飛打と指してきます。その手を指された場合は 2 八飛打と受けます。</p>
<p><img src="https://pbs.twimg.com/media/E4vO2y6VgAMwxDT?format=png" alt=""></p>
<p>ここが AI の読み抜けで、定跡に従えば同飛成とするところなのですが、何故か 4 七飛成と指してきます。</p>
<p><img src="https://pbs.twimg.com/media/E4vO2zIVkAM7y1N?format=png" alt=""></p>
<p>この 2 三歩成が強烈だと思うのですが、AI はこの手は「2 七歩打」「1 五角打」で受かると錯覚しています。</p>
<p>1 五角打ちはたしかに強烈な一手なのですが、それをも上回る絶妙手があります。</p>
<p>それが「4 八角打」で、これを指せば後手勝勢です。</p>
<p>以下、2 七歩打、3 二と、2 八歩成、1 五角と進みます。</p>
<p><img src="https://pbs.twimg.com/media/E4vO2zjVkAcdnvw?format=png" alt=""></p>
<p>そして 1 五角を無視して 3 九とと指してきます。しかし、これは詰めろではない上に実はこの 1 五角は次の 3 三角成からの九手詰みです。</p>
<p><img src="https://pbs.twimg.com/media/E4vSEpVVUAghd2s?format=png" alt=""></p>
<p>この手順が決まればわずか 44 手で勝てます。</p>
<details><summary>3八金の変化</summary><div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>手合割：平手
先手：
後手：
手数----指手---------消費時間--
   1 ２六歩(27)        ( 0:00/00:00:00)
   2 ３四歩(33)        ( 0:00/00:00:00)
   3 ７六歩(77)        ( 0:00/00:00:00)
   4 ８四歩(83)        ( 0:00/00:00:00)
   5 ２五歩(26)        ( 0:00/00:00:00)
   6 ８五歩(84)        ( 0:00/00:00:00)
   7 ７八金(69)        ( 0:00/00:00:00)
   8 ３二金(41)        ( 0:00/00:00:00)
   9 ２四歩(25)        ( 0:00/00:00:00)
  10 同　歩(23)        ( 0:00/00:00:00)
  11 同　飛(28)        ( 0:00/00:00:00)
  12 ８六歩(85)        ( 0:00/00:00:00)
  13 同　歩(87)        ( 0:00/00:00:00)
  14 同　飛(82)        ( 0:00/00:00:00)
  15 ３四飛(24)        ( 0:00/00:00:00)
  16 ８八角成(22)       ( 0:00/00:00:00)
  17 同　銀(79)        ( 0:00/00:00:00)
  18 ７六飛(86)        ( 0:00/00:00:00)
  19 ７七銀(88)        ( 0:00/00:00:00)
  20 ７四飛(76)        ( 0:00/00:00:00)
  21 同　飛(34)        ( 0:00/00:00:00)
  22 同　歩(73)        ( 0:00/00:00:00)
  23 ３八金(49)        ( 0:00/00:00:00)
  24 ８六歩打           ( 0:00/00:00:00)
  25 ８三飛打           ( 0:00/00:00:00)
  26 ８二飛打           ( 0:00/00:00:00)
  27 ６三飛成(83)       ( 0:00/00:00:00)
  28 ８七歩成(86)       ( 0:00/00:00:00)
  29 ９五角打           ( 0:00/00:00:00)
  30 ６二角打           ( 0:00/00:00:00)
  31 ８三歩打           ( 0:00/00:00:00)
  32 ７八と(87)        ( 0:00/00:00:00)
  33 ８二歩成(83)       ( 0:00/00:00:00)
  34 ９五角(62)        ( 0:00/00:00:00)
  35 ７一と(82)        ( 0:00/00:00:00)
  36 ７七角成(95)       ( 0:00/00:00:00)
  37 ４八玉(59)        ( 0:00/00:00:00)
  38 ５九馬(77)        ( 0:00/00:00:00)
  39 同　玉(48)        ( 0:00/00:00:00)
  40 ６八金打           ( 0:00/00:00:00)
  41 ４九玉(59)        ( 0:00/00:00:00)
  42 ５八銀打           ( 0:00/00:00:00)
  43 ４八玉(49)        ( 0:00/00:00:00)
  44 ５九角打           ( 0:00/00:00:00)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div></div></details>
<h3 id="_6-四角の場合" tabindex="-1"><a class="header-anchor" href="#_6-四角の場合" aria-hidden="true">#</a> 6 四角の場合</h3>
<p>こっちの場合はやたらと長いのでただ勝ちたいだけならあまりおすすめはしません。</p>
<p>途中までは定跡通りで、相横歩取りは後手番が不利と言われているのでずっと評価値も先手に振れています。</p>
<p>88 手目の時点は詰んではいないのですが、相手は受けなしで駒もないので無意味な王手ラッシュばっかりしてくる状態になります。</p>
<details><summary>6四角の変化</summary><div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>手合割：平手
先手：
後手：
手数----指手---------消費時間--
   1 ２六歩(27)        ( 0:00/00:00:00)
   2 ３四歩(33)        ( 0:00/00:00:00)
   3 ７六歩(77)        ( 0:00/00:00:00)
   4 ８四歩(83)        ( 0:00/00:00:00)
   5 ２五歩(26)        ( 0:00/00:00:00)
   6 ８五歩(84)        ( 0:00/00:00:00)
   7 ７八金(69)        ( 0:00/00:00:00)
   8 ３二金(41)        ( 0:00/00:00:00)
   9 ２四歩(25)        ( 0:00/00:00:00)
  10 同　歩(23)        ( 0:00/00:00:00)
  11 同　飛(28)        ( 0:00/00:00:00)
  12 ８六歩(85)        ( 0:00/00:00:00)
  13 同　歩(87)        ( 0:00/00:00:00)
  14 同　飛(82)        ( 0:00/00:00:00)
  15 ３四飛(24)        ( 0:00/00:00:00)
  16 ８八角成(22)       ( 0:00/00:00:00)
  17 同　銀(79)        ( 0:00/00:00:00)
  18 ７六飛(86)        ( 0:00/00:00:00)
  19 ７七銀(88)        ( 0:00/00:00:00)
  20 ７四飛(76)        ( 0:00/00:00:00)
  21 同　飛(34)        ( 0:00/00:00:00)
  22 同　歩(73)        ( 0:00/00:00:00)
  23 ４六角打           ( 0:00/00:00:00)
  24 ８二角打           ( 0:00/00:00:00)
  25 同　角成(46)       ( 0:00/00:00:00)
  26 同　銀(71)        ( 0:00/00:00:00)
  27 ５五角打           ( 0:00/00:00:00)
  28 ８五飛打           ( 0:00/00:00:00)
  29 ８六飛打           ( 0:00/00:00:00)
  30 同　飛(85)        ( 0:00/00:00:00)
  31 同　銀(77)        ( 0:00/00:00:00)
  32 ２八歩打           ( 0:00/00:00:00)
  33 ８二角成(55)       ( 0:00/00:00:00)
  34 ２九歩成(28)       ( 0:00/00:00:00)
  35 ７二銀打           ( 0:00/00:00:00)
  36 同　金(61)        ( 0:00/00:00:00)
  37 同　馬(82)        ( 0:00/00:00:00)
  38 ４二玉(51)        ( 0:00/00:00:00)
  39 ４八銀(39)        ( 0:00/00:00:00)
  40 ３八歩打           ( 0:00/00:00:00)
  41 ６三馬(72)        ( 0:00/00:00:00)
  42 ３九歩成(38)       ( 0:00/00:00:00)
  43 同　銀(48)        ( 0:00/00:00:00)
  44 同　と(29)        ( 0:00/00:00:00)
  45 同　金(49)        ( 0:00/00:00:00)
  46 ３八歩打           ( 0:00/00:00:00)
  47 ２九金(39)        ( 0:00/00:00:00)
  48 ５五桂打           ( 0:00/00:00:00)
  49 ５八金打           ( 0:00/00:00:00)
  50 ８七銀打           ( 0:00/00:00:00)
  51 ７九金(78)        ( 0:00/00:00:00)
  52 １四角打           ( 0:00/00:00:00)
  53 ３六歩(37)        ( 0:00/00:00:00)
  54 ２七飛打           ( 0:00/00:00:00)
  55 ３八金(29)        ( 0:00/00:00:00)
  56 ２九飛成(27)       ( 0:00/00:00:00)
  57 ３九飛打           ( 0:00/00:00:00)
  58 ２五龍(29)        ( 0:00/00:00:00)
  59 ６八金(79)        ( 0:00/00:00:00)
  60 ２七銀打           ( 0:00/00:00:00)
  61 ４八金(38)        ( 0:00/00:00:00)
  62 ３六銀成(27)       ( 0:00/00:00:00)
  63 ４九飛(39)        ( 0:00/00:00:00)
  64 ３七歩打           ( 0:00/00:00:00)
  65 ３四歩打           ( 0:00/00:00:00)
  66 ２八龍(25)        ( 0:00/00:00:00)
  67 ２九歩打           ( 0:00/00:00:00)
  68 １九龍(28)        ( 0:00/00:00:00)
  69 ６四馬(63)        ( 0:00/00:00:00)
  70 １八龍(19)        ( 0:00/00:00:00)
  71 ２八歩(29)        ( 0:00/00:00:00)
  72 ４七成銀(36)       ( 0:00/00:00:00)
  73 同　金(58)        ( 0:00/00:00:00)
  74 同　桂成(55)       ( 0:00/00:00:00)
  75 同　金(48)        ( 0:00/00:00:00)
  76 ３八歩成(37)       ( 0:00/00:00:00)
  77 ５四桂打           ( 0:00/00:00:00)
  78 ５二玉(42)        ( 0:00/00:00:00)
  79 ７四馬(64)        ( 0:00/00:00:00)
  80 ６三歩打           ( 0:00/00:00:00)
  81 ４一銀打           ( 0:00/00:00:00)
  82 同　玉(52)        ( 0:00/00:00:00)
  83 ６三馬(74)        ( 0:00/00:00:00)
  84 ５二銀打           ( 0:00/00:00:00)
  85 ４二歩打           ( 0:00/00:00:00)
  86 同　金(32)        ( 0:00/00:00:00)
  87 同　桂成(54)       ( 0:00/00:00:00)
  88 同　銀(31)        ( 0:00/00:00:00)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div></div></details>
<h3 id="_4-五角戦法の場合" tabindex="-1"><a class="header-anchor" href="#_4-五角戦法の場合" aria-hidden="true">#</a> 4 五角戦法の場合</h3>
<p>4 五角戦法も正しく指せば先手が勝つと言われているのですが、AI は読み抜けがあるため逆に正しく指せば必ずプレイヤー側が勝てます。</p>
<p><img src="https://pbs.twimg.com/media/E4vb_hiVkAUQ2TV?format=png" alt=""></p>
<p>基本は定跡通りに進むのですが、この 7 四香打は対応を誤るとすぐに負けてしまいます。</p>
<p>形よく 7 七桂のようにしたいのですが、それでは攻めが切れてしまうのでここは 5 五桂と守りの要の金を攻めます。</p>
<p>以下、5 四金、同角、6 三桂成、7 八香成、同銀と進みます。</p>
<p><img src="https://pbs.twimg.com/media/E4vb_iLUYAc2I5O?format=png" alt=""></p>
<p>中盤に 9 一飛打という手が飛んでくるのですが、これはおとなしく 7 九歩打と底歩で受けます。こちらの玉は居玉ですがこの底歩がなかなかしっかりしていてすぐには寄りません。</p>
<p><img src="https://pbs.twimg.com/media/E4vb_ifVgAE7Vrn?format=png" alt=""></p>
<p>ここまでずっと銀ちゃんがリードを取っているのですが、ここで大悪手がとんできます。</p>
<p>それが 6 六歩打で、放置すれば 6 七歩成、同銀、6 八金打、4 八玉、6 七金でこちらが寄ってしまうのですが、それよりも早い攻めがあります。</p>
<p>まず 1 二飛打ちとして合駒を要求します。受けずに 6 七歩成としてくれば 6 四歩打の垂らしが強烈でこちらが一手勝てます。6 二歩打ちと受けるような手では玉の退路が塞がれてしまうので 3 一銀と馬に引っ掛けておいて一手勝ちです。</p>
<p>仕方なく桂馬を合駒しますが、そこで歩の裏から香車を打ってこちらが勝勢です。</p>
<p>詰みまでの変化も載せているので横歩取りがスキな方は見てみてください。</p>
<details><summary>4五角戦法の変化</summary><div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>手合割：平手
先手：
後手：
手数----指手---------消費時間--
   1 ２六歩(27)        ( 0:00/00:00:00)
   2 ８四歩(83)        ( 0:00/00:00:00)
   3 ７六歩(77)        ( 0:00/00:00:00)
   4 ３四歩(33)        ( 0:00/00:00:00)
   5 ２五歩(26)        ( 0:00/00:00:00)
   6 ８五歩(84)        ( 0:00/00:00:00)
   7 ７八金(69)        ( 0:00/00:00:00)
   8 ３二金(41)        ( 0:00/00:00:00)
   9 ２四歩(25)        ( 0:00/00:00:00)
  10 同　歩(23)        ( 0:00/00:00:00)
  11 同　飛(28)        ( 0:00/00:00:00)
  12 ８六歩(85)        ( 0:00/00:00:00)
  13 同　歩(87)        ( 0:00/00:00:00)
  14 同　飛(82)        ( 0:00/00:00:00)
  15 ３四飛(24)        ( 0:00/00:00:00)
  16 ８八角成(22)       ( 0:00/00:00:00)
  17 同　銀(79)        ( 0:00/00:00:00)
  18 ２八歩打           ( 0:00/00:00:00)
  19 同　銀(39)        ( 0:00/00:00:00)
  20 ４五角打           ( 0:00/00:00:00)
  21 ２四飛(34)        ( 0:00/00:00:00)
  22 ２三歩打           ( 0:00/00:00:00)
  23 ７七角打           ( 0:00/00:00:00)
  24 ８八飛成(86)       ( 0:00/00:00:00)
  25 同　角(77)        ( 0:00/00:00:00)
  26 ２四歩(23)        ( 0:00/00:00:00)
  27 １一角成(88)       ( 0:00/00:00:00)
  28 ８七銀打           ( 0:00/00:00:00)
  29 ７七馬(11)        ( 0:00/00:00:00)
  30 ７六銀(87)        ( 0:00/00:00:00)
  31 ６八馬(77)        ( 0:00/00:00:00)
  32 ８八歩打           ( 0:00/00:00:00)
  33 ７七歩打           ( 0:00/00:00:00)
  34 ６七銀成(76)       ( 0:00/00:00:00)
  35 同　金(78)        ( 0:00/00:00:00)
  36 ８九歩成(88)       ( 0:00/00:00:00)
  37 ３六香打           ( 0:00/00:00:00)
  38 ５五桂打           ( 0:00/00:00:00)
  39 ５六金(67)        ( 0:00/00:00:00)
  40 同　角(45)        ( 0:00/00:00:00)
  41 同　歩(57)        ( 0:00/00:00:00)
  42 ４七桂成(55)       ( 0:00/00:00:00)
  43 ３二香成(36)       ( 0:00/00:00:00)
  44 同　銀(31)        ( 0:00/00:00:00)
  45 ５八銀打           ( 0:00/00:00:00)
  46 ６四香打           ( 0:00/00:00:00)
  47 ６七歩打           ( 0:00/00:00:00)
  48 ５八成桂(47)       ( 0:00/00:00:00)
  49 同　玉(59)        ( 0:00/00:00:00)
  50 ９九と(89)        ( 0:00/00:00:00)
  51 １二飛打           ( 0:00/00:00:00)
  52 ３一歩打           ( 0:00/00:00:00)
  53 ４四歩打           ( 0:00/00:00:00)
  54 ９八飛打           ( 0:00/00:00:00)
  55 ７八桂打           ( 0:00/00:00:00)
  56 ４五香打           ( 0:00/00:00:00)
  57 ４三歩成(44)       ( 0:00/00:00:00)
  58 ５七銀打           ( 0:00/00:00:00)
  59 同　馬(68)        ( 0:00/00:00:00)
  60 ７八飛成(98)       ( 0:00/00:00:00)
  61 ６八銀打           ( 0:00/00:00:00)
  62 ４七金打           ( 0:00/00:00:00)
  63 同　馬(57)        ( 0:00/00:00:00)
  64 ６七香成(64)       ( 0:00/00:00:00)
  65 ４八玉(58)        ( 0:00/00:00:00)
  66 ６八龍(78)        ( 0:00/00:00:00)
  67 ５八角打           ( 0:00/00:00:00)
  68 同　成香(67)       ( 0:00/00:00:00)
  69 ３八玉(48)        ( 0:00/00:00:00)
  70 ４七香成(45)       ( 0:00/00:00:00)
  71 同　玉(38)        ( 0:00/00:00:00)
  72 ５七龍(68)        ( 0:00/00:00:00)
  73 ３八玉(47)        ( 0:00/00:00:00)
  74 ４七角打           ( 0:00/00:00:00)
  75 ２七玉(38)        ( 0:00/00:00:00)
  76 ４五角打           ( 0:00/00:00:00)
  77 ３六香打           ( 0:00/00:00:00)
  78 同　角成(47)       ( 0:00/00:00:00)
  79 ３八玉(27)        ( 0:00/00:00:00)
  80 ４七龍(57)        ( 0:00/00:00:00)
  81 ３九玉(38)        ( 0:00/00:00:00)
  82 ４九龍(47)        ( 0:00/00:00:00)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br></div></div></div></details>
<p>ちなみに、4 五角戦法は後手番に主導権があり、AI は必ず間違えるので覚えれば絶対に勝てます。</p>
</template>
