<template><h2 id="できること" tabindex="-1"><a class="header-anchor" href="#できること" aria-hidden="true">#</a> できること</h2>
<h3 id="クマサン印のスロッシャーの使用" tabindex="-1"><a class="header-anchor" href="#クマサン印のスロッシャーの使用" aria-hidden="true">#</a> クマサン印のスロッシャーの使用</h3>
<p>クマサン印のスロッシャーはモデルが読み込まれないので何故か落ちません。</p>
<p>その代わり非改造機からはイカちゃんが何も持っていないように見えますし、射撃したインクも見えないのでちょっとやりにくいかもしれません。</p>
<h3 id="ノルマの変更" tabindex="-1"><a class="header-anchor" href="#ノルマの変更" aria-hidden="true">#</a> ノルマの変更</h3>
<p>ノルマはホストだけが管理しているので変更しても落ちませんし、他のプレイヤーから見てもちゃんとノルマが変わっているように見えます。</p>
<p>また、クリア判定もホストが管理しているようなので本来ノルマが 10 のものを 20 に変更して 15 納品した場合、クライアント側も失敗した判定になります。</p>
<p>つまり、クリアしたかしてないかはホストだけが管理し、その結果をクライアントに送信しているようです。</p>
<h3 id="スペシャルの変更" tabindex="-1"><a class="header-anchor" href="#スペシャルの変更" aria-hidden="true">#</a> スペシャルの変更</h3>
<p>イカスフィア・アメフラシ・インクアーマー・ナイスダマ・マルチミサイルのスペシャルは使うことができます。</p>
<p>ただ、イカスフィアとアメフラシとマルチミサイルはサーモンラン用のパラメータがないためにものすごく弱いので実質使い物になりません。</p>
<p>特に、アメフラシはアメが降らないので意味がありません。</p>
<p>また、なんのスペシャルが割り当てられたかはホストから決められるので、改造機であってもクライアントになった場合は通常のスペシャルが割り当てられます。</p>
<h3 id="金イクラドロップ数の変更" tabindex="-1"><a class="header-anchor" href="#金イクラドロップ数の変更" aria-hidden="true">#</a> 金イクラドロップ数の変更</h3>
<p>金イクラがいくつドロップしたか（位置も？）はホストが管理しているので、金イクラ数を変更するとそれがクライアントにも反映されます。</p>
<p>ただ、クライアント側からは無から金イクラが飛び出てきたように見えるそうです。</p>
<h3 id="wave-の変更" tabindex="-1"><a class="header-anchor" href="#wave-の変更" aria-hidden="true">#</a> WAVE の変更</h3>
<p>発生する WAVE の組み合わせを変える SeedHack と、WAVE そのものを変える方法があり、どちらもエラー落ちなしにゲームが進行します。</p>
<p>特に SeedHack は完全にクライアントとの同期が取れているので普通にプレイしているのと変わりません。</p>
<p>WAVE そのものを強制的に変更する方法は同期ズレが発生し、クライアント側からはさまざまな奇妙な現象が見られます。</p>
<table>
<thead>
<tr>
<th style="text-align:center">イベント</th>
<th style="text-align:center">同期ズレの効果</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ラッシュ</td>
<td style="text-align:center">キンシャケの移動速度が遅い</td>
</tr>
<tr>
<td style="text-align:center">カンケツセン</td>
<td style="text-align:center">カンケツセンがなく、キンシャケが見えない</td>
</tr>
<tr>
<td style="text-align:center">グリル</td>
<td style="text-align:center">コジャケがいない</td>
</tr>
<tr>
<td style="text-align:center">霧</td>
<td style="text-align:center">昼間なのにキンシャケがいる</td>
</tr>
<tr>
<td style="text-align:center">ハコビヤ</td>
<td style="text-align:center">ハコビヤとシャケコプターが見えない</td>
</tr>
<tr>
<td style="text-align:center">ドスコイ</td>
<td style="text-align:center">大砲がでてくる</td>
</tr>
</tbody>
</table>
<p>潮の高さを強制的に変更すると、プレイヤーが水没しているように見えたり、海の中のコンテナに納品しにいったりといろいろめんどくさいことが発生します。</p>
<h3 id="オオモノ出現数の変更" tabindex="-1"><a class="header-anchor" href="#オオモノ出現数の変更" aria-hidden="true">#</a> オオモノ出現数の変更</h3>
<p>オオモノの数を増やすとこれはキチンと反映されます。</p>
<p>また、ザコシャケについても出現数を 0 にするとザコシャケが全くわかなくなります。</p>
<p>ただし、何故か霧イベントだけはザコシャケ（ドスコイもコジャケもでないが）が出現してしまいます。</p>
<h2 id="できないこと" tabindex="-1"><a class="header-anchor" href="#できないこと" aria-hidden="true">#</a> できないこと</h2>
<h3 id="スロッシャー以外のクマブキの使用" tabindex="-1"><a class="header-anchor" href="#スロッシャー以外のクマブキの使用" aria-hidden="true">#</a> スロッシャー以外のクマブキの使用</h3>
<p>クライアント側がモデルの読み込みで落ちるので、イカ状態を解除した瞬間に通信エラーで落ちます。</p>
<p>ずーっとイカ状態なら問題ありませんが、納品するときにもイカ化が解除されるのでこのタイミングで落ちます。</p>
<h3 id="その他未リリースブキの使用" tabindex="-1"><a class="header-anchor" href="#その他未リリースブキの使用" aria-hidden="true">#</a> その他未リリースブキの使用</h3>
<p>コラボ系の亜種ブキもサーモンランでは開放されていないので、使用した瞬間に落ちます。</p>
<h3 id="いくつかの未解禁スペシャルの使用" tabindex="-1"><a class="header-anchor" href="#いくつかの未解禁スペシャルの使用" aria-hidden="true">#</a> いくつかの未解禁スペシャルの使用</h3>
<p>ウルトラハンコとバブルランチャーは発動した瞬間に落ちます。</p>
<p>それ以外については「できること」の項目で解説しているのでそちらをどうぞ。</p>
<h3 id="出現するオオモノの制限" tabindex="-1"><a class="header-anchor" href="#出現するオオモノの制限" aria-hidden="true">#</a> 出現するオオモノの制限</h3>
<p>カタパッドをでなくするみたいな変更は出現するオオモノにズレが生じて通信エラーで落ちます。</p>
<h3 id="オオモノパラメータの変更" tabindex="-1"><a class="header-anchor" href="#オオモノパラメータの変更" aria-hidden="true">#</a> オオモノパラメータの変更</h3>
<p>移動速度などを変えると位置ズレが発生しますが、こちらは通信エラーにならないようです。</p>
<p>どうも移動速度系は反映されないみたいで、ハコビヤの母艦の体力の変更などはそのまま反映されます。</p>
<h3 id="map-ファイルの変更" tabindex="-1"><a class="header-anchor" href="#map-ファイルの変更" aria-hidden="true">#</a> Map ファイルの変更</h3>
<p>オブジェクトの位置などを変えると同期ズレからエラーが発生し、ゲームが強制終了してしまいます。</p>
<p>ただ、落ちるのがホストの方なのでエラーチェックを回避するようなパッチを当てられれば回避できるかもしれません。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>備忘録としてまとめたのですが、果たして他の方に需要があるのかどうかはかなり疑問が残ります。</p>
<p>最近ちょっとアセンブラ解析の熱がもどってきたので（せっかく 5.1.0 もリリースされたことですし）、また少しコード開発に取り組むかもしれません。</p>
<p>そんなことより新型 HHKB 発売されたので誰か買ってください！！！</p>
</template>
