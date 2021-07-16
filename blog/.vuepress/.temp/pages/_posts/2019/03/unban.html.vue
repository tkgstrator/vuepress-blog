<template><h2 id="ニンテンドースイッチの-ban-の種類" tabindex="-1"><a class="header-anchor" href="#ニンテンドースイッチの-ban-の種類" aria-hidden="true">#</a> ニンテンドースイッチの BAN の種類</h2>
<p>一括りに BAN と言っても実はいくつかの種類が存在します。それらについて調べた結果いろいろわかったので記事にしたいと思います。</p>
<blockquote>
<p>The use of online services on this console is currently restricted by Nintendo.</p>
<p>Please contact Customer Support via Nintendo Support website and quote this error code.
support.nintendo.com/switch/error</p>
</blockquote>
<p>ちなみに、BAN されるとこんなメッセージが表示されたりします。</p>
<h3 id="error-code-2124-4007" tabindex="-1"><a class="header-anchor" href="#error-code-2124-4007" aria-hidden="true">#</a> Error Code: 2124-4007</h3>
<p>俗に言う本体 BAN というもので、本体固有の証明書が取り消されてしまうため一切のニンテンドーネットワークへのアクセスができなくなります。</p>
<h3 id="error-code-2124-4025" tabindex="-1"><a class="header-anchor" href="#error-code-2124-4025" aria-hidden="true">#</a> Error Code: 2124-4025</h3>
<p>証明書 BAN と呼ばれるもの。これは本体固有の証明書ではなく、使っている（主に違法な）ゲームのバックアップの証明書が BAN されたことを意味している。</p>
<h3 id="error-code-2124-4027" tabindex="-1"><a class="header-anchor" href="#error-code-2124-4027" aria-hidden="true">#</a> Error Code: 2124-4027</h3>
<p>スプラトゥーン 2 の永久本体 BAN とのこと。</p>
<p>ゲーム BAN というもので、そのゲームで一切のニンテンドーネットワークへのアクセスができなくなります。</p>
<blockquote>
<p>LFS（Layered FS）を有効化した状態でロビーに入っただけで BAN された。</p>
<p>https://twitter.com/asasasa98765/status/1031780739845517312</p>
</blockquote>
<blockquote>
<p>未実装ステージをプラベで遊ぶ・IPSwitch を有効化した状態（BGM を消す）でオンラインプレイする。</p>
<p>https://twitter.com/Khangarood/status/1077453421358317569</p>
</blockquote>
<p>BGM を消す（俗に言うミューハ）は相手からすると全くわからないし、良くないことではあるものの全塗りチートなどに比べれば優先度は低そうな気がします。</p>
<p>にもかかわらず BAN してきたということは、任天堂の対策の意気込みの強さが現れていますね。</p>
<p>逆に言うと、単にセーブを改造したりチートをする程度では本体 BAN まではいかないことがわかります。してもいいと思うんですけどねえ...</p>
<h3 id="error-code-2124-4607" tabindex="-1"><a class="header-anchor" href="#error-code-2124-4607" aria-hidden="true">#</a> Error Code: 2124-4607</h3>
<p>スプラトゥーン 2 の永久本体 BAN とのこと。</p>
<p>2124-4027 との違いはよくわかっていない。</p>
<h2 id="ban-解除の可能性" tabindex="-1"><a class="header-anchor" href="#ban-解除の可能性" aria-hidden="true">#</a> BAN 解除の可能性</h2>
<p>結論から言ってしまうと、ない。</p>
<p>というのも、ニンテンドースイッチは本体に固有の ID（実際には証明書）が刻まれており、ニンテンドーネットワークに接続する際にそれを任天堂が検証するため。</p>
<p>これは WiiU のときと違い、NAND に書き込まれているわけではないので NAND を書き換えたからといって BAN 解除できるわけではない。</p>
<p>では、本体のどこに刻まれているかというと CPU 内部の TrustZone という領域である。TrustZone は ARM（ニンテンドースイッチが使っている CPU）のセキュア領域に該当し、一般のアプリケーションから直接アクセスすることはできない。</p>
<p>端末のルート権限を取得していても、である。</p>
<p>つまり、BAN された証明書の書換えは極めて困難です。</p>
<p>仮に（BAN されていない）証明書の書換えに成功したとしても、証明書の共有はすぐに任天堂側に検知される。違う IP で同時に二つの証明書がニンテンドーネットワークに接続してきたらそれは証明書を共有しているとすぐにわかるからです。</p>
<p>ちなみに FW1.0.0 には TrustZone レベルでコードを実行できるバグがあります。</p>
<p>まあ例え証明書を書き換えられたとしてもホワイトリスト方式をとっているので意味がないとは思いますが...</p>
<h3 id="ban-に対するハッカーの言葉" tabindex="-1"><a class="header-anchor" href="#ban-に対するハッカーの言葉" aria-hidden="true">#</a> BAN に対するハッカーの言葉</h3>
<p>以下はハッカーである<a href="https://twitter.com/OatmealDome" target="_blank" rel="noopener noreferrer">@OatmealDome<OutboundLink/></a>氏、Zewia 氏の言葉の引用である。</p>
<ul>
<li>「UNBAN する唯一の方法は新しいスイッチを買うこと」</li>
<li>「証明書の共有は『俺を BAN してくれ』といっているのと同じ」</li>
<li>「仮に UNBAN が来ても任天堂はすぐ対策する」</li>
</ul>
<p>BAN 解除なんかに夢を持たずに二台目のニンテンドースイッチを買ったほうが遥かに早いです。</p>
<h2 id="ban-されるとできなくなること" tabindex="-1"><a class="header-anchor" href="#ban-されるとできなくなること" aria-hidden="true">#</a> BAN されるとできなくなること</h2>
<ol>
<li>Nintendo Switch Online へのアクセス</li>
<li>eShop へのアクセス</li>
<li>ゲームのアップデート</li>
<li>システムのアップデート</li>
</ol>
<h3 id="eshop" tabindex="-1"><a class="header-anchor" href="#eshop" aria-hidden="true">#</a> eShop</h3>
<p>eShop にアクセスできなくなるということは、ダウンロード版のゲームが再ダウンロードできなくなることを意味します。</p>
<p>アカウントを移行すればダウンロード権をもったアカウントを別の BAN されていないニンテンドースイッチに移行できそうですが、アカウント移行には Nintendo Switch Online への接続が必須なのでそれもできなくなります。</p>
<p>つまり、購入したダウンロード版のゲームがすべて無意味なものになるということです。</p>
<p>ニンテンドースイッチを改造するというのはそのくらいリスクのある行為だと言うことをまず認識してください。</p>
<h3 id="ゲームのアップデート" tabindex="-1"><a class="header-anchor" href="#ゲームのアップデート" aria-hidden="true">#</a> ゲームのアップデート</h3>
<p>BAN された本体ではアップデートできなくなりますが、「近くの人とバージョンをそろえる」という機能を使うことで一応アップデートができます。</p>
<p>これはローカル通信ですので、Lan-Play ではアップデートできません。</p>
<p>二台持ちしていればどうとでもなるので、二台持ちがおすすめです。</p>
<h3 id="システムのアップデート" tabindex="-1"><a class="header-anchor" href="#システムのアップデート" aria-hidden="true">#</a> システムのアップデート</h3>
<p>システムアップデートは俗に言う SuperBAN という一番ヤバいやつをでなければできます。SuperBAN されていても、ChoiDujourNX や Daybreak などでアップデートすることが可能です。</p>
</template>
