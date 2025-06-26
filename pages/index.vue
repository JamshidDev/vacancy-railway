<script setup>
import { useMessage } from 'naive-ui'
import {useAuthStore} from "~/store/index.js"
const store = useAuthStore()


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
</div>
</template>
