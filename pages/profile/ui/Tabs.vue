<script setup>
import {Briefcase28Regular, CheckmarkCircle20Filled, BuildingBank24Regular, DocumentBulletList24Regular} from "@vicons/fluent"
import {useUserInfoStore} from "~/store/index.js"
import Career from "./Career.vue"
import Education from "./Education.vue"
import Personal from "./Personal.vue"

const tabList = [
  {
    name:'info.general.name',
    id:1,
    icon:DocumentBulletList24Regular,
  },
  {
    name:'info.education.name',
    id:2,
    icon:BuildingBank24Regular,
  },
  {
    name:'info.career.name',
    id:3,
    icon:Briefcase28Regular,
  },
]

const store = useUserInfoStore()
</script>

<template>
  <div class=" lg:flex pt-10">
    <div class=" w-full lg:w-[400px]">
        <div class="w-full px-6 py-4  bg-gradient-to-b from-primary/10 to-primary/40 rounded-xl">

          <template v-for="item in tabList" :key="item">
            <div
                @click="store.onChangeTab(item.id)"
                class="w-full group cursor-pointer flex items-center px-3 py-4 bg-surface-section rounded-lg mb-3 text-black-tertiary overflow-hidden"
            >
              <n-icon size="24" :class="[store.activeTab === item.id && 'text-primary']" >
                <CheckmarkCircle20Filled v-if="store.activeTab === item.id" />
                <component :is="item.icon" v-else/>
              </n-icon>
              <span class="text-black-secondary font-semibold pl-4 ">{{$t(item.name)}}</span>
            </div>
          </template>

        </div>
      </div>
    <div class="w-full lg:w-[calc(100%-400px)] lg:pl-[40px] min-h-[600px]">
      <n-tabs animated v-model:value="store.activeTab" class="hidden-tab-header" type="segment">
        <n-tab-pane :name="store.tabList[0].id">
         <Personal/>
        </n-tab-pane>
        <n-tab-pane :name="store.tabList[1].id">
          <Education/>
        </n-tab-pane>
        <n-tab-pane :name="store.tabList[2].id">
          <Career/>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
