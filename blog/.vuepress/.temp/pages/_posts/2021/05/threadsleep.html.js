export const data = {
  "key": "v-954b2d34",
  "path": "/_posts/2021/05/threadsleep.html",
  "title": "SwiftUIでスリープ機能を実装しよう",
  "lang": "en-US",
  "frontmatter": {
    "title": "SwiftUIでスリープ機能を実装しよう",
    "date": "2021-05-17T00:00:00.000Z",
    "description": "ある処理を行ったときに連続で処理することを防ぐためにスリープする方法を考えます",
    "category": "プログラミング",
    "tags": [
      "Swift"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "スリープ処理は難しい",
      "slug": "スリープ処理は難しい",
      "children": []
    },
    {
      "level": 2,
      "title": "スレッドを理解する",
      "slug": "スレッドを理解する",
      "children": [
        {
          "level": 3,
          "title": "userInteractive",
          "slug": "userinteractive",
          "children": []
        },
        {
          "level": 3,
          "title": "userInitiated",
          "slug": "userinitiated",
          "children": []
        },
        {
          "level": 3,
          "title": "default",
          "slug": "default",
          "children": []
        },
        {
          "level": 3,
          "title": "utility",
          "slug": "utility",
          "children": []
        },
        {
          "level": 3,
          "title": "background",
          "slug": "background",
          "children": []
        },
        {
          "level": 3,
          "title": "unspecified",
          "slug": "unspecified",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "さまざまなスリープ処理",
      "slug": "さまざまなスリープ処理",
      "children": [
        {
          "level": 3,
          "title": "sleep を使う",
          "slug": "sleep-を使う",
          "children": []
        },
        {
          "level": 3,
          "title": "Thread.sleep を使う",
          "slug": "thread-sleep-を使う",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Serial Queue で実行してみよう",
      "slug": "serial-queue-で実行してみよう",
      "children": [
        {
          "level": 3,
          "title": "Serial + Sync",
          "slug": "serial-sync",
          "children": []
        },
        {
          "level": 3,
          "title": "Serial + Async",
          "slug": "serial-async",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "別のスレッドを動かす",
      "slug": "別のスレッドを動かす",
      "children": [
        {
          "level": 3,
          "title": "Sync + Main.Sync",
          "slug": "sync-main-sync",
          "children": []
        },
        {
          "level": 3,
          "title": "Async + Main.Async",
          "slug": "async-main-async",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "AsyncAfter を使う",
      "slug": "asyncafter-を使う",
      "children": [
        {
          "level": 3,
          "title": "まとめ",
          "slug": "まとめ",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "_posts/2021/05/threadsleep.md",
  "git": {
    "updatedTime": 1625530623000,
    "contributors": [
      {
        "name": "skmtie",
        "email": "kaito.sakamoto.1015@gmail.com",
        "commits": 5
      },
      {
        "name": "tkgstrator",
        "email": "nasawake.am@gmail.com",
        "commits": 1
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
