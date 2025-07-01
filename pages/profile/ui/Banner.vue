<script setup>
import {Info24Filled, Print20Regular, DrawerArrowDownload20Regular, ArrowSync16Filled, ArrowSync12Regular} from "@vicons/fluent"
import {useProfileStore} from "../../../store/index.js"

const store = useProfileStore()
const inputRef = ref(null)

const openFile = ()=>{
  inputRef.value?.click()
}
</script>

<template>
<div class="w-full grid grid-cols-12 lg:pt-[160px] pt-[60px]">
  <div class="col-span-12 lg:col-span-6 flex items-center">
    <h3 class="font-semibold text-xl text-black-secondary uppercase">{{store.fullName}}</h3>
  </div>
  <div class="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
    <div class="flex flex-wrap justify-end gap-4">
      <n-button type="primary" ghost>
        <span class="hidden md:inline-block">{{$t('info.banner.refresh')}}</span>
        <template #icon>
          <n-icon size="26">
            <ArrowSync16Filled/>
          </n-icon>
        </template>
      </n-button>
      <n-button type="warning" secondary >
        <template #icon>
          <n-icon size="26">
            <Info24Filled/>
          </n-icon>
        </template>
      </n-button>
      <n-button type="success" secondary>
        <template #icon>
          <n-icon>
            <Print20Regular/>
          </n-icon>
        </template>
      </n-button>
      <n-button type="primary" secondary>
        <template #icon>
          <n-icon size="26">
            <DrawerArrowDownload20Regular/>
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>


  <div class="col-span-12 md:flex mt-8 border border-dashed rounded-2xl border-surface-line p-4">
    <img
        class="w-[150px] min-h-[160px] rounded-md overflow-hidden"
        :src="store.avatarUrl" alt="avatar picture">
    <div class="w-full md:w-[calc(100%-150px)] md:flex md:pl-6 pl-0 mt-6 md:mt-0">
      <div class="md:w-1/2 w-full">
        <p class="text-black-tertiary mb-2">{{$t('info.banner.pin')}} <span class="text-black-secondary font-semibold">{{store.account?.pin}}</span></p>
        <p class="text-black-tertiary mb-2">{{$t('info.banner.birthday')}} <span class="text-black-secondary font-semibold">{{utils.timeToUI(store.account?.birthday)}}</span></p>
        <p class="text-black-tertiary mb-2">{{$t('info.banner.birthPlace')}} <span class="text-black-secondary font-semibold"> {{store.account?.city?.name}} </span></p>
        <n-button @click="openFile" class="!mt-4" size="tiny">{{$t('info.banner.changePicture')}}</n-button>
        <input type="file" @change="store.onUpdateAvatar" v-show="false" ref="inputRef" accept="image/*" />
      </div>
      <div class="md:w-1/2 w-full">
        <p class="text-black-tertiary mb-2">{{$t('info.banner.phone')}}  <span class="text-black-secondary font-semibold">+998{{store.account?.phone}} </span></p>
        <p class="text-black-tertiary mb-2">{{$t('info.banner.email')}} <span class="text-black-secondary font-semibold"> </span></p>
      </div>

    </div>
  </div>
</div>
</template>

<style scoped>

</style>