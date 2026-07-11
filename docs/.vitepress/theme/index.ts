import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { AdminLayout, Hamburger, Scrollbar } from '../../../packages'
import DemoBasic from '../components/DemoBasic.vue'
import DemoDarkMode from '../components/DemoDarkMode.vue'
import DemoInstance from '../components/DemoInstance.vue'
import DemoLayoutMode from '../components/DemoLayoutMode.vue'
import DemoScrollbar from '../components/DemoScrollbar.vue'
import DemoSkin from '../components/DemoSkin.vue'
import DemoSplitMenu from '../components/DemoSplitMenu.vue'
import Layout from './Layout.vue'
import './style/var.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册组件库组件
    app.component('AdminLayout', AdminLayout)
    app.component('Scrollbar', Scrollbar)
    app.component('Hamburger', Hamburger)

    // 注册 Demo 组件
    app.component('DemoBasic', DemoBasic)
    app.component('DemoLayoutMode', DemoLayoutMode)
    app.component('DemoSplitMenu', DemoSplitMenu)
    app.component('DemoDarkMode', DemoDarkMode)
    app.component('DemoSkin', DemoSkin)
    app.component('DemoInstance', DemoInstance)
    app.component('DemoScrollbar', DemoScrollbar)
  },
} satisfies Theme
