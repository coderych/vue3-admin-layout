import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      warn: true,
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        'ant-design': () => import('@iconify/json/json/ant-design.json').then(i => i.default),
        'lucide': () => import('@iconify/json/json/lucide.json').then(i => i.default),
      },
    }),
  ],
})
