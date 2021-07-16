import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-74bc627b","/about/","自己紹介",["/about/index.html","/about/index.md"]],
  ["v-c0f957a0","/documents/","ドキュメント",["/documents/index.html","/documents/index.md"]],
  ["v-54f6a4ca","/ipswitch/","IPSwitch のコード開発チュートリアル",["/ipswitch/index.html","/ipswitch/index.md"]],
  ["v-50e0d28d","/nintendoswitch/","",["/nintendoswitch/index.html","/nintendoswitch/index.md"]],
  ["v-73866439","/support/","サポート",["/support/index.html","/support/index.md"]],
  ["v-46ea2690","/rainmaker/","ガチホコカウントマップ",["/rainmaker/index.html","/rainmaker/index.md"]],
  ["v-d5b23eca","/_posts/2021/07/2playermode.html","スプラでマルチプレイ！？",["/_posts/2021/07/2playermode.md"]],
  ["v-4f2dfaab","/_posts/2021/07/gitbash.html","Gitコマンドをより便利に利用する",["/_posts/2021/07/gitbash.md"]],
  ["v-cb8be9fe","/_posts/2021/07/gitrename.html","よく使うGitコマンドまとめ",["/_posts/2021/07/gitrename.md"]],
  ["v-98567e64","/_posts/2021/07/properties.html","Swiftでのプロパティの種類について",["/_posts/2021/07/properties.md"]],
  ["v-542ecfbd","/_posts/2021/07/realmswift.html","RealmCocoaがまたアップデートしてるんだが",["/_posts/2021/07/realmswift.md"]],
  ["v-7c4525bb","/_posts/2021/07/swiftarray.html","Swiftでの配列に対する操作まとめ",["/_posts/2021/07/swiftarray.md"]],
  ["v-099f1e7e","/_posts/2021/07/xvim2.html","BigSur + XVim2",["/_posts/2021/07/xvim2.md"]],
  ["v-3706649a","/404.html","",[]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
