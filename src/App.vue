<script setup lang="ts">
import type { AdminLayoutInstance, AdminLayoutProps } from '../packages'
import { useDark } from '@vueuse/core'
import { computed, ref } from 'vue'
import { AdminLayout } from '../packages'

const isDark = useDark()
const adminLayoutRef = ref<AdminLayoutInstance>()
const props = ref<AdminLayoutProps>({
  headerFixed: true,
  contentHeaderFixed: true,
  siderFixed: false,
  isFull: false,
  isMobile: false,
  mode: 'side',
  splitMenu: true,
  title: 'Admin Layout',
  contentFooterFixed: true,
  logoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  header: true,
  contentHeader: true,
  contentFooter: true,
})

function getCount() {
  const simplebarEls = document.querySelectorAll('.simplebar-wrapper')
  const nativeEls = document.querySelectorAll('.native-scrollbar')
  console.log(simplebarEls)
  console.log(nativeEls)

  console.log(simplebarEls.length, nativeEls.length)
}

const state = computed(() => adminLayoutRef.value?.state)

function click(value: any) {
  console.log(value)
}
</script>

<template>
  <AdminLayout ref="adminLayoutRef" v-bind="props">
    <template #header-contentHeader>
      <div @click="isDark = !isDark">
        {{ isDark ? '☀️' : '🌙' }}
      </div>
    </template>

    <template #header="slotProps">
      <!-- <div v-for="i in 30" :key="i" class="border-right w-100px">
        {{ i }}
      </div> -->
      <div :style="{ height: `${slotProps.state?.headerHeight.value}px` }" @click="click(slotProps)">
        click
      </div>
    </template>

    <template #content-header>
      <div v-for="i in 40" :key="i" class="border-right w-100px">
        {{ i }}
      </div>
    </template>

    <template #content-footer>
      footer
    </template>

    <template #parent-menu="menuProps">
      Parent Menu:
      {{ menuProps }}
      <div v-for="i in 30" :key="i" class="border-bottom h-100px">
        {{ i }}
      </div>
    </template>
    <template #menu="menuProps">
      Menu:
      {{ menuProps }}
      <div v-for="i in 30" :key="i" class="border-bottom h-100px">
        {{ i }}
      </div>
    </template>

    <template #sider>
      <!-- <div v-for="i in 30" :key="i" class="border-bottom h-100px">
        {{ i }}
      </div> -->
    </template>
    <template #sider-header="siderProps">
      <div :style="{ height: `${siderProps.headerHeight}px`, flexShrink: 0 }">
        Sider Header
      </div>
    </template>
    <template #sider-footer>
      <!-- <div /> -->
    </template>

    <template #sider-left-header>
      Sider Left Header
    </template>
    <!-- <template #sider-left-footer="siderProps">
      <button @click="siderProps.state?.toggleCollapsed(!siderProps.state?.collapsed.value)">
        toggleSiderFixed
      </button>
    </template> -->

    <template #sider-right-header="siderProps">
      <div :style="{ height: `${siderProps.headerHeight}px`, flexShrink: 0 }">
        Sider Right Header
      </div>
    </template>
    <!-- <template #sider-right-footer>
      Sider Right Footer
    </template> -->

    <template #default="{ contentHeight }">
      <Test />
      contentHeight: {{ contentHeight }}<br>

      isDark: <input v-model="isDark" type="checkbox"><br>
      headerFixed: <input v-model="props.headerFixed" type="checkbox"><br>
      contentHeaderFixed: <input v-model="props.contentHeaderFixed" type="checkbox"><br>
      contentFooterFixed: <input v-model="props.contentFooterFixed" type="checkbox"><br>
      isFull: <input v-model="props.isFull" type="checkbox"><br>
      isMobile: <input v-model="props.isMobile" type="checkbox"><br>
      header: <input v-model="props.header" type="checkbox"><br>
      contentHeader: <input v-model="props.contentHeader" type="checkbox"><br>
      contentFooter: <input v-model="props.contentFooter" type="checkbox"><br>
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
      {{ state }}

      <button @click="getCount">
        统计 Simplebar 数量
      </button>
      <br>
      <div v-for="i in 30" :key="i" class="border-bottom h-100px border-red">
        Hello World
      </div>
    </template>

    <template #content-overlay>
      <!-- <div class="h-full bg-amber">
        123123
      </div> -->
    </template>

    <template #logo="logoProps">
      <div :style="{ width: `${logoProps.width}px`, height: `${logoProps.height}px` }" class="bg-red">
        logo
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
