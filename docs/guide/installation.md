# 安装说明

## 包管理器安装

::: code-group

```bash [pnpm]
pnpm add vue3-admin-layout
```

```bash [npm]
npm install vue3-admin-layout
```

```bash [yarn]
yarn add vue3-admin-layout
```

:::

## 导入样式

使用时必须导入样式文件：

```ts
import 'vue3-admin-layout/dist/style.css'
```

## 使用方式

### 按需导入组件（推荐）

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'
</script>

<template>
  <AdminLayout :menu-options="menuOptions">
    <div>内容区域</div>
  </AdminLayout>
</template>
```

### 全局注册插件

```ts
import { createApp } from 'vue'
import AdminLayoutPlugin from 'vue3-admin-layout'
import App from './App.vue'
import 'vue3-admin-layout/dist/style.css'

const app = createApp(App)
app.use(AdminLayoutPlugin) // 全局注册 AdminLayout、Scrollbar 组件
app.mount('#app')
```

## 导出内容

```ts
// 类型
import type {
  AdminLayoutContentProps,
  AdminLayoutHeaderProps,
  AdminLayoutInstance,
  AdminLayoutLogoProps,
  AdminLayoutMenuProps,
  AdminLayoutProps,
  AdminLayoutSiderProps,
  AdminLayoutState,
  LayoutType,
  MenuOption,
  MenuOptionLabel,
  MenuProps,
} from 'vue3-admin-layout'

// 组件
import AdminLayout, { Hamburger, Scrollbar } from 'vue3-admin-layout'

// 插件
import AdminLayoutPlugin from 'vue3-admin-layout'

// 工具函数
import { calculateInverted, getLabel, getParentsKeys } from 'vue3-admin-layout'

// CSS 变量常量
import { AdminLayoutCssVars } from 'vue3-admin-layout'
```

## 环境要求

- **Vue**: `^3.0.0`
- **Node**: `>=18`

## 依赖说明

| 依赖            | 说明                           |
| --------------- | ------------------------------ |
| `vue`           | Peer dependency，Vue 3 框架    |
| `@vueuse/core`  | 运行时依赖，用于暗黑模式检测等 |
| `simplebar-vue` | 运行时依赖，自定义滚动条       |
