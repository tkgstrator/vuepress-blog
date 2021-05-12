---
title: "キンシャケ探しインデックスバグの詳細"
date: "2021-03-28"
description: "インデックスバグで偏りが生まれたキンシャケ探しイベントを解析します"
category: Splatoon2
---

## WAVE1 の初手アタリ位置の偏り

https://tkgstrator.work/?p=28540

前回の記事で WAVE1 に発生するキンシャケ探しにおいてアタリ位置が大きく偏っていることは解説したが、実際にどのくらい偏っているのかを調べたのが今回の記事の内容になります。

### 通常潮位の場合

前回の記事では絶対に初手でアタリ位置にならないポイントがあると述べましたが、それぞれのアタリの確率を全通り調べることでチェックしました。

<table><tbody><tr><td class="has-text-align-center" data-align="center"></td><td class="has-text-align-center" data-align="center">A</td><td class="has-text-align-center" data-align="center">B</td><td class="has-text-align-center" data-align="center">C</td><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">H</td><td class="has-text-align-center" data-align="center">I</td></tr><tr><td class="has-text-align-center" data-align="center">シェケナダム</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">12.2175%</td><td class="has-text-align-center" data-align="center">12.2274%</td><td class="has-text-align-center" data-align="center">12.4400%</td><td class="has-text-align-center" data-align="center">12.6129%</td><td class="has-text-align-center" data-align="center">12.7169%</td><td class="has-text-align-center" data-align="center">15.5655%</td><td class="has-text-align-center" data-align="center">11.1076%</td><td class="has-text-align-center" data-align="center">11.1121%</td></tr><tr><td class="has-text-align-center" data-align="center">ドンブラコ</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">13.6241%</td><td class="has-text-align-center" data-align="center">14.1779%</td><td class="has-text-align-center" data-align="center">14.4848%</td><td class="has-text-align-center" data-align="center">14.6779%</td><td class="has-text-align-center" data-align="center">18.0336%</td><td class="has-text-align-center" data-align="center">12.5000%</td><td class="has-text-align-center" data-align="center">12.5017%</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">シャケト場</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">12.2175%</td><td class="has-text-align-center" data-align="center">12.2274%</td><td class="has-text-align-center" data-align="center">12.4400%</td><td class="has-text-align-center" data-align="center">12.6129%</td><td class="has-text-align-center" data-align="center">12.7169%</td><td class="has-text-align-center" data-align="center">15.5655%</td><td class="has-text-align-center" data-align="center">11.1076%</td><td class="has-text-align-center" data-align="center">11.1121%</td></tr><tr><td class="has-text-align-center" data-align="center">トキシラズ</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">16.3615%</td><td class="has-text-align-center" data-align="center">17.0888%</td><td class="has-text-align-center" data-align="center">17.4402%</td><td class="has-text-align-center" data-align="center">20.5351%</td><td class="has-text-align-center" data-align="center">14.2890%</td><td class="has-text-align-center" data-align="center">14.2855%</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">ポラリス</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">16.3615%</td><td class="has-text-align-center" data-align="center">17.0888%</td><td class="has-text-align-center" data-align="center">17.4402%</td><td class="has-text-align-center" data-align="center">20.5351%</td><td class="has-text-align-center" data-align="center">14.2890%</td><td class="has-text-align-center" data-align="center">14.2855%</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

通常のキンシャケ探しでは全てのアタリ位置に対して二つ以上ゴール候補が存在するので、どこがアタリ位置になるかは初期シードとカンケツセン数だけで決まります。

なのでシェケナダムとシャケト場は必ず同じアタリ位置になりますし、トキシラズとポラリスも必ずおなじになります。特筆すべきはトキシラズとポラリスで、アタリ候補は 7 つあるので同様に確からしいとすればアタリの確率は約 14.2875%のはずなのですが、インデックスバグにより初手は必ず A がアタリにならず、しかも本来 A がアタリになるべき期待値が残りの候補に均等に割り振られていないため、E のアタリ確率が 1/5 よりも大きくなっています。

なので、開栓手数やコンテナとの距離などを考えなければトキシラズとポラリスにおいては初手 E を開けるのが最も良いということになります。

### 満潮の場合

