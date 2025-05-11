<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { AdminLayout, Scrollbar } from '../packages'

const isDark = useDark()
</script>

<template>
  <AdminLayout :header-fixed="true" mode="side" sider-theme="#000" header-theme="#000">
    <template #header-prefix>
      <div @click="isDark = !isDark">
        {{ isDark ? '☀️' : '🌙' }}
      </div>
    </template>

    <template #header>
      <div class="w-10000px">
        Header
      </div>
    </template>

    <template #prefix>
      Prefix
    </template>

    <template #suffix>
      Suffix
    </template>

    <template #sider-left>
      <Scrollbar>
        <div v-for="i in 30" :key="i" style="height: 100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>
    <template #sider-right>
      <Scrollbar>
        <div v-for="i in 30" :key="i" style="height: 100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <template #sider>
      <Scrollbar>
        <div v-for="i in 30" :key="i" style="height: 100px">
          {{ i }}
        </div>
      </Scrollbar>
    </template>

    <div>
      <h1 v-for="i in 30" :key="i">
        Hello World
      </h1>
    </div>
  </AdminLayout>
</template>

<style scoped>

</style>
