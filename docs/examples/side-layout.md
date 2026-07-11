# 侧边栏布局

最常用的管理后台布局方式，侧边栏在左侧，头部在右侧顶部。

## 基础示例

<ClientOnly>
  <DemoBasic />
</ClientOnly>

## 拆分菜单

当菜单层级较多时，可使用拆分菜单模式，左侧显示一级菜单图标，右侧显示子菜单：

<ClientOnly>
  <DemoSplitMenu />
</ClientOnly>

## 完整示例

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

## 折叠侧边栏

通过 `siderCollapsed` 控制侧边栏折叠状态：

```vue
<script setup>
import { ref } from 'vue'

const siderCollapsed = ref(false)
</script>

<template>
  <AdminLayout
    v-model:sider-collapsed="siderCollapsed"
    :menu-options="menuOptions"
  >
    <button @click="siderCollapsed = !siderCollapsed">
      折叠/展开
    </button>
  </AdminLayout>
</template>
```
