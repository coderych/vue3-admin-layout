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
    key: 'content',
    label: '内容管理',
    icon: 'lucide:file-text',
    children: [
      { key: 'article', label: '文章管理' },
      { key: 'category', label: '分类管理' },
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
    <AdminLayout
      wrapper-height="400px"
      mode="side"
      :split-menu="true"
      :menu-options="menuOptions"
      title="Admin Layout"
    >
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 8px;">
          拆分菜单模式
        </h3>
        <p style="color: var(--vp-c-text-2);">
          左侧显示一级菜单图标，右侧显示对应的子菜单项。适用于菜单层级较多的管理后台。
        </p>
      </div>
    </AdminLayout>
  </div>
</template>
