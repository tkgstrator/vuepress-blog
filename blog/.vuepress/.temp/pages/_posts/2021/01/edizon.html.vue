<template><h2 id="edizon" tabindex="-1"><a class="header-anchor" href="#edizon" aria-hidden="true">#</a> <a href="https://github.com/WerWolv/EdiZon/releases" target="_blank" rel="noopener noreferrer">Edizon<OutboundLink/></a></h2>
<p>Edizon とはセーブデータマネージャであり、更に付随機能としてチートコードを有効化することもできる便利なアプリです。</p>
<p>なんで今までそんな便利なアプリの解説記事を書かなかったかというと、スプラトゥーンに限って言えば Edizon よりも IPSwitch を使う機会の方が圧倒的に多いためです。</p>
<h2 id="チート有効化のための手順" tabindex="-1"><a class="header-anchor" href="#チート有効化のための手順" aria-hidden="true">#</a> チート有効化のための手順</h2>
<p>Edizon でチートを有効化するために必要なものは以下の情報です。</p>
<ul>
<li>GAME ID</li>
<li>BID</li>
<li>チートのテキストファイル</li>
</ul>
<p>GAME ID というのはリージョンごとに異なるゲームの ID のことで、BID というのはバージョンごとに異なるゲームのビルド ID です。</p>
<p>BID はリージョンが異なっても同じである場合が多いですね。</p>
<p>最後に適応させたいチートコードが載ったテキストファイル、この三つが必要になります。</p>
<h3 id="事前準備" tabindex="-1"><a class="header-anchor" href="#事前準備" aria-hidden="true">#</a> 事前準備</h3>
<p>今回は逆転裁判 1,2,3 成歩堂セレクションのチートコードを有効化してみましょう。</p>
<p>最初に、特に理由がなければアップデータを削除してバージョンを 1.0.0 に戻し、起動できることを確認してください。</p>
<p>なぜなら、チートコードの開発はバージョン 1.0.0 に対してが最も行われているためです。</p>
<p><img src="https://pbs.twimg.com/media/ErJ8M5rVoAA7A0c?format=png" alt=""></p>
<h3 id="game-id" tabindex="-1"><a class="header-anchor" href="#game-id" aria-hidden="true">#</a> GAME ID</h3>
<p>まず、Edizon をひらき、該当するゲームを選択します。</p>
<p><img src="https://pbs.twimg.com/media/ErJ8LveVQAENDFV?format=png" alt=""></p>
<p>すると、ゲーム ID が表示されます。</p>
<p>ここで、逆転裁判のゲーム ID は<code>0100CB000A142000</code>であることがわかりました。</p>
<p><img src="https://pbs.twimg.com/media/ErJ8Ma1VQAE1AHx?format=png" alt=""></p>
<h3 id="ディレクトリの作成" tabindex="-1"><a class="header-anchor" href="#ディレクトリの作成" aria-hidden="true">#</a> ディレクトリの作成</h3>
<p>ゲーム ID がわかったら、チートコードを適応させるためにまずは必要なフォルダを作成します。</p>
<p>今回の場合ですと、SD カードに<code>sdmc:/atmosphere/contents/0100CB000A142000/cheats</code>のフォルダを作成します。</p>
<p>ここでさっき調べたゲーム ID が必要になってくるわけだな。</p>
<h3 id="bid" tabindex="-1"><a class="header-anchor" href="#bid" aria-hidden="true">#</a> BID</h3>
<p>では次に BID を調べなければいけないのですが、正直これはかなりめんどくさいです。</p>
<p>なので BID については事前に調べずに「この中のどれかがあたるだろう」と決め打ちでしてしまった方が良いかもしれません。</p>
<p>幸いなことにバージョンが同一であれば BID は基本的には固定です。</p>
<p>つまり、スプラトゥーンのように頻繁にアップデートされているタイトルを除けば、BID の候補はそんなに多くないことになります。</p>
<p>また、多くのチートコードはバージョン 1.0.0 をベースに開発されています。先程「なるべく 1.0.0 を利用するほうが良い」といったのはそういう理由があるためです。</p>
<h3 id="チートファイルの検索" tabindex="-1"><a class="header-anchor" href="#チートファイルの検索" aria-hidden="true">#</a> チートファイルの検索</h3>
<p>いろいろサイトがあると思うのですが、とりあえずここで調べてみるのが手っ取り早そうな気はします。</p>
<p><a href="https://github.com/ibnux/switch-cheat" target="_blank" rel="noopener noreferrer">switch-cheat<OutboundLink/></a></p>
<p>逆転裁判のタイトル ID は<code>0100CB000A142000</code>なのでそれで検索をかけてみると見事ヒットしました。</p>
<p><img src="https://pbs.twimg.com/media/ErJ-31xUYAE0M6U?format=png" alt=""></p>
<p>色が反転しているところがタイトル ID で、その右が BID になります。</p>
<p>BID のリストが一つしかないということはバージョン 1.0.0 のチートコードしかないことになります。</p>
<p>ここで BID をクリックするとチートコードのファイルがひらきます。</p>
<p><img src="https://pbs.twimg.com/media/ErJ_BCEU0AAzJJo?format=png" alt="">
コードとしては「全てのエピソード開放」「心証減らない」の二つがあるようです。</p>
<p>ここで右側の「Raw」のボタンを押すことで、実際のファイルを開くことができます。</p>
<p><img src="https://pbs.twimg.com/media/ErJ_GC4VkAAuVhT?format=png" alt=""></p>
<p>このようにファイルを開くことができたら、右クリックから「ファイルとして保存」を選択して好きなところに保存しましょう。</p>
<p>何もしていなければ<code>12b57556658e4f44.txt</code>というファイルが保存されているはずです。</p>
<p>ぼくもこの SD カード使っているので信頼性バッチリ！！！</p>
<h3 id="チートファイルの移動" tabindex="-1"><a class="header-anchor" href="#チートファイルの移動" aria-hidden="true">#</a> チートファイルの移動</h3>
<p>保存したテキストファイルを先ほど作成した cheats フォルダの中にコピーします。</p>
<p><img src="https://pbs.twimg.com/media/ErKAPKtUYAIKk7z?format=png" alt=""></p>
<p>これで、準備は完了です。</p>
<h2 id="チートコードを有効化してみよう" tabindex="-1"><a class="header-anchor" href="#チートコードを有効化してみよう" aria-hidden="true">#</a> チートコードを有効化してみよう</h2>
<p>Edizon はメモリに対してパッチを当てるタイプのチートなので、有効化させるためにはまずゲームを起動する必要があります。</p>
<p>これが IPSwitch とは異なる点ですので、注意しておきましょう。</p>
<p>細かいやり方については多分動画で説明したほうがわかりやすいので、載せておきます。</p>
<p>エピソード全開放のパッチを使うと、無事に全てのエピソードが選択可能になっているのがわかりますね。</p>
<p>逆転裁判の場合、エピソードを全開放した状態でセーブを行うと「全てのエピソードが選択可能」という状態そのものがセーブされるので、二度目以降はチートを当てる必要がありません。</p>
<p>つまり、ゲームのアップデートが可能になります。</p>
<p>ただし「心証減らない」についてはセーブデータに保存される情報ではないので、毎回ちゃんと有効化する必要があります。</p>
<p>記事は以上。</p>
</template>
