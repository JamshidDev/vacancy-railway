<script setup>
import {ChevronRight20Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"


const store = useVacancyStore()
</script>

<template>
<div class="grid grid-cols-12">
    <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
      <label class="text-black-secondary block mb-1">Hudud</label>
      <n-select
          v-model:value="store.params.region_id"
          filterable
          :options="store.regionList"
          label-field="name"
          value-field="id"
          :loading="store.regionLoading"
          size="large"
      />
    </div>
  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <label class="text-black-secondary block mb-1">Tuman/shahar</label>
    <n-select
        v-model:value="store.params.region_id"
        filterable
        :options="store.regionList"
        label-field="name"
        value-field="id"
        :loading="store.regionLoading"
        size="large"
    />
  </div>
  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <label class="text-black-secondary block mb-1">Tashkilotlar</label>
    <n-select
        v-model:value="store.params.region_id"
        filterable
        :options="store.regionList"
        label-field="name"
        value-field="id"
        :loading="store.regionLoading"
        size="large"
    />
  </div>
  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <div
        @click="store.experience=!store.experience"
        class="flex justify-between cursor-pointer mb-2">
      <span class="text-black-secondary">Minimal mehnat staji</span>
      <n-icon
          size="18"
          class="text-black-tertiary transition-all rotate-[0deg]"
          :class="[store.experience && 'rotate-[90deg]']"
      >
        <ChevronRight20Filled/>
      </n-icon>
    </div>
    <n-collapse-transition :show="store.experience">
      <div v-for="item in 5" class="mb-2">
        <n-checkbox v-model:checked="store.params.experience">
          <span class="text-black-tertiary">{{item}} yil</span>
        </n-checkbox>
      </div>

    </n-collapse-transition>

  </div>

  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <div
        @click="store.salary=!store.salary"
        class="flex justify-between cursor-pointer mb-2">
      <span class="text-black-secondary">Ish haqi</span>
      <n-icon
          size="18"
          class="text-black-tertiary transition-all rotate-[0deg]"
          :class="[store.salary && 'rotate-[90deg]']"
      >
        <ChevronRight20Filled/>
      </n-icon>
    </div>
    <n-collapse-transition :show="store.salary">
      <div v-for="item in 5" class="mb-2">
        <n-checkbox v-model:checked="store.params.experience">
          <span class="text-black-tertiary">{{item}} 500 000 so'm</span>
        </n-checkbox>
      </div>

    </n-collapse-transition>

  </div>


  <div class="col-span-12 mb-6">
    <n-checkbox class="rounded-lg" v-model:checked="store.params.no_experience">
      Mehnat staji talab etilmaydi
    </n-checkbox>
  </div>
</div>
</template>

<style scoped>

</style>