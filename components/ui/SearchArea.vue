<script setup>
import {Search32Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
const store = useVacancyStore()
const localePath = useLocalePath()

const onSearch = () => {
  navigateTo(localePath(`/vacancy-list?search=${store.heroSearch || ''}`))
}

</script>

<template>
  <div class="w-full max-w-[760px] mx-auto text-center">
    <h1 class="text-black-primary text-[34px] md:text-[44px] xl:text-[52px] leading-[1.15] font-bold" v-html="$t('mainSection.title', {word:`<span class='text-primary'>${$t('mainSection.job')}</span>`})">
    </h1>

    <!-- Qidiruv: chegarali, fokusda asosiy rangda yonadi -->
    <div class="w-full mt-8 md:mt-10 p-2 pl-4 md:pl-5 rounded-2xl bg-surface-section border-2 border-surface-line shadow-card flex gap-2 items-center
        transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
      <n-icon size="22" class="text-primary shrink-0">
        <Search32Regular/>
      </n-icon>
      <n-input
          v-model:value="store.heroSearch"
          size="large"
          class="input-override hero-search-input text-left"
          :placeholder="$t('mainSection.thirdTitle')"
          @keyup.enter="onSearch"/>
      <button
          @click="onSearch"
          :aria-label="$t('mainSection.searchVacancy')"
          class="bg-primary hover:bg-primary/90 text-white h-[48px] px-4 md:px-8 font-semibold rounded-xl cursor-pointer shrink-0 transition-colors flex items-center gap-2">
        <!-- n-icon o'z display qoidasiga ega, shuning uchun span ichida yashiriladi -->
        <span class="flex md:hidden">
          <n-icon size="20">
            <Search32Regular/>
          </n-icon>
        </span>
        <span class="hidden md:inline">{{$t('mainSection.searchVacancy')}}</span>
      </button>
    </div>

  </div>
</template>
