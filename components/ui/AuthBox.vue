<script setup>
import {useAuthStore} from "~/store";

const store = useAuthStore()

</script>

<template>
<div class="w-full grid grid-cols-12 py-2 sm:p-4">


  <div class="col-span-12 flex gap-1 sm:gap-2 bg-surface-ground p-1 sm:p-2 rounded-lg mb-4 sm:mb-6">
    <template v-for="item in store.tabs">
      <div
          @click="store.onChangeTab(item.id)"
          :class="[store.activeTab === item.id && 'text-primary shadow bg-surface-section']"
          class="flex-1 text-center whitespace-nowrap py-2 px-2 sm:px-5 rounded-lg font-bold cursor-pointer text-sm sm:text-base transition-all">{{$t(item.name)}}</div>
    </template>
  </div>

  <div class="col-span-12 sm:bg-surface-ground sm:border border-surface-line rounded-2xl sm:px-4 py-2 mb-2 sm:mb-4">
    <n-tabs animated v-model:value="store.activeTab" class="hidden-tab-header" type="segment">
      <n-tab-pane :name="store.tabs[0].id">
        <slot name="login-tab"></slot>
      </n-tab-pane>
      <n-tab-pane :name="store.tabs[1].id">
        <slot name="register-tab"></slot>
      </n-tab-pane>

    </n-tabs>
  </div>
</div>
</template>