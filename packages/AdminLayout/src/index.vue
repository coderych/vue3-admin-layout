<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutContentProps, AdminLayoutHeaderProps, AdminLayoutLogoProps, AdminLayoutMenuProps, AdminLayoutSiderProps } from './typing'
import { computed, h, proxyRefs } from 'vue'
import { Scrollbar } from '../../Scrollbar'
import { Content, Header, Sider, SiderDrawer } from './components'
import { useAdminLayoutProvider } from './context'
import { AdminLayoutCssVars, adminLayoutProps } from './typing'

const props = defineProps(adminLayoutProps)

const emit = defineEmits<{
  'update:siderCollapsed': [value: boolean]
  'update:siderRightFixed': [value: boolean]
}>()

const slots = defineSlots<{
  'default': (props: AdminLayoutContentProps) => void
  'logo': (props: AdminLayoutLogoProps) => void
  'header': (props: AdminLayoutHeaderProps) => void
  'header-prefix': (props: AdminLayoutHeaderProps) => void
  'header-suffix': (props: AdminLayoutHeaderProps) => void
  'sider': (props: AdminLayoutSiderProps) => void
  'sider-header': (props: AdminLayoutSiderProps) => void
  'sider-content': (props: AdminLayoutSiderProps) => void
  'sider-footer': (props: AdminLayoutSiderProps) => void
  'sider-left': (props: AdminLayoutSiderProps) => void
  'sider-left-header': (props: AdminLayoutSiderProps) => void
  'sider-left-content': (props: AdminLayoutSiderProps) => void
  'sider-left-footer': (props: AdminLayoutSiderProps) => void
  'sider-right': (props: AdminLayoutSiderProps) => void
  'sider-right-header': (props: AdminLayoutSiderProps) => void
  'sider-right-content': (props: AdminLayoutSiderProps) => void
  'sider-right-footer': (props: AdminLayoutSiderProps) => void
  'content-header': (props: AdminLayoutContentProps) => void
  'content-footer': (props: AdminLayoutContentProps) => void
  'content-overlay': (props: AdminLayoutContentProps) => void
  'menu': (props: AdminLayoutMenuProps) => void
  'parent-menu': (props: AdminLayoutMenuProps) => void
}>()

const state = useAdminLayoutProvider(props, slots, {
  onUpdateSiderCollapsed: (value: boolean) => emit('update:siderCollapsed', value),
  onUpdateSiderRightFixed: (value: boolean) => emit('update:siderRightFixed', value),
})

