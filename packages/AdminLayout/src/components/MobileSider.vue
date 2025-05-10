<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { Logo } from '.'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { CssVars } from '../typing'

defineSlots<{
  default: () => any
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
</script>

<template>
  <div class="mobile-sider-container" :class="{ collapsed }" :style="style">
    <slot name="default" v-bind="state">
      <Logo />
      <Scrollbar :style="{ height: `calc(100vh - ${logo ? headerHeight : 0}px)` }">
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
    <div class="hamburger" @click="toggleCollapsed(!collapsed)">
      <div v-if="!collapsed" class="i-ant-design:menu-fold-outlined" />
      <div v-else class="i-ant-design:menu-unfold-outlined" />
    </div>
  </div>
  <div class="mobile-sider-mask" :class="{ show: !collapsed }" @click="toggleCollapsed(true)" />
</template>

<style scoped lang="less">
.mobile-sider-container {
  max-width: 100%;
  position: fixed;
  left: 0;
  transition: transform var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
  z-index: 101;
  height: 100vh;
  top: 0;

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
  bottom: 10px;
  right: 10px;
  z-index: 13;
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
  transition: background-color var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
