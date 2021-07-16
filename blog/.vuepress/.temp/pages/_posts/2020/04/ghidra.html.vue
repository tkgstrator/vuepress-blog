<template><h2 id="ghidra" tabindex="-1"><a class="header-anchor" href="#ghidra" aria-hidden="true">#</a> <a href="https://github.com/NationalSecurityAgency/ghidra/releases" target="_blank" rel="noopener noreferrer">Ghidra<OutboundLink/></a></h2>
<p>NSA が開発した逆アセンブラツール。</p>
<p>しかも無料というのだから、これまたすごいの一言です。</p>
<p>IDA Pro はものすごく便利なツールですが、ライセンス料が高いので導入のハードルがかなり高いです。</p>
<p>なので、今回は Ghidra でのコード移植のやり方を紹介します。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>IDA Pro でできることのほとんどが Ghidra でできます。</p>
</div>
<h3 id="jdk" tabindex="-1"><a class="header-anchor" href="#jdk" aria-hidden="true">#</a> JDK</h3>
<p>Ghidra の実行には JDK（JAVA）が必要なので、公式サイトからインストールしましょう。</p>
<p><a href="https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html" target="_blank" rel="noopener noreferrer">Java Archive Downloads - Java SE 11<OutboundLink/></a></p>
<p>インストールが終わったら Path を通してください。</p>
<h3 id="メモリの変更" tabindex="-1"><a class="header-anchor" href="#メモリの変更" aria-hidden="true">#</a> メモリの変更</h3>
<p>Ghidra はデフォルトでは 1024MB しかメモリを使ってくれないのですが、これだとメモリが足りずに解析失敗するかもしれないので最低でも 2048MB は確保したほうがいいでしょう。</p>
<p><strong>ghidraRun.bat</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>:: Ghidra launch

@echo off
setlocal

:: Maximum heap memory size
:: Default for Windows 32-bit is 768M and 64-bit is 1024M
:: Raising the value too high may cause a silent failure where
:: Ghidra fails to launch.
:: Uncomment MAXMEM setting if non-default value is needed

set MAXMEM=2048M

