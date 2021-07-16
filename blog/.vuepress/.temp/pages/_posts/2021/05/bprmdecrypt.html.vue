<template><h2 id="bprm-byaml-byml-とは" tabindex="-1"><a class="header-anchor" href="#bprm-byaml-byml-とは" aria-hidden="true">#</a> BPRM/BYAML/BYML とは</h2>
<p>XML の派生である YAML などをニンテンドー独自の暗号化で難読化したもの。</p>
<p>復号ツールが公開されているのでそれをまずはダウンロードしてきます。</p>
<h2 id="thefourthdimension" tabindex="-1"><a class="header-anchor" href="#thefourthdimension" aria-hidden="true">#</a> <a href="https://github.com/exelix11/TheFourthDimension" target="_blank" rel="noopener noreferrer">TheFourthDimension<OutboundLink/></a></h2>
<p>スーパーマリオオデッセイ用のプログラムなのですが、スプラトゥーン 2 と同じく bprm v3 の暗号化が施されているのでこのツールで復号化することができます。</p>
<p>どうもいくつかの最新のファイルには対応していないようですが、基本的にはこれで問題ありません。</p>
<p>ダウンロードすると The4Dimension.exe が入っていると思います。</p>
<p>この The4Dimension.exe は <code>The4Dimension.exe.exe batch FileName</code> というコマンドで bprm や byml を復号することができます。</p>
<p>ただ、これだと単一のファイルにしか対応していないのでバッチファイルを作成してループ処理ができるようにします。</p>
<div class="language-bat ext-bat line-numbers-mode"><pre v-pre class="language-bat"><code>@echo off
mkdir %~dp0bprm
for %%f in (*.bprm) do (
copy %%f %~dp0bprm %%~nxf
%~dp0convert.exe batch %~dp0bprm %%~nxf
del %~dp0bprm %%~nxf
ren %~dp0bprm %%~nxf.xml %%~nf.xml
)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>このバッチファイルを作成してやれば BPRM ファイルを突っ込めば同一ディレクトリにある全ての BPRM ファイルを XML に変換してくれます。</p>
<p>作成したバッチファイル（例えば、Decrypt.bat）を convert.exe と同じフォルダにおいておきます。</p>
<p>あとはこのバッチファイルに bprm ファイルをドラッグアンドドロップするとフォルダ内の BPRM ファイルが全てコピーされたあとで変換されるという仕組みです。</p>
<p>ただ、この次に紹介する ParmHash を使えばいちいちバッチファイルなんかつくらなくても変換してくれるのでそっちでもアリかもしれません。</p>
<h3 id="コードを置換する" tabindex="-1"><a class="header-anchor" href="#コードを置換する" aria-hidden="true">#</a> コードを置換する</h3>
<p>ただ、これで復号した xml はそのままでは読みにくいので人間が読みやすいコードに変換しましょう。</p>
<p>ちょっと前にリリースした<a href="https://tkgstrator.work/posts/2021/02/26/paramchanger.html" target="_blank" rel="noopener noreferrer">ParamHash<OutboundLink/></a></p>
<div class="custom-container warning"><p class="custom-container-title">逆変換にバグがある</p>
<p>ハッシュからパラメータ名に変換するときに型を無視する設定にしてしまったので、逆変換ができません。</p>
</div>
<h2 id="暗号化" tabindex="-1"><a class="header-anchor" href="#暗号化" aria-hidden="true">#</a> 暗号化</h2>
<div class="language-bat ext-bat line-numbers-mode"><pre v-pre class="language-bat"><code>@echo off
mkdir %~dp0encrypt
for %%f in (*.xml) do (
copy %%f %~dp0encrypt %%~nxf
%~dp0convert.exe batch %~dp0encrypt %%~nxf
del %~dp0encrypt %%~nxf
ren %~dp0encrypt %%~nxf.byml %%~nf.bprm
)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>再暗号化は同じコマンド<code>The4Dimension.exe.exe batch FileName</code>で行なえます。</p>
<p>やはりそれでも一つずつしかファイルが処理できないのでバッチファイルを作成します。</p>
<div class="custom-container danger"><p class="custom-container-title">コマンドについて</p>
<p>動作確認していないのですが、多分上記みたいなバッチファイルで動作するはずです。</p>
<p>間違っていたら各自修正お願いします。</p>
</div>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>今回は BPRM を XML に復号してパラメータを弄る方法について解説しました。</p>
<p>記事は以上。</p>
</template>
