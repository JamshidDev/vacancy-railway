<script setup>
import {ChevronRight20Filled} from "@vicons/fluent"
import {useVacancyStore} from "~/store/index.js"
const store = useVacancyStore()

const onChange = ()=>{
  store.params.city_id = null
  store.params.page = 1
  store.onIndex()
  if (store.params.region_id) {
    store.onCities(store.params.region_id)
  } else {
    store.cityList = []
  }
}

const onFilterChange = ()=>{
  store.params.page = 1
  store.onIndex()
}

const onExperienceChange = (value)=>{
  store.params.experience = value
  onFilterChange()
}

const onNoExperienceChange = (value)=>{
  store.params.experience = value ? 0 : null
  onFilterChange()
}

const onSalaryChange = (value)=>{
  store.params.salary = value
  onFilterChange()
}

const clearExperience = ()=>{
  store.params.experience = null
  onFilterChange()
}

const clearSalary = ()=>{
  store.params.salary = null
  onFilterChange()
}

onMounted(()=>{
  store.onRegions()
  store.onOrganizations()
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
        v-model:value="store.params.city_id"
        filterable
        clearable
        :disabled="!store.params.region_id"
        :options="store.cityList"
        @update:value="onFilterChange"
        label-field="name"
        value-field="id"
        :loading="store.cityLoading"
        size="large"
    />
  </div>
  <div class="col-span-12 border-b border-surface-line pb-4 mb-4">
    <label class="text-black-secondary block mb-1">{{$t('mainSection.organizations')}}</label>
    <n-select
        v-model:value="store.params.organization_id"
        filterable
        clearable
        :options="store.organizationList"
        @update:value="onFilterChange"
        label-field="name"
        value-field="id"
        :loading="store.organizationLoading"
        size="large"
        :ellipsis="true"
        class="organization-select"
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
      <n-radio-group :value="store.params.experience" @update:value="onExperienceChange">
        <div v-for="item in store.experienceOptions" :key="item" class="mb-2 flex items-center justify-between">
          <n-radio :value="item">
            <span class="text-black-tertiary">{{item}} {{$t('content.year')}}</span>
          </n-radio>
          <n-button
              v-if="store.params.experience === item"
              size="tiny"
              type="error"
              tertiary
              @click.stop="clearExperience"
          >
            {{ $t('content.clear') }}
          </n-button>
        </div>
      </n-radio-group>
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
      <n-radio-group :value="store.params.salary" @update:value="onSalaryChange">
        <div v-for="item in store.salaryOptions" :key="item.value" class="mb-2 flex items-center justify-between">
          <n-radio :value="item.value">
            <span class="text-black-tertiary">{{item.label}} {{$t('content.sum')}}</span>
          </n-radio>
          <n-button
              v-if="store.params.salary === item.value"
              size="tiny"
              type="error"
              tertiary
              @click.stop="clearSalary"
          >
            {{ $t('content.clear') }}
          </n-button>
        </div>
      </n-radio-group>
    </n-collapse-transition>
  </div>

  <div class="col-span-12 mb-6">
    <n-checkbox
        class="rounded-lg"
        :checked="store.params.experience === 0"
        @update:checked="onNoExperienceChange"
    >
      {{$t('vacancy.noExperience')}}
    </n-checkbox>
  </div>
</div>
</template>

<style>
.n-base-select-option__content {
  white-space: normal !important;
  word-break: break-word;
  line-height: 1.4;
}
</style>