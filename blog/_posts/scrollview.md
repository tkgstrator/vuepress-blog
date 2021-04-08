ScrollViewReader

ScrollViewReaderはiOS14以降で使えるListやScrollViewで使える便利な機能である。

## 自動スクロール

以下のコードは一見すると要素数100のリストを自動生成し、Viewを表示すると同時に20番目にジャンプするコードだが正しく動作しない。

```swift
var body: some View {
    ScrollViewReader { value in
        List {
            ForEach(Range(0...100)) { idx in
                Text("\(idx)")
            }
        }
        .onAppear() {
            value.scrollTo(20, anchor: .top)
        }
    }
}
```

この場合だと`value.scrollTo(20, anchor: .top)`の20はHashableである必要があるのだが、Listのそれぞれの要素について適切なIDが割り当てられていないからだ。

```swift
var body: some View {
    ScrollViewReader { value in
        List {
            ForEach(Range(0...100)) { idx in
                Text("\(idx)")
                    .id(idx)
            }
        }
        .onAppear() {
            value.scrollTo(20, anchor: .top)
        }
    }
}
```

このように適切にIDを割り当てればView表示と同時にジャンプする。ただ、このままだといきなりジャンプするのでアニメーションを挟んでゆったりとした動作にしたい場合には`withAnimation`を使えば良い。

`withAnimation`のネスト内で変数の値を変化させたとき、その変数の変化でビューの再描画が行われたときにアニメーションを発生させることができるようになる。

```swift
var body: some View {
    ScrollViewReader { value in
        List {
            ForEach(Range(0...100)) { idx in
                Text("\(idx)")
                    .id(idx)
            }
        }
        .onAppear() {
            withAnimation {
                value.scrollTo(20, anchor: .top)
            }
        }
    }
}
```

よって、完成するコードは上のようになる。

# 横スクロールを実装する

## TabViewを使う

愚直な方法がTabViewを利用する方法である。

```swift
struct ContentView: View {
    var body: some View {
        TabView(selection: $selection) {
            ForEach(Range(0...1000)) { idx in
                Text("CONTENT")
                    .tag(idx)
            }
        }
        .tabViewStyle(PageTabViewStyle(indexDisplayMode: .always))
    }
}
```

ただし、TabViewはSwiftUI2.0からはタブの状態を保持するようになったためデータをたくさん描画するタブを無数に生成するとメモリを大量に消費する。

画面下部に表示されるIndexを押せば一応画面は遷移できるが小さくて押しにくいので微妙だったりする。これはScrollViewReaderを組み合わせ上手くできる。

## ScrollView + LazyHStackを使う
Lazyなので呼び出されるまで画面を描画せず、そのためメモリを消費しにくいという利点がある。

ただ、横幅指定をしてもちょうど中央に来たときに止めることができないので真面目に実装しようとするとゴリゴリのコーディングが必要になる。TabViewだけで100件くらいならなんとかなりそうなので、それ以上の表示を要求されるときだけで良いかもしれない。

次期バージョンでLazyHStackにstepみたいな機能がついてくれると嬉しい。