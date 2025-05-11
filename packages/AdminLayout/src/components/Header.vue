<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { calculateInverted } from '../helper'
import { CssVars, DefaultDarkColor } from '../typing'
import Logo from './Logo.vue'

defineSlots<{
  default: () => any
  prefix: () => any
  suffix: () => any
}>()

const state = useAdminLayoutState()
const {
  headerTheme,
  _headerHeight,
  mode,
  parentMenuOptions,
  parentKey,
  splitMenu,
  renderMenu,
  menuOptions,
  isDark,
  collapsed,
  logo,
  accordion,
  isMobile,
  toggleCollapsed,
} = state

const inverted = computed(() => calculateInverted(headerTheme.value) || isDark.value)

const scrollbarStyle = computed(() => {
  const style: CSSProperties = {
    height: `${_headerHeight.value}px`,
    backgroundColor: headerTheme.value,
  }
  if (isDark.value) {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }

  if (inverted.value) {
    style[CssVars.BorderColor] = DefaultDarkColor.BorderColor
    style[CssVars.ScrollbarColor] = DefaultDarkColor.ScrollbarColor
    style[CssVars.ScrollbarHoverColor] = DefaultDarkColor.ScrollbarHoverColor
  }

  return style
})

const headerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_headerHeight.value}px`,
  }
  if (inverted.value) {
    style.color = `${DefaultDarkColor.TextColor}`
  }
  return style
})

function handleParentMenuClick(key: string) {
  parentKey.value = key
}
</script>

<template>
  <Scrollbar x-scrollable :style="scrollbarStyle" class="bordered">
    <div class="admin-layout-header" :style="headerStyle">
      <Logo v-if="mode !== 'side' && logo && !isMobile" />
      <div v-if="mode === 'mix' || (mode === 'side' && !splitMenu) || isMobile" class="hamburger" @click="toggleCollapsed(!collapsed)">
        <div v-if="!collapsed" class="i-ant-design:menu-fold-outlined" />
        <div v-else class="i-ant-design:menu-unfold-outlined" />
      </div>
      <slot v-if="!isMobile" name="prefix" v-bind="state" />
      <slot v-if="!isMobile" name="default" v-bind="state">
        <ul v-if="mode === 'mix' && splitMenu" class="first-level-menu">
          <li v-for="item in parentMenuOptions" :key="item.key" class="first-level-menu-item" :class="{ active: item.key === parentKey }" @click="handleParentMenuClick(`${item.key}`)">
            <div v-if="item.icon" class="first-level-menu-item-icon">
              <component :is="item.icon" />
            </div>
            <div class="first-level-menu-item-label">
              {{ item.label }}
            </div>
          </li>
        </ul>
        <div v-else-if="mode === 'top' && renderMenu" class="flex-1">
          <component :is="renderMenu({ options: menuOptions, mode: 'horizontal', inverted, accordion })" />
        </div>
      </slot>
      <div class="ml-auto" />
      <slot name="suffix" v-bind="state" />
    </div>
  </Scrollbar>
</template>

<style scoped lang="less">
.bordered {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--admin-layout-border-color);
  }
}

.admin-layout-header {
  display: flex;
  align-items: center;
  gap: 6px;

  & > * {
    flex-shrink: 0;
  }
}

.first-level-menu {
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
  height: 100%;

  &-item {
    height: 76%;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 6px;
    gap: 6px;
    transition: var(--admin-layout-transition);

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
      transition: transform 0.2s ease-out;
    }

    &-label {
      max-width: 80px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  border-radius: 6px;
  margin: 0 6px;
  transition: var(--admin-layout-transition);

  & > div {
    font-size: 18px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
