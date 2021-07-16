<template><h2 id="誰にとっても-10-進法である" tabindex="-1"><a class="header-anchor" href="#誰にとっても-10-進法である" aria-hidden="true">#</a> 誰にとっても 10 進法である</h2>
<p><a href="https://twitter.com/bagder" target="_blank" rel="noopener noreferrer">@bagder<OutboundLink/></a>氏により投稿されたツイート。</p>
<blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">Never forget: every base is base 10. <a href="https://t.co/vY7l5vLHAB">https://t.co/vY7l5vLHAB</a> <a href="https://t.co/Utu1EH1CWc">pic.twitter.com/Utu1EH1CWc</a></p>&mdash; Daniel 🥌 Stenberg (@bagder) <a href="https://twitter.com/bagder/status/1389605985422036994?ref_src=twsrc%5Etfw">May 4, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<div class="custom-container tip"><p class="custom-container-title">基数について</p>
<p>Never forget: every base is base 10</p>
<p>備忘録: 全ての基数は 10 である</p>
</div>
<p>これはある意味不可解なように感じられる。なぜなら我々は基数が 10 である 10 進法以外にも 16 進法などを使いこなしているからだ。何故全ての基数が 10 なのだろう？</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/51g-2NeJtlL._SL200_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/4798150460/?tag=tkgstrator0f-22" target="_blank">情報処理教科書 基本情報技術者試験のアルゴリズム問題がちゃんと解ける本 第2版</a></li>
<li class="price">￥5,605 (コレクター商品)</li>
</ul>
</div>
<h2 id="問題の場面" tabindex="-1"><a class="header-anchor" href="#問題の場面" aria-hidden="true">#</a> 問題の場面</h2>
<p>シチュエーション的にはおそらくある星にでかけた宇宙飛行士が現地の知的生命体と会話している場面だと思われる。地面には四つの石が落ちており、それを見て会話をしているというわけだ。</p>
<p><img src="https://pbs.twimg.com/media/E0jfOJXWQAIfs2O?format=png" alt=""></p>
<p>以下、大雑把な意訳を載せる。</p>
<p>宇宙人「ここに 10 個石があるね」</p>
<p>宇宙飛行士「（10 個？）ああ、君たちは 4 進法を使っているんだね。わたしたちは 10 進法を使うんだよ」</p>
<div class="custom-container tip"><p class="custom-container-title">4 進法について</p>
<p>10 進法を使う我々は 0 ~ 9 までの 10 この数字で数を表現し、10 番目になると桁を一つ繰り上げる。4 進法の場合は 0 ~ 3 までの 4 つの数字を使うというわけだ。</p>
</div>
<p>宇宙人「いや、我々は 10 進法を使っているよ。4 進法ってなんだい？」</p>
<p>この会話はとても奇妙なように感じられる。</p>
<p>なぜなら 10 進法を使う我々にとっては石は何度数えても 4 つであり、4 つの石のことを 10 個の石という宇宙人は 4 番目で桁が繰り上がる 4 進法を使っているようにしか感じられないからだ。</p>
<p>にもかかわらず宇宙人は 4 進法ではなく 10 進法を使っていると言う。誰も嘘をついていないのであれば、どこでこの奇妙さが生まれたのだろうか？</p>
<h2 id="解説" tabindex="-1"><a class="header-anchor" href="#解説" aria-hidden="true">#</a> 解説</h2>
<p>結論から言えば誰も嘘偽りはついておらず、誤った解釈をしているのは宇宙飛行士である我々の方である。我々は普段から 10 進法しか使っていないがために、10 進法以外の考え方を上手く扱うことができないのである。</p>
<p>ここで、一旦前提条件はおいておき、4 進法を使っているように見える宇宙人の観点に立ってみよう。</p>
<p>宇宙人は（我々から見れば）4 進法を使っており、したがって宇宙人は数字という概念が 0、1、2、3 しかないものとする。ここが最も大事なポイントであるのでよく覚えておいてほしい。</p>
<p>ではその宇宙人は 4 つの石を見て何を思うんだろうか。石がいくつあるか数えていくと、（0 ではないので）1、2、3 と増えていき、宇宙人にとって 3 の次の数字はなく（我々にとっての 9 の感覚である）10 個と答えるしかないのである。</p>
<p>それを見て宇宙飛行士は宇宙人が 4 進法を使っていると考えた。そこで「我々は 10 進法を使っているけど、君たちは 4 進法なんだね」と言ったわけである。</p>
<p>ところが宇宙人にとって 4 という数字はそもそも存在しないのである。なので「4 進法ってなんだい」というのは当然の疑問になるのだ。更に面白いのは「宇宙人は 3 の次に桁上りする自分たちの基数を 10（4 進数で 4 は 10 のため）だと思う」ということだ。なので宇宙人は「我々は 10 進数を使っているよ」と答えるのである。</p>
<p>この考えを突き詰めると（10 進数を使っている我々からすると）何進数を使っていたとしても彼ら自身からすればそれは 10 進数だということである。</p>
<div class="custom-container tip"><p class="custom-container-title">補足説明</p>
<p>もちろん 0 が存在し、最小の自然数が 1 である必要がある。</p>
</div>
<p>数学って面白いなあって思いました、まる。</p>
<p>記事は以上。</p>
</template>
