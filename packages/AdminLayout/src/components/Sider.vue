<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutLogoProps, AdminLayoutMenuProps, AdminLayoutSiderProps } from '../typing'
import { computed, proxyRefs } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { applySkinStyles, calculateInverted, getLabel } from '../helper'
import { AdminLayoutCssVars } from '../typing'
import Hamburger from './Hamburger.vue'
import Logo from './Logo.vue'

defineSlots<{
  default: (props: AdminLayoutSiderProps) => void
  header: (props: AdminLayoutSiderProps) => void
  content: (props: AdminLayoutSiderProps) => void
  footer: (props: AdminLayoutSiderProps) => void
  left: (props: AdminLayoutSiderProps) => void
  leftHeader: (props: AdminLayoutSiderProps) => void
  leftContent: (props: AdminLayoutSiderProps) => void
  leftFooter: (props: AdminLayoutSiderProps) => void
  right: (props: AdminLayoutSiderProps) => void
  rightHeader: (props: AdminLayoutSiderProps) => void
  rightContent: (props: AdminLayoutSiderProps) => void
  rightFooter: (props: AdminLayoutSiderProps) => void
  logo: (props: AdminLayoutLogoProps) => void
  menu: (props: AdminLayoutMenuProps) => void
  parentMenu: (props: AdminLayoutMenuProps) => void
}>()

const state = useAdminLayoutState()

const {
  siderCollapsed,
  siderRightFixed,
  siderCollapsedWidth,
  siderWidth,
  siderTheme,
  splitMenu,
  _headerHeight,
  headerHeight,
  headerFixed,
  mode,
  logo,
  logoUrl,
  title,
  parentMenuOptions,
  parentKey,
  childMenuOptions,
  menuOptions,
  activeKey,
  accordion,
  sider,
  _siderCollapsedWidth,
  toggleSiderRightFixed,
  toggleSiderCollapsed,
  scrollbarProps,
  hasSkin,
} = state

const inverted = computed(() => {
  if (hasSkin.value)
    return false
  return calculateInverted(siderTheme.value)
})

const siderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: '100%',
    color: 'var(--admin-layout-text-color)',
    boxSizing: 'border-box',
  }
  if (headerFixed.value) {
    style.height = mode.value === 'side' ? '100vh' : `calc(100vh - ${_headerHeight.value}px)`
  }

  const isSplit = splitMenu.value && mode.value === 'side'

  if (hasSkin.value) {
    if (!isSplit) {
      applySkinStyles(style, { border: 'right' })
    }
  }
  else if (!splitMenu.value || mode.value === 'mix') {
    style.backgroundColor = siderTheme.value
  }

  return style
})

const leftStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `var(${AdminLayoutCssVars.SiderCollapsedWidth})`,
  }
  if (hasSkin.value) {
    applySkinStyles(style, { border: 'right' })
  }
  else {
    style.backgroundColor = siderTheme.value
  }
  return style
})

const rightStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    'width': `${siderWidth.value}px !important`,
    '--box-shadow': '8px 0 15px rgba(0, 0, 0, 0.03)',
  }
  if (hasSkin.value) {
    applySkinStyles(style)
    style['--box-shadow'] = '8px 0 15px rgba(0,0,0,0.05)'
  }
  else {
    style.backgroundColor = siderTheme.value
  }
  return style
})

function handleParentMenuClick(key: string) {
  parentKey.value = key
}

const siderProps = computed<AdminLayoutSiderProps>(() => ({
  state: proxyRefs(state),
  show: sider.value,
  inverted: inverted.value,
  headerHeight: headerHeight.value,
  collapsed: siderCollapsed.value,
  fixed: siderRightFixed.value,
  theme: siderTheme.value,
  width: siderWidth.value,
  _width: siderWidth.value,
  collapsedWidth: siderWidth.value,
  _collapsedWidth: _siderCollapsedWidth.value,
  toggleSiderCollapsed,
  toggleRightFixed: toggleSiderRightFixed,
}))

