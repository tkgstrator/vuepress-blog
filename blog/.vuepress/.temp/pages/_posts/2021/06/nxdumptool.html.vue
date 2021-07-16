<template><h1 id="nxdumptool" tabindex="-1"><a class="header-anchor" href="#nxdumptool" aria-hidden="true">#</a> <a href="https://github.com/DarkMatterCore/nxdumptool/releases" target="_blank" rel="noopener noreferrer">NXDumpTool<OutboundLink/></a></h1>
<blockquote>
<p>この記事は以前公開していたものを加筆・修正したものになります</p>
</blockquote>
<p>ニンテンドースイッチ本体のみでゲームカートリッジやアップデータからデータを抽出することができるツールです。</p>
<p>利用にあたっては事前に<a href="https://github.com/shchmue/Lockpick_RCM/releases" target="_blank" rel="noopener noreferrer">LockPick_RCM<OutboundLink/></a>で title.key 及び prod.key を取得する必要があるのでやっておきましょう。スイッチ上で実行するだけでよくて、特にファイルを移動させたりする必要はありません。</p>
<p>LockPick_RCM の使い方については<a href="">この記事</a>を参考にしてください。</p>
<blockquote>
<p>現在加筆・修正中になります</p>
</blockquote>
<h2 id="ticket-証明書" tabindex="-1"><a class="header-anchor" href="#ticket-証明書" aria-hidden="true">#</a> Ticket（証明書）</h2>
<p>Ticket はゲームカードごとに固有のものであり、ゲームのインストール時に本体に保存されます。</p>
<p>固有のものであるということは、同時に二つの Ticket を持つ NSP がオンラインプレイをしていれば一方がコピーされたものであることがわかります。つまり、海賊行為は容易に任天堂に BAN されます。</p>
<p><img src="https://pbs.twimg.com/media/EW5mDtsX0AM4y6P?format=png" alt=""></p>
<p>Goldleaf の場合、インストール時に<code>The NSP has a ticket to be imported</code>とあれば取り込むための証明書が NSP に含まれていることを意味します。</p>
<p><img src="https://pbs.twimg.com/media/EW5mDYIXkAAJ5Kt?format=png" alt=""></p>
<p>証明書が NSP に含まれていない場合、<code>The NSP doesn't have a ticket</code>と表示されます。</p>
<p>このような NSP は Sigpatch と呼ばれる特別なパッチを当てていない限り、インストールすることはできません。</p>
<h2 id="base-のダンプ" tabindex="-1"><a class="header-anchor" href="#base-のダンプ" aria-hidden="true">#</a> BASE のダンプ</h2>
<p>カートリッジに書き込まれているゲームデータは（おそらく大半が）BASE と呼ばれるアップデータが適応されていない初期バージョン（v0）になります。</p>
<p>このバージョンのことを BASE といい、アップデートされたゲームで遊ぶためには必ず BASE と遊びたいバージョンの UPD（アップデータ）が必要になります。</p>
<p>つまり、カートリッジを使わないのであれば BASE のダンプは必ず必要になります。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>カートリッジ版のオリジナルを持っている場合は、カートリッジ（BASE）+ UPD という組み合わせでも起動できます。</p>
<p>が、今回は完全にカートリッジレスな環境をつくることを目的としたため BASE も NSP としてインストールすることを考えます。</p>
</div>
<p><img src="https://pbs.twimg.com/media/E3fAbbsUUAEK7Bc?format=png" alt=""></p>
<p>起動するとこんな画面がでてくると思います。カートリッジからダンプしたい場合は<code>Dump gamecard content</code>を選択します。ダウンロード版の場合は<code>Dump installed SD card / eMMC content</code>を選択します。</p>
<p>今回はダウンロード版の場合の解説をしますが、カートリッジ版とほとんど同じです。</p>
<p><img src="https://pbs.twimg.com/media/E3fAbbuVEAATtBj?format=png" alt=""></p>
<p>ではスプラトゥーンの BASE をダンプしてみましょう。</p>
<p><img src="https://pbs.twimg.com/media/E3fAbcFVcAA2cwK?format=png" alt=""></p>
<p>選択するとこのような画面が表示されると思うのですが<code>Nintendo Submission Package (NSP) dump</code>を選択します。</p>
<p><img src="https://pbs.twimg.com/media/E3fAcoVVUAETe6y?format=png" alt=""></p>
<p>ここで、もし BASE も UPD もインストールされている場合は選択肢が表示されます。</p>
<ul>
<li><code>Dump base application NSP</code>
<ul>
<li>BASE のダンプ</li>
</ul>
</li>
<li><code>Dump installed update NSP</code>
<ul>
<li>UPD/DLC のダンプ</li>
</ul>
</li>
</ul>
<p>今回は BASE をダンプするので上の<code>Dump base application NSP</code>を選択します。</p>
<h3 id="設定項目" tabindex="-1"><a class="header-anchor" href="#設定項目" aria-hidden="true">#</a> 設定項目</h3>
<p><img src="https://pbs.twimg.com/media/E3fAco9VEAE04i1?format=png" alt=""></p>
<div class="custom-container warning"><p class="custom-container-title">BASE のダンプについて</p>
<p>紫色の字で<code>Dump base application NSP</code>と表示されていることを確認してください。</p>
</div>
<p>ここでいろいろオプションがあってわかりにくいと思うのでそれぞれ解説します。</p>
<ul>
<li><code>Start NSP dump process</code>
<ul>
<li>NSP のダンプを開始します</li>
</ul>
</li>
<li><code>Split outpuot dump (FAT32 support)</code>
<ul>
<li>SD カードが FAT32 でフォーマットされている場合、4GB 以上のファイルは保存できないのでファイルを分割して保存するオプションです</li>
</ul>
</li>
<li><code>Verify dump using No-Intro database</code>
<ul>
<li>NSP が正しくダンプできているかをチェックするオプションです</li>
</ul>
</li>
<li><code>Remove console specific data</code>
<ul>
<li>コンソール固有データを削除します</li>
<li>より具体的には personalized ticket を common ticket に切り替えます</li>
<li>よくわからない人は Yes にしておけば大丈夫です</li>
</ul>
</li>
<li><code>Generage ticket-less dump</code>
<ul>
<li><code>Remove console specific data</code>を Yes にすると表示されます</li>
<li>Ticket を含まない NSP を出力します</li>
<li>よくわからない人はで No にしておけば大丈夫です</li>
</ul>
</li>
<li><code>Change NPDM RSA key/sig in Program NCA</code>
<ul>
<li>どんな CFW でも NSP が正しく動作するためのオプション</li>
<li>無効化すると追加で ACID パッチが必要になる</li>
<li>よくわからない人は Yes にしておけば大丈夫です</li>
</ul>
</li>
<li><code>Dump delta fragments</code>
<ul>
<li><code>Remove console specific data</code>を Yes にすると表示されます</li>
<li>よくわからないんですが、多分 No で大丈夫です</li>
</ul>
</li>
<li><code>Base application to dump</code>
<ul>
<li>弄れないので大丈夫</li>
</ul>
</li>
<li><code>Output naming scheme</code>
<ul>
<li>出力ファイルの命名規則</li>
<li>特にいじらなくて大丈夫です</li>
</ul>
</li>
</ul>
<p>それぞれ設定できたら<code>Start NSP dump process</code>でダンプを開始しましょう。</p>
<h2 id="upd-dlc-のダンプ" tabindex="-1"><a class="header-anchor" href="#upd-dlc-のダンプ" aria-hidden="true">#</a> UPD/DLC のダンプ</h2>
<p>BASE をダンプするときとほとんど同じです。</p>
<p><img src="https://pbs.twimg.com/media/E3fGlXgVcAIPDmR?format=png" alt=""></p>
<p>設定は変えなくて良いでしょう。</p>
<div class="custom-container warning"><p class="custom-container-title">アップデータのダンプについて</p>
<p>紫色の字で<code>Dump installed update NSP</code>と表示されていることを確認してください。</p>
</div>
<h2 id="ダンプしてみた" tabindex="-1"><a class="header-anchor" href="#ダンプしてみた" aria-hidden="true">#</a> ダンプしてみた</h2>
<p>ダンプしたデータは<code>/switch/NXDumpTool/NSP</code>内にありますので確認してみてください。</p>
<p>あとはこのデータ FTP なり直接 SD カードを PC に接続するなりでパソコン内のストレージに保存しておけばよいでしょう。</p>
<h3 id="nsz-との比較" tabindex="-1"><a class="header-anchor" href="#nsz-との比較" aria-hidden="true">#</a> NSZ との比較</h3>
<p>NSZ とは NSP を圧縮したパッケージファイルであり、実質的には NSP と同じものです。</p>
<p>NSP を NSZ にすることでだいたい 10 ~ 20%ほどの容量を節約することができますが、その代償としてインストール時に圧縮状態を解除する必要があるため余計に時間がかかります。</p>
<p>要するに、時間と容量のトレードオフ関係ということです。昨今はストレージの大容量化が進んでいるため、NSP をわざわざ NSZ に圧縮する必要はないと考えています。</p>
<p>@<a href="https://www.youtube.com/watch?v=UEq7PZuhoSI" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>記事は以上。</p>
</template>
