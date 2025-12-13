<script setup lang="ts">
import type { AdminLayoutProps, LayoutType } from '../packages'
import { useDark } from '@vueuse/core'
import { computed, ref } from 'vue'
import { AdminLayout, Scrollbar } from '../packages'

const isDark = useDark()
const collapsed = ref(true)
const siderFixed = ref(false)
const headerFixed = ref(true)
const prefixFixed = ref(true)
const isFull = ref(false)
const isMobile = ref(false)
const mode = ref<LayoutType>('side')

const props = computed<AdminLayoutProps>(() => ({
  headerFixed: headerFixed.value,
  prefixFixed: prefixFixed.value,
  isFull: isFull.value,
  isMobile: isMobile.value,
  mode: mode.value,
  // mode: 'side',
  // mode: 'mix',
  // mode: 'top',
  // splitMenu: false,
  title: 'Admin Layout',
  // logo: false,
  // isMobile: true,
  // suffixFixed: true,
  logoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  // siderTheme: '#07010E',
  // nativeScrollbar: true,
}))

function getCount() {
  const simplebarEls = document.querySelectorAll('.simplebar-wrapper')
  const nativeEls = document.querySelectorAll('.native-scrollbar')
  console.log(simplebarEls)
  console.log(nativeEls)

  console.log(simplebarEls.length, nativeEls.length)
}
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
      <div v-for="i in 40" :key="i" class="border-right w-100px">
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
      <div @click="headerFixed = !headerFixed">
        headerFixed {{ headerFixed }}
      </div>
      <div @click="prefixFixed = !prefixFixed">
        prefixFixed {{ prefixFixed }}
      </div>
      <div @click="isFull = !isFull">
        isFull {{ isFull }}
      </div>
      <div @click="isMobile = !isMobile">
        isMobile {{ isMobile }}
      </div>

      current mode: {{ mode }}
      <div @click="mode = 'top'">
        top
      </div>

      <div @click="mode = 'side'">
        side
      </div>

      <div @click="mode = 'mix'">
        mix
      </div>
      <div @click="getCount">
        统计 Simplebar 数量
      </div>
      {{ props }}
      <div v-for="i in 30" :key="i" class="border-bottom h-100px border-red">
        Hello World
      </div>
    </div>
  </AdminLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