const logoProps = computed<AdminLayoutLogoProps>(() => ({
  state: proxyRefs(state),
  inverted: inverted.value,
  width: siderWidth.value,
  height: headerHeight.value,
  collapsed: siderCollapsed.value,
}))

const menuProps = computed<AdminLayoutMenuProps>(() => ({
  state: proxyRefs(state),
  mode: 'vertical',
  inverted: inverted.value,
  accordion: accordion.value,
  value: `${activeKey.value}`,
  collapsed: siderCollapsed.value,
  collapsedWidth: siderCollapsedWidth.value,
}))
</script>

<template>
  <div
    class="admin-layout-sider"
    :class="{
      'admin-layout-sider--split': splitMenu && mode === 'side',
      'border-right': (!splitMenu && mode === 'side') || mode === 'mix',
      'admin-layout-sider--split-hover': !siderRightFixed && mode === 'side' && splitMenu,
      'admin-layout-sider--skin': hasSkin,
    }"
    :style="{ ...siderStyle }"
  >
    <template v-if="(mode === 'side' && !splitMenu) || mode === 'mix'">
      <slot name="default" v-bind="{ ...siderProps }">
        <slot v-if="mode === 'side'" name="header" v-bind="siderProps">
          <slot name="logo" v-bind="{ ...logoProps, width: siderCollapsed ? siderCollapsedWidth : siderWidth }">
            <Logo v-if="logo" :collapsed="siderCollapsed" />
          </slot>
        </slot>
        <Scrollbar class="flex-1" v-bind="{ ...scrollbarProps, inverted, height: '100%' }">
          <slot name="content" v-bind="{ ...siderProps }">
            <slot name="menu" v-bind="{ ...menuProps, options: splitMenu ? childMenuOptions : menuOptions }" />
          </slot>
        </Scrollbar>
        <slot name="footer" v-bind="siderProps">
          <div class="admin-layout-sider__hamburger">
            <Hamburger :value="siderCollapsed" @update:value="toggleSiderCollapsed" />
          </div>
        </slot>
      </slot>
    </template>
    <template v-else>
      <div class="admin-layout-sider__split-left border-right" :style="leftStyle" :class="{ 'admin-layout-sider__split-left--collapsed': siderCollapsed }">
        <slot name="left" v-bind="{ ...siderProps, width: _siderCollapsedWidth }">
          <slot name="leftHeader" v-bind="{ ...siderProps, width: _siderCollapsedWidth }">
            <div v-if="logo && logoUrl" class="admin-layout-sider__split-left-logo">
              <img :src="logoUrl" alt="logo">
            </div>
          </slot>
          <Scrollbar class="flex-1" v-bind="{ ...scrollbarProps, inverted, height: '100%' }">
            <slot name="leftContent" v-bind="{ ...siderProps, width: _siderCollapsedWidth }">
              <slot name="parentMenu" v-bind="{ ...menuProps, options: parentMenuOptions, value: `${parentKey}` }">
                <ul class="admin-layout-sider__split-left-menu">
                  <li
                    v-for="item in parentMenuOptions"
                    :key="item.key"
                    class="admin-layout-sider__split-left-menu-item"
                    :class="{ 'admin-layout-sider__split-left-menu-item--active': item.key === parentKey }"
                    @click="handleParentMenuClick(`${item.key}`)"
                  >
                    <div v-if="item.icon" class="admin-layout-sider__split-left-menu-icon">
                      <component :is="item.icon" />
                    </div>
                    <div v-if="!siderCollapsed || !item.icon" class="admin-layout-sider__split-left-menu-label">
                      {{ getLabel(item.label, item) }}
                    </div>
                  </li>
                </ul>
              </slot>
            </slot>
          </Scrollbar>
          <slot name="leftFooter" v-bind="{ ...siderProps, width: _siderCollapsedWidth }">
            <div class="admin-layout-sider__hamburger">
              <Hamburger :value="siderCollapsed" @update:value="toggleSiderCollapsed" />
            </div>
          </slot>
        </slot>
      </div>
      <div class="admin-layout-sider__split-right" :class="{ 'border-right': siderRightFixed }" :style="rightStyle">
        <slot name="right" v-bind="{ ...siderProps }">
          <slot name="rightHeader" v-bind="{ ...siderProps }">
            <div v-if="logo && title" class="admin-layout-sider__split-right-title">
              <span>
                {{ title }}
              </span>
            </div>
          </slot>
          <Scrollbar class="flex-1" v-bind="{ ...scrollbarProps, inverted, height: '100%' }">
            <slot name="rightContent" v-bind="{ ...siderProps }">
              <slot name="menu" v-bind="{ ...menuProps, options: childMenuOptions, collapsed: false }" />
            </slot>
          </Scrollbar>

          <slot name="rightFooter" v-bind="{ ...siderProps }">
            <div class="admin-layout-sider__split-right-fixed-switch" @click="toggleSiderRightFixed(!siderRightFixed)">
              <div v-if="!siderRightFixed" class="i-lucide:pin" />
              <div v-else class="i-lucide:pin-off" />
            </div>
          </slot>
        </slot>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.admin-layout-sider {
  position: relative;
  display: flex;
  flex-direction: column;

  &--split {
    flex-direction: row;

    &-hover {
      .admin-layout-sider__split-right {
        transform: translateX(-100%);
        transition: transform var(--admin-layout-transition-duration);
      }

      &:hover {
        .admin-layout-sider__split-right {
          transform: translateX(0);
          z-index: 3;
          box-shadow: var(--box-shadow);
        }
      }
    }
  }

  &__split-left {
    height: 100%;
    flex-shrink: 0;
    position: relative;
    z-index: 4;
    overflow-x: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &--collapsed {
      .admin-layout-sider__split-left-logo > img {
        height: 75%;
        aspect-ratio: 1/1;
      }

      .admin-layout-sider__split-left-menu-label {
        display: none;
      }
    }
  }

  &__split-right {
    flex-shrink: 0;
    position: relative;
    z-index: 3;
    height: 100%;
    transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
    display: flex;
    flex-direction: column;
  }

  &__hamburger {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.admin-layout-sider__split-left-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--admin-layout-header-height);

  & > img {
    height: 95%;
    aspect-ratio: 1/1;
  }
}

