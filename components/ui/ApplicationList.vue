<script setup>
import {useVacancyStore, useProfileStore} from "~/store/index.js"

const store = useVacancyStore()
const profileStore = useProfileStore()

const messageModalVisible = ref(false)
const detailsModalVisible = ref(false)
const selectedApplication = ref(null)

const pageCount = computed(()=> Math.ceil(store.applicationPagination.total / store.applicationParams.per_page) || 1)

const onShowMessage = (data) => {
  selectedApplication.value = data
  messageModalVisible.value = true
}

const onShowDetails = (data) => {
  selectedApplication.value = data
  detailsModalVisible.value = true
  profileStore.onGetEnum()
  store.onApplicationDetail(data.id)
}

onMounted(()=>{
  // Tab har ochilganda ariza holatlari yangilanadi
  store.onApplications()
})
</script>

<template>
<div>
  <div class="flex items-center justify-between gap-4 mb-4">
    <h2 class="font-semibold text-xl text-primary">
      {{ $t('profile.menu.myApplications') }}
      <span v-if="!store.applicationLoading" class="text-black-tertiary">({{ store.applicationPagination.total }})</span>
    </h2>
  </div>

  <!-- Skeleton -->
  <template v-if="store.applicationLoading">
    <div v-for="i in 3" :key="i" class="px-4 sm:px-6 py-4 bg-surface-soft border border-surface-line rounded-xl mb-4">
      <div class="flex justify-between items-start gap-4">
        <n-skeleton text style="width: 220px; height: 20px" />
        <n-skeleton text style="width: 80px; height: 22px; border-radius: 20px" />
      </div>
      <n-skeleton text style="width: 160px; height: 14px" class="mt-2" />
      <div class="grid grid-cols-2 mt-4 gap-2">
        <n-skeleton text style="width: 120px; height: 14px" />
        <n-skeleton text style="width: 150px; height: 14px" />
        <n-skeleton text style="width: 90px; height: 14px" />
        <n-skeleton text style="width: 130px; height: 14px" />
      </div>
    </div>
  </template>

  <template v-else>
    <template v-if="store.applicationList.length">
      <template v-for="item in store.applicationList" :key="item.id">
        <UiApplicationCard :data="item" @showMessage="onShowMessage" @showDetails="onShowDetails" />
      </template>
    </template>
    <UiNoResult v-else />
  </template>

  <div v-if="pageCount > 1" class="flex justify-center mt-6 pagination-wrapper">
    <n-pagination
        :page="store.applicationPagination.current_page"
        :page-count="pageCount"
        :page-slot="5"
        @update:page="store.onApplicationPageChange"
    />
  </div>

  <!-- Message Modal -->
  <UiModal
      :width="600"
      v-model:visible="messageModalVisible"
  >
    <template #header-title>
      <span class="text-lg font-bold text-black-primary">{{ $t('content.messageDetails') }}</span>
    </template>

    <div class="w-full h-[350px] overflow-y-auto">
      <template v-if="selectedApplication?.messages?.length">
        <div
            v-for="msg in selectedApplication.messages"
            :key="msg.id"
            class="mb-4"
        >
          <div class="px-4 py-3 rounded-xl bg-primary/10">
            <p class="text-black-secondary whitespace-pre-line text-sm leading-relaxed">{{ msg.message }}</p>
          </div>
          <p class="text-black-tertiary text-xs mt-2 text-center">{{ utils.formattedDate(msg.created_at) }}</p>
        </div>
      </template>
      <div v-else class="flex justify-center items-center h-[100px]">
        <p class="text-black-tertiary">{{ $t('content.no-data') }}</p>
      </div>
    </div>

    <div class="mt-4">
      <n-button @click="messageModalVisible = false" type="primary" class="!w-full">
        {{ $t('content.close') }}
      </n-button>
    </div>
  </UiModal>

  <!-- Details Modal -->
  <UiApplicationDetailsModal v-model:visible="detailsModalVisible" />
</div>
</template>

<style scoped>
.pagination-wrapper :deep(.n-pagination-item--active) {
  font-weight: 700;
}
</style>
