<script setup>
import {DocumentBulletList24Regular, Clock24Regular, CheckmarkCircle24Regular, DismissCircle24Regular} from "@vicons/fluent"
import {useProfileStore} from "../../../store/index.js"

const router = useRouter()
const route = useRoute()
const store = useProfileStore()

const goToApplications = () => {
  router.replace({query:{...route.query, tab:'applications'}})
}

const dashboardData = computed(()=>{

  return [
    {
      name:"info.card.all",
      count:store.dashboardList?.[3]?.count || 0,
      icon:DocumentBulletList24Regular,
      color:'text-primary bg-primary/10',
    },
    {
      name:"info.card.process",
      count:store.dashboardList?.[0]?.count || 0,
      icon:Clock24Regular,
      color:'text-warning bg-warning/15',
    },
    {
      name:"info.card.accepted",
      count:store.dashboardList?.[1]?.count || 0,
      icon:CheckmarkCircle24Regular,
      color:'text-success bg-success/12',
    },
    {
      name:"info.card.rejected",
      count:store.dashboardList?.[2]?.count || 0,
      icon:DismissCircle24Regular,
      color:'text-error bg-error/10',
    },
  ]
})

onMounted(()=>{
  store.onGetDashboard()
})
</script>

<template>
<div class="grid grid-cols-12 gap-4 mt-6">

  <template v-for="item in dashboardData" :key="item.name">
    <div
        @click="goToApplications"
        class="col-span-12 sm:col-span-6 lg:col-span-3 p-5 bg-surface-soft border border-surface-line rounded-xl flex items-center gap-4 cursor-pointer hover:shadow-card hover:border-primary/30 transition-all duration-300">
      <div :class="item.color" class="w-[52px] h-[52px] rounded-lg flex items-center justify-center shrink-0">
        <n-icon size="26">
          <component :is="item.icon"/>
        </n-icon>
      </div>
      <div class="min-w-0">
        <div class="text-[28px] font-bold leading-[1.1] text-black-primary">
          <span v-if="store.dashboardLoading" class="w-[40px] h-[28px] inline-block animate-shimmer shimmer rounded"></span>
          <template v-else>{{item.count}}</template>
        </div>
        <p class="text-black-tertiary">{{$t(item.name)}}</p>
      </div>
    </div>
  </template>

</div>
</template>
