<script setup>
import {
  Wallet24Regular,
  Location24Regular,
  Clock32Regular,
  DocumentBriefcase20Regular,
  CalendarLtr32Regular,
  Info16Regular,
  ArrowRight16Filled,
  DocumentPdf24Regular,
  Open24Regular,
  Dismiss24Filled,
  Add20Filled,
  ArrowUpload24Regular,
  CheckmarkCircle20Filled,
  Eye16Filled
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

const emit = defineEmits(['showMessage', 'showDetails'])

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

const onShowDetails = () => {
  emit('showDetails', props.data)
}
</script>

<template>
<div class="group px-4 py-4 sm:px-6 sm:py-5 bg-surface-soft border border-surface-line rounded-xl mb-4 hover:border-primary/30 hover:shadow-card transition-all duration-300">
  <!-- Sarlavha: lavozim va holat -->
  <div class="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
    <div class="min-w-0">
      <h2
          @click="onGoToVacancy"
          :title="$t('applications.viewVacancy')"
          class="text-lg sm:text-xl text-black-primary hover:text-primary font-bold leading-[1.3] cursor-pointer transition-colors line-clamp-2">
        {{vacancy?.position?.name}}
      </h2>
      <p class="text-black-tertiary font-semibold text-sm sm:text-base mt-1 line-clamp-1">&bull; {{vacancy?.department?.name}}</p>
    </div>
    <div class="flex items-center gap-2 shrink-0 self-start">
      <UiStatusBadge :type="statusType" :label="data?.status?.name"/>
    </div>
  </div>

  <!-- Vakansiya ma'lumotlari -->
  <div class="border-t border-surface-line mt-3 sm:mt-4 pt-3 sm:pt-4">
    <h3 class="text-black-secondary font-semibold text-sm sm:text-base line-clamp-2">{{vacancy?.organization?.name}}</h3>
    <div class="grid grid-cols-12 mt-3 gap-x-6 gap-y-2 text-sm sm:text-base text-black-primary">
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <Wallet24Regular/>
        </n-icon>
        <span class="line-clamp-1">{{utils.formattedMoney(vacancy?.salary)}} {{$t('content.sum')}}</span>
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <Location24Regular/>
        </n-icon>
        <span class="line-clamp-1">{{vacancy?.city?.region?.name}}, {{vacancy?.city?.name}}</span>
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <Clock32Regular/>
        </n-icon>
        <span class="line-clamp-1">{{vacancy?.work_type?.name}}</span>
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-3 font-semibold">
        <n-icon size="20" class="text-primary shrink-0">
          <DocumentBriefcase20Regular/>
        </n-icon>
        <span class="line-clamp-1">{{(vacancy?.experience ? $t('vacancy.minWorkExperience', {n:vacancy?.experience}) : $t('vacancy.noExperience'))}}</span>
      </div>
    </div>
  </div>

  <!-- Hujjatlar -->
  <div class="border-t border-surface-line mt-3 sm:mt-4 pt-3 sm:pt-4">
    <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
      <p class="text-sm font-bold text-black-primary">
        {{$t('applications.uploadedFiles')}}
        <span class="text-black-tertiary font-semibold">({{files.length}})</span>
      </p>
      <n-button @click="onOpenAddFile" size="small" type="primary" secondary>
        <template #icon>
          <n-icon>
            <Add20Filled/>
          </n-icon>
        </template>
        {{$t('applications.addFile')}}
      </n-button>
    </div>
    <div v-if="files.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div
          v-for="file in files"
          :key="file.id"
          class="flex items-center gap-3 px-3 py-2.5 bg-surface-section border border-surface-line rounded-lg">
        <div class="w-9 h-9 rounded-lg bg-error/10 text-error flex items-center justify-center shrink-0">
          <n-icon size="20">
            <DocumentPdf24Regular/>
          </n-icon>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-black-tertiary truncate">
            {{getFileTypeName(file.type) || $t('applications.document')}}
          </p>
          <p class="text-sm text-black-primary font-semibold truncate">
            {{file.file_name}}
          </p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <n-button
              @click="onOpenFile(file.file)"
              :aria-label="$t('applications.open')"
              :title="$t('applications.open')"
              size="small" type="primary" secondary>
            <template #icon>
              <n-icon>
                <Open24Regular/>
              </n-icon>
            </template>
          </n-button>
          <n-button
              @click="onDeleteFile(file)"
              :loading="deletingFileId === file.id"
              :aria-label="$t('content.remove')"
              :title="$t('content.remove')"
              size="small"
              type="error"
              secondary>
            <template #icon>
              <n-icon>
                <Dismiss24Filled/>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </div>
  </div>

  <!-- Pastki qator: sana va amallar -->
  <div class="border-t border-surface-line mt-3 sm:mt-4 pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div class="flex items-center gap-2 text-sm text-black-tertiary">
      <n-icon size="18" class="shrink-0">
        <CalendarLtr32Regular/>
      </n-icon>
      <span>{{ $t('detail.sentApply') }}: {{utils.formattedDate(data?.created_at)}}</span>
    </div>
    <div class="flex items-center gap-2">
      <n-button
          v-if="hasMessage"
          @click="onShowMessage"
          :type="statusType"
          secondary
          class="flex-1 sm:flex-none">
        <template #icon>
          <n-icon>
            <Info16Regular/>
          </n-icon>
        </template>
        {{ $t('content.viewMessage') }}
      </n-button>
      <n-button @click="onShowDetails" type="primary" class="flex-1 sm:flex-none">
        <template #icon>
          <n-icon>
            <Eye16Filled/>
          </n-icon>
        </template>
        {{ $t('applications.viewDetails') }}
      </n-button>
    </div>
  </div>

  <UiModal :width="500" v-model:visible="addFileVisible">
    <template #header-title>
      <span class="font-bold text-lg text-black-primary">{{$t('applications.addFileTitle')}}</span>
    </template>

    <div class="w-full flex flex-col gap-3">
      <div class="w-full bg-warning/10 border border-warning/40 rounded-lg px-3 py-2 flex items-start gap-2">
        <n-icon size="16" class="text-warning mt-0.5 shrink-0">
          <Info16Regular/>
        </n-icon>
        <p class="text-black-secondary text-sm leading-[1.45]">{{$t('applications.addFileInfo')}}</p>
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
                <p class="text-sm font-semibold text-black-primary leading-tight line-clamp-2 px-3 py-2.5 border-b border-surface-line">
                  {{type.name}}
                </p>

                <div class="p-2">
                  <div v-if="!getPendingFileByType(type.id)"
                       @click="onPickFileByType(type.id)"
                       class="w-full cursor-pointer py-2.5 border border-dashed border-surface-line rounded-md flex justify-center items-center gap-2 bg-surface-ground hover:bg-surface-section hover:border-black-tertiary/40 transition-all">
                    <n-icon size="14" class="text-black-tertiary">
                      <ArrowUpload24Regular/>
                    </n-icon>
                    <span class="text-sm font-medium text-black-secondary">{{$t('detail.uploadFile')}}</span>
                    <span class="text-xs text-black-tertiary">(PDF)</span>
                  </div>

                  <div v-else class="flex items-center gap-2 px-2 py-1 bg-surface-ground border border-surface-line rounded-md">
                    <n-icon class="text-primary shrink-0" size="14">
                      <DocumentPdf24Regular/>
                    </n-icon>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-black-primary truncate leading-tight">{{getPendingFileByType(type.id)?.file?.name}}</p>
                      <p class="text-xs text-black-tertiary">{{formatFileSize(getPendingFileByType(type.id)?.file?.size)}}</p>
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
        <n-button @click="onSubmitAddFile" :loading="addingFile" :disabled="!hasPendingFiles" class="!w-full" type="primary">
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
