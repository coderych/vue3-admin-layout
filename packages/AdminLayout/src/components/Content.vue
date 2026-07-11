<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutContentProps } from '../typing'
import { computed, proxyRefs } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { applySkinStyles } from '../helper'

defineSlots<{
  header: (props: AdminLayoutContentProps) => any
  footer: (props: AdminLayoutContentProps) => any
  default: (props: AdminLayoutContentProps) => any
  overlay: (props: AdminLayoutContentProps) => any
}>()

const state = useAdminLayoutState()
const {
  // refs
  overlayRef,
  // composables
  overlayWidth,
  overlayHeight,
  // computed - props
  scrollbarProps,
  contentFull,
  headerFixed,
  contentHeader,
  contentHeaderBordered,
  contentHeaderFixed,
  contentFooter,
  contentFooterFixed,
  contentWidth,
  // computed - derived
  _headerHeight,
  hasSkin,
  _contentHeaderHeight,
  _contentFooterHeight,
  contentTop,
  contentLeft,
  contentBottom,
} = state

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (hasSkin.value) {
    applySkinStyles(style)
  }
  return style
})

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (contentHeaderFixed.value && headerFixed.value) {
    style.height = `calc(100vh - ${_contentHeaderHeight.value}px - ${contentFull.value ? 0 : _headerHeight.value}px)`
  }
  return style
})

const contentHeaderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_contentHeaderHeight.value}px`,
  }
  if (!contentHeaderBordered.value) {
    style.borderBottom = 'none'
  }
  return style
})

const contentFooterStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_contentFooterHeight.value}px`,
  }
  if (contentFooterFixed.value) {
    style.position = 'sticky'
    style.bottom = 0
  }
  return style
})

const overlayStyle = computed<CSSProperties>(() => ({
  position: 'fixed',
  top: `${contentTop.value}px`,
  left: `${contentLeft.value}px`,
  bottom: `${contentBottom.value}px`,
  right: 0,
  zIndex: -999,
}))

const innerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    minHeight: `${overlayHeight.value}px`,
  }
  style['--content-height'] = style.minHeight
  return style
})

const contentProps = computed<AdminLayoutContentProps>(() => ({
  state: proxyRefs(state),
  height: overlayHeight.value,
  width: overlayWidth.value,
  scrollHeight: `${overlayHeight.value}px`,
  contentWidth: contentWidth.value,
}))
</script>

<template>
  <div class="admin-layout-main" :class="{ 'admin-layout-main--full': contentFull }" :style="mainStyle">
    <Scrollbar v-bind="{ ...scrollbarProps, nativeScrollbar: !(contentFull && !contentHeaderFixed), height: contentFull ? '100vh' : '100%' }">
      <div v-if="contentHeader" class="admin-layout-main__header" :style="contentHeaderStyle">
        <slot name="header" v-bind="contentProps" />
      </div>
      <div class="admin-layout-main__content" :style="contentStyle">
        <Scrollbar v-bind="{ ...scrollbarProps, height: '100%', nativeScrollbar: !(headerFixed && contentHeaderFixed) }">
          <div :style="innerStyle">
            <slot name="default" v-bind="contentProps" />
          </div>
          <div v-if="contentFooter" :style="contentFooterStyle" class="admin-layout-main__footer">
            <slot name="footer" v-bind="contentProps" />
          </div>
          <div ref="overlayRef" :style="overlayStyle">
            <slot name="overlay" v-bind="contentProps" />
          </div>
        </Scrollbar>
      </div>
    </Scrollbar>
  </div>
</template>

<style scoped lang="less">
.admin-layout-main {
  background-color: var(--admin-layout-base-color);

  &--full {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  &__header {
    overflow: hidden;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--admin-layout-border-color);
  }

  &__content {
    display: block;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
}
</style>
