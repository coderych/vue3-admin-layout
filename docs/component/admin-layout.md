# AdminLayout

主布局组件，支持侧边栏、顶部导航、混合模式三种布局方式。

## 基础用法

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const menuOptions = [
  { key: 'home', label: '首页' },
  { key: 'about', label: '关于' },
]
</script>

<template>
  <AdminLayout :menu-options="menuOptions">
    <div>内容区域</div>
  </AdminLayout>
</template>
```

## 布局模式

通过 `mode` prop 切换三种布局模式：

<ClientOnly>
  <DemoLayoutMode />
</ClientOnly>

## 拆分菜单

通过 `splitMenu` prop 启用拆分菜单模式，左侧显示一级菜单图标，右侧显示子菜单：

<ClientOnly>
  <DemoSplitMenu />
</ClientOnly>

## 属性 Props

### 基础配置

| 属性名           | 类型                       | 默认值      | 说明                                               |
| ---------------- | -------------------------- | ----------- | -------------------------------------------------- |
| `mode`           | `'side' \| 'mix' \| 'top'` | `'side'`    | 布局模式                                           |
| `splitMenu`      | `boolean`                  | `false`     | 是否拆分菜单（仅在 `side`/`mix` 模式下有效）       |
| `siderCollapsed` | `boolean`                  | `false`     | 侧边栏是否折叠                                     |
| `isMobile`       | `boolean`                  | `false`     | 是否移动端模式                                     |
| `scrollbarProps` | `ScrollbarProps`           | `undefined` | 滚动条配置，详见 [ScrollbarProps](#scrollbarprops) |

### Logo 配置

| 属性名    | 类型      | 默认值      | 说明          |
| --------- | --------- | ----------- | ------------- |
| `logo`    | `boolean` | `true`      | 是否显示 Logo |
| `logoUrl` | `string`  | `undefined` | Logo 图片 URL |
| `title`   | `string`  | `''`        | 标题文字      |

### 菜单配置

| 属性名        | 类型           | 默认值      | 说明                                   |
| ------------- | -------------- | ----------- | -------------------------------------- |
| `menuOptions` | `MenuOption[]` | `[]`        | 菜单配置数组，`label` 支持字符串或函数 |
| `accordion`   | `boolean`      | `false`     | 是否手风琴模式                         |
| `activeKey`   | `string`       | `undefined` | 当前激活的菜单项 key                   |

### 头部配置

| 属性名           | 类型      | 默认值      | 说明                 |
| ---------------- | --------- | ----------- | -------------------- |
| `header`         | `boolean` | `true`      | 是否显示头部         |
| `headerHeight`   | `number`  | `48`        | 头部高度（像素）     |
| `headerTheme`    | `string`  | `undefined` | 头部主题颜色         |
| `headerFixed`    | `boolean` | `true`      | 头部是否固定         |
| `headerBordered` | `boolean` | `true`      | 头部是否显示底部边框 |

### 侧边栏配置

| 属性名                | 类型      | 默认值      | 说明                                                 |
| --------------------- | --------- | ----------- | ---------------------------------------------------- |
| `sider`               | `boolean` | `true`      | 是否显示侧边栏                                       |
| `siderWidth`          | `number`  | `200`       | 侧边栏宽度（像素）                                   |
| `siderCollapsedWidth` | `number`  | `48`        | 侧边栏折叠宽度（像素）                               |
| `siderTheme`          | `string`  | `undefined` | 侧边栏主题颜色                                       |
| `siderShowTrigger`    | `boolean` | `true`      | 是否显示折叠触发按钮                                 |
| `siderRightFixed`     | `boolean` | `true`      | 拆分菜单右侧是否固定（仅 `side` + `splitMenu` 模式） |
| `siderBordered`       | `boolean` | `true`      | 侧边栏是否显示右边框                                 |
| `skin`                | `string`  | `undefined` | 毛玻璃皮肤背景图片 URL，设置后启用毛玻璃效果         |

### 内容区域配置

| 属性名                  | 类型               | 默认值   | 说明                                             |
| ----------------------- | ------------------ | -------- | ------------------------------------------------ |
| `contentFull`           | `boolean`          | `false`  | 内容区域全屏模式                                 |
| `contentEmbedded`       | `boolean`          | `true`   | 是否启用嵌入式内容背景色                         |
| `contentWidth`          | `string \| number` | `'100%'` | 内容区域宽度（数字自动转为 `px`）                |
| `contentHeader`         | `boolean`          | `true`   | 是否显示内容头部（需配合 `content-header` 插槽） |
| `contentHeaderHeight`   | `number`           | `36`     | 内容头部高度（像素）                             |
| `contentHeaderFixed`    | `boolean`          | `true`   | 内容头部是否固定                                 |
| `contentHeaderBordered` | `boolean`          | `false`  | 内容头部是否显示底部边框                         |
| `contentFooter`         | `boolean`          | `true`   | 是否显示内容底部（需配合 `content-footer` 插槽） |
| `contentFooterHeight`   | `number`           | `32`     | 内容底部高度（像素）                             |
| `contentFooterFixed`    | `boolean`          | `false`  | 内容底部是否固定                                 |

## 事件 Events

| 事件名                   | 参数               | 说明                           |
| ------------------------ | ------------------ | ------------------------------ |
| `update:siderCollapsed`  | `(value: boolean)` | 侧边栏折叠状态变化时触发       |
| `update:siderRightFixed` | `(value: boolean)` | 拆分菜单右侧固定状态变化时触发 |

## 插槽 Slots

### 主要插槽

| 插槽名          | 参数                      | 说明                         |
| --------------- | ------------------------- | ---------------------------- |
| `default`       | `AdminLayoutContentProps` | 主要内容区域                 |
| `logo`          | `AdminLayoutLogoProps`    | 自定义 Logo 区域             |
| `header`        | `AdminLayoutHeaderProps`  | 头部区域（完全覆盖默认头部） |
| `header-prefix` | `AdminLayoutHeaderProps`  | 头部前缀区域（Logo 之后）    |
| `header-suffix` | `AdminLayoutHeaderProps`  | 头部后缀区域                 |

### 侧边栏插槽

| 插槽名                | 参数                    | 说明                             |
| --------------------- | ----------------------- | -------------------------------- |
| `sider`               | `AdminLayoutSiderProps` | 侧边栏主区域（完全覆盖）         |
| `sider-header`        | `AdminLayoutSiderProps` | 侧边栏头部                       |
| `sider-content`       | `AdminLayoutSiderProps` | 侧边栏内容（优先级大于内置菜单） |
| `sider-footer`        | `AdminLayoutSiderProps` | 侧边栏底部                       |
| `sider-left`          | `AdminLayoutSiderProps` | 拆分菜单左侧区域（完全覆盖）     |
| `sider-left-header`   | `AdminLayoutSiderProps` | 拆分菜单左侧头部                 |
| `sider-left-content`  | `AdminLayoutSiderProps` | 拆分菜单左侧内容                 |
| `sider-left-footer`   | `AdminLayoutSiderProps` | 拆分菜单左侧底部                 |
| `sider-right`         | `AdminLayoutSiderProps` | 拆分菜单右侧区域（完全覆盖）     |
| `sider-right-header`  | `AdminLayoutSiderProps` | 拆分菜单右侧头部                 |
| `sider-right-content` | `AdminLayoutSiderProps` | 拆分菜单右侧内容                 |
| `sider-right-footer`  | `AdminLayoutSiderProps` | 拆分菜单右侧底部                 |

### 内容区域插槽

| 插槽名            | 参数                      | 说明           |
| ----------------- | ------------------------- | -------------- |
| `content-header`  | `AdminLayoutContentProps` | 内容区域头部   |
| `content-footer`  | `AdminLayoutContentProps` | 内容区域底部   |
| `content-overlay` | `AdminLayoutContentProps` | 内容区域遮罩层 |

### 菜单插槽

| 插槽名        | 参数                   | 说明                                     |
| ------------- | ---------------------- | ---------------------------------------- |
| `menu`        | `AdminLayoutMenuProps` | 自定义主菜单（替换内置菜单）             |
| `parent-menu` | `AdminLayoutMenuProps` | 自定义父级菜单（拆分模式下替换左侧菜单） |

## 类型定义

### MenuOption

```ts
interface MenuOption {
  key?: string
  label?: string | ((option: MenuOption) => string)
  icon?: Component | string // Vue 组件或 iconify 图标字符串
  children?: MenuOption[]
  [key: string]: any
}
```

`label` 支持函数形式，可根据菜单项动态生成文本：

```ts
const menuOptions: MenuOption[] = [
  { key: 'home', label: '首页' },
  { key: 'user', label: opt => `用户: ${opt.key}` },
]
```

### ScrollbarProps

```ts
interface ScrollbarProps {
  autoHide?: boolean // 是否自动隐藏滚动条，默认 true
  xScrollable?: boolean // 是否支持横向滚动，默认 false
  nativeScrollbar?: boolean // 是否使用原生滚动条，默认 false
  size?: number // 滚动条宽度（像素），默认 5
  height?: string // 容器高度
}
```

### AdminLayoutInstance

```ts
interface AdminLayoutInstance {
  state: AdminLayoutState
  toggleContentFull: (value: boolean) => void
  toggleSiderRightFixed: (value?: boolean) => void
  toggleSiderCollapsed: (value?: boolean) => void
}
```

### AdminLayoutHeaderProps

```ts
interface AdminLayoutHeaderProps {
  state: AdminLayoutState
  inverted: boolean
  height: number
  _height: number
  fixed: boolean
  bordered: boolean
  theme: string
  show: boolean
}
```

### AdminLayoutSiderProps

```ts
interface AdminLayoutSiderProps {
  state: AdminLayoutState
  show: boolean
  fixed: boolean
  theme: string
  width: number
  _width: number
  collapsedWidth: number
  _collapsedWidth: number
  inverted: boolean
  headerHeight: number
  collapsed: boolean
  toggleCollapsed: (value: boolean) => void
  toggleRightFixed: (value: boolean) => void
}
```

### AdminLayoutContentProps

```ts
interface AdminLayoutContentProps {
  state: AdminLayoutState
  height: number
  width: number
  scrollHeight: string
  contentWidth: string
}
```

### AdminLayoutLogoProps

```ts
interface AdminLayoutLogoProps {
  state: AdminLayoutState
  width: number
  height: number
  inverted: boolean
  collapsed: boolean
}
```

### AdminLayoutMenuProps

```ts
interface AdminLayoutMenuProps extends MenuProps {
  state: AdminLayoutState
}

