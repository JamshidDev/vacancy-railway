<script setup>
import {Search32Filled, Filter24Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {useDebounceFn} from "@vueuse/core"

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Vakansiyalar",
})
const store = useVacancyStore()
const route = useRoute()

// Skeleton faqat ilk yuklanishda; keyingi so'rovlarda joriy natija joyida qoladi
const initialLoading = ref(true)
watch(() => store.listLoading, (loading) => {
  if (!loading) initialLoading.value = false
})

// Mobil filtr paneli
const filterVisible = ref(false)
const activeFilterCount = computed(()=> [
  store.params.region_id,
  store.params.city_id,
  store.params.organization_id,
  store.params.experience,
  store.params.salary,
].filter(v => v !== null && v !== undefined && v !== '').length)

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
    <UiBreadCrump class="mt-[72px] lg:mt-[88px] mb-6 md:mb-8 lg:mb-10"/>
    <UiPageContent>
      <div class="lg:flex mb-12 lg:mb-16 gap-8">
        <aside class="hidden lg:block w-[340px] shrink-0">
          <div class="bg-surface-ground rounded-xl p-6 lg:sticky lg:top-[112px]">
            <UiVacancyFilter/>
          </div>
        </aside>
        <div class="flex-1 min-w-0">
          <h1 class="text-black-primary mb-4 md:mb-5 text-xl sm:text-2xl md:text-[28px] font-bold uppercase">{{$t('vacancy.vacancyCount', {n:store.pagination.total})}}</h1>
          <div class="w-full mb-4 lg:mb-8 px-3 flex text-black-tertiary items-center bg-surface-ground border border-surface-line rounded-xl h-[52px] md:h-[56px] focus-within:border-primary/50 transition-colors">
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
          <button
              @click="filterVisible = true"
              class="lg:hidden w-full mb-5 h-[48px] flex items-center justify-center gap-2 rounded-xl border border-surface-line bg-surface-section text-black-primary font-semibold cursor-pointer">
            <n-icon size="20" class="text-primary">
              <Filter24Regular/>
            </n-icon>
            {{$t('vacancy.filters')}}
            <span v-if="activeFilterCount" class="min-w-[22px] h-[22px] px-1.5 rounded-full bg-primary text-white text-xs flex items-center justify-center">{{activeFilterCount}}</span>
          </button>
          <div class="min-h-[200px]">
            <UiVacancyCardSkeleton v-if="initialLoading" :count="5" />
            <n-spin v-else :show="store.listLoading" :delay="150">
              <template v-for="item in store.list" :key="item.id">
                <UiVacancyCard :data="item" />
              </template>
              <UiNoResult v-if="store.list.length === 0" />
            </n-spin>
          </div>
          <div v-if="store.pagination.total > store.params.per_page" class="flex justify-center mt-6 md:mt-8 pagination-wrapper">
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

  <n-drawer
      v-model:show="filterVisible"
      placement="bottom"
      height="85vh"
      class="!rounded-t-2xl"
  >
    <n-drawer-content :title="$t('vacancy.filters')" closable :native-scrollbar="false">
      <UiVacancyFilter/>
      <template #footer>
        <n-button type="primary" size="large" block @click="filterVisible = false">
          {{$t('vacancy.showResults', {n: store.pagination.total})}}
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.pagination-wrapper :deep(.n-pagination-item--active) {
  font-weight: 700;
}
</style>
