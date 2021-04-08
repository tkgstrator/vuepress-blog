# NavigationViewの仕様

今回はわかりやすくするため、左側の画面をMaster、右側の画面をDetailと呼ぶことにします。

NavivationViewの理解として最も重要なのは次の点でしょう。

* NavigationLinkは親がNavigationViewを継承していないと効かない
* NavigationViewはContentViewに適用するべきである
  * NavigationView自体を入れ子にすると表示がおかしくなるのでしないこと
* NavigationLinkの遷移先は常にDetailに表示される
* Masterを切り替えることはできない
  * Master自体がフラグによって表示を変えるようにしないといけない
* iPadの場合
  * NavigationViewを入れ子にするとTOPがMasterとなり、二つ目以降はDetailになる
  * Landscapeモードではビューが分割される
    * 理想的な動作である
  * PortraitモードではTOPは必ず起動時に非表示になっている
    * これを変えることは推奨されていないようだ
    * 標準設定アプリはできているのに謎である
* iPhoneの場合
  * NavigationViewを入れ子にするとTOPがMasterとなり、二つ目以降は無視される

## MasterViewとDetailView

ソースコードが肥大化したときにわかりにくくなるので、MasterViewとDetailViewの二つを作成して見やすくします。

```swift
struct MasterView: View {
    var body: some View {
        NavigationLink(
            destination: Text("Detail"),
            label: {
                Text("Navigate")
            })
            .navigationTitle("Nav")
    }
}

struct DetailView: View {
    var body: some View {
        Text("Detail View")
    }
}
```

## 完成させたいUI

目標としてはiOSの標準の設定アプリのようなものですが、それを更に拡張したものとなります。

具体的にはiPadとiPhoneで表示方式を切り替えられるようにします。iPhoneの方は理想的な動作ができているので、iPadでちゃんと動作させられるようになればよいわけです。

* iPadでSplitViewを実現させる
* PortraitとLandscapeで同じUIにする
* 起動直にMasterが表示されている
  * ボタンでMasterは非表示にできる
* 起動直後にDetailが表示されている
  * Masterの表示と非表示でDetailの画面サイズは動的に変化する

# NavigationViewの理解を深める

## MasterViewだけNavigationViewに入れる

でははじめにNavigationViewにMasterViewを入れてみます

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            MasterView()
        }
    }
}
```

これはLandscapeモードでは問題ありませんが、Portraitモードのときに次の問題が発生します
* 起動直後にMasterViewが表示されない
* 起動直後にDetailViewが表示されない
* MasterViewの表示/非表示でDetailViewのサイズが変わらない
  * 常にフルスクリーンのような状態になっている

## MasterとDetailのどちらもNavigationViewに入れる

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            MasterView()
            DetailView()
        }
    }
}
```

NavigationLinkを入れ子にするとTOPであるMasterViewがMasterとして表示され、DetailViewがDetailとして起動時に表示されるようになりました。

しかし、継続して次の問題が残ります。

* 起動直後にMasterViewが表示されない
* MasterViewの表示/非表示でDetailViewのサイズが変わらない
  * 常にフルスクリーンのような状態になっている

## NaviationViewStyleを設定する

SwiftUIにおいてNavigationViewには三つのスタイルが用意されています

* DefaultNavigationViewStyle
* DoubleColumnNavigationViewStyle
* StackNavigationViewStyle

このうち何もしなければDefaultNavigationViewStyleが適用されます。StackNavigationViewStyleはiPadでも常にiPhoneと同じUIになります。

