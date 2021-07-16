<template><h2 id="swiftpackagemanager" tabindex="-1"><a class="header-anchor" href="#swiftpackagemanager" aria-hidden="true">#</a> SwiftPackageManager</h2>
<p>Apple 謹製のライブラリ管理ツールなのだが、CocoaPods や Carthage で開発したライブラリをそのまま移植しようとするとバグることがある。</p>
<p>というのも、どうも外部ファイルが正しく読み込めていないようで XIB や NIB などのファイルを読み込ませようとするとクラッシュする。</p>
<h3 id="既存の問題" tabindex="-1"><a class="header-anchor" href="#既存の問題" aria-hidden="true">#</a> 既存の問題</h3>
<p>現在のところ、以下のバグが存在しているようだ。</p>
<ul>
<li>IBDesignable が効かない</li>
<li>XIB や NIB をそのまま利用するとクラッシュする
<ul>
<li>対応策はあるが</li>
</ul>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">参考文献</p>
<p><a href="https://qiita.com/kazuhiro4949/items/0378e163fa00a79eb00a" target="_blank" rel="noopener noreferrer">	iOS用ライブラリ作成者向けSwift Package Managerのリソース周りTips<OutboundLink/></a></p>
<p><a href="https://qiita.com/am10/items/72dbc511efc512fc065a" target="_blank" rel="noopener noreferrer">自作ライブラリのSwift Package Manager(SwiftPM)対応<OutboundLink/></a></p>
</div>
<p>今回は XIB や NIB については扱わず、JSON ファイルをローカルでライブラリに追加したい場合を考える。</p>
<p>もちろん、最初から JSON を Swift のデータ構造に変換してから追加すればこのような記事は要らないのだが、いちいち変換するコードも書きたくないのである。</p>
<p>今回考えるのは以下のような JSON である。全部書くと長くなるので最初の一つのオブジェクトだけ書いたが、これが延々と数百個配列に入ったものだと考えてもらえば良い。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">"end_time"</span><span class="token operator">:</span> <span class="token number">1500696000</span><span class="token punctuation">,</span>
    <span class="token property">"rare_weapon"</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">,</span>
    <span class="token property">"stage_id"</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
    <span class="token property">"start_time"</span><span class="token operator">:</span> <span class="token number">1500616800</span><span class="token punctuation">,</span>
    <span class="token property">"weapon_list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5010</span><span class="token punctuation">,</span> <span class="token number">1010</span><span class="token punctuation">,</span> <span class="token number">2010</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>賢明なうちの読者の皆様ならわかるだろうが、これは Codable を使って自動エンコードできる。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 受け取るJSON配列一つ一つの構造</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token builtin">CoopShift</span><span class="token punctuation">:</span> <span class="token builtin">Codable</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> startTime<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> endTime<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> stageId<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> rareWeapon<span class="token punctuation">:</span> <span class="token builtin">Int</span>
    <span class="token keyword">var</span> weaponList<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">Int</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>つまり、こういう構造になっているというのがすぐに分かるわけである。</p>
<p>最後に JSONDecoder の<code>keyDecodingStrategy</code>でスネークケースからの自動変換設定をつけて読み込ませればいいというわけだ。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertFromSnakeCase
    <span class="token keyword">return</span> decoder
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>となれば問題となるのはローカル JSON を Data 型として取得するところだけである。</p>
<p>が、これを解決するのに結構時間がかかった。</p>
<h2 id="package-swift-の編集" tabindex="-1"><a class="header-anchor" href="#package-swift-の編集" aria-hidden="true">#</a> Package.swift の編集</h2>
<p>今回は読み込ませたいファイルを<code>coop.json</code>とし、該当ファイルをパッケージのソースコードディレクトリ内の<code>Resource</code>ディレクトリ内に配置した。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// swift-tools-version:5.3</span>
<span class="token comment">// The swift-tools-version declares the minimum version of Swift required to build this package.</span>

<span class="token keyword">import</span> <span class="token builtin">PackageDescription</span>

