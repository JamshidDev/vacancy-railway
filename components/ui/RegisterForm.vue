<script setup>
import {useAuthStore} from "~/store/index.js"
import {rules} from "~/utils/index.js"
import {EyeOff20Filled, Eye24Regular} from "@vicons/fluent"
const store = useAuthStore()
const formRef = ref(null)
const { $t } = useNuxtApp()


const onSubmit = ()=>{
  formRef.value?.validate((error)=>{
    if(!error){
      console.log(store.authPayload)

    }
  })
}
</script>

<template>
  <n-tabs animated v-model:value="store.registerActiveTab" class="hidden-tab-header" type="segment">
    <n-tab-pane :name="store.registerTab[0].id">
      <n-form
          class="w-full grid grid-cols-12"
          ref="formRef"
          :rules="rules.common($t)"
          :model="store.authPayload"
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
              v-model:value="store.authPayload.phone"
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
              v-model:value="store.authPayload.password"
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
            :loading="store.authLoading"
            class="col-span-12 !mt-6 uppercase !mb-4"
            @click="onSubmit"
            type="primary">
          {{$t('content.send')}}
        </n-button>
      </n-form>
    </n-tab-pane>
    <n-tab-pane :name="store.registerTab[1].id">

    </n-tab-pane>

  </n-tabs>

</template>
