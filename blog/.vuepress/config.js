module.exports = {
  title: "えいむーと愉快な仲間たち",
  description: "えいむーの技術メモ",
  theme: "@vuepress/theme-blog", // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions;
    },
    head: [
      [
        "link",
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap",
        },
      ],
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: "記事一覧",
        link: "/",
      },
      {
        text: "タグ",
        link: "/tag/",
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/ulivz",
        },
        {
          type: "twitter",
          link: "https://twitter.com/_ulivz",
        },
      ],
      copyright: [
        {
          text: "Privacy Policy",
          link: "https://policies.google.com/privacy?hl=en-US",
        },
        {
          text: "MIT Licensed | Copyright © 2018-present Vue.js",
          link: "",
        },
      ],
    },
  },
};
