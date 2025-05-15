<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminSiderProps } from '../typing'
import { computed } from 'vue'
import { Logo } from '.'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { CssVars } from '../typing'
import Hamburger from './Hamburger.vue'

defineSlots<{
  default: (props: AdminSiderProps) => any
}>()

const state = useAdminLayoutState()
const {
  renderMenu,
  menuOptions,
  collapsed,
  siderWidth,
  isDark,
  logo,
  headerHeight,
  siderCollapsedWidth,
  activeKey,
  accordion,
  toggleCollapsed,
} = state

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: `${siderWidth.value}px`,
    backgroundColor: `var(${CssVars.BaseColor})`,
  }
  return style
})

const scrollHeight = computed(() => {
  return `calc(100% - ${logo.value ? headerHeight.value : 0}px)`
})
</script>

<template>
  <div class="mobile-sider-container" :class="{ collapsed }" :style="style">
    <Logo />
    <slot name="default" v-bind="{ ...(state as any), height: scrollHeight }">
      <Scrollbar :style="{ height: scrollHeight }">
        <component
          :is="renderMenu({
            options: menuOptions,
            inverted: isDark,
            collapsedWidth: siderCollapsedWidth,
            value: `${activeKey}`,
            accordion,
            collapsed: false,
          })"
          v-if="renderMenu"
        />
      </Scrollbar>
    </slot>

    <Hamburger :value="collapsed" class="hamburger" @update:value="toggleCollapsed" />
  </div>
  <div class="mobile-sider-mask" :class="{ show: !collapsed }" @click="toggleCollapsed(true)" />
</template>

<style scoped lang="less">
.mobile-sider-container {
  height: 100vh;
  max-width: 100%;
  position: fixed;
  left: 0;
  transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
  z-index: 101;
  height: 100vh;
  top: 0;
  padding-bottom: 40px;

  &.collapsed {
    overflow: hidden;
    transform: translateX(-100%);
  }

  &:not(.collapsed) {
    box-shadow: 8px 0 15px rgba(0, 0, 0, 0.1);
  }
}

.mobile-sider-mask {
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

.hamburger {
  position: absolute;
  z-index: 13;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
