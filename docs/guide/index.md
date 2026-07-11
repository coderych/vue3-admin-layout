# 快速上手

本节将帮助你快速上手 `vue3-admin-layout`。

## 基础用法

最简单的用法，只需要引入组件并传入菜单配置：

```vue
<script setup>
import { ref } from 'vue'
import AdminLayout from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const menuOptions = ref([
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
])
</script>

<template>
  <AdminLayout :menu-options="menuOptions" title="管理系统">
    <div>内容区域</div>
  </AdminLayout>
</template>
```

## 交互式 Demo

<ClientOnly>
  <DemoBasic />
</ClientOnly>

## 选择布局模式

组件支持三种布局模式：`side`（侧边栏）、`mix`（混合）、`top`（顶部导航）。

<ClientOnly>
  <DemoLayoutMode />
</ClientOnly>

## 下一步

- 了解完整的 [安装说明](./installation)
- 查看 [AdminLayout 组件 API](/component/admin-layout)
- 浏览 [布局示例](/examples/)
- 自定义 [主题样式](./theme)

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

- 确认 `@vueuse/core` 已正确安装（组件内置依赖）。
- 检查 HTML 根元素是否有 `dark` 类名（`useDark()` 默认行为）。
- 毛玻璃皮肤在暗黑模式下会自动禁用，这是预期行为。
