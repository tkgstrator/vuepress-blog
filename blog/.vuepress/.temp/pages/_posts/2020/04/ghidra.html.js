export const data = {
  "key": "v-65035eb4",
  "path": "/_posts/2020/04/ghidra.html",
  "title": "[IPSwitch] Ghidraでのコード移植",
  "lang": "en-US",
  "frontmatter": {
    "title": "[IPSwitch] Ghidraでのコード移植",
    "date": "2020-04-20T00:00:00.000Z",
    "description": "NSAが公開した逆アセンブラツールであるGhidraを使ってIPSwitchのコードを別バージョンに移植するための手順や注意点について簡単に解説しています",
    "category": "Hack",
    "tags": [
      "IPSwitch"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Ghidra",
      "slug": "ghidra",
      "children": [
        {
          "level": 3,
          "title": "JDK",
          "slug": "jdk",
          "children": []
        },
        {
          "level": 3,
          "title": "メモリの変更",
          "slug": "メモリの変更",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Ghidra の使い方",
      "slug": "ghidra-の使い方",
      "children": [
        {
          "level": 3,
          "title": "Loader の導入",
          "slug": "loader-の導入",
          "children": []
        },
        {
          "level": 3,
          "title": "バイナリの分析",
          "slug": "バイナリの分析",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "コードの移植",
      "slug": "コードの移植",
      "children": [
        {
          "level": 3,
          "title": "バイト検索",
          "slug": "バイト検索",
          "children": []
        },
        {
          "level": 3,
          "title": "文字列検索",
          "slug": "文字列検索",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "オフセット",
      "slug": "オフセット",
      "children": []
    },
    {
      "level": 2,
      "title": "まとめ",
      "slug": "まとめ",
      "children": []
    }
  ],
  "filePathRelative": "_posts/2020/04/ghidra.md",
  "git": {
    "updatedTime": 1624414437000,
    "contributors": [
      {
        "name": "skmtie",
        "email": "kaito.sakamoto.1015@gmail.com",
        "commits": 3
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
