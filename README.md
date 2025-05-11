# AdminLayout 组件

基于Vue3构建的后台管理系统布局组件，提供灵活的布局配置和主题定制能力。

## 功能特性

- 支持侧边栏折叠/展开
- 响应式布局（桌面/移动端适配）
- 多布局（侧边栏/混合/顶栏布局）
- 多主题切换（亮色/暗色）
- 自定义CSS变量支持
- 可固定头部/侧边栏
- 丰富的插槽配置

## 安装

```bash
npm install vue3-admin-layout
```

## 使用示例

> 注：为了兼容不同ui框架，菜单需要自定义渲染。

### 基础使用

```vue
<script setup>
import logoUrl from '@/assets/logo.svg'
import { DashboardOutlined, SettingOutlined } from '@vicons/antd'
import { useDark } from '@vueuse/core'
import { ref } from 'vue'
import { AdminLayout, Scrollbar } from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

// 布局配置
const collapsed = ref(false)
const siderFixed = ref(true)
const mode = ref('side')
const splitMenu = ref(true)
const title = ref('管理系统')
const isDark = useDark()

// 菜单配置
const menuOptions = ref([
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: markRaw(DashboardOutlined),
    children: [
      { key: 'analysis', label: '分析页' },
      { key: 'monitor', label: '监控页' },
    ],
  },
  {
    key: 'system',
    label: '系统管理',
    icon: markRaw(SettingOutlined),
    children: [
      { key: 'user', label: '用户管理' },
      { key: 'role', label: '角色管理' },
    ],
  },
])
</script>

<template>
  <AdminLayout
    v-model:collapsed="collapsed"
    v-model:sider-fixed="siderFixed"
    :mode="mode"
    :split-menu="splitMenu"
    :menu-options="menuOptions"
    :logo-url="logoUrl"
    :title="title"
    :header-fixed="true"
  >
    <!-- 默认插槽：主内容区域 -->
    <div class="content-container">
      <router-view />
    </div>

    <!-- 头部区域 -->
    <template #header>
      <button @click="isDark = !isDark">
        {{ isDark ? '🌙' : '☀️' }}
      </button>
    </template>

    <!-- 侧边栏区域 -->
    <template #sider-right>
      <Scrollbar>
        <div class="h-10000px">
          Sider
        </div>
      </Scrollbar>
    </template>
  </AdminLayout>
</template>
```

### 自定义主题

通过`cssVars`属性可以自定义组件的主题样式：

```vue
<script setup>
import { computed, ref } from 'vue'
import { AdminLayout, CssVars } from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const isDark = ref(false)

// 自定义CSS变量
const cssVars = computed(() => ({
  [CssVars.PrimaryColor]: '#1890ff',
  [CssVars.BgColor]: isDark.value ? '#141414' : '#f0f2f5',
  [CssVars.BaseColor]: isDark.value ? '#1f1f1f' : '#ffffff',
  [CssVars.TextColor]: isDark.value ? '#ffffff' : '#333333',
  [CssVars.BorderColor]: isDark.value ? '#303030' : '#f0f0f0',
}))
</script>

<template>
  <AdminLayout
    :css-vars="cssVars"
  />
</template>
```

### 响应式布局

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { AdminLayout } from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const isMobile = ref(false)
const collapsed = ref(false)

