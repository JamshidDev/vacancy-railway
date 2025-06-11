<script setup>
import {useHeroStore} from "~/store";
import {BuildingMultiple24Regular} from "@vicons/fluent"

const store = useHeroStore()
</script>

<template>
<div class="w-full h-screen">
    <UiPageContent>
      <h3 class="text-center text-black-primary text-4xl font-medium pt-[100px]">Tashkilotlar</h3>
      <small class="text-black-tertiary text-center mt-4 text-[14px]">400+ tashkilotlar aynan sizni kutmoqda</small>

      <div class="w-full flex gap-4 bg-primary/10 border-surface-line p-1 rounded-md mt-6">
        <template v-for="(item,index) in store.tabList" :key="index">
          <div
              @click="store.onChangeTab(item.id)"
              :class="[item.id === store.activeTab && 'shadow bg-surface-section']"
              class="px-8 py-1  rounded  uppercase transition-all duration-300 cursor-pointer">{{item.name}}</div>
        </template>
      </div>

      <n-tabs animated v-model:value="store.activeTab" class="hidden-tab-header" type="segment">
        <n-tab-pane :name="store.tabList[0].id">
          <div class="grid grid-cols-12 gap-x-6 gap-y-4 ">
            <template v-for="item in 10" :key="item">
              <div class="col-span-4 p-2 bg-surface-ground border border-surface-line
               rounded-lg flex items-center cursor-pointer gap-2
">
                <IconBuild class="fill-primary/40"/>
                <div class="flex flex-col border-l border-surface-line pl-4">
                  <h2 class="text-black-primary font-medium text-lg">Markaziy muassasalar</h2>
                  <h6 class="text-black-tertiary text-sm mt-6">E'londagi tanlovlar soni: 245 ta</h6>
                </div>
              </div>
            </template>

          </div>
        </n-tab-pane>
        <n-tab-pane :name="store.tabList[1].id">
          <div class="grid grid-cols-12 gap-x-6 gap-y-4 ">
            <template v-for="item in 12" :key="item">
              <div class="col-span-4 p-2 bg-surface-ground border border-surface-line
               rounded-lg flex items-center cursor-pointer gap-2
">
                <IconBuild class="fill-primary/40"/>
                <div class="flex flex-col border-l border-surface-line pl-4">
                  <h2 class="text-black-primary font-medium text-lg">Xorazm viloyati</h2>
                  <h6 class="text-black-tertiary text-sm mt-6">E'londagi tanlovlar soni: 245 ta</h6>
                </div>
              </div>
            </template>

          </div>
        </n-tab-pane>
      </n-tabs>
    </UiPageContent>
</div>
</template>

<style scoped>

</style>