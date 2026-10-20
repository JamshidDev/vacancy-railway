<script setup>
import {VehicleSubway24Regular, BuildingMultiple24Regular, Location24Regular} from "@vicons/fluent"
import {useVacancyStore} from "../../store/index.js"

const store = useVacancyStore()

const formatCount = (v)=> Number(v || 0).toLocaleString('ru-RU')

const stats = computed(()=>[
  {
    label:'mainSection.statVacancies',
    value:store.activeVacancy,
    icon:VehicleSubway24Regular,
    color:'text-warning bg-warning/15',
    position:'top-[8%] left-[8%]',
    delay:'0s',
  },
  {
    label:'mainSection.statOrganizations',
    value:store.organizations?.length || 0,
    icon:BuildingMultiple24Regular,
    color:'text-error bg-error/10',
    position:'top-[32%] right-[0%]',
    delay:'1.5s',
  },
  {
    label:'mainSection.statRegions',
    value:store.regions?.length || 0,
    icon:Location24Regular,
    color:'text-success bg-success/12',
    position:'top-[56%] left-[18%]',
    delay:'3s',
  },
])

onMounted(()=>{
  store.onInitialApp()
})
</script>

<template>
  <section class="w-full bg-gradient-to-b from-surface-ground to-surface-soft relative overflow-hidden pt-[72px] lg:pt-[88px]">
    <div class="absolute bottom-0 left-0 w-full h-[240px] bg-[url('/footer.png')] bg-no-repeat bg-bottom bg-size-[100%_auto] opacity-40 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-full h-[160px] md:h-[220px] lg:h-[260px] pointer-events-none">
      <UiRailwayScene/>
    </div>
    <UiPageContent class="relative z-10">
      <div class="grid grid-cols-12 gap-6 lg:min-h-[700px] pt-10 md:pt-14 pb-[150px] md:pb-[240px] lg:py-0">
        <div class="col-span-12 lg:col-span-7 flex items-center lg:pb-[170px]">
          <UiSearchArea/>
        </div>
        <div class="col-span-12 lg:col-span-5 relative lg:mb-[220px]">
          <!-- Desktop: suzuvchi kartalar -->
          <div class="hidden lg:block absolute inset-0">
            <div
                v-for="item in stats"
                :key="item.label"
                :class="item.position"
                :style="{animationDelay:item.delay}"
                class="absolute animate-float bg-surface-section rounded-xl shadow-card px-5 py-4 flex items-center gap-4 min-w-[230px]">
              <div :class="item.color" class="w-[52px] h-[52px] rounded-lg flex items-center justify-center">
                <n-icon size="26">
                  <component :is="item.icon"/>
                </n-icon>
              </div>
              <div>
                <div class="text-[28px] font-bold leading-[1.1] text-black-primary">
                  <span v-if="store.loading" class="w-[70px] h-[28px] inline-block animate-shimmer shimmer rounded"></span>
                  <template v-else>{{formatCount(item.value)}}</template>
                </div>
                <div class="text-black-tertiary">{{$t(item.label)}}</div>
              </div>
            </div>
          </div>
          <!-- Mobil: statistika qatori -->
          <div class="lg:hidden grid grid-cols-3 bg-surface-section rounded-xl shadow-card divide-x divide-surface-line">
            <div v-for="item in stats" :key="item.label" class="flex flex-col items-center text-center px-2 py-4 min-w-0">
              <div :class="item.color" class="w-[36px] h-[36px] rounded-lg flex items-center justify-center mb-2">
                <n-icon size="20">
                  <component :is="item.icon"/>
                </n-icon>
              </div>
              <div class="text-xl font-bold text-black-primary leading-[1.1]">{{formatCount(item.value)}}</div>
              <div class="text-xs text-black-tertiary leading-[1.25] mt-1">{{$t(item.label)}}</div>
            </div>
          </div>
        </div>
      </div>
    </UiPageContent>
  </section>
</template>
