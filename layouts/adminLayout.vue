 <script setup>
import {useAuthStore} from "~/store/index.js"
const store = useAuthStore()
</script>
<template>
  <div>
    <UiAppToolBar/>
    <div
        style="writing-mode: vertical-lr; text-orientation: mixed; word-spacing: 4px"
        class="text-xs font-semibold w-[22px] py-3 rounded-tr-md rounded-br-md bg-black-primary/85 text-white fixed left-0 z-[90] top-[50%] translate-y-[-50%] flex items-center justify-center
"
    >{{$t('content.betaMode')}}</div>
    <UiModal
        :width="500"
        v-model:visible="store.authVisible"
    >
      <template #header-title>
        <span class="uppercase font-black text-lg text-black-primary">{{$t('content.loginSystem')}}</span>
      </template>
      <UiAuthBox>
        <template #login-tab>
          <UiAuthForm/>
        </template>
        <template #register-tab>
          <UiRegisterForm/>
        </template>
      </UiAuthBox>

    </UiModal>
    <slot></slot>
  </div>
</template>
