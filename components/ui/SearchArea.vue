<script setup>
import {Search32Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
const store = useVacancyStore()
const localePath = useLocalePath()

const totalVacancy = computed(()=> {
  if (store.loading) return `<span class="w-[40px] h-[20px] inline-block animate-shimmer shimmer rounded mb-[-4px]"></span>`
  return `<span class="text-primary">${store.activeVacancy}</span>`
})

</script>

<template>
  <div class="w-full max-w-[700px] lg:absolute lg:bottom-[300px] pt-[100px] lg:pt-[0px]">
    <p class="text-black-primary font-medium text-lg" v-html="$t('mainSection.subtitle', {n:totalVacancy})"></p>


    <h3 class="text-black-primary text-4xl lg:text-5xl xl:text-6xl font-medium mt-8" v-html="$t('mainSection.title', {word:`<span class='text-primary px-1'>${$t('mainSection.job')}</span>`})">
    </h3>
    <h6 class="text-black-secondary mt-16 lg:text-lg">{{$t('mainSection.thirdTitle')}}</h6>

    <div class="w-full p-1 rounded-2xl bg-surface-section border border-surface-line flex gap-2 items-center mt-4">
      <div class="w-[calc(100%-140px)] flex items-center">
        <n-icon size="22" class="text-black-tertiary">
          <Search32Regular/>
        </n-icon>
        <n-input v-model:value="store.heroSearch" class="input-override" :placeholder="$t('content.search')"/>
      </div>
      <button
          @click="navigateTo(localePath(`/vacancy-list?search=${store.heroSearch || ''}`))"
          class="bg-primary text-white w-[140px] py-4 px-3 text-sm rounded-2xl cursor-pointer ">
        {{$t('mainSection.searchVacancy')}}</button>
    </div>

  </div>
</template>