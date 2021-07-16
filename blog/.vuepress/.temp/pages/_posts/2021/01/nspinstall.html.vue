<template><h2 id="nsp-をダンプしよう" tabindex="-1"><a class="header-anchor" href="#nsp-をダンプしよう" aria-hidden="true">#</a> NSP をダンプしよう</h2>
<p>どうにもこうにも、まずはインストールするための NSP を手に入れなければいけません。</p>
<p>NSP はゲームのカートリッジ、または eShop からダウンロードしたダウンロード版ゲームや体験版や DLC、または配布されたアップデートなどが該当します。</p>
<p>NSP をゲームから抽出するには<a href="https://github.com/shadowninja108/HACGUI/releases" target="_blank" rel="noopener noreferrer">HACGUI<OutboundLink/></a>か<a href="https://github.com/DarkMatterCore/nxdumptool/releases" target="_blank" rel="noopener noreferrer">NXDumpTool<OutboundLink/></a>を使うのが基本的な手順となりますが、この際に署名付きでダンプしないとパッチをあてていない CFW ではインストールができないので以下の手順を読んで正しく署名付きで NSP を作成するようにしてください。</p>
<p>HACGUI と NXDumpTool の使い方は上のリンク参照！</p>
<h3 id="nsp-の抽出の手順" tabindex="-1"><a class="header-anchor" href="#nsp-の抽出の手順" aria-hidden="true">#</a> NSP の抽出の手順</h3>
<p>以下の表が HACGUI と NXDumpTool の比較表です</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">HACGUI</th>
<th style="text-align:center">NXDumpTool</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">カートリッジ版</td>
<td style="text-align:center">×</td>
<td style="text-align:center">△ <br> ※署名にバグあり？</td>
</tr>
<tr>
<td style="text-align:center">ダウンロード版</td>
<td style="text-align:center">△ <br> ※制限あり</td>
<td style="text-align:center">◯ <br> ※オプションが必須</td>
</tr>
<tr>
<td style="text-align:center">アップデータ</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
<tr>
<td style="text-align:center">DLC</td>
<td style="text-align:center">◯</td>
<td style="text-align:center">◯</td>
</tr>
</tbody>
</table>
<p>◯ は署名付きで正しくダンプし、パッチをあてていない CFW でインストール可能な NSP が作成できることを意味しています。じゃあ気になる △ はなんなのかということになるわけです。</p>
<p><strong>NXDumpTool でカートリッジ版をダンプ</strong></p>
<p>署名付きで正しくダンプしたつもりでも、スプラトゥーンの場合は何故か署名でエラーを吐かれてインストールすることができません。</p>
<p>カートリッジ版を無理やりダウンロード版の NSP として扱っているのが良くない可能性があります。</p>
<p>HACGUI はそもそもカートリッジ版をダンプすることができないので、この問題は発生しません。</p>
<p><strong>HACGUI でダウンロード版をダンプ</strong></p>
<p>HACGUI でダウンロード版をダンプすると署名付き NSP ができるのですが、この署名は personalized ticket と呼ばれるチケットでありダンプした NAND でしか効果を発揮しません。</p>
<p>なので、例えば SysNAND で eShop からゲームをダウンロードし、それを EmuNAND にインストールしようとした場合は、一度でも EmuNAND 側で本体の初期化などで内部 ID が変わるような操作をしているとゲームが起動できなくなります。</p>
<p>よっって、このケースでは HACGUI は実際には使い物にならないケースが多いです。</p>
<p><strong>NXDumpTool でダウンロード版をダンプ</strong></p>
<p>NXDumpTool にはダウンロード版の personalized ticket を common ticket に変換する機能が備わっています。</p>
<p>この署名変換機能があるおかげで、ダウンロード版のゲームを Sigpatch なしに起動することができるようになります。</p>
<h2 id="非署名の-nsp-をインストールしたい" tabindex="-1"><a class="header-anchor" href="#非署名の-nsp-をインストールしたい" aria-hidden="true">#</a> 非署名の NSP をインストールしたい</h2>
<p>さて、ここまでを読めばわかると思うのですがどうもカートリッジ版から署名付きの NSP をダンプすることは難しいようです。以前は WEIN DUMPER と呼ばれるカートリッジからダンプする専用のアプリがあったのですが、libnx の更新に対応していないのか最新版の CFW では動作しません。</p>
<p>また、自作アプリでも NRO ではなく NSP として配布しているものがあり、それらは当然任天堂公式の署名がされていないのでインストールすることができません。</p>
<p>そこで、非署名の NSP をインストールする仕組みが考えられました。それが、Sigpatch です。</p>
<h3 id="sigpatch-updater" tabindex="-1"><a class="header-anchor" href="#sigpatch-updater" aria-hidden="true">#</a> <a href="https://github.com/ITotalJustice/sigpatch-updater/releases" target="_blank" rel="noopener noreferrer">Sigpatch Updater<OutboundLink/></a></h3>
<p>Sigpatch を GitHub のリリースページから自動で取得してくれるアプリがあります。</p>
<p>それがこの Sigpatch Updater で、これ自体は既に更新が停止してしまっているのですが、パッチは更新されているので常に最新のパッチをあてることができます。</p>
<p>パッチは FW のバージョンと CFW のバージョン（より具体的には Atmosphere のバージョン）で動作するかしないかが決まってくるので、FW や CFW（または DeepSea）などをアップデートした場合には、再度 Sigpatch Updater を起動して最新のパッチをあてるようにしてください。</p>
<p>当然ですが、リリース直後はその FW や CFW に対するパッチに更新されていない場合もあります。</p>
<h3 id="hekate-ipl-ini" tabindex="-1"><a class="header-anchor" href="#hekate-ipl-ini" aria-hidden="true">#</a> hekate_ipl.ini</h3>
<p>Sigpatch Updater は Sigpatch をダウンロードしてくれますが、有効化はしてくれないのでパッチを読み込むように hekate_ipl.ini を更新する必要があります。</p>
<p>特に難しいことはなくて、以下のように書き換えれば Sigpatch を読み込んでくれます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[config]
autoboot=0
autoboot_list=0
bootwait=3
verification=1
backlight=100
autohosoff=0
autonogc=1
updater2p=1

