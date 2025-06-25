<script setup>
import {useAuthStore} from "~/store/index.js"
import {rules, utils} from "~/utils/index.js"
import {EyeOff20Filled, Eye24Regular, ChevronLeft24Filled} from "@vicons/fluent"

const store = useAuthStore()
const formRef = ref(null)
const formRef2 = ref(null)
import {NInputOtp } from "naive-ui"

const onSubmit = ()=>{
  formRef.value?.validate((error)=>{
    if(!error){
      store.getToken()
    }
  })
}

const onSubmitOtp = ()=>{
  formRef2.value?.validate((error)=>{
    if(!error){
      store.onRegisterUser()
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
            :label="$t(`auth.form.last_name`)"
            path="last_name"
            :rule-path="rules.names.requiredStringField"
        >
          <n-input
              size="large"
              type="text"
              v-model:value="store.authPayload.last_name"
          />
        </n-form-item>
        <n-form-item
            class="col-span-12"
            :label="$t(`auth.form.first_name`)"
            path="first_name"
            :rule-path="rules.names.requiredStringField"
        >
          <n-input
              size="large"
              type="text"
              v-model:value="store.authPayload.first_name"
          />
        </n-form-item>
        <n-form-item
            class="col-span-12"
            :label="$t(`auth.form.middle_name`)"
            path="middle_name"
            :rule-path="rules.names.requiredStringField"
        >
          <n-input
              size="large"
              type="text"
              v-model:value="store.authPayload.middle_name"
          />
        </n-form-item>
        <n-form-item
            class="col-span-12"
            :label="$t(`auth.form.phone`)"
            path="phone"
            :rule-path="rules.names.requiredPhoneField"
        >
          <n-input
              size="large"
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
      <n-form
          class="w-full grid grid-cols-12"
          ref="formRef2"
          :rules="rules.common($t)"
          :model="store.otpPayload"
      >
        <div  class="col-span-12 mb-2">
          <n-button
              circle text
              size="large"
              @click="store.registerActiveTab = 1">
            <template #icon>
              <n-icon class="text-black-tertiary">
                <ChevronLeft24Filled/>
              </n-icon>
            </template>
          </n-button>
        </div>
        <n-form-item
            class="col-span-12"
            :label="$t(`auth.form.otp`)"
            path="otp"
            :rule-path="rules.names.requiredOtpField"
        >
          <n-input-otp
              size="large"
              :allow-input="utils.onlyAllowNumber"
              v-model:value="store.otpPayload.otp"
          />
        </n-form-item>
        <n-button
            :loading="store.authLoading"
            class="col-span-12 !mt-6 uppercase !mb-4"
            @click="onSubmitOtp"
            type="primary">
          {{$t('content.send')}}
        </n-button>
      </n-form>
    </n-tab-pane>

  </n-tabs>

</template>
