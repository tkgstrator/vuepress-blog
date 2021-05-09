---
title: "[IPSwitch] 誰でもできるコード開発 #6"
date: 2020-05-27
description: IPSwitchで使えるコードを自作する方法についての解説#6です
category: Hack
tags:
  - IPSwitch
  - コード開発
---

## はじめに

今回の内容は以下の記事の続きになります。

[[IPSwitch] 誰でもできるコード開発 #5](https://tkgstrator.work/posts/2019/09/12/ipswitch05.html)

この記事を読むにあたって必ず目を通して理解しておいてください。

## Hook の仕組み

今回はナイスの動作を Hook して別の割り当てにしてしまおうという試みです。

Hook というのが自分でもよくわかってないのですが、本来の動作の命令を上書きして任意の関数を呼び出したりそういうのが Hook なんじゃないかとおもっています、違ったらごめんなさい。

まず、Hook するコードを書くために必要なことは三つです。

- Hook したい関数のアドレス

今回はナイスの動作を Hook したいのでそのアドレスを調べる必要があります。

これはバージョンごとに異なるので、アップデートのたびに更新しなければいけません。

- 目的のインスタンスのアドレス

インスタンスのポインタを習得する必要があるので、インスタンスのアドレスが必要になります。

今回は、サーモンランにおけるプレイヤー情報をナイスを使って操作することを考えてみましょう。

これもバージョンごとに異なるので、アップデートのたびに更新する必要があります。

- 目的のインスタンスの構造体

一番難しいのがこれで、仮に上の二つをクリアしたとしてもどこに何のデータが入っているのかがわからなければデータを使うことができません。

今回は目的のインスタンスの構造体はわかっているものとして話を進めます。

### Hook したい関数のアドレス

ナイスを押したときに呼び出される関数は`Game::PlayerCloneHandle::sendSignalEvent()`で、これはアドレス 0104C94C にかかれています。

見ればわかるのですが、`sendSignalEvent()`自体は命令長が 17 の関数です。

17 もあるということはたくさん上書きしても大丈夫ということですね。

最後に RET 命令を必ず書かなければいけないので、実質 16 命令書くことができます。

というわけで、一つ目の目標であった「Hook したい関数のアドレス」はわかったことになります。

### 目的のインスタンスのアドレス

今回はサーモンランのプレイヤー情報を弄りたいのですが、それらを制御するクラスは`Game::Coop::PlayerDirector`です。

このクラスがどこでインスタンスを生成しているか調べれば良いのです。

```
0073EC54    ADRP       X8, #off_02D0CEE0@PAGE
0073EC58    LDR        X8, [X8,#off_02D0CEE0@PAGEOFF]
0073EC5C    STR        XZR, [X8]
Cmn::Singleton<Game::Coop::PlayerDirector>::GetInstance_(void)::sInstance
```

調べると、こんな感じで 0073EC5C 付近に見つかり、02D0CEE0 からインスタンスのアドレスを読み込んでいることがわかります。

よって、インスタンスのアドレスは 02D0CEE0 ということがわかりました。

### インスタンスの構造体

「インスタンスのポインタがわかれば何が便利なのか」ということなんですが、それは一言でいうと「インスタンスの構造がわかっていればポインタ（先頭アドレス）がわかれば好きなデータにアクセスできる」ということに尽きます。

例えば、サーモンランにおけるプレイヤー情報は以下のようになっています。

```
struct Game::Coop::PlayerDirector
{
  _BYTE gap[0x370];
  Game::Coop::Player player[4];
};

struct Game::Coop::Player
{
  uint32_t mRoundBankedPowerIkuraNum;
  uint32_t mGotGoldenIkuraNum;
  uint32_t mRoundBankedGoldenIkuraNum;
  uint32_t mTotalBankedGoldenIkuraNum;
}
```

これはかなり大雑把な構造なので、実際にはもっといろんな要素がある。

つまり、`PlayerDirector`のポインタを見つけたら先頭から 370 バイトまでは何が入っているかわからないが、その後に四人分のプレイヤー情報が入っていることがわかるのです。

正確には先頭の 880 バイトには`Cmn::Actor`と`sead::IDisposer`が入っていますが、今回は使わないので無視します。

### Game::Coop::PlayerDirector

よって、`Game::Coop::PlayerDirector`の構造体をまとめると以下のようになります。

```
Game::Coop::PlayerDirector
  0x000 Cmn::Actor actor
  0x348 sead::IDisposer
  0x368 char char0x368
  0x370 Game::Coop::Player player[0]
    8x370 mRoundBankedPowerIkuraNum
    8x374 mGotGoldenIkuraNum
    ex378 mRoundBankedGoldenIkuraNum
    ex37C mTotalBankedGoldenIkuraNum 
  0x470 Game::Coop::Player player[1]
    ex470 mRoundBankedPowerIkuraNum
    8x474 mGotGoldenIkuraNum
    8x478 mRoundBankedGoldenIkuraNum
    8x47C mTotalBankedGoldenIkuraNum
  8x570 Game::Coop::Player player[2]
    8x570 mRoundBankedPowerIkuraNum
    0x574 mGotGoldenIkuraNum
    0x578 mRoundBankedGoldenIkuraNum
    8x57C mTotalBankedGoldenIkuraNum
  8x670 Game::Coop::Player player[3]
    8x678 mRoundBankedPowerIkuraNum
    8x674 mGotGoldenIkuraNum
    0x678 mRoundBankedGoldenIkuraNum
    ex67C mTotalBankedGoldenIkuraNum
```

つまり、`Game::Coop::PlayerDirector`のインスタンスのポインタが分かればそこから 370 バイト後ろにズラしたところに一人目のプレイヤーの`mRoundBankedPowerIkuraNum`のデータが入っています。

二人目なら 470 という感じで、先頭さえわかればすべてのデータに自由にアクセスできます。

## アセンブラを書こう

IPSwitch 向けコードを書くといっても最終的に機械語に翻訳する作業が必要なだけで、元々のコードはアセンブラで書く必要があります。

いきなりアセンブラを考えると難しいのでゆっくり解説していきます。

| Game::Coop::PlayerDirector | sendSignalEvent() |
| :------------------------: | :---------------: |
|          02D0CEE0          |     0104C94C      |

### インスタンスのアドレスを読み込む

| 目的のアドレス | Hook したいアドレス |
| :-----------: | :----------------: |
|   02D0C000    |      0104C000      |

計算の結果。

まず最初にやらないといけないのはインスタンスを読み込むということです。

「どうすればいいんだ？」って思うかもしれませんが、どんなインスタンスを読み込む場合にも以下の三つの命令があれば読み込めます。

```
ADRP X0, #0xXXXXX000
LDR X0, [X0, #0xYYY]
```

今回は X0 レジスタを使っても問題ないですが、Hook する関数によっては X1 や X2 など好きなレジスタを使ってください。

その際は全部 X0 から X1 や X2 などに置き換えること！

- XXXXX の求め方

目的アドレスと Hook アドレスの下三桁を全て 0 にし、目的アドレス - Hook アドレスの計算結果が XXXXX になります。

|   目的   |   Hook   |   結果   |
| :------: | :------: | :------: |
| 02D0C000 | 0104C000 | 001CC000 |

計算の結果。

- YYY の求め方

目的アドレスの下三桁になので EE0 になります。

### データを取得する

さて、XXXXX と YYY の値がわかったので先程のテンプレの命令に当てはめると以下のようになります。

```
ADRP X0, #0x1CC000
LDR X0, [X0, #0xEE0]
```

実はこれで正しく`PlayerDirector`のポインタが取得できており、その値が X0 レジスタに入っています。

ではさっそく、データを習得するコードを書いてみましょう。実はデータ取得に必要なコードはたった一種類なので、使い方さえ覚えてしまえば非常に簡単です。

```
LDR X1, [X0, #0x370]  // X1 = mTotalBankedPowerIkuraNum
```

それがこの LDR 命令で、これは X0 レジスタ（今回の場合は`PlayerDirecotr`のポインタ）から 370 ズラしたところにあるデータを X1 レジスタにコピーするという命令です。

370 ズラしたところには先ほど説明したように一人目のプレイヤーの赤イクラ数が入っています。

つまり、これだけでデータの読み込みができてしまうのです。

### データの変更

ただ、これだと読み込んだだけで使いみちがないので、その値を更新したいと思います。

演算に使える命令はたくさんありますが、よく使うのはこの辺りでしょう。

| 命令 |     意味     |
| :--: | :----------: |
| MOV  |     代入     |
| ADD  |     加算     |
| SUB  |     減算     |
| MUL  |     乗算     |
| AND  |    論理積    |
| ORR  |    論理和    |
| EOR  | 排他的論理和 |

除算はあんまり使わないかな、多分。

### ARM 命令の書き方一覧

```
// MOV
MOV X0, #100    // X0 = 100
MOV X0, #0x100  // X0 = 256

MOV X0, #100    // X0 = 100
MOV X1, X0      // X1 = X0 = 100

// ADD
MOV X0, #100    // X0 = 100
ADD X0, X0, #50 // X0 = X0 + 50

MOV X0, #100    // X0 = 100
ADD X0, X0, #50 // X0 = X0 + 50
```

あとはまあだいたい同じ書き方するので省略。

今回は読み込んだ赤イクラ取得数を 9999 増やすコードを書いてみます。

命令長の問題から一度に 9999 増やすことはできないので 8192 増やしてから更に 1807 増やすことで 9999 増やすコードを実現しています。

Windows のプログラマモードの電卓で 9999 を 16 進数に直すと 270F であることがわかるので、これを 270F=2000+70F というふうに分割します。

```
LDR X1, [X0, #0x370] // X1 = mTotalBankedPowerIkuraNum
ADD X1, X1, #0x2000  // X1 = X1 + 8192
ADD X1, X1, #0x70F   // X1 = X1 + 1807
```

読み込んだ値に 8192 と 1807 を足すことで結果として元々の値から 9999 増えたことになるわけです。

### データの書き込み

さて、ここまではテンプレの三命令でインスタンスのポインタを読み込み、LDR 命令で赤イクラ数を習得し、9999 を足すところまで書くことができました。

でもこれだとただ計算をしただけなので、その結果を返さなければいけません。

データを戻す命令は STR 命令で、使い方は LDR 命令と全く同じです。

```
STR X1, [X0, #0x370] // mTotalBankedPowerIkuraNum = X1
```

## コード化する

今までの三工程をまとめると以下のようになります。

最後の RET 命令はおまじないのようなもので、Hook する関数にも依りますが基本的には必要になってきます。

```
ADRP X0, #0x1CC000
LDR X0, [X0, #0xEE0]
LDR X0, [X0]         // X0 = PlayerDirector
LDR X1, [X0, #0x370] // X1 = mTotalBankedPowerIkuraNum
ADD X1, X1, #0x2000  // X1 = X1 + 8192
ADD X1, X1, #0x70F   // X1 = X1 + 1807
STR X1, [X0, #0x370] // mTotalBankedPowerIkuraNum = X1
RET
```

命令の長さは全部で 8 となり、`sendSignalEvent()`の長さである 17 以下で収めることができました。

あとはこのアセンブラを ARM to HEX Converter で変換するだけです。このとき出力される ARM HEX という値が今回欲しかったコードになります。

```
600E0090
007047F9
000040F9
01B841F9
21084091
213C1C91
01B801F9
C0035FD6
```

あとはこれを IPSwitch 形式に書き換えれば作業は終了です。

### IPSwitch 形式に書き換え

`sendSignalEvent()`の先頭からドンドン上書きするだけなので以下のようになります。

```
// Signal Nice Hook [tkgling]
@enabled
0104C94C 600E0090
0104C950 007047F9
0104C954 000040F9
0104C958 01B841F9
0104C95C 21084091
0104C960 213C1C91
0104C964 01B801F9
0104C968 C0035FD6
```

<video controls src="https://video.twimg.com/ext_tw_video/1255570033041866752/pu/vid/1280x720/V6dR98sBNkv9dCRo.mp4"></video>

Starlight（3.1.0） を使って左上に常に取得した赤イクラ数が表示されているのですが、ナイスを押すたびに 9999 増えていることがわかります。

<video controls src="https://video.twimg.com/ext_tw_video/1255585723153088513/pu/vid/1280x720/0KtV15agtrlbh_C6.mp4"></video>

ちなみに、5.4.0 では赤イクラ数はプレイヤー一人あたり最大 9999 でカンストするので押すたびに 9999 増やすコードは最初の一回しか意味がなかったりします。

### 演習問題

ナイスを押すと一人目のプレイヤー（player[0]）の`mRoundBankedGoldenIkuraNum`の数が 999 になるコードを書いてください。

player[0] の`mRoundBankedGoldenIkuraNum`が先頭からいくらズレているかをチェックすれば難しくないはず。

<video controls src="https://video.twimg.com/ext_tw_video/1255593531315453952/pu/vid/1280x720/GYDa38vvBTsI4vvo.mp4"></video>

ナイスを押した瞬間に納品数が 999 になるのでクリアできます。

ただ、何らかのチェックが働いているのか、リザルト画面でのスコアには正しく反映されません。

記事は以上。