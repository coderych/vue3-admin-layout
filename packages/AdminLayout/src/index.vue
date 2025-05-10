<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutProps, SiderLeftProps } from './typing'
import { computed, h } from 'vue'
import { Scrollbar } from '../../Scrollbar'
import { AppMain, Header, MobileSider, Sider } from './components'
import { useAdminLayoutProvider } from './context'
import { adminLayoutProps, CssVars } from './typing'

const props = defineProps(adminLayoutProps)

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'update:siderFixed': [value: boolean]
}>()

const slots = defineSlots<{
  'default': (props: AdminLayoutProps) => void
  'header': (props: AdminLayoutProps) => void
  'sider': (props: AdminLayoutProps) => void
  'sider-left': (props: SiderLeftProps) => void
  'sider-right': (props: AdminLayoutProps) => void
  'prefix': (props: AdminLayoutProps) => void
  'suffix': (props: AdminLayoutProps) => void
  'header-prefix': (props: AdminLayoutProps) => void
  'header-suffix': (props: AdminLayoutProps) => void
}>()

const {
  header,
  mode,
  headerFixed,
  _headerHeight,
  siderWidth,
  collapsed,
  siderCollapsedWidth,
  isMobile,
  siderFixed,
  splitMenu,
  isDark,
  cssVars,
  sider,
} = useAdminLayoutProvider(props, slots, {
  onUpdateCollapsed: (value: boolean) => emit('update:collapsed', value),
  onUpdateSiderFixed: (value: boolean) => emit('update:siderFixed', value),
})

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    [CssVars.TextColor]: `#333`,
    [CssVars.TextColorInverted]: `#fff`,
    [CssVars.BorderColor]: `rgb(224, 224, 230)`,
    [CssVars.BorderColorInverted]: `rgb(50, 50, 50)`,
    [CssVars.TransitionDuration]: `0.2s`,
    [CssVars.TransitionBezier]: `cubic-bezier(0, 0, .2, 1)`,
  }

  if (isDark.value) {
    style[CssVars.BgColor] = `rgb(16, 16, 20)`
    style[CssVars.BaseColor] = `#18181C`
  }
  else {
    style[CssVars.BgColor] = `#f0f2f5`
    style[CssVars.BaseColor] = `#fff`
  }

  if (mode.value === 'top' || isMobile.value) {
    style.gridTemplateRows = `${_headerHeight.value}px minmax(0, 1fr)`
    if (mode.value !== 'top') {
      style.gridTemplateColumns = `0 minmax(0, 1fr)`
    }
    style[CssVars.SiderWidth] = `${0}px`
  }
  else if (mode.value === 'side' || mode.value === 'mix') {
    // 计算侧边栏宽度
    let width = 0
    if (mode.value === 'side' && splitMenu.value) {
      const collapsedWidth = siderCollapsedWidth.value >= 80 || collapsed.value ? siderCollapsedWidth.value : siderCollapsedWidth.value / 0.6

      if (!sider.value) {
        width = 0
      }
      else {
        width = siderFixed.value ? siderWidth.value + collapsedWidth : collapsedWidth
      }
      style[CssVars.SiderCollapsedWidth] = `${collapsedWidth}px`
    }
    else {
      if (!sider.value) {
        width = 0
      }
      else {
        width = collapsed.value ? siderCollapsedWidth.value : siderWidth.value
      }
    }
    style[CssVars.SiderWidth] = `${width}px`

    style.gridTemplateColumns = `${width}px minmax(0, 1fr)`
    style.gridTemplateRows = `${_headerHeight.value}px minmax(0, 1fr)`
  }

  Object.assign(style, cssVars.value)
  // 过渡效果
  style.transition = `all ${style[CssVars.TransitionDuration]} ${style[CssVars.TransitionBezier]}`

  return style
})

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    backgroundColor: `var(${CssVars.BgColor})`,
  }
  if (headerFixed.value) {
    style.height = `calc(100vh - ${_headerHeight.value}px)`
  }
  else {
    style.minHeight = `calc(100vh - ${_headerHeight.value}px)`
  }

  return style
})

function renderHeader() {
  return h(Header, {}, {
    default: slots.header,
    prefix: slots['header-prefix'],
    suffix: slots['header-suffix'],
  })
}

function renderSider() {
  if (isMobile.value) {
    return h(MobileSider, {}, {
      default: slots.sider,
    })
  }
  if (mode.value === 'top') {
    return null
  }
  return h(Sider, {}, {
    default: slots.sider,
    left: slots['sider-left'],
    right: slots['sider-right'],
  })
}

function renderContent() {
  return h(AppMain, {}, {
    default: slots.default,
    prefix: slots.prefix,
    suffix: slots.suffix,
  })
}
</script>

<template>
  <Scrollbar class="h-screen">
    <div class="admin-layout" :class="`admin-layout--${mode}`" :style="style">
      <header v-if="header" class="admin-layout-header-container">
        <component :is="renderHeader" />
      </header>
      <aside v-if="sider" class="admin-layout-sider-container">
        <component :is="renderSider" />
      </aside>
      <main class="admin-layout-main-container" :style="mainStyle">
        <Scrollbar>
          <component :is="renderContent">
            <slot name="default" v-bind="props" />
          </component>
        </Scrollbar>
      </main>
    </div>
  </Scrollbar>
</template>

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
}

.admin-layout-header-container {
  grid-area: header;
}

.admin-layout-sider-container {
  grid-area: sider;
  display: flex;
}

.admin-layout-main-container {
  grid-area: main;
  z-index: 99;
}
</style>
