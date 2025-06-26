<script setup>
import {Wallet24Regular, Location24Regular, Clock16Regular, Briefcase16Regular,
  Certificate20Regular, BoxToolbox20Regular, PersonAccounts24Regular,FlowchartCircle24Regular,
  ClipboardTaskListLtr20Regular,Briefcase24Regular, RibbonStar20Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"

const store = useVacancyStore()

const day = computed(()=>{
  if(!store.detail?.to) return
  return utils.getDaysBetweenDates(store.detail?.created_at, store.detail?.to)
})
</script>

<template>
<div class="grid grid-cols-12">
    <div class="col-span-12 mb-8">
    <h2 class="text-xl text-black-primary font-bold">{{store.detail?.position}}</h2>
    </div>


  <div class="col-span-12">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-4 flex items-center gap-x-2">
        <n-icon size="20" class="text-primary">
          <Wallet24Regular/>
        </n-icon>
        <span class="text-[16px] text-black-secondary">{{utils.formattedMoney(store.detail?.salary)}} {{$t('content.sum')}}</span>
      </div>
      <div class="col-span-8 flex items-center gap-x-2">
        <n-icon size="20" class="text-primary">
          <Location24Regular/>
        </n-icon>
        <span class="text-[16px] text-black-secondary">{{store.detail?.address}}</span>
      </div>
      <div class="col-span-4 flex items-center gap-x-2">
        <n-icon size="20" class="text-primary">
          <Clock16Regular/>
        </n-icon>
        <span class="text-[16px] text-black-secondary">{{store.detail?.work_type?.name}}</span>
      </div>
      <div class="col-span-8 flex items-center gap-x-2">
        <n-icon size="20" class="text-primary">
          <Briefcase16Regular/>
        </n-icon>
        <span class="text-[16px] text-black-secondary">{{(store.detail?.experience? $t('vacancy.minWorkExperience', {n:store.detail?.experience}) : $t('vacancy.noExperience') ) }}</span>
      </div>
      <div class="col-span-4 flex items-center gap-x-2">
        <n-icon size="20" class="text-primary">
          <Certificate20Regular/>
        </n-icon>
        <span class="text-[16px] text-black-secondary">{{$t('detail.educationDegree')}}: {{store.detail?.education?.name}}</span>
      </div>
      <div class="col-span-8 flex items-center gap-x-2">
        <n-icon size="20" class="text-primary">
          <BoxToolbox20Regular/>
        </n-icon>
        <span class="text-[16px] text-black-secondary">Phd/DSc talab etilmagan</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 gap-x-8 flex mt-6">

    <div class="flex w-[300px] items-center border border-surface-line rounded-lg px-4 py-4">
      <div class="p-2 bg-success/10 rounded-lg items-center">
        <n-icon size="32" class="text-success ">
          <PersonAccounts24Regular/>
        </n-icon>
      </div>
      <div class="pl-4">
        <p class="text-black-tertiary font-medium">{{$t('detail.candidate')}}</p>
        <h3 class="text-3xl font-black text-black-secondary mt-1">{{store.detail?.applications_count}}</h3>
      </div>
    </div>
    <div class="flex w-[300px] items-center border border-surface-line rounded-lg px-4 py-4">
      <div class="p-2 bg-error/10 rounded-lg flex items-center">
        <n-icon size="32" class="text-error">
          <Clock16Regular/>
        </n-icon>
      </div>
      <div class="pl-4">
        <p class="text-black-tertiary font-medium">{{$t('detail.deadline')}}</p>
        <h3 class="text-3xl font-black text-black-secondary mt-1">{{day}} {{$t('content.day')}}</h3>
      </div>
    </div>
  </div>
  <div class="col-span-12 mt-6">
    <h2 class="text-primary text-lg font-semibold flex items-center mb-1">
      <n-icon size="20" class="mr-1">
        <ClipboardTaskListLtr20Regular/>
      </n-icon>
      {{$t('detail.qualification_requirements')}}
    </h2>
    <p class="font-medium text-black-secondary border-b border-surface-line pb-2 leading-[2.4] indent-[20px]"
    v-html="store.detail?.qualification_requirements"
    >
    </p>

    <h2 class="text-primary text-lg font-semibold flex items-center mb-1 mt-4">
      <n-icon size="20" class="mr-1">
        <Briefcase24Regular/>
      </n-icon>
      {{$t('detail.position_obligations')}}
    </h2>
    <p class="editor-content-view font-medium text-black-secondary border-b border-surface-line pb-2 leading-[2.4] indent-[20px]"
       v-html="store.detail?.position_obligations"
    >

    </p>
    <h2 class="text-primary text-lg font-semibold flex items-center mb-1 mt-4">
      <n-icon size="20" class="mr-1">
        <RibbonStar20Regular/>
      </n-icon>
      {{$t('detail.working_conditions')}}
    </h2>
    <p class="font-medium text-black-secondary border-b border-surface-line pb-2 leading-[2.4] indent-[20px]"
       v-html="store.detail?.working_conditions"
      >

    </p>
    <h2 class="text-primary text-lg font-semibold flex items-center mb-1 mt-4">
      <n-icon size="20" class="mr-1">
        <FlowchartCircle24Regular/>
      </n-icon>
      {{$t('detail.specialties')}}
    </h2>
    <p class="font-medium text-black-secondary border-b border-surface-line pb-2 leading-[2.4] indent-[20px]"
       v-html="store.detail?.specialties"
    >

    </p>
  </div>

</div>
</template>

