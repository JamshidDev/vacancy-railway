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

const goToApplications = () => {
  profileStore.applySuccessVisible = false
  router.push('/applications')
}

onMounted(()=>{
  const id = route.query.id
  if(!id) router.go(-1)
  store.onShow(id)
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[160px] mb-[50px]" :custom-title="store.detail?.position || ''" />
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
        <span class="uppercase font-black text-lg text-black-primary">{{$t('detail.sendApply')}}</span>
      </template>
      <ApplyForm/>
    </UiModal>

    <!-- Success Modal -->
    <UiModal
        :width="500"
        v-model:visible="profileStore.applySuccessVisible"
        :show-header="false"
    >
      <div class="flex flex-col items-center py-10 px-6">
        <n-icon size="100" class="text-success">
          <CheckmarkCircle48Filled/>
        </n-icon>
        <h3 class="text-2xl font-bold text-black-primary mt-6 text-center">
          {{ $t('detail.applySuccessTitle') }}
        </h3>
        <p class="text-black-tertiary text-center mt-3 text-base">
          {{ $t('detail.applySuccessText') }}
        </p>
        <n-button @click="goToApplications" type="primary" size="large" class="!w-full !mt-8">
          {{ $t('detail.viewApplications') }}
        </n-button>
      </div>
    </UiModal>
  </div>
</template>


