# 更新日志

## v1.0.6

`2026-07-14`

### 🐛 Bug 修复

- 修复拆分菜单右侧区域在皮肤激活且 `siderRightFixed` 为 `true` 时背景色不正确的问题，仅在未固定时应用透明背景

---

## v1.0.5

`2026-07-12`

### 🐛 Bug 修复

- 修复 `content-overlay` 使用 `position: fixed` 导致定位异常的问题，移至布局根层级并改为 `position: absolute`
- 修复 Scrollbar `nativeScrollbar` 默认逻辑无法被 `scrollbarProps.nativeScrollbar` 覆盖的问题

### 🔨 重构

- `content-overlay` 插槽从 Content 区域提升至 AdminLayout 根层级，避免 fixed 定位与滚动容器冲突
- 所有 Scrollbar 组件的 `nativeScrollbar` 计算逻辑统一为 `默认值 || scrollbarProps?.nativeScrollbar`，用户配置优先
- `.admin-layout-wrapper` 添加 `position: relative` 作为 overlay 定位上下文

---

## v1.0.4

`2026-07-11`

### 🐛 Bug 修复

- 修复毛玻璃皮肤激活时反色逻辑不正确的问题，新增 `isInverted()` 统一判断
- 修复 SiderDrawer 抽屉层级过低被遮挡的问题，z-index 提升至 1000/999
- 修复拆分菜单右侧区域在皮肤激活时背景色不透明的问题

### 🔨 重构

- `applySkinStyles()` 基色由 `#fff9` 改为 `transparent`，提升毛玻璃通透感
- Header / Sider / SiderDrawer 统一使用 `isInverted()` 替代 `calculateInverted()`
- 移除未使用的 `.admin-layout-sider--skin` CSS 类
- index.vue computed `style` 重命名为 `layoutStyle` 避免命名遮蔽

---

## v1.0.3

`2026-07-11`

### ✨ 新功能

- 新增 `wrapperHeight` prop，支持自定义布局容器高度（默认 `'100vh'`），适用于嵌入非全屏场景

### 🔨 重构

- SiderDrawer 定位由 `position: fixed` 改为 `position: absolute`，配合 `wrapperHeight` 实现相对定位
- Sider 折叠按钮背景色简化，移除 `color-mix()` 计算
- Scrollbar 组件 `nativeScrollbar` 优先级调整为高于用户传入的 `scrollbarProps`

---

## v1.0.2

`2026-07-10`

### 🐛 Bug 修复

- 修复 `AppMain.vue` 和 `Header.vue` 在移除 CssVars 后的导入问题

### ✨ 新功能

- 新增无障碍支持：ARIA role、键盘事件、Escape 关闭抽屉
- 新增单元测试框架和 CI 工作流

### 🔨 重构

- 移除 `lodash-es` 依赖，使用原生解构替代
- 移除 `seemly` 依赖，使用本地 `parseColor()` 函数替代

---

## v1.0.1

`2026-07-10`

### 🐛 Bug 修复

- 修复 CssVars 移除后的导入路径问题

---

## v1.0.0

`2026-07-10`

### 🎉 首次发布

- 重构样式系统与 API 命名
- 支持 `side`、`mix`、`top` 三种布局模式
- 支持拆分菜单（`splitMenu`）
- 支持暗黑主题（内置 `useDark()`）
- 支持毛玻璃皮肤（`skin` prop）
- 支持移动端适配（`isMobile` prop）
- 支持自定义滚动条（`Scrollbar` 组件）
- 完整的 TypeScript 类型定义
- 20+ 个插槽，完全自定义每个区域