DoubleColumnNavigationViewStyleに関しては[Apple公式のドキュメント](https://developer.apple.com/documentation/swiftui/navigationviewstyle)において`A navigation view style represented by a primary view stack that navigates to a detail view.`という説明があります。

これだけではよくわからないので実際に利用してみます。

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            MasterView()
            DetailView()
        }
        .navigationViewStyle(DoubleColumnNavigationViewStyle())
    }
}
```

が、結果として何も変わりませんでした。iPhoneでもiPadでも変わらなかったのでなんの効果があるのかわかりませんでした。

## navigationBarHidden

NavigationBarを非表示にできる`.navigationBarHidden()`という仕組みがあるのでそれを利用してみます。

```swift
```

`.navigationBarHidden()`を使うとNavigationの機能は残したまま、各種表示を非表示にできます。

## NavigationTitleの適用方法

iOS14からは`.navigationTitle()`が使えます。重要な点としてはこれはNavigationView内のViewに対して使わないと効かないということです。

```swift
```

なので例えば上のようなコードは全く効果がありません。これは`.navigationTitle()`がNavigationView自体にかかってしまっているからです。

```swift
```

## 一つ前の画面に戻る

ボタンを押すと何らかの処理を実行し、その進行状況を表示するビューに遷移するとします。

処理が終わったあと、もとの画面に戻りたいときにどうすればよいでしょうか。

```swift
struct ContentView: View {
    
    var body: some View {
        NavigationView {
            MasterView()
            DetailView()
        }
    }
}

struct ProgressView: View {

    var body: some View {
        NavigationLink(destination: MasterView()) { Text("Back to MasterView") }
            .navigationTitle("Progress View")
    }
}

struct MasterView: View {

    var body: some View {
        NavigationLink(
            destination: ProgressView(),
            label: {
                Text("Progress Start")
            })
            .navigationTitle("Master")
    }
}

struct DetailView: View {

    var body: some View {
        Text("Initial Detail View")
    }
}
```

例えば上のようなコードを書いたとします。これはNavigationLinkを動作させるたびにどんどんネストが深くなっていくため想定通りの動作をしません。

じゃあどうすればいいのかという話になりますが、presentationModeという標準Environmentを使うと驚くほどに実装できます。変更するのも戻る機能を実装したいViewだけなので楽です。

このpresentationModeは`isPresented`という「NavigationLinkから遷移してきたか」という情報を持っており、これを使って動作を切り替えることができます。

```swift
struct ProgressView: View {
    @Environment(\.presentationMode) var present
    
    var body: some View {       
        Button(action: {
            present.wrappedValue.dismiss()
        }, label: { Text("Back to MasterView") })
            .navigationTitle("Progress View")
    }
}
```

注意点としては`wrappedValue.dismiss()`は画面の表示を切り替える動作のためメインスレッドで実行する必要があります。`DispatchQueue.global`を使う際は`DispatchQueue.main.async`を使うなどして必ずメインスレッドで実行するようにコーディングしましょう。

# NavigationLinkの仕様

## タップして遷移したい場合

ボタンとしてタップしたら画面が遷移するような仕様を満たす使い方である。

たとえば、ボタンを押すとDetailViewに遷移したい場合は以下のようなコードで実装できる。

```swift
struct ProgressView: View {
    var body: some View {
        NavigationLink(destination: DetailView()) { Text("Go to DetailView") }
            .navigationTitle("Progress View")
    }
}
```

## コードから遷移したい場合

ではボタンを押さず、プログラムが何らかの処理をした結果で自動的に遷移したい場合はどうするか。

それには`isActive`というプロパティがあるのでこれが利用できる。

```swift
struct ProgressView: View {
    @State var isActive: Bool = false
    
    var body: some View {
        
        Button(action: { isActive.toggle() }, label: { Text("Go to DetailView") })
        NavigationLink(destination: DetailView(), isActive: $isActive) { Text("Go to DetailView") }
            .navigationTitle("Progress View")
    }
}
```

あらかじめ@Steteで変更をチェックするための変数を確保しておき、それをNavigationLinkのisActiveプロパティに渡すのである。この場合だと、NavigationLinkを直接押しても遷移するし、ButtonをタップしてもisActiveの値がフリップして初期状態のfalseからtrueに変わりNavigationLinkが動作する。

これの問題点とすれば遷移するためのNavigationLinkを（半分無意味に）書いておかなければいけない点だろう。「コードでもタップでも遷移したい」場合ならこれでよいが、コードでしか遷移したくない場合にタップしたら遷移できてしまうNavigationLinkを表示しっぱなしにしておくのは良くない

```swift
struct ProgressView: View {
    @State var isActive: Bool = false
    
