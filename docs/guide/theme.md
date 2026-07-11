# 主题定制

## CSS 变量

组件支持以下 CSS 变量，可通过全局 CSS 覆盖：

```css
:root {
  /* 颜色 */
  --admin-layout-base-color: #fff;
  --admin-layout-embedded-color: #f1f3f6;
  --admin-layout-text-color: var(--text-color-light);
  --admin-layout-border-color: var(--border-color-light);
  --admin-layout-scrollbar-color: var(--scrollbar-color-light);
  --admin-layout-scrollbar-color-hover: var(--scrollbar-color-hover-light);

  /* 尺寸 */
  --admin-layout-header-height: 48px;
  --admin-layout-sider-width: 200px;
  --admin-layout-sider-collapsed-width: 48px;

  /* 过渡动画 */
  --admin-layout-duration: 0.3s;
  --admin-layout-bezier: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 亮色 / 暗黑模式变量对照

暗黑模式下，颜色变量会自动切换：

| 变量                                   | 亮色模式              | 暗黑模式                    |
| -------------------------------------- | --------------------- | --------------------------- |
| `--admin-layout-base-color`            | `#fff`                | `#18181c`                   |
| `--admin-layout-embedded-color`        | `#f1f3f6`             | `#101014`                   |
| `--admin-layout-text-color`            | `#000`                | `#fff`                      |
| `--admin-layout-border-color`          | `rgb(224, 224, 230)`  | `rgba(255, 255, 255, 0.24)` |
| `--admin-layout-scrollbar-color`       | `rgba(0, 0, 0, 0.25)` | `rgba(255, 255, 255, 0.25)` |
| `--admin-layout-scrollbar-color-hover` | `rgba(0, 0, 0, 0.4)`  | `rgba(255, 255, 255, 0.4)`  |

## 暗黑主题

组件内置 `@vueuse/core` 的 `useDark()` 自动检测和切换暗黑主题，无需手动传入 prop。

<ClientOnly>
  <DemoDarkMode />
</ClientOnly>

```vue
<script setup>
import { useDark } from '@vueuse/core'

// 切换暗黑模式后，AdminLayout 会自动响应
const isDark = useDark()
</script>

<template>
  <button @click="isDark = !isDark">
    {{ isDark ? '☀️ 亮色' : '🌙 暗色' }}
  </button>

  <AdminLayout :menu-options="menuOptions">
    <div>内容</div>
  </AdminLayout>
</template>
```

## 毛玻璃皮肤

通过 `skin` prop 传入背景图片 URL，可实现毛玻璃效果：

<ClientOnly>
  <DemoSkin />
</ClientOnly>

```vue
<template>
  <AdminLayout
    :menu-options="menuOptions"
    skin="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
  >
    <div>毛玻璃皮肤效果</div>
  </AdminLayout>
</template>
```

::: tip
暗黑模式下毛玻璃效果会自动禁用。
:::

## 主题色配置

通过 `headerTheme` 和 `siderTheme` prop 可分别设置头部和侧边栏的主题颜色：

```vue
<template>
  <AdminLayout
    :menu-options="menuOptions"
    header-theme="#3451b2"
    sider-theme="#001529"
  >
    <div>内容</div>
  </AdminLayout>
</template>
```
