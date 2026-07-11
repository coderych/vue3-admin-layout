# vue3-admin-layout 全面优化方案

## 概述

本次优化涵盖 6 个方面：依赖清理、代码替换、A11y 增强、测试框架、CI/CD、工程化完善。

---

## Step 1: 依赖清理 (`package.json`)

**修改 `package.json`：**

- 移除 `dependencies` 中的 `lodash-es`、`seemly`
- 移除 `devDependencies` 中的 `@types/lodash-es`
- 将 `@iconify/json`、`@iconify/utils`、`unocss` 从 `dependencies` 移到 `devDependencies`（它们是构建时依赖，不应被消费者安装）
- 添加 `engines` 字段：`{ "node": ">=18" }`
- 添加 scripts：`"typecheck": "vue-tsc --noEmit"`, `"test": "vitest run"`, `"test:watch": "vitest"`

最终 dependencies 仅保留：`@vueuse/core`、`simplebar-vue`

---

## Step 2: 替换 lodash-es `omit`

**修改 `packages/AdminLayout/src/context.ts`：**

- 移除 `import { omit } from 'lodash-es'`
- 第 100 行 `omit(item, 'children')` 替换为原生解构：
  ```ts
  const { children: _, ...rest } = item
  return rest
  ```

---

## Step 3: 替换 seemly `rgba()`

**修改 `packages/AdminLayout/src/helper.ts`：**

- 移除 `import { rgba } from 'seemly'`
- 新增本地 `parseColor()` 函数，支持：
  - 十六进制：`#RGB`、`#RGBA`、`#RRGGBB`、`#RRGGBBAA`
  - `rgb(r, g, b)` 和 `rgba(r, g, b, a)` 格式
  - 返回 `[r, g, b]` 数组（0-255）
- `calculateInverted()` 中 `rgba(color)` 改为 `parseColor(color)`

---

## Step 4: A11y 增强

### 4.1 `Hamburger.vue`

- `<div>` 改为语义化：添加 `role="button"`、`tabindex="0"`
- 添加 `aria-label="Toggle menu"`、`:aria-expanded="!collapsed"`
- 添加 `@keydown.enter` 和 `@keydown.space` 键盘事件

### 4.2 `Sider.vue`

- 折叠按钮（第 190 行）：添加 `role="button"`、`tabindex="0"`、`aria-label`、键盘事件
- split-left 菜单项（第 206-219 行）：添加 `role="button"`、`tabindex="0"`、键盘事件
- 固定开关（第 245 行）：添加 `role="button"`、`tabindex="0"`、`aria-label`、键盘事件
- sider 容器：添加 `role="navigation"`、`aria-label="Sidebar"`

### 4.3 `SiderDrawer.vue`

- drawer 容器：添加 `role="dialog"`、`aria-modal="true"`、`aria-label="Navigation menu"`
- mask 遮罩：添加 `aria-hidden="true"`
- 添加 `@keydown.escape` 关闭支持

### 4.4 `Header.vue`

- parent-menu `<ul>`：添加 `role="menubar"`
- parent-menu `<li>`：添加 `role="menuitem"`、`tabindex="0"`、键盘事件

---

## Step 5: 测试框架

### 5.1 安装依赖

- 添加 `vitest` 和 `@vue/test-utils` 到 devDependencies
- 添加 `happy-dom` 到 devDependencies（测试环境）

### 5.2 配置文件

- 创建 `vitest.config.ts`（或在 `vite.config.ts` 中添加 test 配置）

### 5.3 单元测试

创建 `packages/__tests__/helper.test.ts`：

- `parseColor()`：测试 hex、rgb、rgba、transparent、无效输入
- `calculateInverted()`：测试深色/浅色背景返回值
- `getParentsKeys()`：测试单层、多层、空树
- `getLabel()`：测试字符串、函数、undefined
- `applyThemeStyles()`：测试 inverted/normal 模式
- `applySkinStyles()`：测试毛玻璃样式

---

## Step 6: GitHub Actions CI

创建 `.github/workflows/ci.yml`：

- 触发条件：push to main, PR to main
- Job: lint → typecheck → test → build
- Node 18/20 矩阵测试

---

## Step 7: CHANGELOG

创建 `CHANGELOG.md`，记录 v1.0.1 和本次优化变更。

---

## 文件变更清单

| 文件                                                  | 操作                                        |
| ----------------------------------------------------- | ------------------------------------------- |
| `package.json`                                        | 修改（依赖调整、scripts、engines）          |
| `packages/AdminLayout/src/context.ts`                 | 修改（移除 lodash import，替换 omit）       |
| `packages/AdminLayout/src/helper.ts`                  | 修改（移除 seemly import，新增 parseColor） |
| `packages/AdminLayout/src/components/Hamburger.vue`   | 修改（A11y）                                |
| `packages/AdminLayout/src/components/Sider.vue`       | 修改（A11y）                                |
| `packages/AdminLayout/src/components/SiderDrawer.vue` | 修改（A11y）                                |
| `packages/AdminLayout/src/components/Header.vue`      | 修改（A11y）                                |
| `vitest.config.ts`                                    | 新增                                        |
| `packages/__tests__/helper.test.ts`                   | 新增                                        |
| `.github/workflows/ci.yml`                            | 新增                                        |
| `CHANGELOG.md`                                        | 新增                                        |

## 验证步骤

1. `pnpm install` — 安装新依赖
2. `pnpm typecheck` — 类型检查通过
3. `pnpm test` — 所有测试通过
4. `pnpm lint:fix` — lint 无报错
5. `pnpm build` — 构建成功
