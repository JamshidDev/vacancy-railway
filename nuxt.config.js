import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default {
  ssr:false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'HRM Business',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-2.png' }
      ]
    }
  },
  runtimeConfig:{
    secretKey:'Key_secret',
    public:{
      apiBase:process.env.API_URL,
    }
  },
  modules:
       ['@nuxtjs/i18n', '@pinia/nuxt', 'nuxtjs-naive-ui'],
  plugins: [
    '~/plugins/auth-listener.client.js',
    '~/plugins/mask.client.js',
    '~/plugins/moment.client.js',
    '~/plugins/i18n.client.js',
    '~/plugins/localePath.client.js',
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  i18n: {
    restructureDir: false,
    defaultLocale: 'uz',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: false,
    locales: [
      { code: 'uz', name: 'Uzbek', file: 'uz.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Russian', file: 'ru.json' }
    ],
  },
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