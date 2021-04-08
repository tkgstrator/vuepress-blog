# 変数名とキーが一致している場合

```json
{
    "id": 100,
    "name": "tkgling",
    "email": "tkgling@sample.com"
}
```

こういう値を返すJSONを考える。例えばユーザ名を指定してそのユーザの情報を返すようなAPIが想定されるだろう。

「変数名とキーが一致している」としたのはJSON側ではスネークケースであることが多いのに対して、Swiftではキャメルケースでの命名規則が推奨されているためだ。つまりJSON側では`user_name`というキーがあれば、その値はSwift側では`userName`として取得したいのである。

が、今回のAPIではたまたまアンダーバーがなくそのような変換が不要だと想定する。

```swift
struct UserInfo: Decodable {
    let id: Int
    let name: String
    let email: String
}

do {
    let decoder = JSONDecoder()
    // SwiftyJSONを利用した場合
    let user: UserInfo = try decoder.decode(UserInfo.self, from: json.rawData())
    // Dictionary<String, Any>の場合
    let user: UserInfo = try decoder.decode(UserInfo.self, from: json.rawData())

} catch {
    // エラー処理
}
```

# 変数名とキーが一致していない場合

変数名とキーが一致していない場合、いくつかの対応がある。

* 手動で変数とキーの対応表であるCodingKeyを書く
  * 最もめんどくさく、最も推奨しない
  * キーが多く、ネストが深いJSONだと対応表だけで数百行になる
* キーと変数名に一定の規則がある場合
  * JSONDecoder()の自動変換機能が使える
  * キーの命名規則がスネークケースでないとめんどくさいのが難点
* 変数名をキーから決める
  * 確実に一意にはなるが、自分が使いたい変数名にならない場合がある

## 自分で対応表を書く場合

例えば以下のようなJSONを扱うことを考えます。

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com"
}
```

これは先程の考えを推し進めれば次のように構造体をつくればDecodableで一発で変換できる。

```swift
struct UserInfo: Decodable {
    let user_id: Int
    let user_name: String
    let user_email: String
}
```

しかし、Swiftはキャメルケースが命名規則なので、この変数名は正直センスがない。別の言い方をすればイカしていないのである。

Swiftの命名規則に従えばこれらの変数は以下のように定義されるべきである。スネークケースからキャメルケースの変換は簡単で、アンダーバーを削除してアンダーバーの最初のアルファベットを大文字にするだけである。

```swift
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
}
```

ただ、これではそのままデコードできないのでそこを繋げるための対応表を書く。

```swift
private let UserInfoKeys: String, CodingKey {
    case userId     = "user_id"
    case userName   = "user_name"
    case userEmail  = "user_email"
}
```

Enumの名前は今回は変数名と揃えたが、区別がつくなら別に何でも良い。ただし、 rawValueだけはキーと一致させる必要がある。

最後に構造体のイニシャライザを書いたらそれらをくっつけるだけである。

 ```swift
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String

    private let UserInfoKeys: String, CodingKey {
    case userId     = "user_id"
    case userName   = "user_name"
    case userEmail  = "user_email"
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: UserInfoKeys.self)
        // 処理を書く
    }
}
```

 これはPlaygroundで簡単に再現できるのでやってみましょう。

```swift
import Foundation

// JSONファイルを定義
let json = """
{
    "user_id": 0,
    "user_name": "tkgling",
    "user_email": "tkgling@gmail.com"
}
"""

let decoder = JSONDecoder()
let data = try decoder.decode(UserInfo.self, from: Data(json.utf8))
print(data)

// UserInfoの定義
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
    
    // プロパティとキーの対応
    private enum UserInfoKeys: String, CodingKey {
        case userId = "user_id"
        case userName = "user_name"
        case userEmail = "user_email"
    }
    
    // イニシャライザ
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: UserInfoKeys.self)
        
        userId = try container.decode(Int.self, forKey: .userId)
        userName = try container.decode(String.self, forKey: .userName)
        userEmail = try container.decode(String.self, forKey: .userEmail)
    }
}
```

このコードで正しく、次のような結果を得ることができます。

```swift
// 実行結果
UserInfo(userId: 0, userName: "tkgling", userEmail: "tkgling@gmail.com")
```

が、やってみればわかるのですが途方もなくめんどくさいです。プロパティが10くらいならやる気もおきますが、それを超えるとめんどうなだけです。

## スネークケースからキャメルケースへの変換

単にスネークケースからキャメルケースに変換するだけであればJSONDecoderの`convertFromSnakeCase`のプロパティが使えます。

```swift
import Foundation

