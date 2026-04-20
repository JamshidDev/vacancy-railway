
<script setup >
import Message from "~/components/providers/Message.vue"
import LoadingApp from "~/components/ui/LoadingApp.vue"
import {customTheme, appSetting} from "~/utils/index.js"
const { locale } = useI18n()
const localProvider = ref(null)

watch(locale, (v)=>{
  localProvider.value = appSetting.naiveLang[v]
}, {immediate: true})



</script>

<template>
  <div>
    <n-config-provider
        :theme-overrides="customTheme()"
        :locale="localProvider.lang"
        :date-locale="localProvider.date"
    >
      <n-message-provider placement="top-right">
        <n-dialog-provider>
          <NuxtLayout>
            <NuxtPage/>
            <Message/>
            <LoadingApp/>
          </NuxtLayout>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>