{DeepSea/DeepSea v1.9.4}
{}
{Discord: invite.sdshrekup.com}
{Github: https://github.com/orgs/Team-Neptune/}
{}

{--- Custom Firmware ---}
[CFW (EMUMMC)]
emummcforce=1
kip1patch=nosigchk
fss0=atmosphere/fusee-secondary.bin
atmosphere=1
logopath=bootloader/bootlogo.bmp
icon=bootloader/res/icon_payload.bmp
kip1=atmosphere/kips/*
{}

{--- Stock ---}
[Stock (SYSNAND)]
emummc_force_disable=1
fss0=atmosphere/fusee-secondary.bin
stock=1
icon=bootloader/res/icon_switch.bmp
{}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>これは DeepSea 1.9.4 向けの hekate_ipl.ini ですが、他のバージョンでも（極端に hekate のバージョンが低くなければ）同じ書き方で動作すると思います。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>ここだけ読めばなんとかなるやろページが完成しました。</p>
<p>正直、Sigpatch ってなんかいろいろ派生があってよく分かってないんですよね。</p>
<p>そういえばこの前海外ドキュメントを読み漁っていたら Atmosphere から最新の Sigpatch を作成するためのコマンドみたいなのも見た気がするんですが、履歴の彼方にとんでいってしまったのでわからなくなってしまいました。</p>
<p>ニンテンドースイッチ向けの自作アプリって今まで一度も作ったことがないのでチャレンジしてみたいんですが、どこかにチュートリアルとかありませんかね？</p>
<p>記事は以上。</p>
</template>