let json = """
{
    "user_id": 0,
    "user_name": "tkgling",
    "user_email": "tkgling@gmail.com"
}
"""

let decoder: JSONDecoder = {
    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .convertFromSnakeCase
    return decoder
}()
let data = try decoder.decode(UserInfo.self, from: Data(json.utf8))
print(data)

struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
}
```

これはJSONDecoderのプロパティに予め`.convertFromSnakeCase`を適用させた状態で使っているため、JSONを読み込んだ段階でキーが全てキャメルケースに変換されています。

よって、対応表を書かなくとも一発でデータを取得することができます。

## JSONのキーをプロパティ名にする

こちらはSwiftでの命名規則よりもJSON側の命名規則を優先する場合、またはJSON側がキャメルケースになっている場合などに使えます。

```swift
import Foundation

let json = """
{
    "user_id": 0,
    "user_name": "tkgling",
    "user_email": "tkgling@gmail.com"
}
"""

let decoder: JSONDecoder = {
    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .useDefaultKeys
    return decoder
}()
let data = try decoder.decode(UserInfo.self, from: Data(json.utf8))
print(data)

struct UserInfo: Decodable {
    let user_id: Int
    let user_name: String
    let user_email: String
}
```

# 自動で型変換しよう

JSONが持っている型と、Swiftで扱いたい型が違う場合があります。その際には`DateEncodingStrategy`と`DateDecodingStrategy`を使えば簡単に相互変換ができます。

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600
}
```

アカウントが作成された時間がUnixTimestampで保存されているのですが、これをDate型に変換したい場合などが考えられます。

```swift
let decoder: JSONDecoder = {
    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .convertFromSnakeCase
    decoder.dateDecodingStrategy = .secondsSince1970
    return decoder
}()
```

このときはこのようにJSONDecoderを拡張してやればDate型に自動で変換してくれます。

```swift
// 実行結果
UserInfo(userId: 0, userName: "tkgling", userEmail: "tkgling@gmail.com", createdAt: 2021-04-01 09:00:00 +0000)
```

このデコード方式はいまのところ以下のものが対応している様子でした。
* ISO8601形式(.iso8601)
  * 万能かつ最強
  * これを使っていればとりあえず怒られることはない
  * 昔は使えなかったっぽいのだが、いつの間にか対応していた
* 標準フォーマット(.secondsSince1970)
  * `yyyy-mm-dd HH:mm:ss`形式のやつ
* 標準フォーマット(.millisecondsSince1970) 
  * 上のやつのミリ秒まで使えるパターン

ただ、RealmなどはDate型にプライマリキーをつけられないなどの制約があるので、データベースに保存するつもりならわざわざDate型に変換する意味はないような気もします。

# いろいろな構造のJSONに対する対応

## 配列の場合(Array)

ではちょっと複雑化したネスト付きのJSONを考えよう。

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": [
        "tkgling",
        "tkgstrator"
    ]
}
```

このように配列が入っている場合も、構造体のプロパティとして配列を与えてやればJSONDecoderは自動で変換してくれます。

```swift
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
    let createdAt: Date
    let accounts: [String]
}
```

```swift
// 実行結果
UserInfo(userId: 100, userName: "tkgling", userEmail: "tkgling@sample.com", createdAt: 2021-04-01 09:00:00 +0000, accounts: ["tkgling", "tkgstrator"])
```

ちなみに今回はString型で単純に受け取っていますが、以下のように好きな構造体を割り当てることもできます。

## オブジェクトの配列の場合(ArrayObject)

オブジェクトを配列として持っている場合を考える。

このときは先程とは違い、何番目のアカウントのidやcreated_atに直接アクセスできるような仕組みになっているとありがたいわけである。

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": [
        {
            "id": "tkgling",
            "created_at": 1617267600
        },
        {
            "id": "tkgstrator",
            "created_at": 1617267600
        }
    ]
}
```

この場合はオブジェクトが配列になっているだけなのだから、次のように構造体を定義すれば良い。

```swift
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
    let createdAt: Date
    let accounts: [Account]
    
    struct Account: Decodable {
        let id: String
        let createdAt: Date
    }
}
```

```swift
UserInfo(userId: 100, userName: "tkgling", userEmail: "tkgling@sample.com", createdAt: 2021-04-01 09:00:00 +0000, accounts: [Page_Contents.UserInfo.Account(id: "tkgling", createdAt: 2021-04-01 09:00:00 +0000), Page_Contents.UserInfo.Account(id: "tkgstrator", createdAt: 2021-04-01 09:00:00 +0000)])
```

