import ApiService from "@/service/ApiServices.js"
export default defineNuxtPlugin(() => {
    window.$ApiSerivce = ApiService
})