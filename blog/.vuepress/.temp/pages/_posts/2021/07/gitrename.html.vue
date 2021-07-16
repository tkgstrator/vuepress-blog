<template><h1 id="git-のコミットメッセージ" tabindex="-1"><a class="header-anchor" href="#git-のコミットメッセージ" aria-hidden="true">#</a> Git のコミットメッセージ</h1>
<h2 id="基本的なコマンドと意味" tabindex="-1"><a class="header-anchor" href="#基本的なコマンドと意味" aria-hidden="true">#</a> 基本的なコマンドと意味</h2>
<h3 id="branch" tabindex="-1"><a class="header-anchor" href="#branch" aria-hidden="true">#</a> Branch</h3>
<p>Git におけるブランチとは、</p>
<p>どういうときに使うかというと、例えば新しい機能をつけるときにオリジナルに手を加えて作業してしまうとプッシュしたときにどんどん<code>master</code>ブランチが更新されてしまい、機能が完全に実装できていない中途半端なものが<code>master</code>として公開されてしまう問題が発生します。</p>
<p><code>master</code>ブランチは常にビルドが通り、本番環境として利用可能であるべきです。</p>
<p>なので開発中は例えば<code>develop</code>ブランチのような開発用のブランチを更新するようにし、実装ができたタイミングで<code>master</code>に反映させるのが良いです。</p>
<p>これについてはより良い GitHub のブランチの運用手法が<a href="https://qiita.com/KosukeSone/items/514dd24828b485c69a05" target="_blank" rel="noopener noreferrer">Git-flow って何？<OutboundLink/></a>で解説されているのでこれを読むと良い気がします。</p>
<p>自分も参考にしようと思いました。</p>
<h4 id="ブランチの作成" tabindex="-1"><a class="header-anchor" href="#ブランチの作成" aria-hidden="true">#</a> ブランチの作成</h4>
<p><code>git branch &lt;Branch Name&gt;</code>で新たにブランチを作成することができます。</p>
<h4 id="ブランチの切り替え方" tabindex="-1"><a class="header-anchor" href="#ブランチの切り替え方" aria-hidden="true">#</a> ブランチの切り替え方</h4>
<p>作業しているブランチを切り替えるには、<code>git checkout &lt;Branch Name&gt;</code>のコマンドを入力します。</p>
<p>ただし、このコマンドでは存在しないブランチに切り替えることができません。</p>
<p>どんなブランチが存在するかは<code>git branch</code>でチェックすることができます。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>* develop
  master
  production
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>例えば次のように表示された場合、ローカルには<code>develop</code>, <code>master</code>, <code>production</code>の三つのレポジトリがあり、現在<code>develop</code>で作業していることがわかります。</p>
<p>ブランチを新たに作成して、そのブランチに切り替える場合には<code>git checkout -b &lt;Branch Name&gt;</code>を実行すればよいです。</p>
<h3 id="merge" tabindex="-1"><a class="header-anchor" href="#merge" aria-hidden="true">#</a> Merge</h3>
<p><img src="https://github.com/tkgstrator/vuepress-blog-assets/raw/master/2021/07/merge.png" alt=""></p>
<p><code>git merge</code>は別ブランチの内容を別のブランチに反映させるためのコマンドです。</p>
<p><code>develop</code>ブランチで開発していた機能が完成し、それを<code>master</code>ブランチに反映させたい場合などに使われます。</p>
<p>今回は図のように<code>develop</code>ブランチの G という変更を master に反映させたい場合を考えます。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout master
git merge develop
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>マージ先に移動してから、マージ元に対して<code>merge</code>する必要があります。マージの際にはマージコミット(<code>F</code>)と呼ばれる特別なコミットが作成されます。</p>
<p>このとき<code>F</code>は<code>C</code>の変更も<code>D</code>, <code>E</code>の変更も含まれています。</p>
<h3 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch" aria-hidden="true">#</a> Fetch</h3>
<p><code>git fetch</code>はリモートの最新の情報をローカルに反映させるためのコマンドです。</p>
<p>ただし、<code>master</code>ブランチに反映されるのではなく<code>origin/master</code>に反映されます。<code>master</code>と<code>origin/master</code>が何が違うのかという問題なのですが、大雑把にいえば以下のような構造になっています。</p>
<p>つまり、<code>git fetch</code>をした段階ではまだ<code>master</code>には反映されていないということになります。</p>
<h4 id="エラーが発生したとき" tabindex="-1"><a class="header-anchor" href="#エラーが発生したとき" aria-hidden="true">#</a> エラーが発生したとき</h4>
<p><code>git fetch</code>後にビルドが通らなくなったなどのエラーが発生した場合には、まだローカルの<code>master</code>ブランチは更新されていないので、<code>git reset --hard HEAD</code>で最後にコミットしたところまでファイルを巻き戻してなかったことにします。</p>
<h3 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> Pull</h3>
<p><img src="https://github.com/tkgstrator/vuepress-blog-assets/raw/master/2021/07/branch.png" alt=""></p>
<p><code>git pull</code>は<code>git fetch</code>と<code>git merge</code>を組み合わせたコマンドです。</p>
<p>これを実行すると<code>remote master</code>の内容が即座に<code>master</code>ブランチに反映されます。</p>
<h4 id="rebase-オプション" tabindex="-1"><a class="header-anchor" href="#rebase-オプション" aria-hidden="true">#</a> --rebase オプション</h4>
<p><code>git pull</code>は本来は<code>git fetch + git merge</code>なのですが<code>git merge</code>は同じファイルを編集していた場合にコンフリクトが発生するという問題があります。</p>
<p>よって、単に<code>merge</code>するのではなくて<code>master</code>ブランチでの更新点をローカルレポジトリにくっつけてから反映させたいわけです。こうすればブランチが綺麗なまま残りますし、何よりコンフリクトが発生しにくいです。</p>
<p>なので、同一のブランチで作業している場合は<code>git push</code>する前に<code>git pull --rebase</code>をしたら作業が減って楽になりやすいということです。</p>
<h4 id="エラーが発生したとき-1" tabindex="-1"><a class="header-anchor" href="#エラーが発生したとき-1" aria-hidden="true">#</a> エラーが発生したとき</h4>
<p><code>git pull</code>でエラーが発生するのはコンフリクトが発生した場合だと思うのですが、その場合はまず<code>git merge</code>の部分を取り消したいので、</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> merge --abort
<span class="token function">git</span> reset --hard HEAD
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>というように二つのコマンドで対応します。</p>
<h3 id="rebase" tabindex="-1"><a class="header-anchor" href="#rebase" aria-hidden="true">#</a> Rebase</h3>
<p><img src="https://github.com/tkgstrator/vuepress-blog-assets/raw/master/2021/07/rebase.png" alt=""></p>
<p><code>git rebase</code>は作業が完了したブランチを分岐元のブランチに延長するときに使う機能です。</p>
<p>この図でいうと G の地点で<code>git rebase master</code>のコマンドを入力すると、その時点での<code>master</code>ブランチの先頭に対して現在のブランチの最も古いブランチがくっつきます。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout develop    <span class="token comment"># developブランチに移動</span>
<span class="token function">git</span> rebase master       <span class="token comment"># DにCをくっつける</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>これで<code>develop</code>ブランチは図のように一直線(fast-forward)になったので、その変更を<code>master</code>ブランチに反映させます。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout master
<span class="token function">git</span> merge develop
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>このとき<code>E</code>は<code>C</code>の変更も含まれています。つまり、マージした場合と内容は変わらないので最終的な統合結果には差がありませんが、リベースのほうがよりスッキリとした歴史になります。</p>
<p><code>git merge</code>がブランチの合流であるのに対して、<code>git rebase</code>は<code>master</code>ブランチに現在のブランチを直列につなげる効果を持ちます。別ブランチの作業を<code>master</code>に反映させるという点は<code>merge</code>と同じですが、<code>merge</code>はコミットメッセージが失われてしまうのに対して、<code>rebase</code>の場合は個別のコミットメッセージが保存されるという違いがあります。</p>
<div class="custom-container warning"><p class="custom-container-title">`git rebase`の恐怖</p>
<p><code>git rebase</code>は作業ブランチで実行するためのコマンドです。<code>master</code>ブランチでこれを実行すると他のブランチが全て<code>master</code>ブランチにくっついてしまいます。</p>
</div>
<h2 id="log" tabindex="-1"><a class="header-anchor" href="#log" aria-hidden="true">#</a> Log</h2>
<p>過去の変更を確認します。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> log
commit 8bdd9cd163fed7442330d1535f5b4afff29665b1 <span class="token punctuation">(</span>HEAD -<span class="token operator">></span> master, origin/master, origin/HEAD<span class="token punctuation">)</span>
Author: tkgstrator <span class="token operator">&lt;</span>nasawake.am@gmail.com<span class="token operator">></span>
Date:   Tue Jul <span class="token number">13</span> <span class="token number">10</span>:55:13 <span class="token number">2021</span> +0900

    - 記事の追加

