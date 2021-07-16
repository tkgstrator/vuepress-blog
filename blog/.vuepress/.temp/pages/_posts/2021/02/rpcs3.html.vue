<template><h2 id="ps3-エミュレータ" tabindex="-1"><a class="header-anchor" href="#ps3-エミュレータ" aria-hidden="true">#</a> PS3 エミュレータ</h2>
<p>最近だとニンテンドースイッチのエミュレータの開発が進んでいますが、そういえば PS3 エミュレータはどのくらい進化したのか気になったので実際に遊んでみることにしました。</p>
<p>最初に PS3 エミュレータがでたときはゴリゴリのハイスペックパソコンでやっとカクカクで動くといったレベルだったのですが、さて今のエミュレータはどんな感じなんでしょうか。</p>
<p>PS3 が 35880 円って、新品の PS4 より高くないですか？</p>
<h3 id="推奨スペック" tabindex="-1"><a class="header-anchor" href="#推奨スペック" aria-hidden="true">#</a> 推奨スペック</h3>
<ul>
<li>CPU
<ul>
<li>Intel 4 コア 8 スレッドか 6 コア以上（Haswell 以降）</li>
<li>AMD 6 コア 12 スレッドか 8 コア以上（Ryzen のみ）</li>
</ul>
</li>
<li>GPU
<ul>
<li>AMD か NVIDIA で Vulkan に互換性がある GPU</li>
</ul>
</li>
<li>MEM
<ul>
<li>8GB 以上</li>
</ul>
</li>
<li>という感じなので、やはりそれなりのスペックは要求されるものの以前に比べるとかなり一般的なパソコンでも動作するようです。</li>
</ul>
<h3 id="動作リスト" tabindex="-1"><a class="header-anchor" href="#動作リスト" aria-hidden="true">#</a> 動作リスト</h3>
<p>公式ページによると、動作リストは次のように分類されているらしい。</p>
<ul>
<li>Playable（59.65%）
<ul>
<li>グリッチなどがなく、最後まで遊べる</li>
</ul>
</li>
<li>Ingame（33.63%）
<ul>
<li>深刻なグリッチや十分でないパフォーマンスで最後まで遊べない</li>
</ul>
</li>
<li>Intro（6.38%）
<ul>
<li>映像が表示されるがメニューまで進めない</li>
</ul>
</li>
<li>Loadable（0.25%）
<ul>
<li>画面が真っ黒のままだが、フレームレートは表示される</li>
</ul>
</li>
<li>Nothing（0.09%）
<ul>
<li>何も起こらない</li>
</ul>
</li>
</ul>
<p>というわけで、最後まで遊べるかどうかはわからないものの全体の 93%以上のゲームは「一応遊べる」レベルでは動作することがわかります。</p>
<p>動作リストの詳細は以下から見れます。</p>
<p><a href="https://rpcs3.net/compatibility" target="_blank" rel="noopener noreferrer">RPCS3 - Compatibility List<OutboundLink/></a></p>
<h2 id="導入方法" tabindex="-1"><a class="header-anchor" href="#導入方法" aria-hidden="true">#</a> 導入方法</h2>
<p>今回は無駄な高画質化設定とか、キーコンフィグの設定とかはおいておいて、ゲームを起動させるまでのチュートリアルを解説します。</p>
<h3 id="rpcs3" tabindex="-1"><a class="header-anchor" href="#rpcs3" aria-hidden="true">#</a> RPCS3</h3>
<p>まずはエミュレータ本体である RPCS3 をダウンロードします。</p>
<p>Windows か Linux でしか動作しないので注意。</p>
<p><a href="https://rpcs3.net/download" target="_blank" rel="noopener noreferrer">RPCS3 - Download<OutboundLink/></a></p>
<p>ダウンロードしたら圧縮ファイルを解凍してから起動しましょう。</p>
<h3 id="ps3updat-pup" tabindex="-1"><a class="header-anchor" href="#ps3updat-pup" aria-hidden="true">#</a> PS3UPDAT.PUP</h3>
<p>次に、PS3 のファームウェアをダウンロードします。</p>
<p>PS3 のファームウェアは公式で配布されているのでありがたく頂戴します。</p>
<p><a href="https://www.playstation.com/en-us/support/hardware/ps3/system-software/" target="_blank" rel="noopener noreferrer">PS3 System software<OutboundLink/></a></p>
<p>ダウンロードができたら、RPCS3 のメニューから「File」-&gt;「Install Firmware」を選択してインストールします。</p>
<p>二分くらいで終わるので待ちましょう。</p>
<h2 id="rom-の吸い出し方法" tabindex="-1"><a class="header-anchor" href="#rom-の吸い出し方法" aria-hidden="true">#</a> ROM の吸い出し方法</h2>
<p>今はパソコンのドライブからもゲームを吸い出せる場合があるようですが、自分は改造済みの PS3 を持っているので Multiman を使ってゲームを吸い出しました。</p>
<p><img src="https://pbs.twimg.com/media/EtCUEojUUAQzDtD?format=png" alt=""></p>
<p>PS3 からパソコンにコピーするには FTP を使うしかないのですが（USB は FAT32 にしか対応しておらず、4GB 以上のゲームは分割されてしまう）、FTP でファイルをコピーするときはフォルダとしてコピーするより ISO としてコピーしたほうが速いです。</p>
<p>ただ、Multiman でゲームのバックアップをとると一旦フォルダに展開されてしまうので再度 ISO に圧縮するという方法をとりました。</p>
<p><img src="https://pbs.twimg.com/media/EtCUFyUU0AEfFz0?format=png" alt=""></p>
<p>注意点としてはゲームを Mutliman の XMB から直接 ISO 化するのではなく、ファイルマネージャーを使ってフォルダを ISO 化したほうが良いということです。</p>
<p>そうしないと、ゲーム名に日本語が入っている場合にファイルが文字化けしてしまいいろいろとめんどくさいことになります。</p>
<p><img src="https://pbs.twimg.com/media/EtCUGNyVcAUF5uE?format=png" alt=""></p>
<p>ISO 化してペーストを選択すると ISO イメージを作成してくれます。</p>
<p><img src="https://pbs.twimg.com/media/EtCUHd2VEAMcFMF?format=png" alt=""></p>
<p>7GB 弱のゲームで 11 分ほどかかったので、30 分くらいあればどんなゲームでもバックアップできるのではないかと思います。</p>
<p><img src="https://pbs.twimg.com/media/EtDDcasU4AISgUU?format=png" alt=""></p>
<p>バックアップができたら FTP でパソコンに転送します。</p>
<p><img src="https://pbs.twimg.com/media/EtCXB3xUYAAt5wP?format=png" alt=""></p>
<p>全部で 40GB くらいあったので転送には 1 時間ちょっとかかりました。ここも注意点としては PS3 は有線接続をしたほうがいいです。速度が 10 倍くらい違うので、有線接続をしましょう！！！！</p>
<p>で、このコピーした ISO イメージなのですが RPCS3 は ISO イメージを読み込めないので全部フォルダとして展開します。</p>
<p>展開できたら、フォルダごと RPCS3 にドラッグアンドドロップすればゲームを読み込んでくれます。</p>
<p><img src="https://pbs.twimg.com/media/EtDDdneU4AIVulM?format=png" alt=""></p>
<h2 id="アップデータ" tabindex="-1"><a class="header-anchor" href="#アップデータ" aria-hidden="true">#</a> アップデータ</h2>
<p>PS3 はニンテンドースイッチとは違って認証無しでアップデータをとってこれるので、とってくることにします。</p>
<p>いろいろソフトはあるのですが個人的には PS3 Game Updater 1.41 がめちゃくちゃわかりやすくてオススメです。</p>
<p><a href="https://www.mediafire.com/file/zfhemfd1np43trz/PS3_Game_Updater_1.41.rar/file" target="_blank" rel="noopener noreferrer">PS3 Game Updater 1.41<OutboundLink/></a></p>
<p>ネットの広大な海を彷徨っていると、自分が使っているやつと同じソフトがミラーとしてアップロードされていたので紹介しておきます。</p>
<p><img src="https://pbs.twimg.com/media/EtGMpOYVEAE1lpg?format=png" alt="">
<img src="https://pbs.twimg.com/media/EtGM_wSU4Akp0b4?format=png" alt=""></p>
<p>アップデータは PKG として保存されるので、HDD などに保存しておきましょう。</p>
<h3 id="アップデータのインストール" tabindex="-1"><a class="header-anchor" href="#アップデータのインストール" aria-hidden="true">#</a> アップデータのインストール</h3>
<p><img src="https://pbs.twimg.com/media/EtGNFwiVcAQv9uO?format=png" alt=""></p>
<p>アップデータのインストールは RPCS3 の「File」から「Install Packages/Raps」で行えます。</p>
<p><img src="https://pbs.twimg.com/media/EtGNLYrVgAAUVYU?format=png" alt=""></p>
<p>一度に複数の PKG がインストールできるので便利です。</p>
<h3 id="dlc" tabindex="-1"><a class="header-anchor" href="#dlc" aria-hidden="true">#</a> DLC</h3>
<p>DLC（ダウンロードコンテンツ）は一般には配布されていないので PSN から直接ダウンロードする必要がありますが、PSN からの購入には PSN アカウントの認証があるため直接やろうとするといろいろな法律に引っかかりそうです。</p>
<p>自分は過去にやった方法は PS3 本体で PSN にアクセスして DLC をダウンロードし、CFW をインストールしてから reActPSN を使って RAP ファイル（DLC の認証データのようなもの）を PKG にバックアップするという方法でした。</p>
<p>reActPSN 自体が使い方がよくわからん（むずかしい）上に、かなりめんどくさい手順なのでオススメはしないです。</p>
<p>実機の場合は正しくパッケージングした DLC であっても有料コンテンツの場合は reActPSN を使わないと有効化できなかったのですが、RPCS3 の場合はインストールするだけで有効化できました。</p>
<p><img src="https://pbs.twimg.com/media/EtDvhL-VEAMxwEp?format=png" alt=""></p>
<p>有効化されたアーシャのアトリエ DLC のオディーリアさん</p>
<p>その点はすごく便利だなと思いました。</p>
<p>ちなみに、スイッチや PS4 向けの DX 版には最初から全ての DLC が同梱されているので、わざわざ今更 PS3 版を買う必要はないです。</p>
<h2 id="セーブデータ" tabindex="-1"><a class="header-anchor" href="#セーブデータ" aria-hidden="true">#</a> セーブデータ</h2>
<p>RPCS3 のセーブデータは<code>dev_hdd0/home/00000001/savedata</code>内にあるのですが、実機と違って暗号化がされていません。本来であれば PARAM.SFO、SAVE-DATA、PARAM.PFD の三つのファイルが必要なのですが、RPCS3 ではハッシュ用の PARAM.PFD がありません。</p>
<p>で、某掲示板によれば実機のセーブデータを RPCS3 に移植するのはコピーするだけと言われたのでバックアップをコピーしたら読み込みと同時にエミュレータがクラッシュしました。</p>
<p>ちなみに、<code>F {PPU[0x1000000] Thread (main_thread) [0x0048c8f8]} VM: Access violation reading location 0x8000003f (unmapped memory) [type=u32]</code>っていうエラーが表示されました。</p>
<p>で、どうも SAVE-DATA が暗号化されていることが原因ではないかという結論に至ったので BruteforceSaveData を使って復号することにしました。</p>
<p><a href="https://digiex.net/threads/ps3-bruteforce-save-data-v4-6-download.13884/" target="_blank" rel="noopener noreferrer">PS3 Bruteforce Save Data v4.6 Download<OutboundLink/></a></p>
<p>これが効いたのかどうかはよくわからないのですが、セーブデータを Decrypt するとちゃんと読み込むことができるようになりました。</p>
<p><img src="https://pbs.twimg.com/media/EtDshQPVEAQ9y63?format=png" alt=""></p>
<p>よくわからんけど読み込みに成功した実機セーブデータ</p>
<h2 id="実際に遊んでみた" tabindex="-1"><a class="header-anchor" href="#実際に遊んでみた" aria-hidden="true">#</a> 実際に遊んでみた</h2>
<p>@<a href="https://www.youtube.com/watch?v=-_ZPXH4iL_8" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<h3 id="コントローラについて" tabindex="-1"><a class="header-anchor" href="#コントローラについて" aria-hidden="true">#</a> コントローラについて</h3>
<p>PS3 のコントローラは失くしてしまったので代わりにプロコンを使いました。</p>
<p><a href="https://github.com/Davidobot/BetterJoy/releases" target="_blank" rel="noopener noreferrer">BetterJoy<OutboundLink/></a></p>
<p>BetterJoy というソフトをつかえば有線接続という条件はあるもののメチャクチャ簡単に接続できました。ちなみに、Blutooth 接続であれば BetterJoy は不要です。</p>
<p>設定から XInput を選べば何も設定せずに、想定通りの動きをしてくれます。</p>
<p><img src="https://pbs.twimg.com/media/EtGZueoVcAMVpzl?format=png" alt=""></p>
<h3 id="画質の上げ方" tabindex="-1"><a class="header-anchor" href="#画質の上げ方" aria-hidden="true">#</a> 画質の上げ方</h3>
<p>折角エミュレータを使うのですから、画質のアップにもチャレンジしてみましょう。</p>
<p>設定から GPU の項目を弄るだけなので簡単ですが、GPU の設定なのに画質を上げると CPU 使用率が上がります。つまり、どこまで画質を上げられるかは CPU の性能に引っかかってくるということです。</p>
<p><img src="https://pbs.twimg.com/media/EtGd8SHUYAQSE13?format=png" alt=""></p>
<ul>
<li>Renderer
<ul>
<li>Vulkan で良い</li>
</ul>
</li>
<li>Graphics Device
<ul>
<li>GPU を選択</li>
</ul>
</li>
<li>Anisotropic Filter
<ul>
<li>16x を選択（ただし重いので Auto でも良い）</li>
</ul>
</li>
<li>Default Resolution
<ul>
<li>ウィンドウサイズなので何でも良い</li>
</ul>
</li>
<li>Resolution Scale
<ul>
<li>3D の内部スケール解像度</li>
<li>ここを大きくすればするほど、3D 表示がキレイになる</li>
<li>スペックの許す限り上げるとよいが 1080p 以上は上げてもそこまで変わらない</li>
</ul>
</li>
<li>Resolution Scale Threshold
<ul>
<li>いじらないほうが良いらしい</li>
</ul>
</li>
</ul>
<p>@<a href="https://www.youtube.com/watch?v=XGXHrmfQrzs" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p><strong>1080p vs 720p</strong></p>
<p>かなり見た目が違うので、ここは可能であれば解像度を上げておきたい。</p>
<p><strong>2160p vs 1080p</strong></p>
<p>見た目ではそこまで変わらないような気もするが、うちは 4K モニタを使っているので 4K で実際にプレイしてみるとネイティブ 4K と 2K のアップコンバートではかなり違いがでる。</p>
<p>どちらにせよ、4K モニタを使っていないのであればここまでの画質は不要かも。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>エスカ&amp;ロジーのアトリエについてはほとんど実機と変わらない環境でプレイすることができた。</p>
<p>プロコンが使える点と、スケーリングによる解像度の向上を考えるとエミュレータで遊ぶのも悪くない選択肢だと思いました（特に PS3 は HDCP に対応しておらず、スプリッタなしでキャプチャできないなどの制限もある）</p>
<p>エミュレータ自体の導入のハードルは低いとはいえ、そもそも PS3 を改造するのが若干ハードルが高いことと、要求されるパソコンのスペックがそれなりに必要なこと、ゲームのバックアップを取るのがちょいとめんどくさいことを考えると、誰しもがおいそれと手を出せるものではないでしょう。</p>
<p>ただ、もしも改造済み PS3 が手元にあるのなら（PS3 を改造できるレベルで知識があるのなら）、一度はやってみるのも悪くないと思いました。</p>
<p>記事は以上。</p>
</template>
