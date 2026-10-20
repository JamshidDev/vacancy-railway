<script setup>
const localePath = useLocalePath()
</script>

<template>
<div
    class="flex items-center gap-3 cursor-pointer shrink-0"
    @click="navigateTo(localePath('/'))"
>
  <img class="w-[46px] lg:w-[56px]" src="/logo-2.png" alt="App logo">
  <div class="flex flex-col text-[10px] lg:text-[11px] leading-[1.35] text-black-primary uppercase font-bold">
    <span class="text-nowrap">O'zbekiston temir yo'llari</span>
    <span class="text-nowrap">Aksiyadorlik jamiyati</span>
    <span class="text-nowrap">Bo'sh ish o'rinlari portali</span>
  </div>
</div>
</template>
