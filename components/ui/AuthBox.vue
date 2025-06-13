<script setup>
import {useAuthStore} from "~/store";

const store = useAuthStore()

</script>

<template>
<div class="w-full grid grid-cols-12 p-4">


  <div class="col-span-12 flex gap-2 bg-surface-ground p-2 rounded-lg mb-6">
    <template v-for="item in store.tabs">
      <div
          @click="store.onChangeTab(item.id)"
          :class="[store.activeTab === item.id && 'text-primary shadow bg-surface-section']"
          class="py-2 px-5 rounded-lg font-bold cursor-pointer">{{$t(item.name)}}</div>
    </template>
  </div>

  <div class="col-span-12 bg-surface-ground border border-surface-line rounded-2xl px-4 py-2 mb-4">
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