---
title: "[Hack] DeepSea1.9.3 がリリース"
date: "2021-01-06"
category: Hack
---

## DeepSea とは

https://github.com/Team-Neptune/DeepSea

https://tkgstrator.work/?p=27527

Kosmos の後継機であり、SD カードに全部コピーするだけで誰でも簡単に CFW を導入できるオールインワンパッケージです。

詳しい導入手順は上のページをどうぞ。

## アップデート内容

- Atmosphere を 0.17.0 に更新
- Hekate を 5.5.2 に更新
- NXMTP を 0.1.5 に更新

Atmosphere がどうアップデートされたかということなのですが、シャットダウン時のバッテリー消費を非改造状態並みに下げたことと、Mariko（新型対策済み Switch）に対応した点です。

Mariko に対応したとはいえ、実際には Mariko にはペイロードをインジェクトするための脆弱性がないので MOD チップなしに CFW をロードすることはできません。あくまでも「ロードすることができれば動く」という意味合いで、エンドユーザである我々には関係ない話です。

Hekate もアップデートがありますが、基本はバグフィックスで目玉の新機能があるわけではなさそうです。

なんにせよ、特に理由もないならアップデートしてしまうほうが良いでしょう。

また、ここの記事を参考に FTP のログインパスワードを変更したり CFW(SysNAND)を無効化しておくと幸せになれるかもしれません。

https://tkgstrator.work/?p=28267

### Sigpatch

https://github.com/ITotalJustice/patches/releases/tag/11.0.1-0.17.0

Atmosphere の更新に従って Sigpatch もアップデートされたので、こちらも忘れずに更新しておきましょう。

Sigpatch Installer を使われている方であれば直接アップデートできるのでそちらで大丈夫です。

https://tkgstrator.work/?p=27490

ただ、このままだと DeepSea がパッチを読み込むようになっていないので hekate_ipl.ini を編集して読み込めるようにしましょう。

DeepSea 1.9.3 用の Nosigpatch を有効化した上で CFW(SysNAND)を無効化する hekate_ipl.ini は以下の通り。

[config[
autoboot=0
autoboot_list=0
bootwait=3
verification=1
backlight=100
autohosoff=0
autonogc=1
updater2p=1

{DeepSea/DeepSea v1.9.3}
{}
{Discord: invite.sdshrekup.com}
{Github: https://github.com/orgs/Team-Neptune/}
{}

{--- Custom Firmware ---}
[CFW (EMUMMC)[
emummcforce=1
kip1patch=nosigchk
fss0=atmosphere/fusee-secondary.bin
atmosphere=1
logopath=bootloader/bootlogo.bmp
icon=bootloader/res/icon_payload.bmp
kip1=atmosphere/kips/\*
{}

{--- Stock ---}
[Stock (SYSNAND)[
emummc_force_disable=1
fss0=atmosphere/fusee-secondary.bin
stock=1
icon=bootloader/res/icon_switch.bmp
{}

記事は以上。
