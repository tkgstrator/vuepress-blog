<template><h2 id="ファイルシステム" tabindex="-1"><a class="header-anchor" href="#ファイルシステム" aria-hidden="true">#</a> ファイルシステム</h2>
<h3 id="trustzone" tabindex="-1"><a class="header-anchor" href="#trustzone" aria-hidden="true">#</a> TrustZone</h3>
<p>ARM 型の CPU に含まれるセキュリティ技術のこと。</p>
<p>TrustZone ではセキュア OS が動作しており、仮想的に通常の環境とは切り離されている。</p>
<p>セキュア OS ではユーザの個人情報などを保護しており、このセキュア OS にアクセスするには ARM を経由する必要があります。</p>
<p>この仕組みがかなり強固で、実行 OS 側の ROOT 権限をもっていてもセキュア OS から情報が盗めないようになっています。</p>
<p><a href="https://switchbrew.org/wiki/Switch_System_Flaws#TrustZone" target="_blank" rel="noopener noreferrer">TrustZone<OutboundLink/></a></p>
<h3 id="exploit" tabindex="-1"><a class="header-anchor" href="#exploit" aria-hidden="true">#</a> Exploit</h3>
<p>Hack するために必要な脆弱性のうち、実際に利用可能なものを指す。</p>
<p>利用可能かどうかはわからない脆弱性は Vulnerability と呼ばれ、区別されることに注意。</p>
<p>未対策基板のニンテンドースイッチには Fusée Gelée と呼ばれる BootROM 脆弱性が存在する。</p>
<p>以下、今まで発見された脆弱性の一覧。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Name</th>
<th style="text-align:center">Available</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Jamais vu</td>
<td style="text-align:center">1.0.0</td>
</tr>
<tr>
<td style="text-align:center">Déjà Vu</td>
<td style="text-align:center">1.0.0 - 4.1.0 (7.0.1)</td>
</tr>
<tr>
<td style="text-align:center">Fusée Gelée</td>
<td style="text-align:center">All firmwares</td>
</tr>
<tr>
<td style="text-align:center">Nereba</td>
<td style="text-align:center">1.0.0 - 3.0.0</td>
</tr>
<tr>
<td style="text-align:center">PegaSwitch</td>
<td style="text-align:center">1.0.0 - 3.0.0</td>
</tr>
</tbody>
</table>
<p><a href="https://wiki.gbatemp.net/wiki/List_of_Switch_exploits" target="_blank" rel="noopener noreferrer">List of Switch exploits<OutboundLink/></a></p>
<h3 id="bootrom" tabindex="-1"><a class="header-anchor" href="#bootrom" aria-hidden="true">#</a> BootROM</h3>
<p>システム起動時に最初に呼び出される命令が書き込まれているメモリのこと。</p>
<p>ROM はリードオンリーメモリの略なので ROM はソフトウェア・アップデートで書き換えることができず、ここに存在する脆弱性は絶対に塞ぐことができない。</p>
<p>なので Fusée Gelée 脆弱性は将来の如何なるバージョンでも有効です。</p>
<h2 id="rcm" tabindex="-1"><a class="header-anchor" href="#rcm" aria-hidden="true">#</a> RCM</h2>
<p>リカバリーモードのこと。</p>
<p>初期のニンテンドースイッチには TegraGPU に脆弱性があり、RCM から自作プログラムを起動させることができます。</p>
<p>有名な自作プログラムとして hekate があり、CFW などはその hekate を経由して起動するケースが多いです。</p>
<h3 id="rcm-ジグ" tabindex="-1"><a class="header-anchor" href="#rcm-ジグ" aria-hidden="true">#</a> RCM ジグ</h3>
<p>RCM に入るためには特定のピンをショートさせる必要があるのですが、RCM ジグを使えばジョイコンの代わりにスイッチにつけるだけで、勝手にピンをショートしてくれます。</p>
<p>すごく便利なのでこれは持っておいたほうがいいと思います。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/31MOz9wtBkL._SL200_.jpg"></img>
<ul>
<li><a href="https://www.amazon.co.jp/dp/B07J6P93MB/?tag=tkgstrator0f-22" target="_blank">スイッチ用 RCMジグ RCMツール ショートコネクタ RCMクリップ 収納ケース付き (レッド)</a></li>
<li class="price">￥680</li>
</ul>
</div>
<h3 id="hekate" tabindex="-1"><a class="header-anchor" href="#hekate" aria-hidden="true">#</a> <a href="https://github.com/CTCaer/hekate/releases" target="_blank" rel="noopener noreferrer">hekate<OutboundLink/></a></h3>
<p>RCM から起動できるユーティリティツールのこと。</p>
<ul>
<li>CFW の起動</li>
<li>NAND のバックアップ
<ul>
<li>EMUNAND の作成</li>
</ul>
</li>
<li>BOOT1/2 のバックアップ</li>
<li>FUSE のバックアップ</li>
</ul>
<p>など（ここにかいたのはほんの一部）ができる。</p>
<p>最も使うのは CFW の起動と NAND のバックアップだと思います。特に NAND のバックアップは万が一のブリックに備えて必ずとっておくこと。</p>
<h3 id="brick" tabindex="-1"><a class="header-anchor" href="#brick" aria-hidden="true">#</a> Brick</h3>
<p>Brick（ブリック）とはレンガのこと。</p>
<p>起動しなくなり、復旧もできずに詰んだ状態を指します。</p>
<p>起動できないただの置き物と化すので、海外ではこの状態をレンガと例えて Brick と呼びます。</p>
<p>NAND のバックアップを取っていないと、Nintendo Switch はブリックする可能性があります。</p>
<p>ただ、RCM は BootROM が起動できれば必ず起動できる（しかも BootROM は読み込み専用なのでソフトウェア的な改造で壊れる心配がない）ので、ハードウェア的にぶっ壊れない限りは NAND のバックアップがあれば必ず復元できます。</p>
<h2 id="cfw" tabindex="-1"><a class="header-anchor" href="#cfw" aria-hidden="true">#</a> CFW</h2>
<p>カスタムファームウェアのこと。</p>
<p>公式が配布しているシステムファームウェアを改造して自作プログラムが動作するようにしたもの。当然、公式は未公認なのでインストールしているのがバレると本体の修理を拒否されたりします。</p>
<p>CFW としては Atmosphere や SXOS などが有名ですね。</p>
<h3 id="atmosphere" tabindex="-1"><a class="header-anchor" href="#atmosphere" aria-hidden="true">#</a> <a href="https://github.com/Atmosphere-NX/Atmosphere/releases" target="_blank" rel="noopener noreferrer">Atmosphere<OutboundLink/></a></h3>
<p>Github で公開されているオープンソースの CFW のこと。</p>
<p>更新がものすごく速いことで有名です。</p>
<h3 id="deepsea" tabindex="-1"><a class="header-anchor" href="#deepsea" aria-hidden="true">#</a> <a href="https://github.com/Team-Neptune/DeepSea/releases" target="_blank" rel="noopener noreferrer">DeepSea<OutboundLink/></a></h3>
<p>Micro SD に展開するだけで CFW（Atmosphere）が起動する環境が整えられるパッケージのこと。</p>
<h3 id="stock" tabindex="-1"><a class="header-anchor" href="#stock" aria-hidden="true">#</a> Stock</h3>
<p>LFS が動作しない状態の CFW のこと。</p>
<p>当然、FTP などのプラグインも全て動作しない。</p>
<p>OFW と殆ど意味は同じだが、こちらは RCM を経由して起動する点が異なる。</p>
<p>また、RCM を経由するのでヒューズチェックをバイパスできるのも特徴。</p>
<h3 id="ofw" tabindex="-1"><a class="header-anchor" href="#ofw" aria-hidden="true">#</a> OFW</h3>
<p>公式のファームウェアのこと。</p>
<p>RCM を経由せずに起動すると必ず SYSNAND の OFW が起動します。</p>
<h3 id="fuse" tabindex="-1"><a class="header-anchor" href="#fuse" aria-hidden="true">#</a> Fuse</h3>
<p>ニンテンドースイッチは CPU 内にヒューズシステムが備わっており、システムアップデート後に OFW を起動することでヒューズが焼かれる仕組みがあります。</p>
<p>これにより、一度でも OFW として起動したことがあるバージョンよりも低いバージョンのシステムファームウェアがインストールされている場合に起動しなくなります。</p>
<p>これに関しては GIGAZINE さんがものすごくわかりやすい解説を載せてくれているのでそちらを参照。</p>
<p><a href="https://gigazine.net/news/20180427-switch-prevent-downgrade-blowing-fuses/" target="_blank" rel="noopener noreferrer">ヒューズチェックについて<OutboundLink/></a></p>
<p>ちなみに、RCM から起動すればこのヒューズチェックをバイパスできるので、起動は多少手間ですがいくらでもダウングレードできます。</p>
<p>ただ、低いバージョンだとどのみちオンラインには繋げられないのであまり意味のない機能かもしれません。</p>
<h2 id="nand" tabindex="-1"><a class="header-anchor" href="#nand" aria-hidden="true">#</a> NAND</h2>
<p>ものすごく大雑把にいえば主記憶メモリのことで、ここにデータを保存します。</p>
<p>NAND には DRAM、SRAM、NVRAM など様々な種類があるのだが、ここではニンテンドースイッチの内部メモリとして採用されている NVRAM について論ずる。</p>
<p>はじめに、ニンテンドースイッチの NAND は容量が 32GB で固定です。</p>
<p>システムが予約していて使えない領域があるので、実際にユーザが使えるのは 23GB くらいです。なのでダウンロード版のスマブラ SP などを本体にインストールするとそれだけでかなり容量を使ってしまいます。</p>
<p>NAND はそれぞれの本体で固有のものですので、別のスイッチの NAND を流用したりはできません。別のスイッチの NAND でリストアすればブリックします。</p>
<p><a href="https://switchbrew.org/wiki/Flash_Filesystem" target="_blank" rel="noopener noreferrer">NAND File System<OutboundLink/></a></p>
<h3 id="sysnand" tabindex="-1"><a class="header-anchor" href="#sysnand" aria-hidden="true">#</a> SYSNAND</h3>
<p>システムの NAND のことで、OFW で起動すれば必ず SYSNAND が読み込まれます。</p>
<h3 id="emunand" tabindex="-1"><a class="header-anchor" href="#emunand" aria-hidden="true">#</a> EMUNAND</h3>
<p>NAND のエミュレートのことで、本体の NAND をバックアップしてあたかも SYSNAND で起動しているかのように見せかける仕組み、またはその NAND のバックアップのことを指します。</p>
<p>EMUNAND をつかうことで CFW と OFW でセーブデータをわけることができるので、CFW で改造されてしまった不正なセーブデータを使って OFW でオンラインに繋いでしまう心配がなくなります。</p>
<p>EMUNAND 作成には最低でも SYSNAND と同じ 32GB の空き容量を必要とするので 64GB 以上の Micro SD が必要です。</p>
<p>CFW を使っている以上は所持しているゲームを NSP に変換して SD カードにインストールすると思うので、当サイトでは 128GB 以上の Micro SD の購入を推奨しています。</p>
<h2 id="lfs" tabindex="-1"><a class="header-anchor" href="#lfs" aria-hidden="true">#</a> LFS</h2>
<p>Layered File System の略で、簡単にいえば本来のファイルシステムを上書きするような仕組みのこと。</p>
<p>CFW ではこれが有効になっているので、本来のファイルを上書きして MOD パッチをあてたりチートしたりすることができる。</p>
<h3 id="exefs" tabindex="-1"><a class="header-anchor" href="#exefs" aria-hidden="true">#</a> ExeFS</h3>
<p>LFS を使って置き換えるファイルのうち、メインメモリ上の実行ファイル置き換えるもの。</p>
<p>IPSwitch や Edizon でのチートはこちらを用いる。</p>
<h3 id="romfs" tabindex="-1"><a class="header-anchor" href="#romfs" aria-hidden="true">#</a> RomFS</h3>
<p>LFS を使って置き換えるファイルのうち、参照されるファイルを置き換えるもの。</p>
<p>例えば、本来はりんごのテクスチャを読み込むはずなのに、りんごのテクスチャ自体の中身をバナナのテクスチャに置き換えたりする。</p>
<p>MOD パッチやファイル置換などはこちらを用いる。</p>
<h2 id="ファイルフォーマット" tabindex="-1"><a class="header-anchor" href="#ファイルフォーマット" aria-hidden="true">#</a> ファイルフォーマット</h2>
<p><img src="https://camo.githubusercontent.com/7dfd603996ab7df93455f5958fc164198308ed82/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3435313138353134393033323532393933302f3438323639333939303234303438353432392f5377697463685f47616d655f466f726d6174732e6a7067" alt=""></p>
<h3 id="xci" tabindex="-1"><a class="header-anchor" href="#xci" aria-hidden="true">#</a> XCI</h3>
<p>アイコン・タイトル・ゲームなど全てのデータが一つにまとめられたゲームカートリッジをダンプしたファイルのこと。</p>
<p>アップデートが含まれている場合もある。</p>
<p>XCI から直接ゲームを起動できるのは有料 CFW である SXOS だけなので、その他の CFW では eShop 形式である NSP に変換する必要がある。</p>
<h3 id="nsp" tabindex="-1"><a class="header-anchor" href="#nsp" aria-hidden="true">#</a> NSP</h3>
<p>アイコン・タイトル・ゲームなど全てのデータが一つにまとめられたファイルのこと。</p>
<p>NSP は eShop 形式なので、CFW では抽出した XCI から変換してインストールされた NSP ををあたかもダウンロード版のようにして起動する。</p>
<p>NSP はインストール時にその情報が本体に刻まれるので NAND がクリーンな状態でなくなるので、NAND が汚れるなどといったりする。</p>
<p>NSP をインストールする前に必ずクリーンな NAND のバックアップをとっておきましょう。</p>
<h3 id="nca" tabindex="-1"><a class="header-anchor" href="#nca" aria-hidden="true">#</a> NCA</h3>
<p>ZIP 形式のようにいろんなファイルを格納した生データのこと。</p>
<p>これを解凍すればゲームを構成するファイル全てを見ることができます。</p>
<p>解凍には Title Key が必要なので Lockpick などで鍵を取り出す必要があります。</p>
<h3 id="nso" tabindex="-1"><a class="header-anchor" href="#nso" aria-hidden="true">#</a> NSO</h3>
<p>ニンテンドースイッチにおける実行ファイルのこと。</p>
<p>Windows における exe ファイルというと伝わりやすいかもしれない。</p>
<p>ゲームを解析するときには NSO を ELF と呼ばれる形式に変換することが多いです。</p>
<p><a href="https://switchbrew.org/wiki/NSO" target="_blank" rel="noopener noreferrer">NSO File System<OutboundLink/></a></p>
<h3 id="elf" tabindex="-1"><a class="header-anchor" href="#elf" aria-hidden="true">#</a> ELF</h3>
<p>NSO を<a href="https://github.com/tkgstrator/nx2elf/releases" target="_blank" rel="noopener noreferrer">nx2elf<OutboundLink/></a>で復号したファイルのことで、アセンブラで書かれている中間ファイル。</p>
<p>NSO よりも解析しやすいが、NSO を直接読み込める NSO Loader などもあるので好きな方を使えばいいと思います。</p>
</template>
