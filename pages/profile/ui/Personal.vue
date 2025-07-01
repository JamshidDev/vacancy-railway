<script setup>
import {useProfileStore} from "../../../store/modules/profileStore.js"
import {rules} from "../../../utils/index.js"
import {Save16Regular} from "@vicons/fluent"


const store = useProfileStore()
const formRef = ref(null)


const onSubmit = ()=>{
  formRef.value?.validate((error)=>{
    if(!error){

      const data = {
        ...store.payload,
        birthday:utils.timeToZone(store.payload.birthday),
        pin:store.payload.pin.toString().replace(/-/g, '')
      }

      store.onUpdate(data)
    }
  })
}


const onChangeRegion = ()=>{
  store.cityList = []
  store.payload.city_id = null
  store.onGetCities()
}

const onChangeCurrentRegion = ()=>{
  store.currentCityList = []
  store.payload.current_city_id = null
  store.onGetCurrentCities()
}

onMounted(()=>{
  store.onGetEnum()

  if(store.regionList.length === 0){
    store.onGetRegions()
  }
})
</script>

<template>
  <n-spin :show="store.profileLoading">
    <n-form
        class="w-full grid grid-cols-12 gap-x-4"
        ref="formRef"
        :rules="rules.common($t)"
        :model="store.payload"
    >
      <div class="col-span-8 font-semibold text-xl text-primary">
        {{$t('info.general.name')}}
      </div>
      <div class="col-span-4 flex justify-end">
        <n-button
            :loading="store.loading"
            @click="onSubmit"
            type="primary" secondary>
          {{$t('content.save')}}
          <template #icon>
            <Save16Regular/>
          </template>
        </n-button>
      </div>

      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.last_name`)"
          :rule-path="rules.names.requiredStringField"
          path="last_name">
        <n-input
            class="w-full"
            type="text"
            v-model:value="store.payload.last_name"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.first_name`)"
          :rule-path="rules.names.requiredStringField"
          path="first_name">
        <n-input
            class="w-full"
            type="text"
            v-model:value="store.payload.first_name"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.middle_name`)"
          :rule-path="rules.names.requiredStringField"
          path="middle_name">
        <n-input
            class="w-full"
            type="text"
            v-model:value="store.payload.middle_name"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.birthday`)"
          :rule-path="rules.names.requiredDateTimeField"
          path="birthday">
        <n-date-picker
            class="w-full"
            v-model:value="store.payload.birthday"
            type="date"
            :format="appSetting.datePicketFormat"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.country_id`)"
          :rule-path="rules.names.requiredNumberField"
          path="country_id">
        <n-select
            v-model:value="store.payload.country_id"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.countryList"
            label-field="name"
            value-field="id"
            :loading="store.enumLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.region_id`)"
          :rule-path="rules.names.requiredNumberField"
          path="region_id">
        <n-select
            v-model:value="store.payload.region_id"
            :rule-path="rules.names.requiredNumberField"
            filterable
            :options="store.regionList"
            label-field="name"
            value-field="id"
            :loading="store.regionLoading"
            @update:value="onChangeRegion"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.city_id`)"
          :rule-path="rules.names.requiredNumberField"
          path="city_id">
        <n-select
            v-model:value="store.payload.city_id"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.cityList"
            label-field="name"
            value-field="id"
            :loading="store.cityLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.current_region_id`)"
          :rule-path="rules.names.requiredNumberField"
          path="current_region_id">
        <n-select
            v-model:value="store.payload.current_region_id"
            :rule-path="rules.names.requiredNumberField"
            clearable
            :options="store.regionList"
            label-field="name"
            value-field="id"
            :loading="store.regionLoading"
            @update:value="onChangeCurrentRegion"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.current_city_id`)"
          :rule-path="rules.names.requiredNumberField"
          path="current_city_id">
        <n-select
            v-model:value="store.payload.current_city_id"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.currentCityList"
            label-field="name"
            value-field="id"
            :loading="store.currentCityLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.address`)"
          :rule-path="rules.names.requiredStringField"
          path="address">
        <n-input
            class="w-full"
            type="text"
            v-model:value="store.payload.address"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.pin`)"
          :rule-path="rules.names.requiredPinField"
          path="pin">
        <n-input
            v-mask="`####-####-####-##`"
            class="w-full"
            type="text"
            v-model:value="store.payload.pin"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.sex`)"
          :rule-path="rules.names.requiredNumberField"
          path="sex">
        <n-select
            v-model:value="store.payload.sex"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.sexList"
            label-field="name"
            value-field="id"
            :loading="store.enumLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.nationality_id`)"
          :rule-path="rules.names.requiredNumberField"
          path="nationality_id">
        <n-select
            v-model:value="store.payload.nationality_id"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.nationalList"
            label-field="name"
            value-field="id"
            :loading="store.enumLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.education`)"
          :rule-path="rules.names.requiredNumberField"
          path="education">
        <n-select
            v-model:value="store.payload.education"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.educationList"
            label-field="name"
            value-field="id"
            :loading="store.enumLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.marital_status`)"
          :rule-path="rules.names.requiredNumberField"
          path="marital_status">
        <n-select
            v-model:value="store.payload.marital_status"
            :rule-path="rules.names.requiredNumberField"
            filterable
            clearable
            :options="store.maritalStatusList"
            label-field="name"
            value-field="id"
            :loading="store.enumLoading"
        />
      </n-form-item>
      <n-form-item
          class="col-span-12 lg:col-span-6 xl:col-span-4"
          :label="$t(`info.general.languages`)"
          :rule-path="rules.names.requiredMultiSelectField"
          path="languages">
        <n-select
            v-model:value="store.payload.languages"
            filterable
            clearable
            multiple
            :options="store.languageList"
            label-field="name"
            value-field="id"
            :loading="store.enumLoading"
            :max-tag-count="2"
        />
      </n-form-item>
    </n-form>
  </n-spin>

</template>
