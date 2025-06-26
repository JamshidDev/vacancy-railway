<script setup>
import {Wallet20Regular, Location20Regular, ChevronRight24Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {utils} from "~/utils/index.js"

const store = useVacancyStore()
</script>

<template>
<div class="w-full bg-surface-ground pb-[100px] relative overflow-hidden">
  <UiPageContent class="relative z-[2]">
    <h3 class="text-4xl font-semibold text-black-primary text-center mt-16">{{$t('mainSection.newVacancy')}}</h3>
    <small class="text-black-secondary text-center mt-4 text-[14px] mb-6">{{$t('mainSection.subVacancyText')}}</small>
    <template v-if="!store.loading && store.lastVacancies.length > 0">
      <div v-for="item in store.lastVacancies"
           :key="item.id"
           class="w-full flex relative max-w-[800px] mx-auto bg-surface-section border border-surface-line rounded-lg px-4 py-2 mb-8">
        <div class="absolute top-[26px] left-[-20px] p-6 bg-surface-section border border-surface-line rounded-2xl shadow-navbar">
          <IconBuild/>
        </div>
        <div class="flex flex-col ml-[80px] pl-2 w-[calc(100%-170px)]">
          <h2 class="text-black-primary font-semibold">{{item.position}} </h2>
          <h3 class="text-black-secondary"> {{item.department}}</h3>
          <div class="flex items-center gap-1 mt-4">
            <n-icon size="16" class="text-primary">
              <Wallet20Regular/>
            </n-icon>
            <small class="text-black-tertiary">{{utils.formattedMoney(item.salary)}} so'm</small>
          </div>
          <div class="flex items-center gap-1">
            <n-icon size="16" class="text-primary">
              <Location20Regular/>
            </n-icon>
            <small class="text-black-tertiary">{{item.region}}, {{item.city}}</small>
          </div>
        </div>
        <div class="flex flex-col justify-start">
          <div class="group flex items-center text-xs mt-6 text-nowrap hover:text-primary cursor-pointer transition-all
          text-black-tertiary border-surface-line border-b border-dashed">
            {{$t('mainSection.viewMore')}}
            <n-icon size="14" class="text-primary opacity-0 group-hover:opacity-100 group-hover:pl-1 transition-all duration-300 pl-[-10px]">
              <ChevronRight24Filled/>
            </n-icon>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="!store.loading && store.lastVacancies.length === 0">
      <UiNoResult class="max-w-[800px] mx-auto w-full"/>
    </template>
    <template v-else>
        <div v-for="item in 4" class="mb-6 max-w-[800px] w-full h-[120px] mx-auto animate-shimmer shimmer rounded-2xl"></div>
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
