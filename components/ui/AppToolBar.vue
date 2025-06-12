<script setup>
import {Briefcase28Regular, PaddingRight24Regular} from "@vicons/fluent"
import {useHeroStore} from "~/store/index.js"


const store = useHeroStore()

onMounted(()=>{
  window.addEventListener('scroll', (v)=>{
    store.isActiveNavbar = window.scrollY>3
  })
})
</script>
<template>
<div class="w-full fixed top-0 left-0 z-10 flex" :class="[store.isActiveNavbar && 'animate-slide-down']">
  <div class="w-full flex max-w-[1200px] mx-auto  py-2 px-4 rounded-bl-lg rounded-br-lg transition-all duration-400" :class="[store.isActiveNavbar && 'shadow-navbar bg-surface-section']">
    <UiLogo class="mr-4"/>
   <div class="flex justify-between w-[calc(100%-240px)]">
     <UiNavbar/>
     <div class="flex items-center gap-2">
       <button class="bg-primary/20 hover:bg-primary/30 px-3 py-2 rounded-lg flex items-center gap-2 text-primary font-medium cursor-pointer">
         <n-icon size="24" class="">
           <PaddingRight24Regular/>
         </n-icon>
         <span>Sign Up</span>
       </button>
       <button class="bg-primary hover:bg-primary/90 px-3 py-2 font-medium rounded-lg flex items-center gap-2 text-white cursor-pointer">
         <n-icon size="24" class="">
           <Briefcase28Regular/>
         </n-icon>
         <span>Post a job</span>
       </button>
     </div>
   </div>

  </div>
</div>
</template>
