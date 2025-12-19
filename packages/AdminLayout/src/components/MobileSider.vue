<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutLogoProps, AdminLayoutMenuProps, AdminLayoutSiderProps } from '../typing'
import { computed } from 'vue'
import { Logo } from '.'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { calculateInverted } from '../helper'
import { CssVars, DefaultDarkColor } from '../typing'
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
  menuOptions,
  collapsed,
  siderWidth,
  isDark,
  headerHeight,
  activeKey,
  accordion,
  siderTheme,
  toggleCollapsed,
  toggleSiderFixed,
  sider,
  scrollbarProps,
} = state

const inverted = computed(() => {
  return calculateInverted(siderTheme.value) || isDark.value
})

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `${siderWidth.value}px`,
    backgroundColor: `var(${CssVars.BaseColor})`,
  }
  if (!isDark.value) {
    style.backgroundColor = siderTheme.value
  }
  else {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }

  if (inverted.value) {
    style.color = DefaultDarkColor.TextColor
    style[CssVars.BorderColor] = DefaultDarkColor.BorderColor
  }

  return style
})

const siderProps = computed<AdminLayoutSiderProps>(() => ({
  state,
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
  toggleCollapsed,
  toggleFixed: toggleSiderFixed,
}))
const logoProps = computed<AdminLayoutLogoProps>(() => ({
  inverted: inverted.value,
  width: siderWidth.value,
  height: headerHeight.value,
  collapsed: false,
  state,
}))
const menuProps = computed<AdminLayoutMenuProps>(() => ({
  options: menuOptions.value,
  inverted: inverted.value,
  value: `${activeKey.value}`,
  accordion: accordion.value,
  collapsed: false,
  state,
}
))
</script>

<template>
  <div class="mobile-sider" :class="{ collapsed }" :style="style">
    <slot name="default" v-bind="siderProps">
      <slot name="header" v-bind="siderProps">
        <slot name="logo" v-bind="logoProps">
          <Logo />
        </slot>
      </slot>
      <Scrollbar class="flex-1" v-bind="{ ...scrollbarProps, inverted, height: '100%' }">
        <slot name="content" v-bind="siderProps">
          <slot name="menu" v-bind="menuProps" />
        </slot>
      </Scrollbar>

      <slot name="footer" v-bind="siderProps">
        <div class="mobile-sider__hamburger">
          <Hamburger :value="collapsed" @update:value="toggleCollapsed" />
        </div>
      </slot>
    </slot>
  </div>
  <div class="mobile-sider__mask" :class="{ show: !collapsed }" @click="toggleCollapsed(true)" />
</template>

<style scoped lang="less">
.mobile-sider {
  height: 100vh;
  max-width: 100%;
  position: fixed;
  left: 0;
  transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
  z-index: 101;
  height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;

  &.collapsed {
    overflow: hidden;
    transform: translateX(-100%);
  }

  &:not(.collapsed) {
    box-shadow: 8px 0 15px rgba(0, 0, 0, 0.1);
  }

  &__hamburger {
    width: 100%;
    height: 48px;
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
    z-index: 100;
    transition: opacity var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
    opacity: 0;
    visibility: hidden;

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
