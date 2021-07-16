<template><h2 id="lanplay-の導入" tabindex="-1"><a class="header-anchor" href="#lanplay-の導入" aria-hidden="true">#</a> LanPlay の導入</h2>
<p>以下の記事を参考に進めてください。</p>
<p>Windows 版であれば 10 分もあれば環境をつくることができます。</p>
<p><a href="https://tkgstrator.work/posts/2021/04/26/lanplay.html" target="_blank" rel="noopener noreferrer">[決定版] SwitchLanPlay<OutboundLink/></a></p>
<h3 id="マッチングしない" tabindex="-1"><a class="header-anchor" href="#マッチングしない" aria-hidden="true">#</a> マッチングしない</h3>
<p>そもそも部屋に合流できないときの解決策をまとめました。</p>
<p>現状、自分が把握している不具合に関してはおおよそまとめたつもりですが、未知のバグが他にもある可能性があります。</p>
<h3 id="部屋が見えない場合-ホストが悪い場合" tabindex="-1"><a class="header-anchor" href="#部屋が見えない場合-ホストが悪い場合" aria-hidden="true">#</a> 部屋が見えない場合（ホストが悪い場合）</h3>
<p>相手の部屋が見えない場合、次のどれかの可能性を疑ってください。</p>
<ul>
<li>ホストが LanPlay になっていない</li>
</ul>
<p>部屋を立てている人が背景のサーモンがドット絵ではないことを確認してください。</p>
<p>ドット絵になっている場合は LanPlay になっていないので部屋を解散してから再度立ててください。</p>
<p><img src="https://pbs.twimg.com/media/EaItG7tX0AARjzx?format=png" alt=""></p>
<p>この画像のように、背景のサーモンがドット絵になっている場合は LanPlay になっていません。</p>
<p><img src="https://pbs.twimg.com/media/EaItHTxXQAA8evg?format=png" alt=""></p>
<p>LanPlay であればこのようにオンラインと同じサーモンのアイコンになります。</p>
<h3 id="部屋が見えない場合-ゲストが悪い場合" tabindex="-1"><a class="header-anchor" href="#部屋が見えない場合-ゲストが悪い場合" aria-hidden="true">#</a> 部屋が見えない場合（ゲストが悪い場合）</h3>
<p>部屋に参加しようとしている人が部屋が見えない場合、以下の可能性があります。</p>
<ul>
<li>ゲストが LanPlay になっていない</li>
</ul>
<p>ゲストが LanPlay になっているかなっていないかは右下のスタンプがあるかどうかで確認できます。</p>
<p>L スティック押し込み + L + R を同時押しして三秒間固定すれば LanPlay に切り替わります。</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1386659361146081289/pu/vid/1280x720/JAvXlgaE9OyV4HCF.mp4"></video></p>
<p>右下にスタンプの表示があれば、LanPlay になっていない。</p>
<p>右下のスタンプ表示が消えていれば、LanPlay になっていることがわかります。</p>
<h3 id="部屋が見えない場合-どちらかが悪い場合" tabindex="-1"><a class="header-anchor" href="#部屋が見えない場合-どちらかが悪い場合" aria-hidden="true">#</a> 部屋が見えない場合（どちらかが悪い場合）</h3>
<ul>
<li>
<p>LanPlay を二重起動している</p>
</li>
<li>
<p>ニンテンドースイッチが LanPlay に繋がっていない</p>
</li>
</ul>
<p>パソコンで黒い画面が二重に起動していないことを確認してください。</p>
<p>また、インターネット設定から IP アドレスが 10.13.XXX.YYY の形になっていることを確認してください。</p>
<h3 id="部屋が見えない場合-通信環境の問題" tabindex="-1"><a class="header-anchor" href="#部屋が見えない場合-通信環境の問題" aria-hidden="true">#</a> 部屋が見えない場合（通信環境の問題）</h3>
<p>LanPlay のサーバは東京にあり、LanPlay の通信にはタイムアウト時間というものが決められているので最初のホストを見つけてから、目的のホストを見つけるまでの間にタイムアウトしてしまうことがあります。</p>
<p>例えば、東京で部屋を立てている人が一人いて、アメリカで部屋を立てている人がもう一人いるとします。</p>
<p>このとき、大阪にいる人が部屋を探そうとするとまず最初に東京の部屋を見つけ、その後アメリカの部屋を見つける前に検索がタイムアウトしてしまい「東京の部屋しか見えない」という状況が発生します。</p>
<p>この場合は、別の LanPlay サーバを使うしか解決手段がありません。</p>
<h3 id="部屋は見えるが入室できない場合" tabindex="-1"><a class="header-anchor" href="#部屋は見えるが入室できない場合" aria-hidden="true">#</a> 部屋は見えるが入室できない場合</h3>
<ul>
<li>
<p>IP アドレスが重複している</p>
</li>
<li>
<p>物理的な距離が離れている</p>
</li>
</ul>
<p>IP アドレス自体はちゃんとランダムな値にすれば重複する確率は 1/65536 ですが、誕生日とかに設定していると割と被ってしまうのでそういった値は避けるようにしましょう。</p>
<p>また、LanPlay のサーバは東京にあるため、東京から地理的に離れている人がホストをしていると入室していると時間がかかる場合があります。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>エラーで入室できないこともありますが三回くらい試せば入れたりします。</p>
</div>
<h3 id="三人目以降が入室できない" tabindex="-1"><a class="header-anchor" href="#三人目以降が入室できない" aria-hidden="true">#</a> 三人目以降が入室できない</h3>
<ul>
<li>
<p>ルータの問題</p>
</li>
<li>
<p>通信の品質の問題</p>
</li>
</ul>
<p>ルータの設定によってはファイアウォールなどの機能のせいで三人目以降が入室できないことがあります。</p>
<p>正直、この問題は解決方法がよく分かっていないです。</p>
<p>バッファローのルータなら間違いなく動くと思うので、よくわからん人は「BUFFALO WiFi 無線 LAN」とでも検索して買ってみましょう。</p>
<p>また、LanPlay には通信速度はあまり重要でなく、遅延（Ping）とパケロス（パケットロス）率が重要になってきます。</p>
<p>これは無線環境だとどうしても悪くなるので、安定して LanPlay をしたい場合はパソコン・ニンテンドースイッチ共に有線にしましょう。</p>
<p>有線接続のチュートリアルは本記事の別の章を参照。</p>
<h2 id="回線が落ちてしまう場合" tabindex="-1"><a class="header-anchor" href="#回線が落ちてしまう場合" aria-hidden="true">#</a> 回線が落ちてしまう場合</h2>
<p>マッチングはできるが、ゲーム開始から回線が落ちてしまう場合の対処法について解説。</p>
<h3 id="二人で遊んだ場合" tabindex="-1"><a class="header-anchor" href="#二人で遊んだ場合" aria-hidden="true">#</a> 二人で遊んだ場合</h3>
<p>二オペではよほど通信環境が悪くない限り、ラグや回線落ちは発生しません。</p>
<p>二人で落ちるのであれば、IP アドレスの重複や LanPlay の多重起動を疑ってみましょう。</p>
<h3 id="三人以上で遊んだ場合" tabindex="-1"><a class="header-anchor" href="#三人以上で遊んだ場合" aria-hidden="true">#</a> 三人以上で遊んだ場合</h3>
<ul>
<li>
<p>毎回特定の一人が落ちる</p>
</li>
<li>
<p>ゲーム開始前の暗転直後の白い画面で落ちる</p>
</li>
<li>
<p>通信不安定と表示される場合</p>
</li>
</ul>
<p>高確率で同じ人が落ちる場合、その落ちる人の環境が良くないケースが多いです。</p>
<p>特に、Wi-Fi で接続している場合は有線の導入を検討してください。</p>
<p>二つ目も接続している誰かが通信環境が悪い可能性が高いです。</p>
<p>また、このケースの場合はホストの環境が良くない場合があります。</p>
<p>ホストだけが通信不安定と表示される場合、ホストの通信環境が良くない可能性が高いです。</p>
<p>ゲストにこれが表示される場合、そのゲストの通信環境（またはゲストとホスト間の通信環境）が良くない可能性が高いです。</p>
<h2 id="回線品質が悪い場合" tabindex="-1"><a class="header-anchor" href="#回線品質が悪い場合" aria-hidden="true">#</a> 回線品質が悪い場合</h2>
<p>パソコンとスイッチの両方が無線接続の場合、まずはスイッチの方を有線にすることを第一に考えてください。</p>
<p>なぜなら「パソコンは別にスイッチと同じ部屋にある」という必要はなく「パソコンとルータが同じ部屋、遠くのテレビがある部屋にスイッチ」という環境でも LanPlay が安定するためです。</p>
<h3 id="ルータを買い換える" tabindex="-1"><a class="header-anchor" href="#ルータを買い換える" aria-hidden="true">#</a> ルータを買い換える</h3>
<ul>
<li>
<p>ELECOM</p>
</li>
<li>
<p>NEC</p>
</li>
<li>
<p>BUFFALO</p>
</li>
</ul>
<p>ELECOM は不安定なのでおすすめしません。LanPlay で二オペだと普通に遊べるのに三オペ以上になると通信不安定になり、ルータが ELECOM の場合は買い替えをおすすめします。</p>
<p>NEC も不安定なのでおすすめしません。LanPlay で二オペだと普通に遊べるのに三オペ以上になると通信不安定になり、ルータが NEC の場合も買い替えをおすすめします。</p>
<p>BUFFALO は基本的にどのモデルでも安定していると言われています。もしも通信不安定が頻出していて原因がルータにありそうな場合、BUFFALO のルータに買い換えることをおすすめします。</p>
<h3 id="有線ケーブルを買う" tabindex="-1"><a class="header-anchor" href="#有線ケーブルを買う" aria-hidden="true">#</a> 有線ケーブルを買う</h3>
<p>最も確実な解決方法は有線ケーブルと有線 LAN アダプターを購入して、パソコンとスイッチのどちらも有線にすることです。</p>
<p>これ以上確実な対処法はありません。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/31AeYmG2AbL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B07VG66XX3/?tag=tkgstrator0f-22" target="_blank">BUFFALO 有線LANアダプター LUA4-U3-AGTE-NBK ブラック Giga USB3.0対応 簡易パッケージ 日本メーカー 【Nintendo Switch動作確認済み】</a></li>
<li class="price">￥1,580</li>
</ul>
</div>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/31DaYGepGqL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B008RVY4BU/?tag=tkgstrator0f-22" target="_blank">BUFFALO ツメの折れないLANケーブル カテゴリ6a ストレート フラットタイプ ブラック BSLS6AFU10BK</a></li>
<li class="price">￥687</li>
</ul>
</div>
<p>この二つを無線接続しているパソコンとスイッチの分だけ購入する必要があります。</p>
<p>LAN ケーブルの長さは環境によりけりなのですが、1m から 1.5m もあれば十分だと思います。</p>
<h3 id="中継機を買う" tabindex="-1"><a class="header-anchor" href="#中継機を買う" aria-hidden="true">#</a> 中継機を買う</h3>
<p>しかし、場合によってはルータが階下にあるなど、有線接続できないケースがあります。</p>
<p>その場合は中継機を購入するなどして、無線が減衰しないようにします。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/31TWSx8jIqL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B084LFPC5R/?tag=tkgstrator0f-22" target="_blank">BUFFALO WiFi 無線LAN中継機 WEX-1166DHPS/N 11ac/n/a/g/b 866+300Mbps ハイパワー コンパクトモデル 簡易パッケージ 日本メーカー【iPhone12/11/iPhone SE(第二世代) メーカー動作確認済み】</a></li>
<li class="price">￥3,980</li>
</ul>
</div>
<p>また、この中継機は中継機自身に LAN ケーブルを挿すことができます。</p>
<p>中継機はスイッチやパソコンよりも感度が良いので、中継機までは無線接続して、中継機から有線接続にするというのも一つの手です。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>自分が接続できているかは以下の URL からも確認できます。</p>
<p><a href="http://ec2-13-231-102-57.ap-northeast-1.compute.amazonaws.com:11451/info" target="_blank" rel="noopener noreferrer">ここの数字<OutboundLink/></a>が増えれば接続できています。</p>
<p>それではみなさん、良き LanPlay ライフをお楽しみください。</p>
<p>記事は以上。</p>
</template>
