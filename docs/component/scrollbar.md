# Scrollbar

自定义滚动条组件，基于 [simplebar-vue](https://github.com/Grsmto/simplebar) 封装，支持自定义样式和原生滚动条回退。

## 基础用法

```vue
<script setup>
import { Scrollbar } from 'vue3-admin-layout'
import 'vue3-admin-layout/dist/style.css'
</script>

<template>
  <Scrollbar height="200px">
    <div v-for="i in 50" :key="i">
      滚动内容行 {{ i }}
    </div>
  </Scrollbar>
</template>
```

## 属性 Props

| 属性名            | 类型      | 默认值      | 说明                               |
| ----------------- | --------- | ----------- | ---------------------------------- |
| `autoHide`        | `boolean` | `true`      | 是否自动隐藏滚动条                 |
| `xScrollable`     | `boolean` | `false`     | 是否支持横向滚动                   |
| `nativeScrollbar` | `boolean` | `false`     | 是否使用原生浏览器滚动条           |
| `size`            | `number`  | `5`         | 滚动条宽度（像素）                 |
| `height`          | `string`  | `undefined` | 容器高度（如 `'200px'`、`'50vh'`） |

## 事件 Events

| 事件名   | 参数    | 说明       |
| -------- | ------- | ---------- |
| `scroll` | `Event` | 滚动时触发 |

## 示例

### 自定义滚动条大小

```vue
<template>
  <Scrollbar :size="8" height="200px">
    <div v-for="i in 50" :key="i">
      滚动内容行 {{ i }}
    </div>
  </Scrollbar>
</template>
```

### 原生滚动条

```vue
<template>
  <Scrollbar native-scrollbar height="200px">
    <div v-for="i in 50" :key="i">
      使用原生滚动条
    </div>
  </Scrollbar>
</template>
```

### 横向滚动

```vue
<template>
  <Scrollbar x-scrollable height="100px">
    <div style="width: 2000px; white-space: nowrap;">
      这是一段很长的内容，需要横向滚动才能查看完整内容...
    </div>
  </Scrollbar>
</template>
```

## 说明

- `Scrollbar` 在 `AdminLayout` 内部自动使用，一般不需要直接引用。
- 当 `nativeScrollbar` 为 `true` 时，会回退为原生 `<div>` 容器，不加载 `simplebar-vue`。
- 可通过 CSS 变量 `--scrollbar-size` 控制滚动条大小。
