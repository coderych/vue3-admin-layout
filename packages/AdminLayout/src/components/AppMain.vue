<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutContentProps } from '../typing'
import { computed, proxyRefs } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { applySkinStyles } from '../helper'
import { CssVars } from '../typing'

defineSlots<{
  header: (props: AdminLayoutContentProps) => any
  footer: (props: AdminLayoutContentProps) => any
  default: (props: AdminLayoutContentProps) => any
  overlay: (props: AdminLayoutContentProps) => any
}>()

const state = useAdminLayoutState()
const {
  contentHeader,
  _contentHeaderHeight,
  contentFooter,
  _contentFooterHeight,
  contentHeaderFixed,
  _headerHeight,
  isFull,
  contentFooterFixed,
  headerFixed,
  contentTop,
  overlayHeight,
  contentLeft,
  overlayRef,
  contentBottom,
  overlayWidth,
  contentWidth,
  scrollbarProps,
  hasSkin,
} = state

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    color: `var(${CssVars.TextColor})`,
  }
  if (hasSkin.value) {
    applySkinStyles(style, false)
  }
  else {
    style.backgroundColor = `var(${CssVars.BgColor})`
  }
  return style
})

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (contentHeaderFixed.value && headerFixed.value) {
    style.height = `calc(100vh - ${_contentHeaderHeight.value}px - ${isFull.value ? 0 : _headerHeight.value}px)`
  }
  return style
})

const contentHeaderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_contentHeaderHeight.value}px`,
  }
  if (hasSkin.value) {
    applySkinStyles(style, false)
  }
  else {
    style.backgroundColor = `var(${CssVars.BaseColor})`
  }
  return style
})

const contentFooterStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_contentFooterHeight.value}px`,
  }
  if (hasSkin.value) {
    applySkinStyles(style, false)
  }
  else {
    style.backgroundColor = `var(${CssVars.BgColor})`
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
  <div class="admin-layout-main" :style="mainStyle" :class="{ 'admin-layout-main--full': isFull }">
    <Scrollbar v-bind="{ ...scrollbarProps, nativeScrollbar: !(isFull && !contentHeaderFixed), height: isFull ? '100vh' : '100%' }">
      <div v-if="contentHeader" class="admin-layout-main__header border-bottom" :style="contentHeaderStyle">
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
  &--full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  &__header {
    overflow: hidden;
    display: flex;
    align-items: center;
    will-change: transform;
    position: relative;
  }

  &__content {
    display: block;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
</style>
