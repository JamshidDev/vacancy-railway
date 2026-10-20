<script setup>
import {Wallet24Regular, Location24Regular,Clock24Regular,
  DocumentBriefcase20Regular, CalendarLtr24Regular, Timer24Regular,
  ArrowForward24Filled,Eye24Regular,People24Regular } from "@vicons/fluent"

const router = useRouter()
const localePath = useLocalePath()
const props = defineProps({
  data:{
    type: Object,
    default:null,
  }
})
</script>

<template>
<div
    @click="router.push({path:localePath('/vacancy-list/detail'), query:{id:data.id}})"
    class="group px-4 py-4 sm:px-6 sm:py-5 bg-surface-soft border border-surface-line rounded-xl
 mb-4 sm:mb-5 cursor-pointer hover:border-primary/40 hover:shadow-card transition-all duration-300">
  <h2 class="text-lg sm:text-xl md:text-2xl text-black-primary font-bold leading-[1.3] group-hover:text-primary transition-colors">{{data?.organization}}</h2>
  <p class="text-black-tertiary font-semibold text-sm sm:text-base mt-1 sm:mt-2">&bull; {{data?.department}}</p>

  <div class="border-t border-surface-line mt-4 pt-4">
    <h3 class="text-base sm:text-lg md:text-xl text-black-primary font-bold">{{data?.position}}</h3>
    <div class="grid grid-cols-12 mt-3 gap-x-6 gap-y-2 sm:gap-y-3 text-black-primary text-sm sm:text-base">
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold text-base sm:text-lg">
        <n-icon size="20" class="text-primary shrink-0">
          <Wallet24Regular/>
        </n-icon>
        {{data.salary_status ? utils.formattedMoney(data.salary) + ' ' + $t('content.sum') : $t('detail.salaryNegotiable')}}
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <Location24Regular/>
        </n-icon>
        {{data.city?.region?.name}}, {{data.city?.name}}
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <Clock24Regular/>
        </n-icon>
        {{data.work_type?.name}}
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <DocumentBriefcase20Regular/>
        </n-icon>
        {{(data.experience ? $t('vacancy.minWorkExperience', {n:data.experience}) : $t('vacancy.noExperience'))}}
      </div>
    </div>
  </div>

  <div class="flex flex-wrap justify-between gap-x-3 gap-y-2 mt-4 sm:mt-5 border-t border-surface-line pt-3 sm:pt-4 text-black-tertiary text-sm sm:text-[17px]">
    <div class="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 items-center">
      <span class="flex items-center gap-2">
        <n-icon size="18">
          <CalendarLtr24Regular/>
        </n-icon>
        {{utils.formattedDate(data.created_at)}}
      </span>
      <span class="flex items-center gap-2">
        <n-icon size="18">
          <Timer24Regular/>
        </n-icon>
        {{utils.formattedDate(data.to)}}
      </span>
    </div>
    <div class="flex items-center gap-x-4 sm:gap-x-6">
      <span class="flex items-center gap-2">
        <n-icon size="20">
          <Eye24Regular/>
        </n-icon>
        {{data.view_count}} {{$t('content.ta')}}
      </span>
      <span class="flex items-center gap-2">
        <n-icon size="20">
          <People24Regular/>
        </n-icon>
        {{data.applications_count}} {{$t('content.person')}}
      </span>
      <n-icon size="22" class="text-black-primary group-hover:text-primary transition-colors">
        <ArrowForward24Filled/>
      </n-icon>
    </div>
  </div>

</div>
</template>
