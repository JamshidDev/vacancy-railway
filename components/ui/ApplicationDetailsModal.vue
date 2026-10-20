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

// Bosqichlar progressi: qabul qilingan (status 2) bosqichlar soni
const completedStages = computed(() => sortedStatuses.value.filter(s => s?.status?.id === 2).length)
const progressPercent = computed(() => {
  const total = sortedStatuses.value.length
  return total ? Math.round(completedStages.value / total * 100) : 0
})

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

const checkingZoomMeetId = ref(null)

const onJoinZoom = async (zoom) => {
  if(!zoom) return
  checkingZoomMeetId.value = zoom.meet_id
  try {
    const res = await window.$ApiSerivce.vacancyService.checkZoomMeet({
      meetUuid: zoom.meet_uuid || '',
      meetId: zoom.meet_id,
    })
    const data = res?.data?.data
    const joinUrl = data?.join_url || data?.start_url
    if(res?.data?.error === false && joinUrl){
      window.open(joinUrl, '_blank')
    } else {
      $Toast.error(t('applications.zoomNotAllowed'))
    }
  } catch(err) {
    $Toast.error(err?.response?.data?.message || t('applications.zoomNotAllowed'))
  } finally {
    checkingZoomMeetId.value = null
  }
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
<UiModal :width="720" v-model:visible="visible">
  <template #header-title>
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-lg sm:text-xl font-bold text-black-primary">{{ $t('applications.detailsTitle') }}</span>
      <span v-if="detail?.number" class="text-sm text-black-secondary font-semibold bg-surface-ground px-2.5 py-0.5 rounded-md border border-surface-line">
        № {{ detail.number }}
      </span>
    </div>
  </template>

  <div class="w-full flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1 details-scroll">
    <!-- Yuklanmoqda -->
    <template v-if="loading">
      <div class="bg-surface-soft border border-surface-line rounded-xl p-4">
        <div class="h-5 w-3/4 rounded animate-shimmer shimmer mb-3"></div>
        <div class="h-4 w-1/2 rounded animate-shimmer shimmer mb-2"></div>
        <div class="h-4 w-2/3 rounded animate-shimmer shimmer"></div>
      </div>
      <div class="h-14 rounded-xl animate-shimmer shimmer"></div>
      <div v-for="i in 3" :key="'stage-'+i" class="bg-surface-soft border border-surface-line rounded-xl p-4">
        <div class="h-5 w-1/3 rounded animate-shimmer shimmer mb-3"></div>
        <div class="h-12 w-full rounded animate-shimmer shimmer"></div>
      </div>
    </template>

    <template v-else-if="detail">
      <!-- Vakansiya va umumiy holat -->
      <div class="bg-surface-soft border border-surface-line rounded-xl p-4 sm:p-5">
        <div class="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div class="min-w-0">
            <h3 class="text-lg sm:text-xl font-bold text-black-primary leading-[1.3]">
              {{ detail?.vacancy_position?.position?.name }}
            </h3>
            <p class="text-sm sm:text-base text-primary font-semibold mt-1">
              {{ detail?.vacancy_position?.department?.name }}
            </p>
          </div>
          <UiStatusBadge :type="overallStatusType" :label="detail?.status?.name" class="self-start shrink-0"/>
        </div>
        <p class="text-sm text-black-secondary mt-3 pt-3 border-t border-surface-line">
          {{ detail?.vacancy_position?.organization?.name }}
        </p>
      </div>

      <!-- Bosqichlar -->
      <div v-if="detail?.statuses?.length">
        <div class="flex items-center justify-between gap-3 mb-2">
          <p class="text-base font-bold text-black-primary">{{ $t('applications.stages') }}</p>
          <p class="text-sm text-black-tertiary">{{ $t('applications.stagesProgress', {done: completedStages, total: sortedStatuses.length}) }}</p>
        </div>
        <div class="w-full h-2 bg-surface-line rounded-full overflow-hidden mb-5">
          <div class="h-full bg-success rounded-full transition-all duration-500" :style="{width: `${progressPercent}%`}"></div>
        </div>

        <div class="relative">
          <!-- Vertikal chiziq -->
          <div class="absolute left-[17px] top-4 bottom-4 w-[2px] bg-surface-line"></div>

          <div v-for="(stage, index) in sortedStatuses" :key="stage.id" class="relative flex gap-3 sm:gap-4 mb-4 last:mb-0">
            <!-- Bosqich belgisi -->
            <div
                :class="[
                  stage.status?.id === 2 ? 'bg-success text-white ring-success/20' :
                  stage.status?.id === 3 ? 'bg-error text-white ring-error/20' :
                  'bg-warning text-white ring-warning/25'
                ]"
                class="relative z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center ring-4">
              <n-icon size="20">
                <component :is="statusIcon(stage.status?.id)"/>
              </n-icon>
            </div>

            <div class="flex-1 min-w-0 bg-surface-section border border-surface-line rounded-xl overflow-hidden">
              <div class="flex items-start justify-between gap-3 px-4 py-3 border-b border-surface-line flex-wrap">
                <div class="flex items-start gap-3 min-w-0 flex-1">
                  <div class="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <n-icon size="20">
                      <component :is="stageIcon(stage.type?.id)"/>
                    </n-icon>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs font-semibold text-black-tertiary">{{ $t('applications.stageNumber', {n: index + 1}) }}</p>
                    <h4 class="text-base font-bold text-black-primary leading-tight">
                      {{ stageName(stage.type?.id, stage.type?.name) }}
                    </h4>
                  </div>
                </div>
                <UiStatusBadge :type="statusTagType(stage.status?.id)" :label="stage.status?.name" size="small" class="shrink-0"/>
              </div>

              <div class="px-4 py-3">
                <p v-if="stageDescription(stage.type?.id)" class="text-sm text-black-tertiary leading-relaxed mb-2">
                  {{ stageDescription(stage.type?.id) }}
                </p>

                <!-- 1: Ariza topshirish -->
                <template v-if="stage.type?.id === 1">
                  <table class="w-full details-table">
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

                <!-- 2: Hujjatlarni baholash -->
                <template v-else-if="stage.type?.id === 2">
                  <table v-if="getFileTypeStatuses(stage.details).length" class="w-full details-table">
                    <tbody>
                    <tr v-for="(ft, i) in getFileTypeStatuses(stage.details)" :key="'ft-'+i">
                      <td>{{ getFileTypeName(ft.file_type) }}</td>
                      <td>
                        <UiStatusBadge :type="fileTypeStatusType(ft.status)" :label="fileTypeStatusLabel(ft.status)" size="small"/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </template>

                <!-- 3: Suhbat (Zoom) -->
                <template v-else-if="stage.type?.id === 3">
                  <div v-if="stage.details?.zoom" class="flex flex-col sm:flex-row sm:items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                      <div class="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                        <n-icon size="20"><Video24Regular/></n-icon>
                      </div>
                      <div class="min-w-0">
                        <p class="text-xs text-black-tertiary">{{ $t('applications.meetingId') }}</p>
                        <p class="text-sm font-bold text-black-primary truncate">{{ stage.details.zoom.meet_id }}</p>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <n-button
                          @click="onJoinZoom(stage.details.zoom)"
                          :loading="checkingZoomMeetId === stage.details.zoom.meet_id"
                          type="primary"
                          class="flex-1 sm:flex-none">
                        <template #icon>
                          <n-icon><Video24Regular/></n-icon>
                        </template>
                        {{ $t('applications.joinMeeting') }}
                      </n-button>
                      <n-button
                          @click="onCopy(stage.details.zoom.join_url)"
                          :aria-label="$t('applications.copyLink')"
                          :title="$t('applications.copyLink')"
                          secondary>
                        <template #icon>
                          <n-icon><Copy24Regular/></n-icon>
                        </template>
                      </n-button>
                    </div>
                  </div>
                </template>

                <!-- 5: Imtihon -->
                <template v-else-if="stage.type?.id === 5">
                  <template v-if="stage.details?.exams">
                    <table class="w-full details-table">
                      <tbody>
                      <tr>
                        <td>{{ $t('applications.examName') }}</td>
                        <td>{{ stage.details.exams.exam_name }}</td>
                      </tr>
                      <tr>
                        <td>{{ $t('applications.examType') }}</td>
                        <td>{{ stage.details.exams.exam_type ? $t('applications.examOffline') : $t('applications.examOnline') }}</td>
                      </tr>
                      <tr v-if="!stage.details.exams.exam_type && !stage.details.exams.status">
                        <td>{{ $t('applications.examStatus') }}</td>
                        <td><UiStatusBadge type="warning" :label="$t('applications.examNotActive')" size="small"/></td>
                      </tr>
                      <template v-if="stage.details.exams.exam_type || stage.details.exams.status">
                        <tr v-if="stage.details.exams.created">
                          <td>{{ $t('applications.examStarted') }}</td>
                          <td>{{ formatDateTime(stage.details.exams.created) }}</td>
                        </tr>
                        <tr v-if="stage.details.exams.ended">
                          <td>{{ $t('applications.examEnded') }}</td>
                          <td>{{ formatDateTime(stage.details.exams.ended) }}</td>
                        </tr>
                      </template>
                      </tbody>
                    </table>

                    <!-- Natija -->
                    <div
                        v-if="stage.details.exams.result !== null && stage.details.exams.result !== undefined && (stage.details.exams.exam_type || (stage.details.exams.created && stage.details.exams.ended))"
                        class="mt-3 flex items-center justify-between gap-3 bg-success/10 border border-success/25 rounded-lg px-4 py-3">
                      <span class="text-sm font-semibold text-black-secondary">{{ $t('applications.examResult') }}</span>
                      <span class="text-2xl font-bold text-success tabular-nums">{{ stage.details.exams.result }}</span>
                    </div>

                    <!-- Onlayn imtihon amallari -->
                    <template v-if="!stage.details.exams.exam_type && stage.details.exams.status">
                      <n-button
                          v-if="stage.details.exams.created && !stage.details.exams.ended"
                          @click="onStartExam(stage.details.exams)"
                          :loading="startingExam"
                          type="warning"
                          size="large"
                          class="!w-full !mt-3">
                        <template #icon>
                          <n-icon><ClipboardTaskListLtr24Regular/></n-icon>
                        </template>
                        {{ $t('applications.continueExam') }}
                      </n-button>
                      <n-button
                          v-else-if="!stage.details.exams.created"
                          @click="onStartExam(stage.details.exams)"
                          :loading="startingExam"
                          type="primary"
                          size="large"
                          class="!w-full !mt-3">
                        <template #icon>
                          <n-icon><ClipboardTaskListLtr24Regular/></n-icon>
                        </template>
                        {{ $t('applications.startExam') }}
                      </n-button>
                    </template>
                  </template>
                </template>

                <!-- Xabar -->
                <div v-if="stage.message" class="mt-3 bg-surface-ground border-l-4 border-primary rounded-r-lg px-3 py-2.5">
                  <p class="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                    {{ $t('content.viewMessage') }}
                  </p>
                  <p class="text-sm text-black-secondary whitespace-pre-line leading-relaxed">{{ stage.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </template>

    <template v-else>
      <UiNoResult/>
    </template>
  </div>

  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
    <n-button @click="visible = false" secondary class="!w-full">
      {{ $t('content.close') }}
    </n-button>
    <n-button @click="onGoToVacancy" :disabled="!detail?.vacancy_position?.id" type="primary" class="!w-full">
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
  padding: 8px 0;
  vertical-align: middle;
  font-size: 14px;
}
.details-table td:first-child {
  color: var(--black-tertiary);
  width: 45%;
  padding-right: 12px;
}
.details-table td:last-child {
  color: var(--black-primary);
  font-weight: 600;
  text-align: right;
}
</style>
