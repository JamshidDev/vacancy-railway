<script setup>
import {
  Document28Regular,
  DocumentPdf24Regular,
  Open24Regular,
  Video24Regular,
  Copy24Regular,
  ClipboardTaskListLtr24Regular,
  CheckmarkCircle20Filled,
  DismissCircle20Filled,
  Clock20Filled,
  CalendarLtr32Regular,
  Location24Regular,
  Wallet24Regular,
  DocumentBriefcase20Regular,
  PersonArrowRight24Regular,
  DocumentCheckmark24Regular,
  PeopleTeam24Regular,
  Heart24Regular,
  BookQuestionMark24Regular
} from "@vicons/fluent"
import {useVacancyStore, useProfileStore} from "../../store/index.js"
import {utils} from "~/utils/index.js"

const visible = defineModel('visible', {type:Boolean, default:false})
const store = useVacancyStore()
const profileStore = useProfileStore()
const router = useRouter()
const { t } = useI18n()

const detail = computed(() => store.applicationDetail)
const loading = computed(() => store.applicationDetailLoading)

const sortedStatuses = computed(() => {
  const list = detail.value?.statuses || []
  return [...list].sort((a, b) => (a?.type?.id || 0) - (b?.type?.id || 0))
})

const statusTagType = (statusId) => {
  if(statusId === 2) return 'success'
  if(statusId === 3) return 'error'
  return 'warning'
}

const statusIcon = (statusId) => {
  if(statusId === 2) return CheckmarkCircle20Filled
  if(statusId === 3) return DismissCircle20Filled
  return Clock20Filled
}

const stageIcon = (typeId) => {
  if(typeId === 1) return PersonArrowRight24Regular
  if(typeId === 2) return DocumentCheckmark24Regular
  if(typeId === 3) return PeopleTeam24Regular
  if(typeId === 4) return Heart24Regular
  if(typeId === 5) return BookQuestionMark24Regular
  return Document28Regular
}

const stageDescription = (typeId) => {
  if(typeId === 1) return t('applications.stageDesc1')
  if(typeId === 2) return t('applications.stageDesc2')
  if(typeId === 3) return t('applications.stageDesc3')
  if(typeId === 4) return t('applications.stageDesc4')
  if(typeId === 5) return t('applications.stageDesc5')
  return ''
}

const stageName = (typeId, fallback) => {
  if(typeId === 1) return t('applications.stageName1')
  if(typeId === 2) return t('applications.stageName2')
  if(typeId === 3) return t('applications.stageName3')
  if(typeId === 4) return t('applications.stageName4')
  if(typeId === 5) return t('applications.stageName5')
  return fallback || ''
}

const overallStatusType = computed(() => statusTagType(detail.value?.status?.id))

const onOpenFilePath = (filePath) => {
  if(!filePath) return
  const url = filePath.startsWith('http')
      ? filePath
      : `https://hrm-api.railway.uz/hrm-s3/hrm/${filePath}`
  window.open(url, '_blank')
}

const onOpenFile = (url) => {
  if(url) window.open(url, '_blank')
}

const onCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    $Toast.success(t('applications.copied'))
  } catch {
    $Toast.error(t('applications.copyFailed'))
  }
}

const onGoToVacancy = () => {
  if(detail.value?.vacancy_position?.id){
    router.push({path:'/vacancy-list/detail', query:{id: detail.value.vacancy_position.id}})
    visible.value = false
  }
}

const startingExam = ref(false)

const openExamTab = (appId, vacancyExamId) => {
  const url = `/exam?app_id=${appId}&vacancy_exam_id=${vacancyExamId}`
  window.open(url, '_blank')
}

const onStartExam = async (exam) => {
  if(!detail.value?.id) return
  const appId = detail.value.id

  if(exam?.created && !exam?.ended){
    const vacancyExamId = exam?.id || exam?.vacancy_exam_id || exam?.vacancy_application_exam
    if(!vacancyExamId){
      $Toast.error(t('exam.errorStarting'))
      return
    }
    openExamTab(appId, vacancyExamId)
    return
  }

  if(!exam?.vacancy_application_exam){
    $Toast.error(t('exam.errorStarting'))
    return
  }

  startingExam.value = true
  try {
    const res = await window.$ApiSerivce.vacancyService.startExam({
      applicationId: appId,
      examId: exam.vacancy_application_exam,
    })
    const newVacancyExamId = res?.data?.data?.vacancy_exam_details?.id
        || exam.vacancy_application_exam
    openExamTab(appId, newVacancyExamId)
  } catch(err) {
    $Toast.error(err?.response?.data?.message || t('exam.errorStarting'))
  } finally {
    startingExam.value = false
  }
}

