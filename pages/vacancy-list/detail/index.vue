<script setup>
import {Box, Sidebar, Content} from "~/pages/vacancy-list/detail/ui/index.js"
import {ChevronRight12Regular} from "@vicons/fluent"

definePageMeta({
  layout:"admin-layout"
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[160px] mb-[50px]" :custom-title="`Axborot xizmati rahbari - agentlik direktorining matbuot kotibi`" />
    <UiPageContent class="mb-6">
      <Box>
        <template #sidebar>
          <Sidebar/>
        </template>
        <template #content>
          <Content/>
        </template>
      </Box>
    </UiPageContent>
    <SectionFooter/>
  </div>
</template>
