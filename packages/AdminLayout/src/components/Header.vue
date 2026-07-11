<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutHeaderProps, AdminLayoutLogoProps, AdminLayoutMenuProps } from '../typing'
import { computed, proxyRefs } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { applySkinStyles, applyThemeStyles, getLabel, isInverted } from '../helper'
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
  // refs
  siderCollapsed,
  parentKey,
  // composables
  isDark,
  // computed - props
  mode,
  splitMenu,
  isMobile,
  menuOptions,
  scrollbarProps,
  logo,
  header,
  headerHeight,
  headerTheme,
  headerFixed,
  headerBordered,
  siderWidth,
  activeKey,
  // computed - derived
  _headerHeight,
  hasSkin,
  parentMenuOptions,
  // functions
  toggleSiderCollapsed,
} = state

const inverted = computed(() => isInverted(isDark.value, hasSkin.value, headerTheme.value))

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (hasSkin.value) {
    applySkinStyles(style)
  }
  else if (!isDark.value) {
    applyThemeStyles(style, headerTheme.value, inverted.value)
  }
  if (!headerBordered.value) {
    style.borderBottom = 'none'
  }
  return style
})

const headerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_headerHeight.value}px`,
  }
  return style
})

const headerProps = computed<AdminLayoutHeaderProps>(() => ({
  state: proxyRefs(state),
  inverted: inverted.value,
  height: headerHeight.value,
  _height: _headerHeight.value,
  fixed: headerFixed.value,
  bordered: headerBordered.value,
  theme: headerTheme.value,
  show: header.value,
}))

const logoProps = computed<AdminLayoutLogoProps>(() => ({
  state: proxyRefs(state),
  inverted: inverted.value,
  width: siderWidth.value,
  height: _headerHeight.value,
  collapsed: false,
}))

const menuProps = computed<AdminLayoutMenuProps>(() => ({
  state: proxyRefs(state),
  mode: 'horizontal',
  inverted: inverted.value,
  collapsed: false,
}))

function handleParentMenuClick(key: string) {
  parentKey.value = key
}
</script>

<template>
  <Scrollbar v-bind="{ ...scrollbarProps, xScrollable: true, height: `${_headerHeight}px` }" :style="containerStyle" class="admin-layout-header-container">
    <div class="admin-layout-header" :style="headerStyle">
      <slot name="default" v-bind="headerProps">
        <slot v-if="(mode === 'mix' || mode === 'top') && !isMobile" name="logo" v-bind="logoProps">
          <Logo v-if="logo" />
        </slot>
        <Hamburger
          v-if="isMobile"
          :value="siderCollapsed"
          class="admin-layout-header__hamburger"
          @update:value="toggleSiderCollapsed"
        />
        <slot name="prefix" v-bind="headerProps" />
        <template v-if="!isMobile">
          <slot v-if="mode === 'mix' && splitMenu" name="parentMenu" v-bind="{ ...menuProps, options: parentMenuOptions, value: `${parentKey}` }">
            <ul class="admin-layout-header__parent-menu" role="menubar">
              <li
                v-for="item in parentMenuOptions"
                :key="item.key"
                :class="{ 'admin-layout-header__parent-menu-item--active': item.key === parentKey }"
                class="admin-layout-header__parent-menu-item"
                role="menuitem"
                tabindex="0"
                :aria-label="getLabel(item.label, item)"
                @click="handleParentMenuClick(`${item.key}`)"
                @keydown.enter.prevent="handleParentMenuClick(`${item.key}`)"
                @keydown.space.prevent="handleParentMenuClick(`${item.key}`)"
              >
                <div v-if="item.icon" class="admin-layout-header__parent-menu-icon">
                  <component :is="item.icon" />
                </div>
                <div class="admin-layout-header__parent-menu-label">
                  {{ getLabel(item.label, item) }}
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
.admin-layout-header-container {
  overflow-y: hidden;
  background-color: var(--admin-layout-base-color);
  color: var(--admin-layout-text-color);
  border-bottom: 1px solid var(--admin-layout-border-color);
}

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
      transition: all var(--admin-layout-duration) var(--admin-layout-bezier);

      &:hover:not(&--active) {
        color: var(--primary-color);
        background-color: rgba(0, 0, 0, 0.05);

        .admin-layout-header__parent-menu-icon {
          transform: scale(1.2);
        }
      }

      &--active {
        background-color: var(--primary-color);
        color: #fff;

        .admin-layout-header__parent-menu-icon {
          transform: scale(1.1);
        }
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

  &__hamburger {
    margin: 0 6px;
  }
}
</style>
