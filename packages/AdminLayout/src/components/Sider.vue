<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { calculateInverted } from '../helper'
import { CssVars, DefaultDarkColor } from '../typing'
import Logo from './Logo.vue'

defineSlots<{
  default: () => void
  left: (props: { open: (show: boolean) => void, show: boolean }) => void
  right: () => void
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
  menuOptions,
  activeKey,
  accordion,
  show,
  toggleCollapsed,
  toggleSiderFixed,
} = state

const inverted = computed(() => {
  return calculateInverted(siderTheme.value) || isDark.value
})

const siderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `100%`,
    color: `var(${CssVars.TextColor})`,
  }
  // 固定头部
  if (headerFixed.value) {
    style.height = mode.value === 'side' ? `100vh` : `calc(100vh - ${_headerHeight.value}px)`
  }
  if (!splitMenu.value || mode.value === 'mix') {
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

// 解决层叠上下文问题
let timer: any
const resolveStackingContextStyle = ref<CSSProperties>({})
watch(show, (value) => {
  if (value) {
    timer && clearTimeout(timer)
    resolveStackingContextStyle.value = {
      zIndex: '100',
    }
  }
  else {
    timer = setTimeout(() => {
      resolveStackingContextStyle.value = {}
    }, 200)
  }
})

const leftStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `var(${CssVars.SiderCollapsedWidth})`,
    backgroundColor: siderTheme.value,
  }
  if (isDark.value) {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }
  return style
})

const rightStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `${siderWidth.value}px !important`,
    backgroundColor: siderTheme.value,
  }
  if (!siderFixed.value) {
    if (show.value) {
      style.boxShadow = `8px 0 15px ${!isDark.value ? `rgba(0, 0, 0, 0.03)` : `rgba(255, 255, 255, 0.03)`}`
      style.transform = `translateX(0)`
    }
    else {
      style.transform = `translateX(-${siderWidth.value}px)`
    }
  }
  if (isDark.value) {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }
  return style
})

function handleParentMenuClick(key: string) {
  parentKey.value = key
}
</script>

<template>
  <div
    class="admin-layout-sider" :class="{ 'admin-layout-sider-split': splitMenu && mode === 'side', 'bordered': (!splitMenu && mode === 'side') || mode === 'mix' }"
    :style="{ ...siderStyle, ...resolveStackingContextStyle }" @mouseleave="show = false" @mouseover="show = true"
  >
    <template v-if="(mode === 'side' && !splitMenu) || mode === 'mix'">
      <slot name="default" v-bind="state">
        <Logo v-if="mode === 'side' && logo" :collapsed="collapsed" />
        <Scrollbar :style="{ height: mode === 'side' ? `calc(100% - ${logo ? headerHeight : 0}px)` : `100%` }">
          <component
            :is="renderMenu({
              options: splitMenu ? childMenuOptions : menuOptions,
              collapsed,
              collapsedWidth: siderCollapsedWidth,
              inverted,
              accordion,
              value: `${activeKey}`,
            })" v-if="renderMenu"
          />
        </Scrollbar>
      </slot>
    </template>
    <template v-else>
      <div class="admin-layout-sider-split-left bordered" :style="leftStyle" :class="{ collapsed }">
        <slot name="left" v-bind="{ ...state, open: (value) => { show = value }, show }">
          <div v-if="logo && logoUrl" class="admin-layout-sider-split-left-logo">
            <img :src="logoUrl" alt="logo">
          </div>
          <Scrollbar :style="{ height: mode === 'side' ? `calc(100% - ${logo && logoUrl ? headerHeight : 0}px)` : `100%` }">
            <ul class="first-level-menu">
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
        <div class="hamburger" @click="toggleCollapsed(!collapsed)">
          <div v-if="!collapsed" class="i-ant-design:menu-fold-outlined" />
          <div v-else class="i-ant-design:menu-unfold-outlined" />
        </div>
      </div>
      <div class="admin-layout-sider-split-right" :class="{ bordered: siderFixed }" :style="rightStyle">
        <slot name="right" v-bind="state">
          <div v-if="logo && title" class="admin-layout-sider-split-right-title">
            <span>
              {{ title }}
            </span>
          </div>
          <Scrollbar :style="{ height: mode === 'side' ? `calc(100% - ${logo && title ? headerHeight : 0}px)` : `100%` }">
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
.admin-layout-sider-split {
  display: flex;
  flex-wrap: nowrap;

  &-left {
    height: 100%;
    flex-shrink: 0;
    position: relative;
    z-index: 20;
    overflow-x: hidden;
    padding-bottom: 48px;
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
        height: 100%;
        aspect-ratio: 1/1;
      }
    }
  }

  &-right {
    flex-shrink: 0;
    position: relative;
    z-index: 15;
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
    bottom: 10px;
    right: 10px;
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
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 120;
  transition: background-color var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
  font-size: 16px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.bordered {
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: var(--admin-layout-border-color);
    width: 1px;
  }
}
</style>
