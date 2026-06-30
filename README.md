# vue3-admin-layout

> v0.9.1 · 一个灵活的 Vue 3 管理后台布局组件

功能丰富的管理后台布局组件，支持侧边栏、顶部导航、混合模式三种布局，内置响应式设计、暗黑主题、毛玻璃皮肤、菜单导航、自定义滚动条等功能。

## 安装

```bash
npm install vue3-admin-layout
```

### 导入样式

```js
import 'vue3-admin-layout/dist/style.css'
```

### 使用方式

**按需导入组件：**

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'
</script>
```

**全局注册插件：**

```ts
import { createApp } from 'vue'
import AdminLayoutPlugin from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const app = createApp(App)
app.use(AdminLayoutPlugin) // 全局注册 AdminLayout、Scrollbar 组件
```

## 基础用法

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'
</script>

<template>
  <AdminLayout>
    <div>内容区域</div>
  </AdminLayout>
</template>
```

## 属性 Props

### 基础配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `mode` | `'side' \| 'mix' \| 'top'` | `'side'` | 布局模式 |
| `splitMenu` | `boolean` | `true` | 是否拆分菜单（仅在 `side`/`mix` 模式下有效） |
| `collapsed` | `boolean` | `false` | 侧边栏是否折叠 |
| `isMobile` | `boolean` | `false` | 是否移动端模式 |
| `isFull` | `boolean` | `false` | 是否全屏模式 |
| `scrollbarProps` | `ScrollbarProps` | `undefined` | 滚动条配置，详见 [ScrollbarProps](#scrollbarprops) |

### Logo 配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `logo` | `boolean` | `true` | 是否显示 Logo |
| `logoUrl` | `string` | `undefined` | Logo 图片 URL |
| `title` | `string` | `''` | 标题文字 |

### 菜单配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `menuOptions` | `MenuOption[]` | `[]` | 菜单配置数组 |
| `accordion` | `boolean` | `false` | 是否手风琴模式 |
| `activeKey` | `string` | `undefined` | 当前激活的菜单项 key |

### 头部配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `header` | `boolean` | `true` | 是否显示头部 |
| `headerHeight` | `number` | `48` | 头部高度（像素） |
| `headerTheme` | `string` | `'#fff'` | 头部主题颜色 |
| `headerFixed` | `boolean` | `true` | 头部是否固定 |

### 侧边栏配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `sider` | `boolean` | `true` | 是否显示侧边栏 |
| `siderWidth` | `number` | `200` | 侧边栏宽度（像素） |
| `siderCollapsedWidth` | `number` | `48` | 侧边栏折叠宽度（像素） |
| `siderTheme` | `string` | `'#fff'` | 侧边栏主题颜色 |
| `siderFixed` | `boolean` | `true` | 侧边栏是否固定 |
| `skin` | `string` | `undefined` | 毛玻璃皮肤背景图片 URL，设置后启用毛玻璃效果 |

### 内容区域配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `contentWidth` | `string \| number` | `'100%'` | 内容区域宽度（数字自动转为 `px`） |
| `contentHeader` | `boolean` | `true` | 是否显示内容头部（需配合 `content-header` 插槽） |
| `contentHeaderHeight` | `number` | `36` | 内容头部高度（像素） |
| `contentHeaderFixed` | `boolean` | `true` | 内容头部是否固定 |
| `contentFooter` | `boolean` | `true` | 是否显示内容底部（需配合 `content-footer` 插槽） |
| `contentFooterHeight` | `number` | `32` | 内容底部高度（像素） |
| `contentFooterFixed` | `boolean` | `false` | 内容底部是否固定 |

### 样式配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cssVars` | `Record<string, string>` | `{}` | 自定义 CSS 变量，可覆盖内置变量 |

## 事件 Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:collapsed` | `(value: boolean)` | 侧边栏折叠状态变化时触发 |
| `update:siderFixed` | `(value: boolean)` | 侧边栏固定状态变化时触发 |

## 插槽 Slots

### 主要插槽

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `AdminLayoutState` | 主要内容区域 |
| `logo` | `AdminLayoutLogoProps` | 自定义 Logo 区域 |
| `header` | `AdminLayoutHeaderProps` | 头部区域（完全覆盖默认头部） |
| `header-prefix` | `AdminLayoutHeaderProps` | 头部前缀区域（Logo 之后） |
| `header-suffix` | `AdminLayoutHeaderProps` | 头部后缀区域 |

### 侧边栏插槽

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `sider` | `AdminLayoutSiderProps` | 侧边栏主区域（完全覆盖） |
| `sider-header` | `AdminLayoutSiderProps` | 侧边栏头部 |
| `sider-content` | `AdminLayoutSiderProps` | 侧边栏内容（优先级大于内置菜单） |
| `sider-footer` | `AdminLayoutSiderProps` | 侧边栏底部 |
| `sider-left` | `AdminLayoutSiderProps` | 拆分菜单左侧区域（完全覆盖） |
| `sider-left-header` | `AdminLayoutSiderProps` | 拆分菜单左侧头部 |
| `sider-left-content` | `AdminLayoutSiderProps` | 拆分菜单左侧内容 |
| `sider-left-footer` | `AdminLayoutSiderProps` | 拆分菜单左侧底部 |
| `sider-right` | `AdminLayoutSiderProps` | 拆分菜单右侧区域（完全覆盖） |
| `sider-right-header` | `AdminLayoutSiderProps` | 拆分菜单右侧头部 |
| `sider-right-content` | `AdminLayoutSiderProps` | 拆分菜单右侧内容 |
| `sider-right-footer` | `AdminLayoutSiderProps` | 拆分菜单右侧底部 |

### 内容区域插槽

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `content-header` | `AdminLayoutContentProps` | 内容区域头部 |
| `content-footer` | `AdminLayoutContentProps` | 内容区域底部 |
| `content-overlay` | `AdminLayoutContentProps` | 内容区域遮罩层 |

### 菜单插槽

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `menu` | `AdminLayoutMenuProps` | 自定义主菜单（替换内置菜单） |
| `parent-menu` | `AdminLayoutMenuProps` | 自定义父级菜单（拆分模式下替换左侧菜单） |

## 类型定义

### MenuOption

```ts
interface MenuOption {
  key?: string
  label?: string
  icon?: Component | string  // Vue 组件或 iconify 图标字符串
  children?: MenuOption[]
  [key: string]: any
}
```

### ScrollbarProps

```ts
interface ScrollbarProps {
  autoHide?: boolean    // 是否自动隐藏滚动条，默认 true
  xScrollable?: boolean // 是否支持横向滚动，默认 false
  nativeScrollbar?: boolean // 是否使用原生滚动条，默认 false
  size?: number         // 滚动条宽度（像素），默认 5
  height?: string       // 容器高度
  inverted?: boolean    // 是否反转滚动条颜色（深色背景上使用浅色滚动条），默认 false
}
```

### AdminLayoutInstance

```ts
interface AdminLayoutInstance {
  state: AdminLayoutState // 组件内部状态，可通过 ref 访问
}
```

## 导出内容

```ts
// 组件
import AdminLayout, { Hamburger, Scrollbar } from 'vue3-admin-layout'

// 插件
import AdminLayoutPlugin from 'vue3-admin-layout'

// 类型
import type {
  AdminLayoutProps,
  AdminLayoutInstance,
  AdminLayoutHeaderProps,
  AdminLayoutSiderProps,
  AdminLayoutContentProps,
  AdminLayoutLogoProps,
  AdminLayoutMenuProps,
  MenuOption,
  MenuProps,
  LayoutType,
  CssVars,
} from 'vue3-admin-layout'

// 工具函数
import { calculateInverted, getParentsKeys } from 'vue3-admin-layout'
```

## CSS 变量

组件支持以下 CSS 变量，可通过 `cssVars` prop 或全局 CSS 覆盖：

```css
:root {
  /* 颜色 */
  --admin-layout-bg-color: rgb(240, 242, 245);       /* 页面背景色 */
  --admin-layout-base-color: rgb(255, 255, 255);      /* 组件基础底色 */
  --primary-color: #1890ff;                            /* 主题色 */
  --admin-layout-text-color: rgb(51, 54, 57);          /* 文字颜色 */
  --admin-layout-border-color: rgb(239, 239, 245);     /* 边框颜色 */

  /* 尺寸 */
  --admin-layout-header-height: 48px;
  --admin-layout-sider-width: 200px;
  --admin-layout-sider-collapsed-width: 48px;

  /* 过渡动画 */
  --admin-layout-transition-duration: 0.2s;
  --admin-layout-transition-bezier: cubic-bezier(0, 0, 0.2, 1);

  /* 毛玻璃皮肤 */
  --admin-layout-skin-blur: blur(20px);
  --admin-layout-skin-bg-light: rgba(255, 255, 255, 0.18);
}
```

暗黑模式下，颜色变量会自动切换为：

| 变量 | 亮色模式 | 暗黑模式 |
| --- | --- | --- |
| `--admin-layout-bg-color` | `rgb(240, 242, 245)` | `rgb(16, 16, 20)` |
| `--admin-layout-base-color` | `rgb(255, 255, 255)` | `rgb(24, 24, 28)` |
| `--primary-color` | `#1890ff` | `#409eff` |
| `--admin-layout-text-color` | `rgb(51, 54, 57)` | `rgba(255, 255, 255, 0.85)` |
| `--admin-layout-border-color` | `rgb(239, 239, 245)` | `rgba(255, 255, 255, 0.09)` |

## 暗黑主题

组件内部使用 `@vueuse/core` 的 `useDark()` 自动检测和切换暗黑主题，无需手动传入 prop。

```vue
<script setup>
import { useDark } from '@vueuse/core'

// 切换暗黑模式后，AdminLayout 会自动响应
const isDark = useDark()
</script>

<template>
  <button @click="isDark = !isDark">
    {{ isDark ? '☀️ 亮色' : '🌙 暗色' }}
  </button>

  <AdminLayout :menu-options="menuOptions">
    <div>内容</div>
  </AdminLayout>
</template>
```

## 毛玻璃皮肤

通过 `skin` prop 传入背景图片 URL，可实现毛玻璃效果：

```vue
<template>
  <AdminLayout
    :menu-options="menuOptions"
    skin="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
  >
    <div>毛玻璃皮肤效果</div>
  </AdminLayout>
</template>
```

可通过 CSS 变量自定义毛玻璃参数：

```vue
<AdminLayout
  :skin="bgUrl"
  :css-vars="{
    '--admin-layout-skin-blur': 'blur(30px)',
    '--admin-layout-skin-bg-light': 'rgba(255,255,255,0.25)',
  }"
>
```

## 移动端适配

组件提供 `isMobile` prop，移动端模式下侧边栏会以抽屉形式展示：

```vue
<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>

<template>
  <AdminLayout :is-mobile="isMobile" :menu-options="menuOptions">
    <div>内容</div>
  </AdminLayout>
</template>
```

## 组件实例

通过 `ref` 可以访问组件实例和内部状态：

```vue
<script setup>
import { ref } from 'vue'
import type { AdminLayoutInstance } from 'vue3-admin-layout'

const layoutRef = ref<AdminLayoutInstance>()

// 切换侧边栏折叠
function toggleSidebar() {
  const state = layoutRef.value?.state
  if (state) {
    state.toggleCollapsed(!state.collapsed)
  }
}

// 切换侧边栏固定
function toggleSiderFixed() {
  const state = layoutRef.value?.state
  if (state) {
    state.toggleSiderFixed(!state.siderFixed)
  }
}
</script>

<template>
  <AdminLayout ref="layoutRef" :menu-options="menuOptions">
    <button @click="toggleSidebar">折叠/展开</button>
    <button @click="toggleSiderFixed">固定/取消固定</button>
  </AdminLayout>
</template>
```

`state` 上可用的属性和方法：

| 属性/方法 | 类型 | 说明 |
| --- | --- | --- |
| `collapsed` | `boolean` | 当前折叠状态 |
| `siderFixed` | `boolean` | 侧边栏固定状态 |
| `isDark` | `boolean` | 是否暗黑模式 |
| `mode` | `string` | 当前布局模式 |
| `isMobile` | `boolean` | 是否移动端 |
| `toggleCollapsed(value)` | `(value: boolean) => void` | 切换折叠状态 |
| `toggleSiderFixed(value)` | `(value: boolean) => void` | 切换侧边栏固定 |

## 完整示例

### 侧边栏布局 + 拆分菜单

```vue
<script setup>
import { markRaw, ref } from 'vue'
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const menuOptions = ref([
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: markRaw(DashboardIcon),
  },
  {
    key: 'users',
    label: '用户管理',
    icon: markRaw(UserIcon),
    children: [
      { key: 'user-list', label: '用户列表' },
      { key: 'user-add', label: '添加用户' },
    ],
  },
])

const activeKey = ref('dashboard')
</script>

<template>
  <AdminLayout
    mode="side"
    :split-menu="true"
    :menu-options="menuOptions"
    :active-key="activeKey"
    title="后台管理系统"
    logo-url="/logo.png"
  >
    <template #content-header>
      <div>面包屑 / 页面标题</div>
    </template>

    <router-view />
  </AdminLayout>
</template>
```

### 顶部导航布局

```vue
<template>
  <AdminLayout
    mode="top"
    title="企业管理系统"
    :menu-options="menuOptions"
  >
    <router-view />
  </AdminLayout>
</template>
```

### 混合布局

```vue
<template>
  <AdminLayout
    mode="mix"
    :split-menu="true"
    :menu-options="menuOptions"
  >
    <template #sider-left-header>
      <img src="/logo-small.png" alt="Logo" class="w-8 h-8">
    </template>

    <router-view />
  </AdminLayout>
</template>
```

### 自定义头部

```vue
<template>
  <AdminLayout :menu-options="menuOptions">
    <template #header="{ state }">
      <div class="custom-header">
        <span>Logo</span>
        <div class="header-actions">
          <button>通知</button>
          <button>用户</button>
        </div>
      </div>
    </template>

    <router-view />
  </AdminLayout>
</template>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
}
</style>
```

## 注意事项

1. **样式导入**：使用时必须导入样式文件 `import 'vue3-admin-layout/dist/style.css'`。
2. **暗黑模式**：组件通过 `useDark()` 自动检测，配合 `@vueuse/core` 使用即可，无需额外配置。
3. **样式覆盖**：可通过 `cssVars` prop 或 CSS 变量覆盖组件默认样式。
4. **路由集成**：通过 `activeKey` 绑定当前路由路径，配合 Vue Router 实现菜单联动。
5. **拆分菜单**：`splitMenu` 仅在 `side` 和 `mix` 模式下生效，左侧显示一级菜单，右侧显示子菜单。
6. **毛玻璃皮肤**：`skin` 设置背景图后，侧边栏和头部自动应用毛玻璃效果。

## 故障排除

### 菜单不显示

- 检查 `menuOptions` 数据格式是否正确（需要 `key` 和 `label` 字段）。
- 确认 `menu` 插槽是否正确使用。
- 检查 `splitMenu` 和 `mode` 的兼容性。

### 样式异常

- 确认已正确导入 `vue3-admin-layout/dist/style.css`。
- 检查 CSS 变量是否被外部样式覆盖。
- 使用浏览器开发者工具检查 `--admin-layout-*` 变量值。

### 暗黑模式不生效

- 确认已安装 `@vueuse/core`（组件的 peer 依赖）。
- 检查 `useDark()` 是否正确调用。
