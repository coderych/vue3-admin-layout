# AdminLayout 组件使用文档

## 简介

AdminLayout 是一个功能丰富的 Vue 3 管理后台布局组件，支持多种布局模式（侧边栏、顶部导航、混合模式），内置响应式设计、暗黑主题、菜单导航等功能。

## 安装与导入

```javascript
import AdminLayout from 'vue3-admin-layout'
```

## 基础用法

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
</script>

<template>
  <AdminLayout>
    <!-- 主要内容 -->
    <div>内容区域</div>
  </AdminLayout>
</template>
```

## 属性 Props

### 基础配置

| 属性名      | 类型                      | 默认值   | 说明                                     |
| ----------- | ------------------------- | -------- | ---------------------------------------- |
| `mode`      | `'side' \| 'mix' \|'top'` | `'side'` | 布局模式                                 |
| `splitMenu` | `boolean`                 | `true`   | 是否拆分菜单（仅在 side/mix 模式下有效） |
| `collapsed` | `boolean`                 | `false`  | 侧边栏是否折叠                           |
| `isMobile`  | `boolean`                 | `false`  | 是否移动端模式                           |
| `isFull`    | `boolean`                 | `false`  | 是否全屏模式                             |

### Logo 配置

| 属性名    | 类型      | 默认值      | 说明          |
| --------- | --------- | ----------- | ------------- |
| `logo`    | `boolean` | `true`      | 是否显示 Logo |
| `logoUrl` | `string`  | `undefined` | Logo 图片 URL |
| `title`   | `string`  | `''`        | 标题文字      |

### 菜单配置

| 属性名        | 类型           | 默认值      | 说明                 |
| ------------- | -------------- | ----------- | -------------------- |
| `menuOptions` | `MenuOption[]` | `[]`        | 菜单配置数组         |
| `accordion`   | `boolean`      | `false`     | 是否手风琴模式       |
| `activeKey`   | `string`       | `undefined` | 当前激活的菜单项 key |

### 头部配置

| 属性名         | 类型      | 默认值   | 说明             |
| -------------- | --------- | -------- | ---------------- |
| `header`       | `boolean` | `true`   | 是否显示头部     |
| `headerHeight` | `number`  | `48`     | 头部高度（像素） |
| `headerTheme`  | `string`  | `'#fff'` | 头部主题颜色     |
| `headerFixed`  | `boolean` | `true`   | 头部是否固定     |

### 侧边栏配置

| 属性名                | 类型      | 默认值   | 说明                   |
| --------------------- | --------- | -------- | ---------------------- |
| `sider`               | `boolean` | `true`   | 是否显示侧边栏         |
| `siderWidth`          | `number`  | `200`    | 侧边栏宽度（像素）     |
| `siderCollapsedWidth` | `number`  | `48`     | 侧边栏折叠宽度（像素） |
| `siderTheme`          | `string`  | `'#fff'` | 侧边栏主题颜色         |
| `siderFixed`          | `boolean` | `true`   | 侧边栏是否固定         |

### 内容区域配置

| 属性名                | 类型      | 默认值  | 说明                 |
| --------------------- | --------- | ------- | -------------------- |
| `contentHeader`       | `boolean` | `true`  | 是否显示内容头部     |
| `contentHeaderHeight` | `number`  | `36`    | 内容头部高度（像素） |
| `contentHeaderFixed`  | `boolean` | `true`  | 内容头部是否固定     |
| `contentFooter`       | `boolean` | `true`  | 是否显示内容底部     |
| `contentFooterHeight` | `number`  | `32`    | 内容底部高度（像素） |
| `contentFooterFixed`  | `boolean` | `false` | 内容底部是否固定     |

### 样式配置

| 属性名    | 类型     | 默认值 | 说明            |
| --------- | -------- | ------ | --------------- |
| `cssVars` | `Record` | `{}`   | 自定义 CSS 变量 |

## 事件 Events

| 事件名              | 参数               | 说明                     |
| ------------------- | ------------------ | ------------------------ |
| `update:collapsed`  | `(value: boolean)` | 侧边栏折叠状态变化时触发 |
| `update:siderFixed` | `(value: boolean)` | 侧边栏固定状态变化时触发 |

## 插槽 Slots

### 主要插槽

| 插槽名          | 参数                              | 说明                     |
| --------------- | --------------------------------- | ------------------------ |
| `default`       | `(state: AdminLayoutState)`       | 主要内容区域             |
| `logo`          | `(props: AdminLayoutLogoProps)`   | Logo 区域                |
| `header`        | `(props: AdminLayoutHeaderProps)` | 头部区域（覆盖默认头部） |
| `header-prefix` | `(props: AdminLayoutHeaderProps)` | 头部前缀区域             |
| `header-suffix` | `(props: AdminLayoutHeaderProps)` | 头部后缀区域             |

### 侧边栏插槽

| 插槽名               | 参数                             | 说明             |
| -------------------- | -------------------------------- | ---------------- |
| `sider`              | `(props: AdminLayoutSiderProps)` | 侧边栏主区域     |
| `sider-header`       | `(props: AdminLayoutSiderProps)` | 侧边栏头部       |
| `sider-footer`       | `(props: AdminLayoutSiderProps)` | 侧边栏底部       |
| `sider-left`         | `(props: AdminLayoutSiderProps)` | 拆分菜单左侧区域 |
| `sider-left-header`  | `(props: AdminLayoutSiderProps)` | 拆分菜单左侧头部 |
| `sider-left-footer`  | `(props: AdminLayoutSiderProps)` | 拆分菜单左侧底部 |
| `sider-right`        | `(props: AdminLayoutSiderProps)` | 拆分菜单右侧区域 |
| `sider-right-header` | `(props: AdminLayoutSiderProps)` | 拆分菜单右侧头部 |
| `sider-right-footer` | `(props: AdminLayoutSiderProps)` | 拆分菜单右侧底部 |

### 内容区域插槽

| 插槽名            | 参数                               | 说明           |
| ----------------- | ---------------------------------- | -------------- |
| `content-header`  | `(props: AdminLayoutContentProps)` | 内容区域头部   |
| `content-footer`  | `(props: AdminLayoutContentProps)` | 内容区域底部   |
| `content-overlay` | `(props: AdminLayoutContentProps)` | 内容区域遮罩层 |

### 菜单插槽

| 插槽名        | 参数                            | 说明                   |
| ------------- | ------------------------------- | ---------------------- |
| `menu`        | `(props: AdminLayoutMenuProps)` | 主菜单                 |
| `parent-menu` | `(props: AdminLayoutMenuProps)` | 父级菜单（拆分模式下） |

## 类型定义

### MenuOption 菜单选项

```typescript
interface MenuOption {
  key?: string
  label?: string
  icon?: Component // Vue 组件
  children?: MenuOption[]
  [key: string]: any
}
```

## 完整示例

### 基础侧边栏布局

```vue
<script setup>
import { markRaw, ref } from 'vue'
import AdminLayout from 'vue3-admin-layout'

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
    ]
  }
])

