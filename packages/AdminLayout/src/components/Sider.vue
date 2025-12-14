<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutLogoProps, AdminLayoutSiderProps } from '../typing'
import { computed } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { calculateInverted } from '../helper'
import { CssVars, DefaultDarkColor } from '../typing'
import Hamburger from './Hamburger.vue'
import Logo from './Logo.vue'

defineSlots<{
  default: (props: AdminLayoutSiderProps) => void
  left: (props: AdminLayoutSiderProps) => void
  right: (props: AdminLayoutSiderProps) => void
  logo: (props: AdminLayoutLogoProps) => void
  leftLogo: (props: AdminLayoutLogoProps) => void
  rightTitle: (props: AdminLayoutLogoProps) => void
}>()

const state = useAdminLayoutState()

const {
  collapsed,
  siderFixed,
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
  isDark,
  renderMenu,
  renderParentMenu,
  menuOptions,
  activeKey,
  accordion,
  _siderCollapsedWidth,
  toggleSiderFixed,
  toggleCollapsed,
} = state

const inverted = computed(() => {
  return calculateInverted(siderTheme.value) || isDark.value
})

const siderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `100%`,
    color: `var(${CssVars.TextColor})`,
    boxSizing: 'border-box',
  }
  // 固定头部
  if (headerFixed.value) {
    style.height = mode.value === 'side' ? `100vh` : `calc(100vh - ${_headerHeight.value}px)`
  }
  if (!splitMenu.value || mode.value === 'mix') {
    // 汉堡包预留空间
    style.paddingBottom = '40px'

    if (!isDark.value) {
      style.backgroundColor = siderTheme.value
    }
    else {
      style.backgroundColor = `var(${CssVars.BaseColor})`
    }
  }

  if (inverted.value) {
    style.color = DefaultDarkColor.TextColor
    style[CssVars.BorderColor] = DefaultDarkColor.BorderColor
    style[CssVars.ScrollbarColor] = DefaultDarkColor.ScrollbarColor
    style[CssVars.ScrollbarHoverColor] = DefaultDarkColor.ScrollbarHoverColor
  }

  return style
})

const leftStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `var(${CssVars.SiderCollapsedWidth})`,
    backgroundColor: siderTheme.value,
    // 汉堡包预留空间
    paddingBottom: '40px',
  }
  if (isDark.value) {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }
  return style
})

const rightStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    'width': `${siderWidth.value}px !important`,
    'backgroundColor': siderTheme.value,
    '--box-shadow': `8px 0 15px ${!isDark.value ? `rgba(0, 0, 0, 0.03)` : `rgba(255, 255, 255, 0.03)`}`,
  }
  if (isDark.value) {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }
  return style
})

const scrollHeight = computed(() => ({
  default: mode.value === 'side' ? `calc(100% - ${logo.value ? headerHeight.value : 0}px)` : `100%`,
  left: mode.value === 'side' ? `calc(100% - ${logo.value && logoUrl.value ? headerHeight.value : 0}px)` : `100%`,
  right: mode.value === 'side' ? `calc(100% - ${logo.value && title.value ? headerHeight.value : 0}px)` : `100%`,
}))

function handleParentMenuClick(key: string) {
  parentKey.value = key
}
</script>