<span class="token keyword">let</span> package <span class="token operator">=</span> <span class="token function">Package</span><span class="token punctuation">(</span>
    name<span class="token punctuation">:</span> <span class="token string">"SalmonStats"</span><span class="token punctuation">,</span>
    platforms<span class="token punctuation">:</span>  <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">iOS</span><span class="token punctuation">(</span><span class="token punctuation">.</span>v13<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token function">macOS</span><span class="token punctuation">(</span><span class="token punctuation">.</span>v10_15<span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    products<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">library</span><span class="token punctuation">(</span>
            name<span class="token punctuation">:</span> <span class="token string">"SalmonStats"</span><span class="token punctuation">,</span>
            targets<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"SalmonStats"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    dependencies<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">package</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token string">"https://github.com/Alamofire/Alamofire.git"</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token string">"5.4.2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">.</span><span class="token function">package</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token string">"https://github.com/groue/CombineExpectations.git"</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> <span class="token string">"0.7.0"</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    targets<span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span>
            name<span class="token punctuation">:</span> <span class="token string">"SalmonStats"</span><span class="token punctuation">,</span>
            dependencies<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"Alamofire"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            resources<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token string">"Resources/coop.json"</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">// 追加</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">.</span><span class="token function">testTarget</span><span class="token punctuation">(</span>
            name<span class="token punctuation">:</span> <span class="token string">"SalmonStatsTests"</span><span class="token punctuation">,</span>
            dependencies<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"SalmonStats"</span><span class="token punctuation">,</span> <span class="token string">"CombineExpectations"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            resources<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span><span class="token string">"Resources/coop.json"</span><span class="token punctuation">)</span><span class="token punctuation">]</span>  <span class="token comment">// 追加</span>
            <span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>注意点としては<code>copy</code>コマンドを使わないといけないという点。詳しくは<a href="https://developer.apple.com/documentation/swift_packages/bundling_resources_with_a_swift_package" target="_blank" rel="noopener noreferrer">Apple のドキュメント<OutboundLink/></a>を読めば書いてある。</p>
<p>JSON ファイル自体は多分どこでもいいんだろうけれど、<code>Resources</code>においておくのが無難ではないかと思っている。</p>
<p><img src="/assets/images/07.png" alt=""></p>
<h2 id="ローカルファイル読み込み" tabindex="-1"><a class="header-anchor" href="#ローカルファイル読み込み" aria-hidden="true">#</a> ローカルファイル読み込み</h2>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// NG</span>
<span class="token keyword">guard</span> <span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token builtin">Bundle</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>forResource<span class="token punctuation">:</span> <span class="token string">"coop"</span><span class="token punctuation">,</span> withExtension<span class="token punctuation">:</span> <span class="token string">"json"</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>

<span class="token comment">// NG</span>
<span class="token keyword">guard</span> <span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token builtin">Bundle</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span>forResource<span class="token punctuation">:</span> <span class="token string">"coop"</span><span class="token punctuation">,</span> ofType<span class="token punctuation">:</span> <span class="token string">"json"</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>

