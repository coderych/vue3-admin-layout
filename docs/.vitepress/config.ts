import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

const packagesDir = fileURLToPath(new URL('../../packages', import.meta.url))

export default defineConfig({
  lang: 'zh-CN',
  title: 'vue3-admin-layout',
  description: '一个灵活的 Vue 3 管理后台布局组件',
  base: '/vue3-admin-layout/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  vite: {
    plugins: [
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@packages': packagesDir,
      },
    },
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'vue3-admin-layout',

    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '组件', link: '/component/', activeMatch: '/component/' },
      { text: '示例', link: '/examples/', activeMatch: '/examples/' },
      { text: '更新日志', link: '/changelog' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/guide/' },
            { text: '安装说明', link: '/guide/installation' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
      ],
      '/component/': [
        {
          text: '组件',
          items: [
            { text: '组件概览', link: '/component/' },
            { text: 'AdminLayout', link: '/component/admin-layout' },
            { text: 'Scrollbar', link: '/component/scrollbar' },
            { text: 'Hamburger', link: '/component/hamburger' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '布局示例',
          items: [
            { text: '示例概览', link: '/examples/' },
            { text: '侧边栏布局', link: '/examples/side-layout' },
            { text: '顶部导航布局', link: '/examples/top-layout' },
            { text: '混合布局', link: '/examples/mix-layout' },
            { text: '自定义头部', link: '/examples/custom-header' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/coderych/vue3-admin-layout' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 YCH',
    },

    editLink: {
      pattern: 'https://github.com/coderych/vue3-admin-layout/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    outline: {
      label: '页面导航',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  },
})
