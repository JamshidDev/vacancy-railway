<script setup>
import {Search32Regular} from "@vicons/fluent"


</script>

<template>
  <div class="w-full max-w-[700px] absolute bottom-[300px]">
    <p class="text-black-primary font-medium text-lg">Bizda <span class="text-primary px-1">179+</span> ta bosh ish
      o'rni mavjud bor</p>
    <h3 class="text-black-primary text-6xl font-medium mt-8">
      Find the <span class="text-primary px-1">job</span> that
      fits your life

    </h3>
    <h6 class="text-black-secondary mt-16 text-lg">Kasb, lavozim, vakansiya nomini kiriting</h6>

    <div class="w-full p-1 rounded-lg bg-surface-section border border-surface-line flex gap-2 items-center mt-4">
      <div class="w-[calc(100%-140px)] flex items-center">
        <n-icon size="22" class="text-black-tertiary">
          <Search32Regular/>
        </n-icon>
        <n-input class="input-override" placeholder="Izlash..."/>
      </div>
      <button class="bg-primary text-white py-4 px-3 text-sm rounded-md cursor-pointer ">Vakansiya izlash</button>
    </div>

  </div>
</template>

<style scoped>

</style>