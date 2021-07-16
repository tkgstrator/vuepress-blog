<template><h1 id="sigpatch-とは" tabindex="-1"><a class="header-anchor" href="#sigpatch-とは" aria-hidden="true">#</a> Sigpatch とは</h1>
<blockquote>
<p>この記事は以前公開していたものを加筆・修正したものになります</p>
</blockquote>
<p>当ブログでも再三に渡って説明しているのだが、Atmosphere には海賊版対策として署名のない NSP はインストールも起動もできない仕組みが備わっています。</p>
<p>コレ自体はとても良い機能なのですが、この機能があると自分でカートリッジから NSP をダンプした場合にも署名を保存しておかないとインストールできなくなってしまいます。</p>
<p>Tinfoil のような非公式アプリを Applet Mode 以外で起動させるにも Sigpatch が必要になってきますので、使いたい方は導入必須です。</p>
<h2 id="sigpatch-updater" tabindex="-1"><a class="header-anchor" href="#sigpatch-updater" aria-hidden="true">#</a> <a href="https://github.com/ITotalJustice/sigpatch-updater/releases" target="_blank" rel="noopener noreferrer">Sigpatch Updater<OutboundLink/></a></h2>
<p><img src="https://pbs.twimg.com/media/EmVSlw_WEAIeXEs?format=png" alt=""></p>
<p>ダウンロードした NRO を switch フォルダ以下にコピーするだけです。</p>
<p><img src="https://github.com/ITotalJustice/sigpatch-updater/blob/master/images/example.jpg?raw=true" alt=""></p>
<p>Kosmos/DeepSea/Hekate ユーザは上から二番目の<code>Update Sigpatches (For Hekate / Kosmos Users)</code>を選択しましょう。</p>
<p>GitHub のレポジトリから Sigpatch をダウンロードして SD カード内に展開してくれます。</p>
<h3 id="sigpatch-を有効化しよう" tabindex="-1"><a class="header-anchor" href="#sigpatch-を有効化しよう" aria-hidden="true">#</a> Sigpatch を有効化しよう</h3>
<p>ここまでの手順では Sigpatch を SD カード内に展開して「利用できる状態」にしてくれるだけなので、実際にそれを読み込んで有効化する必要があります。</p>
<p>SD カード内の<code>hekate_ipl.ini</code>を編集して読み込むようにしましょう。</p>
<p>また、このときに CFW(SysNAND)を無効化しておくことを強く推奨します。</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token header"><span class="token punctuation">[</span><span class="token section-name selector">config</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">autoboot</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token key attr-name">autoboot_list</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token key attr-name">bootwait</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">verification</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">backlight</span><span class="token punctuation">=</span><span class="token value attr-value">100</span>
<span class="token key attr-name">autohosoff</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token key attr-name">autonogc</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>

{AtlasNX/Kosmos w/ nosigchk}
{}
{Discord: discord.teamatlasnx.com}
{Github: git.teamatlasnx.com}
{Patreon: patreon.teamatlasnx.com}
{Pegascape DNS: pegascape.sdsetup.com}
{}