<table><tbody><tr><td class="has-text-align-center" data-align="center"></td><td class="has-text-align-center" data-align="center">A</td><td class="has-text-align-center" data-align="center">B</td><td class="has-text-align-center" data-align="center">C</td><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">H</td><td class="has-text-align-center" data-align="center">I</td></tr><tr><td class="has-text-align-center" data-align="center">シェケナダム</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">28.4996%</td><td class="has-text-align-center" data-align="center">31.4996%</td><td class="has-text-align-center" data-align="center">19.9962%</td><td class="has-text-align-center" data-align="center">20.0045%</td></tr><tr><td class="has-text-align-center" data-align="center">ドンブラコ</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">50.0145%</td><td class="has-text-align-center" data-align="center">24.9789%</td><td class="has-text-align-center" data-align="center">25.0067%</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">シャケト場</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">28.4996%</td><td class="has-text-align-center" data-align="center">31.4996%</td><td class="has-text-align-center" data-align="center">19.9962%</td><td class="has-text-align-center" data-align="center">20.0045%</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">トキシラズ</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">28.4996%</td><td class="has-text-align-center" data-align="center">31.4996%</td><td class="has-text-align-center" data-align="center">19.9962%</td><td class="has-text-align-center" data-align="center">20.0045%</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">ポラリス</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">0.0000%</td><td class="has-text-align-center" data-align="center">50.0145%</td><td class="has-text-align-center" data-align="center">24.9789%</td><td class="has-text-align-center" data-align="center">25.0067%</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

ポラリスに関してはアタリ位置に対してゴール位置が一つしかないため、ゴール位置を決めるときに乱数を消費しません。その結果、本来 D の位置がアタリになるべき確率が全て E に吸収されるという（まるでモンティ・ホール問題）異常事態が発生しています。また、同様にドンブラコでも E のアタリ位置の確率が全て F に吸収されています。

ポラリスはともかく、ドンブラコであれば初手は確実に F 開けが良いでしょう。

## 連続しないアタリ位置

更に予想されたのは初手以外のカンケツセンのアタリ位置にも偏りが出てくるのではないかということです。

というのも、前回ポラリス満潮を検証したときに WAVE1 である位置が三連続で同じ位置がアタリにならなかったためです。これを利用すれば、開栓手順がもっと効率化できる可能性があるわけです。

この章の解析は C++を使って全通り（4000 万通り全て！）について検証したのでプログラムにバグがない限りは確実な精度を保証できます。

### 通常の場合

<table><tbody><tr><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">A</td><td class="has-text-align-center" data-align="center">B</td><td class="has-text-align-center" data-align="center">C</td><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">H</td><td class="has-text-align-center" data-align="center">I</td></tr><tr><td class="has-text-align-center" data-align="center">シェケナダム</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td></tr><tr><td class="has-text-align-center" data-align="center">ドンブラコ</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">シャケト場</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td></tr><tr><td class="has-text-align-center" data-align="center">トキシラズ</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">ポラリス</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

初手から二連続同じ位置のアタリがあるか

また、追加で調べたところ三連続同じアタリ位置も存在することがわかりました。

つまり、通常潮位では使いみちがありません。

### 満潮の場合

WAVE1 の満潮の場合、ドンブラコとポラリス以外は同じ場所が初手から二連続でアタリになることは絶対にありません。

<table><tbody><tr><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">A</td><td class="has-text-align-center" data-align="center">B</td><td class="has-text-align-center" data-align="center">C</td><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">H</td><td class="has-text-align-center" data-align="center">I</td></tr><tr><td class="has-text-align-center" data-align="center">シェケナダム</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td></tr><tr><td class="has-text-align-center" data-align="center">ドンブラコ</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">シャケト場</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">トキシラズ</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">ポラリス</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">◯</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

初手から二連続同じ位置のアタリがあるか

これが一体何に使えるんだということになりますが、例えばトキシラズだと対岸のどちらかがアタリなら、次は両方開ける必要がないケースが存在することになります。

