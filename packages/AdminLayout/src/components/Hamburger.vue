<script setup lang="ts">
const collapsed = defineModel('value', { default: false })

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    collapsed.value = !collapsed.value
  }
}
</script>

<template>
  <div
    class="admin-layout-hamburger"
    role="button"
    tabindex="0"
    :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    :aria-expanded="!collapsed"
    @click="collapsed = !collapsed"
    @keydown="handleKeydown"
  >
    <div v-if="!collapsed" class="i-ant-design:menu-fold-outlined" />
    <div v-else class="i-ant-design:menu-unfold-outlined" />
  </div>
</template>

<style scoped lang="less">
.admin-layout-hamburger {
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--admin-layout-duration) var(--admin-layout-bezier);
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
