import { resolve } from 'node:path'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { rules, shortcuts } from './src/unocss'

const iconDirectory = resolve(__dirname, 'icons')

export default defineConfig({
  shortcuts,
  rules,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        custom: FileSystemIconLoader(iconDirectory),
      },
    }),
  ],
})
