<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Simplebar from 'simplebar-vue'
import { computed, ref } from 'vue'
import { scrollbarProps } from './typing'
import 'simplebar-vue/dist/simplebar.min.css'

const props = defineProps(scrollbarProps)

const emit = defineEmits(['scroll'])

const simplebarRef = ref<any>()

const style = computed<CSSProperties>(() => ({
  'height': props.height,
  'overflow-x': props.xScrollable ? 'visible' : 'hidden',
  '--scrollbar-size': `${props.size}px`,
}))

defineExpose(new Proxy({}, {
  get: (_, key) => simplebarRef.value?.[key],
  has: (_, key) => key in simplebarRef.value,
}))
</script>

<template>
  <Simplebar
    v-if="!nativeScrollbar"
    ref="simplebarRef"
    v-bind="$attrs"
    :auto-hide="autoHide"
    :style="style"
    @scroll="emit('scroll', $event)"
  >
    <slot />
  </Simplebar>
  <div
    v-else
    ref="simplebarRef"
    v-bind="$attrs"
    :style="style"
  >
    <slot />
  </div>
</template>

<style lang="less">
.simplebar-scrollbar::before {
  background-color: var(--admin-layout-scrollbar-color);
  border-radius: 5px;
  cursor: pointer;
  transition-delay: 2s;
}

.simplebar-scrollbar.simplebar-visible.simplebar-hover::before {
  background-color: var(--admin-layout-scrollbar-color-hover);
}

.simplebar-horizontal {
  .simplebar-scrollbar::before {
    height: var(--scrollbar-size) !important;
  }
}

.simplebar-vertical {
  .simplebar-scrollbar::before {
    width: var(--scrollbar-size) !important;
  }
}
</style>
