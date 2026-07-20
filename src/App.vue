<script setup lang="ts">
import type { AdminLayoutInstance, AdminLayoutProps } from '../packages'
import { useDark } from '@vueuse/core'
import { computed, reactive, ref, watch } from 'vue'
import { AdminLayout } from '../packages'

const isDark = useDark()
const adminLayoutRef = ref<AdminLayoutInstance>()

const skinImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
]
const currentSkin = ref<string | undefined>(undefined)

const scrollbarConfig = reactive({
  size: 5,
  autoHide: false,
  xScrollable: false,
  nativeScrollbar: false,
})

const props = ref<AdminLayoutProps>({
  // 布局模式
  mode: 'side',
  splitMenu: true,
  siderCollapsed: false,
  isMobile: false,
  wrapperHeight: '100vh',

  // Menu
  menuOptions: [],
  activeKey: undefined,
  accordion: false,

  // Logo
  logo: true,
  logoUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  title: 'Admin Layout',

  // Header
  header: true,
  headerHeight: 48,
  headerFixed: true,
  headerBordered: true,
  headerTheme: '',

  // Sider
  sider: true,
  siderWidth: 200,
  siderCollapsedWidth: 48,
  siderRightFixed: false,
  siderBordered: true,
  siderTheme: '',

  // Content Header
  contentFull: false,
  contentHeader: true,
  contentHeaderHeight: 36,
  contentHeaderFixed: true,
  contentHeaderBordered: true,

  // Content Footer
  contentFooter: true,
  contentFooterHeight: 32,
  contentFooterFixed: true,

  // Content
  contentWidth: '100%',

  // Scrollbar
  scrollbarProps: scrollbarConfig,
})

const state = computed(() => adminLayoutRef.value?.state)

function getCount() {
  const simplebarEls = document.querySelectorAll('.simplebar-wrapper')
  const nativeEls = document.querySelectorAll('.native-scrollbar')
  console.log(simplebarEls)
  console.log(nativeEls)

  console.log(simplebarEls.length, nativeEls.length)
}

function click(value: any) {
  console.log(value)
  console.log(value.state.isDark)
  console.log(state.value)
  console.log(adminLayoutRef.value?.state?.isDark)
}

watch(() => adminLayoutRef.value?.state?.isDark, (value) => {
  console.log('isDark change', value)
})
</script>

<template>
  <AdminLayout ref="adminLayoutRef" v-bind="props" :skin="currentSkin">
    <template #header-prefix="{ inverted }">
      {{ inverted }}
    </template>

    <template #header-suffix="slotProps">
      <div
        :style="{ height: `${slotProps.state.headerHeight}px` }"
        @click="click(slotProps)"
      >
        click
      </div>
      <div
        v-for="i in 30"
        :key="i"
        class="border-right w-100px"
      >
        {{ i }}
      </div>
    </template>

    <template #content-header>
      <div
        v-for="i in 40"
        :key="i"
        class="border-right w-100px"
      >
        {{ i }}
      </div>
    </template>

    <template #content-footer>
      footer
    </template>

    <template #parent-menu="menuProps">
      Parent Menu:
      {{ menuProps }}
    </template>
    <template #menu="menuProps">
      Menu:
      {{ menuProps }}
      <div
        v-for="i in 30"
        :key="i"
        class="border-bottom h-100px"
      >
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
      <button @click="siderProps.state?.toggleSiderCollapsed(!siderProps.state?.siderCollapsed.value)">
        toggleSiderRightFixed
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

    <template #default="defaultProps">
      {{ defaultProps.scrollHeight }}
      isDark: <input v-model="isDark" type="checkbox"><br>
      skin:
      <select v-model="currentSkin">
        <option :value="undefined">
          无
        </option>
        <option v-for="(img, idx) in skinImages" :key="idx" :value="img">
          图片 {{ idx + 1 }}
        </option>
      </select>
      <br>

      <h4 class="mb-4px mt-12px font-bold">
        Layout
      </h4>
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
      splitMenu: <input v-model="props.splitMenu" type="checkbox"><br>
      siderCollapsed: <input v-model="props.siderCollapsed" type="checkbox"><br>
      contentFull: <input v-model="props.contentFull" type="checkbox"><br>
      isMobile: <input v-model="props.isMobile" type="checkbox"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Logo
      </h4>
      logo: <input v-model="props.logo" type="checkbox"><br>
      title: <input v-model="props.title" type="text"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Header
      </h4>
      header: <input v-model="props.header" type="checkbox"><br>
      headerHeight: <input
        v-model.number="props.headerHeight"
        type="number"
        min="0"
        step="1"
      ><br>
      headerFixed: <input v-model="props.headerFixed" type="checkbox"><br>
      headerBordered: <input v-model="props.headerBordered" type="checkbox"><br>
      headerTheme: <input v-model="props.headerTheme" type="color"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Sider
      </h4>
      sider: <input v-model="props.sider" type="checkbox"><br>
      siderWidth: <input
        v-model.number="props.siderWidth"
        type="number"
        min="0"
        step="1"
      ><br>
      siderCollapsedWidth: <input
        v-model.number="props.siderCollapsedWidth"
        type="number"
        min="0"
        step="1"
      ><br>
      siderRightFixed: <input v-model="props.siderRightFixed" type="checkbox"><br>
      siderBordered: <input v-model="props.siderBordered" type="checkbox"><br>
      siderTheme: <input v-model="props.siderTheme" type="color"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Content Header
      </h4>
      contentHeader: <input v-model="props.contentHeader" type="checkbox"><br>
      contentHeaderHeight: <input
        v-model.number="props.contentHeaderHeight"
        type="number"
        min="0"
        step="1"
      ><br>
      contentHeaderFixed: <input v-model="props.contentHeaderFixed" type="checkbox"><br>
      contentHeaderBordered: <input v-model="props.contentHeaderBordered" type="checkbox"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Content Footer
      </h4>
      contentFooter: <input v-model="props.contentFooter" type="checkbox"><br>
      contentFooterHeight: <input
        v-model.number="props.contentFooterHeight"
        type="number"
        min="0"
        step="1"
      ><br>
      contentFooterFixed: <input v-model="props.contentFooterFixed" type="checkbox"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Content
      </h4>
      contentWidth: <input v-model="props.contentWidth" type="text"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Menu
      </h4>
      accordion: <input v-model="props.accordion" type="checkbox"><br>
      activeKey: <input v-model="props.activeKey" type="text" placeholder="undefined"><br>

      <h4 class="mb-4px mt-12px font-bold">
        Scrollbar
      </h4>
      scrollbar.size: <input
        v-model.number="scrollbarConfig.size"
        type="number"
        min="0"
        step="1"
      ><br>
      scrollbar.autoHide: <input v-model="scrollbarConfig.autoHide" type="checkbox"><br>
      scrollbar.xScrollable: <input v-model="scrollbarConfig.xScrollable" type="checkbox"><br>
      scrollbar.nativeScrollbar: <input v-model="scrollbarConfig.nativeScrollbar" type="checkbox"><br>

      {{ state }}

      <button @click="getCount">
        统计 Simplebar 数量
      </button>
      <br>

      {{ defaultProps }}
      contentHeight: {{ defaultProps.height }}<br>
      <div
        v-for="i in 30"
        :key="i"
        class="border-bottom h-100px border-red"
      >
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

body {
  /* background-color: #000; */
}
</style>