const formatDateTime = (v) => {
  if(!v) return ''
  const date = utils.formattedDate(v)
  const match = typeof v === 'string' ? v.match(/(\d{2}:\d{2})(?::\d{2})?/) : null
  const time = match ? match[1] : ''
  return time ? `${date}, ${time}` : date
}

const getFileTypeStatuses = (details) => {
  if(!details) return []
  const result = []
  Object.keys(details).forEach(key => {
    if(!isNaN(parseInt(key))) {
      result.push(details[key])
    }
  })
  return result
}

const fileTypeListComputed = computed(() => profileStore.fileTypeList || [])

const getFileTypeName = (typeId) => {
  if(!typeId) return ''
  const list = fileTypeListComputed.value
  const type = list.find(t => Number(t.id) === Number(typeId))
  return type?.name || `${t('applications.fileType')} #${typeId}`
}

const fileTypeStatusType = (statusId) => {
  const id = Number(statusId)
  if(id === 1) return 'warning'  // Jarayonda
  if(id === 2) return 'success'  // Qabul qilindi
  if(id === 3) return 'error'    // Rad qilindi
  return 'default'
}

const fileTypeStatusLabel = (statusId) => {
  const id = Number(statusId)
  if(id === 1) return t('applications.statusPending')
  if(id === 2) return t('applications.statusAccepted')
  if(id === 3) return t('applications.statusRejected')
  return ''
}

const fileTypeStatusIcon = (statusId) => {
  const id = Number(statusId)
  if(id === 2) return CheckmarkCircle20Filled
  if(id === 3) return DismissCircle20Filled
  return Clock20Filled
}

onMounted(() => {
  if(profileStore.fileTypeList.length === 0){
    profileStore.onGetEnum()
  }
})

watch(visible, (v) => {
  if(v && profileStore.fileTypeList.length === 0){
    profileStore.onGetEnum()
  }
})
</script>

