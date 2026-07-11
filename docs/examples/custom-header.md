# 自定义头部

通过插槽完全自定义头部区域的内容。

## 使用 header 插槽

`header` 插槽会完全覆盖默认头部：

```vue
<template>
  <AdminLayout :menu-options="menuOptions">
    <template #header="{ state }">
      <div class="custom-header">
        <span>Logo</span>
        <div class="header-actions">
          <button>通知</button>
          <button>用户</button>
        </div>
      </div>
    </template>

    <router-view />
  </AdminLayout>
</template>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
}
</style>
```

## 使用 header-suffix 插槽

在默认头部的右侧添加自定义内容：

```vue
<template>
  <AdminLayout :menu-options="menuOptions">
    <template #header-suffix="{ state }">
      <div class="header-actions">
        <button @click="toggleDark">
          🌙
        </button>
        <span>用户名</span>
      </div>
    </template>

    <router-view />
  </AdminLayout>
</template>
```

## 使用 header-prefix 插槽

在 Logo 之后添加自定义内容：

```vue
<template>
  <AdminLayout :menu-options="menuOptions">
    <template #header-prefix>
      <button>菜单</button>
    </template>

    <router-view />
  </AdminLayout>
</template>
```

## 内容区域头部

通过 `content-header` 插槽添加面包屑或页面标题：

```vue
<template>
  <AdminLayout :menu-options="menuOptions">
    <template #content-header>
      <div class="breadcrumb">
        首页 / 用户管理 / 用户列表
      </div>
    </template>

    <template #content-footer>
      <div class="footer-info">
        共 100 条记录
      </div>
    </template>

    <router-view />
  </AdminLayout>
</template>
```

## 插槽参数

头部相关插槽提供以下参数：

| 参数       | 类型               | 说明         |
| ---------- | ------------------ | ------------ |
| `state`    | `AdminLayoutState` | 组件内部状态 |
| `inverted` | `boolean`          | 主题是否反色 |
| `height`   | `number`           | 头部高度     |
| `fixed`    | `boolean`          | 是否固定     |
| `bordered` | `boolean`          | 是否有边框   |
| `theme`    | `string`           | 主题颜色     |
| `show`     | `boolean`          | 是否显示     |
