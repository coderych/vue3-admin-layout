<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutContentProps, AdminLayoutHeaderProps, AdminLayoutLogoProps, AdminLayoutMenuProps, AdminLayoutSiderProps } from './typing'
import { computed, h, proxyRefs } from 'vue'
import { Scrollbar } from '../../Scrollbar'
import { AppMain, Header, MobileSider, Sider } from './components'
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
  header,
  mode,
  headerFixed,
  headerHeight,
  _headerHeight,
  siderWidth,
  siderCollapsed,
  siderCollapsedWidth,
  isMobile,
  siderRightFixed,
  splitMenu,
  contentFull,
  sider,
  skin,
  hasSkin,
} = state

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    [AdminLayoutCssVars.Duration]: '0.2s',
    [AdminLayoutCssVars.Bezier]: 'cubic-bezier(0, 0, .2, 1)',
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
      const collapsedWidth = siderCollapsedWidth.value >= 80 || siderCollapsed.value ? siderCollapsedWidth.value : siderCollapsedWidth.value / 0.6
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

  style.transition = `all ${style[AdminLayoutCssVars.Duration]} ${style[AdminLayoutCssVars.Bezier]}`

  return style
})

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    backgroundColor: 'var(--admin-layout-bg-color)',
  }
  if (headerFixed.value) {
    style.height = `calc(100vh - ${_headerHeight.value}px)`
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
    return h(MobileSider, {}, {
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
  return h(AppMain, {}, {
    default: slots.default,
    header: slots['content-header'],
    footer: slots['content-footer'],
    overlay: slots['content-overlay'],
  })
}

defineExpose({
  state: proxyRefs(state),
  toggleContentFull: state.toggleContentFull,
  toggleSiderRightFixed: state.toggleSiderRightFixed,
  toggleSiderCollapsed: state.toggleSiderCollapsed,
})
</script>

<template>
  <Scrollbar calss="admin-layout-wrapper" v-bind="{ ...scrollbarProps, height: '100vh', nativeScrollbar: !(!headerFixed && !contentFull) }">
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
            <slot name="default" v-bind="state" />
          </component>
        </Scrollbar>
      </main>
    </div>
  </Scrollbar>
</template>

<style lang="less">
.admin-layout-wrapper {
  --admin-layout-border-color: var(--admin-layout-border-color);
}
.dark .admin-layout-wrapper {
  --admin-layout-border-color: var(--admin-layout-border-color-dark);
}

:root {
  --red: red;
}

.border-bottom {
  border-bottom: 1px solid var(--admin-layout-border-color);
  box-sizing: border-box;
}

.border-right {
  border-right: 1px solid var(--admin-layout-border-color);
  box-sizing: border-box;
}

.border-top {
  border-top: 1px solid var(--admin-layout-border-color);
  box-sizing: border-box;
}
</style>

<style scoped lang="less">
.admin-layout {
  display: grid;

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
    z-index: 1;
  }
}
</style>
