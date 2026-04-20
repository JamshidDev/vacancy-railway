<script setup>
import {
  Wallet24Regular,
  Location24Regular,
  Clock32Regular,
  DocumentBriefcase20Regular,
  CalendarLtr32Regular,
  Location16Filled,
  Info16Regular,
  ArrowRight16Filled,
  DocumentPdf24Regular,
  Open24Regular,
  Dismiss24Filled,
  Add20Filled,
  ArrowUpload24Regular,
  CheckmarkCircle20Filled
} from "@vicons/fluent"
import {useProfileStore, useVacancyStore} from "../../store/index.js"

const router = useRouter()
const profileStore = useProfileStore()
const vacancyStore = useVacancyStore()
const dialog = useDialog()
const { t } = useI18n()

const deletingFileId = ref(null)

const addFileVisible = ref(false)
const addingFile = ref(false)
const pendingFiles = ref([])
const addFileInputRefs = ref({})

const setAddFileInputRef = (el, typeId) => {
  if(el) addFileInputRefs.value[typeId] = el
}

const getPendingFileByType = (typeId) => {
  return pendingFiles.value.find(f => f.type_id === typeId)
}

const props = defineProps({
  data:{
    type: Object,
    default:null,
  }
})

const emit = defineEmits(['showMessage'])

const vacancy = computed(() => props.data?.vacancy_position)
const files = computed(() => props.data?.files || [])

const getFileTypeName = (typeId) => {
  const type = profileStore.fileTypeList?.find(t => t.id === typeId)
  return type?.name || ''
}

const onOpenFile = (url) => {
  if(url) window.open(url, '_blank')
}

const onOpenAddFile = () => {
  pendingFiles.value = []
  addFileVisible.value = true
}

const onPickFileByType = (typeId) => {
  addFileInputRefs.value[typeId]?.click()
}

const onFileChangeByType = (event, typeId) => {
  const file = event.target.files?.[0]
  if(!file) return
  const existing = pendingFiles.value.find(f => f.type_id === typeId)
  if(existing){
    existing.file = file
  } else {
    pendingFiles.value.push({type_id: typeId, file})
  }
  event.target.value = ''
}

const onClearPendingFile = (typeId) => {
  pendingFiles.value = pendingFiles.value.filter(f => f.type_id !== typeId)
}

