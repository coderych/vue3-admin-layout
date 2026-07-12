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
  // composables
  overlayWidth,
  overlayHeight,
  // computed - props
  scrollbarProps,
  wrapperHeight,
  contentEmbedded,
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
} = state

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (hasSkin.value) {
    applySkinStyles(style)
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

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (contentHeaderFixed.value && headerFixed.value) {
    style.height = `calc(${wrapperHeight.value} - ${_contentHeaderHeight.value}px - ${contentFull.value ? 0 : _headerHeight.value}px)`
  }
  if (!hasSkin.value && contentEmbedded.value) {
    style.backgroundColor = 'var(--admin-layout-embedded-color)'
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
    <Scrollbar v-bind="{ ...scrollbarProps, nativeScrollbar: !(contentFull && !contentHeaderFixed) || scrollbarProps?.nativeScrollbar, height: contentFull ? wrapperHeight : '100%' }">
      <div v-if="contentHeader" class="admin-layout-main__header" :style="contentHeaderStyle">
        <slot name="header" v-bind="contentProps" />
      </div>
      <div class="admin-layout-main__content" :style="contentStyle">
        <Scrollbar v-bind="{ ...scrollbarProps, nativeScrollbar: !(headerFixed && contentHeaderFixed) || scrollbarProps?.nativeScrollbar, height: '100%' }">
          <div :style="innerStyle">
            <slot name="default" v-bind="contentProps" />
          </div>
          <div v-if="contentFooter" :style="contentFooterStyle" class="admin-layout-main__footer">
            <slot name="footer" v-bind="contentProps" />
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
