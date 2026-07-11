<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutLogoProps, AdminLayoutMenuProps, AdminLayoutSiderProps } from '../typing'
import { computed, onMounted, onUnmounted, proxyRefs } from 'vue'
import { Logo } from '.'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { applySkinStyles, applyThemeStyles, calculateInverted } from '../helper'
import Hamburger from './Hamburger.vue'

defineSlots<{
  default: (props: AdminLayoutSiderProps) => any
  header: (props: AdminLayoutSiderProps) => any
  content: (props: AdminLayoutSiderProps) => any
  footer: (props: AdminLayoutSiderProps) => any
  logo: (props: AdminLayoutLogoProps) => any
  menu: (props: AdminLayoutMenuProps) => any
}>()

const state = useAdminLayoutState()
const {
  // refs
  siderCollapsed,
  // composables
  isDark,
  // computed - props
  wrapperHeight,
  hasSkin,
  menuOptions,
  scrollbarProps,
  headerHeight,
  sider,
  siderWidth,
  siderTheme,
  accordion,
  activeKey,
  // functions
  toggleSiderCollapsed,
  toggleSiderRightFixed,
} = state

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && !siderCollapsed.value) {
    toggleSiderCollapsed(true)
  }
}

onMounted(() => document.addEventListener('keydown', handleEscape))
onUnmounted(() => document.removeEventListener('keydown', handleEscape))

const inverted = computed(() => isDark.value || calculateInverted(siderTheme.value))

const siderDrawerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `${siderWidth.value}px`,
    height: wrapperHeight.value,
  }
  if (hasSkin.value) {
    applySkinStyles(style)
  }
  else {
    applyThemeStyles(style, siderTheme.value, inverted.value)
  }
  return style
})

const siderProps = computed<AdminLayoutSiderProps>(() => ({
  state: proxyRefs(state),
  show: sider.value,
  inverted: inverted.value,
  headerHeight: headerHeight.value,
  collapsed: false,
  fixed: true,
  theme: siderTheme.value,
  width: siderWidth.value,
  _width: siderWidth.value,
  collapsedWidth: siderWidth.value,
  _collapsedWidth: siderWidth.value,
  toggleCollapsed: toggleSiderCollapsed,
  toggleRightFixed: toggleSiderRightFixed,
}))
const logoProps = computed<AdminLayoutLogoProps>(() => ({
  state: proxyRefs(state),
  inverted: inverted.value,
  width: siderWidth.value,
  height: headerHeight.value,
  collapsed: false,
}))
const menuProps = computed<AdminLayoutMenuProps>(() => ({
  state: proxyRefs(state),
  options: menuOptions.value,
  inverted: inverted.value,
  value: `${activeKey.value}`,
  accordion: accordion.value,
  collapsed: false,
}))
</script>

<template>
  <div
    class="admin-layout-sider-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
    :aria-hidden="siderCollapsed"
    :class="{ 'admin-layout-sider-drawer--collapsed': siderCollapsed }"
    :style="siderDrawerStyle"
  >
    <slot name="default" v-bind="siderProps">
      <slot name="header" v-bind="siderProps">
        <slot name="logo" v-bind="logoProps">
          <Logo />
        </slot>
      </slot>
      <Scrollbar class="flex-1" v-bind="{ ...scrollbarProps, height: '100%' }">
        <slot name="content" v-bind="siderProps">
          <slot name="menu" v-bind="menuProps" />
        </slot>
      </Scrollbar>

      <slot name="footer" v-bind="siderProps">
        <div class="admin-layout-sider-drawer__hamburger">
          <Hamburger :value="siderCollapsed" @update:value="toggleSiderCollapsed" />
        </div>
      </slot>
    </slot>
  </div>
  <div class="admin-layout-sider-drawer__mask" aria-hidden="true" :class="{ 'admin-layout-sider-drawer__mask--show': !siderCollapsed }" @click="toggleSiderCollapsed(true)" />
</template>

<style scoped lang="less">
.admin-layout-sider-drawer {
  max-width: 100%;
  position: absolute;
  left: 0;
  transition: transform var(--admin-layout-duration) var(--admin-layout-bezier);
  z-index: 2;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--admin-layout-base-color);

  &--collapsed {
    overflow: hidden;
    transform: translateX(-100%);
  }

  &:not(&--collapsed) {
    box-shadow: 8px 0 15px rgba(0, 0, 0, 0.1);
  }

  &__hamburger {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    transition: opacity var(--admin-layout-duration) var(--admin-layout-bezier);
    opacity: 0;
    visibility: hidden;

    &--show {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
