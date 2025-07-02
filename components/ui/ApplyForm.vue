<script setup>
import {Document28Regular, DeleteDismiss24Regular} from "@vicons/fluent"
import {useProfileStore, useVacancyStore} from "../../store/index.js"


const store = useProfileStore()
const vacancyStore = useVacancyStore()
const inputRef = ref(null)

const openFile =()=>{
  inputRef.value?.click()
}

const onSubmit = ()=>{
    const formData = new FormData()
    formData.append('vacancy_position_id', vacancyStore.detail?.id)
    store.docFiles.forEach(item=>{
      formData.append('files[]', item.file)
    })
  store.onSendApply(formData)

}
</script>

<template>
<div class="w-full grid grid-cols-12 gap-4">
  <div class="col-span-12">
      <div @click="openFile" class="w-full cursor-pointer h-[80px] border bg-pattern border-dashed border-surface-line rounded-2xl flex justify-center items-center">
          <span class="font-semibold text-black-tertiary">{{$t('detail.uploadFile')}}</span>
          <input @change="store.onUploadFile" type="file" multiple v-show="false" ref="inputRef" accept=".pdf,.doc,.docx" />
      </div>
  </div>
  <div class="col-span-12 mb-8">
    <transition-group name="pop" tag="div">
      <template v-for="item in store.docFiles" :key="item">
        <div class="flex cursor-pointer items-center px-4 py-2 border border-surface-line rounded-2xl mb-2 hover:shadow">
          <n-icon class="text-black-tertiary" size="18">
            <Document28Regular/>
          </n-icon>
          <span class="pl-2 line-clamp-1 truncate w-[calc(100%-40px)]">{{item.file?.name}} </span>
          <n-button @click="store.removeFileById(item.id)" size="small" type="error" secondary circle>
            <template #icon>
              <n-icon size="18">
                <DeleteDismiss24Regular/>
              </n-icon>
            </template>
          </n-button>
        </div>
      </template>
    </transition-group>


  </div>
  <div class="col-span-6">
    <n-button @click="store.applyVisible = false" class="!w-full" type="error" secondary>
      {{$t('content.cancel')}}
    </n-button>
  </div>
  <div class="col-span-6">
    <n-button
        @click="onSubmit"
        :loading="store.sendLoading"
        class="!w-full"  type="primary" secondary>
      {{$t('content.save')}}
    </n-button>
  </div>
</div>
</template>

<style scoped>
.pop-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.pop-enter-active {
  transition: all 400ms ease-out;
}

.pop-leave-to {
  opacity: 0;
  transform: scale(0.6) translateY(-20px);
}

.pop-leave-active {
  transition: all 300ms ease-in;
}

.pop-move {
  transition: transform 300ms;
}

.bg-pattern{
  background-color: #ffffff;
  opacity: 0.8;
  background: radial-gradient(circle, transparent 20%, #ffffff 20%, #ffffff 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #ffffff 20%, #ffffff 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#f3f3f3 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #f3f3f3 2px, #ffffff 2px) -1px 0;
  background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
}
</style>
