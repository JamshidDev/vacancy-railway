<script setup>
import {Wallet20Regular, Location20Regular, ChevronRight24Filled} from "@vicons/fluent"
</script>

<template>
<div class="w-full bg-surface-ground pb-[100px] relative overflow-hidden">
  <UiPageContent class="relative z-[2]">
    <h3 class="text-4xl font-semibold text-black-primary text-center mt-16">Yangi vakansiyalar</h3>
    <small class="text-black-secondary text-center mt-4 text-[14px] mb-6">Imkoniyatni qo‘ldan boy bermang</small>
    <template v-for="item in 6">
      <div class="w-full flex relative max-w-[800px] mx-auto bg-surface-section border border-surface-line rounded-lg px-4 py-2 mb-8">
        <div class="absolute top-[26px] left-[-20px] p-6 bg-surface-section border border-surface-line rounded-2xl shadow-navbar">
          <IconBuild class="fill-success"/>
        </div>
        <div class="flex flex-col ml-[80px] pl-2 w-[calc(100%-170px)]">
          <h2 class="text-black-primary font-semibold"> Huquqiy masalalarda ekspert-maslaxatchi </h2>
          <h3 class="text-black-secondary"> Bag'dod tumani "Inson" ijtimoiy xizmatlar markazi </h3>
          <div class="flex items-center gap-1 mt-4">
            <n-icon size="16" class="text-primary">
              <Wallet20Regular/>
            </n-icon>
            <small class="text-black-tertiary"> Shtat jadvali bo`yicha </small>
          </div>
          <div class="flex items-center gap-1">
            <n-icon size="16" class="text-primary">
              <Location20Regular/>
            </n-icon>
            <small class="text-black-tertiary">Namangan viloyati , Yangiqo‘rg‘on tumani </small>
          </div>
        </div>
        <div class="flex flex-col justify-start">
            <div class="px-4 text-xs text-center py-1 rounded-lg bg-success text-white shadow-success/60">
              Yangi
            </div>
          <div class="px-4 mt-2 text-xs py-1 rounded-lg text-center bg-indigo text-white shadow-indigo/60">
            Bakalavr
          </div>
          <div class="group flex items-center text-xs mt-6 text-nowrap hover:text-primary cursor-pointer transition-all
          text-black-tertiary border-surface-line">
            Ko'rib chiqish
            <n-icon size="14" class="text-primary opacity-0 group-hover:opacity-100 group-hover:pl-1 transition-all duration-300 pl-[-10px]">
              <ChevronRight24Filled/>
            </n-icon>
          </div>
        </div>
      </div>
    </template>
  </UiPageContent>

  <div class="w-[600px] bg-indigo/10 h-[600px] rounded-full absolute top-[100px] right-[100px]
 after:content-[' ']  after:w-[360px] after:h-[360px] after:bg-surface-ground after:absolute after:rounded-full
  after:z-[1] after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%]
"></div>

  <div class="w-[600px] bg-success/10 h-[600px] rounded-full absolute bottom-[-100px] left-[-200px]
 after:content-[' ']  after:w-[360px] after:h-[360px] after:bg-surface-ground after:absolute after:rounded-full
  after:z-[1] after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%]
"></div>

</div>
</template>

<style scoped>

</style>