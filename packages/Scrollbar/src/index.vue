<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import { ref } from 'vue'
import { scrollbarProps } from './typing'
import 'simplebar-vue/dist/simplebar.min.css'

defineProps(scrollbarProps)

const emit = defineEmits(['scroll'])

const simplebarRef = ref<any>()

defineExpose(new Proxy({}, {
  get: (_, key) => simplebarRef.value?.[key],
  has: (_, key) => key in simplebarRef.value,
}))
</script>

<template>
  <Simplebar ref="simplebarRef" :auto-hide="trigger === 'hover'" class="h-full" :class="{ 'overflow-x-hidden': !xScrollable }" v-bind="$attrs" @scroll="emit('scroll', $event)">
    <slot />
  </Simplebar>
</template>

<style lang="less">
.simplebar-scrollbar::before {
  background-color: var(--admin-layout-scrollbar-color);
  border-radius: var(--admin-layout-scrollbar-border-radius);
  cursor: pointer;
}

.simplebar-scrollbar.simplebar-visible.simplebar-hover::before {
  background-color: var(--admin-layout-scrollbar-hover-color);
}

.simplebar-horizontal {
  .simplebar-scrollbar::before {
    height: var(--admin-layout-scrollbar-size) !important;
  }
}

.simplebar-vertical {
  .simplebar-scrollbar::before {
    width: var(--admin-layout-scrollbar-size) !important;
  }
}
</style>
