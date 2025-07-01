import {defineStore} from "pinia"
import {ref, computed} from "vue"
import {utils} from "~/utils/index.js"
import {appSetting} from "~/utils/index.js"

export const useAuthStore = defineStore('authStore',()=>{

    // Variables
    const authVisible = ref(false)
    const payload = ref({
        phone:"+998",
        password:null,
    })
    const authPayload = ref({
        phone:"+998",
        password:null,
        last_name:null,
        first_name:null,
        middle_name:null,
    })
    const otpPayload = ref({
        otp:null,
        password:null,
        token:null,
    })
    const tabs = [
        {
            name:"content.login",
            id:1,
        },
        {
            name:"content.register",
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
    const loading = ref(false)
    const storage = localStorage.getItem(appSetting.tokenKey) || null
    const token = ref(storage)


    // Methods

    const onChangeVisible = (v)=>{
        authVisible.value = v
    }
    const onChangeTab = (v)=>{
        activeTab.value = v
    }
    const getToken =()=>{
        otpPayload.value.token = null
        authLoading.value = true
        const data = {
            ...authPayload.value,
            phone:utils.clearPhoneNumber(authPayload.value.phone),
            password:undefined,
        }
        window.$ApiSerivce.authService.token({data}).then(res=>{
            otpPayload.value.token = res.data.data?.user
            registerActiveTab.value = 2
        }).finally(()=>{
            authLoading.value = false
        })
    }
    const onRegisterUser = ()=>{
        authLoading.value = true
        const data  = {
            ...otpPayload.value,
            otp:otpPayload.value.otp.toString().replace(/,/g,''),
            password:authPayload.value.password
        }
        window.$ApiSerivce.authService.register({data}).then(res=>{
            localStorage.setItem(appSetting.tokenKey, res.data?.data?.access_token)
            registerActiveTab.value = 1
            authVisible.value= false
            token.value = res.data?.data?.access_token
            onProfile()
        }).finally(()=>{
            authLoading.value = false
        })
    }
    const onLogin = ()=>{
        loading.value = true
        const data = {
            ...payload.value,
            phone:utils.clearPhoneNumber(payload.value.phone)
        }
        window.$ApiSerivce.authService.login({data}).then(res=>{
            localStorage.setItem(appSetting.tokenKey, res.data?.data?.access_token)
            token.value = res.data?.data?.access_token
            authVisible.value = false
            onProfile()
        }).finally(()=>{
            loading.value = false
        })
    }


    const onLogOut = ()=>{
        token.value = null
        localStorage.removeItem(appSetting.tokenKey)
    }




    return {
        authVisible,
        payload,
        tabs,
        activeTab,
        registerTab,
        registerActiveTab,
        otpPayload,
        authPayload,
        authLoading,
        loading,
        token,

        onChangeVisible,
        onChangeTab,
        getToken,
        onRegisterUser,
        onLogin,

        onLogOut,
    }

})