![](https://pbs.twimg.com/media/EuThKMKVgAA5CgT?format=png&name=small)

トキシラズのカンケツセンの内部 ID はこのようになっていますが、例えば初手で C がアタリなら二回目は C は絶対ではアタリではありません。なので二回目は D を先にあけ、大なら E がアタリとわかるので C よりも優先して D を開けたほうが良いことがわかります。ちなみに D が小の場合は C が大か小かでアタリ位置が F か G かが変わってくるのでこの場合はどちらも開けなければ確定させることはできません。

これが一つ増えて三連続となると、全てのステージで初手から三連続アタリとなるようなパターンは存在しません。

<table><tbody><tr><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">A</td><td class="has-text-align-center" data-align="center">B</td><td class="has-text-align-center" data-align="center">C</td><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">H</td><td class="has-text-align-center" data-align="center">I</td></tr><tr><td class="has-text-align-center" data-align="center">シェケナダム</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td></tr><tr><td class="has-text-align-center" data-align="center">ドンブラコ</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">シャケト場</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">トキシラズ</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr><tr><td class="has-text-align-center" data-align="center">ポラリス</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">×</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td></tr></tbody></table>

初手から三連続同じ位置のアタリがあるか

## 満潮の GraphNode 出力

このままだとわかりにくかったので、とりあえず 100 万通りくらいのカンケツセンアタリ位置のフローチャートを出力してみました。

Python が遅すぎるので全部で 4000 万通りある中で 100 万通りしか検証していないため、ここで取得漏れしている組み合わせがあるかもしれませんが、まあ多分ないでしょう（無責任

![](https://pbs.twimg.com/media/EuarthPUUAEyjRt?format=jpg&name=4096x4096)

シェケナダム満潮

1. 初手は必ず E ではない
2. 初手と二回目は同じアタリ位置ではない

三つ目からは普通に候補が五つでてきているのでそれ以上の面白い成果は特にありません。

![](https://pbs.twimg.com/media/EuaruS1VcAUJep9?format=png&name=4096x4096)

ドンブラコ満潮

1. 初手は必ず E ではない
2. 二回目と三回目は同じアタリ位置ではない

ドンブラコについては少し変わっていて、初回と二回目は連続する可能性があるものの、二回目と三回目は違うアタリ位置になるようです。

![](https://pbs.twimg.com/media/Euaru3vVEAEDi0j?format=jpg&name=4096x4096)

シャケト場満潮

1. 初手は必ず A ではない
2. 初手と二回目は同じアタリ位置ではない

というわけで、シャケト場はシェケナダムと同じようですね。

![](https://pbs.twimg.com/media/EuarvuzUYAITqzV?format=jpg&name=4096x4096)

トキシラズ満潮

1. 初手は必ず C ではない
2. 初手と二回目は同じアタリ位置ではない

というわけで、トキシラズはシャケト場やシェケナダムと同じようですね。

![](https://pbs.twimg.com/media/EuarwqyUUAYxXlM?format=png&name=4096x4096)

ポラリス満潮

1. 初手は必ず D ではない
2. 二回目と三回目は同じアタリ位置ではない

ポラリスはドンブラコと同じ法則になっていて、二回目と三回目が必ず違うアタリ位置になります。

ちなみに、ポラリスとドンブラコは四回目以降のアタリ位置も調べてみたのですが「絶対にアタリにならないカンケツセン」は存在しませんでした。どうも、四回目以降については気にしなくて良さそうです。

### 確率も計算させてみた

プログラムのコーディングの問題で直接確率を出せなかったのでとりあえず場合の数だけ表示してみました。

プログラムで 0x1000000 通り調べようとしたらミスって 0x1000001 通り出力されているのですが、そこはスルーでお願いします。実際には WAVE1 が満潮キンシャケ探しであるシードは 4000 万通りもあるので、全体の 2.5%くらいしか調べられていないのですが、まあこれだけ調べれば洩れている組み合わせはないと思います。

![](https://pbs.twimg.com/media/Eua6uxfVoAMKnmR?format=png&name=4096x4096)

ポラリス満潮

ちなみに四回目に偏りがあるかどうか調べてみたのですが、有意な差は見つかりませんでした。

なので、インデックスバグが使えるのは初手から三回だということになります。

## 満潮キンシャケ探し最良手順

少なくとも、めちゃくちゃ偏っているポラリスの満潮については確実に変わります。

今までの最良手順は全てのアタリ位置が同様に確からしいという前提になっていましたが、その前提が崩れてしまったからです。

https://tkgstrator.work/?p=12899

以前の解析ではポラリス満潮については、最良手順で開栓をした場合に平均手数 2.00、最悪手数 3.00 であることがわかっています。また、理論的な下限として最悪手数 2.32 という値も得られています。

更に良い開栓手順を考えて平均手数を 2.00 よりどのくらい下げることができるか考えてみましょう。

### 考え方

偏りがあったとしても、結局は手数を最小化すれば良いだけなので今までと同じ解析手法が使えます。

プログラムを組んでもよいのですが、ヒューリスティックに解を求めてみましょう。

![](https://pbs.twimg.com/media/EubJUqKUUAQrUZq?format=png&name=900x900)

ポラリス満潮のカンケツセン内部 ID

一回目

まず初手ですが、D が絶対にアタリではないのでカンケツセンが実質三つしかありません。なので二手で確実にアタリ位置を見つけることができます。例えば G を開けて大なら E で確定、小なら F で確定です。乱獲においては D あけがスタンダードになりつつありますが、WAVE1 であれば絶対に当たらない D を真っ先に開ける意味は全くないです。

このとき、G をあけるか E を開けるかはなかなか難しい問題になります。G を最初にあければ盤石ですが、G をあけても無駄に終わる可能性が 50%もあるためです。しかし期待値を重視して E をあけてスカだった場合にコンテナ横がザコシャケまみれになります。連携ができていれば G スカからの即 E あけないしは F あけはできると思うので、初手 G が良いのかなという気はします。

<table><tbody><tr><td class="has-text-align-center" data-align="center"></td><td class="has-text-align-center" data-align="center">平均手数</td><td class="has-text-align-center" data-align="center">最悪手数</td></tr><tr><td class="has-text-align-center" data-align="center">初手G</td><td class="has-text-align-center" data-align="center">1.75</td><td class="has-text-align-center" data-align="center">2.00</td></tr><tr><td class="has-text-align-center" data-align="center">初手E</td><td class="has-text-align-center" data-align="center">1.50</td><td class="has-text-align-center" data-align="center">2.00</td></tr></tbody></table>

二回目

二回目は全てのカンケツセンがアタリ候補になりますが、二連続同じ場所になる確率が一番高いです。

同様に確からしいならば 25％のはずですが、同じ場所がアタリになる確率は 29%ほどあります。もちろん、全てが候補になる以上いたずらに手数を増やす F やコンテナ横の E はこの 4%程度の差のためにわざわざ開けなくていいと思います。

ですが、一回目で G がアタリだった場合はこの 4%の恩恵を受けるために D ではなく G をあけたほうが僅かに得になります。

三回目

二回目がアタリだったカンケツセンがアタリにならないため候補が三通りになります。

一回目の場合は候補が三通りかつ偏りがありましたが、三回目の場合は偏りは存在しません。なので、前回アタリでなかったところを無視して最小手数となる手順を選択します。

<table><tbody><tr><td class="has-text-align-center" data-align="center">二回目のアタリ位置</td><td class="has-text-align-center" data-align="center">初手</td><td class="has-text-align-center" data-align="center">初手が大の場合</td><td class="has-text-align-center" data-align="center">初手が小の場合</td><td class="has-text-align-center" data-align="center">平均手数</td><td class="has-text-align-center" data-align="center">最悪手数</td></tr><tr><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">1.67</td><td class="has-text-align-center" data-align="center">2.00</td></tr><tr><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">2.00</td><td class="has-text-align-center" data-align="center">3.00</td></tr><tr><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">D/G</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">G/D</td><td class="has-text-align-center" data-align="center">1.67</td><td class="has-text-align-center" data-align="center">2.00</td></tr><tr><td class="has-text-align-center" data-align="center">G</td><td class="has-text-align-center" data-align="center">D</td><td class="has-text-align-center" data-align="center">E</td><td class="has-text-align-center" data-align="center">F</td><td class="has-text-align-center" data-align="center">1.67</td><td class="has-text-align-center" data-align="center">2.00</td></tr></tbody></table>

すると上のような図になります。二回目が E がアタリのときだけは有効活用することができません。D, F, G のどこをあけても必ず小になります。F がアタリだった場合は D でも G でも期待値は変わりません。

事前にどちらに揃えておくか相談しておくと良いでしょう。

## まとめ

思っていたより偏っていて、最大三回までこの恩恵を受けることができるとわかった。

ポラリスとドンブラコ以外は二回までしか偏りがないのだが、二回目に絶対に出現アタリにならないカンケツセン+偏りがあるので、利用できる情報の数はどのステージでも差がない。が、やはり利用できる回数が重要だと思うので、ポラリスやドンブラコの方が利用価値は高いだろう。

本記事では紙面の都合上（めんどくさい）ポラリス満潮しか取り扱わなかったが、他のステージでもより良い開栓手順が見つかる可能性が多分にある。

それは読者の皆様への宿題ということにしておこう（めんどくさい）

記事は以上。

https://www.amazon.co.jp/hz/wishlist/genericItemsPage/1OVWKJ7C5R9XK