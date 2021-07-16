<template><h1 id="git-のコマンドをより便利にする" tabindex="-1"><a class="header-anchor" href="#git-のコマンドをより便利にする" aria-hidden="true">#</a> Git のコマンドをより便利にする</h1>
<p>Git は便利なのだが、Tab キーでブランチ名が補完できないので長い名前にしていると入力ミスなどが発生する。</p>
<p>Sourcetree などの GUI ツールを使っていればそういうことは発生しないのだが、ターミナルでも便利に使えるようにしたいわけである。</p>
<p>執筆にあたり<a href="https://qiita.com/mikan3rd/items/d41a8ca26523f950ea9d" target="_blank" rel="noopener noreferrer">【zsh】絶対やるべき！ターミナルで git のブランチ名を表示&amp;補完【git-prompt / git-completion】<OutboundLink/></a>がとても参考になりました。</p>
<h2 id="git-prompt" tabindex="-1"><a class="header-anchor" href="#git-prompt" aria-hidden="true">#</a> git-prompt</h2>
<p><code>git-prompt</code>という便利なツールがあるのでそれを導入する。以下のコマンドを一括でコピペしてターミナルに貼り付けて実行すれば良い。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> ~/.zsh
<span class="token builtin class-name">cd</span> ~/.zsh

<span class="token function">curl</span> -o git-prompt.sh https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh
<span class="token function">curl</span> -o git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
<span class="token function">curl</span> -o _git https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="zshrc-の編集" tabindex="-1"><a class="header-anchor" href="#zshrc-の編集" aria-hidden="true">#</a> .zshrc の編集</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># git-promptの読み込み</span>
<span class="token builtin class-name">source</span> ~/.zsh/git-prompt.sh

<span class="token comment"># git-completionの読み込み</span>
<span class="token assign-left variable">fpath</span><span class="token operator">=</span><span class="token punctuation">(</span>~/.zsh <span class="token variable">$fpath</span><span class="token punctuation">)</span>
zstyle <span class="token string">':completion:*:*:git:*'</span> script ~/.zsh/git-completion.bash
autoload -Uz compinit <span class="token operator">&amp;&amp;</span> compinit

<span class="token comment"># プロンプトのオプション表示設定</span>
<span class="token assign-left variable">GIT_PS1_SHOWDIRTYSTATE</span><span class="token operator">=</span>true
<span class="token assign-left variable">GIT_PS1_SHOWUNTRACKEDFILES</span><span class="token operator">=</span>true
<span class="token assign-left variable">GIT_PS1_SHOWSTASHSTATE</span><span class="token operator">=</span>true
<span class="token assign-left variable">GIT_PS1_SHOWUPSTREAM</span><span class="token operator">=</span>auto

<span class="token comment"># プロンプトの表示設定(好きなようにカスタマイズ可)</span>
setopt PROMPT_SUBST <span class="token punctuation">;</span> <span class="token assign-left variable"><span class="token environment constant">PS1</span></span><span class="token operator">=</span><span class="token string">'%F{green}%n@%m%f: %F{cyan}%~%f %F{red}$(__git_ps1 "(%s)")%f
\$ '</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>最後に<code>source ~/.zshrc</code>として設定を読み込んでやれば良い。</p>
<h3 id="パーミッションの変更" tabindex="-1"><a class="header-anchor" href="#パーミッションの変更" aria-hidden="true">#</a> パーミッションの変更</h3>
<p>ターミナルの起動時にパーミッションエラーで怒られる可能性があるので、以下のコマンドでディレクトリにパーミッションを与えておくと良い。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">755</span> /usr/local/share/zsh/site-functions
<span class="token function">chmod</span> <span class="token number">755</span> /usr/local/share/zsh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
