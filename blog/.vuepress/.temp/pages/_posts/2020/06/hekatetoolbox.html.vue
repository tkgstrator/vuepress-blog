<template><h2 id="hekate-toolbox" tabindex="-1"><a class="header-anchor" href="#hekate-toolbox" aria-hidden="true">#</a> <a href="https://github.com/WerWolv/Hekate-Toolbox/releases" target="_blank" rel="noopener noreferrer">Hekate-Toolbox<OutboundLink/></a></h2>
<p>Hekate-Toolbox または DeepSea-Toolbox からモジュールの切り替えができるのがすごく便利なのですが、よくよく考えたら自分で追加したモジュールのオンオフの切り替えも Hekate-Toolbox でできたら便利じゃないですか？</p>
<h2 id="deepsea-既存のモジュール" tabindex="-1"><a class="header-anchor" href="#deepsea-既存のモジュール" aria-hidden="true">#</a> DeepSea 既存のモジュール</h2>
<h3 id="emuiibo" tabindex="-1"><a class="header-anchor" href="#emuiibo" aria-hidden="true">#</a> <a href="https://github.com/XorTroll/emuiibo/releases" target="_blank" rel="noopener noreferrer">emuiibo<OutboundLink/></a></h3>
<p>アミーボ機能をエミュレートするモジュール。</p>
<p>この機能を使うためには amiibo をダンプし、そのデータを emuiibo 用に変換するなど非常にめんどくさい作業が伴う。普通に amiibo カードを作成するか、そのまま amiibo 読み込んだほうが早い。</p>
<p>というか、この機能使っている人間の 99%は海賊行為をしているだろうと勝手に決めつけているので、emuiibo についての解説はなし。当 HP で emuiibo のトピックを扱っていないのもそれが理由。</p>
<h3 id="tesla-menu" tabindex="-1"><a class="header-anchor" href="#tesla-menu" aria-hidden="true">#</a> <a href="https://github.com/WerWolv/Tesla-Menu/releases" target="_blank" rel="noopener noreferrer">Tesla-Menu<OutboundLink/></a></h3>
<p>ニンテンドースイッチでオーバーレイを使ってチートの有効化などを行えるモジュール。</p>
<p>「L + 十字キー下ボタン + 右スティック押し込み」のコマンドでメニューを表示し、いろいろいじることができます。便利そうですが、使えるメモリが 4MB しかないので何でもできるわけではないことに注意。</p>
<h3 id="nx-ovlloader" tabindex="-1"><a class="header-anchor" href="#nx-ovlloader" aria-hidden="true">#</a> <a href="ttps://github.com/WerWolv/nx-ovlloader/releases">nx-ovlloader</a></h3>
<p>OVL ファイルを読み込むためのモジュール。</p>
<p>Tesla-Menu などはこのモジュールが必要です。</p>
<h3 id="status-monitor-overlay" tabindex="-1"><a class="header-anchor" href="#status-monitor-overlay" aria-hidden="true">#</a> <a href="https://github.com/masagrator/Status-Monitor-Overlay/releases" target="_blank" rel="noopener noreferrer">Status-Monitor-Overlay<OutboundLink/></a></h3>
<p>ハードウェアをリアルタイムで監視するモジュール。</p>
<p>FPS Counter を使用すると、一部のゲームではロード画面が動かなくなったり、音声が飛んだりすることがあるそうですが、めったにないとのことです。</p>
<h3 id="sys-clk" tabindex="-1"><a class="header-anchor" href="#sys-clk" aria-hidden="true">#</a> <a href="https://github.com/retronx-team/sys-clk/releases" target="_blank" rel="noopener noreferrer">sys-clk<OutboundLink/></a></h3>
<p>ニンテンドースイッチをオーバークロックできる機能で、本来はドックに挿している TV モードが一番スペックを高くできるのだが、その制限を解除して携帯モードとかテーブルモードでも CPU のクロック数を上げられるモジュール。</p>
<p>使ったことがないので基本はオフで問題ない。</p>
<h3 id="sys-con" tabindex="-1"><a class="header-anchor" href="#sys-con" aria-hidden="true">#</a> <a href="https://github.com/cathery/sys-con/releases" target="_blank" rel="noopener noreferrer">sys-con<OutboundLink/></a></h3>
<p>純正品以外のサードパーティコントローラを扱うためのモジュール。</p>
<p>使わないのであればずっとオフで問題ない。</p>
<h3 id="missioncontroller" tabindex="-1"><a class="header-anchor" href="#missioncontroller" aria-hidden="true">#</a> <a href="https://github.com/ndeadly/MissionControl/releases" target="_blank" rel="noopener noreferrer">MissionController<OutboundLink/></a></h3>
<p>ニンテンドースイッチ以外の Wii、WiiU、PS4、PS5、Xbox などのコントローラを扱うためのモジュール。</p>
<p>使わないのであればずっとオフで問題ない。</p>
<h3 id="sys-ftpd-light" tabindex="-1"><a class="header-anchor" href="#sys-ftpd-light" aria-hidden="true">#</a> <a href="https://github.com/cathery/sys-ftpd-light/releases" target="_blank" rel="noopener noreferrer">sys-ftpd-light<OutboundLink/></a></h3>
<p>ニンテンドースイッチでポート 5000 を利用して FTP 通信を有効化するモジュールである sys-ftpd の軽量版。メモリ消費量が抑えられているのが特徴。</p>
<p>ドキュメントによると 7MB 程度消費していたメモリが 1MB 程度にまで抑えられるのだとか。</p>
<p>モジュールが利用できるメモリの合計値は結構カツカツなので、こういう軽量化は非常にありがたい。よほどのことがない限り、常時オンで問題ない。</p>
<h3 id="ldn-mitm" tabindex="-1"><a class="header-anchor" href="#ldn-mitm" aria-hidden="true">#</a> <a href="https://github.com/spacemeowx2/ldn_mitm/releases" target="_blank" rel="noopener noreferrer">ldn_mitm<OutboundLink/></a></h3>
<p>LanPlay に対応していないゲームの LocalPlay（アドホックモード）を強制的に LanPlay（LAN モード）に切り替えるモジュール。</p>
<p>スプラトゥーン 2 ではこれを無効化するとイカッチャで LocalPlay（LanPlay は遊べる）が遊べなくなってしまう。</p>
<p>スプラトゥーンで遊ぶ限りは基本はオンで問題ない。</p>
<h2 id="追加すると便利そうなモジュール一覧" tabindex="-1"><a class="header-anchor" href="#追加すると便利そうなモジュール一覧" aria-hidden="true">#</a> 追加すると便利そうなモジュール一覧</h2>
<h3 id="sysdvr" tabindex="-1"><a class="header-anchor" href="#sysdvr" aria-hidden="true">#</a> <a href="https://github.com/exelix11/SysDVR/releases" target="_blank" rel="noopener noreferrer">SysDVR<OutboundLink/></a></h3>
<p>キャプチャーボードなしで USB または LAN 経由で画面キャプチャーをパソコンに転送できるモジュール。すごい便利なのだが、そこそこメモリを消費するのでゲームの動作が不安定になったりするときがあるのが玉に瑕。</p>
<p>sys-ftpd-light と致命的に相性が悪いので、両方オンにしていると結構落ちてしまうので注意。ただ、ちょくちょくアップデートされてるのでだんだん安定化はしている模様。</p>
<p>ちょっとやってみた感じ、Tesla と組み合わせても相当重かったです。まあこれはモジュールの仕様上仕方がないかもしれません。</p>
<p>使うときだけオンにしておくのが良いでしょう。</p>
<h3 id="sys-botbase" tabindex="-1"><a class="header-anchor" href="#sys-botbase" aria-hidden="true">#</a> <a href="https://github.com/olliz0r/sys-botbase/releases" target="_blank" rel="noopener noreferrer">sys-botbase<OutboundLink/></a></h3>
<p>Wi-Fi 経由でコントローラの入力をエミュレートしたり、ゲームのメモリを読み込んだりできるモジュール。</p>
<p>これも結構重いのでオンにするのは使いたいときだけが良い。</p>
<h3 id="usb-botbase" tabindex="-1"><a class="header-anchor" href="#usb-botbase" aria-hidden="true">#</a> <a href="https://github.com/fishguy6564/USB-Botbase/releases" target="_blank" rel="noopener noreferrer">USB-Botbase<OutboundLink/></a></h3>
<p>sys-botabase をベースとして、USB 経由でコントローラの入力をエミュレートできるモジュール。</p>
<p>めちゃくちゃ重たいので他のモジュールをオフにしていないと安定して動作させるのは難しい。ちゃんとしてないとしょっちゅうモジュールがクラッシュして接続できなくなってします。</p>
<p>そういうときはニンテンドースイッチを再起動する以外に対処できないので注意。</p>
<h3 id="sys-netcheat" tabindex="-1"><a class="header-anchor" href="#sys-netcheat" aria-hidden="true">#</a> <a href="https://github.com/jakibaki/sys-netcheat/releases" target="_blank" rel="noopener noreferrer">sys-netcheat<OutboundLink/></a></h3>
<p>LAN 経由でチートの検索などができるモジュール。署名無効化パッチ（sigpatch）と干渉してゲームによっては起動しなくなる場合があるそうなので、その際は Common Ticket を Tinfoil のオプションから削除して再起動すると良いそうだ。</p>
<p>使ったことがないのでまあ全然わからんのだが、人によっては便利かもしれない。</p>
<h3 id="sys-tune" tabindex="-1"><a class="header-anchor" href="#sys-tune" aria-hidden="true">#</a> <a href="https://github.com/HookedBehemoth/sys-tune/releases" target="_blank" rel="noopener noreferrer">sys-tune<OutboundLink/></a></h3>
<p>Tesla overlay を利用してバックグラウンドで音楽を再生することができるモジュール。ただ、M4A は再生できなかったので汎用性はあんまりないかもしれない（MP3 ならいける）</p>
<p>対応している拡張子は MP3、FLAC、WAV の三つ。なんで FLAC サポートしているのかは謎である。</p>
<h2 id="モジュールの有効の仕方" tabindex="-1"><a class="header-anchor" href="#モジュールの有効の仕方" aria-hidden="true">#</a> モジュールの有効の仕方</h2>
<p>モジュールが有効かどうかは<code>sdmc://atmosphere/contents/[TITLE ID]/flags/boot2.flg</code>という空ファイルがあるかないかでチェックしているのですが、このファイルを生成したり削除したりを Hekate-Toolbox がやってくれるというわけです。</p>
<p>コンフィグファイルは<code>sdmc://atmosphere/contents/[TITLE ID]/toolbox.json</code>に JSON 形式で記述されているので自分でちまちま追加しましょう。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"bootsoundnx"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"00FF0000000002AA"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"hid-mitm"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"0100000000000FAF"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"nxsh"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"43000000000000FF"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"ojds-nx"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"0100000000000901"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"sys-botbase"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"430000000000000B"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"USB-Botbase"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"430000000000000B"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"sys-netcheat"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"430000000000000A"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"sys-tune"</span><span class="token punctuation">,</span>
  <span class="token property">"tid"</span><span class="token operator">:</span> <span class="token string">"4200000000000000"</span><span class="token punctuation">,</span>
  <span class="token property">"requires_reboot"</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>例えば、SysDVR や sys-botbase を有効化するためには上のように書けば OK です。ただし、Tesla で制御される sys-tune のようなモジュールはこれらの方法で有効化すると CFW がクラッシュするので記述してはいけません。</p>
<p>記事は以上。</p>
</template>