call "%~dp0support\launch.bat" bg Ghidra "%MAXMEM%" "" ghidra.GhidraRun %*


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>こんな感じでコメントを外して好きな値をいれれば OK。</p>
<p>一応 1024MB でも解析できたけど、余裕があるならそれ以上に設定しておこう。</p>
<h2 id="ghidra-の使い方" tabindex="-1"><a class="header-anchor" href="#ghidra-の使い方" aria-hidden="true">#</a> Ghidra の使い方</h2>
<p>いくつかのパートに分けて Ghidra の使い方を解説していきたいと思います。</p>
<h3 id="loader-の導入" tabindex="-1"><a class="header-anchor" href="#loader-の導入" aria-hidden="true">#</a> Loader の導入</h3>
<p>NSO をそのまま読み込むには Loader が必要なのですが、今現在の最新の<a href="https://github.com/Adubbz/Ghidra-Switch-Loader/releases/tag/1.4.0" target="_blank" rel="noopener noreferrer">Ghidra-Switch-Loader<OutboundLink/></a>は<a href="https://github.com/NationalSecurityAgency/ghidra/releases/tag/Ghidra_9.1.2_build" target="_blank" rel="noopener noreferrer">Ghidra 9.1.2<OutboundLink/></a>にしか対応していないため、旧バージョンを使う必要があります。</p>
<p>インストール出来たら Ghidra を起動して File -&gt; Install Extension を選択してください。</p>
<p>右上の + ボタンを押して、ダウンロードした zip ファイルを直接指定してください。</p>
<p>Ghidra の再起動が要求されると思うので、再起動しましょう。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>この作業は ELF を分析する場合は不要です。</p>
<p>復号は<a href="https://github.com/tkgstrator/nx2elf/releases" target="_blank" rel="noopener noreferrer">nx2elf<OutboundLink/></a>ですることができます。</p>
</div>
<h3 id="バイナリの分析" tabindex="-1"><a class="header-anchor" href="#バイナリの分析" aria-hidden="true">#</a> バイナリの分析</h3>
<p>まずは実行ファイルである NSO/ELF を分析します。</p>
<p>起動するとプロジェクトを作成するように指示されます。プロジェクト名は適当に決めてしまいましょう。</p>
<p>次に、分析するファイルをドラッグアンドドロップするか、Select File Import からファイルを選択してください。</p>
<p>[ファイル名] has not been analyzed. Would you like to analyze it now?（分析済みではないので分析しますか？）というダイアログが表示されるので Yes を選択します。</p>
<p>Analysis Options はとりあえずデフォルトでチェックが入っているものだけにしました。デフォルトで全く問題なかったので多分これでオッケー。</p>
<p>Analyze をクリックすると分析が始まります。右下の表示で分析中なことがわかりますね。</p>
<p>分析のスピードは使用しているマシンの CPU のスペックに依存します。</p>
<p>i7 6700K で実行したところ約 20 分くらい、MacBook Pro 2019 だと 40 分くらいかかりました。気長に待ちましょう。</p>
<h2 id="コードの移植" tabindex="-1"><a class="header-anchor" href="#コードの移植" aria-hidden="true">#</a> コードの移植</h2>
<p>移植に関して言えば基本的に命令部は弄る必要がないので、正しいアドレスの位置さえ指定してあげれば良いことになります。</p>
<h3 id="バイト検索" tabindex="-1"><a class="header-anchor" href="#バイト検索" aria-hidden="true">#</a> バイト検索</h3>
<p>長くなるので時間ができたときに書きます。</p>
<h3 id="文字列検索" tabindex="-1"><a class="header-anchor" href="#文字列検索" aria-hidden="true">#</a> 文字列検索</h3>
<p>文字列検索を利用するコード移植の例としては試し打ち場の置換などが上げられます。では、その方法を解説しましょう。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// ShootingRange Replacements (5.0.0) [AmazingChz]
@disabled
023FCACA "Fld_Crank00_Vss"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>試し打ち場のパラメータ名は<code>Fld_ShootingRange_Shr</code>なのでそれを検索してみましょう。</p>
<p>Search -&gt; Program Text を開きます。</p>
<p>Labels にチェックを入れましょう。</p>
<p>Next と Previous は現在のカーソルからの相対位置で検索し、Search All は全範囲で検索します。</p>
<p>Ghidra で NSO を直接分析した場合にはアドレスが 7100000000 ズレる事がわかっているので、仮に 7102412414 見つかったとしたら、IPSwitch 形式だと 02412414 となるわけです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// ShootingRange Replacements (5.0.1) [AmazingChz]
@disabled
02412414 "Fld_Crank00_Vss"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Urchin Underpass = Fld_Crank00_Vss
Saltspray Rig = Fld_Seaplant00_Vss
Museum d'Alfonsino = Fld_Pivot00_Vss
Mahi-Mahi Resort = Fld_Hiagari00_Vss
Hammerhead Bridge = Fld_Kaisou00_Vss
Flounder Heights = Fld_Jyoheki00_Vss
Ancho-V-Games = Fld_Office01_Vss
Arowna Mall = Fld_UpDown01_Vss
Blackbelly Skatepark = Fld_SkatePark02_Vss
Camp Triggerfish = Fld_Athletic01_Vss
Goby Arena = Fld_Court00_Vss
Humpback Pump Track = Fld_Wave00_Vss
Inkblot Art Academy = Fld_Upland00_Vss
Kelp Dome = Fld_Maze02_Vss
MakoMart = Fld_Line00_Vss
Manta Maria = Fld_Pillar00_Vss
Moray Towers = Fld_Tuzura00_Vss
Musselforge Fitness = Fld_Unduck00_Vss
Piranha Pit = Fld_Quarry02_Vss
Port Mackerel = Fld_Amida01_Vss
Shellendorf Institute = Fld_Tunnel00_Vss
Snapper Canal = Fld_Kawa01_Vss
Starfish Mainstage = Fld_Venue02_Vss
Sturgeon Shipyard = Fld_Nagasaki00_Vss
The Reef = Fld_Ditch02_Vss
Wahoo World = Fld_Carousel00_Vss
Walleye Warehouse = Fld_Warehouse01_Vss
New Albacore Hotel = Fld_Nakasu00_Vss
Skipper Pavilion = Fld_Mirror00_Vss
Lost Outpost = Fld_Shakehouse00_Cop
Marooner's Bay = Fld_Shakeship00_Cop
Salmonid Smokeyard = Fld_Shakelift00_Cop
Spawning Grounds = Fld_Shakeup01_Cop
Staff Roll = Fld_StaffRoll00_Stf
Tutorial = Fld_Tutorial00_Ttr
Old Starfish Mainstage = Fld_Venue00_Vss
Shifty Station = Fld_Deli_Octa51_Vss
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h2 id="オフセット" tabindex="-1"><a class="header-anchor" href="#オフセット" aria-hidden="true">#</a> オフセット</h2>
<p>逆アセンブラの種類と解析するファイルの種類によって ELF を IDA で解析したときに比べてアドレスがズレるのでその値を覚えて置かなければいけません。</p>
<table>
<thead>
<tr>
<th style="text-align:center">逆アセンブラ</th>
<th style="text-align:center">オフセット</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">GHIDRA (NSO)</td>
<td style="text-align:center">+0x7100000000</td>
</tr>
<tr>
<td style="text-align:center">GHIDRA (ELF)</td>
<td style="text-align:center">+0x0000100000</td>
</tr>
<tr>
<td style="text-align:center">IDA Pro (NSO)</td>
<td style="text-align:center">+0x7100000000</td>
</tr>
<tr>
<td style="text-align:center">IDA Pro (ELF)</td>
<td style="text-align:center">0</td>
</tr>
</tbody>
</table>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>というわけで、今回は Ghidra の使い方やコードの移植のやり方について簡単に解説してみました。</p>
<p>もしわからないことがあれば以下のリンクから Discord サーバに参加して、直接きいていただければ返事します。</p>
<p><a href="https://discord.gg/vUVBJFAKvZ" target="_blank" rel="noopener noreferrer">LanPlay-JP<OutboundLink/></a></p>
<p>記事は以上。</p>
</template>
