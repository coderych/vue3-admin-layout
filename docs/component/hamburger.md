# Hamburger

折叠/展开按钮组件，用于切换侧边栏的折叠状态。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Hamburger } from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'

const collapsed = ref(false)
</script>

<template>
  <Hamburger v-model:value="collapsed" />
</template>
```

## 属性 Props

| 属性名  | 类型      | 默认值  | 说明                                       |
| ------- | --------- | ------- | ------------------------------------------ |
| `value` | `boolean` | `false` | 当前是否为折叠状态（支持 `v-model:value`） |

## 事件 Events

| 事件名         | 参数               | 说明           |
| -------------- | ------------------ | -------------- |
| `update:value` | `(value: boolean)` | 状态变化时触发 |

## 无障碍支持

- 使用 `role="button"` 和 `aria-expanded` 属性
- 支持键盘事件：`Enter` 和 `Space` 键触发切换

## 说明

- `Hamburger` 在 `AdminLayout` 内部自动使用，一般不需要直接引用。
- 图标使用 `@iconify/ant-design` 的 `menu-fold-outlined` 和 `menu-unfold-outlined`。
