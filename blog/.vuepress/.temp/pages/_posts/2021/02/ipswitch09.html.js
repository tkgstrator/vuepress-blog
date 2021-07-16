export const data = {
  "key": "v-7cc55838",
  "path": "/_posts/2021/02/ipswitch09.html",
  "title": "[IPSwitch] 誰でもできるコード開発 #9",
  "lang": "en-US",
  "frontmatter": {
    "title": "[IPSwitch] 誰でもできるコード開発 #9",
    "date": "2021-02-14T00:00:00.000Z",
    "description": "インスタンスを利用するコードの移植方法について解説しています",
    "category": "Hack",
    "tags": [
      "IPSwitch",
      "コード開発"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "はじめに",
      "slug": "はじめに",
      "children": []
    },
    {
      "level": 2,
      "title": "インスタンスをコールするコード",
      "slug": "インスタンスをコールするコード",
      "children": []
    },
    {
      "level": 2,
      "title": "インスタンス参照コード",
      "slug": "インスタンス参照コード",
      "children": []
    },
    {
      "level": 2,
      "title": "インスタンスを探そう",
      "slug": "インスタンスを探そう",
      "children": [
        {
          "level": 3,
          "title": "Game::PlayerMgr::sInstance",
          "slug": "game-playermgr-sinstance",
          "children": []
        },
        {
          "level": 3,
          "title": "Game::Coop::PlayerDirector",
          "slug": "game-coop-playerdirector",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "イクラ個数変更コードを移植しよう",
      "slug": "イクラ個数変更コードを移植しよう",
      "children": [
        {
          "level": 3,
          "title": "イクラ個数変更コードテンプレート",
          "slug": "イクラ個数変更コードテンプレート",
          "children": []
        },
        {
          "level": 3,
          "title": "テンプレートを完成させよう",
          "slug": "テンプレートを完成させよう",
          "children": []
        },
        {
          "level": 3,
          "title": "動作テストをしてみる",
          "slug": "動作テストをしてみる",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "チーム変更コードを移植しよう",
      "slug": "チーム変更コードを移植しよう",
      "children": [
        {
          "level": 3,
          "title": "チーム変更コードテンプレート",
          "slug": "チーム変更コードテンプレート",
          "children": []
        },
        {
          "level": 3,
          "title": "Game::PlayerMgr::getControlledPerformer",
          "slug": "game-playermgr-getcontrolledperformer",
          "children": []
        },
        {
          "level": 3,
          "title": "Game::PlayerCloneHandle::sendSignalEvent",
          "slug": "game-playerclonehandle-sendsignalevent",
          "children": []
        },
        {
          "level": 3,
          "title": "テンプレートを完成させよう",
          "slug": "テンプレートを完成させよう-1",
          "children": []
        },
        {
          "level": 3,
          "title": "動作テストをしてみる",
          "slug": "動作テストをしてみる-1",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "_posts/2021/02/ipswitch09.md",
  "git": {
    "updatedTime": 1625804524000,
    "contributors": [
      {
        "name": "skmtie",
        "email": "kaito.sakamoto.1015@gmail.com",
        "commits": 8
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
