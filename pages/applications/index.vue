<script setup>
import {useVacancyStore} from "~/store/index.js"

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Arizalarim",
  middleware:'auth',
})

const store = useVacancyStore()

const messageModalVisible = ref(false)
const selectedApplication = ref(null)

const onShowMessage = (data) => {
  selectedApplication.value = data
  messageModalVisible.value = true
}

onMounted(()=>{
  if (!store.applicationList.length) {
    store.onApplications()
  }
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[120px] sm:mt-[140px] md:mt-[160px] mb-6 sm:mb-8 md:mb-[50px]"/>
    <UiPageContent>
      <h3 class="text-black-primary mb-4 sm:mb-5 text-lg sm:text-xl font-medium uppercase px-2 sm:px-0">
        {{ $t('profile.menu.myApplications') }}
        <span v-if="!store.applicationLoading">({{ store.applicationPagination.total }})</span>
      </h3>

      <!-- Skeleton Loader -->
      <template v-if="store.applicationLoading">
        <div v-for="i in 3" :key="i" class="px-3 sm:px-4 py-2.5 bg-surface-ground border border-surface-line rounded-lg mb-2">
          <!-- Title & Status -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1.5 sm:gap-0">
            <n-skeleton text style="width: 180px; height: 18px" class="order-2 sm:order-1" />
            <n-skeleton text style="width: 70px; height: 18px; border-radius: 20px" class="order-1 sm:order-2" />
          </div>
          <!-- Department -->
          <div class="mt-1 pb-2 border-b border-surface-line flex items-center gap-1">
            <n-skeleton circle style="width: 12px; height: 12px" />
            <n-skeleton text style="width: 130px; height: 12px" />
          </div>
          <!-- Organization -->
          <div class="mt-1.5">
            <n-skeleton text style="width: 220px; height: 14px" />
          </div>
          <!-- Grid Info -->
          <div class="grid grid-cols-2 mt-2 gap-1.5">
            <div class="flex items-center gap-x-1.5">
              <n-skeleton circle style="width: 14px; height: 14px" />
              <n-skeleton text style="width: 100px; height: 12px" />
            </div>
            <div class="flex items-center gap-x-1.5">
              <n-skeleton circle style="width: 14px; height: 14px" />
              <n-skeleton text style="width: 140px; height: 12px" />
            </div>
            <div class="flex items-center gap-x-1.5">
              <n-skeleton circle style="width: 14px; height: 14px" />
              <n-skeleton text style="width: 70px; height: 12px" />
            </div>
            <div class="flex items-center gap-x-1.5">
              <n-skeleton circle style="width: 14px; height: 14px" />
              <n-skeleton text style="width: 120px; height: 12px" />
            </div>
          </div>
          <!-- Footer -->
          <div class="mt-2 border-t border-surface-line pt-2">
            <div class="flex gap-1 items-center">
              <n-skeleton circle style="width: 14px; height: 14px" />
              <n-skeleton text style="width: 160px; height: 12px" />
            </div>
          </div>
        </div>
      </template>

      <!-- Content -->
      <template v-else>
        <template v-if="store.applicationList.length">
          <template v-for="item in store.applicationList" :key="item.id">
            <UiApplicationCard :data="item" @showMessage="onShowMessage" />
          </template>
        </template>
        <n-empty v-else :description="$t('content.no-data')" />
      </template>

      <div class="flex justify-center mt-6 sm:mt-8 pb-10 sm:pb-16 pagination-wrapper">
        <n-pagination
            :page="store.applicationPagination.current_page"
            :page-count="Math.ceil(store.applicationPagination.total / store.applicationParams.per_page) || 1"
            :page-slot="5"
            @update:page="store.onApplicationPageChange"
        />
      </div>
    </UiPageContent>
  </div>
  <SectionFooter/>

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
</template>

<style scoped>
.pagination-wrapper :deep(.n-pagination-item--active) {
  font-weight: 700;
}
</style>
