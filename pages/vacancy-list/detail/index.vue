<script setup>
import {Box, Sidebar, Content} from "~/pages/vacancy-list/detail/ui/index.js"
import {useVacancyStore, useProfileStore} from "../../../store/index.js"
import ApplyForm from "../../../components/ui/ApplyForm.vue"
import {CheckmarkCircle48Filled} from "@vicons/fluent"

definePageMeta({
  layout:"admin-layout"
})

const route = useRoute()
const router = useRouter()
const store = useVacancyStore()
const profileStore = useProfileStore()

const localePath = useLocalePath()

const goToApplications = () => {
  profileStore.applySuccessVisible = false
  router.push({path: localePath('/profile'), query: {tab: 'applications'}})
}

const goToVacancies = () => {
  profileStore.applySuccessVisible = false
  router.push(localePath('/vacancy-list'))
}

onMounted(()=>{
  const id = route.query.id
  if(!id) router.go(-1)
  store.onShow(id)
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[72px] lg:mt-[88px] mb-6 md:mb-8 lg:mb-10" :custom-title="store.detail?.position || ''" />
    <UiPageContent class="mb-6">
      <Box>
        <template #sidebar>
          <Sidebar/>
        </template>
        <template #content>
          <Content/>
        </template>
      </Box>
    </UiPageContent>
    <SectionFooter/>
    <UiModal
        :width="500"
        v-model:visible="profileStore.applyVisible"
    >
      <template #header-title>
        <span class="font-bold text-lg sm:text-xl text-black-primary">{{$t('detail.sendApply')}}</span>
      </template>
      <ApplyForm/>
    </UiModal>

    <!-- Success Modal -->
    <UiModal
        :width="500"
        v-model:visible="profileStore.applySuccessVisible"
        :show-header="false"
    >
      <div class="flex flex-col items-center text-center pt-8 pb-4 px-2 sm:px-6">
        <div class="w-20 h-20 rounded-full bg-success/12 ring-8 ring-success/5 flex items-center justify-center">
          <n-icon size="48" class="text-success">
            <CheckmarkCircle48Filled/>
          </n-icon>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-black-primary mt-6">
          {{ $t('detail.applySuccessTitle') }}
        </h3>
        <p v-if="store.detail?.position" class="text-primary font-semibold mt-2">{{ store.detail.position }}</p>
        <p class="text-black-tertiary mt-3 leading-relaxed">
          {{ $t('detail.applySuccessText') }}
        </p>
        <div class="w-full flex flex-col gap-2 mt-8">
          <n-button @click="goToApplications" type="primary" size="large" block>
            {{ $t('detail.viewApplications') }}
          </n-button>
          <n-button @click="goToVacancies" secondary size="large" block>
            {{ $t('mainSection.allVacancies') }}
          </n-button>
        </div>
      </div>
    </UiModal>
  </div>
</template>


