import {defineStore} from "pinia"
import {ref, watch} from "vue"
import {utils} from "~/utils/index.js"
import {appSetting} from "~/utils/index.js"
import {useProfileStore} from "./profileStore.js"
import {useVacancyStore} from "./vacancyStore.js"

export const useAuthStore = defineStore('authStore',()=>{
    const store = useProfileStore()

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

    // Parolni tiklash: 'login' yoki 'reset' ko'rinishi; qadamlar 1 - telefon, 2 - kod va yangi parol, 3 - tayyor
    const RESEND_DELAY = 60 * 1000
    const loginView = ref('login')
    const resetStep = ref(1)
    const resetLoading = ref(false)
    const resendAvailableAt = ref(0)
    const resetPayload = ref({
        phone:"+998",
        token:null,
        otp:null,
        password:null,
        password_confirmation:null,
    })
    const storage = localStorage.getItem(appSetting.tokenKey) || null
    const token = ref(storage)


    // Methods

    const onChangeVisible = (v)=>{
        authVisible.value = v
    }
    const onChangeTab = (v)=>{
        activeTab.value = v
    }

    const getDetails = ()=>{
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
        if(currentPath.includes('/vacancy-list/detail')){
            const store = useVacancyStore()
            const urlParams = new URLSearchParams(window.location.search)
            const id = urlParams.get('id')
            if(id) store.onShow(id)
        }
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
            store.onProfile()
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
            store.onProfile()
            getDetails()
        }).finally(()=>{
            loading.value = false
        })
    }


    const resetPasswordState = ()=>{
        resetStep.value = 1
        resetPayload.value.token = null
        resetPayload.value.otp = null
        resetPayload.value.password = null
        resetPayload.value.password_confirmation = null
    }

    const openPasswordReset = ()=>{
        resetPasswordState()
        // Kirish formasida raqam kiritilgan bo'lsa, qayta yozdirmaymiz
        resetPayload.value.phone = payload.value.phone || "+998"
        loginView.value = 'reset'
    }

    const closePasswordReset = ()=>{
        loginView.value = 'login'
        resetPasswordState()
    }

    const onResetSendCode = ()=>{
        resetLoading.value = true
        const data = {
            phone:utils.clearPhoneNumber(resetPayload.value.phone),
        }
        window.$ApiSerivce.authService.forgotPassword({data}).then(res=>{
            resetPayload.value.token = res.data?.data?.token
            resetPayload.value.otp = null
            resendAvailableAt.value = Date.now() + RESEND_DELAY
            resetStep.value = 2
        }).finally(()=>{
            resetLoading.value = false
        })
    }

    const onResetPassword = ()=>{
        resetLoading.value = true
        const data = {
            token:resetPayload.value.token,
            otp:resetPayload.value.otp.toString().replace(/,/g,''),
            password:resetPayload.value.password,
            password_confirmation:resetPayload.value.password_confirmation,
        }
        window.$ApiSerivce.authService.resetPassword({data}).then(()=>{
            // Kirish formasiga raqamni tayyorlab qo'yamiz, parolni foydalanuvchi o'zi kiritadi
            payload.value.phone = resetPayload.value.phone
            payload.value.password = null
            resetStep.value = 3
        }).finally(()=>{
            resetLoading.value = false
        })
    }

    // Modal yopilganda keyingi ochilishda oddiy kirish formasi chiqsin
    watch(authVisible, (visible)=>{
        if(!visible) closePasswordReset()
    })

    const onLogOut = ()=>{
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
        // Token talab qiladigan sahifalardan chiqishda bosh sahifaga.
        if(['/profile', '/applications', '/exam'].some(p => currentPath.includes(p))){
            navigateTo(window.localePath ? window.localePath('/') : '/')
        }
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

        loginView,
        resetStep,
        resetLoading,
        resendAvailableAt,
        resetPayload,
        openPasswordReset,
        closePasswordReset,
        onResetSendCode,
        onResetPassword,

        onLogOut,
    }

})