<script setup lang="ts">
import { AdminLayout } from '@packages'
import { reactive } from 'vue'

const scrollbarConfig = reactive({
  size: 5,
  autoHide: true,
  nativeScrollbar: false,
})
</script>

<template>
  <div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <div style="display: flex; align-items: center; gap: 12px; padding: 8px 16px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); font-size: 13px; position: relative; z-index: 10;">
      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
        宽度：
        <input
          v-model.number="scrollbarConfig.size"
          type="number"
          min="2"
          max="20"
          style="width: 50px; padding: 2px 6px; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-c-bg); color: var(--vp-c-text-1);"
        >
        px
      </label>
      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
        <input v-model="scrollbarConfig.autoHide" type="checkbox">
        自动隐藏
      </label>
      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
        <input v-model="scrollbarConfig.nativeScrollbar" type="checkbox">
        原生滚动条
      </label>
    </div>
    <AdminLayout
      wrapper-height="350px"
      :menu-options="[
        { key: 'dashboard', label: '仪表盘', icon: 'lucide:layout-dashboard' },
        { key: 'users', label: '用户管理', icon: 'lucide:users' },
      ]"
      :scrollbar-props="scrollbarConfig"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          滚动条配置
        </h3>
        <p style="color: var(--vp-c-text-2);">
          通过 <code>scrollbarProps</code> 配置滚动条的宽度、是否自动隐藏、是否使用原生滚动条。
        </p>
        <div v-for="i in 20" :key="i" style="padding: 16px 0; border-bottom: 1px solid var(--vp-c-divider);">
          滚动内容行 {{ i }}
        </div>
      </div>
    </AdminLayout>
  </div>
</template>
