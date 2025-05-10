import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    dts({
      include: ['packages/**/*.{ts,vue}'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './packages/index.ts'),
      name: 'AdminLayout',
      fileName: format => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['vue', 'simplebar-vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },

})
