---
title: SwiftUI の再レンダリングの仕組みを理解する
date: 2021-04-08
description: 親ビューから子ビューの再レンダリングをするための書き方について
category: Swift
---

# SwiftUI の再レンダリングの仕組みを理解する

## 求められている仕様

親ビューを以下のように定義する。

```swift
import SwiftUI

struct ContentView: View {

    @State var placeholders: [PlaceholderView] = Array(repeating: PlaceholderView(), count: 4)

    var body: some View {
        HStack {
            ForEach(placeholders) { placeholder in
                placeholder
                    .onTapGesture {
                        placeholder.animateState()
                    }
            }
        }
    }
}
```

親ビューは子ビュー(PlaceholderView)の配列を持っておき、タップされるとその子ビューが持つメソッドである animateState()が呼ばれるという仕組みである。

で、子ビューを以下のように定義する。

```swift
import SwiftUI

struct PlaceholderView: View, Identifiable {
    var id: String = UUID().uuidString

    @State var backgroundColor: Color = .clear
    @State var borderColor: Color = .blue

    var body: some View {
        Circle()
            .strokeBorder(borderColor)
            .background(backgroundColor)
            .frame(width: 16, height: 16, alignment: .center)
    }

    func animateState() {
        backgroundColor = .black
        borderColor = .red
    }
}
```

で、これを実行してみると確かに`Placeholder.animateState()`は呼び出されているのだが、`animateState()`内で backgroundColor の値を変えているのに Debug Area で内部データを見てみると変わっていない。

色々原因が思いつくのだが、その理由の一つは@State の値はそれ自身か子ビューからしか変更することができないという制約ため。この場合だと PlaceholderView の親ビューである ContentView から変更されようとしているので動かないというわけだ。

## 改善手法

親ビューから呼ばれても変わらないので、自身から呼び出すように変更する。

自身といっても`var body`から呼ばれる必要があるようだ。

```swift
import SwiftUI

struct ContentView: View {

    @State var placeholders: [PlaceholderView] = Array(repeating: PlaceholderView(), count: 4)

    var body: some View {
        HStack {
            ForEach(placeholders) { placeholder in
                placeholder
                // ここでの処理を削除
            }
        }
    }
}
```

まず、親ビューの処理を削除する。どうせ動かないのだから消しても問題はない。

```swift
import SwiftUI

struct PlaceholderView: View, Identifiable {
    var id: String = UUID().uuidString

    @State var backgroundColor: Color = .clear
    @State var borderColor: Color = .blue

    var body: some View {
        Circle()
            .strokeBorder(borderColor)
            .background(backgroundColor)
            .frame(width: 16, height: 16, alignment: .center)
            // ここに処理を追加
            .onTapGesture {
                animateState()
            }
    }

    func animateState() {
        backgroundColor = .black
        borderColor = .red
    }
}
```

次に子ビューに処理を追加する。要するに「親ビュー → 子ビュー → 処理」という流れのうち「親ビュー → 子ビュー」の段階で State を変更できないような仕組みになっていたのでこれを「子ビュー → 処理」という直接処理をするような仕組みに変更するのである。

すると理想通りの動作をした。

## 仕様を変更する

```swift
struct ContentView: View {

    @State var passcode: [Int?] = []

    var body: some View {
        VStack(spacing: 30) {
            HStack {
                ForEach(Range(0...3)) { _ in
                    PlaceholderView()
                }
            }
            Button(action: { addSign() }, label: { Text("COUNT") })
        }
    }

    func addSign() {
        passcode.append(nil)

        if passcode.count >= 4 {
            passcode.removeAll()
        }
    }
}

struct PlaceholderView: View {

    @State var backgroundColor: Color = .clear
    @State var borderColor: Color = .blue

    var body: some View {
        Circle()
            .strokeBorder(borderColor)
            .background(backgroundColor)
            .frame(width: 16, height: 16, alignment: .center)
    }
}
```

ContentView のボタンをタップすればカウントが増えていき、4 になったら 0 に戻るというシンプルなプログラムである。

が、これでは何回ボタンが入力されたかをテキストで表示しておりダサい。最大入力数が 4 だとわかっているのだから、入力された文字の数だけ PlaceholderView の見た目を変更してユーザが認識できるような UI の方が理にかなっているのである。

では、ボタンが押されたときに子ビューである PlaceholderView の見た目を更新するためにはどうすればいいだろうか。

### 結論から言うと

子ビューの見た目を親ビューからうまいこと変化させる仕組みは（多分）存在しません。

おとなしく Binding を使いましょう。
