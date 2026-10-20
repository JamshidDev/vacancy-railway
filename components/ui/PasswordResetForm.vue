<script setup>
import {ChevronLeft24Filled, EyeOff20Filled, Eye24Regular, CheckmarkCircle48Filled} from "@vicons/fluent"
import {useAuthStore} from "~/store/index.js"
import {rules, utils} from "~/utils/index.js"

const store = useAuthStore()
const {t} = useI18n()
const phoneFormRef = ref(null)
const passwordFormRef = ref(null)

// Qayta yuborish taymeri
const now = ref(Date.now())
let timer = null
onMounted(()=>{
  timer = setInterval(()=>{ now.value = Date.now() }, 1000)
})
onBeforeUnmount(()=> clearInterval(timer))
const resendSeconds = computed(()=> Math.max(0, Math.ceil((store.resendAvailableAt - now.value) / 1000)))

const confirmPasswordRule = {
  trigger:['input', 'blur'],
  validator:(rule, value)=>{
    if(!value) return new Error(t('rules.password'))
    if(value !== store.resetPayload.password) return new Error(t('auth.reset.passwordMismatch'))
    return true
  },
}

const onSendCode = ()=>{
  phoneFormRef.value?.validate((error)=>{
    if(!error) store.onResetSendCode()
  })
}

const onResend = ()=>{
  if(resendSeconds.value > 0 || store.resetLoading) return
  store.onResetSendCode()
}

const onSubmit = ()=>{
  passwordFormRef.value?.validate((error)=>{
    if(!error) store.onResetPassword()
  })
}

const onBackToLogin = ()=>{
  store.closePasswordReset()
}
</script>

<template>
<div>
  <!-- Sarlavha va ortga qaytish -->
  <div v-if="store.resetStep !== 3" class="flex items-center gap-2 mb-4">
    <n-button
        circle text
        size="large"
        :aria-label="$t('auth.reset.backToLogin')"
        @click="store.resetStep === 2 ? store.resetStep = 1 : onBackToLogin()">
      <template #icon>
        <n-icon class="text-black-tertiary">
          <ChevronLeft24Filled/>
        </n-icon>
      </template>
    </n-button>
    <h3 class="text-lg font-bold text-black-primary">{{$t('auth.reset.title')}}</h3>
  </div>

  <!-- 1-qadam: telefon raqam -->
  <n-form
      v-if="store.resetStep === 1"
      class="w-full grid grid-cols-12"
      ref="phoneFormRef"
      :rules="rules.common($t)"
      :model="store.resetPayload"
  >
    <p class="col-span-12 text-black-tertiary text-sm mb-4">{{$t('auth.reset.phoneHint')}}</p>
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
          inputmode="tel"
          v-mask="'+#####-###-##-##'"
          v-model:value="store.resetPayload.phone"
          @keyup.enter="onSendCode"
      />
    </n-form-item>
    <n-button
        :loading="store.resetLoading"
        class="col-span-12 !mt-4 uppercase !mb-4"
        @click="onSendCode"
        type="primary">
      {{$t('auth.reset.sendCode')}}
    </n-button>
  </n-form>

  <!-- 2-qadam: SMS kod va yangi parol -->
  <n-form
      v-else-if="store.resetStep === 2"
      class="w-full grid grid-cols-12"
      ref="passwordFormRef"
      :rules="rules.common($t)"
      :model="store.resetPayload"
  >
    <div class="col-span-12 mb-4 text-sm">
      <p class="text-black-secondary">{{$t('auth.reset.codeSentTo', {phone: store.resetPayload.phone})}}</p>
      <button type="button" class="text-primary font-semibold mt-1 cursor-pointer hover:underline" @click="store.resetStep = 1">
        {{$t('auth.reset.changePhone')}}
      </button>
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
          v-model:value="store.resetPayload.otp"
      />
    </n-form-item>
    <div class="col-span-12 -mt-2 mb-3">
      <button
          type="button"
          :disabled="resendSeconds > 0 || store.resetLoading"
          @click="onResend"
          class="text-sm font-semibold text-primary cursor-pointer disabled:text-black-tertiary disabled:cursor-not-allowed">
        {{resendSeconds > 0 ? $t('auth.reset.resendIn', {n: resendSeconds}) : $t('auth.reset.resend')}}
      </button>
    </div>
    <n-form-item
        class="col-span-12"
        :label="$t(`auth.reset.newPassword`)"
        path="password"
        :rule-path="rules.names.requiredPasswordField"
    >
      <n-input
          size="large"
          class="!font-bold"
          type="password"
          show-password-on="click"
          :maxlength="16"
          :input-props="{autocomplete: 'new-password'}"
          v-model:value="store.resetPayload.password"
      >
        <template #password-visible-icon>
          <n-icon :size="20" :component="EyeOff20Filled" />
        </template>
        <template #password-invisible-icon>
          <n-icon :size="20" :component="Eye24Regular" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item
        class="col-span-12"
        :label="$t(`auth.reset.confirmPassword`)"
        path="password_confirmation"
        :rule="confirmPasswordRule"
    >
      <n-input
          size="large"
          class="!font-bold"
          type="password"
          show-password-on="click"
          :maxlength="16"
          :input-props="{autocomplete: 'new-password'}"
          v-model:value="store.resetPayload.password_confirmation"
          @keyup.enter="onSubmit"
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
        :loading="store.resetLoading"
        class="col-span-12 !mt-4 uppercase !mb-4"
        @click="onSubmit"
        type="primary">
      {{$t('auth.reset.submit')}}
    </n-button>
  </n-form>

  <!-- 3-qadam: tayyor -->
  <div v-else class="flex flex-col items-center text-center py-6">
    <n-icon size="72" class="text-success">
      <CheckmarkCircle48Filled/>
    </n-icon>
    <h3 class="text-xl font-bold text-black-primary mt-4">{{$t('auth.reset.successTitle')}}</h3>
    <p class="text-black-tertiary mt-2">{{$t('auth.reset.successText')}}</p>
    <n-button type="primary" size="large" class="!w-full !mt-6 !mb-2 uppercase" @click="onBackToLogin">
      {{$t('auth.reset.backToLogin')}}
    </n-button>
  </div>
</div>
</template>
