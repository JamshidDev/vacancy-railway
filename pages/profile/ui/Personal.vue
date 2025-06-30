<script setup>
import {useProfileStore} from "../../../store/modules/profileStore.js"
import {rules} from "../../../utils/index.js"


const store = useProfileStore()
const formRef = ref(null)
</script>

<template>
  <n-form
      class="w-full grid grid-cols-12"
      ref="formRef"
      :rules="rules.common($t)"
      :model="store.payload"
  >
    <n-form-item
        class="col-span-12"
        :label="$t(`info.career.from`)"
        path="from"
        :rule-path="rules.names.requiredNumberField"
    >
      <n-date-picker
          clearable
          class="w-full"
          v-model:value="store.educationPayload.from"
          type="date"
          :format="appSetting.datePicketFormat"
      />
    </n-form-item>
    <n-form-item
        class="col-span-12"
        :label="$t(`info.career.to`)"
        path="to"
        :rule-path="store.educationPayload.now? undefined : rules.names.requiredNumberField "
        :show-feedback="!store.educationPayload.now"
    >
      <n-date-picker
          :disabled="store.educationPayload.now"
          class="w-full"
          clearable
          v-model:value="store.educationPayload.to"
          type="date"
          :format="appSetting.datePicketFormat"
      />
    </n-form-item>
    <div class="col-span-12 flex justify-end">
      <n-checkbox @update:checked="onChange" v-model:checked="store.educationPayload.now">
        {{$t('info.education.now')}}
      </n-checkbox>
    </div>
    <n-form-item
        class="col-span-12"
        :label="$t(`info.education.university`)"
        path="university"
        :rule-path="rules.names.requiredStringField"
    >
      <n-input
          type="textarea"
          :autosize="{
                 minRows: 3,
                 maxRows: 5,
              }"
          v-model:value="store.educationPayload.university"
      />
    </n-form-item>
    <n-button
        :loading="store.saveLoading"
        class="col-span-12 !mt-6 uppercase !mb-4"
        @click="onSubmit"
        type="primary">
      {{$t('content.send')}}
    </n-button>
  </n-form>
</template>
