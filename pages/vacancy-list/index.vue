<script setup>
import {Search32Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {useDebounceFn} from "@vueuse/core"

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Vakansiyalar",
})
const store = useVacancyStore()
const route = useRoute()

const onSearch = useDebounceFn(() => {
  store.params.page = 1
  store.onIndex()
}, 1000, { maxWait: 5000 })

const initFromQuery = () => {
  const { organization_id, region_id, search } = route.query

  const newOrgId = organization_id ? Number(organization_id) : null
  const newRegionId = region_id ? Number(region_id) : null
  const newSearch = search || null

  // Agar qiymatlar bir xil bo'lsa, hech narsa qilmaslik
  const isSame = store.params.organization_id === newOrgId &&
                 store.params.region_id === newRegionId &&
                 store.params.search === newSearch

  if (isSame) return false

  store.params.organization_id = newOrgId
  store.params.region_id = newRegionId
  store.params.search = newSearch

  // Region o'zgarganda city ni tozalash
  if (store.params.region_id !== newRegionId) {
    store.params.city_id = null
  }

  return true
}

// Route query o'zgarganda filterni yangilash (browser back/forward uchun)
watch(() => route.query, () => {
  const changed = initFromQuery()
  if (changed) {
    if (store.params.region_id) {
      store.onCities(store.params.region_id)
    } else {
      store.cityList = []
    }
    store.params.page = 1
    store.onIndex()
  }
}, { deep: true })

onMounted(() => {
  // Query params dan filter qiymatlarini olish
  const { organization_id, region_id, search } = route.query

  // Avval barcha filterlarni tozalash (eski qiymatlar qolmasligi uchun)
  store.params.organization_id = organization_id ? Number(organization_id) : null
  store.params.region_id = region_id ? Number(region_id) : null
  store.params.city_id = null
  store.params.search = search || null
  store.params.page = 1

  // Region tanlangan bo'lsa, shaharlarni yuklash
  if (store.params.region_id) {
    store.onCities(store.params.region_id)
  } else {
    store.cityList = []
  }

  // Har doim yangi ma'lumot olish
  store.onIndex()
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[72px] lg:mt-[88px] mb-8 lg:mb-10"/>
    <UiPageContent>
      <div class="lg:flex mb-16 gap-8">
        <aside class="w-full lg:w-[340px] shrink-0">
          <div class="bg-surface-ground rounded-xl p-6 lg:sticky lg:top-[112px]">
            <UiVacancyFilter/>
          </div>
        </aside>
        <div class="flex-1 min-w-0 mt-10 lg:mt-0">
          <h1 class="text-black-primary mb-5 text-2xl md:text-[28px] font-bold uppercase">{{$t('vacancy.vacancyCount', {n:store.pagination.total})}}</h1>
          <div class="w-full mb-8 px-3 flex text-black-tertiary items-center bg-surface-ground border border-surface-line rounded-xl h-[56px] focus-within:border-primary/50 transition-colors">
            <n-icon size="24" class="mx-2">
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
          <div class="min-h-[200px]">
            <template v-if="store.listLoading">
              <UiVacancyCardSkeleton :count="5" />
            </template>
            <template v-else>
              <template v-for="item in store.list" :key="item.id">
                <UiVacancyCard :data="item" />
              </template>
              <UiNoResult v-if="store.list.length === 0" />
            </template>
          </div>
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
