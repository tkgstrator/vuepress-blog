<template><h2 id="基本情報" tabindex="-1"><a class="header-anchor" href="#基本情報" aria-hidden="true">#</a> 基本情報</h2>
<p>暇だったのでたかはる氏と Yajii2 さんとコード移植をしていました。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@nsobid-32A8F031861B76DF3D1080E6A52FE0B0
#Splatoon 2 5.4.0
#You could be banned by using these hacks, use it at your own risk
################################################
#Proudly ported by Takaharu, Yajii2 and tkgling#
################################################

@flag offset_shift 0x100
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="コードの配布場所" tabindex="-1"><a class="header-anchor" href="#コードの配布場所" aria-hidden="true">#</a> コードの配布場所</h3>
<p><a href="https://takaharu422.github.io/Splatoon2.github.io/ja.html" target="_blank" rel="noopener noreferrer">スプラトゥーン2 チートコード<OutboundLink/></a></p>
<h3 id="パッチの使い方" tabindex="-1"><a class="header-anchor" href="#パッチの使い方" aria-hidden="true">#</a> パッチの使い方</h3>
<p><a href="https://tkgstrator.work/posts/2019/04/01/ipswitch.html" target="_blank" rel="noopener noreferrer">[Hack] IPSwitchの使い方<OutboundLink/></a></p>
<h2 id="おまけ" tabindex="-1"><a class="header-anchor" href="#おまけ" aria-hidden="true">#</a> おまけ</h2>
<p>オンラインで使っても意味がないコードを紹介します。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Coop Online LanPlay [tkgling]
@disabled
014C821C E87D00D0
014C8220 081D2E91
014C824C ACE0FF97
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>BCAT から読み込んだデータでサーモンランのマッチング画面に遷移します。</p>
<p>3.1.0 等であればワンオペでもゲームが始まったのですが、5.4.0 ではワンオペコードを入れていてもゲームを開始できませんでした。</p>
<p>これは LanPlay でも LocalPlay でも同じだったので、別の問題の気がしています。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Coop Online LanPlay [tkgling]
@disabled
0072ED84 E0031FAA
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>これも不完全なコードで、サーモンランを始めると虚無状態でスタートします。</p>
<p>上手くやれば BCAT のデータで遊べると思うのですが、残念。</p>
<h2 id="自動ジェネレータ" tabindex="-1"><a class="header-anchor" href="#自動ジェネレータ" aria-hidden="true">#</a> 自動ジェネレータ</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># -*- coding: utf-8 -*-
import os

INFILE = "531.pchtxt"
OUTFILE = "540.pchtxt"

if __name__ == "__main__":
try:
INPUT = os.getcwd() + "/" + os.path.basename(INFILE)
OUTPUT = os.getcwd() + "/" + os.path.basename(OUTFILE)

with open(OUTPUT, mode="w") as fw:
with open(INPUT, mode="r") as f:
for line in f:
code = line.split(" ")
try:
if int(code[0[, 16) >= int("0x00DCA814", 16) and int(code[0[, 16) &lt; int("0x01493350", 16):
data = hex(int(code[0[, 16) - int("0x10C", 16))[2:[.upper()
address = data.zfill(8) + " " + line[9:[
fw.write(address)
else:
fw.write(line)
except:
fw.write(line)

except FileNotFoundError:
print("Not found input file")
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>5.3.1 向けのコードを 5.4.0 に自動で移植してくれます。</p>
<p>範囲を指定してその間のアドレスを 0x10C ズラしているだけなので失敗する場合もありますがだいたいうまくいきます。動かないときは範囲を自分で設定してみてください。</p>
</template>
