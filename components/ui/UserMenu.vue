<script setup>
import {Person20Regular, SignOut24Regular, DocumentBriefcase24Regular} from "@vicons/fluent"
import {appSetting, utils} from "~/utils/index.js"
import {useAuthStore} from "~/store/index.js"
import {useProfileStore} from "../../store/index.js"

const { t } = useI18n()
const authStore = useAuthStore()
const store = useProfileStore()



const option = [
  {
    label: t('profile.menu.profile'),
    key: 'profile',
    icon:utils.renderIcon(Person20Regular)
  },
  {
    label: t('profile.menu.myApplications'),
    key: 'editProfile',
    icon: utils.renderIcon(DocumentBriefcase24Regular)
  },
  {
    label: t('profile.menu.logout'),
    key: 'logout',
    icon: utils.renderIcon(SignOut24Regular)
  }
]

const onSelect = (key)=>{
  if(key === option[2].key){
    authStore.onLogOut()
  }
}

</script>

<template>
  <n-dropdown
      :options="option"
      trigger="click"
      @select="onSelect"
  >
    <div class="flex items-center gap-2 cursor-pointer w-[160px]">
      <n-spin v-if="store.profileLoading" size="medium" />
      <n-avatar
          v-else
          round
          size="medium"
          :src="store.avatarUrl"
      />

      <div class="w-[calc(100%-40px)]">
        <h2 class="text-black-primary font-semibold leading-[1] line-clamp-1">
          <n-skeleton v-if="store.profileLoading" text :repeat="1" round />
          <template v-else>
            {{store.account? store.account?.last_name : ''}}
            {{store.account? store.account?.first_name : ''}}
          </template>
          </h2>
        <h6 class="text-black-tertiary font-medium text-xs line-clamp-1">
          <n-skeleton v-if="store.profileLoading" text :repeat="1" round />
          <template v-else>
           {{store.account? store.account?.middle_name : ''}}
          </template>

        </h6>
      </div>
    </div>
  </n-dropdown>
</template>

<style scoped>

</style>