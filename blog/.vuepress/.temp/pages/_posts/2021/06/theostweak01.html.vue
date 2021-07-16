<template><h1 id="theos-のセットアップについて" tabindex="-1"><a class="header-anchor" href="#theos-のセットアップについて" aria-hidden="true">#</a> THEOS のセットアップについて</h1>
<p>まだ THEOS をセットアップできていない方はこの記事を読んで THEOS をセットアップしてください。</p>
<p>脱獄 Tweak を作成しようという意気込みがあるくらいの方であれば 20 分もあればできると思います。</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<p>もし THEOS JAILED もセットアップしている場合は<code>$THEOS/bin/nic.pl</code>を実行すると以下の 18 のテンプレートが表示されると思います。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">1</span>.<span class="token punctuation">]</span> iphone/activator_event
<span class="token punctuation">[</span><span class="token number">2</span>.<span class="token punctuation">]</span> iphone/activator_listner
<span class="token punctuation">[</span><span class="token number">3</span>.<span class="token punctuation">]</span> iphone/application_modern
<span class="token punctuation">[</span><span class="token number">4</span>.<span class="token punctuation">]</span> iphone/application_swift
<span class="token punctuation">[</span><span class="token number">5</span>.<span class="token punctuation">]</span> iphone/cydget
<span class="token punctuation">[</span><span class="token number">6</span>.<span class="token punctuation">]</span> iphone/flipswitch_switch
<span class="token punctuation">[</span><span class="token number">7</span>.<span class="token punctuation">]</span> iphone/framework
<span class="token punctuation">[</span><span class="token number">8</span>.<span class="token punctuation">]</span> iphone/jailed
<span class="token punctuation">[</span><span class="token number">9</span>.<span class="token punctuation">]</span> iphone/library
<span class="token punctuation">[</span><span class="token number">10</span>.<span class="token punctuation">]</span> iphone/notification_center_widget
<span class="token punctuation">[</span><span class="token number">11</span>.<span class="token punctuation">]</span> iphone/notification_center_widget-7up
<span class="token punctuation">[</span><span class="token number">12</span>.<span class="token punctuation">]</span> iphone/preference_bundle_module
<span class="token punctuation">[</span><span class="token number">13</span>.<span class="token punctuation">]</span> iphone/theme
<span class="token punctuation">[</span><span class="token number">14</span>.<span class="token punctuation">]</span> iphone/tool
<span class="token punctuation">[</span><span class="token number">15</span>.<span class="token punctuation">]</span> iphone/tool_swift
<span class="token punctuation">[</span><span class="token number">16</span>.<span class="token punctuation">]</span> iphone/tweak
<span class="token punctuation">[</span><span class="token number">17</span>.<span class="token punctuation">]</span> iphone/tweak_with_simple_preferences
<span class="token punctuation">[</span><span class="token number">18</span>.<span class="token punctuation">]</span> iphone/xpc_service
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>どれを利用すればいいのかわからなくなると思いますが、単純なものをつくるのであれば基本は<code>iphone/tweak</code>を指定すればよいです。</p>
<p>単純なものというのは単に広告を非表示にしたり、何らかのチェックを無効化したりするようなやつです。</p>
<h3 id="それぞれのテンプレートの意味" tabindex="-1"><a class="header-anchor" href="#それぞれのテンプレートの意味" aria-hidden="true">#</a> それぞれのテンプレートの意味</h3>
<ul>
<li>activator_event
<ul>
<li>Activator 用のイベント</li>
</ul>
</li>
<li>activator_listener
<ul>
<li>Activator 用のリスナー</li>
</ul>
</li>
<li>application_modern
<ul>
<li>標準 iOS アプリ</li>
</ul>
</li>
<li>application_swift
<ul>
<li>標準 iOS アプリ</li>
</ul>
</li>
<li>flipswitch
<ul>
<li>Flipswitch 用のスイッチ</li>
</ul>
</li>
<li>framework
<ul>
<li>他の開発者が利用できる framework</li>
</ul>
</li>
<li>library
<ul>
<li>リンク可能なライブラリ(/usr/lib/libblah.dylib のようなもの)</li>
</ul>
</li>
<li>notification_center_widget
<ul>
<li>iOS5 - 6 での通知</li>
</ul>
</li>
<li>notification_center-7up
<ul>
<li>iOS7 - 9 での通知</li>
</ul>
</li>
<li>preference_bundle
<ul>
<li><a href="https://iphonedev.wiki/index.php/PreferenceLoader" target="_blank" rel="noopener noreferrer">PreferenceLoader<OutboundLink/></a>が読み込める Preference bundle</li>
</ul>
</li>
<li>tool
<ul>
<li>コマンドラインツール</li>
</ul>
</li>
<li>tool_swift
<ul>
<li>コマンドラインツール</li>
</ul>
</li>
<li>tweak
<ul>
<li>Cydia Substrate をベースとして動作する Tweak</li>
</ul>
</li>
<li>tweak_with_simple_preferences
<ul>
<li>Preference bundle がある tweak</li>
</ul>
</li>
<li>xpc_service
<ul>
<li>C 言語をベースとした XPC サービス</li>
</ul>
</li>
</ul>
</template>
