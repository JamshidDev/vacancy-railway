<script setup>
import {ChevronRight20Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
const store = useVacancyStore()

const onChange = ()=>{

}

onMounted(()=>{
  store.onRegions()
})
</script>

<template>
<div class="grid grid-cols-12">
    <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
      <label class="text-black-secondary block mb-1">{{$t('vacancy.area')}}</label>
      <n-select
          v-model:value="store.params.region_id"
          filterable
          clearable
          :options="store.regionList"
          @update:value="onChange"
          label-field="name"
          value-field="id"
          :loading="store.regionLoading"
          size="large"
      />
    </div>
  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <label class="text-black-secondary block mb-1">{{$t('vacancy.city')}}</label>
    <n-select
        v-model:value="store.params.region_id"
        filterable
        clearable
        :options="store.regionList"
        label-field="name"
        value-field="id"
        :loading="store.regionLoading"
        size="large"
    />
  </div>
  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <label class="text-black-secondary block mb-1">{{$t('mainSection.organizations')}}</label>
    <n-select
        v-model:value="store.params.region_id"
        filterable
        clearable
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
      <span class="text-black-secondary">{{$t('vacancy.minExperience')}}</span>
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
          <span class="text-black-tertiary">{{item}} {{$t('content.year')}}</span>
        </n-checkbox>
      </div>

    </n-collapse-transition>

  </div>

  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <div
        @click="store.salary=!store.salary"
        class="flex justify-between cursor-pointer mb-2">
      <span class="text-black-secondary">{{$t('vacancy.salary')}}</span>
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
          <span class="text-black-tertiary">{{item}} 500 000 {{$t('content.sum')}}</span>
        </n-checkbox>
      </div>

    </n-collapse-transition>

  </div>


  <div class="col-span-12 mb-6">
    <n-checkbox class="rounded-lg" v-model:checked="store.params.no_experience">
      {{$t('vacancy.noExperience')}}
    </n-checkbox>
  </div>
</div>
</template>

<style scoped>

</style>