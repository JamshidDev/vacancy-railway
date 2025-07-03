<script setup>
import {useVacancyStore} from "~/store"
const store = useVacancyStore()
</script>

<template>
<div class="w-full">
    <UiPageContent>
      <h3 class="text-center text-black-primary text-4xl font-medium pt-[100px]">{{$t('mainSection.organizations')}}</h3>
      <small class="text-black-tertiary text-center mt-4 text-[14px]">{{$t('mainSection.availableOrganization')}}</small>

      <div class="w-full flex gap-4 bg-primary/10 border-surface-line p-1 rounded-xl mt-6">
        <template v-for="(item,index) in store.tabList" :key="index">
          <div
              @click="store.onChangeTab(item.id)"
              :class="[item.id === store.activeTab && 'shadow bg-surface-section']"
              class="px-8 py-1  rounded-lg font-medium  uppercase transition-all duration-300 cursor-pointer">{{$t(item.name)}}</div>
        </template>
      </div>

      <n-tabs animated v-model:value="store.activeTab" class="hidden-tab-header mb-[60px]" type="segment">
        <n-tab-pane :name="store.tabList[0].id">
          <n-spin class="min-h-[200px]" :show="store.loading">
            <div class="grid grid-cols-12 gap-x-6 gap-y-4 ">
              <template v-for="item in store.organizations" :key="item">
                <div class="col-span-12 md:col-span-6  lg:col-span-4 p-2 bg-surface-ground border border-surface-line
               rounded-lg flex items-center cursor-pointer gap-2
">
                  <IconBuild2/>
                  <div class="flex flex-col border-l border-surface-line pl-4 w-[calc(100%-50px)]">
                    <h2 class="text-black-primary font-semibold text-lg">{{item.organization_full_name}}</h2>
                    <h6 class="text-black-tertiary text-sm mt-6">{{$t('mainSection.availableVacancy',{n:item.vacancies_count})}}</h6>
                  </div>
                </div>
              </template>
              <UiNoResult class="col-span-12" v-if="store.organizations?.length===0 && !store.loading" />

            </div>
          </n-spin>

        </n-tab-pane>
        <n-tab-pane :name="store.tabList[1].id">
          <n-spin class="min-h-[200px]" :show="store.loading">
            <div class="grid grid-cols-12 gap-x-6 gap-y-4 ">
              <template v-for="item in store.regions" :key="item">
                <div class="col-span-12 md:col-span-6  lg:col-span-4 p-2 bg-surface-ground border border-surface-line
               rounded-lg flex items-center cursor-pointer gap-2
">
                  <IconBuild />
                  <div class="flex flex-col border-l border-surface-line pl-4 w-[calc(100%-50px)]">
                    <h2 class="text-black-primary font-medium text-lg">{{item.region_name}}</h2>
                    <h6 class="text-black-tertiary text-sm mt-6">{{$t('mainSection.availableVacancy',{n:item.vacancies_count})}}</h6>
                  </div>
                </div>
              </template>
              <UiNoResult class="col-span-12" v-if="store.regions?.length===0 && !store.loading" />
            </div>
          </n-spin>

        </n-tab-pane>
      </n-tabs>
    </UiPageContent>
</div>
</template>

<style scoped>

</style>