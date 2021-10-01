---
title: Mockerでテスト環境をつくる
date: 2021-10-01
description: APIテストをMockerでどうにかしてみます
category: プログラミング
tags:
  - Swift
---

# Mocker

## 使い方

JSON を扱うライブラリの場合、Mocker とは別に SwiftyJSON もあると良い。

```swift
func testExample() throws {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.

    /// 非同期で値を返す(completion内の内容が返るのを待つ)テストの場合、これを定義しないとダメ
    let expectation = expectation(description: "Expectation")
    /// 返ってくるダミーデータ
    let response: [String: String] = [
        "x_product_version": "9.99.0",
        "api_version": "99991231"
    ]

    /// アクセスする先のURL
    let url = URL(string: "https://h505nylwxl.execute-api.ap-northeast-1.amazonaws.com/dev/version")!
    /// Mockの定義(内容については後述)
    let mock = Mock(url: url, dataType: .json, statusCode: 200, data: [
        .get : try! JSON(response).rawData() // Data containing the JSON response
    ])
    /// Mockを登録
    mock.register()

    /// URLSessionでリクエストを送る
    URLSession.shared.dataTask(with: url) { (data, response, error) in
        /// data, responseがnilならエラーを返す
        XCTAssertNotNil(data)
        XCTAssertNotNil(response)
        /// errorがnilでなければエラーを返す
        XCTAssertNil(error)

        /// アンラップして中身を取り出す
        if let data = data {
            do {
                XCTAssertNoThrow(try JSON(data: data))
                let json = try JSON(data: data)
                /// 中身を表示
                print(json)
            } catch {
            }
        }
        /// 終了を伝えるおまじない
        expectation.fulfill()
    }.resume()
    /// expectationの内容が終わる(fulfill()が呼ばれる)のを最大10秒間待つ
    wait(for: [expectation], timeout: 10.0)
}
```

大雑把にこういうような内容になっている。公式ドキュメントが古く、そのまま書いただけでは全く動作しないのが困る。

### Mock の定義

```swift
/// Mockの定義(内容については後述)
let mock = Mock(url: url, dataType: .json, statusCode: 200, data: [
    .get : try! JSON(response).rawData() // Data containing the JSON response
])
```

さて、ここの定義の意味なのだがちゃんと検証したわけではないのでいろいろ疑問は残るのだが、

「url で指定された URL に対してアクセスしたときに、dataType で指定される Content-Type、statusCode で指定されるステータスコードでデータを返す」ということを定義するようだ。

また、そのときに GET と POST といったようにメソッドによって返す値を切り替えることもできる。

値は Data 型でないといけないので、`Dictionary->JSON->Data`という変換を経て値を返すようにしている。

::: tip 返り値について

よく考えたらわざわざ`JSON`を経由する必要はないかもしれない。

:::
