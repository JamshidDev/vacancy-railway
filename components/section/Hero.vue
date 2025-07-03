<script setup>
import {useVacancyStore} from "../../store/index.js"

const store = useVacancyStore()

onMounted(()=>{
  store.onInitialApp()
})
</script>

<template>
  <div class="w-full bg-surface-ground relative overflow-hidden">
    <UiPageContent>
      <div class="grid grid-cols-12 min-h-[900px]">
        <div class="col-span-12 lg:col-span-6 relative">
          <UiSearchArea/>
        </div>
        <div class="col-span-12 lg:col-span-6 relative min-h-[300px]">
          <UiCircle/>
          <img class="absolute bottom-0 lg:right-[60px] xl:right-[100px] right-[50%]   translate-x-[50%] lg:translate-x-[0] lg:h-[700px] xl:h-[800px] h-[400px] animate-scale-xs z-10" src="/hero-man.png" alt="hero-man not found" />
        </div>
      </div>
    </UiPageContent>
    <h3 class="animate-scale-xs text-center w-full z-[1] lg:text-9xl md:text-8xl sm:text-6xl text-4xl font-black absolute bottom-[4px] lg:left-[50%] lg:translate-x-[-50%] bg-clip-text text-transparent bg-gradient-to-t from-[10%] from-surface-ground to-primary/20">{{$t('mainSection.vacancy')}}</h3>
  </div>
</template>
