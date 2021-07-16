<template><h2 id="導入手順" tabindex="-1"><a class="header-anchor" href="#導入手順" aria-hidden="true">#</a> 導入手順</h2>
<p><a href="https://ryujinx.org/" target="_blank" rel="noopener noreferrer">Ryujinx<OutboundLink/></a>とは <a href="https://yuzu-emu.org/" target="_blank" rel="noopener noreferrer">yuzu<OutboundLink/></a>とはまた違うニンテンドースイッチのエミュレータのこと。</p>
<p>神プログラマーに yuzu と Ryujinx のどっちがいいときいたところ「いくつか理由があるけど、Ryujinx の方がいいよ」と言われたので採用。</p>
<p>yuzu よりもちょっとめんどくさかったのですが、それでも以前に比べると簡単になっているので簡単に紹介します。</p>
<p>実機の改造のしやすさと、ゲームのダンプのしやすさをかんがえると PS3 のエミュレータよりもとっかかりやすくて良いですね。</p>
<h3 id="ryujinx-本体のダウンロード" tabindex="-1"><a class="header-anchor" href="#ryujinx-本体のダウンロード" aria-hidden="true">#</a> Ryujinx 本体のダウンロード</h3>
<p><a href="https://ryujinx.org/download/" target="_blank" rel="noopener noreferrer">Ryujinx - Download<OutboundLink/></a></p>
<p><img src="https://pbs.twimg.com/media/EtM1tduVcAI5tTG?format=png" alt=""></p>
<p>アップデートがあれば自動でインストールしてくれる優しさ設計。</p>
<h3 id="キーのコピー" tabindex="-1"><a class="header-anchor" href="#キーのコピー" aria-hidden="true">#</a> キーのコピー</h3>
<p>後述するファームウェアをインストールする際などに暗号化された NCA を復号する必要があるので、キーが必要になってきます。</p>
<p><img src="https://pbs.twimg.com/media/EtNDjCDVoAAz9jW?format=png" alt=""></p>
<p>「File」から「Open Ryujinx Folder」を選択してフォルダを開いたら、その中の system というサブフォルダの中に prod.keys をコピーします。</p>
<p>prod.keys 自体は<a href="https://github.com/shchmue/Lockpick_RCM/releases" target="_blank" rel="noopener noreferrer">Lockpick_RCM<OutboundLink/></a>を使って取得してください。</p>
<p>また、このとき prod.keys はインストールしたい NCA を復号するために必要なキーを含んでいる必要があるので、なるべく最新のものを使うこと。</p>
<p><img src="https://pbs.twimg.com/media/EtNDfbJVoAAXSFT?format=png" alt=""></p>
<h3 id="ファームウェアのインストール" tabindex="-1"><a class="header-anchor" href="#ファームウェアのインストール" aria-hidden="true">#</a> ファームウェアのインストール</h3>
<p>Ryujinx はファームウェアをインストールする必要があります。</p>
<p>カートリッジのダンプである XCI があるなら、その中にファームウェアが入っているのでそれでもいいですが、自分でダンプしたい場合は<a href="https://github.com/suchmememanyskill/TegraExplorer/releases" target="_blank" rel="noopener noreferrer">TegraExplorer<OutboundLink/></a>で取得することができます。</p>
<p>また、有志がアップロードしてくれているファイルを使う方法でも可能です。</p>
<p><a href="https://darthsternie.net/switch-firmwares/" target="_blank" rel="noopener noreferrer">Switch Firmwares - Darthsternie's Firmware Archive<OutboundLink/></a></p>
<p><img src="https://pbs.twimg.com/media/EtM51dLU4AA6ImB?format=png" alt=""></p>
<p>「Tools」から「Install Firmware」を選び、更に「Install a firmware from XCI or ZIP」を選択して、ダウンロードしたファームウェアをインストールします。</p>
<p><img src="https://pbs.twimg.com/media/EtM8TUDVcAIEu0x?format=png" alt=""></p>
<h3 id="ゲームの読み込み" tabindex="-1"><a class="header-anchor" href="#ゲームの読み込み" aria-hidden="true">#</a> ゲームの読み込み</h3>
<p><img src="https://pbs.twimg.com/media/EtNEuFaVkAAKN-d?format=png" alt=""></p>
<p>設定の「General」から「Game Directories」を指定すればそこにある NSP、NCA、XCI を全て読み込んでくれます。個人的には全部読み込まれるのは逆にうっとおしいので一長一短かも...</p>
<p><img src="https://pbs.twimg.com/media/EtM5wK0UYAEB3YS?format=png" alt=""></p>
<p>ここに表示されるとリストから消せなかったのもマイナスポイント。フォルダ内はあらかじめ整理整頓して置かなければいけません。</p>
<h3 id="アップデータ-dlc-のインストール" tabindex="-1"><a class="header-anchor" href="#アップデータ-dlc-のインストール" aria-hidden="true">#</a> アップデータ/DLC のインストール</h3>
<p>yuzu と同じく Ryujinx もゲームのアップデータや DLC のインストールに対応しています。</p>
<p><img src="https://pbs.twimg.com/media/EtNKFeqU0AAWh-r?format=png" alt=""></p>
<p><img src="https://pbs.twimg.com/media/EtNKJMbVkAIhgwg?format=png" alt=""></p>
<p>yuzu よりもいいなと思ったのは、アップデータの簡単に切り替えられる点です。簡単にバージョンを上げたり下げたりできるのは良いですね。</p>
<p><img src="https://pbs.twimg.com/media/EtNJ_eAU4AM7ZAu?format=png" alt=""></p>
<h2 id="遊んでみた感想" tabindex="-1"><a class="header-anchor" href="#遊んでみた感想" aria-hidden="true">#</a> 遊んでみた感想</h2>
<p>びっくりするくらいに重いのと、再現性は yuzu に大きく差をつけられているという印象を受けました。</p>
<p>例えば、逆転裁判は yuzu だとほぼ実機並みに動作するのに対して Ryujinx だとロードまでにほとんど固まっているんじゃないかという状態が数分続きます。全然ゲームが始まらない！！</p>
<p>あとなんか知らんけど逆転裁判をやるとコントローラが勝手に反応しまくってひたすら A ボタンと B ボタンが連打された状態になる、なんだこれ。</p>
<p>一応 XInput でキーコンフィグをやり直したら直ったけど、よくわからんことになってました。</p>
<p><img src="https://pbs.twimg.com/media/EtNI4VvVcAEeTn0?format=png" alt=""></p>
<p>スプラトゥーンだと、キャラクター選択画面のガールとボーイの文字が表示されていないというエミュレータあるあるのバグが発生していた。これは初期の yuzu でも発生していたので、何らかの問題があるんだろう。</p>
<p><img src="https://pbs.twimg.com/media/EtNCDQDVcAQIkXS?format=png" alt=""></p>
<p>ちなみに、どのくらい重いかというと i7 6700K 程度のスペックでは常に CPU 使用率が 100%で張り付いています。</p>
<p>CPU のベンチマークサイトによると i7 6700K は約 9000 のスコアで、8700K と 9700K が約 14000。欲しいなーと思っていた 9900K だと 19500 くらいあるみたいです。6700K でカツカツということは 8700K でも厳しそうな気がするので、スプラトゥーンをまともに遊ぼうと思ったら i9 レベルは必要になるのかもしれません。</p>
<p>あと、何故か 3.1.0 のアップデータを入れると画面がめっちゃ暗くなりました、何故？</p>
<p>yuzu よりも便利なことは間違いないので、ぜひともうちの今のパソコンで遊べるくらいアップデートが進むと嬉しいな、と思ってみたり。</p>
<p>記事は以上。</p>
</template>
