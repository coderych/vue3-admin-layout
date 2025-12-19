<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutHeaderProps, AdminLayoutLogoProps, AdminLayoutMenuProps } from '../typing'
import { computed } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { calculateInverted } from '../helper'
import { CssVars, DefaultDarkColor } from '../typing'
import Hamburger from './Hamburger.vue'
import Logo from './Logo.vue'

defineSlots<{
  default: (props: AdminLayoutHeaderProps) => any
  prefix: (props: AdminLayoutHeaderProps) => any
  suffix: (props: AdminLayoutHeaderProps) => any
  logo: (props: AdminLayoutLogoProps) => any
  menu: (props: AdminLayoutMenuProps) => any
  parentMenu: (props: AdminLayoutMenuProps) => any
}>()

const state = useAdminLayoutState()
const {
  header,
  headerTheme,
  headerHeight,
  _headerHeight,
  mode,
  parentMenuOptions,
  parentKey,
  splitMenu,
  menuOptions,
  isDark,
  collapsed,
  logo,
  isMobile,
  headerFixed,
  toggleCollapsed,
  siderWidth,
  activeKey,
  scrollbarProps,
} = state

const inverted = computed(() => calculateInverted(headerTheme.value) || isDark.value)

const scrollbarStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: headerTheme.value,
  }
  if (isDark.value) {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }

  if (inverted.value) {
    style[CssVars.BorderColor] = DefaultDarkColor.BorderColor
  }

  return style
})

const headerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    // 父容器有1px的边框，所以这里减去1px
    height: `${_headerHeight.value - 1}px`,
  }
  if (inverted.value) {
    style.color = `${DefaultDarkColor.TextColor}`
  }
  return style
})

function handleParentMenuClick(key: string) {
  parentKey.value = key
}

const headerProps = computed<AdminLayoutHeaderProps>(() => ({
  state,
  inverted: inverted.value,
  height: headerHeight.value,
  _height: _headerHeight.value,
  fixed: headerFixed.value,
  theme: headerTheme.value,
  show: header.value,
}))
const logoProps = computed<AdminLayoutLogoProps>(() => ({
  inverted: inverted.value,
  width: siderWidth.value,
  height: _headerHeight.value,
  collapsed: false,
  state,
}))
const menuProps = computed<AdminLayoutMenuProps>(() => ({
  mode: 'horizontal',
  inverted: inverted.value,
  collapsed: false,
  state,
}))
</script>

<template>
  <Scrollbar v-bind="{ ...scrollbarProps, xScrollable: true, inverted, height: `${_headerHeight}px` }" :style="scrollbarStyle" class="border-bottom overflow-y-hidden">
    <div class="admin-layout-header" :style="headerStyle">
      <slot name="default" v-bind="headerProps">
        <slot v-if="(mode === 'mix' || mode === 'top') && !isMobile" name="logo" v-bind="logoProps">
          <Logo v-if="logo" />
        </slot>
        <Hamburger
          v-if="isMobile"
          :value="collapsed"
          class="admin-layout-header__hamburger"
          @update:value="toggleCollapsed"
        />
        <slot name="prefix" v-bind="headerProps" />
        <template v-if="!isMobile">
          <slot v-if="mode === 'mix' && splitMenu" name="parentMenu" v-bind="{ ...menuProps, options: parentMenuOptions, value: `${parentKey}` }">
            <ul class="admin-layout-header__parent-menu">
              <li
                v-for="item in parentMenuOptions"
                :key="item.key"
                :class="{ active: item.key === parentKey }"
                class="admin-layout-header__parent-menu-item"
                @click="handleParentMenuClick(`${item.key}`)"
              >
                <div v-if="item.icon" class="admin-layout-header__parent-menu-item-icon">
                  <component :is="item.icon" />
                </div>
                <div class="admin-layout-header__parent-menu-item-label">
                  {{ item.label }}
                </div>
              </li>
            </ul>
          </slot>
          <div v-else-if="mode === 'top' && !isMobile" class="flex-1">
            <slot name="menu" v-bind="{ ...menuProps, options: menuOptions, value: `${activeKey}` }" />
          </div>
        </template>
        <div class="ml-auto" />
        <slot name="suffix" v-bind="headerProps" />
      </slot>
    </div>
  </Scrollbar>
</template>

<style scoped lang="less">
.admin-layout-header {
  display: flex;
  align-items: center;
  gap: 6px;

  & > * {
    flex-shrink: 0;
  }

  &__parent-menu {
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

        .admin-layout-header__parent-menu-item-icon {
          transform: scale(1.2);
        }
      }

      &.active {
        background-color: var(--primary-color);
        color: #fff;

        .admin-layout-header__parent-menu-item-icon {
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

  &__hamburger {
    margin: 0 6px;
  }
}
</style>