<template>
  <div
    class="admin-layout-sider" :class="{
      'admin-layout-sider-split': splitMenu && mode === 'side',
      'border-right': (!splitMenu && mode === 'side') || mode === 'mix',
      'admin-layout-sider__hover': !siderFixed && mode === 'side' && splitMenu,
    }"
    :style="{ ...siderStyle }"
  >
    <template v-if="(mode === 'side' && !splitMenu) || mode === 'mix'">
      <slot v-if="mode === 'side' " name="logo" v-bind="({ ...state, width: collapsed ? siderCollapsedWidth : siderWidth, height: headerHeight, collapsed, inverted } as any)">
        <Logo v-if="logo" :collapsed="collapsed" />
      </slot>
      <slot name="default" v-bind="({ ...state, scrollHeight: scrollHeight.default }as any)">
        <Scrollbar :style="{ height: scrollHeight.default }">
          <template v-if="renderMenu">
            <component
              :is="renderMenu({
                options: splitMenu ? childMenuOptions : menuOptions,
                collapsed,
                collapsedWidth: siderCollapsedWidth,
                inverted,
                accordion,
                value: `${activeKey}`,
              })"
            />
          </template>
        </Scrollbar>
      </slot>
      <Hamburger :value="collapsed" class="hamburger border-top" @update:value="toggleCollapsed" />
    </template>
    <template v-else>
      <div class="admin-layout-sider-split-left border-right" :style="leftStyle" :class="{ collapsed }">
        <slot name="leftLogo" v-bind="({ ...state, width: _siderCollapsedWidth, height: headerHeight, collapsed, inverted } as any)">
          <div v-if="logo && logoUrl" class="admin-layout-sider-split-left-logo">
            <img :src="logoUrl" alt="logo">
          </div>
        </slot>
        <slot name="left" v-bind="({ ...state, scrollHeight: scrollHeight.left } as any)">
          <Scrollbar :style="{ height: scrollHeight.left }">
            <template v-if="renderParentMenu">
              <component
                :is="renderParentMenu({
                  options: parentMenuOptions,
                  collapsed,
                  inverted,
                  accordion,
                  value: `${parentKey}`,
                })"
              />
            </template>
            <ul v-else class="first-level-menu">
              <li v-for="item in parentMenuOptions" :key="item.key" class="first-level-menu-item" :class="{ active: item.key === parentKey }" @click="handleParentMenuClick(`${item.key}`)">
                <div v-if="item" class="first-level-menu-item-icon">
                  <component :is="item.icon" />
                </div>
                <div class="first-level-menu-item-label">
                  {{ item.label }}
                </div>
              </li>
            </ul>
          </Scrollbar>
        </slot>
        <Hamburger :value="collapsed" class="hamburger" @update:value="toggleCollapsed" />
      </div>
      <div class="admin-layout-sider-split-right" :class="{ 'border-right': siderFixed }" :style="rightStyle">
        <slot name="rightTitle" v-bind="({ ...state, width: siderWidth, height: headerHeight, collapsed, inverted } as any)">
          <div v-if="logo && title" class="admin-layout-sider-split-right-title">
            <span>
              {{ title }}
            </span>
          </div>
        </slot>
        <slot name="right" v-bind="({ ...state, scrollHeight: scrollHeight.right } as any)">
          <Scrollbar :style="{ height: scrollHeight.right }">
            <component :is="renderMenu({ options: childMenuOptions, inverted, accordion, value: `${activeKey}`, collapsed: false })" v-if="renderMenu" />
          </Scrollbar>
        </slot>

        <div class="sider-fixed-switch" @click="toggleSiderFixed(!siderFixed)">
          <div v-if="!siderFixed" class="i-lucide:pin" />
          <div v-else class="i-lucide:pin-off" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.admin-layout-sider {
  position: relative;
}

.admin-layout-sider__hover {
  .admin-layout-sider-split-right {
    transform: translateX(-100%);
    transition: transform var(--admin-layout-transition-duration);
  }

  &:hover {
    .admin-layout-sider-split-right {
      transform: translateX(0);
      z-index: 100;
      box-shadow: var(--box-shadow);
    }
  }
}

.admin-layout-sider-split {
  display: flex;
  flex-wrap: nowrap;

  &-left {
    height: 100%;
    flex-shrink: 0;
    position: relative;
    z-index: 101;
    overflow-x: hidden;
    box-sizing: border-box;

    &.collapsed {
      .admin-layout-sider-split-left-logo {
        & > img {
          height: 75%;
          aspect-ratio: 1/1;
        }
      }

      .first-level-menu-item {
        &-label {
          display: none;
        }
      }
    }

    &-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--admin-layout-header-height);

      & > img {
        height: 95%;
        aspect-ratio: 1/1;
      }
    }
  }

  &-right {
    flex-shrink: 0;
    position: relative;
    z-index: 100;
    height: 100%;
    transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);

    &-title {
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
  }

  .sider-fixed-switch {
    position: absolute;
    bottom: 6px;
    right: 6px;
    z-index: 110;
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
}

.first-level-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin-top: 6px;
  will-change: transform;

  &-item {
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

    &:hover:not(.active) {
      color: var(--primary-color);
      background-color: rgba(0, 0, 0, 0.05);

      .first-level-menu-item-icon {
        transform: scale(1.2);
      }
    }

    &.active {
      background-color: var(--primary-color);
      color: #fff;

      .first-level-menu-item-icon {
        transform: scale(1.1);
      }
    }

    &-icon {
      font-size: 18px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
    }

    &-label {
      width: 100%;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
  }
}

.hamburger {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
