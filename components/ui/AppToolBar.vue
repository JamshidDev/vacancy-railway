<script setup>
import {Briefcase28Regular, Diamond20Filled} from "@vicons/fluent"
import {useAuthStore} from "~/store/index.js"
import {useProfileStore} from "../../store/modules/profileStore.js"


const store = useProfileStore()
const authStore = useAuthStore()

const loginSystem = (v)=>{
  store.activeTab = v
  store.authVisible = true
}



const isLogin = computed(()=>{
  return Boolean(authStore.token)
})


onMounted(()=>{
  window.addEventListener('scroll', (v)=>{
    store.isActiveNavbar = window.scrollY>3
  })

  if(authStore.token){
    store.onProfile()
  }


})
</script>
<template>
<div class="w-full fixed top-0 left-0 z-[100] flex" :class="[store.isActiveNavbar && 'animate-slide-down']">
  <div class="w-full flex max-w-[1200px] mx-auto  py-2 px-4 rounded-bl-lg rounded-br-lg transition-all duration-400" :class="[store.isActiveNavbar && 'shadow-navbar bg-surface-section']">
    <UiLogo class="mr-4"/>
   <div class="flex justify-end w-[calc(100%-240px)]">
<!--     <UiNavbar/>-->
     <div class="flex items-center gap-2">
       <UiLanguageSelect/>
       <template v-if="!isLogin">
         <button
             @click="loginSystem(2)"
             class="bg-primary/20 hover:bg-primary/30 px-3 py-2 rounded-lg flex items-center gap-2 text-primary font-medium cursor-pointer">
           <n-icon size="24">
             <Briefcase28Regular/>
           </n-icon>
           <span>{{$t('content.register')}}</span>
         </button>
         <button
             @click="loginSystem(1)"
             class="bg-primary hover:bg-primary/90 px-3 py-2 font-medium rounded-lg flex items-center gap-2 text-white cursor-pointer">
           <n-icon size="24" class="">
             <Diamond20Filled/>
           </n-icon>
           <span>{{$t('content.login')}}</span>
         </button>
       </template>
       <UiUserMenu v-else />
     </div>
   </div>

  </div>
</div>
</template>
