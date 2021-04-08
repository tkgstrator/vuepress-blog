# Swift5 + Singleton

今回Singletonを学ぶにあたって[シングルトンをSwift5で実装する](https://qiita.com/satoru_pripara/items/725b66fd0dfb301cd80c)を参考にさせていただいた。

非常にわかりやすかったのでこの記事を読むよりもおすすめしたい。

## Singletonとはなにか

要するにたった一つしかないオブジェクトのこと。

アプリやライブラリのコア部分を司る機能を管理しているオブジェクトが常に同じ一つであってほしいという仕組み。そうでないと例えば二つのオブジェクトが同時にデータを書き換えたりしてしまうとデータの不整合が生じたりしていろいろとめんどくさいことになってしまう。

では「オブジェクトをたった一つしかつくられないためにどうしたらいいのか」というのがSingletonの考え方になるわけである。

## Singletonの実装

まずは継承を防ぐために`final`修飾子をつけ、値型の`struct`ではなく`class`を使うようにする。

`class`と`struct`の最も大きな違いの一つに、コピーができるかできないかというのがある。これはPythonやJavascriptでよくあることなのだが、例えばAの現在のデータをスワップしたりして同じクラスのBを作りたいとしよう。

このときシャローコピーをするとAのコピーをBとしてつくるとAとBが全く同一のオブジェクトになってしまう。これは鏡写しのようなもので、Aをスワップした時点でBの内容も変わってしまうのだ。

これを防ぐためにはディープコピーと呼ばれるコピーの仕方をおこなう必要がある。要するに、クラスの場合はコピーしたとしても実体ではなくメモリのポインタがコピーされるだけなのだ。

```swift
final public class AppManager {}
```

更に、外部から呼び出されないようにイニシャライザをプライベートにする。

```swift
private init {}
```

最後にオブジェクトをたった一つだけ生成するために、

```swift
public static let appManager = AppManager()
```

として`static`変数で宣言する。

## スレッドセーフにする

これについては現状、自分では利用する場面がないが覚えておいて損はないのでメモをしておく。

```swift
private let queue = DispatchQueue(label: "AppManager")
private let userDefaults = UserDefaults.standard

func setValue(_ value: Any, forKey key: String) { [weak self]
    queue.sync {
        userDefaults.setValue(value, forKey: key)
    }
}
```

ただ、全部の処理をシリアルキューにするとパフォーマンスが低下してしまうので読み込みは同時並行で実行するようにするなどの配慮があると良い。

## じゃあ結局どうするの

これは非常に簡単で、Singletonとしたいクラスは次のように書けば良い。

```swift
final public class AppManager() {
    public static let shared = AppManager()
    private let queue = DispatchQueue(label: "AppManager")
    private let value: Int = 100
    private init() {}

}
```

これを使いたいときは次のようにする。

```swift
AppManager.shared.value // -> 100
```

一度クラスを作ってしまえばそれをSingletonにすること自体は難しくないと言えるだろう。