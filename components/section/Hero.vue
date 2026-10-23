<script setup>
import {useVacancyStore} from "../../store/index.js"

const store = useVacancyStore()

onMounted(()=>{
  store.onInitialApp()
})
</script>

<template>
  <section class="w-full bg-gradient-to-b from-surface-ground to-surface-soft relative overflow-hidden pt-[72px] lg:pt-[88px]">
    <div class="absolute bottom-0 left-0 w-full h-[240px] bg-[url('/footer.png')] bg-no-repeat bg-bottom bg-size-[100%_auto] opacity-40 dark:opacity-[0.04] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-full h-[160px] md:h-[220px] lg:h-[260px] pointer-events-none">
      <UiRailwayScene/>
    </div>
    <UiPageContent class="relative z-10">
      <!-- Sarlavha va qidiruv markazda, pastda poyezd sahnasi uchun joy qoldiriladi -->
      <div class="flex items-center justify-center lg:min-h-[700px] pt-14 md:pt-20 pb-[170px] md:pb-[250px] lg:pt-0 lg:pb-[200px]">
        <UiSearchArea/>
      </div>
    </UiPageContent>
  </section>
</template>