const activeKey = ref('dashboard')

function handleCollapsed(collapsed) {
  console.log('侧边栏折叠状态:', collapsed)
}
</script>

<template>
  <AdminLayout
    :menu-options="menuOptions"
    :active-key="activeKey"
    mode="side"
    title="后台管理系统"
    logo-url="/logo.png"
    @update:collapsed="handleCollapsed"
  >
    <template #content-header>
      <div>页面标题</div>
    </template>

    <div class="p-4">
      <!-- 页面内容 -->
      <router-view />
    </div>
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
    <div class="p-4">
      顶部导航布局内容
    </div>
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
      <div class="compact-logo">
        <img src="/logo-small.png" alt="Logo">
      </div>
    </template>

    <div class="p-4">
      混合布局内容
    </div>
  </AdminLayout>
</template>
```

### 自定义头部

```vue
<template>
  <AdminLayout :menu-options="menuOptions">
    <template #header="{ state }">
      <div class="custom-header">
        <Logo />
        <div class="header-actions">
          <button>通知</button>
          <button>用户</button>
        </div>
      </div>
    </template>

    <div class="p-4">
      自定义头部内容
    </div>
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

.header-actions {
  display: flex;
  gap: 10px;
}
</style>
```

## CSS 变量

组件支持以下 CSS 变量，可以通过 `cssVars` prop 或全局 CSS 覆盖：

```css
:root {
  /* 基础颜色 */
  --admin-layout-bg-color: rgb(240, 242, 245);
  --admin-layout-base-color: rgb(255, 255, 255);
  --admin-layout-text-color: rgb(51, 54, 57);
  --admin-layout-border-color: rgb(239, 239, 245);

  /* 尺寸 */
  --admin-layout-header-height: 48px;
  --admin-layout-sider-width: 200px;
  --admin-layout-sider-collapsed-width: 48px;

  /* 滚动条 */
  --admin-layout-scrollbar-size: 5px;
  --admin-layout-scrollbar-border-radius: 5px;
  --admin-layout-scrollbar-color: rgba(0, 0, 0, 0.25);
  --admin-layout-scrollbar-hover-color: rgba(0, 0, 0, 0.4);

  /* 过渡动画 */
  --admin-layout-transition-duration: 0.2s;
  --admin-layout-transition-bezier: cubic-bezier(0, 0, 0.2, 1);
}

```

## 暗黑主题

组件支持暗黑主题，基于 `useDark` 自动切换：

```vue
<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <!-- 当 useDark() 返回 true 时自动切换为暗黑主题 -->
  <AdminLayout :is-dark="isDark" :menu-options="menuOptions">
    <div>暗黑主题内容</div>
  </AdminLayout>
</template>
```

## 移动端适配

```vue
<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

function handleMobileCollapsed(collapsed) {
  console.log('移动端菜单状态:', collapsed)
}
</script>

<template>
  <AdminLayout :is-mobile="isMobile" :menu-options="menuOptions" @update:collapsed="handleMobileCollapsed">
    <div>移动端内容</div>
  </AdminLayout>
</template>
```

## 组件实例方法

通过 `ref` 可以访问组件实例：

```vue
<script setup>
import { ref } from 'vue'

const layoutRef = ref()

// 访问状态
console.log(layoutRef.value?.state)

// 切换侧边栏折叠
function toggleSidebar() {
  layoutRef.value?.state.toggleCollapsed(!layoutRef.value.state.collapsed)
}
</script>

<template>
  <AdminLayout ref="layoutRef">
    <div>内容</div>
  </AdminLayout>
</template>
```

## 注意事项

1. 菜单图标：需要将图标组件使用 `markRaw()` 包装。
2. 路由集成：可以与 Vue Router 结合使用，通过 `activeKey` 控制当前激活菜单。
3. 响应式：移动端适配建议使用 `useWindowSize` 等工具判断。
4. 性能：大型菜单数据建议使用虚拟滚动优化。
5. 样式覆盖：可以通过 `cssVars` 或深度选择器覆盖组件样式。

## 故障排除

### 菜单不显示

- 检查 `menuOptions` 数据格式是否正确。
- 确认 `menu` slot 是否正确使用。
- 检查 `splitMenu` 和 `mode` 的兼容性。

### 样式异常

- 检查 CSS 变量是否被覆盖。
- 确认组件库样式是否正确导入。
- 检查是否有样式冲突。

### 响应式问题

- 确认 `isMobile` prop 是否正确传递。
- 检查移动端断点设置。
