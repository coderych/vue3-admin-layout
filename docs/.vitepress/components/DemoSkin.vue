<script setup lang="ts">
import { AdminLayout } from '@packages'
import { ref } from 'vue'

const skinImages = [
  '',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
]
const currentSkin = ref('')

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
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); font-size: 13px; position: relative; z-index: 10;">
      <span>毛玻璃皮肤：</span>
      <select v-model="currentSkin" style="padding: 2px 6px; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-c-bg); color: var(--vp-c-text-1);">
        <option value="">
          无
        </option>
        <option v-for="(_, idx) in skinImages.slice(1)" :key="idx" :value="skinImages[idx + 1]">
          图片 {{ idx + 1 }}
        </option>
      </select>
    </div>
    <AdminLayout
      wrapper-height="400px"
      :menu-options="menuOptions"
      :skin="currentSkin || undefined"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          毛玻璃皮肤
        </h3>
        <p style="color: var(--vp-c-text-2);">
          通过 <code>skin</code> prop 传入背景图片 URL，侧边栏和头部自动应用毛玻璃效果。
          暗黑模式下毛玻璃效果会自动禁用。
        </p>
      </div>
    </AdminLayout>
  </div>
</template>
