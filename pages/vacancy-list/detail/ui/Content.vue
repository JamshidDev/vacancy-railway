<script setup>
import {Wallet24Regular, Location24Regular, Clock16Regular, Briefcase16Regular,
  Certificate20Regular, BoxToolbox20Regular, PersonAccounts24Regular,FlowchartCircle24Regular,
  ClipboardTaskListLtr20Regular,Briefcase24Regular, RibbonStar20Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"

const store = useVacancyStore()

const day = computed(()=>{
  if(!store.detail?.to) return 'detail.expired'
  return utils.getDaysBetweenDates(store.detail?.to)
})
</script>

<template>
<div class="grid grid-cols-12">
  <!-- Skeleton -->
  <template v-if="store.showLoading">
    <!-- Title -->
    <div class="col-span-12 mb-8">
      <n-skeleton text style="width: 300px; height: 28px" />
    </div>

    <!-- Info Grid -->
    <div class="col-span-12">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-4 flex items-center gap-x-2">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 120px; height: 18px" />
        </div>
        <div class="col-span-12 md:col-span-8 flex items-center gap-x-2">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 200px; height: 18px" />
        </div>
        <div class="col-span-12 md:col-span-4 flex items-center gap-x-2">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 80px; height: 18px" />
        </div>
        <div class="col-span-12 md:col-span-8 flex items-center gap-x-2">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 150px; height: 18px" />
        </div>
        <div class="col-span-12 md:col-span-4 flex items-center gap-x-2">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 140px; height: 18px" />
        </div>
        <div class="col-span-12 md:col-span-8 flex items-center gap-x-2">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 160px; height: 18px" />
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="col-span-12 gap-x-8 md:flex mt-6 mb-12">
      <div class="flex w-full md:w-[300px] mb-4 md:mb-0 items-center border border-surface-line rounded-lg px-4 py-4">
        <n-skeleton style="width: 48px; height: 48px; border-radius: 8px" />
        <div class="pl-4">
          <n-skeleton text style="width: 100px; height: 16px" />
          <n-skeleton text style="width: 60px; height: 32px" class="mt-1" />
        </div>
      </div>
      <div class="flex w-full md:w-[300px] items-center border border-surface-line rounded-lg px-4 py-4">
        <n-skeleton style="width: 48px; height: 48px; border-radius: 8px" />
        <div class="pl-4">
          <n-skeleton text style="width: 120px; height: 16px" />
          <n-skeleton text style="width: 80px; height: 32px" class="mt-1" />
        </div>
      </div>
    </div>

    <!-- Sections -->
    <div class="col-span-12 mt-6">
      <template v-for="i in 4" :key="i">
        <div class="flex items-center mb-2" :class="i > 1 && 'mt-6'">
          <n-skeleton circle style="width: 20px; height: 20px" />
          <n-skeleton text style="width: 180px; height: 20px" class="ml-2" />
        </div>
        <div class="border-b border-surface-line pb-2">
          <n-skeleton text style="width: 100%; height: 16px" />
          <n-skeleton text style="width: 90%; height: 16px" class="mt-2" />
          <n-skeleton text style="width: 95%; height: 16px" class="mt-2" />
          <n-skeleton text style="width: 70%; height: 16px" class="mt-2" />
        </div>
      </template>
    </div>
  </template>

  <!-- Content -->
  <template v-else>
    <div class="col-span-12 mb-8">
      <h2 class="text-xl text-black-primary font-bold">{{store.detail?.position}}</h2>
      <div class="flex items-center gap-x-2 mt-2">
        <n-icon size="18" class="text-primary">
          <Location24Regular/>
        </n-icon>
        <span class="text-[15px] text-black-secondary font-semibold">{{store.detail?.department}}</span>
      </div>
    </div>

    <div class="col-span-12">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-4 flex items-center gap-x-2">
          <n-icon size="20" class="text-primary">
            <Wallet24Regular/>
          </n-icon>
          <span class="text-[16px] text-black-secondary">{{store.detail?.salary_status ? utils.formattedMoney(store.detail?.salary) + ' ' + $t('content.sum') : $t('detail.salaryNegotiable')}}</span>
        </div>
        <div class="col-span-12 md:col-span-8 flex items-center gap-x-2">
          <n-icon size="20" class="text-primary">
            <Location24Regular/>
          </n-icon>
          <span class="text-[16px] text-black-secondary">{{store.detail?.address}}</span>
        </div>
        <div class="col-span-12 md:col-span-4 flex items-center gap-x-2">
          <n-icon size="20" class="text-primary">
            <Clock16Regular/>
          </n-icon>
          <span class="text-[16px] text-black-secondary">{{store.detail?.work_type?.name}}</span>
        </div>
        <div class="col-span-12 md:col-span-8 flex items-center gap-x-2">
          <n-icon size="20" class="text-primary">
            <Briefcase16Regular/>
          </n-icon>
          <span class="text-[16px] text-black-secondary">{{(store.detail?.experience? $t('vacancy.minWorkExperience', {n:store.detail?.experience}) : $t('vacancy.noExperience') ) }}</span>
        </div>
        <div class="col-span-12 md:col-span-4 flex items-center gap-x-2">
          <n-icon size="20" class="text-primary">
            <Certificate20Regular/>
          </n-icon>
          <span class="text-[16px] text-black-secondary">{{$t('detail.educationDegree')}}: {{store.detail?.education?.name}}</span>
        </div>
        <div class="col-span-12 md:col-span-8 flex items-center gap-x-2">
          <n-icon size="20" class="text-primary">
            <BoxToolbox20Regular/>
          </n-icon>
          <span class="text-[16px] text-black-secondary">{{store.detail?.phd_status ? $t('detail.phdRequired') : $t('detail.phdNotRequired')}}</span>
        </div>
      </div>
    </div>

    <div class="col-span-12 gap-x-8 md:flex mt-6 mb-12">
      <div class="flex w-full md:w-[300px] mb-4 md:mb-0 items-center border border-surface-line rounded-lg px-4 py-4">
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
      <div class="flex w-full md:w-[300px] items-center border border-surface-line rounded-lg px-4 py-4">
        <div class="p-2 bg-error/10 rounded-lg flex items-center">
          <n-icon size="32" class="text-error">
            <Clock16Regular/>
          </n-icon>
        </div>
        <div class="pl-4">
          <p class="text-black-tertiary font-medium">{{$t('detail.deadline')}}</p>
          <h3 :class="[isNaN(day)? 'text-error' : 'text-3xl text-black-secondary']" class="font-black mt-1">
           {{isNaN(day)? $t(day) : day +' '+ $t('content.day')}}</h3>
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
  </template>
</div>
</template>
