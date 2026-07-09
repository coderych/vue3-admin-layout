<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useAdminLayoutState } from '../context'

const { collapsed = false } = defineProps<{
  collapsed?: boolean
}>()

const {
  // computed - props
  logo,
  logoUrl,
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
  <div v-if="logo && (logoUrl || title)" class="admin-layout-logo" :style="style">
    <img
      v-if="logoUrl"
      class="admin-layout-logo__image"
      :src="logoUrl"
      alt="logo"
    >
    <span v-if="title && !collapsed" class="admin-layout-logo__title">{{ title }}</span>
  </div>
</template>

<style scoped lang="less">
.admin-layout-logo {
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 12px;

  &__image {
    height: 68%;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    color: var(--primary-color);
  }
}
</style>
