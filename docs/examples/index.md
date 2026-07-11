# 示例概览

本节提供各种布局场景的完整示例代码。

## 布局示例

| 示例                          | 说明                                     |
| ----------------------------- | ---------------------------------------- |
| [侧边栏布局](./side-layout)   | 最常用的管理后台布局，侧边栏在左侧       |
| [顶部导航布局](./top-layout)  | 水平导航菜单在顶部，适合菜单项较少的场景 |
| [混合布局](./mix-layout)      | 顶部显示一级菜单，侧边栏显示子菜单       |
| [自定义头部](./custom-header) | 通过插槽完全自定义头部区域               |

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

## 滚动条配置

通过 `scrollbarProps` 可自定义滚动条行为：

<ClientOnly>
  <DemoScrollbar />
</ClientOnly>
