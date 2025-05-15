<script setup lang="ts">
import type { AdminLayoutProps } from '../packages'
import { useDark } from '@vueuse/core'
import { computed, ref } from 'vue'
import { AdminLayout, Scrollbar } from '../packages'

const isDark = useDark()
const collapsed = ref(true)
const siderFixed = ref(false)

const props = computed<AdminLayoutProps>(() => ({
  // headerFixed: false,
  // mode: 'side',
  // mode: 'mix',
  // mode: 'top',
  // splitMenu: false,
  title: 'Admin Layout',
  // logo: false,
  // isMobile: true,
  // suffixFixed: true,
  logoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  siderTheme: '#07010E',
}))
</script>

<template>
  <AdminLayout v-bind="props" v-model:collapsed="collapsed" v-model:sider-fixed="siderFixed">
    <template #header-prefix>
      <div @click="isDark = !isDark">
        {{ isDark ? '☀️' : '🌙' }}
      </div>
    </template>

    <template #header>
      <div v-for="i in 30" :key="i" class="border-right w-100px">
        {{ i }}
      </div>
    </template>

    <template #prefix>
      <div v-for="i in 30" :key="i" class="border-right w-100px">
        {{ i }}
      </div>
    </template>

    <template #suffix>
      Suffix
    </template>

    <template #sider-left="{ height }">
      <Scrollbar :style="{ height }">
        {{ height }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>
    <template #sider-right="{ height }">
      <Scrollbar :style="{ height }">
        {{ height }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <template #sider="{ height }">
      <Scrollbar :style="{ height }">
        {{ height }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <div>
      <div @click="isDark = !isDark">
        {{ isDark ? '☀️' : '🌙' }}
      </div>
      <div v-for="i in 30" :key="i" class="border-bottom h-100px border-red">
        Hello World
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>

</style>