<template>
<UiModal :width="680" v-model:visible="visible">
  <template #header-title>
    <div class="flex items-center gap-2">
      <span class="text-base sm:text-lg font-bold text-black-primary">{{ $t('applications.detailsTitle') }}</span>
      <span v-if="detail?.number" class="text-xs text-black-tertiary font-medium bg-surface-ground px-2 py-0.5 rounded border border-surface-line">
        {{ detail.number }}
      </span>
    </div>
  </template>

  <div class="w-full flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-1 details-scroll">
    <!-- Loading -->
    <template v-if="loading">
      <div class="bg-surface-ground border border-surface-line rounded-lg p-3">
        <div class="h-4 w-3/4 rounded animate-shimmer shimmer mb-2"></div>
        <div class="h-3 w-1/2 rounded animate-shimmer shimmer mb-2"></div>
        <div class="h-3 w-2/3 rounded animate-shimmer shimmer"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div v-for="i in 4" :key="i" class="bg-surface-ground border border-surface-line rounded-lg p-2.5">
          <div class="h-2.5 w-1/2 rounded animate-shimmer shimmer mb-2"></div>
          <div class="h-3 w-2/3 rounded animate-shimmer shimmer"></div>
        </div>
      </div>
      <div v-for="i in 3" :key="'stage-'+i" class="bg-surface-ground border border-surface-line rounded-lg p-3">
        <div class="h-4 w-1/3 rounded animate-shimmer shimmer mb-2"></div>
        <div class="h-12 w-full rounded animate-shimmer shimmer"></div>
      </div>
    </template>

    <template v-else-if="detail">
      <!-- Position & Overall Status -->
      <div class="bg-surface-ground border border-surface-line rounded-lg p-3">
        <div class="flex items-start justify-between gap-2 mb-2">
          <h3 class="text-sm sm:text-base font-bold text-black-primary line-clamp-2">
            {{ detail?.vacancy_position?.position?.name }}
          </h3>
          <n-tag :type="overallStatusType" size="small" round class="shrink-0">
            {{ detail?.status?.name }}
          </n-tag>
        </div>
        <p class="text-xs text-black-tertiary line-clamp-1 mb-1">
          {{ detail?.vacancy_position?.department?.name }}
        </p>
        <p class="text-xs sm:text-sm text-black-secondary font-medium line-clamp-2">
          {{ detail?.vacancy_position?.organization?.name }}
        </p>
      </div>

      <!-- Stages Timeline -->
      <div v-if="detail?.statuses?.length">
        <p class="text-[10px] font-semibold text-black-tertiary uppercase tracking-wide mb-2 px-1">
          {{ $t('applications.stages') }} ({{ detail.statuses.length }})
        </p>

        <div class="relative pl-6">
          <!-- Timeline line -->
          <div class="absolute left-[10px] top-2 bottom-2 w-[2px] bg-surface-line"></div>

          <div v-for="(stage, index) in sortedStatuses" :key="stage.id" class="relative mb-3 last:mb-0">
            <!-- Dot -->
            <div
                :class="[
                  stage.status?.id === 2 ? 'bg-success text-white' :
                  stage.status?.id === 3 ? 'bg-error text-white' :
                  'bg-warning text-white'
                ]"
                class="absolute -left-6 top-0 w-[22px] h-[22px] rounded-full flex items-center justify-center z-10 shadow-sm">
              <n-icon size="14">
                <component :is="statusIcon(stage.status?.id)"/>
              </n-icon>
            </div>

            <div class="bg-surface-ground border border-surface-line rounded-lg overflow-hidden">
              <div class="flex items-start justify-between gap-2 px-3 py-2 bg-surface-section border-b border-surface-line flex-wrap">
                <div class="flex items-start gap-2 min-w-0 flex-1">
                  <n-icon size="18" class="text-primary shrink-0 mt-0.5">
                    <component :is="stageIcon(stage.type?.id)"/>
                  </n-icon>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5">
                      <span class="text-[10px] font-bold text-black-tertiary">#{{ index + 1 }}</span>
                      <h4 class="text-xs sm:text-sm font-bold text-black-primary line-clamp-1">
                        {{ stageName(stage.type?.id, stage.type?.name) }}
                      </h4>
                    </div>
                    <p v-if="stageDescription(stage.type?.id)" class="text-[10px] text-black-tertiary leading-tight mt-0.5 line-clamp-2">
                      {{ stageDescription(stage.type?.id) }}
                    </p>
                  </div>
                </div>
                <n-tag :type="statusTagType(stage.status?.id)" size="tiny" round class="shrink-0">
                  {{ stage.status?.name }}
                </n-tag>
              </div>

              <div class="px-3 py-2">
                <!-- Type 1: Ariza topshirish -->
                <template v-if="stage.type?.id === 1">
                  <table class="w-full text-xs details-table">
                    <tbody>
                    <tr v-if="stage.details?.number">
                      <td>{{ $t('applications.applicationNumber') }}</td>
                      <td>{{ stage.details.number }}</td>
                    </tr>
                    <tr v-if="stage.details?.created">
                      <td>{{ $t('applications.applicationDate') }}</td>
                      <td>{{ formatDateTime(stage.details.created) }}</td>
                    </tr>
                    </tbody>
                  </table>
                </template>

                <!-- Type 2: Hujjatlarni baholash -->
                <template v-else-if="stage.type?.id === 2">
                  <table v-if="getFileTypeStatuses(stage.details).length" class="w-full text-xs details-table">
                    <tbody>
                    <tr v-for="(ft, i) in getFileTypeStatuses(stage.details)" :key="'ft-'+i">
                      <td>{{ getFileTypeName(ft.file_type) }}</td>
                      <td>
                        <n-tag :type="fileTypeStatusType(ft.status)" size="tiny" round>
                          {{ fileTypeStatusLabel(ft.status) }}
                        </n-tag>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </template>

                <!-- Type 3: Suhbat (Interview with Zoom) -->
                <template v-else-if="stage.type?.id === 3">
                  <table v-if="stage.details?.zoom" class="w-full text-xs details-table">
                    <tbody>
                    <tr>
                      <td>{{ $t('applications.meetingId') }}</td>
                      <td>{{ stage.details.zoom.meet_id }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('applications.zoomMeeting') }}</td>
                      <td>
                        <div class="flex gap-1 justify-end flex-wrap">
                          <n-button @click="onOpenFile(stage.details.zoom.join_url)" type="primary" size="tiny" secondary>
                            <template #icon>
                              <n-icon><Video24Regular/></n-icon>
                            </template>
                            {{ $t('applications.joinMeeting') }}
                          </n-button>
                          <n-button @click="onCopy(stage.details.zoom.join_url)" size="tiny" tertiary>
                            <template #icon>
                              <n-icon><Copy24Regular/></n-icon>
                            </template>
                          </n-button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </template>

                <!-- Type 4: Tibbiy ko'rik (Medical) -->
                <template v-else-if="stage.type?.id === 4">
                </template>

                <!-- Type 5: Onlayn test (Exam) -->
                <template v-else-if="stage.type?.id === 5">
                  <table v-if="stage.details?.exams" class="w-full text-xs details-table">
                    <tbody>
                    <tr>
                      <td>{{ $t('applications.examName') }}</td>
                      <td>{{ stage.details.exams.exam_name }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('applications.examType') }}</td>
                      <td>{{ stage.details.exams.exam_type ? $t('applications.examOffline') : $t('applications.examOnline') }}</td>
                    </tr>

                    <!-- Online flow -->
                    <template v-if="!stage.details.exams.exam_type">
                      <tr v-if="!stage.details.exams.status">
                        <td>{{ $t('applications.examStatus') }}</td>
                        <td>
                          <n-tag type="warning" size="tiny" round>{{ $t('applications.examNotActive') }}</n-tag>
                        </td>
                      </tr>
                      <template v-else>
                        <tr v-if="stage.details.exams.created">
                          <td>{{ $t('applications.examStarted') }}</td>
                          <td>{{ formatDateTime(stage.details.exams.created) }}</td>
                        </tr>
                        <tr v-if="stage.details.exams.ended">
                          <td>{{ $t('applications.examEnded') }}</td>
                          <td>{{ formatDateTime(stage.details.exams.ended) }}</td>
                        </tr>
                        <tr v-if="stage.details.exams.created && stage.details.exams.ended && stage.details.exams.result !== null && stage.details.exams.result !== undefined">
                          <td>{{ $t('applications.examResult') }}</td>
                          <td><span class="font-bold text-success">{{ stage.details.exams.result }}</span></td>
                        </tr>
                        <tr v-if="stage.details.exams.created && !stage.details.exams.ended">
                          <td colspan="2" class="!pt-2">
                            <n-button @click="onStartExam(stage.details.exams)" :loading="startingExam" type="warning" size="small" class="!w-full">
                              <template #icon>
                                <n-icon><ClipboardTaskListLtr24Regular/></n-icon>
                              </template>
                              {{ $t('applications.continueExam') }}
                            </n-button>
                          </td>
                        </tr>
                        <tr v-else-if="!stage.details.exams.created">
                          <td colspan="2" class="!pt-2">
                            <n-button @click="onStartExam(stage.details.exams)" :loading="startingExam" type="primary" size="small" class="!w-full">
                              <template #icon>
                                <n-icon><ClipboardTaskListLtr24Regular/></n-icon>
                              </template>
                              {{ $t('applications.startExam') }}
                            </n-button>
                          </td>
                        </tr>
                      </template>
                    </template>

                    <!-- Offline flow -->
                    <template v-else>
                      <tr v-if="stage.details.exams.created">
                        <td>{{ $t('applications.examStarted') }}</td>
                        <td>{{ formatDateTime(stage.details.exams.created) }}</td>
                      </tr>
                      <tr v-if="stage.details.exams.ended">
                        <td>{{ $t('applications.examEnded') }}</td>
                        <td>{{ formatDateTime(stage.details.exams.ended) }}</td>
                      </tr>
                      <tr v-if="stage.details.exams.result !== null && stage.details.exams.result !== undefined">
                        <td>{{ $t('applications.examResult') }}</td>
                        <td><span class="font-bold text-success">{{ stage.details.exams.result }}</span></td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </template>

                <!-- Message -->
                <div v-if="stage.message" class="mt-2 pt-2 border-t border-surface-line">
                  <p class="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">
                    {{ $t('content.viewMessage') }}
                  </p>
                  <p class="text-xs text-black-secondary whitespace-pre-line leading-relaxed">{{ stage.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </template>

    <template v-else>
      <div class="py-10 text-center text-black-tertiary text-sm">
        {{ $t('content.no-data') }}
      </div>
    </template>
  </div>

  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
    <n-button @click="visible = false" type="error" secondary class="!w-full">
      {{ $t('content.close') }}
    </n-button>
    <n-button @click="onGoToVacancy" :disabled="!detail?.vacancy_position?.id" type="primary" secondary class="!w-full">
      {{ $t('applications.viewVacancy') }}
    </n-button>
  </div>
</UiModal>
</template>

<style scoped>
.details-scroll::-webkit-scrollbar {
  width: 6px;
}
.details-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.details-scroll::-webkit-scrollbar-thumb {
  background: var(--surface-line);
  border-radius: 3px;
}
.details-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
  opacity: 0.5;
}

.details-table tr {
  border-bottom: 1px solid var(--surface-line);
}
.details-table tr:last-child {
  border-bottom: none;
}
.details-table td {
  padding: 6px 0;
  vertical-align: middle;
}
.details-table td:first-child {
  color: var(--black-tertiary);
  width: 45%;
  padding-right: 10px;
  font-size: 11px;
}
.details-table td:last-child {
  color: var(--black-primary);
  font-weight: 500;
  text-align: right;
}
</style>
