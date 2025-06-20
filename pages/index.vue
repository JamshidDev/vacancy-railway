<script setup>
import { useMessage } from 'naive-ui'
const message = useMessage()
import {useAuthStore} from "~/store/index.js"
const store = useAuthStore()

const msgEvent = ()=>{
  message.error("Once upon a time you dressed so fine");
}



definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Asosiy"
})

</script>

<template>
<div>
  <SectionHero/>
  <SectionProcess/>
  <SectionOrganization/>
  <SectionVacancy/>
  <SectionFooter/>
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
</div>
</template>
