<template><h2 id="チートとは" tabindex="-1"><a class="header-anchor" href="#チートとは" aria-hidden="true">#</a> チートとは</h2>
<p>任天堂はいつからかアンチチートチートシステムをスプラトゥーン 2 に組み込んでいます。</p>
<p>このアンチチートシステムはとても強力で、LFS と ExeFS の改変を検知して自動で BAN することができました。</p>
<p>チートに疎い方は「LFS？」「ExeFS？」となると思うので簡単に解説したいと思います。</p>
<h3 id="lfs" tabindex="-1"><a class="header-anchor" href="#lfs" aria-hidden="true">#</a> LFS</h3>
<p>LFS とは Layered File System のことで、ものすごく簡単に説明すると内部パラメータを弄った xml などのファイルを本来のファイルから自動的に置換してくれる仕組みのことです。</p>
<p>これが実装されているおかげで 3D モデルや BGM やブキのパラメータを簡単に変更することができるのです。</p>
<p>LFS によるチートの代表的なものはブキの射程が無限、全塗り、SP 必要ポイント 0 などがあります。</p>
<h3 id="exefs" tabindex="-1"><a class="header-anchor" href="#exefs" aria-hidden="true">#</a> ExeFS</h3>
<p>ExeFS とは Executable File System のことで、実行可能なファイルシステムのことを指します。</p>
<p>ものすごく簡単に言うと Windows における exe ファイルのようなものです。</p>
<p>Nintendo Switch における ExeFS とは main や main.npdm のようなファイルを指します。</p>
<p><a href="https://switchbrew.org/wiki/ExeFS" target="_blank" rel="noopener noreferrer">ExeFS - Nintendo Switch Brew<OutboundLink/></a></p>
<p>LFS がファイルを弄るものだったのに対して、こちらはゲーム本体を弄る感じに近いです。</p>
<p>俗に言うチートコードや一昔前のサイバーガジェットの製品である PAR などの挙動が ExeFS の改変にあたります。</p>
<p>ExeFS によるチートの代表的なものは空を飛ぶ、ボム連射、無敵化、常に移動可能などがあります。</p>
<h3 id="lfs-vs-exefs" tabindex="-1"><a class="header-anchor" href="#lfs-vs-exefs" aria-hidden="true">#</a> LFS vs ExeFS</h3>
<p>実装の簡単さは LFS が ExeFS に勝ります。</p>
<p>というのも、ファイルを復号してから内部のパラメータを直接変えることができるからです。</p>
<p>特に、スプラトゥーン 2 はパラメータが xml で書かれているため、ある程度のプログラミング技術がある方であれば難なく書き換えができてしまいます。</p>
<p>更に、バージョンが更新されても（4.5.0 -&gt; 4.5.1 のような）マイナーアップデートではパラメータファイルは変更がない場合が多く、使い回しが効くのも便利なところです。</p>
<p>例えば、バトル中の BGM 変更についてはリリースから一度も変更されていないのでファイルを置き換えれば永続的に効果が反映されます。</p>
<p>@<a href="https://www.youtube.com/watch?v=AKv_t9fP5NY" target="_blank" rel="noopener noreferrer">youtube<OutboundLink/></a></p>
<p>このような感じで BGM を 1 のものに変更することができます。</p>
<p>というか、どうしても Splattack が聴きたかったのがそもそもの始まりなんですよね。</p>
<p>早く 1 の BGM を実装してください、お願いします。</p>
<p>このように、元々ゲーム内に実装されていないデータを扱う場合には LFS でないといけません。</p>
<p>逆に、既に内部情報として持っているデータを扱う場合には ExeFS が勝ります。</p>
<p>ブキのパラメータ変更などは LFS でも ExeFS でも実現できますが、LFS の方が手軽で細かい調整がききます。</p>
<p>ExeFS で射程を変更しようとすると、「全てのブキの射程が 2 倍」になったりとブキごとの調整などは難しかったりします。</p>
<p>理論上、ExeFS で実現できないチートはありません。</p>
<p>それを見つけるのが LFS とは比べ物にならないくらい難しいというだけです。</p>
<h2 id="アンチチートシステム" tabindex="-1"><a class="header-anchor" href="#アンチチートシステム" aria-hidden="true">#</a> アンチチートシステム</h2>
<p>オンラインでチートして検知された場合はチーターのフラグがつけられてしまいます。</p>
<p>チーターのフラグがつけられると、BAN されてしまい翌日からニンテンドーネットワークに接続できなくなります。</p>
<p>BAN の種類はいろいろありますが、LFS や ExeFS を有効化したままオンラインにするとゲーム BAN されるようです。</p>
<p>ゲーム BAN の詳細については上記の記事を御一読ください。</p>
<blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">i love my nintendo christmas surprise <a href="https://t.co/oDCrcHOOsM">pic.twitter.com/oDCrcHOOsM</a></p>&mdash; Khangaroo (@Khangarood) <a href="https://twitter.com/Khangarood/status/1077453421358317569?ref_src=twsrc%5Etfw">December 25, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<p>2018 年 12 月 24 日にはスプラの裏界隈では有名な<a href="https://twitter.com/Khangarood" target="_blank" rel="noopener noreferrer">@Khangarood<OutboundLink/></a>氏が BAN を受けたことが明らかにされています。</p>
<p>氏が行っていた改変は以下の通り。</p>
<ul>
<li>未リリースステージのプラベでのバトル（LFS）</li>
<li>プラベでのパラメータハック（LFS）</li>
<li>海賊版のオクトエキスパンションのプレイ</li>
<li>ニューススキップ（ExeFS）</li>
<li>BGM 無効化（ExeFS）</li>
</ul>
<p>まあこれだけオンラインでやらかしていたら BAN されても仕方ないのでは...という気もしますね。</p>
<p>プラベであったとしてもロビーに入った段階でチート検出に引っかかるらしいので、オンラインプラベでチートを使うのはご法度です。</p>
<p>そもそもロビーに入った時点でニンテンドーネットワークに接続するので、LFS や ExeFS が有効な状態で入るべきではないです。普通に犯罪です。</p>
<h3 id="ところが" tabindex="-1"><a class="header-anchor" href="#ところが" aria-hidden="true">#</a> ところが</h3>
<p>しかし、特別体験版でのチートでの荒れ具合を経て衝撃の事実が明らかになります。</p>
<blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">So uh, here’s a fun story.<br>For around two months (as far as we’ve determined), the anticheat impl in Splatoon 2 was *turned off within matches*. Anyone could have jumped into any match and caused havoc. This explains that the demo allowed people to mod online. Nice job Nintendo.</p>&mdash; Eman Cisab (@shadowninja108) <a href="https://twitter.com/shadowninja108/status/1110608847419269120?ref_src=twsrc%5Etfw">March 26, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote>
<p>ところで、面白い話があるんだ。我々が調査したここ二ヶ月の間、スプラトゥーン 2 におけるアンチチートシステムがバトル中はオフになっていたんだ。誰でもマッチングに飛び込んで好き勝手できたかもしれない。特別体験版がチートできることからもわかると思うけれど。任天堂はいい仕事をしたね。</p>
<p>https://twitter.com/shadowninja108/status/1110608847419269120</p>
</blockquote>
<p>いい仕事をしたね（Nice job Nintendo）の一文は明らかに任天堂に対する皮肉でしょうね。</p>
<p><a href="https://twitter.com/shadowninja108" target="_blank" rel="noopener noreferrer">@shadowninja108<OutboundLink/></a>氏はスプラの裏界隈では<a href="https://github.com/shadowninja108/HACGUI/releases" target="_blank" rel="noopener noreferrer">HACGUI<OutboundLink/></a>などのリリースでかなり有名な人です。</p>
<p>氏が言うのですからこの情報はある程度信頼できるものと言って良いでしょう。</p>
<p>これに対してスプラトゥーン界の神の一人である OatmealDome 氏も反応しています。</p>
<blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">Nintendo did a fucky-wucky with the Splatoon 2 cheat detection system. <a href="https://t.co/8n0Ng7fnWN">https://t.co/8n0Ng7fnWN</a></p>&mdash; OatmealDome (@OatmealDome) <a href="https://twitter.com/OatmealDome/status/1110609403076583429?ref_src=twsrc%5Etfw">March 26, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote>
<p>任天堂はスプラトゥーン 2 のチート検出システムでとんでもないことをやらかしてくれた。</p>
<p>https://twitter.com/OatmealDome/status/1110609403076583429</p>
</blockquote>
<p>なんと、特別体験版に限らずここ二ヶ月もの間チート検出システムっが全く働いていなかったようです。</p>
<p>確かにとんでもないことをやらかしてくれていますね。</p>
<h2 id="hack-について" tabindex="-1"><a class="header-anchor" href="#hack-について" aria-hidden="true">#</a> Hack について</h2>
<p>こういう改造に関する記事を書くと噛みついてきたり、注意喚起してきてくれる人が一定数いるんですが、正直言って余計なお世話です。</p>
<p>ゲームの内部データを探るような行為はリバースエンジニアリングと呼ばれるものですが、これは現在の日本の法律では違法とされていません。</p>
<p>ソフトウェアの解析が違法になったらコンピュータウイルスを解析してワクチンソフト（個人的にはこの書き方は嫌いなのですが）を開発することも違法になってしまいます。</p>
<p>つまり、リバースエンジニアリングは完全に合法です。後ろ指を指される謂れは何もありません。</p>
<p>ただし、任天堂の規約ではリバースエンジニアリングが禁じられているので、改造が原因で任天堂から BAN されることに文句を言ってはいけません。</p>
<p>任天堂の規約が真に正当性があるものかどうかは独占禁止法の観点から議論の余地があるとは思いますが、現状は異議申し立てしない限りは従うべきでしょう。</p>
<blockquote>
<p>特に、プロプライエタリソフトウェアに関しては、法ではなくライセンスあるいは契約の下で、逆アセンブルなどのリバースエンジニアリングでソースコードの抽出などを禁止する旨が書かれていることがほとんどだが、そのような条項は独占禁止法の見地からも問題があるとも言われている。</p>
<p>https://ja.wikipedia.org/wiki/リバースエンジニアリング</p>
</blockquote>
<p>少なくともぼくは任天堂の規約の観点からはニンテンドースイッチの改造は褒められるべき・推奨されるべき行為でないことは理解しています。</p>
<p>理解しているので「それは良くないよ」と言われても「いや、知っているが？」としか返事できないわけですね。</p>
<p>また、当ブログは技術ブログであり改造の推奨や奨励を行っておりません。こういう情報もあるよ、こういう事もできるよということをつらつらと紹介するだけの記事です。</p>
<p>個人的には「良くないことだと思いながらこっそりやる」よりも「悪いことなのに悪いことだと思わず堂々とやる」方がタチが悪いと思うんですが、皆さんの意見はいかがでしょうか？</p>
<p>まあとりあえず任天堂はチート対策に本腰を入れていただけると幸いです。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>これが事実だとしたら、なんでこのタイミングで任天堂はアンチチートシステムをやめたのか理解に苦しみます。</p>
<p>何が楽しいのかはわかりませんが、BAN されなければオンラインでチートしてやろうっていう層は残念ながら一定数存在します。</p>
<p>さっさと不正競争防止法違反か私電磁的記録不正作出で逮捕されてくれっていう感じですね。</p>
<p>というか任天堂ほどの会社が見せしめにオンラインチーターを摘発しない理由がちょっと思いつきません。</p>
<p>影響力が大きい会社なので一発やってほしいところなんですが。</p>
<blockquote>
<p>一般財団法人デジタルコンテンツ協会の平成28年3月付け「平成27年度産業経済研究委託事業　コンテンツ保護の技術的手段に係る法制度及び技術動向等に関する調査研究」によれば、チート行為は、ゲームプログラムを書き換えるものではなく、ゲーム内のアイテム等に係るデータを書き換えるものと分析されています。</p>
<p>http://www.tatsumura-law.com/attorneys/tomoko-inaba/column/?p=527</p>
</blockquote>
<p>この見解によると LFS はチートで、ExeFS はチートでないっていうことになりますね。</p>
<p>記事は以上。</p>
</template>
