---
title: "[IPSwitch]5.4.0向けインスタンスアドレス"
date: "2021-02-28"
category:
  - "話題"
---

## アドレスまとめ

<table><tbody><tr><td class="has-text-align-center" data-align="center">クラス</td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.4.0</td><td class="has-text-align-center" data-align="center">意味</td></tr><tr><td class="has-text-align-center" data-align="center">Game::PlayerMgr</td><td class="has-text-align-center" data-align="center">04157578</td><td class="has-text-align-center" data-align="center">02CFDCF8</td><td class="has-text-align-center" data-align="center">ガチマッチなどのプレイヤー情報</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::RuleConfig</td><td class="has-text-align-center" data-align="center">04158008</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">パラメータを設定する</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::LevelsConfig</td><td class="has-text-align-center" data-align="center">04160E00</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">詳細なパラメータを設定する</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::Setting</td><td class="has-text-align-center" data-align="center">04160E08</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">キケン度やステージなどの設定を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::EnemyDirector</td><td class="has-text-align-center" data-align="center">04165740</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">シャケを司るクラス</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::PlayerDirector</td><td class="has-text-align-center" data-align="center">04165DB8</td><td class="has-text-align-center" data-align="center">02D0CEE0</td><td class="has-text-align-center" data-align="center">サーモンランのプレイヤー情報を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::EventDirector</td><td class="has-text-align-center" data-align="center">04167BC0</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">夜イベントなどの情報を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::Moderator</td><td class="has-text-align-center" data-align="center">04168C78</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">クマサンの挙動を司る</td></tr><tr><td class="has-text-align-center" data-align="center">Game::Coop::ResultPlayReport</td><td class="has-text-align-center" data-align="center">04169050</td><td class="has-text-align-center" data-align="center">-</td><td class="has-text-align-center" data-align="center">リザルトデータを司る</td></tr></tbody></table>

## Hook するアドレスまとめ

クラスの定義のアドレスは変わっていなかったのですが、Hook する関数はズレていたので載せておきます。

### Game::PlayerMgr::getControlledPerformer

<table><tbody><tr><td class="has-text-align-center" data-align="center">サブルーチン</td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.4.0</td></tr><tr><td class="has-text-align-center" data-align="center">Game::PlayerMgr::getControlledPerformer</td><td class="has-text-align-center" data-align="center">0x00F07B1C</td><td class="has-text-align-center" data-align="center">0x010E6D2C</td></tr></tbody></table>

5.3.1 からズレました

自分自身のインスタンスを取得するために必要な関数。

### Game::PlayerCloneHandle::sendSignalEvent

<table><tbody><tr><td class="has-text-align-center" data-align="center">サブルーチン</td><td class="has-text-align-center" data-align="center">3.1.0</td><td class="has-text-align-center" data-align="center">5.4.0</td></tr><tr><td class="has-text-align-center" data-align="center">Game::PlayerCloneHandle::sendSignalEvent</td><td class="has-text-align-center" data-align="center">0x00E797FC</td><td class="has-text-align-center" data-align="center">0x0104C94C</td></tr></tbody></table>

5.3.1 からズレました

ナイスやカモンを Hook するための関数。

## 移植しよう

例のテンプレートをペタペタと埋めるだけ。

sendSignalEvent のアドレスが変わったのでまずはそこをズラそう。

### シグナルで 999 納品

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.4.0\]
0104C94C ADRP X0, #0xXXXXX000
0104C950 LDR X0, \[X0, #0xYYY\]
0104C954 LDR X0, \[X0\]
0104C958 MOV W1, #0x270F
0104C95C STR W1, \[X0, #0x370\]
0104C960 MOV W1, #0x3E7
0104C964 STR W1, \[X0, #0x378\]
0104C968 STR W1, \[X0, #0x37C\]
0104C96C RET

こちらは BL 命令を使わないのでコールスタックは不要。XXXXX と YYY の値を計算したらおしまい。

Game::Coop::PlayerDirector : 02D0CEE0 -> 02D0C
ADRP : 0104C94C -> 0104C

XXXXX = 02D0C - 0104C = 01CC0

// Game::PlayerCloneHandle::sendSignalEvent(Game::PlayerSignalCloneEvent::Type) \[5.4.0\]
0104C94C ADRP X0, #0x01CC0000
0104C950 LDR X0, \[X0, #0xEE0\]
0104C954 LDR X0, \[X0\]
0104C958 MOV W1, #0x270F
0104C95C STR W1, \[X0, #0x370\]
0104C960 MOV W1, #0x3E7
0104C964 STR W1, \[X0, #0x378\]
0104C968 STR W1, \[X0, #0x37C\]
0104C96C RET

するとこんな感じになります。

これを ARM64 に変換するところは簡単ですので自分でやってみましょう。

### 金イクラを消してみよう

イクラを取得すると取った瞬間になかったことになるコードです。

Game::Coop::PlayerDirector : 02D0CEE0 -> 02D0C
ADRP : 0073C604 -> 0073C

XXXXX = 02D0C - 0073C = 02594

0073C604 ADRP X0, #0x25D0000
0073C608 LDR X0, \[X0, #0xEE0\]
0073C60C LDR X0, \[X0\]
0073C610 STR WZR, \[X0, #0x374\]
0073C614 RET

// Lost Cashed GoldenEggs \[tkgling\]
@disabled
0073C604 802E0190
0073C608 007047F9
0073C60C 000040F9
0073C610 1F7403B9
0073C614 C0035FD6

## おまけ

これだけだと記事の内容として寂しいのでいくつかのコードを載せておきます。5.4.0 で動きます。

### 金イクラがいっぱい

// Infinite Golden Eggs \[tkgling\]
@disabled
00667398 48018052 // Boss Salmonids
0066739C 0031881A // Salmonids
0068D680 40018052 // Bagman
006CF59C 40018052 // Chinooks

シャケが金イクラを 10 個ドロップするようになります。ただし、キンシャケ探しのキンシャケ・ラッシュのキンシャケ・霧のキンシャケ・グリルの四つのオオモノについては別パラメータで設定されているため変化しません。

### 切断チェック回避

本来であれば 60 秒間操作せずにいると回線落ち扱いになるのですが、3600 秒放置しないと落ちないようになります。

// Disable MovelessPlayer Checker \[tkgling\]
@disabled
00F8EAD0 094C9D52

記事は以上。
