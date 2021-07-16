<template><h2 id="lanplay-とは" tabindex="-1"><a class="header-anchor" href="#lanplay-とは" aria-hidden="true">#</a> LanPlay とは</h2>
<p>Lan プレイとはニンテンドースイッチに実装されている隠し機能を使って同一 LAN 内で通信を可能にする仕組みです。</p>
<p>例えば、スプラトゥーン甲子園などではこの機能が使われています。</p>
<p>本来、LAN プレイは同一ネットワークでしか使えないのですが、これをインターネット越しでも使えるようにしたのが SwitchLanPlay になります。</p>
<p>簡単に言うと、本来はみんなが同じ場所に集まらなければできなかったイカッチャでのサーモンランがインターネットを使ってオンラインのサーモンランのように遊べてしまうということになります。</p>
<h2 id="lanplay-対応ゲーム一覧" tabindex="-1"><a class="header-anchor" href="#lanplay-対応ゲーム一覧" aria-hidden="true">#</a> LanPlay 対応ゲーム一覧</h2>
<p>非改造で LanPlay が楽しめるゲームは以下の 11 タイトルのみです。それ以外は CFW が必要になります。CFW でのみ LanPlay が可能なタイトルについては<a href="http://lan-play.com/games-switch" target="_blank" rel="noopener noreferrer">LanPlay 公式サイト<OutboundLink/></a>で紹介されています。</p>
<table>
<thead>
<tr>
<th style="text-align:center">タイトル</th>
<th style="text-align:center">FW</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ARMS</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Bayonetta 2</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Mario &amp; Sonic at the Olympic Games Tokyo 2020</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Mario Kart 8 Deluxe</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Mario Tennis Aces</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Pokkén Tournament DX</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Pokémon Shield</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Pokémon Sword</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">SAINTS ROW: THE THIRD - THE FULL PACKAGE</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Splatoon 2</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
<tr>
<td style="text-align:center">Titan Quest</td>
<td style="text-align:center">OFW/CFW</td>
</tr>
</tbody>
</table>
<h2 id="lanplay-の導入" tabindex="-1"><a class="header-anchor" href="#lanplay-の導入" aria-hidden="true">#</a> LanPlay の導入</h2>
<p>リンクが張ってあるのでダウンロードしてください。</p>
<ul>
<li><a href="https://www.winpcap.org/install/default.htm" target="_blank" rel="noopener noreferrer">WinPcap<OutboundLink/></a>
<ul>
<li>LanPlay の動作に必須です</li>
</ul>
</li>
<li><a href="https://aka.ms/vs/16/release/vc_redist.x64.exe" target="_blank" rel="noopener noreferrer">C++再頒布パッケージ x64<OutboundLink/></a>
<ul>
<li>SwitchLanPlay を実行するのに必要なパッケージです</li>
</ul>
</li>
<li><a href="https://tkgstrator.work/switchlanplay/index.html" target="_blank" rel="noopener noreferrer">SwitchLanPlay<OutboundLink/></a>
<ul>
<li><a href="https://twitter.com/spacemeowx2" target="_blank" rel="noopener noreferrer">@spacemeowx2<OutboundLink/></a>氏が開発した<a href="https://github.com/spacemeowx2/switch-lan-play/releases" target="_blank" rel="noopener noreferrer">switch-lan-play<OutboundLink/></a>を GUI で簡単に扱えるようにしたものです</li>
</ul>
</li>
</ul>
<p>MacOS は対応してはいますがファイルがないため全て手動で設定する必要があります。めんどくさいのであまりおすすめしません。</p>
<h3 id="winpcap-のインストール" tabindex="-1"><a class="header-anchor" href="#winpcap-のインストール" aria-hidden="true">#</a> WinPcap のインストール</h3>
<p>WinPcap は Windows10 向けのものも公開されていますが、そちらでは動作しません。</p>
<h3 id="c-再頒布パッケージ" tabindex="-1"><a class="header-anchor" href="#c-再頒布パッケージ" aria-hidden="true">#</a> C++再頒布パッケージ</h3>
<p>ダウンロードしてインストールするだけです。</p>
<p>万が一インストールできない場合は<a href="https://aka.ms/vs/16/release/vc_redist.x86.exe" target="_blank" rel="noopener noreferrer">C++再頒布パッケージ x86<OutboundLink/></a>を試してみてください。</p>
<h3 id="switchlanplay" tabindex="-1"><a class="header-anchor" href="#switchlanplay" aria-hidden="true">#</a> SwitchLanPlay</h3>
<p>同様にダウンロードしてインストールするだけです。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>もしインストールが上手くいかない場合、この<a href="https://cdn.discordapp.com/attachments/720612694667034646/836272289431421018/Offline_InstallerSwitchLanPlay.zip" target="_blank" rel="noopener noreferrer">オフラインインストーラ<OutboundLink/></a>をダウンロードしてみてください</p>
</div>
<p>インストールが終わった起動して、サーバを選んでから CONNECT を押します。</p>
<p>黒い画面が立ち上がり、以下のような表示がされるはずです。</p>
<div class="language-dos ext-dos line-numbers-mode"><pre v-pre class="language-dos"><code>Interface not specified, opening all interfaces
[DEBUG]: open \Device\NPF_{EECC75CA-BB9D-4C56-A7DE-4D99AC3EE074} ok
pcap loop start
[DEBUG]: packet init buffer 00007FF725D3AF60
[DEBUG]: pmtu is set to 1000
Server IP: 13.231.102.57
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>pcap loop start</code>の後で<code>Server IP: 13.231.102.57</code>と表示された場合は接続が成功しています。</p>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>この黒い画面が二つ以上ひらいたままにならないようにしてください。</p>
<p>LanPlay に接続できなくなってしまいます。</p>
</div>
<h3 id="nintendo-switch-の設定" tabindex="-1"><a class="header-anchor" href="#nintendo-switch-の設定" aria-hidden="true">#</a> Nintendo Switch の設定</h3>
<p><video controls src="https://video.twimg.com/ext_tw_video/1386658146014298115/pu/vid/1280x720/fCXFvEnZYgoqY9ve.mp4"></video></p>
<p>「設定」から「インターネット設定」を開き、次のように設定します。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>動画内では DNS は下の推奨設定と異なっていますが、推奨設定で問題ありません。</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">項目</th>
<th style="text-align:center">値</th>
<th style="text-align:center">注釈</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">IP アドレス設定</td>
<td style="text-align:center">手動</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center">IP アドレス</td>
<td style="text-align:center">10.13.XXX.YYY</td>
<td style="text-align:center">XXX、YYY は他人とかぶらないような 000-255 までの好きな値を設定</td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center">サブネットマスク</td>
<td style="text-align:center">255.255.0.0</td>
<td style="text-align:center">全員共通</td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center">ゲートウェイ</td>
<td style="text-align:center">10.13.37.1</td>
<td style="text-align:center">全員共通</td>
</tr>
<tr>
<td style="text-align:center">DNS 設定</td>
<td style="text-align:center">手動</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center">優先 DNS</td>
<td style="text-align:center">8.8.8.8</td>
<td style="text-align:center">全員共通</td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center">代替 DNS</td>
<td style="text-align:center">8.8.4.4</td>
<td style="text-align:center">全員共通</td>
</tr>
</tbody>
</table>
<div class="language-dos ext-dos line-numbers-mode"><pre v-pre class="language-dos"><code>Interface not specified, opening all interfaces
[DEBUG]: open \Device\NPF_{EECC75CA-BB9D-4C56-A7DE-4D99AC3EE074} ok
pcap loop start
[DEBUG]: packet init buffer 00007FF725D3AF60
[DEBUG]: pmtu is set to 1000
Server IP: 13.231.102.57
[DEBUG]: IConnection::IConnection
[DEBUG]: IConnection::~IConnection
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>設定後に接続テストを行い、<code>[DEBUG]: IConnection::IConnecton</code>と表示されたら接続成功です。</p>
<h3 id="スプラトゥーンの設定" tabindex="-1"><a class="header-anchor" href="#スプラトゥーンの設定" aria-hidden="true">#</a> スプラトゥーンの設定</h3>
<p>イカッチャで L スティック押し込み + L + R を同時押しして三秒間固定すれば LanPlay に切り替わります。</p>
<p>右下の黄色いスタンプマークが消えていれば LanPlay に切り替わっています。</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1386659361146081289/pu/vid/1280x720/JAvXlgaE9OyV4HCF.mp4"></video></p>
<p>あとは部屋を立てるなり、合流するなり楽しんでください。</p>
</template>
