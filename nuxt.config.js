import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import i18nConfig from "./i18n/index.js"

export default {
  ssr:false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig:{
    secretKey:'Key_secret',
    public:{
      apiBase:process.env.API_URL,
    }
  },
  modules:
       ['@nuxtjs/i18n', '@pinia/nuxt', 'nuxtjs-naive-ui'],
  plugins: [
    '~/plugins/mask.client.js',
    '~/plugins/moment.client.js',
    '~/plugins/i18n.client.js',
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  i18n:i18nConfig,
  vite: {
    plugins: [
      tailwindcss(),
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      })
    ],
  },
  css:['/assets/css/tailwind.css'],

}

// pages/**/ui/*.vue