    var body: some View {
        
        Button(action: { isActive.toggle() }, label: { Text("Go to DetailView") })
        NavigationLink(destination: DetailView(), isActive: $isActive) { Text("Go to DetailView") }
            .hidden()
            .navigationTitle("Progress View")
    }
}
```

のように`hidden()`属性をつければ非表示にはなるものの、これは見た目が消えているだけなのでこのViewのスペースが消費されていてレイアウトがズレてしまう。

ズレないようにするためにはNavigationLinkのViewとして`EmptyView()`を指定すればよい。

```swift
struct ProgressView: View {
    @State var isActive: Bool = false
    
    var body: some View {
        
            Button(action: { isActive.toggle() }, label: { Text("Go to DetailView") })
            NavigationLink(destination: DetailView(), isActive: $isActive) { EmptyView() }
                .navigationTitle("Progress View")
    }
}
```

これで基本的な場合についてはうまく動作させられるが、`List`ではたとえ`EmptyView()`であっても検知されて空っぽのカラムが作成されるという問題がある。`List`の場合はZStackで対応するのが良いだろう。


# 結局どうすべきなのか

ここまでの検証から以下のことがわかっている。

* iPadのPortraitとLandscapeの見た目をおなじにする仕組みは存在しない
  * Appleの方針は「NavigationViewはPortrait時には非表示にできるべき」ということらしい
  * しかし、実用上これがものすごく困るということはないように思える
* Masterは基本的に切り替えできない
  * Master内でSwitch文などで表示したい内容を切り替えないといけない
  * Appleの方針としてMasterの内容は常に固定しておいてほしいのかもしれない
* NavigationViewを入れ子構造にすることはできない
  * ContentViewまたはSwiftAppに対してNavigationViewを適用すべき
  * SwiftApp.swiftに対して適用するとEnvironmentObjectの問題が発生したりする
  * ContentViewが無難なところかもしれない 
* NavigationViewに二つ以上のViewを入れることができる
  * iPadの場合は一つ目がMaster、二つ目がDetailの（初期表示）になる
  * iPhoneまたはStackNavigationViewStyleのときは二つ目以降は無視される
  * 無視されるという仕様上、iPad向けでMasterViewを構成するだけで良い
* NavigationLinkを使うと常にDetailが更新される
  * 一つ前の画面に戻りたいときはpresentationModeを使うべきである

## どういう仕様にするか

登録制のアプリの場合、起動直後に表示したいのはアカウント作成やログインを促す画面である。

そして、このときにはSplitView的な機能はオフであってほしい。そうでないとログインする前から様々な機能にアクセスできることになってしまう。

* ログイン前はSplitViewはオフ
  * StackNavigationViewStyleを使えばできる
  * ログイン状態によってNavigationViewStyleを切り替える
* NavigationViewStyle
  * ログイン前はDetailViewのみ表示
  * ログイン後はMasterをMasterViewに表示

引数によってNavigationViewStyleを直接変えることが難しかったのでViewModifierを使って実装することにした。

これを使えばView簡単にNavigationViewStyleを変更することができる。そのままでも使いやすいのだがいちいち`.modifier()`を宣言するのが面倒だったのでextensionを使って更に便利にした。

```swift
struct NavigationModifier: ViewModifier {
    let style: Bool
    
    func body(content: Content) -> some View {
        switch style {
        case true:
            return AnyView(
                content
                .navigationViewStyle(StackNavigationViewStyle())
            )
        case false:
            return AnyView(
                content
                .navigationViewStyle(DoubleColumnNavigationViewStyle())
            )
        }
    }
}

