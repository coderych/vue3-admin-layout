# 混合布局

顶部显示一级菜单，侧边栏显示子菜单，适合菜单层级较深的管理后台。

## 效果预览

通过设置 `mode="mix"` 切换为混合模式：

<ClientOnly>
  <DemoLayoutMode />
</ClientOnly>

::: tip
在上方 Demo 中选择 `mix` 模式即可预览效果。
:::

## 拆分菜单 + 混合布局

混合模式同样支持拆分菜单：

```vue
<template>
  <AdminLayout
    mode="mix"
    :split-menu="true"
    :menu-options="menuOptions"
  >
    <template #sider-left-header>
      <img src="/logo-small.png" alt="Logo" class="h-8 w-8">
    </template>

    <router-view />
  </AdminLayout>
</template>
```

## 完整示例

```vue
<script setup>
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const menuOptions = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'lucide:layout-dashboard',
  },
  {
    key: 'users',
    label: '用户管理',
    icon: 'lucide:users',
    children: [
      { key: 'user-list', label: '用户列表' },
      { key: 'user-add', label: '添加用户' },
    ],
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'lucide:file-text',
    children: [
      { key: 'article', label: '文章管理' },
      { key: 'category', label: '分类管理' },
    ],
  },
]
</script>

<template>
  <AdminLayout
    mode="mix"
    :menu-options="menuOptions"
    title="管理系统"
  >
    <router-view />
  </AdminLayout>
</template>
```

## 说明

- `mix` 模式下，头部显示一级菜单，侧边栏显示当前一级菜单的子菜单。
- 适合一级菜单较多、子菜单层级较深的管理后台。
- 支持 `splitMenu` 进一步拆分侧边栏。
