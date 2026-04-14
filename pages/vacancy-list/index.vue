<script setup>
import {Search32Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {useDebounceFn} from "@vueuse/core"

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Vakansiyalar",
})
const store = useVacancyStore()

const onSearch = useDebounceFn(() => {
  store.params.page = 1
  store.onIndex()
}, 1000, { maxWait: 5000 })

onMounted(()=>{
  if (store.params.region_id) {
    store.onCities(store.params.region_id)
  }
  if (!store.list.length) {
    store.onIndex()
  }
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[160px] mb-[50px]"/>
    <UiPageContent>
      <div class="lg:flex mb-4">
        <div class="w-full lg:w-[330px]">
          <div class="bg-surface-ground rounded-lg px-4 pt-6">
            <UiVacancyFilter/>
          </div>
        </div>
        <div class="w-full lg:w-[calc(100%-330px)] lg:pl-8 mt-10 lg:mt-0">
          <h3 class="text-black-primary mb-5 text-xl font-medium uppercase">{{$t('vacancy.vacancyCount', {n:store.pagination.total})}}</h3>
          <div class="w-full mb-10 px-2 flex text-black-tertiary items-center bg-surface-ground border border-surface-line rounded-lg h-[50px]">
            <n-icon size="20" class="mx-2">
              <Search32Filled/>
            </n-icon>
            <n-input
                v-model:value="store.params.search"
                class="input-override"
                size="large"
                :placeholder="$t('content.search')"
                @input="onSearch"
            />
          </div>
          <n-spin class="min-h-[200px]" :show="store.listLoading">
            <template v-for="item in store.list" :key="item.id">
              <UiVacancyCard :data="item" />
            </template>
          </n-spin>
          <div class="flex justify-center mt-8 pagination-wrapper">
            <n-pagination
                :page="store.pagination.current_page"
                :page-count="Math.ceil(store.pagination.total / store.params.per_page)"
                :page-slot="5"
                @update:page="store.onPageChange"
            />
          </div>
        </div>
      </div>

    </UiPageContent>
  </div>
  <SectionFooter/>
</template>

<style scoped>
.pagination-wrapper :deep(.n-pagination-item--active) {
  font-weight: 700;
}
</style>
