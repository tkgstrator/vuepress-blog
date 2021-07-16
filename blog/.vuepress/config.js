module.exports = {
  title: 'Enhance',
  description: 'えいむーと愉快な仲間たちのオフィシャルページです',
    theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
    markdown: {
    anchor: { permalink: false }
  },
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: '記事',
        link: '/',
      },
      {
        text: 'タグ',
        link: '/tag/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/tkgstrator',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/tkgling',
        },
      ],
    //   copyright: [
    //     {
    //       text: 'Privacy Policy',
    //       link: 'https://policies.google.com/privacy?hl=en-US',
    //     },
    //     {
    //       text: 'MIT Licensed | Copyright © 2018-present Vue.js',
    //       link: '',
    //     },
    //   ],
    },
  },
}
