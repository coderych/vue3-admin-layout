<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref } from 'vue'
import { Scrollbar } from '../../../Scrollbar'
import { useAdminLayoutState } from '../context'
import { borderStyle } from '../helper'
import { CssVars } from '../typing'

defineSlots<{
  prefix: () => any
  suffix: () => any
  default: () => any
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
  isDark,
  suffixFixed,
} = state
const scrollbarRef = ref<any>()

const mainStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    backgroundColor: `var(${CssVars.BgColor})`,
  }
  return style
})

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (prefixFixed.value) {
    style.height = `calc(100vh - ${_prefixHeight.value}px - ${isFull.value ? 0 : _headerHeight.value}px)`
  }
  return style
})

const prefixStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${_prefixHeight.value}px`,
    backgroundColor: `var(${CssVars.BaseColor})`,
    ...borderStyle('bottom', isDark.value),
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

const innerStyle = computed<CSSProperties>(() => {
  const hegiht = `calc(100vh - ${_prefixHeight.value}px - ${_suffixHeight.value}px - ${isFull.value ? 0 : _headerHeight.value}px)`
  return {
    'minHeight': hegiht,
    '--content-height': hegiht,
  }
})
</script>

<template>
  <div class="admin-layout-main" :style="mainStyle" :class="{ 'admin-layout-main--full': isFull }">
    <Scrollbar :class="{ 'h-screen': isFull }">
      <div v-if="prefix" class="admin-layout-main-prefix" :style="prefixStyle">
        <slot name="prefix" v-bind="state" />
      </div>
      <div class="admin-layout-main-content" :style="contentStyle">
        <Scrollbar ref="scrollbarRef" class="h-full flex">
          <div :style="innerStyle">
            <slot name="default" />
          </div>
          <div v-if="suffix" :style="suffixStyle" class="admin-layout-main-suffix">
            <slot name="suffix" />
          </div>
        </Scrollbar>
      </div>
    </Scrollbar>
  </div>
</template>

<style scoped>
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
}

.admin-layout-main-suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
}
</style>
