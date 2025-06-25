<script setup>
import {useAuthStore} from "~/store/index.js"
import {rules} from "~/utils/index.js"
import {EyeOff20Filled, Eye24Regular} from "@vicons/fluent"
const store = useAuthStore()
const formRef = ref(null)


const onSubmit = ()=>{
  formRef.value?.validate((error)=>{
    if(!error){
      store.onLogin()
    }
  })
}
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
        :label="$t(`auth.form.phone`)"
        path="phone"
        :rule-path="rules.names.requiredPhoneField"
    >
      <n-input
          size="large"
          class="!font-bold"
          type="text"
          v-mask="'+#####-###-##-##'"
          v-model:value="store.payload.phone"
      />
    </n-form-item>
    <n-form-item
        class="col-span-12"
        :label="$t(`auth.form.password`)"
        path="password"
        :rule-path="rules.names.requiredPasswordField"
    >
      <n-input
          size="large"
          class="!font-bold"
          type="password"
          show-password-on="click"
          :maxlength="16"
          v-model:value="store.payload.password"
      >
        <template #password-visible-icon>
          <n-icon :size="20" :component="EyeOff20Filled" />
        </template>
        <template #password-invisible-icon>
          <n-icon :size="20" :component="Eye24Regular" />
        </template>
      </n-input>
    </n-form-item>
    <n-button
        :loading="store.loading"
        class="col-span-12 !mt-6 uppercase !mb-4"
        @click="onSubmit"
        type="primary">
      {{$t('content.send')}}
    </n-button>
  </n-form>
</template>