extension View {
    func navigationStyle(style: Bool) -> some View {
        self.modifier(NavigationModifier(style: style))
    }
}
```

これを使うことで`navigationStyle(style: Bool)`でNavigationViewStyleを切り替えられる。

ただ、このままではStackNavigationViewStyleのときにMasterViewが表示されてしまう。

StackNavigationViewStyleの仕様を変えるのは面倒なので、フラグの状態によってMasterがMasterViewを表示するかDetailViewを表示するかを切り替えるのが得策かと思われる。

しかし、そうするなら最初からそうすればいいだけで、ViewModifierはつくらなくて良かったのではないかという気もしてくる。

## MasterVeiw

あまり想定はしていなかったのだが`presentationMode`でViewがMasterかどうかをチェックできるようだ。StackNavigationViewStyleの場合はNavigationViewの一つ目のViewの`presentationMode`がfalseになるためそこにログインのために必要なViewを表示するようにすれば良い。

```swift
struct MasterView: View {
    @Environment(\.presentationMode) var present
    
    var body: some View {
        switch present.wrappedValue.isPresented {
        case true:
            return AnyView(
                NavigationLink(
                    destination: ProgressView(),
                    label: {
                        Text("Progress Start")
                    })
                    .navigationTitle("Master")
            )
        case false:
            return AnyView(LoginView())
        }
    }
}

struct LoginView: View {

    var body: some View {
        Text("Login View")
            .navigationTitle("Login")
    }
}
```

このView切り替えの仕組みと先程のViewModifierを使えば仕様を満たすことができそうだ。

# TabViewとの組み合わせ

さて、Listにデータが多い場合目的の値を調べるのにずっと下の方までスクロールしなければならないような状況が考えられる。

10や20なら大した手間でないから気にならないだろうが、50や100となってくるとめんどくさく感じられるだろう。SwiftUIにはiOS14からリストの中のリストの機能であるSidebarListStyle()というものが使える。

タブからフィルタリングするのも良いが、まずはこの新機能を試してみたい。

## SidebarListStyle

listStyleとしてこれを設定すると、Sidebarとして使えるようになる。具体的にはリストをセクションごとに区切って閉じたり開いたりすることができるようになる。ただし、これには問題点があって、初期化の際にすべてのカラムが開けられた状態で表示されてしまう。

つまり、下の方まで見に行こうとしたら上から順番にリストを閉じていかなければならず、余計に手間がかかってしまう。今後のアップデートで改善されるかもしれないが、すぐに使えるような便利な機能ではなさそうだった。

## NavigationViewでSidebarを実装する

NavigationViewはiPadであれば三つまで入れることができるのだが、三つ目を入れると一つ目のViewをLandscapeでも固定することができなくなってしまう。

つまりApple公式サイトで紹介されている[このアプリ](https://developer.apple.com/design/human-interface-guidelines/ios/views/split-views/)のようなレイアウトをつくることができない。常にMasterを表示することができるオプションがあればいいのだが、少し調べた感じでは見つからなかった。

## Tabbar+NavigationView

Appleではあまり推奨されていないような書き方がされていたが、一応使える。

```swift
struct ContentView: View {
    @State var selection = 0
    
    var body: some View {
        NavigationView {
            List {
                NavigationLink(destination: EmptyView() { Text("EMPTY") }
                NavigationLink(destination: EmptyView() { Text("EMPTY") }
            }
            .navigationTitle("Menu")
            TabView(selection: $selection) {
                EmptyView()
                    .tabItem { Image(systemName: "flame") }.tag(0)
                EmptyView()
                    .tabItem { Image(systemName: "bolt") }.tag(1)
                EmptyView()
                    .tabItem { Image(systemName: "drop") }.tag(2)
            }
        }
    }
}
```

リストと組み合わせればこういうのも書ける。ただし、この場合だとDetailにTabViewが指定されているのでNavigationLinkを踏むなどして別画面に遷移するとDetailが切り替わるためTabViewが消えてしまうことに注意。

NavigationViewの方が上位（TabViewはあくまでもDetailに対してのみ有効）なので、メニューを表示するとタブの幅は自動的に狭くなる。

## PageTabViewStyle

```swift
```