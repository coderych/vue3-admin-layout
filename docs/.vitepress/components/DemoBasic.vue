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
    children: [
      { key: 'setting-basic', label: '基础设置' },
      { key: 'setting-advanced', label: '高级设置' },
    ],
  },
])

const activeKey = ref('dashboard')
</script>

<template>
  <div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <AdminLayout
      wrapper-height="400px"
      :active-key="activeKey"
      :menu-options="menuOptions"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          基础侧边栏布局
        </h3>
        <p style="color: var(--vp-c-text-2);">
          这是默认的 side 模式布局，侧边栏在左侧，头部在右侧顶部。
        </p>
      </div>
    </AdminLayout>
  </div>
</template>
