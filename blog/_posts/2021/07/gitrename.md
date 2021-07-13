---
title: よく使うGitコマンドまとめ
date: 2021-07-12
description: 誤って違う名前やメールアドレスでコミットメッセージをプッシュしてしまったときの修正方法です
category: プログラミング
tags:
  - Git
---

# Git のコミットメッセージ

## 基本的なコマンドと意味

### Branch

Git におけるブランチとは、

どういうときに使うかというと、例えば新しい機能をつけるときにオリジナルに手を加えて作業してしまうとプッシュしたときにどんどん`master`ブランチが更新されてしまい、機能が完全に実装できていない中途半端なものが`master`として公開されてしまう問題が発生します。

`master`ブランチは常にビルドが通り、本番環境として利用可能であるべきです。

なので開発中は例えば`develop`ブランチのような開発用のブランチを更新するようにし、実装ができたタイミングで`master`に反映させるのが良いです。

これについてはより良い GitHub のブランチの運用手法が[Git-flow って何？](https://qiita.com/KosukeSone/items/514dd24828b485c69a05)で解説されているのでこれを読むと良い気がします。

自分も参考にしようと思いました。

#### ブランチの作成

`git branch <Branch Name>`で新たにブランチを作成することができます。

#### ブランチの切り替え方

作業しているブランチを切り替えるには、`git checkout <Branch Name>`のコマンドを入力します。

ただし、このコマンドでは存在しないブランチに切り替えることができません。

どんなブランチが存在するかは`git branch`でチェックすることができます。

```sh
* develop
  master
  production
```

例えば次のように表示された場合、ローカルには`develop`, `master`, `production`の三つのレポジトリがあり、現在`develop`で作業していることがわかります。

ブランチを新たに作成して、そのブランチに切り替える場合には`git checkout -b <Branch Name>`を実行すればよいです。

### Merge

`git merge`は別ブランチの内容を別のブランチに反映させるためのコマンドです。

例えば、`develop`ブランチで開発していた機能が完成し、それを`master`ブランチに反映させたい場合などに使われます。

```
git checkout master
git merge develop
```

マージ先に移動してから、マージ元に対して`merge`する必要がある。

### Fetch

`git fetch`はリモートの最新の情報をローカルに反映させるためのコマンドです。

ただし、`master`ブランチに反映されるのではなく`origin/master`に反映されます。`master`と`origin/master`が何が違うのかという問題なのですが、大雑把にいえば以下のような構造になっています。

つまり、`git fetch`をした段階ではまだ`master`には反映されていないということになります。

#### エラーが発生したとき

`git fetch`後にビルドが通らなくなったなどのエラーが発生した場合には、まだローカルの`master`ブランチは更新されていないので、`git reset --hard HEAD`で最後にコミットしたところまでファイルを巻き戻してなかったことにします。

### Pull

`git pull`は`git fetch`と`git merge`を組み合わせたコマンドです。

これを実行すると`remote master`の内容が即座に`master`ブランチに反映されます。

#### --rebase オプション

`git pull`は本来は`git fetch + git merge`なのですが`git merge`は同じファイルを編集していた場合にコンフリクトが発生するという問題があります。

よって、単に`merge`するのではなくて`master`ブランチでの更新点をローカルレポジトリにくっつけてから反映させたいわけです。こうすればブランチが綺麗なまま残りますし、何よりコンフリクトが発生しにくいです。

なので、同一のブランチで作業している場合は`git push`する前に`git pull --rebase`をしたら作業が減って楽になりやすいということです。

#### エラーが発生したとき

`git pull`でエラーが発生するのはコンフリクトが発生した場合だと思うのですが、その場合はまず`git merge`の部分を取り消したいので、

```sh
git merge --abort
git reset --hard HEAD
```

というように二つのコマンドで対応します。

### Rebase

`git rebase`は作業が完了したブランチを分岐元のブランチに延長するときに使う機能です。

`git merge`がブランチの合流であるのに対して、`git rebase`は`master`ブランチに現在のブランチを直列につなげる効果を持ちます。別ブランチの作業を`master`に反映させるという点は`merge`と同じですが、`merge`はコミットメッセージが失われてしまうのに対して、`rebase`の場合は個別のコミットメッセージが保存されるという違いがあります。

::: warning `git rebase`の恐怖

`git rebase`は作業ブランチで実行するためのコマンドです。`master`ブランチでこれを実行すると他のブランチが全て`master`ブランチにくっついてしまいます。

:::

## 名前・メールアドレス変更

Git にプッシュするときの Committer の名前やメールアドレスを変更しておきましょう。

### グローバル

グローバルの設定は各レポジトリの gitconfig に対して何も設定していなかった場合のデフォルト値です。

`git config --global -e`で設定ファイルがひらくので、

```sh
[user]
        name = tkgstrator
        email = nasawake.am@gmail.com
[core]
        ...
```

の`[user]`の項目を編集しましょう。また`vi ~/.gitconfig`でも同様の効果が得られます。

### ローカル

各レポジトリに対するユーザ名とメールアドレスを変更したい場合はこちらを利用します。

例えば A というレポジトリには X という名前でプッシュしたいけれど、B というレポジトリにはは Y という名前でプッシュしたい場合にレポジトリごとに設定をわけたいというような場合があるからです。

コマンド自体は簡単で、`git conig -e`とすればローカルの設定ファイルがひらきます。

例えば、この HP のソースコードを管理しているレポジトリの設定はこんな感じです。

```
[user]
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
```

## コミットの内容を変更

### プッシュしていないコミットの変更

コミットはしてしまったが、プッシュはしていない場合には`git config -e`で設定を変更した後に以下のコマンドで変更を取り込むことができます。

```sh
git commit --amend
```

これだと Commiter しか変更できないので、Author もついでに変更する場合は以下のコマンドを入力します。

```sh
git commit --amend --author="tkgstrator <nasawake.am@gmail.com>"
git rebase --continue
```

### 過去のコミット全てを一括変更

既にプッシュしたコミット全ての Commiter と Author を変更するコマンドは以下の通り。

```sh
git filter-branch -f --env-filter "GIT_AUTHOR_NAME='tkgstrator'; GIT_AUTHOR_EMAIL='nasawake.am@gmail.com'; GIT_COMMITTER_NAME='tkgstrator'; GIT_COMMITTER_EMAIL='nasawake.am@gmail.com';" HEAD
```

既にプッシュしたコミットを変更するので、強制上書きできるように、

```sh
git push -f
```

と`--force`オプションを付けるようにしましょう。

> 参考文献
>
> [Git の Commit Author と Commiter を変更する](https://qiita.com/sea_mountain/items/d70216a5bc16a88ed932)

## フォーク元から最新のデータを取得

GitHub でレポジトリをフォークし、それを Clone した場合には`git pull`をしても自身のレポジトリから最も新しいコミットを取得してきてしまいます。

フォーク元がガンガン開発を進めている場合、フォーク元の最新コミットを取得したいというケースがあります。

```sh
git remote add upstream <GitHub Repository>
```

その場合はレポジトリに対してフォーク元のレポジトリを`upstream`として設定してあげればよいです。

こうすれば普段の Push は自分のフォークしたレポジトリに対して行われますが、最新の内容をフォーク元から取得する場合には、

```sh
git fetch upstream
git merge upsttream/master
```

で行なうことができるようになります。もちろん`master`ブランチ以外を反映させたい場合は適時コマンドの内容を変更してください。

> 参考文献
>
> [GitHub でフォーク元の差分を取り込む](https://qiita.com/hrtkmztn/items/3544c419a3f6fc3534fb)

### 役立つコマンド集

### 最新の内容を反映

作業ブランチでいろいろ作業していたものの、その間に`master`ブランチも進んでいたのでその差分を取り込みたい場合があります。

```
git checkout master
git pull origin master
```

まずはこのコマンドでリモートの`master`ブランチの内容を取得し、その内容をローカルの`master`ブランチに反映させます。

これで、ローカルの`master`はリモートの`master`と全く同一のものになりました。

```
git checkout develop
git rebase master
```

次に`master`ブランチの後ろに`develop`がくるように変更します。こうすることで最後の`master`の変更までを取り込んだ上でこれまでの`develop`の作業がくっつくことになります。

結果として、現在の作業ブランチに最新の`master`の内容が反映されたことになります。
