import {useAuthStore} from "../store/index.js"

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useAuthStore()
    if(to.path === '/profile' && !store.token){
        return navigateTo('/')
    }
});