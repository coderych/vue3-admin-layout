# 顶部导航布局

水平导航菜单在顶部，适合菜单项较少的管理后台。

## 效果预览

通过设置 `mode="top"` 切换为顶部导航模式：

<ClientOnly>
  <DemoLayoutMode />
</ClientOnly>

::: tip
在上方 Demo 中选择 `top` 模式即可预览效果。
:::

## 完整示例

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const menuOptions = [
  { key: 'dashboard', label: '仪表盘', icon: 'lucide:layout-dashboard' },
  { key: 'users', label: '用户管理', icon: 'lucide:users' },
  { key: 'settings', label: '系统设置', icon: 'lucide:settings' },
]
</script>

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

## 说明

- `top` 模式下不显示侧边栏，菜单以水平方向排列在头部。
- Logo 显示在头部左侧。
- 适合一级菜单数量较少（5-8 个）的管理后台。
