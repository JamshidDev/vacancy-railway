import tailwindcss from "@tailwindcss/vite";
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default {
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig:{
    secretKey:'Key_secret',
    public:{
      apiBase:process.env.API_URL,
    }
  },
  modules:
       [
           '@nuxtjs/i18n',
           '@pinia/nuxt',
  ],
  plugins: [
    '~/plugins/mask.client.js',
    '~/plugins/moment.client.js',
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  i18n:{
    defaultLocale: 'uz',
    lazy: true,
    langDir: '../i18n/locales',
    detectBrowserLanguage: false,
    locales: [
      { code: 'uz', name: 'Uzbek', file: 'uz.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Russian', file: 'ru.json' }
    ],
    vueI18n:'i18n/index.js',
  },
  vite: {
    plugins: [
      tailwindcss(),
      Components({
        resolvers: [NaiveUiResolver()],
      })
    ],
  },
  css:['/assets/css/tailwind.css'],
  $development: {
    routeRules: {
      '/**': {
        cache: {
          swr: false
        }
      }
    },
  },
  $production: {
    routeRules: {
      '/**': {
        cache: {
          swr: false
        }
      }
    },
  },
}

// pages/**/ui/*.vue