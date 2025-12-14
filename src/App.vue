<script setup lang="ts">
import type { AdminLayoutInstance, AdminLayoutProps } from '../packages'
import { useDark } from '@vueuse/core'
import { ref } from 'vue'
import { AdminLayout, Scrollbar } from '../packages'

const isDark = useDark()
const adminLayoutRef = ref<AdminLayoutInstance>()
const props = ref<AdminLayoutProps>({
  headerFixed: true,
  prefixFixed: true,
  siderFixed: false,
  isFull: false,
  isMobile: false,
  mode: 'side',
  splitMenu: true,
  title: 'Admin Layout',
  suffixFixed: true,
  logoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  header: true,
  prefix: true,
  suffix: true,
})

function getCount() {
  const simplebarEls = document.querySelectorAll('.simplebar-wrapper')
  const nativeEls = document.querySelectorAll('.native-scrollbar')
  console.log(simplebarEls)
  console.log(nativeEls)

  console.log(simplebarEls.length, nativeEls.length)
}
</script>

<template>
  <AdminLayout
    ref="adminLayoutRef" v-bind="props"
  >
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

    <template #sider-right="{ scrollHeight }">
      <Scrollbar :style="{ height: scrollHeight }">
        {{ scrollHeight }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <template #sider-left="{ scrollHeight }">
      <Scrollbar :style="{ height: scrollHeight }">
        {{ scrollHeight }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <template #sider="{ scrollHeight }">
      <Scrollbar :style="{ height: scrollHeight }">
        {{ scrollHeight }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <template #default="{ contentHeight }">
      <Scrollbar :style="{ height: `${contentHeight}px` }">
        contentHeight: {{ contentHeight }}<br>

        isDark: <input v-model="isDark" type="checkbox"><br>
        headerFixed: <input v-model="props.headerFixed" type="checkbox"><br>
        prefixFixed: <input v-model="props.prefixFixed" type="checkbox"><br>
        suffixFixed: <input v-model="props.suffixFixed" type="checkbox"><br>
        isFull: <input v-model="props.isFull" type="checkbox"><br>
        isMobile: <input v-model="props.isMobile" type="checkbox"><br>
        header: <input v-model="props.header" type="checkbox"><br>
        prefix: <input v-model="props.prefix" type="checkbox"><br>
        suffix: <input v-model="props.suffix" type="checkbox"><br>
        splitMenu: <input v-model="props.splitMenu" type="checkbox"><br>
        mode:
        <select v-model="props.mode">
          <option value="top">
            top
          </option>
          <option value="side">
            side
          </option>
          <option value="mix">
            mix
          </option>
        </select>
        <br>

        <button @click="getCount">
          统计 Simplebar 数量
        </button>
        <br>
        {{ adminLayoutRef?.contentWidth }} ||
        {{ adminLayoutRef?.contentHeight }} ||
        {{ adminLayoutRef?.contentTop }} ||
        {{ adminLayoutRef?.contentBottom }} ||
        {{ adminLayoutRef?.contentLeft }} ||
        <br>
        {{ props }}
        <div v-for="i in 30" :key="i" class="border-bottom h-100px border-red">
          Hello World
        </div>
      </Scrollbar>
    </template>

    <template #content-overlay>
      <div class="h-full bg-amber" />
    </template>

    <template #logo="{ width, height }">
      <div :style="{ width: `${width}px`, height: `${height}px` }">
        logo
      </div>
    </template>

    <template #sider-left-logo="{ width, height }">
      <div :style="{ width: `${width}px`, height: `${height}px` }">
        sider-left-logo
      </div>
    </template>

    <template #sider-right-title="{ width, height }">
      <div :style="{ width: `${width}px`, height: `${height}px` }">
        sider-left-title
      </div>
    </template>
  </AdminLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
