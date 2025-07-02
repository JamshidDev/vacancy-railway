<script setup>
import {Box, Sidebar, Content} from "~/pages/vacancy-list/detail/ui/index.js"
import {useVacancyStore, useProfileStore} from "../../../store/index.js"
import ApplyForm from "../../../components/ui/ApplyForm.vue"
definePageMeta({
  layout:"admin-layout"
})

const route = useRoute()
const router = useRouter()
const store = useVacancyStore()
const profileStore = useProfileStore()

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
  </div>
</template>