const formatFileSize = (bytes) => {
  if(!bytes) return ''
  if(bytes < 1024) return bytes + ' B'
  if(bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

const hasPendingFiles = computed(() => {
  return pendingFiles.value.some(f => f.type_id && f.file)
})

const onSubmitAddFile = async () => {
  const validFiles = pendingFiles.value.filter(f => f.type_id && f.file)
  if(validFiles.length === 0){
    $Toast.error(t('applications.selectFileFirst'))
    return
  }
  addingFile.value = true
  try {
    const formData = new FormData()
    validFiles.forEach((item, i) => {
      formData.append(`uploads[${i}][type]`, item.type_id)
      formData.append(`uploads[${i}][file]`, item.file)
    })
    await vacancyStore.onAddApplicationFile(props.data.id, formData)
    await vacancyStore.onApplications()
    $Toast.success(t('applications.fileAdded'))
    addFileVisible.value = false
    pendingFiles.value = []
  } catch(err) {
    $Toast.error(err?.response?.data?.message || t('applications.fileAddError'))
  } finally {
    addingFile.value = false
  }
}

const onDeleteFile = (file) => {
  dialog.warning({
    title: t('applications.confirmDeleteTitle'),
    content: t('applications.confirmDeleteText', {name: file.file_name}),
    positiveText: t('content.yes'),
    negativeText: t('content.no'),
    onPositiveClick: async () => {
      deletingFileId.value = file.id
      try {
        await vacancyStore.onDeleteApplicationFile(props.data.id, file.id)
        $Toast.success(t('applications.fileDeleted'))
      } catch(err) {
        $Toast.error(err?.response?.data?.message || t('applications.fileDeleteError'))
      } finally {
        deletingFileId.value = null
      }
    }
  })
}

onMounted(() => {
  if(profileStore.fileTypeList.length === 0){
    profileStore.onGetEnum()
  }
})

const statusType = computed(() => {
  const statusId = props.data?.status?.id
  if (statusId === 2) return 'success' // Qabul qilindi
  if (statusId === 3) return 'error'   // Bekor qilindi
  return 'warning' // Jarayonda
})

const hasMessage = computed(() => {
  return props.data?.status?.id !== 1 && props.data?.messages?.length > 0
})

const onShowMessage = () => {
  emit('showMessage', props.data)
}

const onGoToVacancy = () => {
  router.push({path:'/vacancy-list/detail', query:{id:vacancy.value?.id}})
}
</script>

<template>
<div
    class="px-3 sm:px-4 py-2.5 bg-surface-ground border border-surface-line rounded-lg mb-2">
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1.5 sm:gap-0">
    <h2 class="text-sm sm:text-base text-black-primary font-bold order-2 sm:order-1 line-clamp-1">{{vacancy?.position?.name}}</h2>
    <div class="flex items-center gap-1.5 self-start order-1 sm:order-2">
      <n-tag :type="statusType" size="tiny" round>
        {{ data?.status?.name }}
      </n-tag>
      <n-button
          v-if="hasMessage"
          @click="onShowMessage"
          :type="statusType"
          size="tiny"
          secondary
      >
        <template #icon>
          <n-icon size="12">
            <Info16Regular/>
          </n-icon>
        </template>
        {{ $t('content.viewMessage') }}
      </n-button>
    </div>
  </div>
  <h2 class="text-[11px] text-black-tertiary mt-1 pb-2 border-b border-surface-line flex items-center gap-1">
    <n-icon size="12" class="text-primary flex-shrink-0">
      <Location16Filled/>
    </n-icon>
    <span class="line-clamp-1">{{vacancy?.department?.name}}</span>
  </h2>
  <h3 class="text-black-secondary mt-1.5 font-medium text-xs sm:text-sm line-clamp-1">{{vacancy?.organization?.name}}</h3>
  <div class="grid grid-cols-2 mt-2 gap-1.5 text-xs sm:text-sm">
    <div class="flex items-center gap-x-1.5 font-medium">
        <n-icon size="14" class="text-primary flex-shrink-0">
          <Wallet24Regular/>
        </n-icon>
      <span class="line-clamp-1">{{utils.formattedMoney(vacancy?.salary)}} {{$t('content.sum')}}</span>
    </div>
    <div class="flex items-center gap-x-1.5 font-medium">
      <n-icon size="14" class="text-primary flex-shrink-0">
        <Location24Regular/>
      </n-icon>
      <span class="line-clamp-1">{{vacancy?.city?.region?.name}}, {{vacancy?.city?.name}}</span>
    </div>
    <div class="flex items-center gap-x-1.5 font-medium">
      <n-icon size="14" class="text-primary flex-shrink-0">
        <Clock32Regular/>
      </n-icon>
      <span class="line-clamp-1">{{vacancy?.work_type?.name}}</span>
    </div>
    <div class="flex items-center gap-x-1.5 font-medium">
      <n-icon size="14" class="text-primary flex-shrink-0">
        <DocumentBriefcase20Regular/>
      </n-icon>
      <span class="line-clamp-1">{{(vacancy?.experience ? $t('vacancy.minWorkExperience', {n:vacancy?.experience}) : $t('vacancy.noExperience'))}}</span>
    </div>
  </div>
  <div class="mt-2 border-t border-surface-line pt-2">
    <div class="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
      <p class="text-[10px] font-semibold text-black-tertiary uppercase tracking-wide">
        {{$t('applications.uploadedFiles')}} ({{files.length}})
      </p>
      <n-button @click="onOpenAddFile" size="tiny" type="primary" secondary>
        <template #icon>
          <n-icon size="12">
            <Add20Filled/>
          </n-icon>
        </template>
        {{$t('applications.addFile')}}
      </n-button>
    </div>
    <div v-if="files.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
      <div
          v-for="file in files"
          :key="file.id"
          class="flex flex-col sm:flex-row sm:items-center gap-1.5 px-2 py-1.5 bg-surface-section border border-surface-line rounded-md">
        <div class="flex items-center gap-1.5 flex-1 min-w-0 w-full">
          <n-icon size="14" class="text-primary shrink-0">
            <DocumentPdf24Regular/>
          </n-icon>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-medium text-black-tertiary truncate leading-tight">
              {{getFileTypeName(file.type) || $t('applications.document')}}
            </p>
            <p class="text-[11px] text-black-primary font-medium truncate leading-tight">
              {{file.file_name}}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0 w-full sm:w-auto justify-end">
          <n-button @click="onOpenFile(file.file)" size="tiny" type="primary" secondary class="shrink-0">
            <template #icon>
              <n-icon size="12">
                <Open24Regular/>
              </n-icon>
            </template>
            <span class="hidden sm:inline">{{$t('applications.open')}}</span>
          </n-button>
          <n-button
              @click="onDeleteFile(file)"
              :loading="deletingFileId === file.id"
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
    </div>
  </div>

  <div class="mt-2 border-t border-surface-line pt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
    <div class="flex gap-1 items-center text-[11px] text-black-tertiary">
      <n-icon size="14" class="flex-shrink-0">
        <CalendarLtr32Regular/>
      </n-icon>
      <span>{{ $t('detail.sentApply') }}: {{utils.formattedDate(data?.created_at)}}</span>
    </div>
    <n-button @click="onGoToVacancy" type="primary" size="tiny" secondary>
      <template #icon>
        <n-icon size="12">
          <ArrowRight16Filled/>
        </n-icon>
      </template>
      {{ $t('mainSection.goToVacancy') }}
    </n-button>
  </div>

  <UiModal :width="500" v-model:visible="addFileVisible">
    <template #header-title>
      <span class="uppercase font-bold text-base text-black-primary">{{$t('applications.addFileTitle')}}</span>
    </template>

    <div class="w-full flex flex-col gap-3">
      <div class="w-full bg-warning/10 border border-warning/40 rounded-lg px-3 py-2 flex items-start gap-2">
        <n-icon size="16" class="text-warning mt-0.5 shrink-0">
          <Info16Regular/>
        </n-icon>
        <p class="text-black-secondary text-xs leading-[16px]">{{$t('applications.addFileInfo')}}</p>
      </div>

      <div class="max-h-[380px] overflow-y-auto pr-1 apply-scroll">
        <template v-if="profileStore.enumLoading">
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
          <div v-if="profileStore.fileTypeList.length === 0" class="text-center py-8 text-black-tertiary text-sm">
            {{$t('content.emptyData')}}
          </div>

          <template v-for="(type, index) in profileStore.fileTypeList" :key="type.id">
            <div class="mb-2 border border-surface-line bg-surface-section rounded-lg overflow-hidden transition-all duration-300 flex items-stretch hover:border-black-tertiary/40">
              <div class="shrink-0 w-[44px] flex flex-col items-center justify-center border-r border-surface-line bg-surface-ground transition-all">
                <div
                    :class="[getPendingFileByType(type.id) ? 'bg-success text-white' : 'bg-surface-line text-black-secondary']"
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all">
                  <n-icon v-if="getPendingFileByType(type.id)" size="16">
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
                  <div v-if="!getPendingFileByType(type.id)"
                       @click="onPickFileByType(type.id)"
                       class="w-full cursor-pointer py-1.5 border border-dashed border-surface-line rounded-md flex justify-center items-center gap-2 bg-surface-ground hover:bg-surface-section hover:border-black-tertiary/40 transition-all">
                    <n-icon size="14" class="text-black-tertiary">
                      <ArrowUpload24Regular/>
                    </n-icon>
                    <span class="text-[11px] font-medium text-black-secondary">{{$t('detail.uploadFile')}}</span>
                    <span class="text-[10px] text-black-tertiary">(PDF)</span>
                  </div>

                  <div v-else class="flex items-center gap-2 px-2 py-1 bg-surface-ground border border-surface-line rounded-md">
                    <n-icon class="text-primary shrink-0" size="14">
                      <DocumentPdf24Regular/>
                    </n-icon>
                    <div class="flex-1 min-w-0">
                      <p class="text-[11px] font-medium text-black-primary truncate leading-tight">{{getPendingFileByType(type.id)?.file?.name}}</p>
                      <p class="text-[10px] text-black-tertiary">{{formatFileSize(getPendingFileByType(type.id)?.file?.size)}}</p>
                    </div>
                    <n-button @click="onClearPendingFile(type.id)" size="tiny" type="error" secondary class="shrink-0">
                      <template #icon>
                        <n-icon size="12">
                          <Dismiss24Filled/>
                        </n-icon>
                      </template>
                      <span class="hidden sm:inline">{{$t('content.remove')}}</span>
                    </n-button>
                  </div>

                  <input
                      type="file"
                      v-show="false"
                      :ref="(el)=>setAddFileInputRef(el, type.id)"
                      accept=".pdf"
                      @change="(e)=>onFileChangeByType(e, type.id)"
                  />
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>

      <div class="grid grid-cols-2 gap-2 mt-2">
        <n-button @click="addFileVisible = false" :disabled="addingFile" class="!w-full" type="error" secondary>
          {{$t('content.cancel')}}
        </n-button>
        <n-button @click="onSubmitAddFile" :loading="addingFile" :disabled="!hasPendingFiles" class="!w-full" type="primary" secondary>
          {{$t('content.save')}}
        </n-button>
      </div>
    </div>
  </UiModal>
</div>
</template>

<style scoped>
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
