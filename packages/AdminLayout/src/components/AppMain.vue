<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AdminLayoutContentProps } from '../typing'
import { useElementSize } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { CssVars } from '../typing'

defineSlots<{
  prefix: () => any
  suffix: () => any
  default: (props: AdminLayoutContentProps) => any
}>()

const state = useAdminLayoutState()
const {
  prefix,
  _prefixHeight,
  suffix,
  _suffixHeight,
  prefixFixed,
  _headerHeight,
  isFull,
  suffixFixed,
  headerFixed,
} = state

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    backgroundColor: `var(${CssVars.BgColor})`,
    color: `var(${CssVars.TextColor})`,
  }
  return style
})

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (prefixFixed.value && headerFixed.value) {
    style.height = `calc(100vh - ${_prefixHeight.value}px - ${isFull.value ? 0 : _headerHeight.value}px)`
  }
  return style
})

const prefixStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_prefixHeight.value}px`,
    backgroundColor: `var(${CssVars.BaseColor})`,
  }
  return style
})

const suffixStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_suffixHeight.value}px`,
    backgroundColor: `var(${CssVars.BgColor})`,
  }
  if (suffixFixed.value) {
    style.position = 'sticky'
    style.bottom = 0
  }
  return style
})

const emptyRef = ref<HTMLDivElement>()
const emptyStyle = ref<CSSProperties>({
  position: 'fixed',
  bottom: 0,
  top: 0,
  visibility: 'hidden',
  left: '-9999px',
})
const { height: contentHeight } = useElementSize(emptyRef)

watchEffect(() => {
  emptyStyle.value.top = `${_prefixHeight.value + _suffixHeight.value + (isFull.value ? 0 : _headerHeight.value)}px`
})

const innerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    minHeight: `${contentHeight.value}px`,
  }
  style['--content-height'] = style.minHeight
  return style
})
</script>

<template>
  <div class="admin-layout-main" :style="mainStyle" :class="{ 'admin-layout-main--full': isFull }">
    <Scrollbar :class="{ 'h-screen': isFull }" :native-scrollbar="!(isFull && !prefixFixed)">
      <div v-if="prefix" class="admin-layout-main-prefix border-bottom" :style="prefixStyle">
        <slot name="prefix" v-bind="state" />
      </div>
      <div class="admin-layout-main-content" :style="contentStyle">
        <Scrollbar class="h-full" :native-scrollbar="!(headerFixed && prefixFixed)">
          <div :style="innerStyle">
            <slot name="default" v-bind="{ ...(state as any), contentHeight }" />
          </div>
          <div v-if="suffix" :style="suffixStyle" class="admin-layout-main-suffix">
            <slot name="suffix" />
          </div>
          <div ref="emptyRef" :style="emptyStyle" />
        </Scrollbar>
      </div>
    </Scrollbar>
  </div>
</template>

<style scoped lang="less">
.admin-layout-main--full {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  overflow: hidden;
}

.admin-layout-main-prefix {
  overflow: hidden;
  display: flex;
  align-items: center;
  will-change: transform;
  position: relative;
}

.admin-layout-main-suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
}
</style>
