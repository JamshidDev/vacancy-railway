<script setup>
import {Briefcase28Regular, CheckmarkCircle20Filled, BuildingBank24Regular, DocumentBulletList24Regular, ClipboardTaskListLtr24Regular} from "@vicons/fluent"
import {useUserInfoStore} from "~/store/index.js"
import Career from "./Career.vue"
import Education from "./Education.vue"
import Personal from "./Personal.vue"

const router = useRouter()
const route = useRoute()

// URL dagi ?tab= qiymati bilan tab id lari o'rtasidagi moslik
const APPLICATIONS_TAB = 4

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
  {
    name:'profile.menu.myApplications',
    id:4,
    icon:ClipboardTaskListLtr24Regular,
  },
]

const store = useUserInfoStore()

const onTabClick = (item) => {
  store.onChangeTab(item.id)
  const query = {...route.query}
  if (item.id === APPLICATIONS_TAB) query.tab = 'applications'
  else delete query.tab
  router.replace({query})
}

// Header yoki boshqa sahifadan ?tab=applications bilan kelinganda
watch(() => route.query.tab, (tab) => {
  if (tab === 'applications') store.onChangeTab(APPLICATIONS_TAB)
  else if (store.activeTab === APPLICATIONS_TAB) store.onChangeTab(store.tabList[0].id)
}, {immediate: true})
</script>

<template>
  <div class="lg:flex pt-6 sm:pt-10">
    <div class="w-full lg:w-[400px] shrink-0">
        <!-- Mobil: gorizontal suriladigan tablar; desktop: vertikal menyu -->
        <div class="flex lg:block gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 lg:p-4 lg:bg-surface-ground lg:rounded-xl lg:sticky lg:top-[112px]">

          <template v-for="item in tabList" :key="item.id">
            <div
                @click="onTabClick(item)"
                class="shrink-0 lg:w-full group cursor-pointer flex items-center px-3 py-2.5 lg:px-4 lg:py-4 bg-surface-ground lg:bg-surface-section rounded-lg lg:mb-3 lg:last:mb-0 text-black-tertiary overflow-hidden border transition-colors whitespace-nowrap"
                :class="[store.activeTab === item.id ? 'border-primary/40' : 'border-transparent hover:border-surface-line']"
            >
              <n-icon size="22" :class="[store.activeTab === item.id && 'text-primary']" >
                <CheckmarkCircle20Filled v-if="store.activeTab === item.id" />
                <component :is="item.icon" v-else/>
              </n-icon>
              <span :class="[store.activeTab === item.id ? 'text-primary' : 'text-black-primary']" class="font-semibold pl-2 lg:pl-4 text-sm lg:text-base">{{$t(item.name)}}</span>
            </div>
          </template>

        </div>
      </div>
    <div class="w-full flex-1 min-w-0 mt-5 lg:mt-0 lg:pl-[40px] lg:min-h-[600px]">
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
        <n-tab-pane :name="APPLICATIONS_TAB">
          <UiApplicationList/>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
