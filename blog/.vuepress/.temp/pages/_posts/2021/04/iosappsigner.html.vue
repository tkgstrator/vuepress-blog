<template><h2 id="sideload-の必要性" tabindex="-1"><a class="header-anchor" href="#sideload-の必要性" aria-hidden="true">#</a> Sideload の必要性</h2>
<p>Sideload が特別なにか重要かと言われると実はそうでもなかったりする。</p>
<p>要するに今まで脱獄しなければできなかったことを dylb をバイナリに直接突っ込んで同梱してしまうことで一部の機能を利用できるようにしようという仕組みである。</p>
<p>ただ、非改造の iOS は署名のないアプリは起動できない。そこで、Apple で正式に発行した自己署名を使ってアプリにサインし、動かしてしまおうというのである。</p>
<p>自己署名は七日間しか有効でないが、Developer Program に参加していれば 365 日まで延長することができる。この登録は年間 12000 円もかかってしまうので Sideload のためにわざわざ登録する意味はないが、誰かが登録さえしていればデバイスは 100 台まで登録できる。</p>
<p>つまり、全員で分担すれば一台あたり年間 120 円で Sideload を使うことができるというわけだ。これならハードルはかなり低いように感じる。</p>
<p>で、ぼく自身は Salmonia のリリースのためにデベロッパ登録をしている。現在デバイス自体は自分が所有している七台が登録されているが、まだまだ余裕がある。</p>
<p>なのでもしも UDID を送ってくれたらデバイス登録をします。</p>
<h3 id="udid-が洩れて大丈夫なのか" tabindex="-1"><a class="header-anchor" href="#udid-が洩れて大丈夫なのか" aria-hidden="true">#</a> UDID が洩れて大丈夫なのか</h3>
<p>大丈夫である。</p>
<p>UDID を利用するアプリは Apple でリジェクトされるようになっているし、世間的にも UDID は使用しない方向に進んでいる。</p>
<p>現在利用されているのは UUID と呼ばれる識別子であり、これはデバイス登録には必要とされていない。</p>
<p>UUID が洩れても使っているデバイスの種類(iPhone か iPad かなど)やデバイスモデル(iPhone 8 や iPhone X など)がわかるくらいである。</p>
<h2 id="手順" tabindex="-1"><a class="header-anchor" href="#手順" aria-hidden="true">#</a> 手順</h2>
<h3 id="identifier-の作成" tabindex="-1"><a class="header-anchor" href="#identifier-の作成" aria-hidden="true">#</a> Identifier の作成</h3>
<p><img src="/assets/images/08.png" alt=""></p>
<p><a href="https://developer.apple.com/account/resources/identifiers/list" target="_blank" rel="noopener noreferrer">ここ<OutboundLink/></a>でログインしてまずは Identirfier を作成します。</p>
<p>自分は Twitter Owl の Sideload がしたかったのでこんな感じに設定しました。多分、Sideload したいアプリの数だけ Identirfier は作成しないとダメです。</p>
<h3 id="デバイスの登録" tabindex="-1"><a class="header-anchor" href="#デバイスの登録" aria-hidden="true">#</a> デバイスの登録</h3>
<p><a href="https://developer.apple.com/account/resources/devices/list" target="_blank" rel="noopener noreferrer">ここ<OutboundLink/></a>からデバイスの登録を行います。</p>
<p>UDID が必要になるのであらかじめ調べておきましょう。</p>
<p>UDID は Mac であればデバイスを繋いでからデバイス名の下のところを一回クリックすれば表示されます。</p>
<p>Windows であれば iTunes で繋いで調べることができます、多分。</p>
<p><img src="/assets/images/11.png" alt=""></p>
<p>登録デバイスが増えたときはここからやり直す必要があります。</p>
<h3 id="provisioning-profile-のダウンロード" tabindex="-1"><a class="header-anchor" href="#provisioning-profile-のダウンロード" aria-hidden="true">#</a> Provisioning Profile のダウンロード</h3>
<p><img src="/assets/images/09.png" alt=""></p>
<p><a href="https://developer.apple.com/account/resources/profiles/list" target="_blank" rel="noopener noreferrer">ここ<OutboundLink/></a>から Provisioning Profile を作成してダウンロードします。</p>
<p>Identirfier には先程作成したものを利用します。</p>
<h3 id="ios-app-signer" tabindex="-1"><a class="header-anchor" href="#ios-app-signer" aria-hidden="true">#</a> iOS App Signer</h3>
<p><img src="/assets/images/10.png" alt=""></p>
<p>iOS App Signer は<a href="https://dantheman827.github.io/ios-app-signer/" target="_blank" rel="noopener noreferrer">ここ<OutboundLink/></a>で配布されています。</p>
<p>ダウンロードしたら起動し、Provisionig Profile に先ほど作成してダウンロードしたものを指定します。</p>
<p>その後 Input File から署名したい IPA ファイルを選択します。今回は Twitter アプリに対して署名したかったので<a href="https://github.com/ipahost/Owl-for-Twitter" target="_blank" rel="noopener noreferrer">GitHub の公式ページ<OutboundLink/></a>から IPA をダウンロードしてきました。</p>
<p>あとは署名をしてしまえば終了です。だいたい一分くらいで終わります。</p>
<h2 id="配布する" tabindex="-1"><a class="header-anchor" href="#配布する" aria-hidden="true">#</a> 配布する</h2>
<p>以下のテンプレートに則って PLIST ファイルを作成します。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">plist</span> <span class="token name">PUBLIC</span> <span class="token string">"-//Apple//DTD PLIST 1.0//EN"</span> <span class="token string">"http://www.apple.com/DTDs/PropertyList-1.0.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plist</span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dict</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>items<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>array</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dict</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>assets<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>array</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dict</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>kind<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>software-package<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>url<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>配布用URLを記述する<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dict</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>array</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>metadata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dict</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>bundle-identifier<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>IPAのバンドルIDを指定する<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>bundle-version<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>IPAのバージョンを指定する<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>kind<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>software<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>subtitle<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>企業名を指定する<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span><span class="token punctuation">></span></span>アプリ名を指定する<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dict</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dict</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>array</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dict</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plist</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h3 id="リンクの作成" tabindex="-1"><a class="header-anchor" href="#リンクの作成" aria-hidden="true">#</a> リンクの作成</h3>
<p>最後にこの PLIST にアクセスするために必要なリンクを作成する。</p>
<p>Markdown だと以下のように書けば良い。<code>item-services://</code>の URL スキームを使うことでインストーラが開くという仕組みになっている。</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url">[<span class="token content">リンク</span>](<span class="token url">itms-services://?action=download-manifest&amp;url=https://tkgling.netlify.app/resources/plist/twitterowl.plist</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>注意点としては PLIST ファイルは必ず HTTPS プロトコルでアクセスしないといけない。今どき使っている人はいないだろうが、HTTP だとインストールができない。</p>
<p>また、PLIST ファイルが置いてあるドメインと IPA が置かれているドメインは同じでないといけない。要するに、勝手に別のドメインのアプリをインストールすることはできない。</p>
<h2 id="完成したもの" tabindex="-1"><a class="header-anchor" href="#完成したもの" aria-hidden="true">#</a> 完成したもの</h2>
<p>UDID を登録しているデバイスで以下のリンクを開くとアプリがインストールされる。</p>
<p>365 日間有効なのでご自由にどうぞ。</p>
<h3 id="twitter-owl" tabindex="-1"><a class="header-anchor" href="#twitter-owl" aria-hidden="true">#</a> Twitter Owl</h3>
<p>主な機能は以下の通り。</p>
<ul>
<li>広告の非表示</li>
<li>Fleet 画像の保存</li>
<li>ツイートを画像として保存</li>
<li>動画の保存</li>
<li>いいねアクションの無効化</li>
<li>フィード動画の保存</li>
<li>いいね時に確認機能を追加</li>
<li>フォロー外しの際に確認機能を追加</li>
<li>フリートの無効化</li>
<li>ボイスメッセージの送信</li>
</ul>
<p>ただし、以下の点でバグが存在する（これは潜在的で解決できるようなものではない）</p>
<ul>
<li>通知が来ない</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">バージョン</th>
<th style="text-align:center">リリース日</th>
<th style="text-align:center">プラグインバージョン</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="itms-services://?action=download-manifest&amp;url=https://tkgling.netlify.app/resources/plist/twitterowl.plist">8.59</a></td>
<td style="text-align:center">2020/04/08</td>
<td style="text-align:center">1.7</td>
</tr>
</tbody>
</table>
<h3 id="youtube" tabindex="-1"><a class="header-anchor" href="#youtube" aria-hidden="true">#</a> Youtube</h3>
<p>主な機能は以下の通り。</p>
<ul>
<li>広告の非表示</li>
<li>スリープモード</li>
<li>バックグラウンド再生</li>
<li>自動再生無効化</li>
<li>ループ再生</li>
<li>HD 画質有効可</li>
<li>自動購読登録/解除</li>
<li>すべての動画に自動で高評価</li>
<li>すべての動画に自動で低評価</li>
<li>ショートストーリーを保存</li>
</ul>
<p>ただし、以下の点でバグが存在する（これは潜在的で解決できるようなものではない）</p>
<ul>
<li>通知が来ない</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">バージョン</th>
<th style="text-align:center">リリース日</th>
<th style="text-align:center">プラグインバージョン</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="itms-services://?action=download-manifest&amp;url=https://tkgling.netlify.app/resources/plist/youtube.plist">16.09.2</a></td>
<td style="text-align:center">2020/03/19</td>
<td style="text-align:center">1.7</td>
</tr>
</tbody>
</table>
</template>
