<script setup>
import {Wallet20Regular, Location20Regular, ArrowRight20Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {utils} from "~/utils/index.js"

const store = useVacancyStore()
const localePath = useLocalePath()
</script>

<template>
<section class="w-full bg-surface-ground py-12 md:py-16 lg:py-24">
  <UiPageContent>
    <UiSectionTitle :title="$t('mainSection.newVacancy')" :subtitle="$t('mainSection.subVacancyText')">
      <template #right>
        <a
            :href="localePath('/vacancy-list')"
            @click.prevent="navigateTo(localePath('/vacancy-list'))"
            class="group flex items-center gap-2 text-primary font-semibold text-lg">
          {{$t('mainSection.allVacancies')}}
          <n-icon size="20" class="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight20Regular/>
          </n-icon>
        </a>
      </template>
    </UiSectionTitle>

    <div v-if="!store.loading && store.lastVacancies.length > 0" class="grid grid-cols-12 gap-6">
      <div v-for="item in store.lastVacancies"
           :key="item.id"
           @click="navigateTo(localePath(`/vacancy-list/detail?id=${item.id}`))"
           class="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col bg-surface-section border border-surface-line rounded-xl px-6 py-5 cursor-pointer hover:shadow-card hover:border-primary/30 transition-all duration-300">
        <h3 class="text-black-primary font-bold text-xl leading-[1.3] line-clamp-2">{{item.position}}</h3>
        <p class="text-primary font-semibold text-lg mt-1 line-clamp-2">{{item.department}}</p>
        <div class="mt-auto pt-5 flex flex-col gap-2">
          <div class="flex items-center gap-2 text-black-primary font-semibold">
            <n-icon size="20" class="text-primary">
              <Wallet20Regular/>
            </n-icon>
            {{utils.formattedMoney(item.salary)}} {{$t('content.sum')}}
          </div>
          <div class="flex items-center gap-2 text-black-tertiary">
            <n-icon size="20" class="text-primary">
              <Location20Regular/>
            </n-icon>
            {{item.region}}, {{item.city}}
          </div>
        </div>
      </div>
    </div>
    <template v-else-if="!store.loading && store.lastVacancies.length === 0">
      <UiNoResult class="w-full"/>
    </template>
    <div v-else class="grid grid-cols-12 gap-6">
      <div v-for="item in 6" :key="item" class="col-span-12 md:col-span-6 lg:col-span-4 h-[170px] animate-shimmer shimmer rounded-xl"></div>
    </div>

  </UiPageContent>
</section>
</template>
