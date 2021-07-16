module.exports = {
  // title of website
  title: "えいむーと愉快な仲間たち",

  // description of website
  description: "えいむーの備忘録です",

  // language of website
  locales: {
    "/": {
      lang: "ja",
    },
  },

  // head information of website
  head: [
    // need favicon
    // ["link", { href: "/css/style.css", rel: "stylesheet" }],
    [
      "script",
      {
        "data-ad-client": "ca-pub-7107468397673752",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      },
    ],
    ["meta", { name: "og:title", content: "えいむーと愉快な仲間たち" }],
    ["meta", { name: "og:url", content: "https://tkgstrator.work" }],
    ["meta", { name: "og:type", content: "website" }],
    [
      "meta",
      {
        name: "og:description",
        content: "えいむーの備忘録です",
      },
    ],
    [
      "meta",
      {
        name: "og:image",
        content: "assets/29420801.png",
      },
    ],
  ],

  // markdown config
  markdown: {
    lineNumbers: true,
    linkfy: true,
    plugins: {
      "@centerforopenscience/markdown-it-video": {},
    },
    anchor: {
      permalink: false,
      permalinkSymbol: "",
    },
  },

  // theme to use
  theme: "meteorlxy", // OR shortcut: @vuepress/blog

  themeConfig: {
    // language of this theme
    // lang: require("./public/lang/ja-JP"),

    // personal information
    personalInfo: {
      nickname: "tkgling",

      description:
        "神保町に本が詰まったビルを所有している紙使いのお姉さんがいます",

      email: "nasawake.am@gmail.com",

      location: "Kyoto",

      avatar: "assets/29420801.png",

      sns: {
        // github account and link
        github: {
          account: "tkgstrator",
          link: "https://github.com/tkgstrator",
        },

        // twitter account and link
        twitter: {
          account: "tkgling",
          link: "https://twitter.com/tkgling",
        },

        // instagram account and link
        // instagram: {
        //   account: "",
        //   link: "",
        // },
      },
    },

    // header config
    header: {
      background: {
        // use random pattern
        url: "/assets/background_blue.png",
        useGeo: true,
      },

      // show title in the header or not
      showTitle: true,
    },

    // footer config
    footer: {
      // show "Powered by VuePress" or not
      poweredBy: false,

      // show the theme
      poweredByTheme: false,
    },

    // info card config
    infoCard: {
      // the background of the info card"s header
      headerBackground: {
        // use random pattern
        useGeo: true,
      },
    },

    // show the last updated time of posts
    lastUpdated: true,

    // enable smooth scrolling or not
    smoothScroll: true,

    // pagination config
    pagination: {
      perPage: 20,
    },

    // the content of navbar links
    nav: [
      { text: "投稿一覧", link: "/posts/", exact: false },
      { text: "自己紹介", link: "/about/", exact: false },
      { text: "ドキュメント", link: "/documents/", exact: false },
      { text: "サポート", link: "/support/", exact: false },
    ],
  },

  plugins: [
    [
      "@vssue/vuepress-plugin-vssue",
      {
        platform: "github-v4",
        owner: "tkgstrator",
        repo: "vuepress-blog-comment",
        clientId: "f7ca8cef9b8e0be50beb",
        clientSecret: "464942025b0f73b828e0ba9fdc683734cfd4d01f",
        autoCreateIssue: process.env.NODE_ENV !== "development",
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-111335437-2",
      },
    ],
    ["vuepress-plugin-mathjax"],
  ],
};