## オブジェクトの場合(Dictionary)

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": {
        "id": "tkgling",
        "created_at": 1617267600
    }
}
```

ここで少し問題になるのは、ユーザがアカウントを作成していれば確実に情報は入っていますが、アカウントを作成していない場合には`accounts`の中身が想定しているものと変わるケースがあるということです。

```json
// パターン1
// accountsそのものをレスポンスに含まない
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
}

// パターン2
// レスポンスに含むが、ないことを示す
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": null
}

// パターン3
// レスポンスに含めるが、それぞれのパラメータがないことを示す
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": {
        "id": null,
        "created_at": null
    }
}
```

それぞれについて対応策を考えていきますが、結局はどこのパラメータとして`nil`を許容するかという問題になります。

```swift
// パターン1, 2の場合
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
    let createdAt: Date
    let accounts: Account? // オプショナル
    
    struct Account: Decodable {
        let id: String
        let createdAt: Date
    }
}

// 実行結果
UserInfo(userId: 100, userName: "tkgling", userEmail: "tkgling@sample.com", createdAt: 2021-04-01 09:00:00 +0000, accounts: nil)
```

パターン2の場合は`accounts`に`nil`が入る可能性があるため、該当部分をオプショナルに変更します。

ちなみにSwiftは変数をもったりもたなかったりというようなことが（多分）できないのでパターン1のJSONは強制的にパターン2と同じデータに変換されます。

```swift
// パターン3の場合
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
    let createdAt: Date
    let accounts: Account
    
    struct Account: Decodable {
        let id: String?
        let createdAt: Date?
    }
}

// 実行結果
UserInfo(userId: 100, userName: "tkgling", userEmail: "tkgling@sample.com", createdAt: 2021-04-01 09:00:00 +0000, accounts: Optional(Page_Contents.UserInfo.Account(id: nil, createdAt: nil)))
```

パターン3の場合は`accounts`自体はかならずあるが、中身のデータが有るかどうかがわからないのでこうなります。

## キーが文字列型でないオブジェクト(Dictionary)

気が狂いそうになるのがこのパターン。Swiftは変数名の先頭を数字にできないため、以下のような構造をしていると単純にデータをとってくることができなくなる。

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": {
        "1": "tkgling",
        "2": "tkgstrator"
    }
}
```

このようなケースではaccountsのキーが必要な場合と不要な場合が存在する。今回のケースではキーは順序を保証するためだけの情報なので（Swiftの配列は順序が保証されるので）あってもなくてもいいことになる。

ちなみにただデータを取得したいだけであればこう書ける。

```swift
struct UserInfo: Decodable {
    let userId: Int
    let userName: String
    let userEmail: String
    let createdAt: Date
    let accounts: [Int: String]
}
```

```swift
// 実行結果
UserInfo(userId: 100, userName: "tkgling", userEmail: "tkgling@sample.com", createdAt: 2021-04-01 09:00:00 +0000, accounts: [2: "tkgstrator", 1: "tkgling"])
```

## 配列をオブジェクトにしている場合 (Dictionary)

```json
{
    "user_id": 100,
    "user_name": "tkgling",
    "user_email": "tkgling@sample.com",
    "created_at": 1617267600,
    "accounts": {
        "1": {
            "id": "tkgling",
            "created_at": 1617267600
        },
        "2": {
            "id": "tkgstrator",
            "created_at": 1617267600
        }
    }
}
```

さっきのを更に拡張するとこうなります。JSONでは順序がないため順序を保持するために辞書にIDを割り振っているケースがあります。

これはやはり辞書のキーが数字のため単純に置き換えることができません。

これ、未だに自動でDecodableなstructに変換するための書き方がわからないです。

## ルートがオブジェクトの配列の場合

最後にこういうパターンの対応作。

```json
[
    {
        "id": "tkgling",
        "created_at": 1617267600
    },
    {
        "id": "tkgstrator",
        "created_at": 1617267600
    }
]
```

単にデータをとってきたいだけなら以下のように書けば良い。

```swift
let data: [UserInfo] = try decoder.decode([UserInfo].self, from: Data(json.utf8))

struct UserInfo: Decodable {
    let id: String
    let createdAt: Date
}
```

```swift
// 実行結果
[Page_Contents.UserInfo(id: "tkgling", createdAt: 2021-04-01 09:00:00 +0000), Page_Contents.UserInfo(id: "tkgstrator", createdAt: 2021-04-01 09:00:00 +0000)]
```