interface MenuProps {
  collapsed?: boolean
  options?: any[]
  mode?: 'vertical' | 'horizontal'
  accordion?: boolean
  collapsedWidth?: number
  inverted?: boolean
  value?: string
  [key: string]: any
}
```

## 组件实例

通过 `ref` 可以访问组件实例和内部状态：

<ClientOnly>
  <DemoInstance />
</ClientOnly>

```vue
<script setup>
import type { AdminLayoutInstance } from 'vue3-admin-layout'
import { ref } from 'vue'

const layoutRef = ref<AdminLayoutInstance>()

function toggleSidebar() {
  layoutRef.value?.toggleSiderCollapsed()
}

function toggleContentFull() {
  layoutRef.value?.toggleContentFull(true)
}

function toggleSiderRightFixed() {
  layoutRef.value?.toggleSiderRightFixed()
}
</script>

<template>
  <AdminLayout ref="layoutRef" :menu-options="menuOptions">
    <button @click="toggleSidebar">
      折叠/展开
    </button>
    <button @click="toggleContentFull">
      全屏
    </button>
    <button @click="toggleSiderRightFixed">
      固定/取消固定
    </button>
  </AdminLayout>
</template>
```

`state` 上可用的属性和方法：

| 属性/方法                       | 类型                        | 说明                 |
| ------------------------------- | --------------------------- | -------------------- |
| `siderCollapsed`                | `boolean`                   | 侧边栏折叠状态       |
| `siderRightFixed`               | `boolean`                   | 拆分菜单右侧固定状态 |
| `contentFull`                   | `boolean`                   | 内容全屏状态         |
| `isDark`                        | `boolean`                   | 是否暗黑模式         |
| `mode`                          | `string`                    | 当前布局模式         |
| `isMobile`                      | `boolean`                   | 是否移动端           |
| `headerHeight`                  | `number`                    | 头部高度             |
| `siderWidth`                    | `number`                    | 侧边栏宽度           |
| `toggleSiderCollapsed(value?)`  | `(value?: boolean) => void` | 切换侧边栏折叠       |
| `toggleSiderRightFixed(value?)` | `(value?: boolean) => void` | 切换拆分菜单右侧固定 |
| `toggleContentFull(value)`      | `(value: boolean) => void`  | 切换内容全屏         |

## 注意事项

1. **样式导入**：使用时必须导入样式文件 `import 'vue3-admin-layout/dist/style.css'`。
2. **暗黑模式**：组件通过内置的 `useDark()` 自动检测暗黑主题，配合 `@vueuse/core` 使用即可。
3. **路由集成**：通过 `activeKey` 绑定当前路由路径，配合 Vue Router 实现菜单联动。
4. **拆分菜单**：`splitMenu` 仅在 `side` 和 `mix` 模式下生效。
5. **毛玻璃皮肤**：`skin` 设置背景图后，侧边栏和头部自动应用毛玻璃效果；暗黑模式下自动禁用。
6. **边框控制**：`headerBordered`、`siderBordered`、`contentHeaderBordered` 可分别控制各区域的边框显示。
