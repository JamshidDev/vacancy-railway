import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useAuthStore = defineStore('authStore',()=>{
    const authVisible = ref(false)
    const payload = ref({
        phone:"+998",
        password:null,
    })
    const authPayload = ref({
        phone:"+998",
        password:null,
    })
    const otpPayload = ref({
        otp:null,
        password:null,
        token:null,
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
    const registerTab = [
        {
            name:"auth.register",
            id:1,
        },
        {
            name:"auth.otp",
            id:2,
        }
    ]
    const registerActiveTab = ref(1)
    const authLoading = ref(false)


    const onChangeVisible = (v)=>{
        authVisible.value = v
    }
    const onChangeTab = (v)=>{
        activeTab.value = v
    }

    const getToken =async()=>{
        authLoading.value = true
        const data = {
            phone:authPayload.value.phone
        }
        window.$ApiSerivce.authService.token({data}).then(res=>{
            console.log(res.data)
        }).finally(()=>{
            authLoading.value = false
        })
    }


    return {
        authVisible,
        payload,
        onChangeVisible,
        tabs,
        activeTab,
        onChangeTab,
        registerTab,
        registerActiveTab,
        otpPayload,
        authPayload,
        authLoading,
    }

})