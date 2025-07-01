<script setup>
import {Search32Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {useDebounceFn} from "@vueuse/core"
const route = useRoute()

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Vakansiyalar",
})
const store = useVacancyStore()

const onSearch = useDebounceFn((callback) => {
  store.onIndex()
}, 1000, { maxWait: 5000 })

onMounted(()=>{
  store.params.search = route.query?.search
  store.onIndex()
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[160px] mb-[50px]"/>
    <UiPageContent>
      <div class="grid grid-cols-12 gap-x-6 mb-4">
        <div class="col-span-3">
          <div class="bg-surface-ground rounded-lg px-4 pt-6">
            <UiVacancyFilter/>
          </div>
        </div>
        <div class="col-span-9">
          <h3 class="text-black-primary mb-5 text-xl font-medium uppercase">{{$t('vacancy.vacancyCount', {n:0})}}</h3>
          <div class="w-full mb-10 px-2 flex text-black-tertiary items-center bg-surface-ground border border-surface-line rounded-lg h-[50px]">
            <n-icon size="20" class="mx-2">
              <Search32Filled/>
            </n-icon>
            <n-input
                v-model:value="store.params.search"
                class="input-override"
                size="large"
                :placeholder="$t('content.search')"
                @keydown="onSearch"
            />
          </div>
          <n-spin class="min-h-[200px]" :show="store.listLoading">
            <template v-for="item in store.list" :key="item.id">
              <UiVacancyCard :data="item" />
            </template>
          </n-spin>
        </div>
      </div>

    </UiPageContent>
  </div>
  <SectionFooter/>
</template>
