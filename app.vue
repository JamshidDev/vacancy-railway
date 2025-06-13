
<script setup >
import {customTheme} from "~/utils/index.js"
import { uzUZ, dateUzUZ, ruRU, dateRuRU, enUS, dateEnUS, }  from 'naive-ui'
const { $i18n } = useNuxtApp()


const localProvider = computed(()=>{
  if($i18n.locale._value==='uz'){
    return {
      lang: uzUZ,
      date: dateUzUZ,
    }
  }else if($i18n.locale._value==='en'){
    return {
      lang: enUS,
      date: dateEnUS,
    }
  }else if($i18n.locale._value==='ru'){
    return {
      lang: ruRU,
      date: dateRuRU,
    }
  }
})
</script>

<template>
  <div>
    <n-config-provider
        :theme-overrides="customTheme()"
        :locale="localProvider.lang"
        :date-locale="localProvider.date"
    >
      <n-message-provider>
        <NuxtLayout>
          <NuxtPage/>
        </NuxtLayout>
      </n-message-provider>
    </n-config-provider>

  </div>
</template>