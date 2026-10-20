 <script setup>
import {useAuthStore} from "~/store/index.js"
const store = useAuthStore()
</script>
<template>
  <div>
    <UiAppToolBar/>
    <!-- Desktop: chap chetda vertikal yorliq; mobil: kontentni yopmaydigan kichik pastki belgi -->
    <div
        style="writing-mode: vertical-lr; text-orientation: mixed; word-spacing: 4px"
        class="hidden lg:flex text-xs font-semibold w-[22px] py-3 rounded-tr-md rounded-br-md bg-black-primary/85 text-white fixed left-0 z-[90] top-[50%] translate-y-[-50%] items-center justify-center"
    >{{$t('content.betaMode')}}</div>
    <div class="lg:hidden fixed left-2 bottom-2 z-[90] px-2.5 py-1 rounded-full bg-black-primary/80 text-white text-[11px] font-semibold pointer-events-none">
      {{$t('content.betaMode')}}
    </div>
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
