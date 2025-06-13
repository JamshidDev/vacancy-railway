export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.globalProperties.$t = nuxtApp.$i18n.t
})