<template><h2 id="picker-が正しく表示されない" tabindex="-1"><a class="header-anchor" href="#picker-が正しく表示されない" aria-hidden="true">#</a> Picker が正しく表示されない</h2>
<p>Picker でチェックボックスが表示されないバグは<a href="https://stackoverflow.com/questions/58103437/swiftui-picker-in-form-does-not-show-checkmark" target="_blank" rel="noopener noreferrer">stack overflow<OutboundLink/></a>でも報告されていて、いろいろ解決法が載っていますが、この方法では解決しません。</p>
<h2 id="バグについて" tabindex="-1"><a class="header-anchor" href="#バグについて" aria-hidden="true">#</a> バグについて</h2>
<ul>
<li>選択しているにも関わらずチェックマークが表示されない</li>
<li>選択範囲がおかしい
<ul>
<li>Form 内の Picker は全範囲にタップ判定があるのだが、このバグが発生するとラベルにしかタップ判定がない</li>
</ul>
</li>
</ul>
<h3 id="バグが発生しないコード" tabindex="-1"><a class="header-anchor" href="#バグが発生しないコード" aria-hidden="true">#</a> バグが発生しないコード</h3>
<p>以下のコードは普通に動作する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> selection<span class="token punctuation">:</span> <span class="token builtin">FruitType</span> <span class="token operator">=</span> <span class="token punctuation">.</span>apple
    <span class="token keyword">private</span> <span class="token keyword">var</span> timers <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token builtin">FruitType</span><span class="token punctuation">.</span>allCases<span class="token punctuation">)</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token builtin">Form</span> <span class="token punctuation">{</span>
                <span class="token function">Picker</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Select"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">ForEach</span><span class="token punctuation">(</span>fruits<span class="token punctuation">,</span> id<span class="token punctuation">:</span>\<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">Text</span><span class="token punctuation">(</span>$<span class="token number">0</span><span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Picker"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token builtin">FruitType</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> apple
    <span class="token keyword">case</span> orange
    <span class="token keyword">case</span> banana
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><img src="https://pbs.twimg.com/media/E15HulIVkAIKGQ_?format=png" alt=""></p>
<h3 id="バグを含むコード" tabindex="-1"><a class="header-anchor" href="#バグを含むコード" aria-hidden="true">#</a> バグを含むコード</h3>
<p>以下のコードは実行すると Picker にバグが発生する。</p>
<div class="language-swift ext-swift line-numbers-mode"><pre v-pre class="language-swift"><code><span class="token keyword">import</span> <span class="token builtin">SwiftUI</span>

<span class="token keyword">struct</span> <span class="token builtin">ContentView</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    @<span class="token builtin">State</span> <span class="token keyword">var</span> selection<span class="token punctuation">:</span> <span class="token builtin">FruitType</span> <span class="token operator">=</span> <span class="token punctuation">.</span>apple
    <span class="token keyword">private</span> <span class="token keyword">var</span> timers <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token builtin">FruitType</span><span class="token punctuation">.</span>allCases<span class="token punctuation">)</span>

    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token builtin">NavigationView</span> <span class="token punctuation">{</span>
            <span class="token builtin">Form</span> <span class="token punctuation">{</span>
                <span class="token function">Picker</span><span class="token punctuation">(</span>selection<span class="token punctuation">:</span> $selection<span class="token punctuation">,</span> label<span class="token punctuation">:</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token string">"Select"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">ForEach</span><span class="token punctuation">(</span>fruits<span class="token punctuation">,</span> id<span class="token punctuation">:</span>\<span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">Text</span><span class="token punctuation">(</span>$<span class="token number">0</span><span class="token punctuation">.</span>rawValue<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span><span class="token string">"Picker"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">buttonStyle</span><span class="token punctuation">(</span><span class="token function">PlainButtonStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token builtin">FruitType</span><span class="token punctuation">:</span> <span class="token builtin">String</span><span class="token punctuation">,</span> <span class="token builtin">CaseIterable</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> apple
    <span class="token keyword">case</span> orange
    <span class="token keyword">case</span> banana
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><img src="https://pbs.twimg.com/media/E15HulHUUAM4aKR?format=png" alt=""></p>
<h2 id="バグの原因について" tabindex="-1"><a class="header-anchor" href="#バグの原因について" aria-hidden="true">#</a> バグの原因について</h2>
<p>要するに<code>NavigationView</code>に<code>.buttonStyle(PlainButtonStyle())</code>がかかっていると<code>Form</code>内の<code>Picker</code>の表示がおかしくなってしまう。</p>
<p>なので、<code>.buttonStyle(PlanButtonStyle())</code>をネストの浅いところに書いてしまうのは良くない。特に、<code>WindowGroup</code>に書くと全ビューにスタイルが適応されて便利なのだが、もしも Picker を利用するつもりであれば<code>.buttonStyle()</code>を書く場所はしっかりと考えたほうが良い。</p>
<div class="custom-container tip"><p class="custom-container-title">おまけ</p>
<p>iOS 向けの Style は以下の三つが使えるが、<code>DefaultButtonStyle</code>以外はバグが発生します。</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">バグ</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">PlainButtonStyle</td>
<td style="text-align:center">発生</td>
</tr>
<tr>
<td style="text-align:center">DefaultButtonStyle</td>
<td style="text-align:center">発生しない</td>
</tr>
<tr>
<td style="text-align:center">BorderlessButtonStyle</td>
<td style="text-align:center">発生</td>
</tr>
</tbody>
</table>
<div class="vuepress-affiliate">
<img src="https://m.media-amazon.com/images/I/51w2MavLBfL._SL500_.jpg" />
<ul>
<li><a href="https://www.amazon.co.jp/dp/B08R1WY3BR/?tag=tkgstrator0f-22" target="_blank">TVアニメ『ウマ娘 プリティーダービー Season 2』ANIMATION DERBY Season2 vol.2「木漏れ日のエール」</a></li>
<li class="price">￥1,320</li>
</ul>
</div>
</template>
