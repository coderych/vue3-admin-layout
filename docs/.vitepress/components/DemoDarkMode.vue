<script setup lang="ts">
import { AdminLayout } from '@packages'
import { ref } from 'vue'

const menuOptions = ref([
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'lucide:layout-dashboard',
  },
  {
    key: 'users',
    label: '用户管理',
    icon: 'lucide:users',
    children: [
      { key: 'user-list', label: '用户列表' },
      { key: 'user-add', label: '添加用户' },
    ],
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: 'lucide:settings',
  },
])
</script>

<template>
  <div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <div style="padding: 8px 16px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); font-size: 13px; position: relative; z-index: 10;">
      <span>使用右上角的主题切换按钮来切换暗黑模式</span>
    </div>
    <AdminLayout
      wrapper-height="400px"
      :menu-options="menuOptions"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          暗黑模式
        </h3>
        <p style="color: var(--vp-c-text-2);">
          组件自动检测暗黑主题，无需手动传入 prop。切换 VitePress 主题即可预览效果。
        </p>
      </div>
    </AdminLayout>
  </div>
</template>
