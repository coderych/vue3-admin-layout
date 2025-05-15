<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useAdminLayoutState } from '../context'

const { collapsed = false } = defineProps<{
  collapsed?: boolean
}>()

const {
  logoUrl,
  logo,
  title,
  headerHeight,
  siderWidth,
  siderCollapsedWidth,
} = useAdminLayoutState()

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${headerHeight.value}px`,
    width: collapsed ? `${siderCollapsedWidth.value}px` : `${siderWidth.value}px`,
  }

  return style
})
</script>

<template>
  <div v-if="logo && (logoUrl || title)" class="logo-container" :style="{ ...style }">
    <img v-if="logoUrl" :src="logoUrl" alt="logo">
    <span v-if="title && !collapsed">{{ title }}</span>
  </div>
</template>

<style scoped>
.logo-container {
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 12px;
}

.logo-container img {
  height: 68%;
}

.logo-container span {
  font-size: 18px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 700;
  color: var(--primary-color);
}
</style>
