<template><h2 id="visionとは" tabindex="-1"><a class="header-anchor" href="#visionとは" aria-hidden="true">#</a> <a href="https://developer.apple.com/documentation/vision" target="_blank" rel="noopener noreferrer">Vision<OutboundLink/></a>とは</h2>
<p>Apple のドキュメントによると映像や画像からさまざまなタスクをこなすアルゴリズムをまとめたものだという。Vision 自体は iOS11 以降使えるので、現在利用されている iOS デバイスのほとんど全て（今更 iOS11 以下を使っている人は超少数派だろう）で動作するということになる。</p>
<p>よってサポート面での問題はないと言って良い。リリース直後はバグもあったかもしれないが、流石にもう目立ったものは修正されているだろう。</p>
<p>同じような画像認識フレームワークとしては CIDetector というものがあるのだが、特に何も制限がないのでとりあえず新しい方を使おうという考えである。</p>
<p><a href="https://reftec.work/posts/2019/9/111/" target="_blank" rel="noopener noreferrer">この記事<OutboundLink/></a>によると CIDetector と Vision で認識精度に大きな違いは見られなかったそうだが、まあどっちを使っても変わらないのであればやっぱり新しい方を使いたい。</p>
<h2 id="vision-の使い方" tabindex="-1"><a class="header-anchor" href="#vision-の使い方" aria-hidden="true">#</a> Vision の使い方</h2>
<p><code>Vision</code>では通常の画像ではなく<code>CIImage</code>というものを使うらしい。で、困ったことに<code>CIImage</code>は引数に<code>Image</code>ではなく<code>UIImage</code>を使う。<code>Image</code>は<code>View</code>なのだから仕方ないとはいえ、ちょっとめんどくさい。</p>
<p>で、本当はコードを載せたいのだが全部載せているとめちゃくちゃ長くなるので GitHub でプロジェクトを公開しておく。</p>
</template>
