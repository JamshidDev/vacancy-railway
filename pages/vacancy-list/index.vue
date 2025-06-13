<script setup>
import {ChevronRight12Regular, Search32Filled} from "@vicons/fluent"

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Vakansiyalar",
})
</script>

<template>
  <div class="w-full bg-surface-section min-h-screen">
    <UiBreadCrump class="mt-[160px] mb-[50px]"/>
    <UiPageContent>
      <div class="grid grid-cols-12 gap-x-6 mb-4">
        <div class="col-span-3">
          <div class="bg-surface-ground rounded-lg px-4 pt-6">
            <UiVacancyFilter/>
          </div>
        </div>
        <div class="col-span-9">
          <h3 class="text-black-primary mb-5 text-xl font-medium uppercase">Vakansiyalar soni: 0</h3>
          <div class="w-full mb-10 px-2 flex text-black-tertiary items-center bg-surface-ground border border-surface-line rounded-lg h-[50px]">
            <n-icon size="20" class="mx-2">
              <Search32Filled/>
            </n-icon>
            <n-input class="input-override" size="large" placeholder="Izlash..."/>
          </div>
          <template v-for="item in 10" :key="item">
            <UiVacancyCard/>
          </template>

        </div>
      </div>

    </UiPageContent>
  </div>
  <SectionFooter/>
</template>

<style scoped>

</style>