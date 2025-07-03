 <script setup>
import {useAuthStore} from "~/store/index.js"
const store = useAuthStore()
</script>
<template>
  <div>
    <UiAppToolBar/>
    <div
        style="writing-mode: vertical-lr; text-orientation: mixed; word-spacing: 4px"
        class="text-sm font-semibold w-[24px] px-2 pb-2 rounded-tr-md rounded-br-md  bg-dark text-white fixed left-0 z-[900] top-[50%] translate-y-[-50%]
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
