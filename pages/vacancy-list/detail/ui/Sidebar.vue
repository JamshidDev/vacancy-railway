<script setup>
import {Call28Regular, Location24Regular, Globe24Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
import {useAuthStore, useProfileStore} from "../../../../store/index.js"
const store = useVacancyStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { t} = useI18n()


const onApplyApplication = ()=> {
  const expire = utils.getDaysBetweenDates(store.detail?.to)
  if(isNaN(expire)){
    $Toast.error(t('detail.expired'))
    return
  }

  if (!authStore.token) {
    authStore.activeTab = 1
    authStore.authVisible = true
    return
  }

  if (store.sendData) return
  profileStore.applyVisible = true

}

const status = computed(()=>{
  const status = {
    type:'primary',
    text:'detail.sendApply'
  }

  const expire = utils.getDaysBetweenDates(store.detail?.to)
  if(isNaN(expire)){
    status.type = 'error'
    status.text = 'detail.expired'
  }

  if(store.sendData){
    status.type = 'warning'
    status.text = 'detail.sentApply'
  }
  return status



})
</script>

<template>
<div>
  <!-- Skeleton -->
  <template v-if="store.showLoading">
    <div>
      <n-skeleton text style="width: 100%; height: 20px" />
      <n-skeleton text style="width: 80%; height: 20px" class="mt-1" />
      <n-skeleton text style="width: 60%; height: 20px" class="mt-1" />
    </div>
    <div class="bg-surface-section rounded-lg mt-4">
      <div class="flex items-center py-2 px-2 border-b border-surface-line">
        <n-skeleton circle style="width: 24px; height: 24px" />
        <n-skeleton text style="width: 120px; height: 16px" class="ml-4" />
      </div>
      <div class="flex items-center py-2 px-2 border-b border-surface-line">
        <n-skeleton circle style="width: 24px; height: 24px" />
        <n-skeleton text style="width: 150px; height: 16px" class="ml-4" />
      </div>
      <div class="flex items-center py-2 px-2 border-b border-surface-line">
        <n-skeleton circle style="width: 24px; height: 24px" />
        <n-skeleton text style="width: 100px; height: 16px" class="ml-4" />
      </div>
    </div>
    <n-skeleton text style="width: 100%; height: 40px; border-radius: 6px" class="mt-6" />
  </template>

  <!-- Content -->
  <template v-else>
    <h2 class="text-black-primary font-bold">
      {{store.detail?.organization}},
      {{store.detail?.department}},
      {{store.detail?.position}},
    </h2>

    <div class="bg-surface-section rounded-lg mt-4">
      <div class="flex items-center py-2 px-2 border-b border-surface-line text-black-secondary">
        <n-icon size="24" class="text-primary">
          <Call28Regular/>
        </n-icon>
        <span class="pl-4 inline-block font-semibold">{{store.detail?.phone || $t('content.emptyData')}}</span>
      </div>
      <div class="flex items-center py-2 px-2 border-b border-surface-line !text-black-secondary">
        <n-icon size="24" class="text-primary">
          <Location24Regular/>
        </n-icon>
        <span class="pl-4 inline-block font-semibold">{{store.detail?.address || $t('content.emptyData')}}</span>
      </div>
      <div class="flex items-center py-2 px-2 border-b border-surface-line text-black-secondary">
        <n-icon size="24" class="text-primary">
          <Globe24Regular/>
        </n-icon>
        <span class="pl-4 inline-block font-semibold">{{store.detail?.site || $t('content.emptyData')}}</span>
      </div>
    </div>

    <n-button :loading="store.showLoading" @click="onApplyApplication" secondary :type="status.type" size="large" class="!w-full !mt-6">{{$t(status.text)}}</n-button>
  </template>
</div>
</template>
