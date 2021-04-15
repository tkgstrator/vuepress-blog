---
title: Swift Package Manager + テスト用デモアプリ 
date: 2021-04-14
description: Swift Package Managerで作成したライブラリをローカルで使う方法について考える
category: Swift
---

## Swift Package Manager

Swift Package Manager（以下、SPM）で作成したライブラリをデモアプリに組み込んでテストしたいと思うときがある。

が、SPMはGitのレポジトリから取り込む形にしか対応しているように見えない。実はローカルで使う方法もあるのだが、今回はその方法を紹介する。

### Salmon Statsライブラリ

[Swiftで使えるSalmon Statsライブラリ](https://github.com/tkgstrator/SalmonStats)をSPMで開発したのだが、でもアプリがついていないのでいまいちわかりにくい感じになっている。

ちなみに現在対応しているのは次の機能。

- シフト統計の取得
  - グローバルのみ取得
- シフト記録の取得
  - 赤イクラ記録
  - 金イクラ記録
- ユーザメタデータの取得
  - バイト回数とかのデータ
- ユーザのリザルトの取得
  - 最大200件まで取得 

というわけで、まずはGitHubからSalmon Statsライブラリを取得する。

```bash
git clone git@github.com:tkgstrator/SalmonStats.git
Cloning into 'SalmonStats'...
remote: Enumerating objects: 73, done.
remote: Counting objects: 100% (73/73), done.
remote: Compressing objects: 100% (54/54), done.
remote: Total 73 (delta 20), reused 52 (delta 10), pack-reused 0
Receiving objects: 100% (73/73), 15.29 KiB | 5.10 MiB/s, done.
Resolving deltas: 100% (20/20), done.
```

cloneしたらSalmonStatsディレクトリ以下にXcodeで新プロジェクトを作成する。

### 新プロジェクトを作成

Xcodeから`SalmonStatsDemo`という新プロジェクトを作成する。

![](/assets/images/01.png)

この段階ではまだローカルパッケージが読み込まれていない。

![](/assets/images/02.png)

次にこのデモアプリのプロジェクトに対してSalmonStatsのディレクトリをそのままドラッグアンドドロップしてライブラリを追加する。

注意点としては「コピーする」は選択しなくて良いというところです。

![](/assets/images/03.png)

ちゃんとできると上の画像のようにSalmonStatsのライブラリを読み込んでくれます。

ちなみに、プロジェクトを作成するときに`IDETemplateMacros.plist`を作成しておくと便利です。詳しくは[カピ通信](https://capibara1969.com/1151/)さんが解説されています。

最後に、デモアプリに対してライブラリを追加します。

![](/assets/images/04.png)

## デモアプリ形式の便利なところ

SPMで読み込んだ場合にはライブラリのソースコードを変更できないという問題がありますが、このようにローカルでライブラリを読み込んだ場合にはライブラリのコードを変えながらデモアプリでチェックできます。

GitHubなどにコミットする必要もなく、手間が省けるというわけです。

### 既存のバグ

CombineExpectationsをライブラリに追加したままローカルやSPMで別のアプリに追加するとクラッシュします。

```swift
import PackageDescription

let package = Package(
    name: "SalmonStats",
    platforms:  [
        .iOS(.v13), .macOS(.v10_15)
    ],
    products: [
        .library(
            name: "SalmonStats",
            targets: ["SalmonStats"]),
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.4.2"),
        .package(url: "https://github.com/groue/CombineExpectations.git", from: "0.7.0")
    ],
    targets: [
        .target(
            name: "SalmonStats",
            dependencies: ["Alamofire"]),
        .testTarget(
            name: "SalmonStatsTests",
            dependencies: ["SalmonStats", "CombineExpectations"]),
    ]
)
```

どうもCombineExpectationsはtestTargetにしか追加してはダメなようだった。

### サンプルコード

例えば以下のようなコードを書けばSalmon Statsから10万番目のリザルトを取得できる。

イニシャライザで宣言するとビューを呼び出す前にアクセスしてしまうので`onAppear`で宣言するのが適切かもしれない。

```swift
// onAppearで呼び出す場合
import SwiftUI
import SalmonStats
import Combine

struct ContentView: View {
    @State private var task: AnyCancellable?
    
    var body: some View {
        Text("Hello, world!")
            .padding()
            .onAppear {
                task = SalmonStats.shared.getResult(resultId: 1000000)
                    .sink(receiveCompletion: { completion in
                        switch completion {
                        case .finished:
                            print("FINISHED")
                        case .failure(let error):
                            print("ERROR", error)
                        }
                    }, receiveValue: { response in
                        dump(response)
                    })
            }
    }
}
```

```swift
// イニシャライザで呼び出す場合
import SwiftUI
import SalmonStats
import Combine

struct ContentView: View {
    private var task: AnyCancellable?
    
    init() {
        task = SalmonStats.shared.getResult(resultId: 100000)
            .sink(receiveCompletion: { completion in
                switch completion {
                case .finished:
                    print("FINISHED")
                case .failure(let error):
                    print("ERROR", error)
                }
            }, receiveValue: { response in
                dump(response)
            })
    }
    var body: some View {
        Text("Hello, world!")
            .padding()
    }
}
```

ただ、SwiftUIはstruct型なのでクロージャの中でselfを書き換えることができない。これはmutatingでも同じことである。詳しくは[ここのGitHub Gist](https://gist.github.com/takasek/1c92935ceafb8340eb7fbc9d0f8379eb)を読めばいいことがあるかもしれない。

よって、イニシャライザを使った場合は受け取ったデータであるresopnseを処理することができない。なので普通に`onAppear`でいいような気がしてきました。

## デモアプリ

```swift
import SwiftUI
import SalmonStats
import Combine


struct ContentView: View {
    @State private var result: Response.ResultCoop?
    @State private var task: AnyCancellable?
    
    var body: some View {
        List {
            HStack {
                Text("BOSS APPEARANCES")
                Spacer()
                Text("\(result?.bossAppearanceCount ?? 0)")
            }
        }
        .onAppear() {
            getResultFromSalmonStats()
        }
    }
    
    func getResultFromSalmonStats() {
        task = SalmonStats.shared.getResult(resultId: 100000)
                    .sink(receiveCompletion: { completion in
                        switch completion {
                        case .finished:
                            print("FINISHED")
                        case .failure(let error):
                            print("ERROR", error)
                        }
                    }, receiveValue: { response in
                        result = response
                        dump(response)
                    })
    }
}
```

ビルドすると以下のように表示できる。

Combineは非同期処理なのでデータの読み込みが終わるまでは0と表示されているが、読み込みが完了すると正しい63という値に修正される。

![](/assets/images/06.png)

ところで`onAppear`ってダサいなあって思っているので前みたいに`viewDidLoad`とかで呼び出せるようになってくれないかなあと。