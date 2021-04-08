# OAuth認証のための手順

## VerifierとChallenge

S256という認証システムを使う場合、VerifierとChallengeの関係は以下のようになる。

`Challenge = BASE64URL-ENCODE(SHA256(ASCII(Verifier)))`

ここで注意しなければいけないのはASCIIからSHA256に変換する際に一度文字列を経由するとバグってしまうということだ。ここで詰まると無限に時間を消費するので気をつけてほしい。単なるSHA256ハッシュとS256アルゴリズムで使うハッシュ生成は全く異なるのだ。

```swift
import CryptoKit
import Fundation
```

暗号化ライブラリを使うのでCryptoKitを、Data型を扱うのでFundationをimportしておこう。

## ランダム文字列: Verifier
OAuthで認証するためにはVerifierとChallengeと呼ばれる二つのパラメータが必要になってくる。Verifierはある程度長い（64や128が推奨されているようだ）ランダム文字列であり、ChallengeはVerifierのSHA256のハッシュとなっている。

SHA256はSwiftの場合CryptoKitと呼ばれるiOS13から解禁された標準ライブラリが使える。iOS13未満の場合はCryptoSwiftやObjective-Cの機能であるCommonCryptoを使うことになるだろう。今回はCryptoKitを用いた場合のコーディングについて解説する。

```swift
extension String {
    static func randomString(_ length: Int = 128) -> String {
        let base: [String] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~".map({String($0)})
        var random: String = ""
        for _ in Range(1...length) {
            random += base.randomElement()!
        }
        return random
    }
}
```

上のコードはランダム文字列を生成するためExtensionである。Swift4.2以前はarc4randomといったC言語から引っ張ってきた関数を使う必要があったのだが、現在では標準乱数生成メソッドが使えるのでそれを利用する。

ポイントとしては予め使われる可能性のある文字を文字列にしておき、そこから一文字区切りの配列をつくるという点である。そしてその配列からランダムに128回値を選び、それらを結合するというわけである。単にmapを使うとString型ではなくCharacter型の配列になってしまうので型変換をする。

文字列から配列をつくるにあたって、[【swift】文字列を一文字ずつに分割する時のArray("hoge")の型について](https://qiita.com/rondine-jumpei/items/a298bf4e0612166e5dd5)のコードが大変参考になりました。

128回ループして結合するというコードはとりあえずFor文で書いたのだがとてもダサいのでなんとかしたい所存である。

気になる点としては暗号論的に安全な乱数になっているかというところであるが、まあ気にしなくても多分大丈夫だろう、多分。もしもrandomElement()に何らかの偏りがある場合、Verifierを推察される可能性があり、危険である。

## SHA256: Challenge
次にこのランダム文字列をSHA256に変換する。CryptoKitのSHA256でハッシュを求めるアルゴリズムは引数がData型でありString型ではないので、文字列をData型に変換する必要がある。

```swift
// OK
extension String {
    var sha256: SHA256.Digest {
        return SHA256.hash(data: Data(self.utf8))
    }
}
```

というわけで、String型のExtensionを拡張してそれ自身のSHA256ハッシュを返せるようにした。

```swift
// NG
extension String {
    var sha256: String {
        return SHA256.hash(data: Data(self.utf8)).compactMap{String(format: "%02x", $0)}.joined()
    }
}
```

ちなみに、上のようなコードを書くと文字列を経由してしまい失敗する。こちらは単にSHA256のハッシュが欲しい場合に使うと良い。

SHA256ハッシュ作成に関しては[PKCEのcode_challenge生成](https://rono23.com/posts/pkec-code-challenge/)のページが大変参考になりました。


## Base64Encode: Challenge
実はChallengeは単なるSHA256ハッシュではなく、そのハッシュをBase64エンコードしたものとなっている。なぜ二回ハッシュを計算するのかわからないが（しかもBase64は安全なハッシュとは言えない）、仕様書でそうなっているのでそうするしかない。

SHA256のハッシュから直接Base64を返したいので標準ライブラリを用いて以下のように実装した。PKCEではBase64の値のうち「=」、「+」、「/」の三つについては正しくエスケープしないといけない。

```swift
extension SHA256.Digest {
    var base64EncodedString: String {
        return Data(self).base64EncodedString()
            .replacingOccurrences(of: "=", with: "")
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
    }
}
```

なので非常に冗長になるが、base64EncodedString()を拡張してPKCE用のBase64文字列を返すようにした。

この状態で`E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM`をVerifierとして設定し、Challengeを計算すると正しく`E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM`を得ることができた。

