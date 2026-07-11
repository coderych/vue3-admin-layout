# 组件概览

`vue3-admin-layout` 提供以下组件：

## 组件列表

| 组件          | 说明                                             |
| ------------- | ------------------------------------------------ |
| `AdminLayout` | 主布局组件，支持三种布局模式、响应式、暗黑主题等 |
| `Scrollbar`   | 自定义滚动条组件，基于 `simplebar-vue`           |
| `Hamburger`   | 折叠/展开按钮组件                                |

## 组件关系

```
AdminLayout
├── Header          # 头部（内部组件）
│   ├── Logo        # Logo 区域（内部组件）
│   └── Hamburger   # 折叠按钮
├── Sider           # 侧边栏（内部组件）
│   ├── Logo
│   └── Scrollbar
├── SiderDrawer     # 移动端抽屉（内部组件）
└── Content         # 内容区域（内部组件）
    └── Scrollbar
```

::: tip
`Header`、`Sider`、`SiderDrawer`、`Content`、`Logo` 是内部组件，通过 `AdminLayout` 的 props 和 slots 控制，不需要直接使用。
:::

## 快速导航

- [AdminLayout](/component/admin-layout) — 主布局组件，包含完整的 Props、Events、Slots 文档
- [Scrollbar](/component/scrollbar) — 自定义滚动条
- [Hamburger](/component/hamburger) — 折叠/展开按钮
