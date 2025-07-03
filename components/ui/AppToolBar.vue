<script setup>
import {Briefcase28Regular, Diamond20Filled, Navigation20Filled, Dismiss12Filled, ChevronRight12Regular} from "@vicons/fluent"
import {useAuthStore} from "~/store/index.js"
import {useProfileStore} from "../../store/modules/profileStore.js"
const localePath = useLocalePath()



const store = useProfileStore()
const authStore = useAuthStore()

const loginSystem = (v)=>{
  authStore.activeTab = v
  authStore.authVisible = true
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
   <div class="flex justify-end w-[calc(100%-200px)]">
<!--     <UiNavbar/>-->
     <div class="flex items-center gap-2">
       <span class="hidden md:inline-block"><UiLanguageSelect/></span>
       <template v-if="!isLogin">
         <button
             @click="loginSystem(2)"
             class="bg-primary/20 hover:bg-primary/30 px-3 py-2 rounded-lg items-center
             gap-2 text-primary font-medium cursor-pointer hidden md:flex ">
           <n-icon size="24">
             <Briefcase28Regular/>
           </n-icon>
           <span >{{$t('content.register')}}</span>
         </button>
         <button
             @click="loginSystem(1)"
             class="bg-primary hover:bg-primary/90 px-3 py-2 font-medium rounded-lg hidden md:flex  items-center gap-2 text-white cursor-pointer">
           <n-icon size="24" class="">
             <Diamond20Filled/>
           </n-icon>
           <span>{{$t('content.login')}}</span>
         </button>
       </template>
       <span v-else class="hidden md:inline-block">
         <UiUserMenu />
       </span>

       <span class="md:hidden">
         <n-button text @click="()=>store.sidebar=!store.sidebar" size="large" type="primary">
         <template #icon>
           <n-icon>
             <Navigation20Filled/>
           </n-icon>
         </template>
       </n-button>
       </span>

     </div>
   </div>

  </div>
</div>

  <div :class="[store.sidebar? 'left-0 ' : 'left-[-300px]']" class="h-screen shadow-2xl fixed top-0 w-[260px] bg-white z-[999] transition-all duration-400 pt-4">

    <div class="flex justify-between items-center pb-2 px-1 mb-[40px]">
      <UiLogo/>
      <n-button ghost @click="()=>store.sidebar=false" >
        <template #icon>
          <n-icon>
            <Dismiss12Filled/>
          </n-icon>
        </template>
      </n-button>
    </div>
    <div class="w-full h-[calc(100vh-200px)]">

      <template v-if="!isLogin">
        <div  @click="loginSystem(1)" class="flex items-center justify-between p-2 mx-2 mt-2 font-medium border rounded-xl border-surface-line">
          <span >{{$t('content.login')}}</span>
          <n-icon size="20" class="text-surface-line">
            <ChevronRight12Regular/>
          </n-icon>
        </div>
        <div  @click="loginSystem(2)" class="flex items-center justify-between p-2 mx-2 mt-2 font-medium border rounded-xl border-surface-line">
          <span >{{$t('content.register')}}</span>
          <n-icon size="20" class="text-surface-line">
            <ChevronRight12Regular/>
          </n-icon>
        </div>
      </template >
      <template v-else>
        <div class="flex items-center gap-2 cursor-pointer w-full p-4">
          <n-spin v-if="store.profileLoading" size="medium" />
          <n-avatar
              v-else
              round
              size="medium"
              :src="store.avatarUrl"
          />

          <div class="w-[calc(100%-40px)]">
            <h2 class="text-black-primary font-semibold leading-[1] line-clamp-1">
              <n-skeleton v-if="store.profileLoading" text :repeat="1" round />
              <template v-else>
                {{store.account? store.account?.last_name : ''}}
                {{store.account? store.account?.first_name : ''}}
              </template>
            </h2>
            <h6 class="text-black-tertiary font-medium text-xs line-clamp-1">
              <n-skeleton v-if="store.profileLoading" text :repeat="1" round />
              <template v-else>
                {{store.account? store.account?.middle_name : ''}}
              </template>

            </h6>
          </div>
        </div>
        <div @click="navigateTo(localePath('/profile'))" class="flex items-center justify-between p-2 mx-2 mt-2 font-medium border rounded-xl border-surface-line">
          <span >{{$t('profile.menu.profile')}}</span>
          <n-icon size="20" class="text-surface-line">
            <ChevronRight12Regular/>
          </n-icon>
        </div>
        <div class="flex items-center justify-between p-2 mx-2 mt-2 font-medium border rounded-xl border-surface-line">
          <span >{{$t('profile.menu.myApplications')}}</span>
          <n-icon size="20" class="text-surface-line">
            <ChevronRight12Regular/>
          </n-icon>
        </div>
        <div @click="authStore.onLogOut()" class="flex items-center justify-between p-2 mx-2 mt-2 font-medium border rounded-xl border-surface-line">
          <span >{{$t('profile.menu.logout')}}</span>
          <n-icon size="20" class="text-surface-line">
            <ChevronRight12Regular/>
          </n-icon>
        </div>


      </template>

    </div>
    <div class="px-2 border-b border-surface-line pb-2">
      <p class="font-medium text-black-tertiary pb-2">{{$t('content.interface-language')}}</p>
      <UiLanguageSelect class="px-4" :mobile="true" />
    </div>

  </div>
</template>
