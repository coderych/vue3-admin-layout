# Changelog

## [1.0.2] - 2026-07-10

### Changed

- **dependencies**: removed `lodash-es` and `seemly` from runtime dependencies
- **dependencies**: moved `@iconify/json`, `@iconify/utils`, `unocss` to devDependencies (build-time only)
- **dependencies**: added `vitest`, `@vue/test-utils`, `happy-dom`, `vue-tsc` to devDependencies
- **context.ts**: replaced `lodash-es/omit` with native destructuring
- **helper.ts**: replaced `seemly/rgba` with local `parseColor()` supporting hex and rgb/rgba formats

### Added

- **a11y**: Hamburger — `role="button"`, `tabindex`, `aria-label`, `aria-expanded`, keyboard support
- **a11y**: Sider — `role="navigation"`, collapse button keyboard support, menu item `role="button"`, pin switch keyboard support
- **a11y**: SiderDrawer — `role="dialog"`, `aria-modal`, `aria-hidden`, Escape key to close
- **a11y**: Header — `role="menubar"` / `role="menuitem"`, keyboard support for parent menu items
- **testing**: Vitest configuration with happy-dom environment
- **testing**: unit tests for `parseColor`, `calculateInverted`, `getParentsKeys`, `getLabel`, `applyThemeStyles`, `applySkinStyles`
- **ci**: GitHub Actions workflow (lint → typecheck → test → build, Node 18/20 matrix)
- **changelog**: this file

### Fixed

- **package.json**: added `engines` field (`node >= 18`)
- **package.json**: added `typecheck` and `test` scripts

## [1.0.1] - 2026-07-10

### Fixed

- fix(AdminLayout): fix AppMain.vue and Header.vue imports after CssVars removal

## [1.0.0] - 2026-07-10

### Changed

- refactor!: v1.0.0 重构样式系统与 API 命名
