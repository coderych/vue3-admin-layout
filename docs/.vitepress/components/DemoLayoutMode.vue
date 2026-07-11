<script setup lang="ts">
import { AdminLayout } from '@packages'
import { ref } from 'vue'

const mode = ref<'side' | 'mix' | 'top'>('side')

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
</script>

<template>
  <div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;">
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); font-size: 13px; position: relative; z-index: 10;">
      <span>布局模式：</span>
      <select v-model="mode" style="padding: 2px 6px; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-c-bg); color: var(--vp-c-text-1);">
        <option value="side">
          side（侧边栏）
        </option>
        <option value="mix">
          mix（混合）
        </option>
        <option value="top">
          top（顶部导航）
        </option>
      </select>
    </div>
    <AdminLayout
      wrapper-height="400px"
      :mode="mode"
      :menu-options="menuOptions"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          {{ mode === 'side' ? '侧边栏模式' : mode === 'mix' ? '混合模式' : '顶部导航模式' }}
        </h3>
        <p style="color: var(--vp-c-text-2);">
          当前模式：<code>{{ mode }}</code>
        </p>
      </div>
    </AdminLayout>
  </div>
</template>
