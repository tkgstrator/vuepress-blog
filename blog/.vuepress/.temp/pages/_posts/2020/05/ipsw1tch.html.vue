<template><h2 id="ipswitch-とは" tabindex="-1"><a class="header-anchor" href="#ipswitch-とは" aria-hidden="true">#</a> IPSwitch とは</h2>
<p>ニンテンドースイッチのゲームの実行ファイルにあてるパッチを作成してくれる神ツール。</p>
<p>スイッチ本体に当てたいパッチのリストを送っておいて、それを HB から IPSwitch を起動して好きなものを有効化するという仕組みです。</p>
<h3 id="ipswitch-の問題点" tabindex="-1"><a class="header-anchor" href="#ipswitch-の問題点" aria-hidden="true">#</a> IPSwitch の問題点</h3>
<p>コードを有効化・無効化するという点では全くケチのつけようがない IPSwitch なのですが、コードを検証する側としては若干めんどくさい場面がいくつかありました。</p>
<p>たとえば、SeedHack などであれば 3.1.0 向けのコードは以下のような感じでした。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// SeedHack 000000(7) [tkgling]
@disabled
00208C74 E00080D2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>このコードはシード値として 7 を設定し、その結果として称号がいちにんまえ以上であれば三つの WAVE すべてで干潮イベントなしという WAVE が発生するコードです。</p>
<p>で、次に例えばシード値として 0xB1A6 を使いたくなったとしましょう。このとき、コードを変更するというのが大変に煩わしかったのです。</p>
<ul>
<li>まず、SeedHack.exe で求めたい WAVE のシードを出力
<ul>
<li>ここでは仮にそれが 0xB1A6 とする</li>
</ul>
</li>
<li>HEX to ARM で E00080D2 を ARM 命令に変換する
<ul>
<li>MOVZ X0, #0x7 という ARM 命令を得る</li>
</ul>
</li>
<li>ARM to HEX で MOVZ X0, #0xB1A6 を HEX に変換する
<ul>
<li>C03496D2 という HEX を得る</li>
</ul>
</li>
</ul>
<p>こういう手順を踏んでようやく、</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// SeedHack 212421(B1A6) [tkgling]
@disabled
00208C74 C03496D2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>こういう IPSwitch 形式のコードを作成することができました。でもこれ、正直めんどくさいんですよね。</p>
<p>まず、HEX は機械語で人間が読みやすいようにできていません。それに対して ARM は低級ではありますが可読性はありますし、どんな命令が実行されているかもわかるので値を変更することも楽なんですよね。</p>
<p>例えば以下のコードは 5.4.0 で動作するサーモンランの 1WAVE の長さを変更するコードなのですが、00C28152 を見て一体これが秒数をいくらにするかさっぱりわかりませんよね？</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Change Wave Total Frame in SR [tkgling]
@disabled
007302A0 00C28152
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>で、秒数を変えたいなってなったときにまたさっきのようなめんどくさい手順をとらないといけないのです。</p>
<h2 id="ipsw1tch-について" tabindex="-1"><a class="header-anchor" href="#ipsw1tch-について" aria-hidden="true">#</a> IPSw1tch について</h2>
<p>結局のところ IPSwitch の問題点はインラインアセンブラが書けないということに尽きます。これがかければアドレスとアセンブラを書いておしまいなんです。</p>
<p>あれ、でもよく考えたらインラインアセンブラが書ける便利なツールがアリましたよね？そう、Starlight です。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[version=310, target=main]
gsys::SystemTask::invokeDrawTV*+284 NOP // enable display debug stuff (which is used for hook)
gsys::SystemTask::invokeDrawTV*+390:
MOV X1, X0
MOV X0, X25
ADRP X2, #0x29A4000                     // CoopSetting
LDR X2, [X2, #0xE08]
LDR X2, [X2]
ADRP X3, #0x29AB000                     // EventDiretor
LDR X3, [X3, #0xBC0]
LDR X3, [X3]
ADRP X4, #0x29A9000                     // PlayerDirector
LDR X4, [X4, #0xDB8]
LDR X4, [X4]
BL renderEntrypoint
B #0x294
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Starlight ではこのように codehook.slpatch にアセンブラを書いておくことで python ライブラリの一つである keystone を使って HEX をすっとばして直接 IPS 形式のパッチをつくることができました。</p>
<p>で、本来であればこのような仕組みにするのがベストなんですが keystone の環境をつくるのが死ぬほどめんどくさいんです。なので今回は keystone を使わずにインラインアセンブラが書けるうまい仕組みを考えました。</p>
<h3 id="online-arm-to-hex-converter" tabindex="-1"><a class="header-anchor" href="#online-arm-to-hex-converter" aria-hidden="true">#</a> <a href="https://armconverter.com/" target="_blank" rel="noopener noreferrer">Online ARM to HEX Converter<OutboundLink/></a></h3>
<p>コード開発においてものすごくお世話になっている Online ARM to HEX Converter なのですが、なぜかここ数日繋がらない状況が続いていました。</p>
<p>サービス終了だったら代替サービスがなくて困るなあと思っていたのですが、それは杞憂だったらしくなんとなんとアップデートされてかえってきました！</p>
<p>地味に SSL に対応してる！</p>
<p>そしてアプデされた Online ARM to HEX Converter を開発者ツールで眺めているときに気付いたのです。</p>
<p><img src="https://pbs.twimg.com/media/EYdcKMHWkAI-gkZ?format=png" alt=""></p>
<p>convert...？</p>
<p>これ、変換用の API があるのでは...？</p>
<p><img src="https://pbs.twimg.com/media/EYdcrpcXkAEpcyR?format=png" alt=""></p>
<p>これがまさにビンゴで convert という（内部？）API があることがわかりました。</p>
<p>開発者ツールではどんなリクエストを送っているのかはわかりませんが、レスポンスとして ARM64 の HEX が JSON 形式で返ってきているのがわかります。リクエスト自体は Fiddler などのパケットキャプチャソフトを使えば調べるのは簡単です。</p>
<p>調べたところ、POST に必要なヘッダーは Content-Length と Host だけでした。</p>
<h3 id="完成したもの" tabindex="-1"><a class="header-anchor" href="#完成したもの" aria-hidden="true">#</a> 完成したもの</h3>
<p><a href="https://github.com/tkgstrator/IPSw1tch" target="_blank" rel="noopener noreferrer">IPSw1tch<OutboundLink/></a></p>
<p>そこまでわかれば Python ライブラリの一つである requests を使って簡単に API を叩けます。おおっぴらに API が公開されているわけではないのでなんか怪しい気もしますが...</p>
<p><video controls src="https://video.twimg.com/ext_tw_video/1263068293675573248/pu/vid/1280x720/a9fKImH-qNJ77QME.mp4"></video></p>
<p>ARM 命令を HEX に変換して IPSwitch 用のパッチができているのがわかりますね！</p>
<h2 id="今後の展望" tabindex="-1"><a class="header-anchor" href="#今後の展望" aria-hidden="true">#</a> 今後の展望</h2>
<p>現在は ARM to HEX しかサポートしていないのですが、HEX to ARM もサポートできればいいなと考えています。あとはインスタンス呼び出す際になにか特殊なコマンドを考えて一発で出せるようにしたら楽しいかななんて思ったり。</p>
<p>まあこれもそれも API のおかげです、さまさまです。</p>
<p>記事は以上。</p>
</template>
