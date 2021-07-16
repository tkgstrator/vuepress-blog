<template><h2 id="seedhack-のパッチファイル" tabindex="-1"><a class="header-anchor" href="#seedhack-のパッチファイル" aria-hidden="true">#</a> SeedHack のパッチファイル</h2>
<p>そのままコードを公開するとめんどくさいことになりそうなので、5.3.1 向けの IPS パッチファイルとして公開します。</p>
<p>まあこれも復号可能なのでバイナリを眺めて意味がわかる人であれば、元のコードは復元できるのですが、そこまでできる人ならそもそもアドレス移植もできるだろっていうことで。</p>
<p>WAVE の内容がどんなものかを知りたい人は以下の URL からシードを<code>0x</code>抜きでコピペすれば調べることができます。</p>
<p><a href="https://salmonrun-records.netlify.app/ocean/?seed=0xFACE4ECC" target="_blank" rel="noopener noreferrer">LanPlay Records<OutboundLink/></a></p>
<h3 id="満潮キンシャケ探し-満潮ハコビヤ-満潮キンシャケ探し" tabindex="-1"><a class="header-anchor" href="#満潮キンシャケ探し-満潮ハコビヤ-満潮キンシャケ探し" aria-hidden="true">#</a> 満潮キンシャケ探し + 満潮ハコビヤ + 満潮キンシャケ探し</h3>
<p>@<a href="https://www.youtube.com/watch?v=0P9IlQ-9ciM" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>404 納品を達成したときのシードが適用されます。頑張れば 410 納品くらいまでは伸ばせると思うので誰か頑張ってみてください。</p>
<p><a href="https://cdn.discordapp.com/attachments/806624731741814866/806625784185880576/CF91518983FCB18D11B0FF1DAC22300F.ips" target="_blank" rel="noopener noreferrer">222422（0xFACE4ECC）<OutboundLink/></a></p>
<h3 id="イベントなし全回収-198-納品" tabindex="-1"><a class="header-anchor" href="#イベントなし全回収-198-納品" aria-hidden="true">#</a> イベントなし全回収 198 納品</h3>
<p>@<a href="https://www.youtube.com/watch?v=4L1HLOGhqRs" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>今まで遊んだ昼のみ WAVE の中で最も簡単です。このシードだけで全回収が三回達成されているので、そこそこ上手いなら誰でも 198 納品できます。</p>
<p><a href="https://cdn.discordapp.com/attachments/806624731741814866/806624787169804288/CF91518983FCB18D11B0FF1DAC22300F.ips" target="_blank" rel="noopener noreferrer">202000（0xF8AC89CA）<OutboundLink/></a></p>
<h2 id="パッチファイルの使い方" tabindex="-1"><a class="header-anchor" href="#パッチファイルの使い方" aria-hidden="true">#</a> パッチファイルの使い方</h2>
<p><code>sdmc:/atmosphere/exefs_patches</code>に新たに適当にフォルダ（今回は SeedHack-531 とする）を作成します。</p>
<p>作成したらそのフォルダの中に適用したいシードのパッチをコピーします。</p>
<p>すると、<code>sdmc:/atmosphere/exefs_patches/seedHack-531/CF91518983FCB18D11B0FF1DAC22300F.ips</code>という風になると思います。</p>
<p>これでパッチの適用は完了です。</p>
<p>シード固定を解除したい場合はパッチ（IPS ファイル）を削除してください。</p>
<p>記事は以上。</p>
</template>
