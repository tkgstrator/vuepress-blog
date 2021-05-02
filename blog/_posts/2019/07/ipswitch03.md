---
title: "[IPSwitch] 誰でもできるコード開発 #3"
date: 2019-07-02
description: IPSwitchで使えるコードを自作する方法についての解説#3です
category: Hack
tags:
  - IPSwitch
  - コード開発
---

## はじめに

今回の内容は以下の記事の続きになります。

[[IPSwitch] 誰でもできるコード開発 #2](https://tkgstrator.work/posts/2019/05/09/ipswitch02.html)

この記事を読むにあたって必ず目を通して理解しておいてください。

## 関数の返り値を調べる

今回は関数の返り値を変えることで、動作やモードを切り換えるコードの開発について学びます。

ぶっちゃけると関数の返り値を変えるというのはリターンする値を上書きしてしまえばいいのですが、どこをどう変えればどのように変わるのかよくわからなかったので復習という感じです。

### BL 命令

BL 命令とは条件分岐した後で、値をリターンする命令です。

擬似コードで書くとこのような感じになります

```
if(x0 == 1){
    // 何かしらの処理
    return 1;
} else {
    // 何かしらの処理
    return 0;
}
```

要するに、BL 命令はレジスタをいろいろいじった後で最終的になにかの値を返す命令なのです。

さて、ここで疑問「アセンブラってどうやって値を返すの？」って思った人もいると思います、素晴らしい疑問です。

自分もここがずっと引っかかっていたのですが、

**X0/W0 レジスタに必ず返り値がセットされているらしい**

という事に気付きました。

つまり、BL命令は分岐先で何か処理をしたあとでX0/W0レジスタに値をセットする命令だということです。

## _ZN4Game4Coop3Utl7GetRuleEv

さて、BL命令について理解したら `_ZN4Game4Coop3Utl7GetRuleEv` というサブルーチンに注目してみましょう。

アドレスは以下にメモしておきますので、IDA Pro なり GHIDRA なりで確認してみてください。

|   バージョン   | アドレス |
| :-----------: | :------: |
|     3.1.0     |  5C3368  |
|     5.4.0     |  75E6DC  |

さて、この Game4Coop3Utl7GetRuleEv（以下、GetRule() と省略する）というなんだか長くてややこしいサブルーチンですが全体を見ると面白いことに気付きます。

```
__int64 __fastcall Game::Coop::Utl::GetRule(Game::Coop::Utl *__hidden this)
ADRP       X8, #off_4156130@PAGE
LDR        X8, [X8,#off_4156130@PAGEOFF]
LDR        X8, [X8] ; Cmn::StaticMem::sInstance
CBZ        X8, loc_75E6F4
LDR        W0, [X8,#0x72C]
RET
loc_75E6F4
MOV        X0, XZR
RET
```

最終的に RET 命令で値をリターンしていることはわかり、さらにサブルーチンの定義から __int64 型（64 ビット整数）を返していることがわかります。

ではこのサブルーチンがどのように使われているかを調べます。

::: tip
IDA Pro があるならサブルーチン名を右クリックして Jump to xref to operand を選択すると GetRule() が使われている関数をすべて調べることができます。
:::

すると例えば以下のようなコードが見つかります。

```
BL         _ZN4Game4Coop3Utl7GetRuleEv ; Game::Coop::Utl::GetRule(void)
LDR        X26, [X24,#8]
CMP        W0, #2
ADD        X0, SP, #0x3D0+var_3C0 ; this
MOV        W8, #7
```

これだけだとわかりにくいと思うので、擬似コードに変換すると次のようになります。

```
v12 = Game::Coop::Utl::GetRule(result);
v13 = *(_QWORD *)(v7 + 8);
  if ( v12 == 2 )
    v14 = 8;
  else
    v14 = 7;
```

GetRule() で何かしらを計算をして「その値が 2 だったら v14 に 8 を、そうでなければ v14 に 7 を代入しろ」という命令になっているわけです。

つまり、返り値として 2 は存在することがわかるのですが他にどんな値を返すパターンがあるのでしょう？

実はこの GetRule() は遊んでいるサーモンランの種類によって返り値が異なります。

|     種類      | GetRule() |  機械語  |
| :-----------: | :-------: | :------: |
|   オンライン   |     1     | 20008052 |
|   イカッチャ   |     2     | 40008052 |
| チュートリアル |     3     | 60008052 |

例えばオンラインで遊んでいるかのようにデータをいじりたいときは、W0 の値を 1 にするような命令で GetRule() を上書きすれば良いことになります。

### GetRule() が使われるサブルーチン

本当はもっといっぱいあるけど、面白そうなやつだけを列挙してみました。

引数がすっごい多いやつもあるのでここでは引数は省略します。

以下のコードは全て 5.4.0 向けです。

|               サブルーチン                | アドレス |
| :---------------------------------------: | :-----: |
| Game::Coop::GuideDirector::showMessage_() | 6FF36C  |
|    Game::Coop::Moderator::Moderator()     | 72ED40  |
|   Game::SeqCoopResult::SeqCoopResult()    | 74E80C  |
|       Game::Coop::Setting::reset()        | 75BF54  |

さて、それぞれ弄るとどんな結果になるのか見てましょう。

**showMessage_()**

ここを弄ると...！！

```
// Raspy Voice [tkgling]
@disabled
006FF3AC 20008052 // MOV W0, #1
```

どうなるかは自分で実際にコードを動かして試してみましょう！

**Moderator()**

モデレータっていうのは（恐らく）サーモンランを司る一番大きな要素です。

1 にすると NormalRuleModerator() でオンラインモードが呼び出されるはずですが、何故かブキが強制的にボールドになります。

どのブキを選んでも必ずボールドに変えられてしまいます、なんじゃそりゃ...

:::tip
恐らくオンラインの情報から現在支給されるブキ情報をとってくるんだけど、オンラインに一回も繋いでいないのでブキデータがなく、初期値 0 のボールドマーカーが使われているんだと思います。
:::

```
// Force Splash-o-matic
@disabled
0072ED84 20008052 // MOV W0, #1
```

変な値（2 とか）にすると何ももってないまま棒立ちするイカちゃんが見れます。

**SeqCoopResult()**

返り値を 1 にすると`Game::Coop::OnlineResultPlayReport()`が呼び出されるはず。

```
// SeqCoopResult
@disabled
0074EB5C 20008052 // MOV W0, #1
```

なのですが、特に何も変わりませんでした。

**reset()**

値が 1 のときだけ`Cmn::Def::Coop::CalcOnlineEvalPoint()`というオンラインのクマサンポイントを計算するサブルーチンが呼び出されます。

```
// CalcOnlineEvalPoint
@disabled
75BF7C 20008052 // MOV W0, #1 
```

が、特になにか変わったような感じもしませんでした。

ここはオンラインもオフラインも似たようなことをしているみたいです。

## _ZNK2Lp3Utl9ByamlIter14tryGetIntByKeyEPiPKc

次もいろいろなことに使えそうなサブルーチンを紹介します。

このサブルーチンは `Lp::Utl::ByamlIter::tryGetIntByKey()` という別名をもっており、その内容は次のようになります。

```
STR        X21, [SP,#-0x10+var_20]!
STP        X20, X19, [SP,#0x20+var_10]
STP        X29, X30, [SP,#0x20+var_s0]
ADD        X29, SP, #0x20
MOV        X21, X0
ADD        X0, SP, #0x20+var_18 ; this
MOV        X20, X2
MOV        X19, X1
BL         _ZN2Lp3Utl9ByamlDataC2Ev
ADD        X1, SP, #0x20+var_18 ; Lp::Utl::ByamlData *
MOV        X0, X21 ; this
MOV        X2, X20 ; char *
BL         _ZNK2Lp3Utl9ByamlIter17getByamlDataByKeyEPNS0_9ByamlDataEPKc
TBZ        W0, #0, loc_19E46EC
ADD        X0, SP, #0x20+var_18 ; this
BL         _ZNK2Lp3Utl9ByamlData7getTypeEv
AND        W8, W0, #0xFF
CMP        W8, #0xFF
B.EQ       loc_19E46EC
ADD        X0, SP, #0x20+var_18 ; this
BL         _ZNK2Lp3Utl9ByamlData7getTypeEv
AND        W8, W0, #0xFF
CMP        W8, #0xD1
B.NE       loc_19E46EC
ADD        X0, SP, #0x20+var_18 ; this
BL         _ZNK2Lp3Utl9ByamlData8getValueEv
STR        W0, [X19]
MOV        W0, #1
B          loc_19E46F0
loc_19E46EC
MOV        W0, WZR
loc_19E46F0
LDP        X29, X30, [SP,#0x20+var_s0]
LDP        X20, X19, [SP,#0x20+var_10]
LDR        X21, [SP+0x20+var_20],#0x30
RET
```

読むのめんどくせえなあって思った方は正解です。

スーパーハカーならこれを読んで意味が理解できると思うのですが、ぼくにはちんぷんかんぷんです。

ですが、サブルーチン名からおおよその予想は付きます。

これは Byaml ファイル（ブキのパラメータなどが設定されている xml）を読み込んで、その値を返す関数です。

そして、このサブルーチンは以下のように使われます。

```
__int64 __fastcall Cmn::MushUnlockGearInfo::create()
ADRP       X2, #aAppversion@PAGE ; "AppVersion"
ADD        X0, SP, #0xA0+var_70 ; this
MOV        X1, X24 ; int *
ADD        X2, X2, #aAppversion@PAGEOFF ; "AppVersion"
BL         _ZNK2Lp3Utl9ByamlIter14tryGetIntByKeyEPiPKc
```

これは UnlockGearInfo.byml を読み込んで、そこに書かれている AppVersion の値を取得する関数です。

もしも「あるギア X の UnlockVersion が現在のスプラのバージョンよりも低ければ開放する」という仕組みですね。

じゃあ「さっきと同じように BL 命令を上書きして適当に 0（True）を返すようにすればいいんじゃないの？」と思うのですが、それではいけません。

擬似コードを読めば何故ダメなのかわかります。

```
if ( !(result & 1) )
          return result;
        if ( *((unsigned int *)v2 + 2) <= v10 )
          v12 = (int *)*((_QWORD *)v2 + 2);
        else
          v12 = (int *)(*((_QWORD *)v2 + 2) + 12 * v10);
        Lp::Utl::ByamlIter::tryGetIntByKey((Lp::Utl::ByamlIter *)&v43, v12, "AppVersion");;
```

そう、このサブルーチン tryGetIntByKey() は返り値をレジスタに代入していないのです。

えっ「じゃあ返り値どこにいったんだ？」となるのですが、これはアドレスがレジスタに入っているのです。

つまり、以前スペシャルの値を 0 にしたときと同じくレジスタが参照するアドレスが保持する値を 0 にすればいいことになります。

よって前回と同じように以下のようなコードで実現できます。

```
STR        WZR, [X1]
```

なんで [X0] じゃなくて [X1] なのかはよくわかってませんが、まあとりあえず [X1] を指定しておけばいいと思います。

## まとめ

本当はもっと書きたかったのですが、これ以上書くとあまりに長くなりすぎるので今回はここまでとしました。

金イクラドロップ数変更を最後になかなかコードを探す機会がなかったのですが今回新しくコードを見つけられて面白かったです。

こういうコードを探す系の記事はまあぶっちゃけると人気がないのですが、需要があり続ける限りちまちま書いていこうと思います。

記事は以上。