.admin-layout-sider__split-left-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin-top: 6px;
  will-change: transform;
}

.admin-layout-sider__split-left-menu-item {
  width: 76%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  aspect-ratio: 1/1;
  border-radius: 6px;
  padding: 0 3px;
  gap: 6px;
  transition: background-color var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
  box-sizing: border-box;

  &:hover:not(&--active) {
    color: var(--primary-color);
    background-color: rgba(0, 0, 0, 0.05);

    .admin-layout-sider__split-left-menu-icon {
      transform: scale(1.2);
    }
  }

  &--active {
    background-color: var(--primary-color);
    color: #fff;

    .admin-layout-sider__split-left-menu-icon {
      transform: scale(1.1);
    }
  }
}

.admin-layout-sider__split-left-menu-icon {
  font-size: 18px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
}

.admin-layout-sider__split-left-menu-label {
  width: 100%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.admin-layout-sider__split-right-title {
  height: var(--admin-layout-header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  width: 100%;
  overflow: hidden;

  & > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 700;
    width: calc(100% - 60px);
    text-align: center;
  }
}

.admin-layout-sider__split-right-fixed-switch {
  position: absolute;
  bottom: 6px;
  right: 6px;
  z-index: 5;
  cursor: pointer;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

// skin 模式下：折叠时隐藏右侧面板，hover 时显示
.admin-layout-sider--split-hover.admin-layout-sider--skin {
  .admin-layout-sider__split-right {
    // 基态：visibility 延迟到 transform 动画结束后再隐藏
    transition:
      transform var(--admin-layout-transition-duration),
      visibility 0s linear var(--admin-layout-transition-duration);
    visibility: hidden;
  }

  &:hover .admin-layout-sider__split-right {
    // hover：立即显示，transform 开始滑入动画
    transition:
      transform var(--admin-layout-transition-duration),
      box-shadow var(--admin-layout-transition-duration),
      visibility 0s linear 0s;
    visibility: visible;
  }
}
</style>
