import tailwindcss from "@tailwindcss/vite";
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import i18nConfig from './i18n/index.js'
export default {
  ssr: false,
  compatibilityDate: '2024-11-01',
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
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  i18n:i18nConfig,
  vite: {
    plugins: [
      tailwindcss(),
      Components({
        resolvers: [NaiveUiResolver()],
      })
    ],
  },
  css:['/assets/css/tailwind.css'],
}