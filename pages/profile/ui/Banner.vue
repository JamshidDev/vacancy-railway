<script setup>
import {Info24Filled, Print20Regular, DrawerArrowDownload20Regular, ArrowSync16Filled, ArrowSync12Regular} from "@vicons/fluent"
import {useProfileStore} from "../../../store/index.js"
import ImageCropper from "../../../components/ui/ImageCropper.vue"

const store = useProfileStore()
const inputRef = ref(null)
const cropperVisible = ref(false)
const selectedFile = ref(null)

const openFile = ()=>{
  inputRef.value?.click()
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    cropperVisible.value = true
  }
  inputRef.value.value = ''
}

const onCropComplete = (croppedFile) => {
  store.onUpdateAvatarWithFile(croppedFile)
  selectedFile.value = null
}
</script>

<template>
<div class="w-full grid grid-cols-12 lg:pt-[128px] pt-[104px]">
  <div class="col-span-12 lg:col-span-6 flex items-center">
    <h1 class="font-bold text-xl sm:text-2xl md:text-[28px] text-black-primary uppercase leading-[1.25]">{{store.fullName}}</h1>
  </div>
  <div class="col-span-12 lg:col-span-6 mt-4 lg:mt-0">
    <div class="flex flex-wrap lg:justify-end gap-3 sm:gap-4">
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


  <div class="col-span-12 flex items-start gap-4 md:gap-6 mt-5 sm:mt-6 bg-surface-soft border rounded-xl border-surface-line p-4 sm:p-5">
    <img
        class="w-[88px] h-[110px] sm:w-[150px] sm:h-[160px] shrink-0 rounded-lg overflow-hidden object-cover"
        :src="store.avatarUrl" alt="avatar picture">
    <div class="flex-1 min-w-0 md:flex text-sm sm:text-base">
      <div class="md:w-1/2 w-full mb-3 md:mb-0">
        <p class="text-black-tertiary mb-2 break-words">{{$t('info.banner.pin')}} <span class="text-black-secondary font-semibold">{{store.account?.pin}}</span></p>
        <p class="text-black-tertiary mb-2">{{$t('info.banner.birthday')}} <span class="text-black-secondary font-semibold">{{utils.timeToUI(store.account?.birthday)}}</span></p>
        <p class="text-black-tertiary mb-2">{{$t('info.banner.birthPlace')}} <span class="text-black-secondary font-semibold"> {{store.account?.city?.name}} </span></p>
        <n-button @click="openFile" class="!mt-2 sm:!mt-4" size="small">{{$t('info.banner.changePicture')}}</n-button>
        <input type="file" @change="onFileChange" v-show="false" ref="inputRef" accept="image/*" />

        <ImageCropper
          v-model:visible="cropperVisible"
          :image-file="selectedFile"
          @crop="onCropComplete"
        />
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