<script setup lang="ts">
import type { AdminLayoutInstance } from '@packages'
import { AdminLayout } from '@packages'
import { ref } from 'vue'

const layoutRef = ref<AdminLayoutInstance>()

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

function toggleCollapsed() {
  layoutRef.value?.toggleSiderCollapsed()
}
</script>

<template>
  <div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); font-size: 13px; position: relative; z-index: 10;">
      <button
        style="padding: 4px 12px; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-c-bg); color: var(--vp-c-text-1); cursor: pointer;"
        @click="toggleCollapsed"
      >
        切换侧边栏折叠
      </button>
    </div>
    <AdminLayout
      ref="layoutRef"
      wrapper-height="400px"
      :menu-options="menuOptions"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          组件实例
        </h3>
        <p style="color: var(--vp-c-text-2);">
          通过 <code>ref</code> 访问组件实例，可调用 <code>toggleSiderCollapsed()</code>、
          <code>toggleSiderRightFixed()</code>、<code>toggleContentFull()</code> 等方法。
        </p>
      </div>
    </AdminLayout>
  </div>
</template>
