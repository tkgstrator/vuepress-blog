---
title: SwiftUIでModalWindowをカスタマイズする話
date: 2021-08-13
description: SwiftUIのモーダルは二種類しかないのですが、変更することはできるかどうかを解説
category: プログラミング
tags:
  - SwiftUI
  - Swift
---

# ModalWindow

ModalWindow とは通称モーダルと言われ、メインのウィンドウとは別に画面にホバーしてくるウィンドウのこと。

どういうものなのかは見ていただいたほうが早いので GIF 動画を載せておきます。

## SwiftUI での二つの実装方法

SwiftUI のデフォルトでは`sheet`と`fullScreenCover`が使えます。このうち、`fullScreenCover`は iOS14 以降でないと使えないのでそれだけ気をつけてください。

### Sheet

```swift
struct ContentView: View {
    @State var isPresented: Bool = false

    var body: some View {
        Button(action: { isPresented.toggle() }, label: { Text("Open") })
            .sheet(isPresented: $isPresented) {
                Text("Hello, World")
            }
    }
}
```

### FullScreenCover

```swift
struct ContentView: View {
    @State var isPresented: Bool = false

    var body: some View {
        Button(action: { isPresented.toggle() }, label: { Text("Open") })
            .fullScreenCover(isPresented: $isPresented) {
                Text("Hello, World")
            }
    }
}
```

## Modal 表示時のアニメーション

ModalWindow のアニメーションには次の 4 つがあります。

|                |    見た目    | SwiftUI | UIKit |
| :------------: | :----------: | :-----: | :---: |
| CoverVertical  |  下から表示  |   OK    |  OK   |
| CrossDissolve  | フェードイン |    -    |  OK   |
| FlipHorizontal |   フリップ   |    -    |  OK   |
|  PartialCurl   | ページめくり |    -    |  OK   |

このうち、SwiftUI でデフォルト実装されているのは`CoverVertical`だけで、それ以外は利用できません。

### CoverVertical

### CrossDissolve

### FlipHorizontal

### PartialCurl

元のビューが FullScreen で表示されていないとクラッシュします。

## Modal 表示スタイル

### automatic

### none

クラッシュします。

### fullScreen

### pageSheet

### formSheet

### currentContext

### custom

### overFullScreen

### overCurerntContext

### popover

クラッシュします。
