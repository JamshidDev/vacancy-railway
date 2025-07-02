<script setup>
import {AppGeneric24Regular} from "@vicons/fluent"
import {useProfileStore} from "../../../store/index.js"

const store = useProfileStore()

const dashboardData = computed(()=>{

  return [
    {
      name:"info.card.all",
      count:store.dashboardList?.[3]?.count || 0,
      type:'primary',
    },
    {
      name:"info.card.process",
      count:store.dashboardList?.[0]?.count || 0,
      type:'warning',
    },
    {
      name:"info.card.accepted",
      count:store.dashboardList?.[1]?.count || 0,
      type:'success',
    },
    {
      name:"info.card.rejected",
      count:store.dashboardList?.[2]?.count || 0,
      type:'error',
    },
  ]
})

onMounted(()=>{
  store.onGetDashboard()
})
</script>

<template>
<div class="grid grid-cols-12 gap-4 bg-surface-section rounded-2xl py-6 mt-8 px-4">

  <template v-for="item in dashboardData" :key="item.name">
    <div class="col-span-12 md:col-span-6 lg:col-span-3 px-4 py-4 border border-surface-line rounded-2xl flex items-center bg-gradient-to-l from-primary/10 to-warning/10 ">
      <n-icon class="text-primary" size="32">
        <AppGeneric24Regular/>
      </n-icon>
      <div class="w-[calc(100%-80px)] pl-4">
        <p class="text-black-secondary font-semibold leading-[1]">{{$t(item.name)}}</p>
        <p class="text-black-tertiary">{{$t('info.card.count')}}</p>
      </div>
      <n-button :type="item.type" secondary>
        <template #icon>
          <n-spin :show="store.dashboardLoading" size="small">
            <span class="font-semibold">
              {{item.count}}
          </span>
          </n-spin>
        </template>
      </n-button>
    </div>
  </template>

</div>
</template>