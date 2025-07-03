<script setup>
import {Wallet24Regular, Location24Regular,Clock32Regular,
  DocumentBriefcase20Regular, CalendarLtr32Regular, Clock28Regular,
  ArrowForward24Filled,Eye16Filled,Person12Filled, } from "@vicons/fluent"

const router = useRouter()
const props = defineProps({
  data:{
    type: Object,
    default:null,
  }
})
</script>

<template>
<div
    @click="router.push({path:'/vacancy-list/detail', query:{id:data.id}})"
    class="px-5 py-4 bg-surface-ground border border-surface-line rounded-xl
 mb-4 hover:bg-surface-section cursor-pointer hover:shadow-navbar transition-all duration-300">
  <h2 class="text-xl text-black-primary font-medium">{{data?.position}}</h2>
  <h2 class="text-xs text-black-tertiary mt-2 border-b border-surface-line pb-4">• {{data?.department}}</h2>
  <h3 class="text-black-secondary mt-2 font-medium">{{data.organization}}</h3>
  <div class="grid grid-cols-12 mt-2 gap-2">
    <div class="col-span-12 md:col-span-6 flex item-center gap-x-2 font-medium">
        <n-icon size="18" class="text-primary">
          <Wallet24Regular/>
        </n-icon>
      {{utils.formattedMoney(data.salary)}} {{$t('content.sum')}}
    </div>
    <div class="col-span-12 md:col-span-6 flex item-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary">
        <Location24Regular/>
      </n-icon>
      {{data.city?.region?.name}}, {{data.city?.name}}
    </div>
    <div class="col-span-12 md:col-span-6 flex item-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary">
        <Clock32Regular/>
      </n-icon>
      {{data.work_type?.name}}
    </div>
    <div class="col-span-12 md:col-span-6 flex item-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary">
        <DocumentBriefcase20Regular/>
      </n-icon>
      {{(data.experience ? $t('vacancy.minWorkExperience', {n:data.experience}) : $t('vacancy.noExperience'))}}
    </div>
  </div>
  <div class="grid grid-cols-12 mt-6 border-t border-surface-line pt-2 text-black-tertiary">
    <div class="col-span-12 sm:col-span-6 flex gap-1 items-center">
      <n-icon size="18">
        <CalendarLtr32Regular/>
      </n-icon>
      {{utils.formattedDate(data.created_at)}}

      <n-icon size="18" class="ml-6">
        <Clock28Regular/>
      </n-icon>
      {{utils.formattedDate(data.to)}}
    </div>
    <div class="col-span-12 sm:col-span-6 flex sm:justify-end gap-1 mt-4 sm:mt-0">
      <n-icon size="18">
        <Person12Filled/>
      </n-icon>
      <span class="mr-4">{{data.applications_count}} {{$t('content.person')}}</span>
      <n-icon size="18">
        <Eye16Filled/>
      </n-icon>
      <span class="mr-4">{{data.view_count}} {{$t('content.ta')}}</span>
      <n-icon size="18">
        <ArrowForward24Filled/>
      </n-icon>
    </div>
  </div>

</div>
</template>
