# 親ビューと小ビュー

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

要するにContentViewがPlaceholderViewを配列で保持していて、ContentViewに表示されているPlaceholderViewをタップするとanimateState()が呼び出されるという仕組み。

で、確かに`Placeholder.animateState()`は呼び出されているのだが、`animateState()`内でbackgroundColorの値を変えているのにDebug Areaで内部データを見てみると変わっていない。

色々原因が思いつくのだが、その理由の一つは@Stateの値はそれ自身か子ビューからしか変更することができないという制約ため。この場合だとPlaceholderViewの親ビューであるContentViewから変更されようとしているので動かないというわけだ。

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

## 改善手法

親ビューから呼ばれても変わらないので、自身から呼び出すように変更する。

自身といっても`var body`から呼ばれる必要があるようだ。

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
