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
    ["link", { href: "/css/style.css", rel: "stylesheet"}],
    ["meta", { name: "og:title", content: "えいむーと愉快な仲間たち" }],
    ["meta", { name: "og:url", content: "https://tkgling.netlify.app/" }],
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
        content: "https://avatars.githubusercontent.com/u/29420801?v=4",
      },
    ],
  ],

  // markdown config
  markdown: {
    lineNumbers: true,
    linkfy: true,
  },

  // theme to use
  theme: "meteorlxy", // OR shortcut: @vuepress/blog

  themeConfig: {
    // language of this theme
    lang: "ja-JP",

    // personal information
    personalInfo: {
      nickname: "tkgling",

      description:
        "神保町に本を詰まったビルを所有している紙使いのお姉さんがいます",

      email: "nasawake.am@gmail.com",

      location: "あそこ",

      avatar: "https://avatars.githubusercontent.com/u/29420801?v=4",

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
      perPage: 10,
    },

    // comment config(vssue)
    comments: {
      platform: "github",
      owner: "tkgstrator",
      repo: "vuepress-blog-comment",
      clientId: "f7ca8cef9b8e0be50beb",
      clientSecret: "464942025b0f73b828e0ba9fdc683734cfd4d01f",
      autoCreateIssue: process.env.NODE_ENV !== "development",
    },

    // the content of navbar links
    nav: [
      { text: "Home", link: "/", exact: true },
      { text: "Posts", link: "/posts/", exact: false },
    ],
  },

  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-111335437-2", // UA-00000000-0
      },
    ],
  ],
};
