---
title: プロトコルとかクラスとか
date: 2021-04-20
description: プロトコルを使って柔軟にクラスを書いてみます
category: Swift
---

## プロトコル

プロトコルを学ぶにあたって、なぜプロトコルが必要なのかを理解しておく必要がある。

これに関しては[Swiftのプロトコルについて](https://qiita.com/Howasuto/items/546e615325f9feca55f7)の記事が大変参考になりました。

::: tip
「プロトコルはクラスや構造体が実装するプロパティとメソッドの最低限の決まり事を設定する機能」とおぼえておけば良い
:::

同様の機能としてスーパークラスというものがあるが、Swiftの構造体にはスーパークラスという概念がない。そのため、代わりにプロトコルを使うというわけである。

## プロトコルのメリット

参考文献を見ながら自分でも確認する感じで読みすすめていきました。

### 実装をあとから変更できる

プロトコルは定義（プロパティ名や型）だけを指定できるので、実際そこにどんな値を入れるかはクラスや構造体ごとに変えることができる。

### 構造体にもつかえる

先程も述べたようにSwiftでは構造体に対して継承ができません。

が、プロトコルであればほとんど同じようなことができます。

### 複数継承できる

クラスは一つしか継承できませんが、プロトコルであれば複数適用することができます。

## プロトコルを考える

APIと通信を行なうためには以下のような情報が必要になります。

- 基本URL
  - APIサーバのURL
  - "https://tkgling.netlify.app/api/"
- パス
  - "session_token"
- エンドポイント
  - たたくAPIのURL
  - 基本URLとパスの組み合わせ
  - "https://tkgling.netlify.app/api/session_token"
- メソッド
  - POSTとかGETとかPUTとか
- ヘッダー
  - 認証情報を入れたりとか
- エンコーディング方式
  - URLエンコードかJSONエンコードかパラメータエンコードか
- パラメータ
  - Bodyに入れるデータ

なのでこれらを全部プロトコルで定義してしまえばいいような気がしますが、パラメータはメソッドがGETのときには不要ですし、ライブラリ化するときには一つのAPIサーバに対して通信することを想定しているのですから基本URLも不要です。

パスと基本URLがあればいいのでエンドポイントも不要ですし、ヘッダーが常に認証情報しか保たないのであればこれもやはり不要です。エンコーディング方式も「POSTとPUT以外であればURLエンコード」というような仕様になっていれば、実際に必要なのは次の三つの情報になります。

## プロトコルを書いてみる

例えば以下のようなシンプルなものを考えてみます。

### 単純なプロトコルのみ

```swift
protocol RequestType {
    var method: String { get }
    var parameters: [String: Any]? { get }
    var path: String { get }
}

class Request: RequestType {
    var method: String // 必須
    var parameters: [String : Any]? // 必須
    var path: String // 必須

    init(method: String, path: String, paramaters: [String: Any]? = nil) {
        self.method = method
        self.parameters = paramaters
        self.path = path
    }
}
```

そして以下のように実行してみます。

POSTという値でメソッドを初期化しているので、当然結果はPOSTが出力されます。

```swift
let request = Request(method: "POST", path: "session_token")
print(request.method) // POST
print((request as RequestType).method) // POST
```

### Extensionで拡張する

次に、Extensionで拡張して既に定義されているプロパティに何らかの値を持たせてみます。

```swift
protocol RequestType {
    var method: String { get }
    var parameters: [String: Any]? { get }
    var path: String { get }
}

extension RequestType {
    var method: String { return "GET" }
}

class Request: RequestType {
    var method: String // 必須
    var parameters: [String : Any]? // 必須
    var path: String // 必須

    init(method: String, path: String, paramaters: [String: Any]? = nil) {
        self.method = method
        self.parameters = paramaters
        self.path = path
    }
}
```

するとこれも先程と同じくどちらもPOSTという値を返します。

どうやら、Extensionで何らかの値を設定してもクラス側で上書きされる（またはExtensionの値よりもクラスの値が優先して呼び出される）ようです。

```swift
let request = Request(method: "POST", path: "session_token")
print(request.method) // POST
print((request as RequestType).method) // POST
```

### パラメータを消してみる

Extensionで定義しているのでプロトコルからmethodを取り除いてみます。

するとプロトコルを適用しているRequestは必ずしもmethodプロパティをもつ必要がなくなります。

```swift
protocol RequestType {
    // methodを削除
    var parameters: [String: Any]? { get }
    var path: String { get }
}

extension RequestType {
    var method: String { return "GET" }
}

class Request: RequestType {
    var method: String // 必須ではない
    var parameters: [String : Any]? // 必須
    var path: String // 必須

    init(method: String, path: String, paramaters: [String: Any]? = nil) {
        self.method = method
        self.parameters = paramaters
        self.path = path
    }
}
```

この状態で同じように実行してみるとなんと結果が変わってしまいました。

```swift
let request = Request(method: "POST", path: "session_token")
print(request.method) // POST
print((request as RequestType).method) // GET
```

### クラスからも消してみる

```swift
protocol RequestType {
    var parameters: [String: Any]? { get }
    var path: String { get }
}

extension RequestType {
    var method: String { return "GET" }
}

class Request: RequestType {
    var parameters: [String : Any]?
    var path: String

    init(path: String, paramaters: [String: Any]? = nil) {
        self.parameters = paramaters
        self.path = path
    }
}
```

クラスからもプロパティを消して`request.method`が呼び出すことができるのかどうかは気になるところなのですが、RequestクラスはRequestTypeを継承しているため問題なく呼び出すことができます。

そして、このときは（当たり前ですが）Extension側のプロパティが呼ばれるということです。

```swift
let request = Request(path: "session_token")
print(request.method) // GET
print((request as RequestType).method) // GET
```

ここまでをまとめるとこうなります。

つまり、プロトコルには宣言されていないがExtensionで宣言したプロパティは、静的型付けをして呼び出すとExtension側の値が呼び出されるということになります。

| プロトコル宣言 | Extension | クラス宣言 | メソッド | 値            | 
| :----------------: | :---------------: | :------------: | :--------------: | :-----------: | 
| あり               | あり              | 必須           | 静的/動的        | クラス    | 
| あり               | なし              | 必須           | 静的/動的        | クラス    | 
| なし               | あり              | あり           | 静的             | Extension | 
| なし               | あり              | あり           | 動的             | クラス    | 
| なし               | あり              | なし           | 静的/動的        | Extension |

## この仕様を利用する

この仕様を利用すれば必須パラメータはプロトコルに直接書き、オプショナルなパラメータはExtensionに書いてそのプロトコルを継承したクラスを書くのがスマートな方法になりそうです。

```swift
protocol RequestType {
    var method: String { get }
    var parameters: [String: Any]? { get }
    var path: String { get }
}

extension RequestType {
    var baseURL: String { "https://tkgling.netlify.app/api/" }
    var headers: [String: String]? { nil }
    var encoding: ParameterEncoding { URLEncoding.default }
}

class Request: RequestType {
    var method: String // 必須
    var parameters: [String : Any]? // 必須
    var path: String // 必須

    init(method: String, path: String, paramaters: [String: Any]? = nil) {
        self.method = method
        self.parameters = paramaters
        self.path = path
    }
}
```

このデータに対しては以下のようにアクセスできる。Requestクラスで定義しておらず、必須でないプロパティにアクセスできるのは便利な気がしている。

もしもユーザがそれらのプロパティが必要だと思えば、クラスに書いてしまえばいいのである。

```swift
// 型はRequestでなくRequestTypeにすること
func remote(request: RequestType) -> Void {
    print(request.method)
    print(request.parameters)
    print(request.headers)
    print(request.path)
    print(request.baseURL)
    print(request.encoding)
    // すべてのデータにアクセスできる！！
}

let request = Request(method: "POST", path: "token")
remote(request: request)
```

## 計算プロパティにしてみる

現在のExtensionはこの様になっているが、エンコーディングの部分はメソッドの値によって動的に切り替えたいわけである。

```swift
extension RequestType {
    var baseURL: String { "https://tkgling.netlify.app/api/" }
    var headers: [String: String]? { nil }
    var encoding: ParameterEncoding { URLEncoding.default }
}
```

単純に`self.method`で切り替えるようにすると後で上書きしたときに（今回の場合はgetしかmethodに設定されていないので上書きされることはないが）データを正しくとってくることができなくなってしまう。

よって、encodingの値を参照する度に毎回methodの値を調べ、その値によって変わるような仕組みにしたいのである。

これは計算プロパティで簡単に実装できる。つまり、以下のように書けば良い。

```swift
extension RequestType {
    var baseURL: String { "https://tkgling.netlify.app/api/" }
    var headers: [String: String]? { nil }
    var encoding: ParameterEncoding { 
        get {
            switch self.method {
                case .post:
                    return JSONEncoding.default
                case .put:
                    return JSONEncoding.default
                default:
                    return URLEncoding.default
            }
        }
     }
}
```

これの良いところは全ての設定をRequestTypeプロトコルで行なうことで、実際にRequestクラスを書くユーザに対しては秘匿になっている点である。

要するに、コードを書く人間はエンコーディング方式を全く気にせずRequestクラス（ないしはRequestTypeプロトコルを適用したクラス）を書くことができるわけである。

そして、デフォルトではPOSTリクエストであれば自動的にJSONEncoding.defaultが使われてしまうのだが、もしもあるリクエストでは違うエンコーディングが使いたければ、

```swift
class Request: RequestType {
    // Extensionの値が上書きされる！
    var encoding: ParameterEncoding = JSONEncoding.queryString
}
```

勝手に自分でエンコーディングを設定すればよいのである。

ただし、これはRequestクラスのプロパティとして設定されているのでRequestTypeプロトコルで呼び出したメソッドに対してはそのまま`request.encoding`と呼び出すと予期しない値を参照してしまう。

```swift
// RequestTypeプロトコルとして呼び出す
func remote(request: RequestType) -> Void {
    print(request.encoding) // URLEncoding
    print((request as! Request).encoding) // JSONEncoding.queryString
}

// Requestクラスとして呼び出す
func remote(request: Request) -> Void {
    print(request.encoding) // JSONEncoding.queryString
    print((request as! Request).encoding) // JSONEncoding.queryString
}
```