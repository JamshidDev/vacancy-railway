<script setup>
import {useCounterStore} from "~/store/index.js"
import { useMessage } from 'naive-ui'
import Hero from "~/components/section/Hero.vue"
const message = useMessage()
const runtimeConfig = useRuntimeConfig()
const appConfig = useAppConfig()

const msgEvent = ()=>{
  message.error("Once upon a time you dressed so fine");
}

const store = useCounterStore()


definePageMeta({
  layout:"admin-layout"
})

</script>

<template>
<div>
  <SectionHero/>
  <SectionOrganization/>
  <SectionVacancy/>
</div>
</template>

<style scoped>

</style>