<script setup>
import {Search32Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
const store = useVacancyStore()
const localePath = useLocalePath()

const totalVacancy = computed(()=> {
  if (store.loading) return `<span class="w-[40px] h-[20px] inline-block animate-shimmer shimmer rounded mb-[-4px]"></span>`
  return `<span class="text-primary font-semibold">${Number(store.activeVacancy || 0).toLocaleString('ru-RU')}</span>`
})

const onSearch = () => {
  navigateTo(localePath(`/vacancy-list?search=${store.heroSearch || ''}`))
}

</script>

<template>
  <div class="w-full max-w-[760px]">
    <p class="text-black-primary text-xl lg:text-2xl" v-html="$t('mainSection.heroCount', {n:totalVacancy})"></p>

    <h1 class="text-black-primary text-[34px] md:text-[44px] xl:text-[52px] leading-[1.15] font-bold mt-3" v-html="$t('mainSection.title', {word:`<span class='text-primary'>${$t('mainSection.job')}</span>`})">
    </h1>
    <h6 class="text-black-tertiary mt-10 lg:text-lg">{{$t('mainSection.thirdTitle')}}</h6>

    <div class="w-full p-3 rounded-xl bg-surface-section shadow-card flex gap-2 items-center mt-4">
      <div class="flex-1 flex items-center pl-2 min-w-0">
        <n-icon size="24" class="text-black-tertiary shrink-0">
          <Search32Regular/>
        </n-icon>
        <n-input v-model:value="store.heroSearch" size="large" class="input-override" :placeholder="$t('content.search')" @keyup.enter="onSearch"/>
      </div>
      <button
          @click="onSearch"
          class="bg-primary hover:bg-primary/90 text-white h-[48px] px-6 md:px-10 font-semibold rounded-lg cursor-pointer shrink-0 transition-colors">
        {{$t('mainSection.searchVacancy')}}</button>
    </div>

  </div>
</template>
