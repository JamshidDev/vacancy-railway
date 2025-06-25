<script setup>
const router = useRouter()
</script>

<template>
<div
    class="flex items-center w-[200px] cursor-pointer"
    @click="router.push('/')"
>
  <img class="w-[50px]" src="/logo-2.png" alt="App logo">
  <div class="flex flex-col text-[10px] text-[#b4a003] uppercase font-semibold">
    <span class="text-nowrap text-center leading-1">O'zbekiston temir yo'llari</span>
    <span class="text-nowrap text-left ">Aksiyadorlik jamiyati</span>
    <span class="text-nowrap text-left leading-1">Bo'sh ish o'rinlari</span>
  </div>
</div>
</template>
