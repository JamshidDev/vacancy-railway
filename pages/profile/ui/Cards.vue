<script setup>
import {AppGeneric24Regular} from "@vicons/fluent"
</script>

<template>
<div class="grid grid-cols-12 gap-4 bg-surface-section rounded-2xl py-6 mt-8 px-4">

  <template v-for="item in 4" :key="item">
    <div class="col-span-12 md:col-span-6 lg:col-span-3 px-4 py-4 border border-surface-line rounded-2xl flex items-center">
      <n-icon class="text-primary" size="32">
        <AppGeneric24Regular/>
      </n-icon>
      <div class="w-[calc(100%-80px)] pl-4">
        <p class="text-black-secondary font-semibold leading-[1]">Mening arizalarim</p>
        <p class="text-black-tertiary">Arizalar soni</p>
      </div>
      <n-button type="warning" secondary>
        <template #icon>
          <span class="font-semibold">
              0
          </span>
        </template>
      </n-button>
    </div>
  </template>

</div>
</template>