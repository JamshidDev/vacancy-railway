import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useAuthStore = defineStore('authStore',()=>{
    const authVisible = ref(false)
    const payload = ref({
        phone:null,
        password:null,
    })
    const tabs = [
        {
            name:"auth.login",
            id:1,
        },
        {
            name:"auth.register",
            id:2,
        }
    ]
    const  activeTab = ref(1)


    const onChangeVisible = (v)=>{
        authVisible.value = v
    }
    const onChangeTab = (v)=>{
        activeTab.value = v
    }


    return {
        authVisible,
        payload,
        onChangeVisible,
        tabs,
        activeTab,
        onChangeTab,
    }

})