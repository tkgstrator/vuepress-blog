<template><h2 id="nintendo-switch-hack" tabindex="-1"><a class="header-anchor" href="#nintendo-switch-hack" aria-hidden="true">#</a> Nintendo Switch Hack</h2>
<div class="custom-container danger"><p class="custom-container-title">オンラインプレイについて</p>
<p>CFW が起動した状態で絶対にニンテンドーネットワークに接続してはいけません。ニンテンドーオンラインの規約違反なだけでなく、不正アクセス等の法令に違反する恐れがあります。</p>
<p>CFW でインターネットに接続する際は 90DNS を必ず使うようにしてください。</p>
</div>
<p>90DNS の設定方法は以下の記事を参考にしてください。</p>
<h2 id="cfw-の導入" tabindex="-1"><a class="header-anchor" href="#cfw-の導入" aria-hidden="true">#</a> CFW の導入</h2>
<p>現在の CFW の環境は DeepSea + EmuMMC が主流です。</p>
<div class="custom-container tip"><p class="custom-container-title">何故 DeepSea を使うのですか</p>
<p>CFW は Atmosphere が更新が早く、一番使われています。</p>
<p>ただ、Atmosphere 単体では他のツール等が入っておらず、初心者の方は使い勝手が悪いです。DeepSea は Atmosphere やその他の便利なツールが一括になっているオールインワンパケージであり、ファイルを解凍してコピーするだけで導入できるのが特徴です。</p>
</div>
<p>ただし、DeepSea は悪い言い方をすればいろいろなツールをまとめただけであり、そのため開発者からはあまり好まれていません。</p>
<div class="custom-container tip"><p class="custom-container-title">何故 EmuMMC を使うのですか</p>
<p>通常の状態ではニンテンドースイッチは SysNAND と呼ばれる本体の NAND からファームウェアやその他のデータを読み出して起動しています。</p>
<p>しかしこの状態では NSP をインストールなどすると本体の NAND に改造した痕跡などが残ってしまい（これを NAND が汚れるなどといいます）、万が一物理的に（改造等が原因ではなく）ニンテンドースイッチが起動不可能になってしまった場合、改造の痕跡を発見されて任天堂に修理を拒否されてしまう可能性があります。</p>
<p>EmuMMC は SD カード上に仮想の NAND を作成することで環境を完全に切り分けることができるので、SD カードさえ抜いてしまえばクリーンな状態にいつでも戻すことができます。</p>
</div>
<p>ただし、EmuMMC 自体には BAN を回避するような仕組みは備わっておらず、EmuMMC であっても 90DNS の設定は必須です。</p>
<p>もしも初めてニンテンドースイッチの改造に挑戦しようとしているのであれば DeepSea + EmuMMC の環境構築をすることを強くオススメします。</p>
<h3 id="deepsea-の導入" tabindex="-1"><a class="header-anchor" href="#deepsea-の導入" aria-hidden="true">#</a> DeepSea の導入</h3>
<h3 id="emummc-の導入" tabindex="-1"><a class="header-anchor" href="#emummc-の導入" aria-hidden="true">#</a> EmuMMC の導入</h3>
<h2 id="初級編" tabindex="-1"><a class="header-anchor" href="#初級編" aria-hidden="true">#</a> 初級編</h2>
<h3 id="カスタムテーマ" tabindex="-1"><a class="header-anchor" href="#カスタムテーマ" aria-hidden="true">#</a> カスタムテーマ</h3>
<h3 id="ipswitch-でチート適用" tabindex="-1"><a class="header-anchor" href="#ipswitch-でチート適用" aria-hidden="true">#</a> IPSwitch でチート適用</h3>
<h3 id="各種キーのダンプ" tabindex="-1"><a class="header-anchor" href="#各種キーのダンプ" aria-hidden="true">#</a> 各種キーのダンプ</h3>
<p>ニンテンドースイッチはさまざまな鍵が使われていますが、主なものは title.keys と prod.keys の二つです。</p>
<div class="custom-container tip"><p class="custom-container-title">title.keys とは</p>
<p>title.keys にはタイトルキーと呼ばれるキーが保存されています。タイトルキーはゲームのタイトルの固有の値で、NCA を展開するときにはこのキーが必要になります。</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">prod.keys とは</p>
<p>prod.keys にはニンテンドースイッチのプロダクトキーと呼ばれるニンテンドースイッチの本体ごとに固有の鍵が保存されています。本体ごとに固有のため、prod.keys を使い回すことはできません。</p>
</div>
<p>title.keys や prod.keys を保存するには Lockpick を使うのが最も楽です。</p>
<h3 id="ゲームのバックアップ" tabindex="-1"><a class="header-anchor" href="#ゲームのバックアップ" aria-hidden="true">#</a> ゲームのバックアップ</h3>
<p>ゲームのバックアップには HACGUI を使った方法と、NXDumpTool を使った方法があります。</p>
<h3 id="バックアップのインストール" tabindex="-1"><a class="header-anchor" href="#バックアップのインストール" aria-hidden="true">#</a> バックアップのインストール</h3>
<h3 id="sigpatch-installer" tabindex="-1"><a class="header-anchor" href="#sigpatch-installer" aria-hidden="true">#</a> Sigpatch Installer</h3>
<h3 id="edizon" tabindex="-1"><a class="header-anchor" href="#edizon" aria-hidden="true">#</a> Edizon</h3>
<h2 id="中級編" tabindex="-1"><a class="header-anchor" href="#中級編" aria-hidden="true">#</a> 中級編</h2>
<h3 id="deepsea-toolbox" tabindex="-1"><a class="header-anchor" href="#deepsea-toolbox" aria-hidden="true">#</a> DeepSea Toolbox</h3>
<h3 id="pack-ファイル" tabindex="-1"><a class="header-anchor" href="#pack-ファイル" aria-hidden="true">#</a> Pack ファイル</h3>
<h3 id="szs-sarc-ファイル" tabindex="-1"><a class="header-anchor" href="#szs-sarc-ファイル" aria-hidden="true">#</a> SZS/SARC ファイル</h3>
<h3 id="bprm-byml-byaml-ファイル" tabindex="-1"><a class="header-anchor" href="#bprm-byml-byaml-ファイル" aria-hidden="true">#</a> BPRM/BYML/BYAML ファイル</h3>
<h3 id="ゲームのダウングレード" tabindex="-1"><a class="header-anchor" href="#ゲームのダウングレード" aria-hidden="true">#</a> ゲームのダウングレード</h3>
<h3 id="ipswitch-でコード移植" tabindex="-1"><a class="header-anchor" href="#ipswitch-でコード移植" aria-hidden="true">#</a> IPSwitch でコード移植</h3>
<h2 id="上級編" tabindex="-1"><a class="header-anchor" href="#上級編" aria-hidden="true">#</a> 上級編</h2>
<h3 id="スイッチのダウングレード" tabindex="-1"><a class="header-anchor" href="#スイッチのダウングレード" aria-hidden="true">#</a> スイッチのダウングレード</h3>
<h3 id="ステージ移植" tabindex="-1"><a class="header-anchor" href="#ステージ移植" aria-hidden="true">#</a> ステージ移植</h3>
<h3 id="starlight" tabindex="-1"><a class="header-anchor" href="#starlight" aria-hidden="true">#</a> Starlight</h3>
<h3 id="skyline" tabindex="-1"><a class="header-anchor" href="#skyline" aria-hidden="true">#</a> Skyline</h3>
<h3 id="エミュレータ" tabindex="-1"><a class="header-anchor" href="#エミュレータ" aria-hidden="true">#</a> エミュレータ</h3>
</template>
