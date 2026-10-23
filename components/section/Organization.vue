<script setup>
import {useVacancyStore} from "~/store"
const store = useVacancyStore()
const router = useRouter()

const localePath = useLocalePath()

const onClickOrganization = (item) => {
  navigateTo({
    path: localePath('/vacancy-list'),
    query: { organization_id: item.organization_id }
  })
}

const onClickRegion = (item) => {
  navigateTo({
    path: localePath('/vacancy-list'),
    query: { region_id: item.region_id }
  })
}
</script>

<template>
<section class="w-full bg-surface-section pb-12 md:pb-16 lg:pb-24">
    <UiPageContent>
      <UiSectionTitle :title="$t('mainSection.organizations')" :subtitle="$t('mainSection.availableOrganization')">
        <template #right>
          <div class="flex w-full sm:w-auto bg-surface-ground p-1 rounded-lg">
            <template v-for="(item,index) in store.tabList" :key="index">
              <div
                  @click="store.onChangeTab(item.id)"
                  :class="[item.id === store.activeTab ? 'bg-surface-section shadow-navbar text-black-primary' : 'text-black-secondary hover:text-primary']"
                  class="flex-1 sm:flex-none text-center px-4 md:px-7 py-2 rounded-md font-semibold uppercase transition-all duration-300 cursor-pointer text-sm md:text-base">{{$t(item.name)}}</div>
            </template>
          </div>
        </template>
      </UiSectionTitle>

      <!-- animated yo'q: aks holda Naive panelni overflow:hidden ichiga oladi va hoverda kattalashgan karta soyasi kesiladi -->
      <n-tabs v-model:value="store.activeTab" class="hidden-tab-header org-tabs" type="segment">
        <n-tab-pane :name="store.tabList[0].id">
          <n-spin :class="store.loading && 'min-h-[200px]'" :show="store.loading">
            <div class="grid grid-cols-12 gap-6">
              <template v-for="item in store.organizations" :key="item">
                <div @click="onClickOrganization(item)" class="col-span-12 md:col-span-6 lg:col-span-4 p-4 sm:p-5 bg-surface-soft border border-surface-line
               rounded-xl flex items-center cursor-pointer gap-4 sm:gap-5 hover:border-primary/30 transition-all duration-300
               hover:scale-[1.03] motion-reduce:hover:scale-100">
                  <div class="text-error bg-error/10 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] shrink-0 rounded-xl flex items-center justify-center">
                    <n-icon size="34"><IconCorporation/></n-icon>
                  </div>
                  <div class="flex flex-col justify-between self-stretch border-l border-surface-line pl-4 sm:pl-5 min-w-0">
                    <h3 class="text-black-primary font-bold text-base sm:text-lg leading-[1.3] line-clamp-2">{{item.organization_full_name}}</h3>
                    <p class="text-black-secondary text-sm mt-4">{{$t('mainSection.availableVacancy',{n:item.vacancies_count})}}</p>
                  </div>
                </div>
              </template>
              <UiNoResult class="col-span-12" v-if="store.organizations?.length===0 && !store.loading" />

            </div>
          </n-spin>

        </n-tab-pane>
        <n-tab-pane :name="store.tabList[1].id">
          <n-spin :class="store.loading && 'min-h-[200px]'" :show="store.loading">
            <div class="grid grid-cols-12 gap-6">
              <template v-for="item in store.regions" :key="item">
                <div @click="onClickRegion(item)" class="col-span-12 md:col-span-6 lg:col-span-4 p-4 sm:p-5 bg-surface-soft border border-surface-line
               rounded-xl flex items-center cursor-pointer gap-4 sm:gap-5 hover:border-primary/30 transition-all duration-300
               hover:scale-[1.03] motion-reduce:hover:scale-100">
                  <div class="text-success bg-success/12 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] shrink-0 rounded-xl flex items-center justify-center">
                    <n-icon size="34"><IconPlaces/></n-icon>
                  </div>
                  <div class="flex flex-col justify-between self-stretch border-l border-surface-line pl-4 sm:pl-5 min-w-0">
                    <h3 class="text-black-primary font-bold text-base sm:text-lg leading-[1.3] line-clamp-2">{{item.region_name}}</h3>
                    <p class="text-black-secondary text-sm mt-4">{{$t('mainSection.availableVacancy',{n:item.vacancies_count})}}</p>
                  </div>
                </div>
              </template>
              <UiNoResult class="col-span-12" v-if="store.regions?.length===0 && !store.loading" />
            </div>
          </n-spin>

        </n-tab-pane>
      </n-tabs>
    </UiPageContent>
</section>
</template>
