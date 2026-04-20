<script setup>
import {Document28Regular, DeleteDismiss24Regular, ArrowUpload24Regular, CheckmarkCircle20Filled, DocumentPdf24Regular, Info28Regular, Warning20Filled, Dismiss24Filled} from "@vicons/fluent"
import {useProfileStore, useVacancyStore} from "../../store/index.js"

const store = useProfileStore()
const vacancyStore = useVacancyStore()
const { t } = useI18n()

const inputRefs = ref({})

const formatFileSize = (bytes) => {
  if(!bytes) return ''
  if(bytes < 1024) return bytes + ' B'
  if(bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

const uploadedCount = computed(() => store.docFiles.filter(f => f.file && f.type_id).length)
const totalTypes = computed(() => store.fileTypeList.length)

onMounted(() => {
  if(store.fileTypeList.length === 0){
    store.onGetEnum()
  }
})

const openFile = (typeId) => {
  inputRefs.value[typeId]?.click()
}

const setInputRef = (el, typeId) => {
  if(el) inputRefs.value[typeId] = el
}

const onSubmit = () => {
  const validFiles = store.docFiles.filter(item => item.type_id && item.file)

  const formData = new FormData()
  formData.append('vacancy_position_id', vacancyStore.detail?.id)
  validFiles.forEach((item, i) => {
    formData.append(`uploads[${i}][type]`, item.type_id)
    formData.append(`uploads[${i}][file]`, item.file)
  })
  store.onSendApply(formData)
}

const onCancel = () => {
  store.applyVisible = false
  store.onResetApplyFiles()
}
</script>

<template>
<div class="w-full grid grid-cols-12 gap-4">
  <div class="col-span-12">
    <div class="w-full bg-warning/10 border border-warning/40 rounded-lg px-4 py-3 mb-2 flex items-start gap-3">
      <n-icon size="20" class="text-warning mt-0.5 shrink-0">
        <Warning20Filled/>
      </n-icon>
      <div>
        <p class="text-warning font-bold text-sm">{{$t('detail.applyInfoTitle')}}</p>
        <p class="text-black-secondary text-xs mt-1 leading-[18px]">{{$t('detail.applyInfo')}}</p>
      </div>
    </div>

    <div class="flex items-center justify-between px-1 mb-1.5">
      <span class="text-xs font-semibold text-black-secondary uppercase tracking-wide">
        {{$t('detail.documents')}}
      </span>
      <span class="text-xs text-black-tertiary font-medium">
        {{uploadedCount}}/{{totalTypes}}
      </span>
    </div>
  </div>

  <div class="col-span-12 max-h-[400px] overflow-y-auto pr-1 apply-scroll">
    <template v-if="store.enumLoading">
      <div v-for="i in 3" :key="'skeleton-'+i"
           class="mb-2 border border-surface-line bg-surface-section rounded-lg overflow-hidden flex items-stretch">
        <div class="shrink-0 w-[44px] flex items-center justify-center border-r border-surface-line bg-surface-ground">
          <div class="w-7 h-7 rounded-full animate-shimmer shimmer"></div>
        </div>
        <div class="flex-1 min-w-0 p-2.5 space-y-2">
          <div class="h-3 w-3/4 rounded animate-shimmer shimmer"></div>
          <div class="h-7 w-full rounded-md animate-shimmer shimmer"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <div v-if="store.fileTypeList.length === 0" class="text-center py-8 text-black-tertiary text-sm">
        {{$t('content.emptyData')}}
      </div>

      <transition-group name="pop" tag="div">
        <template v-for="(type, index) in store.fileTypeList" :key="type.id">
          <div
              class="mb-2 border border-surface-line bg-surface-section rounded-lg overflow-hidden transition-all duration-300 flex items-stretch hover:border-black-tertiary/40">

            <div class="shrink-0 w-[44px] flex flex-col items-center justify-center border-r border-surface-line bg-surface-ground transition-all">
              <div
                  :class="[store.getFileByType(type.id) ? 'bg-success text-white' : 'bg-surface-line text-black-secondary']"
                  class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all">
                <n-icon v-if="store.getFileByType(type.id)" size="16">
                  <CheckmarkCircle20Filled/>
                </n-icon>
                <span v-else>{{index + 1}}</span>
              </div>
            </div>

            <div class="flex-1 min-w-0 flex flex-col">
              <p class="text-xs font-semibold text-black-primary leading-tight line-clamp-2 px-2.5 py-2 border-b border-surface-line">
                {{type.name}}
              </p>

              <div class="p-2">
                <div v-if="!store.getFileByType(type.id)"
                     @click="openFile(type.id)"
                     class="w-full cursor-pointer py-1.5 border border-dashed border-surface-line rounded-md flex justify-center items-center gap-2 bg-surface-ground hover:bg-surface-section hover:border-black-tertiary/40 transition-all">
                  <n-icon size="14" class="text-black-tertiary">
                    <ArrowUpload24Regular/>
                  </n-icon>
                  <span class="text-[11px] font-medium text-black-secondary">{{$t('detail.uploadFile')}}</span>
                  <span class="text-[10px] text-black-tertiary">(PDF)</span>
                </div>

                <div v-else class="flex items-center gap-2 px-2 py-1 bg-surface-ground border border-surface-line rounded-md">
                  <n-icon class="text-black-tertiary shrink-0" size="14">
                    <DocumentPdf24Regular/>
                  </n-icon>
                  <div class="flex-1 min-w-0">
                    <p class="text-[11px] font-medium text-black-primary truncate leading-tight">{{store.getFileByType(type.id)?.file?.name}}</p>
                    <p class="text-[10px] text-black-tertiary">{{formatFileSize(store.getFileByType(type.id)?.file?.size)}}</p>
                  </div>
                  <n-button
                      @click="store.removeFileByType(type.id)"
                      size="tiny"
                      type="error"
                      secondary
                      class="shrink-0">
                    <template #icon>
                      <n-icon size="12">
                        <Dismiss24Filled/>
                      </n-icon>
                    </template>
                    <span class="hidden sm:inline">{{$t('content.remove')}}</span>
                  </n-button>
                </div>
              </div>

              <input
                  type="file"
                  v-show="false"
                  :ref="(el)=>setInputRef(el, type.id)"
                  accept=".pdf"
                  @change="(e)=>store.onUploadFileByType(e, type.id)"
              />
            </div>
          </div>
        </template>
      </transition-group>
    </template>
  </div>

  <div class="col-span-6 mt-2">
    <n-button @click="onCancel" class="!w-full" type="error" secondary>
      {{$t('content.cancel')}}
    </n-button>
  </div>
  <div class="col-span-6 mt-2">
    <n-button
        @click="onSubmit"
        :loading="store.sendLoading"
        class="!w-full"
        type="primary"
        secondary>
      {{$t('content.save')}}
    </n-button>
  </div>
</div>
</template>

<style scoped>
.pop-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.pop-enter-active {
  transition: all 300ms ease-out;
}

.pop-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

.pop-leave-active {
  transition: all 250ms ease-in;
}

.pop-move {
  transition: transform 250ms;
}

.apply-scroll::-webkit-scrollbar {
  width: 6px;
}
.apply-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.apply-scroll::-webkit-scrollbar-thumb {
  background: var(--surface-line);
  border-radius: 3px;
}
.apply-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
  opacity: 0.5;
}
</style>
