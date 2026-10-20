<script setup>
import {PersonAdd24Regular, DoorArrowLeft20Regular, Navigation20Filled, Dismiss12Filled, ChevronRight12Regular} from "@vicons/fluent"
import {useAuthStore} from "~/store/index.js"
import {useProfileStore} from "../../store/modules/profileStore.js"
const localePath = useLocalePath()
const route = useRoute()



const store = useProfileStore()
const authStore = useAuthStore()

const loginSystem = (v)=>{
  authStore.activeTab = v
  authStore.authVisible = true
}



const isLogin = computed(()=>{
  return Boolean(authStore.token)
})

const navigations = computed(()=>{
  const list = [
    {name:'mainSection.name', path:'/'},
    {name:'vacancy.name', path:'/vacancy-list'},
  ]
  if(isLogin.value){
    list.push({name:'profile.menu.myApplications', path:'/applications'})
  }
  return list
})

// Til prefiksini olib tashlab, joriy bo'limni aniqlash
const isActive = (path)=>{
  const current = route.path.replace(/^\/(ru|en)(?=\/|$)/, '') || '/'
  if(path === '/') return current === '/'
  return current.startsWith(path)
}

const onNavigate = (path)=>{
  store.sidebar = false
  navigateTo(localePath(path))
}


onMounted(()=>{
  if(authStore.token){
    store.onProfile()
  }
})
</script>
<template>
<header class="w-full fixed top-0 left-0 z-[100] bg-surface-section shadow-navbar">
  <div class="w-full max-w-[1320px] mx-auto h-[72px] lg:h-[88px] px-4 md:px-6 flex items-center justify-between gap-4">
    <UiLogo/>

    <nav class="hidden lg:flex items-center gap-8">
      <template v-for="item in navigations" :key="item.path">
        <a
            :href="localePath(item.path)"
            @click.prevent="onNavigate(item.path)"
            :class="[isActive(item.path) ? 'text-primary' : 'text-black-primary hover:text-primary']"
            class="uppercase font-semibold text-[17px] tracking-[0.01em] transition-colors duration-200"
        >{{$t(item.name)}}</a>
      </template>
    </nav>

    <div class="flex items-center gap-3">
      <span class="hidden md:inline-block"><UiLanguageSelect/></span>
      <template v-if="!isLogin">
        <button
            @click="loginSystem(2)"
            class="h-[44px] bg-surface-ground hover:bg-surface-line px-4 rounded-lg items-center
            gap-2 text-primary font-semibold cursor-pointer hidden md:flex transition-colors">
          <n-icon size="20">
            <PersonAdd24Regular/>
          </n-icon>
          <span>{{$t('content.register')}}</span>
        </button>
        <button
            @click="loginSystem(1)"
            class="h-[44px] bg-primary hover:bg-primary/90 px-5 font-semibold rounded-lg hidden md:flex items-center gap-2 text-white cursor-pointer transition-colors">
          <n-icon size="20">
            <DoorArrowLeft20Regular/>
          </n-icon>
          <span>{{$t('content.loginSystem')}}</span>
        </button>
      </template>
      <span v-else class="hidden md:inline-block">
        <UiUserMenu />
      </span>

      <button
          @click="()=>store.sidebar=!store.sidebar"
          class="lg:hidden w-[44px] h-[44px] flex items-center justify-center rounded-lg bg-surface-ground text-primary cursor-pointer">
        <n-icon size="22">
          <Navigation20Filled/>
        </n-icon>
      </button>

    </div>
  </div>
</header>

  <div
      v-if="store.sidebar"
      @click="store.sidebar = false"
      class="lg:hidden fixed inset-0 bg-black-primary/30 z-[998]"
  ></div>
  <div :class="[store.sidebar? 'left-0 ' : 'left-[-320px]']" class="h-screen shadow-2xl fixed top-0 w-[290px] bg-surface-section z-[999] transition-all duration-400 flex flex-col">

    <div class="flex justify-between items-center h-[72px] px-4 border-b border-surface-line">
      <UiLogo/>
      <button
          @click="()=>store.sidebar=false"
          class="w-[36px] h-[36px] flex items-center justify-center rounded-lg bg-surface-ground text-black-tertiary cursor-pointer">
        <n-icon size="14">
          <Dismiss12Filled/>
        </n-icon>
      </button>
    </div>
    <div class="w-full flex-1 overflow-y-auto p-4">

      <template v-for="item in navigations" :key="item.path">
        <div
            @click="onNavigate(item.path)"
            :class="[isActive(item.path) ? 'text-primary bg-surface-ground' : 'text-black-primary']"
            class="flex items-center justify-between px-3 py-3 rounded-lg uppercase font-semibold cursor-pointer">
          <span>{{$t(item.name)}}</span>
          <n-icon size="16" class="text-black-tertiary">
            <ChevronRight12Regular/>
          </n-icon>
        </div>
      </template>

      <div class="border-t border-surface-line my-4"></div>

      <template v-if="!isLogin">
        <button
            @click="loginSystem(1); store.sidebar = false"
            class="w-full h-[44px] bg-primary text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer">
          <n-icon size="20">
            <DoorArrowLeft20Regular/>
          </n-icon>
          {{$t('content.loginSystem')}}
        </button>
        <button
            @click="loginSystem(2); store.sidebar = false"
            class="w-full h-[44px] mt-3 bg-surface-ground text-primary font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer">
          <n-icon size="20">
            <PersonAdd24Regular/>
          </n-icon>
          {{$t('content.register')}}
        </button>
      </template >
      <template v-else>
        <div class="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-ground">
          <n-spin v-if="store.profileLoading" size="medium" />
          <n-avatar
              v-else
              round
              size="medium"
              :src="store.avatarUrl"
          />

          <div class="w-[calc(100%-48px)]">
            <h2 class="text-black-primary font-semibold leading-[1.1] line-clamp-1">
              <n-skeleton v-if="store.profileLoading" text :repeat="1" round />
              <template v-else>
                {{store.account? store.account?.last_name : ''}}
                {{store.account? store.account?.first_name : ''}}
              </template>
            </h2>
            <h6 class="text-black-tertiary text-sm line-clamp-1">
              <n-skeleton v-if="store.profileLoading" text :repeat="1" round />
              <template v-else>
                {{store.account? store.account?.middle_name : ''}}
              </template>

            </h6>
          </div>
        </div>
        <div @click="onNavigate('/profile')" class="flex items-center justify-between px-3 py-3 mt-2 font-semibold rounded-lg cursor-pointer text-black-primary">
          <span >{{$t('profile.menu.profile')}}</span>
          <n-icon size="16" class="text-black-tertiary">
            <ChevronRight12Regular/>
          </n-icon>
        </div>
        <div @click="authStore.onLogOut()" class="flex items-center justify-between px-3 py-3 font-semibold rounded-lg cursor-pointer text-error">
          <span >{{$t('profile.menu.logout')}}</span>
          <n-icon size="16" class="text-black-tertiary">
            <ChevronRight12Regular/>
          </n-icon>
        </div>


      </template>

    </div>
    <div class="px-4 py-4 border-t border-surface-line">
      <p class="font-semibold text-black-tertiary pb-2 text-sm">{{$t('content.interface-language')}}</p>
      <UiLanguageSelect :mobile="true" />
    </div>

  </div>
</template>
