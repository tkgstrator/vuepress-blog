export const data = {
  "key": "v-2d244cde",
  "path": "/_posts/2021/05/netlifybuild.html",
  "title": "GitHub ActionsでNetlifyのビルド時間を浮かせよう",
  "lang": "en-US",
  "frontmatter": {
    "title": "GitHub ActionsでNetlifyのビルド時間を浮かせよう",
    "date": "2021-05-06T00:00:00.000Z",
    "description": "Netlifyは便利なのですが、ビルド時間が一ヶ月で300分しかないのが問題ですなので、それをGitHub Actionsで解決しましょう",
    "category": "プログラミング"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Netlify の最大の問題点",
      "slug": "netlify-の最大の問題点",
      "children": []
    },
    {
      "level": 2,
      "title": "GitHub Actions を使う",
      "slug": "github-actions-を使う",
      "children": []
    },
    {
      "level": 2,
      "title": "実装してみる",
      "slug": "実装してみる",
      "children": []
    }
  ],
  "filePathRelative": "_posts/2021/05/netlifybuild.md",
  "git": {
    "updatedTime": 1623720947000,
    "contributors": [
      {
        "name": "skmtie",
        "email": "kaito.sakamoto.1015@gmail.com",
        "commits": 3
      },
      {
        "name": "tkgstrator",
        "email": "nasawake.am@gmail.com",
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
