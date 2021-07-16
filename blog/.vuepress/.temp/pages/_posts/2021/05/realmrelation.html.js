export const data = {
  "key": "v-79f75328",
  "path": "/_posts/2021/05/realmrelation.html",
  "title": "Realmでレコードを削除するとクラッシュする問題",
  "lang": "en-US",
  "frontmatter": {
    "title": "Realmでレコードを削除するとクラッシュする問題",
    "date": "2021-05-24T00:00:00.000Z",
    "description": "Realmでレコードを削除するとアプリがクラッシュしてしまう場合があるのですが、今回は何故クラッシュするのか、対策と解決策について考えます",
    "category": "プログラミング",
    "tags": [
      "Swift",
      "Realm"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Realm がクラッシュする問題",
      "slug": "realm-がクラッシュする問題",
      "children": []
    },
    {
      "level": 2,
      "title": "Realm のリレーション",
      "slug": "realm-のリレーション",
      "children": []
    },
    {
      "level": 2,
      "title": "List を使って実装する",
      "slug": "list-を使って実装する",
      "children": []
    },
    {
      "level": 2,
      "title": "Linking Object",
      "slug": "linking-object",
      "children": []
    },
    {
      "level": 2,
      "title": "アプリクラッシュの条件",
      "slug": "アプリクラッシュの条件",
      "children": [
        {
          "level": 3,
          "title": "1. リアルタイム反映させている",
          "slug": "_1-リアルタイム反映させている",
          "children": []
        },
        {
          "level": 3,
          "title": "再レンダリングの不思議",
          "slug": "再レンダリングの不思議",
          "children": []
        },
        {
          "level": 3,
          "title": "リンクを張ってみる",
          "slug": "リンクを張ってみる",
          "children": []
        },
        {
          "level": 3,
          "title": "データ更新",
          "slug": "データ更新",
          "children": []
        },
        {
          "level": 3,
          "title": "2. プライマリキーを設定している",
          "slug": "_2-プライマリキーを設定している",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "結論",
      "slug": "結論",
      "children": [
        {
          "level": 3,
          "title": "NavigationView の場合",
          "slug": "navigationview-の場合",
          "children": []
        },
        {
          "level": 3,
          "title": "TabView の場合",
          "slug": "tabview-の場合",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "まとめ",
      "slug": "まとめ",
      "children": []
    }
  ],
  "filePathRelative": "_posts/2021/05/realmrelation.md",
  "git": {
    "updatedTime": 1625530623000,
    "contributors": [
      {
        "name": "skmtie",
        "email": "kaito.sakamoto.1015@gmail.com",
        "commits": 6
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