commit 2361ec0ed7233a293c49ff1e5c6570ef61129fc3
Merge: 987f0db 02f84c2
Author: tkgstrator <span class="token operator">&lt;</span>nasawake.am@gmail.com<span class="token operator">></span>
Date:   Fri Jul <span class="token number">9</span> <span class="token number">13</span>:27:30 <span class="token number">2021</span> +0900

    Merge pull request <span class="token comment">#30 from skmtie/master</span>

    - 記事の追加と修正
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><code>commit</code>の隣に表示されているのがハッシュ値で、これは次に紹介する<code>Reset</code>をする際に必要になります。</p>
<p>この画面を閉じるのは<code>Esc</code>ではなく<code>q</code>ですので覚えておくと良いでしょう。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> log --oneline
8bdd9cd <span class="token punctuation">(</span>HEAD -<span class="token operator">></span> master, origin/master, origin/HEAD<span class="token punctuation">)</span> - 記事の追加
2361ec0 Merge pull request <span class="token comment">#30 from skmtie/master</span>
02f84c2 - 記事の修正
a906c40 - 記事の追加
987f0db - 記事の追加
65c7e97 Merge pull request <span class="token comment">#29 from skmtie/master</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>ログの一覧を見たい場合は<code>--oneline</code>のオプションが利用できます。短いですがこちらのハッシュ値も使えます。</p>
<h3 id="より詳細のログ" tabindex="-1"><a class="header-anchor" href="#より詳細のログ" aria-hidden="true">#</a> より詳細のログ</h3>
<p><code>git log</code>は現在の状態よりも過去のログしか見ることができません。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> reflog
8bdd9cd <span class="token punctuation">(</span>HEAD -<span class="token operator">></span> master, origin/master, origin/HEAD<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: commit: - 記事の追加
2361ec0 HEAD@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: checkout: moving from assets to master
f1e8a5e <span class="token punctuation">(</span>origin/assets, assets<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: commit: - 透過PNG用のブランチ
2361ec0 HEAD@<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span>: checkout: moving from master to assets
2361ec0 HEAD@<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span>: pull: Fast-forward
6ed0dd4 HEAD@<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span>: commit: - コメントの修正
621b01f HEAD@<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">}</span>: commit: - 記事のタグが誤っていた問題を修正
6ad9a72 HEAD@<span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">}</span>: rebase finished: returning to refs/heads/master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>より詳しい情報を見たい場合は<code>git reflog</code>を利用します。</p>
<p>このコマンドは<code>git reset</code>を誤って実行した場合に必要になってきます。</p>
<h2 id="reset" tabindex="-1"><a class="header-anchor" href="#reset" aria-hidden="true">#</a> Reset</h2>
<p>なにかやらかしてしまってそれを取り消したい場合に使います。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>8bdd9cd - D <span class="token comment"># 誤ったコミット</span>
02f84c2 - C
a906c40 - B
987f0db - A
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>誤ったコミットがまだプッシュされていなければローカルでこっそり修正すれば済みます。</p>
<p>ここで、<code>D</code>のコミットの変更内容が必要かどうかで対応が変わってきます。</p>
<ol>
<li><code>D</code>のコミット内容が必要、コミットをなかったことにしたい</li>
<li><code>D</code>のコミット内容は不要、<code>C</code>の状態に戻したい</li>
</ol>
<h3 id="soft" tabindex="-1"><a class="header-anchor" href="#soft" aria-hidden="true">#</a> Soft</h3>
<p>1 の場合がコレに該当します。コミットだけ巻き戻し、ファイルは変更しません。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset --soft 02f84c2 <span class="token comment"># Cのコミットのハッシュ値を入力</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>また、一つ戻すだけであればハッシュ値を使わずに以下のコマンドも利用できます。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset --soft HEAD^
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>HEAD</code>と入力するのがめんどくさければ代わりに<code>@</code>も使えます。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset --soft @^
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="hard" tabindex="-1"><a class="header-anchor" href="#hard" aria-hidden="true">#</a> Hard</h3>
<p>巻き戻した位置のファイルの状態に変更します。</p>
<p>使い方は<code>Soft</code>の場合と同じですがオプションとして<code>--hard</code>を指定します。</p>
<h3 id="戻しすぎた場合" tabindex="-1"><a class="header-anchor" href="#戻しすぎた場合" aria-hidden="true">#</a> 戻しすぎた場合</h3>
<p><code>Soft</code>でも<code>Hard</code>の場合でも戻しすぎた場合には未来のコミットは見えないという制約から<code>git log</code>では戻したいコミットを確認することができません。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> reflog <span class="token comment"># 戻したいコミットを確認</span>
<span class="token function">git</span> reset --soft <span class="token comment"># ハッシュ値を指定</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>その場合は<code>git reflog</code>で全てのログを確認することで対応できます。</p>
<h2 id="名前・メールアドレス変更" tabindex="-1"><a class="header-anchor" href="#名前・メールアドレス変更" aria-hidden="true">#</a> 名前・メールアドレス変更</h2>
<p>Git にプッシュするときの Committer の名前やメールアドレスを変更しておきましょう。</p>
<h3 id="グローバル" tabindex="-1"><a class="header-anchor" href="#グローバル" aria-hidden="true">#</a> グローバル</h3>
<p>グローバルの設定は各レポジトリの gitconfig に対して何も設定していなかった場合のデフォルト値です。</p>
<p><code>git config --global -e</code>で設定ファイルがひらくので、</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>user<span class="token punctuation">]</span>
        name <span class="token operator">=</span> tkgstrator
        email <span class="token operator">=</span> nasawake.am@gmail.com
<span class="token punctuation">[</span>core<span class="token punctuation">]</span>
        <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>の<code>[user]</code>の項目を編集しましょう。また<code>vi ~/.gitconfig</code>でも同様の効果が得られます。</p>
<h3 id="ローカル" tabindex="-1"><a class="header-anchor" href="#ローカル" aria-hidden="true">#</a> ローカル</h3>
<p>各レポジトリに対するユーザ名とメールアドレスを変更したい場合はこちらを利用します。</p>
<p>例えば A というレポジトリには X という名前でプッシュしたいけれど、B というレポジトリにはは Y という名前でプッシュしたい場合にレポジトリごとに設定をわけたいというような場合があるからです。</p>
<p>コマンド自体は簡単で、<code>git conig -e</code>とすればローカルの設定ファイルがひらきます。</p>
<p>例えば、この HP のソースコードを管理しているレポジトリの設定はこんな感じです。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[user]
        name = tkgstrator
        email = nasawake.am@gmail.com
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@github.com:tkgstrator/vuepress-blog.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="コミットの内容を変更" tabindex="-1"><a class="header-anchor" href="#コミットの内容を変更" aria-hidden="true">#</a> コミットの内容を変更</h2>
<h3 id="プッシュしていないコミットの変更" tabindex="-1"><a class="header-anchor" href="#プッシュしていないコミットの変更" aria-hidden="true">#</a> プッシュしていないコミットの変更</h3>
<p>コミットはしてしまったが、プッシュはしていない場合には<code>git config -e</code>で設定を変更した後に以下のコマンドで変更を取り込むことができます。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit --amend
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>これだと Commiter しか変更できないので、Author もついでに変更する場合は以下のコマンドを入力します。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit --amend --author<span class="token operator">=</span><span class="token string">"tkgstrator &lt;nasawake.am@gmail.com>"</span>
<span class="token function">git</span> rebase --continue
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="過去のコミット全てを一括変更" tabindex="-1"><a class="header-anchor" href="#過去のコミット全てを一括変更" aria-hidden="true">#</a> 過去のコミット全てを一括変更</h3>
<p>既にプッシュしたコミット全ての Commiter と Author を変更するコマンドは以下の通り。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> filter-branch -f --env-filter <span class="token string">"GIT_AUTHOR_NAME='tkgstrator'; GIT_AUTHOR_EMAIL='nasawake.am@gmail.com'; GIT_COMMITTER_NAME='tkgstrator'; GIT_COMMITTER_EMAIL='nasawake.am@gmail.com';"</span> HEAD
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>既にプッシュしたコミットを変更するので、強制上書きできるように、</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> push -f
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>と<code>--force</code>オプションを付けるようにしましょう。</p>
<blockquote>
<p>参考文献</p>
<p><a href="https://qiita.com/sea_mountain/items/d70216a5bc16a88ed932" target="_blank" rel="noopener noreferrer">Git の Commit Author と Commiter を変更する<OutboundLink/></a></p>
</blockquote>
<h2 id="フォーク元から最新のデータを取得" tabindex="-1"><a class="header-anchor" href="#フォーク元から最新のデータを取得" aria-hidden="true">#</a> フォーク元から最新のデータを取得</h2>
<p>GitHub でレポジトリをフォークし、それを Clone した場合には<code>git pull</code>をしても自身のレポジトリから最も新しいコミットを取得してきてしまいます。</p>
<p>フォーク元がガンガン開発を進めている場合、フォーク元の最新コミットを取得したいというケースがあります。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> upstream <span class="token operator">&lt;</span>GitHub Repository<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>その場合はレポジトリに対してフォーク元のレポジトリを<code>upstream</code>として設定してあげればよいです。</p>
<p>こうすれば普段の Push は自分のフォークしたレポジトリに対して行われますが、最新の内容をフォーク元から取得する場合には、</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> fetch upstream
<span class="token function">git</span> merge upsttream/master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>で行なうことができるようになります。もちろん<code>master</code>ブランチ以外を反映させたい場合は適時コマンドの内容を変更してください。</p>
<blockquote>
<p>参考文献</p>
<p><a href="https://qiita.com/hrtkmztn/items/3544c419a3f6fc3534fb" target="_blank" rel="noopener noreferrer">GitHub でフォーク元の差分を取り込む<OutboundLink/></a></p>
</blockquote>
<h3 id="役立つコマンド集" tabindex="-1"><a class="header-anchor" href="#役立つコマンド集" aria-hidden="true">#</a> 役立つコマンド集</h3>
<h3 id="最新の内容を反映" tabindex="-1"><a class="header-anchor" href="#最新の内容を反映" aria-hidden="true">#</a> 最新の内容を反映</h3>
<p>作業ブランチでいろいろ作業していたものの、その間に<code>master</code>ブランチも進んでいたのでその差分を取り込みたい場合があります。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout master
git pull origin master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>まずはこのコマンドでリモートの<code>master</code>ブランチの内容を取得し、その内容をローカルの<code>master</code>ブランチに反映させます。</p>
<p>これで、ローカルの<code>master</code>はリモートの<code>master</code>と全く同一のものになりました。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout develop
git rebase master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>次に<code>master</code>ブランチの後ろに<code>develop</code>がくるように変更します。こうすることで最後の<code>master</code>の変更までを取り込んだ上でこれまでの<code>develop</code>の作業がくっつくことになります。</p>
<p>結果として、現在の作業ブランチに最新の<code>master</code>の内容が反映されたことになります。</p>
<h3 id="指定したコミットの内容を反映" tabindex="-1"><a class="header-anchor" href="#指定したコミットの内容を反映" aria-hidden="true">#</a> 指定したコミットの内容を反映</h3>
<p>別ブランチの指定したコミットの内容を反映させます。</p>
<p>今回は<code>developA</code>の内容を<code>developB</code>に反映させたいと思います。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout developA   <span class="token comment"># ブランチを移動</span>
<span class="token function">git</span> log                 <span class="token comment"># コミットのハッシュをチェック</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>まず、取り込みたい内容のハッシュをチェックします。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout developB   <span class="token comment"># ブランチを移動</span>
<span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>HASH<span class="token operator">></span>  <span class="token comment"># ハッシュを指定して取り込み</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
