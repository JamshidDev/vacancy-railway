
<script setup >
import Message from "~/components/providers/Message.vue"
import LoadingApp from "~/components/ui/LoadingApp.vue"
import {darkTheme} from "naive-ui"
import {customTheme, appSetting} from "~/utils/index.js"
const { locale } = useI18n()
const {isDark} = useTheme()

// CSS o'zgaruvchilari mavzu almashganda yangilanadi, shuning uchun override'lar qayta o'qiladi
const themeOverrides = computed(()=>{
  isDark.value
  return customTheme()
})
const localProvider = ref(null)

watch(locale, (v)=>{
  localProvider.value = appSetting.naiveLang[v]
}, {immediate: true})



</script>

<template>
  <div>
    <n-config-provider
        :theme="isDark ? darkTheme : null"
        :theme-overrides="themeOverrides"
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