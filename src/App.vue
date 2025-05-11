<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { AdminLayout, Scrollbar } from '../packages'

const isDark = useDark()
</script>

<template>
  <AdminLayout :header-fixed="true" mode="side">
    <template #header-suffix>
      <div @click="isDark = !isDark">
        {{ isDark ? '☀️' : '🌙' }}
      </div>
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
      <h1>Hello World</h1>
    </div>
  </AdminLayout>
</template>

<style scoped>

</style>
