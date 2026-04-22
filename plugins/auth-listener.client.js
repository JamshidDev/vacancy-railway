import {useAuthStore, useProfileStore} from "~/store/index.js"

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore()
    const profileStore = useProfileStore()

    window.addEventListener('auth:unauthorized', () => {
        nuxtApp.runWithContext(() => {
            authStore.token = null
            authStore.authVisible = false
            profileStore.account = null
        })
    })
})