function checkIsMobile() {
  isMobile.value = window.innerWidth < 768
  collapsed.value = isMobile.value
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>

<template>
  <AdminLayout
    v-model:collapsed="collapsed"
    :is-mobile="isMobile"
  >
    <div class="content-container">
      <div>响应式内容区域</div>
    </div>
  </AdminLayout>
</template>
```

## Props

### 基础配置

| 属性名      | 类型    | 默认值    | 说明                                   |
| ----------- | ------- | --------- | -------------------------------------- |
| mode        | String  | 'side'    | 布局模式，可选值：'side'（侧边栏模式） |
| splitMenu   | Boolean | true      | 是否启用分割菜单模式                   |
| collapsed   | Boolean | false     | 侧边栏是否折叠                         |
| isMobile    | Boolean | false     | 是否为移动设备                         |
| menuOptions | Array   | []        | 菜单配置项                             |
| logo        | Boolean | true      | 是否显示Logo                           |
| logoUrl     | String  | undefined | Logo图片URL                            |
| title       | String  | ''        | 系统标题                               |
| isFull      | Boolean | false     | 是否全屏模式                           |
| cssVars     | Object  | {}        | 自定义CSS变量                          |

### 头部配置

| 属性名       | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| header       | Boolean | true   | 是否显示头部     |
| headerHeight | Number  | 48     | 头部高度（像素） |
| headerTheme  | String  | '#fff' | 头部主题颜色     |
| headerFixed  | Boolean | false  | 是否固定头部     |

### 侧边栏配置

| 属性名              | 类型    | 默认值 | 说明                     |
| ------------------- | ------- | ------ | ------------------------ |
| sider               | Boolean | true   | 是否显示侧边栏           |
| siderWidth          | Number  | 200    | 侧边栏宽度（像素）       |
| siderCollapsedWidth | Number  | 48     | 侧边栏折叠时宽度（像素） |
| siderTheme          | String  | '#fff' | 侧边栏主题颜色           |
| siderFixed          | Boolean | true   | 是否固定侧边栏           |

### 前缀区域配置

| 属性名       | 类型    | 默认值 | 说明                 |
| ------------ | ------- | ------ | -------------------- |
| prefix       | Boolean | true   | 是否显示前缀区域     |
| prefixHeight | Number  | 36     | 前缀区域高度（像素） |
| prefixFixed  | Boolean | true   | 是否固定前缀区域     |

### 后缀区域配置

| 属性名       | 类型    | 默认值 | 说明                 |
| ------------ | ------- | ------ | -------------------- |
| suffix       | Boolean | true   | 是否显示后缀区域     |
| suffixHeight | Number  | 32     | 后缀区域高度（像素） |
| suffixFixed  | Boolean | false  | 是否固定后缀区域     |

### 菜单配置

| 属性名     | 类型     | 默认值    | 说明                |
| ---------- | -------- | --------- | ------------------- |
| accordion  | Boolean  | false     | 是否开启手风琴模式  |
| renderMenu | Function | undefined | 自定义菜单渲染函数  |
| activeKey  | String   | undefined | 当前激活的菜单项key |

## 插槽

组件提供了丰富的插槽，方便自定义各个区域的内容：

| 插槽名称      | 说明                 | 参数                              |
| ------------- | -------------------- | --------------------------------- |
| default       | 主内容区域           | AdminLayoutProps                  |
| header        | 头部区域             | AdminLayoutProps                  |
| sider         | 侧边栏区域           | AdminLayoutProps                  |
| sider-left    | 侧边栏左侧区域       | { open: Function, show: Boolean } |
| sider-right   | 侧边栏右侧区域       | AdminLayoutProps                  |
| prefix        | 内容区域上方前缀区域 | AdminLayoutProps                  |
| suffix        | 内容区域下方后缀区域 | AdminLayoutProps                  |
| header-prefix | 头部左侧区域         | AdminLayoutProps                  |
| header-suffix | 头部右侧区域         | AdminLayoutProps                  |

## 方法

组件提供了以下方法，可通过v-model或事件监听使用：

| 方法名            | 说明               | 参数类型 | 返回值 |
| ----------------- | ------------------ | -------- | ------ |
| update:collapsed  | 更新侧边栏折叠状态 | Boolean  | -      |
| update:siderFixed | 更新侧边栏固定状态 | Boolean  | -      |

## CSS变量

组件内部使用了以下CSS变量，可通过`cssVars`属性进行自定义：

| 变量名                                 | 说明               | 默认值                           |
| -------------------------------------- | ------------------ | -------------------------------- |
| --admin-layout-bg-color                | 背景颜色           | #f0f2f5（亮色）/ #101014（暗色） |
| --admin-layout-base-color              | 基础颜色           | #fff（亮色）/ #18181C（暗色）    |
| --primary-color                        | 主题色             | #1890ff（默认）                  |
| --admin-layout-sider-collapsed-width   | 侧边栏折叠宽度     | 根据props计算                    |
| --admin-layout-sider-width             | 侧边栏宽度         | 根据props计算                    |
| --admin-layout-header-height           | 头部高度           | 48px（默认）                     |
| --admin-layout-transition-duration     | 过渡动画持续时间   | 0.2s                             |
| --admin-layout-transition-bezier       | 过渡动画贝塞尔曲线 | cubic-bezier(0, 0, .2, 1)        |
| --admin-layout-text-color              | 文本颜色           | #333（亮色）/ #fff（暗色）       |
| --admin-layout-border-color            | 边框颜色           | #e0e0e6（亮色）/ #303030（暗色） |
| --admin-layout-scrollbar-color         | 滚动条颜色         | #e0e0e6（亮色）/ #303030（暗色） |
| --admin-layout-scrollbar-hover-color   | 滚动条悬停颜色     | #bfbfbf（亮色）/ #505050（暗色） |
| --admin-layout-scrollbar-size          | 滚动条宽度         | 5px                              |
| --admin-layout-scrollbar-border-radius | 滚动条圆角         | 5px                              |

## 兼容性

- 支持 Vue 3.x 版本，不兼容 Vue 2.x。
- 推荐使用现代浏览器，兼容性如下：
  - Chrome ≥ 87
  - Edge ≥ 88
  - Firefox ≥ 78
  - Safari ≥ 13
- 移动端主流浏览器均有良好支持。
- 依赖 CSS 变量、Flex 布局等现代特性，IE 浏览器不支持。
