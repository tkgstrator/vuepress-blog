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

### スペシャル必要ポイント変更コード

### イカッチャのサーモンラン変更コード

### 全ブキ開放コード

### ガチマッチの時間変更コード

### デバッグメニュー変更コード

### ナイスやカモン上書きコード

### チーム変更コード

### リアルタイムスペシャル変更コード

### インスタンスコードの移植方法
