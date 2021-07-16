<template><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> GitHub Actions</h2>
<p>そもそも GitHub Actions とは何だということになるのだが、詳しくは GitHub の公式ページを見るのが良い。そこには次のように記されている。</p>
<div class="custom-container tip"><p class="custom-container-title">GitHub Actions とは</p>
<p>GitHub Actions を使用すると、ワールドクラスの CI/CD ですべてのソフトウェアワークフローを簡単に自動化できます。GitHub から直接コードをビルド、テスト、デプロイでき、コードレビュー、ブランチ管理、問題のトリアージを希望どおりに機能させます。</p>
</div>
<p>要するにソースコードを Push したら GitHub のサーバがそれを勝手にビルドしてくれるということ。このあたりは Docker に似たものを感じなくもないですね。</p>
<p>ただし、リソースを使うので使い放題というわけではなく、一ヶ月に利用可能なビルド時間というものがあります。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">消費クレジット</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Linux</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">Windows</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">macOS</td>
<td style="text-align:center">10</td>
</tr>
</tbody>
</table>
<p>考え方としてはクレジット方式で、無料ユーザであれば 2000、有料ユーザであれば 3000 のクレジットが毎月与えられます。Linux のビルドだと 1 分で 1 クレジット消費するので 2000 分ビルドできるのですが、macOS でビルドすると 200 分しか使えないというわけです。</p>
<h2 id="github-actions-を使ってみよう" tabindex="-1"><a class="header-anchor" href="#github-actions-を使ってみよう" aria-hidden="true">#</a> GitHub Actions を使ってみよう</h2>
<p>では実際に GitHub Actions を使ってみましょう。</p>
<p>使うといっても実行したいコマンドを YAML ファイルに書いていくだけです。書き方がわからなかったのですが、つよつよエンジニアの<a href="https://twitter.com/sasapiyogames" target="_blank" rel="noopener noreferrer">ささぴよげえむず<OutboundLink/></a>さんが Github に対して PR を送ってくれたのでそれを参考にしてみることにします。</p>
<p>Salmonia は Python のプログラムで、Windows でそのまま実行しようとすると Pyinstaller でビルドする必要があります。今回は GitHub Actions で Pyinstaller で EXE 化した上で Release に出力するところを考えてみましょう。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> build executables

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">tags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"v*"</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">windows-build</span><span class="token punctuation">:</span> <span class="token comment"># Windows向けビルド</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> windows<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span> <span class="token comment"># コマンドを上から順番に書いていく</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout commit
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@master

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up Python 3.9
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>python@master
        <span class="token key atrule">with</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">python-version</span><span class="token punctuation">:</span> <span class="token number">3.9</span> <span class="token punctuation">}</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upgrade pip
        <span class="token key atrule">run</span><span class="token punctuation">:</span> python <span class="token punctuation">-</span>m pip install <span class="token punctuation">-</span><span class="token punctuation">-</span>upgrade pip PyInstaller

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install requirements
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pip install <span class="token punctuation">-</span>r requirements.txt

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pyinstaller Salmonia.py <span class="token punctuation">-</span><span class="token punctuation">-</span>onefile

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> upload
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> Salmonia<span class="token punctuation">-</span>windows
          <span class="token key atrule">path</span><span class="token punctuation">:</span> dist/Salmonia.exe

  <span class="token key atrule">release</span><span class="token punctuation">:</span> <span class="token comment"># 実行するジョブを書く</span>
    <span class="token key atrule">needs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>windows<span class="token punctuation">-</span>build<span class="token punctuation">]</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span> <span class="token comment"># ビルド後の処理などを書く</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Download Windows
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/download<span class="token punctuation">-</span>artifact@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> Salmonia<span class="token punctuation">-</span>windows

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create Release
        <span class="token key atrule">id</span><span class="token punctuation">:</span> create_release
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/create<span class="token punctuation">-</span>release@v1
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">tag_name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">release_name</span><span class="token punctuation">:</span> Release $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">draft</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token key atrule">prerelease</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Zip
        <span class="token key atrule">run</span><span class="token punctuation">:</span> zip <span class="token punctuation">-</span><span class="token punctuation">-</span>junk<span class="token punctuation">-</span>paths Salmonia<span class="token punctuation">-</span>windows ./Salmonia<span class="token punctuation">-</span>windows/Salmonia.exe

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Append Binary
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>release<span class="token punctuation">-</span>asset@v1
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">upload_url</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.create_release.outputs.upload_url <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">asset_path</span><span class="token punctuation">:</span> ./Salmonia<span class="token punctuation">-</span>windows.zip
          <span class="token key atrule">asset_name</span><span class="token punctuation">:</span> Salmonia<span class="token punctuation">-</span>windows.zip
          <span class="token key atrule">asset_content_type</span><span class="token punctuation">:</span> application/zip
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br></div></div><p>Pyinstaller で EXE を作成するためには Windows で実行しないと意味がないのでビルド時には<code>runs-on</code>に<code>windows-latest</code>を指定していますが、アップロードや ZIP 化するのは別に Linux で構わないのでこちらには<code>ubuntu-latest</code>を指定します。</p>
<p>これがベースの書き方で、これさえ書いておけば全ての Python プログラムは Pyinstaller でビルドして自動リリースができます。ただ、このままだとタグの値に関わらず常に同じファイル名になってしまうので少し気がかりです。</p>
<p>そこで、タグ情報をファイル名に埋め込めるようにします。</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>steps: # ビルド後の処理などを書く
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> - name: Set version
</span><span class="token prefix inserted">+</span><span class="token line">   id: version
</span><span class="token prefix inserted">+</span><span class="token line">   run: |
</span><span class="token prefix inserted">+</span><span class="token line">     REPOSITORY=$(echo ${{ github.repository }} | sed -e "s#.*/##")
</span><span class="token prefix inserted">+</span><span class="token line">     VERSION=$(echo ${{ github.ref }} | sed -e "s#refs/tags/##g")
</span><span class="token prefix inserted">+</span><span class="token line">     echo ::set-output name=version::$VERSION
</span><span class="token prefix inserted">+</span><span class="token line">     echo ::set-output name=filename::$REPOSITORY-$VERSION
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> - name: Download Windows
</span><span class="token prefix unchanged"> </span><span class="token line">   uses: actions/download-artifact@v1
</span><span class="token prefix unchanged"> </span><span class="token line">   with:
</span><span class="token prefix unchanged"> </span><span class="token line">     name: Salmonia-windows
</span></span># 中略
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> - name: Append Binary
</span><span class="token prefix unchanged"> </span><span class="token line">   uses: actions/upload-release-asset@v1
</span><span class="token prefix unchanged"> </span><span class="token line">   env:
</span><span class="token prefix unchanged"> </span><span class="token line">     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
</span><span class="token prefix unchanged"> </span><span class="token line">   with:
</span><span class="token prefix unchanged"> </span><span class="token line">     upload_url: ${{ steps.create_release.outputs.upload_url }}
</span><span class="token prefix unchanged"> </span><span class="token line">     asset_path: ./Salmonia-windows.zip
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     asset_name: Salmonia-windows.zip
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     asset_name: Salmonia-${{ steps.version.outputs.version }}-windows.zip
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">     asset_content_type: application/zip
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><code>github.ref</code>には余計な情報が入っているので一回コマンドでそれらを削除した後に環境変数に入れることで対応します。この使い方、割とスタンダードらしいので覚えておくと便利かもしれません。</p>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/419yWNlLUML._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08GZ44B5Q/?tag=tkgstrator0f-22" target="_blank">【Amazon.co.jp 限定】素晴らしき日々~不連続存在~ 10th anniversary特別仕様版【描き下ろしB2タペストリー(Wスエード) 付き】</a></li>
<li class="price">￥15,708</li>
</ul>
</div>
<h2 id="実際にやってみた" tabindex="-1"><a class="header-anchor" href="#実際にやってみた" aria-hidden="true">#</a> 実際にやってみた</h2>
<p>ビルドして完成したものが<a href="https://github.com/tkgstrator/Salmonia/releases/tag/v1.10.1" target="_blank" rel="noopener noreferrer">こちら<OutboundLink/></a></p>
<p>Windows でのビルドは二分くらいで終わったので常識的な範囲内なら大丈夫そうです。</p>
<p>記事は以上。</p>
</template>