{--- Custom Firmware ---}
<span class="token comment"># SYSNAND無効化の時はこの項目を削除</span>
<span class="token header"><span class="token punctuation">[</span><span class="token section-name selector">CFW (SYSNAND)</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">emummc_force_disable</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">fss0</span><span class="token punctuation">=</span><span class="token value attr-value">atmosphere/fusee-secondary.bin</span>
<span class="token key attr-name">kip1patch</span><span class="token punctuation">=</span><span class="token value attr-value">nosigchk</span>
<span class="token key attr-name">atmosphere</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">logopath</span><span class="token punctuation">=</span><span class="token value attr-value">bootloader/bootlogo.bmp</span>
<span class="token key attr-name">icon</span><span class="token punctuation">=</span><span class="token value attr-value">bootloader/res/icon_payload.bmp</span>
<span class="token key attr-name">kip1</span><span class="token punctuation">=</span><span class="token value attr-value">atmosphere/kips/*</span>
{}
<span class="token comment"># ここまでを削除</span>

<span class="token header"><span class="token punctuation">[</span><span class="token section-name selector">CFW (EMUMMC)</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">fss0</span><span class="token punctuation">=</span><span class="token value attr-value">atmosphere/fusee-secondary.bin</span>
<span class="token key attr-name">kip1patch</span><span class="token punctuation">=</span><span class="token value attr-value">nosigchk</span>
<span class="token key attr-name">atmosphere</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">logopath</span><span class="token punctuation">=</span><span class="token value attr-value">bootloader/bootlogo.bmp</span>
<span class="token key attr-name">icon</span><span class="token punctuation">=</span><span class="token value attr-value">bootloader/res/icon_payload.bmp</span>
<span class="token key attr-name">kip1</span><span class="token punctuation">=</span><span class="token value attr-value">atmosphere/kips/*</span>
{}

{--- Stock ---}
<span class="token header"><span class="token punctuation">[</span><span class="token section-name selector">Stock (SYSNAND)</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">emummc_force_disable</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">fss0</span><span class="token punctuation">=</span><span class="token value attr-value">atmosphere/fusee-secondary.bin</span>
<span class="token key attr-name">stock</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token key attr-name">icon</span><span class="token punctuation">=</span><span class="token value attr-value">bootloader/res/icon_switch.bmp</span>
{}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">何故 CFW(SysNAND)を無効化するのか</p>
<p>EmuMMC を利用している多くの方は OFW を SysNAND で動かしてオンラインプレイを遊び、CFW は EmuMMC で動かして遊んでいるという方が多いと思います。</p>
<p>オンラインプレイで遊ぶためには 90DNS を設定できないので（設定するとオンラインにつながらない）、SysNAND では 90DNS を設定していないことになります。その状態で誤って CFW で起動してしまうと「オンラインに繋げる=即 BAN」となってしまうため「誤って CFW(SysNAND)を選択すること」が即座に BAN に直結してしまいます。</p>
<p>このようなたった一つのミスで BAN されることを防ぐためにも、SysNAND で CFW を読み込むような設定はオフにすべきです。</p>
</div>
<h2 id="aio-switch-updater" tabindex="-1"><a class="header-anchor" href="#aio-switch-updater" aria-hidden="true">#</a> <a href="https://github.com/HamletDuFromage/aio-switch-updater/releases" target="_blank" rel="noopener noreferrer">AIO-Switch-Updater<OutboundLink/></a></h2>
<p>hekate_ipl.ini を編集するのがめんどくさい方向けに AIO-Switch-Updater というものがリリースされています。</p>
<p><img src="https://user-images.githubusercontent.com/61667930/107124480-7a41f400-68a4-11eb-9a01-d7b3c9f3e828.jpg" alt=""></p>
<p>このツールは、</p>
<ul>
<li>Atmosphere のアップデート</li>
<li>CFW のアップデート</li>
<li>Sigpatch のアップデート</li>
<li>Firmware のダウンロード</li>
<li>チートコードのダウンロード</li>
</ul>
<p>に対応しています。要するに、これだけあれば大体なんでもできます。</p>
<p>めんどくさがりな方はこっちでも良いかもしれません。</p>
<h2 id="sigpatch-を使いたくない方のために" tabindex="-1"><a class="header-anchor" href="#sigpatch-を使いたくない方のために" aria-hidden="true">#</a> Sigpatch を使いたくない方のために</h2>
<p>いちいち Sigpatch を使うのがめんどくさいという方はそもそも NSP をダンプするときに証明書（Ticket）付きでダンプすれば良いです。</p>
<p>ゲームのバックアップを NSP で保存するためには<a href="https://github.com/DarkMatterCore/nxdumptool/releases" target="_blank" rel="noopener noreferrer">NXDumpTool<OutboundLink/></a>というツールを使うのが最も手っ取り早いです。</p>
<p>NXDumpTool の使い方に関しては<a href="https://tkgstrator.work/posts/2021/06/10/nxdumptool.html" target="_blank" rel="noopener noreferrer">この記事<OutboundLink/></a>で解説しているのでどうぞ。</p>
</template>
