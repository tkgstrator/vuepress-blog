<template><h2 id="heroku" tabindex="-1"><a class="header-anchor" href="#heroku" aria-hidden="true">#</a> Heroku</h2>
<p>ほとんど備忘録的な記事。</p>
<p>これから先、Twitter OAuth をしたくなったときに直ぐにできるのはありがたい。</p>
<p><a href="https://jp.heroku.com/" target="_blank" rel="noopener noreferrer">Heroku<OutboundLink/></a></p>
<p>なんかよくわからんけどすごいサービス。</p>
<p>とりあえずアカウントを解説します。</p>
<p><a href="https://elements.heroku.com/buttons/tyfkda/twitter-oauth-test" target="_blank" rel="noopener noreferrer">Elements Marketplace: twitter-oauth-test<OutboundLink/></a></p>
<p>やりたいことはこれなんですけど、これは Ruby なので PHP でも同じことができるかチャレンジします。</p>
<h3 id="twitter-apps-を設定する" tabindex="-1"><a class="header-anchor" href="#twitter-apps-を設定する" aria-hidden="true">#</a> Twitter Apps を設定する</h3>
<p>まずは Twitter の Developer 申請を行って API Key と API Key Secret が取得できるようにしましょう。</p>
<p><img src="https://pbs.twimg.com/media/EwwYOvkVoAI_nZi?format=png" alt=""></p>
<h3 id="heroku-に環境変数をセットする" tabindex="-1"><a class="header-anchor" href="#heroku-に環境変数をセットする" aria-hidden="true">#</a> Heroku に環境変数をセットする</h3>
<p>Settings から環境変数をセットします。</p>
<p><img src="https://pbs.twimg.com/media/EwwXNq9VkAQaCWK?format=png" alt=""></p>
<h3 id="composer-のインストール" tabindex="-1"><a class="header-anchor" href="#composer-のインストール" aria-hidden="true">#</a> composer のインストール</h3>
<p>twitteroauth や dotenv をインストールするために必要なのでインストールします。</p>
<p><a href="https://github.com/tkgstrator/ikastapi" target="_blank" rel="noopener noreferrer">ikastapi<OutboundLink/></a></p>
<p>めんどくさい場合はここから clone してきても良い。</p>
<h3 id="env-ファイルの作成" tabindex="-1"><a class="header-anchor" href="#env-ファイルの作成" aria-hidden="true">#</a> env ファイルの作成</h3>
<p>ファイル自体に API Key を書くとまずいことになるので環境変数自体に API Key を書きます。</p>
<p>dotenv は.env ファイルから環境変数を PHP に読み込ませるための便利なツールなのでそれを利用します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// .env
CONSUMER_KEY=""
CONSUMER_KEY_SECRET=""
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>こんな感じでキーをベタ書きしておきます。</p>
<h2 id="コールバック用の-php-ファイルの作成" tabindex="-1"><a class="header-anchor" href="#コールバック用の-php-ファイルの作成" aria-hidden="true">#</a> コールバック用の PHP ファイルの作成</h2>
<p><a href="https://gist.github.com/tkgstrator/827e4fca6c6ec4198c2d6a65877a86ac" target="_blank" rel="noopener noreferrer">Twitter OAuth<OutboundLink/></a></p>
<p>こんな感じで index.php と callback.php を設定したら GitHub にプッシュするだけです。</p>
<p>Twitter Developer の方で callbackURL として Heroku の URL を通しておくのも忘れないように。</p>
<h2 id="完成したやつ" tabindex="-1"><a class="header-anchor" href="#完成したやつ" aria-hidden="true">#</a> 完成したやつ</h2>
<p><a href="https://ikastagram.herokuapp.com/" target="_blank" rel="noopener noreferrer">ikastagram<OutboundLink/></a></p>
<p>するとサーバレスで簡単に OAuth 認証用の URL が作成できます。</p>
<p>callback.php が認証の方までやってくれるので user_id の値がとってこれます。Twitter の機能にアクセスせず、ユーザ認証をするだけであればこれで十分な気もします。</p>
<p>Heroku 自体はめちゃくちゃ面白くて可能性感じまくりなので土日にでもいろいろ触ってみたいですね。</p>
<p>記事は以上。</p>
</template>
