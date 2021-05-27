# IPSwitch のコード開発チュートリアル

ここでは IPSwitch でつかえるスプラトゥーン用のコード開発の方法について解説していきます。

開発にあたって以下のものが必要になるので必ず用意してください。

- 当該のスプラトゥーン 2 の実行ファイル
  - 取得方法は記事が長くなるので割愛します
- [IDA Pro](https://www.hex-rays.com/ida-pro/)または[GHIDRA](https://ghidra-sre.org/)などの ARM64v8 の逆アセンブラツール

  - ARM64v8 のバイナリをそのまま読み込むためのローダまたは復号化ツール
    - GHIDRA 用: [Ghidra-Switch-Loader](https://github.com/Adubbz/Ghidra-Switch-Loader)
    - IDA Pro 用: [SwitchIDAProLoader](https://github.com/pgarba/SwitchIDAProLoader)
  - 復号化ツール[nx2elf](https://github.com/tkgstrator/nx2elf)
    - これがあればローダは不要になります
    - 64 ビットで動作するように改良したものになります

- [Online ARM to HEX Converter](https://armconverter.com/)
  - ウェブサイトなのでそのまま利用できます

## 目次

### [スペシャル必要ポイント変更コード 1](/posts/2019/05/01/ipswitch01.html)

### [スペシャル必要ポイント変更コード 2](/posts/2019/05/09/ipswitch02.html)

### [イカッチャのサーモンラン変更コード](//posts/2019/07/02/ipswitch03.html)

### [全ブキ開放コード](/posts/2019/07/07/ipswitch04.html)

### [ガチマッチの時間変更コード](/posts/2019/09/12/ipswitch05.html)

### デバッグメニュー変更コード

### [ナイスやカモン上書きコード](/posts/2020/04/30/ipswitch06.html)

### [チーム変更コード](/posts/2020/05/27/ipswitch07.html)

### [リアルタイムスペシャル変更コード](/posts/2020/11/02/ipswitch08.html)

### インスタンスコードの移植方法