<span class="token comment">// OK</span>
<span class="token keyword">guard</span> <span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token builtin">Bundle</span><span class="token punctuation">.</span>module<span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>forResource<span class="token punctuation">:</span> <span class="token string">"coop"</span><span class="token punctuation">,</span> withExtension<span class="token punctuation">:</span> <span class="token string">"json"</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>いろいろ調べると<code>Bundle.main.path</code>や<code>Bundle.main.url</code>を使うように書いてあるがこれは Swift Package Manager では全く動かないのでいくら使ってもダメ。</p>
<p>というか、そもそも<code>Bundle.main</code>はライブラリで使うのは推奨されていないようだ。</p>
<p>Swift Package Manager の場合は必ず<code>Bundle.module</code>で読み込ませること。そうしないと Swift Package Manager では常に nil が返ってきてファイル読み込みに失敗してしまう。</p>
<h3 id="使い方" tabindex="-1"><a class="header-anchor" href="#使い方" aria-hidden="true">#</a> 使い方</h3>
<p>これで正しいのかはわからないのだが、ライブラリで実際に使うところまで実装してみた。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token comment">// 継承できないようにfinalでs値減する</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">SalmonStats</span> <span class="token punctuation">{</span>

    <span class="token comment">// Singletonで宣言</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">let</span> shared <span class="token operator">=</span> <span class="token function">SalmonStats</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> task<span class="token punctuation">:</span> <span class="token builtin">AnyCancellable</span><span class="token operator">?</span>
    <span class="token comment">// 一回だけ呼び出して再利用するのでstaticで呼び出す</span>
    <span class="token keyword">static</span> <span class="token keyword">var</span> shift<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token builtin">CoopShift</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span>
            <span class="token keyword">guard</span> <span class="token keyword">let</span> json <span class="token operator">=</span> <span class="token builtin">Bundle</span><span class="token punctuation">.</span>module<span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>forResource<span class="token punctuation">:</span> <span class="token string">"coop"</span><span class="token punctuation">,</span> withExtension<span class="token punctuation">:</span> <span class="token string">"json"</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
            <span class="token keyword">guard</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token function">Data</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> json<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
            <span class="token keyword">let</span> decoder<span class="token punctuation">:</span> <span class="token builtin">JSONDecoder</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token function">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                decoder<span class="token punctuation">.</span>keyDecodingStrategy <span class="token operator">=</span> <span class="token punctuation">.</span>convertFromSnakeCase
                <span class="token keyword">return</span> decoder
            <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token keyword">guard</span> <span class="token keyword">let</span> shift <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> decoder<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token builtin">CoopShift</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
            <span class="token keyword">return</span> shift
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>読み込みに失敗したら空っぽの配列を返すようにした。</p>
<p>まあ、実際にはライブラリ内で失敗することは想定されないので強制アンラップしてしまっても良いかもしれない。</p>
<h2 id="ライブラリを改修する" tabindex="-1"><a class="header-anchor" href="#ライブラリを改修する" aria-hidden="true">#</a> ライブラリを改修する</h2>
<p>Salmon Stats の API はリザルトを一件ずつ取得した場合には全部のデータが正しく入っているのだが、複数件同時取得の API を叩くと何故か startTime と playTime の二つしかスケジュール情報が入っていないという大問題（バグ？）がある。</p>
<p>このため、ステージ ID などもいちいちアプリ側でとってこなければいけないという仕様になっている。</p>
<p>これはライブラリ側で解決すべき問題だと考えているので、Salmon Stats ライブラリでは自動補完できるようにするのである。</p>
<h2 id="完成したもの" tabindex="-1"><a class="header-anchor" href="#完成したもの" aria-hidden="true">#</a> 完成したもの</h2>
<p>いろいろあったが、無事に<a href="https://github.com/tkgstrator/SalmonStats" target="_blank" rel="noopener noreferrer">Salmon Stats ライブラリ<OutboundLink/></a>を完成させることができた。</p>
<p>詳しくは README に書いてあるのだが、以下の API を叩いてそのレスポンスを整形した上で返してくれる。</p>
<table>
<thead>
<tr>
<th style="text-align:center">内容</th>
<th style="text-align:center">エンドポイント</th>
<th style="text-align:center">パラメータ</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">リザルト一件取得</td>
<td style="text-align:center">results</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">リザルト複数件取得</td>
<td style="text-align:center">player/{nsaid}/results</td>
<td style="text-align:center">raw, count, page</td>
</tr>
<tr>
<td style="text-align:center">シフト記録取得</td>
<td style="text-align:center">schedules/{schedule_id}</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">シフト統計取得</td>
<td style="text-align:center">players/{nsaid}/schedules/{schedule_id}</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">ユーザデータ取得</td>
<td style="text-align:center">players/metadata</td>
<td style="text-align:center">ids</td>
</tr>
<tr>
<td style="text-align:center">ユーザデータ概要複数取得</td>
<td style="text-align:center">players/metadata</td>
<td style="text-align:center">ids</td>
</tr>
<tr>
<td style="text-align:center">ユーザ検索</td>
<td style="text-align:center">players/search</td>
<td style="text-align:center">name</td>
</tr>
</tbody>
</table>
<p>ユーザデータ複数取得にいつの間にか API が対応していたのだが、この記事を書くまで気づかなかったのでライブラリ側でまだ対応できていない。</p>
<p>ただ、ユーザデータも複数件取得した場合にはいくつかのデータが抜け落ちた状態でレスポンスが返ってくる。</p>
<p>あと、絶対必要だと思っていたのだが普通に名前検索機能も忘れていた。数日中にアップデートする予定である。</p>
</template>
