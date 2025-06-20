export default defineNuxtPlugin((nuxtApp) => {
    const { t } = nuxtApp.$i18n
    nuxtApp.provide('t', t)
})