<script setup lang="ts">
const collapsed = defineModel('value', { default: false })
</script>

<template>
  <div class="admin-layout-hamburger" @click="collapsed = !collapsed">
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
  z-index: 8;
  transition: background-color var(--admin-layout-transition-duration) var(--admin-layout-transition-bezier);
  font-size: 16px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
