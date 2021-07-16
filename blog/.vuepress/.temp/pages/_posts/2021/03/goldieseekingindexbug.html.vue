<template><h2 id="インデックスバグについて" tabindex="-1"><a class="header-anchor" href="#インデックスバグについて" aria-hidden="true">#</a> インデックスバグについて</h2>
<p><a href="https://tkgstrator.work/posts/2021/02/15/randomgenerator.html" target="_blank" rel="noopener noreferrer">前回の記事<OutboundLink/></a>で WAVE1 に発生するキンシャケ探しにおいてアタリ位置が大きく偏っていることは解説したが、実際にどのくらい偏っているのかを調べたのが今回の記事の内容になります。</p>
<h2 id="通常潮位の場合" tabindex="-1"><a class="header-anchor" href="#通常潮位の場合" aria-hidden="true">#</a> 通常潮位の場合</h2>
<p>前回の記事では絶対に初手でアタリ位置にならないポイントがあると述べましたが、それぞれのアタリの確率を全通り調べることでチェックしました。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">シェケナダム</th>
<th style="text-align:center">ドンブラコ</th>
<th style="text-align:center">シャケト場</th>
<th style="text-align:center">トキシラズ</th>
<th style="text-align:center">ポラリス</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">A</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">B</td>
<td style="text-align:center">12.2175%</td>
<td style="text-align:center">13.6241%</td>
<td style="text-align:center">12.2175%</td>
<td style="text-align:center">16.3615%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center">12.2274%</td>
<td style="text-align:center">14.1779%</td>
<td style="text-align:center">12.2274%</td>
<td style="text-align:center">17.0888%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">12.4400%</td>
<td style="text-align:center">14.4848%</td>
<td style="text-align:center">12.4400%</td>
<td style="text-align:center">17.4402%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center">12.6129%</td>
<td style="text-align:center">14.6779%</td>
<td style="text-align:center">12.6129%</td>
<td style="text-align:center">20.5351%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">12.7169%</td>
<td style="text-align:center">18.0336%</td>
<td style="text-align:center">12.7169%</td>
<td style="text-align:center">14.2890%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">15.5655%</td>
<td style="text-align:center">12.5000%</td>
<td style="text-align:center">15.5655%</td>
<td style="text-align:center">14.2855%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">H</td>
<td style="text-align:center">11.1076%</td>
<td style="text-align:center">12.5017%</td>
<td style="text-align:center">11.1076%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">I</td>
<td style="text-align:center">11.1121%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">11.1121%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<p>通常のキンシャケ探しでは全てのアタリ位置に対して二つ以上ゴール候補が存在するので、どこがアタリ位置になるかは初期シードとカンケツセン数だけで決まります。</p>
<p>なのでシェケナダムとシャケト場は必ず同じアタリ位置になりますし、トキシラズとポラリスも必ずおなじになります。特筆すべきはトキシラズとポラリスで、アタリ候補は 7 つあるので同様に確からしいとすればアタリの確率は約 14.2875%のはずなのですが、インデックスバグにより初手は必ず A がアタリにならず、しかも本来 A がアタリになるべき期待値が残りの候補に均等に割り振られていないため、E のアタリ確率が 1/5 よりも大きくなっています。</p>
<p>なので、開栓手数やコンテナとの距離などを考えなければトキシラズとポラリスにおいては初手 E を開けるのが最も良いということになります。</p>
<h2 id="満潮の場合" tabindex="-1"><a class="header-anchor" href="#満潮の場合" aria-hidden="true">#</a> 満潮の場合</h2>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">シェケナダム</th>
<th style="text-align:center">ドンブラコ</th>
<th style="text-align:center">シャケト場</th>
<th style="text-align:center">トキシラズ</th>
<th style="text-align:center">ポラリス</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">A</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">B</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">28.4996%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">28.4996%</td>
<td style="text-align:center">0.0000%</td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">0.0000%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">31.4996%</td>
<td style="text-align:center">50.0145%</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">28.4996%</td>
<td style="text-align:center">50.0145%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">19.9962%</td>
<td style="text-align:center">24.9789%</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">31.4996%</td>
<td style="text-align:center">24.9789%</td>
<td style="text-align:center">31.4996%</td>
<td style="text-align:center">20.0045%</td>
<td style="text-align:center">25.0067%</td>
</tr>
<tr>
<td style="text-align:center">H</td>
<td style="text-align:center">19.9962%</td>
<td style="text-align:center">25.0067%</td>
<td style="text-align:center">19.9962%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">I</td>
<td style="text-align:center">20.0045%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">20.0045%</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<p>ポラリスに関してはアタリ位置に対してゴール位置が一つしかないため、ゴール位置を決めるときに乱数を消費しません。その結果、本来 D の位置がアタリになるべき確率が全て E に吸収されるという（まるでモンティ・ホール問題）異常事態が発生しています。また、同様にドンブラコでも E のアタリ位置の確率が全て F に吸収されています。</p>
<p>ポラリスはともかく、ドンブラコであれば初手は確実に F 開けが良いでしょう。</p>
<h2 id="連続しないアタリ位置" tabindex="-1"><a class="header-anchor" href="#連続しないアタリ位置" aria-hidden="true">#</a> 連続しないアタリ位置</h2>
<p>更に予想されたのは初手以外のカンケツセンのアタリ位置にも偏りが出てくるのではないかということです。</p>
<p>というのも、前回ポラリス満潮を検証したときに WAVE1 である位置が三連続で同じ位置がアタリにならなかったためです。これを利用すれば、開栓手順がもっと効率化できる可能性があるわけです。</p>
<p>この章の解析は C++を使って全通り（4000 万通り全て！）について検証したのでプログラムにバグがない限りは確実な精度を保証できます。</p>
<h3 id="通常の場合" tabindex="-1"><a class="header-anchor" href="#通常の場合" aria-hidden="true">#</a> 通常の場合</h3>
<p>A 以外のアタリ位置に関しては二連続同じ位置がアタリになるケースが存在することがわかりました。</p>
<div class="custom-container tip"><p class="custom-container-title">三連続の場合</p>
<p>また、追加で調べたところ三連続同じアタリ位置も存在することがわかりました。</p>
<p>確率に差がある可能性はありますが、現状通常潮位では使いみちがなさそうです。</p>
</div>
<h3 id="満潮の場合-1" tabindex="-1"><a class="header-anchor" href="#満潮の場合-1" aria-hidden="true">#</a> 満潮の場合</h3>
<p>WAVE1 の満潮の場合、ドンブラコとポラリス以外は同じ場所が初手から二連続でアタリになることは絶対にありません。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">シェケナダム</th>
<th style="text-align:center">ドンブラコ</th>
<th style="text-align:center">シャケト場</th>
<th style="text-align:center">トキシラズ</th>
<th style="text-align:center">ポラリス</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">A</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">B</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">C</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">NO</td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">YES</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">YES</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">YES</td>
</tr>
<tr>
<td style="text-align:center">H</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">YES</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">I</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">NO</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<p>これが一体何に使えるんだということになりますが、例えばトキシラズだと対岸のどちらかがアタリなら、次は両方開ける必要がないケースが存在することになります。</p>
<p>トキシラズのカンケツセンの内部 ID はこのようになっていますが、例えば初手で C がアタリなら二回目は C は絶対ではアタリではありません。なので二回目は D を先にあけ、大なら E がアタリとわかるので C よりも優先して D を開けたほうが良いことがわかります。ちなみに D が小の場合は C が大か小かでアタリ位置が F か G かが変わってくるのでこの場合はどちらも開けなければ確定させることはできません。</p>
<div class="custom-container tip"><p class="custom-container-title">三連続</p>
<p>WAVE1 の満潮キンシャケ探しで三連続同じ位置がアタリになるシードは存在しません。</p>
<p>かつてポラリスでコンテナ横が連続するシードで記録をだそうとしても WAVE2 と WAVE3 でしか見つからなかったのはこれが理由だったのですね、納得。</p>
</div>
<h2 id="満潮の-graphnode-出力" tabindex="-1"><a class="header-anchor" href="#満潮の-graphnode-出力" aria-hidden="true">#</a> 満潮の GraphNode 出力</h2>
<p>このままだとわかりにくかったので、とりあえず 100 万通りくらいのカンケツセンアタリ位置のフローチャートを出力してみました。</p>
<p>Python が遅すぎるので全部で 4000 万通りある中で 100 万通りしか検証していないため、ここで取得漏れしている組み合わせがあるかもしれませんが、まあ多分ないでしょう（無責任</p>
<p><img src="https://pbs.twimg.com/media/EuarthPUUAEyjRt?format=png" alt=""></p>
<h3 id="シェケナダム満潮" tabindex="-1"><a class="header-anchor" href="#シェケナダム満潮" aria-hidden="true">#</a> シェケナダム満潮</h3>
<ol>
<li>初手は必ず E ではない</li>
<li>初手と二回目は同じアタリ位置ではない</li>
</ol>
<p>三つ目からは普通に候補が五つでてきているのでそれ以上の面白い成果は特にありません。</p>
<p><img src="https://pbs.twimg.com/media/EuaruS1VcAUJep9?format=png" alt=""></p>
<h3 id="ドンブラコ満潮" tabindex="-1"><a class="header-anchor" href="#ドンブラコ満潮" aria-hidden="true">#</a> ドンブラコ満潮</h3>
<ol>
<li>初手は必ず E ではない</li>
<li>二回目と三回目は同じアタリ位置ではない</li>
</ol>
<p>ドンブラコについては少し変わっていて、初回と二回目は連続する可能性があるものの、二回目と三回目は違うアタリ位置になるようです。</p>
<p><img src="https://pbs.twimg.com/media/Euaru3vVEAEDi0j?format=png" alt=""></p>
<h3 id="シャケト場満潮" tabindex="-1"><a class="header-anchor" href="#シャケト場満潮" aria-hidden="true">#</a> シャケト場満潮</h3>
<ol>
<li>初手は必ず A ではない</li>
<li>初手と二回目は同じアタリ位置ではない</li>
</ol>
<p>というわけで、シャケト場はシェケナダムと同じようですね。</p>
<p><img src="https://pbs.twimg.com/media/EuarvuzUYAITqzV?format=png" alt=""></p>
<h3 id="トキシラズ満潮" tabindex="-1"><a class="header-anchor" href="#トキシラズ満潮" aria-hidden="true">#</a> トキシラズ満潮</h3>
<ol>
<li>初手は必ず C ではない</li>
<li>初手と二回目は同じアタリ位置ではない</li>
</ol>
<p>というわけで、トキシラズはシャケト場やシェケナダムと同じようですね。</p>
<p><img src="https://pbs.twimg.com/media/EuarwqyUUAYxXlM?format=png" alt=""></p>
<h3 id="ポラリス満潮" tabindex="-1"><a class="header-anchor" href="#ポラリス満潮" aria-hidden="true">#</a> ポラリス満潮</h3>
<ol>
<li>初手は必ず D ではない</li>
<li>二回目と三回目は同じアタリ位置ではない</li>
</ol>
<p>ポラリスはドンブラコと同じ法則になっていて、二回目と三回目が必ず違うアタリ位置になります。</p>
<p>ちなみに、ポラリスとドンブラコは四回目以降のアタリ位置も調べてみたのですが「絶対にアタリにならないカンケツセン」は存在しませんでした。どうも、四回目以降については気にしなくて良さそうです。</p>
<div class="custom-container tip"><p class="custom-container-title">確率も計算させてみた</p>
<p>プログラムのコーディングの問題で直接確率を出せなかったのでとりあえず場合の数だけ表示してみました。</p>
<p>プログラムで 0x1000000 通り調べようとしたらミスって 0x1000001 通り出力されているのですが、そこはスルーでお願いします。実際には WAVE1 が満潮キンシャケ探しであるシードは 4000 万通りもあるので、全体の 2.5%くらいしか調べられていないのですが、まあこれだけ調べれば洩れている組み合わせはないと思います。</p>
<p><img src="https://pbs.twimg.com/media/Eua6uxfVoAMKnmR?format=png" alt=""></p>
</div>
<p>ちなみに四回目に偏りがあるかどうか調べてみたのですが、有意な差は見つかりませんでした。</p>
<p>なので、インデックスバグが使えるのは初手から三回だということになります。</p>
<h2 id="満潮キンシャケ探し最良手順" tabindex="-1"><a class="header-anchor" href="#満潮キンシャケ探し最良手順" aria-hidden="true">#</a> 満潮キンシャケ探し最良手順</h2>
<p>少なくとも、めちゃくちゃ偏っているポラリスの満潮については確実に変わります。</p>
<p>今までの最良手順は全てのアタリ位置が同様に確からしいという前提になっていましたが、その前提が崩れてしまったからです。</p>
<p>以前の解析ではポラリス満潮については、最良手順で開栓をした場合に平均手数 2.00、最悪手数 3.00 であることがわかっています。また、理論的な下限として最悪手数 2.32 という値も得られています。</p>
<p>更に良い開栓手順を考えて平均手数を 2.00 よりどのくらい下げることができるか考えてみましょう。</p>
<p>偏りがあったとしても、結局は手数を最小化すれば良いだけなので今までと同じ解析手法が使えます。</p>
<p>プログラムを組んでもよいのですが、ヒューリスティックに解を求めてみましょう。</p>
<h3 id="一回目" tabindex="-1"><a class="header-anchor" href="#一回目" aria-hidden="true">#</a> 一回目</h3>
<p>まず初手ですが、D が絶対にアタリではないのでカンケツセンが実質三つしかありません。なので二手で確実にアタリ位置を見つけることができます。例えば G を開けて大なら E で確定、小なら F で確定です。乱獲においては D あけがスタンダードになりつつありますが、WAVE1 であれば絶対に当たらない D を真っ先に開ける意味は全くないです。</p>
<p>このとき、G をあけるか E を開けるかはなかなか難しい問題になります。G を最初にあければ盤石ですが、G をあけても無駄に終わる可能性が 50%もあるためです。しかし期待値を重視して E をあけてスカだった場合にコンテナ横がザコシャケまみれになります。連携ができていれば G スカからの即 E あけないしは F あけはできると思うので、初手 G が良いのかなという気はします。</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">平均手数</th>
<th style="text-align:center">最悪手数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">初手 G</td>
<td style="text-align:center">1.75</td>
<td style="text-align:center">2.00</td>
</tr>
<tr>
<td style="text-align:center">初手 E</td>
<td style="text-align:center">1.50</td>
<td style="text-align:center">2.00</td>
</tr>
</tbody>
</table>
<h3 id="二回目" tabindex="-1"><a class="header-anchor" href="#二回目" aria-hidden="true">#</a> 二回目</h3>
<p>二回目は全てのカンケツセンがアタリ候補になりますが、二連続同じ場所になる確率が一番高いです。</p>
<p>同様に確からしいならば 25％のはずですが、同じ場所がアタリになる確率は 29%ほどあります。もちろん、全てが候補になる以上いたずらに手数を増やす F やコンテナ横の E はこの 4%程度の差のためにわざわざ開けなくていいと思います。</p>
<p>ですが、一回目で G がアタリだった場合はこの 4%の恩恵を受けるために D ではなく G をあけたほうが僅かに得になります。</p>
<h3 id="三回目" tabindex="-1"><a class="header-anchor" href="#三回目" aria-hidden="true">#</a> 三回目</h3>
<p>二回目がアタリだったカンケツセンがアタリにならないため候補が三通りになります。</p>
<p>一回目の場合は候補が三通りかつ偏りがありましたが、三回目の場合は偏りは存在しません。なので、前回アタリでなかったところを無視して最小手数となる手順を選択します。</p>
<table>
<thead>
<tr>
<th style="text-align:center">二回目のアタリ位置</th>
<th style="text-align:center">初手</th>
<th style="text-align:center">初手が大の場合</th>
<th style="text-align:center">初手が小の場合</th>
<th style="text-align:center">平均手数</th>
<th style="text-align:center">最悪手数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">G</td>
<td style="text-align:center">E</td>
<td style="text-align:center">F</td>
<td style="text-align:center">1.67</td>
<td style="text-align:center">2.00</td>
</tr>
<tr>
<td style="text-align:center">E</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">2.00</td>
<td style="text-align:center">3.00</td>
</tr>
<tr>
<td style="text-align:center">F</td>
<td style="text-align:center">D/G</td>
<td style="text-align:center">E</td>
<td style="text-align:center">G/D</td>
<td style="text-align:center">1.67</td>
<td style="text-align:center">2.00</td>
</tr>
<tr>
<td style="text-align:center">G</td>
<td style="text-align:center">D</td>
<td style="text-align:center">E</td>
<td style="text-align:center">F</td>
<td style="text-align:center">1.67</td>
<td style="text-align:center">2.00</td>
</tr>
</tbody>
</table>
<p>すると上のような図になります。二回目が E がアタリのときだけは有効活用することができません。D、F、G のどこをあけても必ず小になります。F がアタリだった場合は D でも G でも期待値は変わりません。</p>
<p>事前にどちらに揃えておくか相談しておくと良いでしょう。</p>
<h2 id="まとめ" tabindex="-1"><a class="header-anchor" href="#まとめ" aria-hidden="true">#</a> まとめ</h2>
<p>思っていたより偏っていて、最大三回までこの恩恵を受けることができるとわかった。</p>
<p>ポラリスとドンブラコ以外は二回までしか偏りがないのだが、二回目に絶対に出現アタリにならないカンケツセン+偏りがあるので、利用できる情報の数はどのステージでも差がない。が、やはり利用できる回数が重要だと思うので、ポラリスやドンブラコの方が利用価値は高いだろう。</p>
<p>本記事では紙面の都合上（めんどくさい）ポラリス満潮しか取り扱わなかったが、他のステージでもより良い開栓手順が見つかる可能性が多分にある。</p>
<p>それは読者の皆様への宿題ということにしておこう（めんどくさい）</p>
<p>記事は以上。</p>
</template>