const {
  // refs
  siderCollapsed,
  contentFull,
  siderRightFixed,
  // computed - props
  mode,
  splitMenu,
  isMobile,
  header,
  headerHeight,
  headerFixed,
  sider,
  siderWidth,
  siderCollapsedWidth,
  skin,
  // computed - derived
  _headerHeight,
  _siderCollapsedWidth,
  hasSkin,
} = state

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    [AdminLayoutCssVars.HeaderHeight]: `${headerHeight.value}px`,
  }

  if (mode.value === 'top' || isMobile.value) {
    style.gridTemplateRows = `${_headerHeight.value}px minmax(0, 1fr)`
    if (mode.value !== 'top') {
      style.gridTemplateColumns = `0 minmax(0, 1fr)`
    }
    style[AdminLayoutCssVars.SiderWidth] = '0px'
  }
  else if (mode.value === 'side' || mode.value === 'mix') {
    let width = 0
    if (mode.value === 'side' && splitMenu.value) {
      const collapsedWidth = _siderCollapsedWidth.value
      if (!sider.value) {
        width = 0
      }
      else {
        width = siderRightFixed.value ? siderWidth.value + collapsedWidth : collapsedWidth
      }
      style[AdminLayoutCssVars.SiderCollapsedWidth] = `${collapsedWidth}px`
    }
    else {
      if (!sider.value) {
        width = 0
      }
      else {
        width = siderCollapsed.value ? siderCollapsedWidth.value : siderWidth.value
      }
    }
    style[AdminLayoutCssVars.SiderWidth] = `${width}px`
    style.gridTemplateColumns = `${width}px minmax(0, 1fr)`
    style.gridTemplateRows = `${_headerHeight.value}px minmax(0, 1fr)`
  }

  // skin 毛玻璃效果
  if (hasSkin.value) {
    style.backgroundImage = `url(${skin.value})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
    style.backgroundRepeat = 'no-repeat'
    style.backgroundColor = '#fff9'
    style.backdropFilter = 'blur(8px)'
    style.WebkitBackdropFilter = 'blur(8px)'
  }

  return style
})

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
  }
  if (headerFixed.value) {
    style.height = `calc(100vh - ${_headerHeight.value}px)`
  }
  if (contentFull.value) {
    style.zIndex = 2
  }
  return style
})

function renderHeader() {
  return h(Header, {}, {
    default: slots.header,
    prefix: slots['header-prefix'],
    suffix: slots['header-suffix'],
    logo: slots.logo,
    menu: slots.menu,
    parentMenu: slots['parent-menu'],
  })
}

function renderSider() {
  if (isMobile.value) {
    return h(SiderDrawer, {}, {
      default: slots.sider,
      logo: slots.logo,
      menu: slots.menu,
      header: slots['sider-header'],
      content: slots['sider-content'],
      footer: slots['sider-footer'],
    })
  }
  if (mode.value === 'top') {
    return null
  }
  return h(Sider, {}, {
    default: slots.sider,
    left: slots['sider-left'],
    right: slots['sider-right'],
    logo: slots.logo,
    header: slots['sider-header'],
    footer: slots['sider-footer'],
    leftHeader: slots['sider-left-header'],
    leftContent: slots['sider-left-content'],
    leftFooter: slots['sider-left-footer'],
    rightHeader: slots['sider-right-header'],
    rightContent: slots['sider-right-content'],
    rightFooter: slots['sider-right-footer'],
    menu: slots.menu,
    parentMenu: slots['parent-menu'],
  })
}

function renderContent() {
  return h(Content, {}, {
    default: slots.default,
    header: slots['content-header'],
    footer: slots['content-footer'],
    overlay: slots['content-overlay'],
  })
}

defineExpose({
  state: proxyRefs(state),
  toggleSiderRightFixed: state.toggleSiderRightFixed,
  toggleSiderCollapsed: state.toggleSiderCollapsed,
})
</script>

<template>
  <Scrollbar class="admin-layout-wrapper" v-bind="{ ...scrollbarProps, height: '100vh', nativeScrollbar: !(!headerFixed && !contentFull) }">
    <div class="admin-layout" :class="`admin-layout--${mode}`" :style="style">
      <header v-if="header" class="admin-layout__header">
        <component :is="renderHeader" />
      </header>
      <aside v-if="sider" class="admin-layout__sider">
        <component :is="renderSider" />
      </aside>
      <main class="admin-layout__main" :style="mainStyle">
        <Scrollbar v-bind="{ ...scrollbarProps, nativeScrollbar: !(headerFixed && !contentHeaderFixed && !contentFull), height: '100%' }">
          <component :is="renderContent">
            <slot name="default" v-bind="(state as any)" />
          </component>
        </Scrollbar>
      </main>
    </div>
  </Scrollbar>
</template>

<style lang="less">
:root {
  --text-color-light: #000;
  --text-color-dark: #fff;

  --border-color-light: rgb(224, 224, 230);
  --border-color-dark: rgba(255, 255, 255, 0.24);

  --scrollbar-color-light: rgba(0, 0, 0, 0.25);
  --scrollbar-color-dark: rgba(255, 255, 255, 0.25);

  --scrollbar-color-hover-light: rgba(0, 0, 0, 0.4);
  --scrollbar-color-hover-dark: rgba(255, 255, 255, 0.4);

  --admin-layout-duration: 0.3s;
  --admin-layout-bezier: cubic-bezier(0.4, 0, 0.2, 1);

  --admin-layout-base-color: #fff;
  --admin-layout-text-color: var(--text-color-light);
  --admin-layout-border-color: var(--border-color-light);
  --admin-layout-scrollbar-color: var(--scrollbar-color-light);
  --admin-layout-scrollbar-color-hover: var(--scrollbar-color-hover-light);
}

:root.dark {
  --admin-layout-base-color: #000;
  --admin-layout-text-color: var(--text-color-dark);
  --admin-layout-border-color: var(--border-color-dark);
  --admin-layout-scrollbar-color: var(--scrollbar-color-dark);
  --admin-layout-scrollbar-color-hover: var(--scrollbar-color-hover-dark);
}
</style>

<style scoped lang="less">
.admin-layout {
  display: grid;
  background-color: var(--admin-layout-base-color);
  color: var(--admin-layout-text-color);
  transition: all var(--admin-layout-duration) var(--admin-layout-bezier);

  &--side {
    grid-template-areas:
      'sider header'
      'sider main';
  }

  &--mix {
    grid-template-areas:
      'header header'
      'sider main';
  }

  &--top {
    grid-template-areas:
      'header'
      'main';
    grid-template-columns: minmax(0, 1fr);
  }

  &__header {
    grid-area: header;
  }

  &__sider {
    grid-area: sider;
    display: flex;
  }

  &__main {
    grid-area: main;
  }
}
</style>
