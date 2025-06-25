<script setup>
import {Call28Regular, Location24Regular, Globe24Regular} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
const store = useVacancyStore()
</script>

<template>
<div>
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

    <n-button type="primary" size="large" class="!w-full !mt-6">{{$t('detail.sendApply')}}</n-button>
</div>
</template>

<style scoped>

</style>