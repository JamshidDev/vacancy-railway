<script setup>
import {CheckmarkCircle20Filled, ClipboardTaskListLtr24Regular, Warning20Filled, Grid20Filled, Dismiss24Filled, DocumentCheckmark24Regular, Clock20Filled, CalendarLtr32Regular} from "@vicons/fluent"
import {useExamStore} from "~/store/index.js"
import {utils} from "~/utils/index.js"

definePageMeta({
  layout: 'exam-layout',
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const store = useExamStore()
const dialog = useDialog()
const { t } = useI18n()

const mobileDrawerVisible = ref(false)
const finishModalVisible = ref(false)
const showResult = ref(false)
const redirectCountdown = ref(5)
const redirectInterval = ref(null)

const timeUpShown = ref(false)

const progressPercent = computed(() => {
  if(!store.totalQuestions) return 0
  return Math.round((store.answeredCount / store.totalQuestions) * 100)
})

const startRedirectCountdown = () => {
  redirectCountdown.value = 5
  if(redirectInterval.value) clearInterval(redirectInterval.value)
  redirectInterval.value = setInterval(() => {
    redirectCountdown.value--
    if(redirectCountdown.value <= 0){
      clearInterval(redirectInterval.value)
      redirectInterval.value = null
      goToApplications()
    }
  }, 1000)
}

const goToApplications = () => {
  if(redirectInterval.value){
    clearInterval(redirectInterval.value)
    redirectInterval.value = null
  }
  if(window.opener){
    window.close()
  } else {
    router.push('/applications')
  }
}

onMounted(async () => {
  const appId = route.query.app_id
  const vacancyExamId = route.query.vacancy_exam_id
  if(!appId || !vacancyExamId){
    router.push('/applications')
    return
  }
  await store.onContinueExam(appId, vacancyExamId)
})

onBeforeUnmount(() => {
  if(redirectInterval.value) clearInterval(redirectInterval.value)
  store.onStopTimer()
})

watch(() => store.timeIsUp, (v) => {
  if(v && !timeUpShown.value){
    timeUpShown.value = true
    dialog.warning({
      title: t('exam.timeUp'),
      content: t('exam.timeUpMessage'),
      positiveText: t('content.yes'),
      closable: false,
      maskClosable: false,
    })
  }
})

const onScrollToQuestion = (index) => {
  const el = document.getElementById(`question-${index}`)
  if(el){
    el.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
  mobileDrawerVisible.value = false
}

const onOpenFinishModal = () => {
  finishModalVisible.value = true
}

const onConfirmFinish = async () => {
  const success = await store.onFinishExam()
  if(success){
    $Toast.success(t('exam.examFinished'))
    finishModalVisible.value = false
    showResult.value = true
    startRedirectCountdown()
  } else {
    $Toast.error(t('exam.errorFinishing'))
  }
}

const formatResultDate = (v) => {
  if(!v) return ''
  const match = typeof v === 'string' ? v.match(/(\d{2}:\d{2})(?::\d{2})?/) : null
  const time = match ? match[1] : ''
  const datePart = utils.formattedDate(v)
  return time ? `${datePart}, ${time}` : datePart
}

const examDuration = computed(() => {
  const r = store.finishResult
  if(!r?.created || !r?.ended) return ''
  const start = new Date(r.created.replace(' ', 'T'))
  const end = new Date(r.ended.replace(' ', 'T'))
  const diffMs = end - start
  const totalMin = Math.floor(diffMs / 60000)
  const hrs = Math.floor(totalMin / 60)
  const min = totalMin % 60
  if(hrs > 0) return `${hrs} ${t('exam.hour')} ${min} ${t('exam.minute')}`
  return `${min} ${t('exam.minute')}`
})

</script>

<template>
  <div class="w-full">
    <!-- Loading -->
    <div v-if="store.examLoading" class="min-h-screen flex flex-col items-center justify-center gap-3">
      <n-spin size="large"/>
      <p class="text-sm text-black-tertiary">{{ $t('exam.loading') }}</p>
    </div>

    <!-- Result Screen -->
    <div v-else-if="showResult && store.finishResult" class="min-h-screen flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-[480px] bg-surface-section border border-surface-line rounded-2xl shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="text-center px-6 py-8 bg-gradient-to-b from-success/10 to-transparent">
          <div class="w-16 h-16 mx-auto rounded-full bg-success/15 flex items-center justify-center mb-3">
            <n-icon size="36" class="text-success">
              <CheckmarkCircle20Filled/>
            </n-icon>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-black-primary mb-1">
            {{ $t('exam.examFinished') }}
          </h2>
          <p class="text-sm text-black-tertiary">
            {{ $t('exam.resultSubtitle') }}
          </p>
        </div>

        <!-- Big result -->
        <div class="px-6 pt-4 pb-2">
          <div class="bg-primary/5 border border-primary/20 rounded-xl px-4 py-5 flex items-center justify-between">
            <div>
              <p class="text-[11px] font-semibold text-primary uppercase tracking-wide mb-1">
                {{ $t('exam.yourResult') }}
              </p>
              <p class="text-xs text-black-tertiary">
                {{ $t('exam.correctAnswers') }}
              </p>
            </div>
            <div class="text-right">
              <span class="text-4xl font-bold text-primary tabular-nums">{{ store.finishResult.result ?? '—' }}</span>
              <span class="text-lg text-black-tertiary font-medium">/{{ store.totalQuestions }}</span>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="px-6 pb-4">
          <div class="space-y-0.5">
            <div class="flex items-center justify-between gap-2 py-2.5 border-b border-surface-line">
              <span class="flex items-center gap-2 text-xs text-black-tertiary">
                <n-icon size="14"><CalendarLtr32Regular/></n-icon>
                {{ $t('exam.examStarted') }}
              </span>
              <span class="text-xs font-semibold text-black-primary">{{ formatResultDate(store.finishResult.created) }}</span>
            </div>
            <div class="flex items-center justify-between gap-2 py-2.5 border-b border-surface-line">
              <span class="flex items-center gap-2 text-xs text-black-tertiary">
                <n-icon size="14"><CalendarLtr32Regular/></n-icon>
                {{ $t('exam.examEnded') }}
              </span>
              <span class="text-xs font-semibold text-black-primary">{{ formatResultDate(store.finishResult.ended) }}</span>
            </div>
            <div v-if="examDuration" class="flex items-center justify-between gap-2 py-2.5">
              <span class="flex items-center gap-2 text-xs text-black-tertiary">
                <n-icon size="14"><Clock20Filled/></n-icon>
                {{ $t('exam.duration') }}
              </span>
              <span class="text-xs font-semibold text-black-primary">{{ examDuration }}</span>
            </div>
          </div>
        </div>

        <!-- Redirect countdown -->
        <div class="px-6 pb-6">
          <div class="flex items-center gap-3 px-3 py-2.5 bg-surface-ground border border-surface-line rounded-lg mb-3">
            <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary tabular-nums shrink-0">
              {{ redirectCountdown }}
            </div>
            <p class="text-xs text-black-secondary leading-snug flex-1">
              {{ $t('exam.redirectMessage', {n: redirectCountdown}) }}
            </p>
          </div>
          <n-button @click="goToApplications" type="primary" size="large" class="!w-full">
            {{ $t('exam.goToApplications') }}
          </n-button>
        </div>
      </div>
    </div>

    <!-- Exam content -->
    <template v-else-if="store.exam && !showResult">
      <!-- Header (sticky) -->
      <header class="sticky top-0 z-30 bg-surface-section border-b border-surface-line shadow-sm">
        <div class="max-w-[1400px] mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2 min-w-0 flex-1">
            <div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <n-icon size="18" class="text-primary">
                <ClipboardTaskListLtr24Regular/>
              </n-icon>
            </div>
            <div class="min-w-0 flex-1">
              <h1 class="text-sm sm:text-base font-bold text-black-primary line-clamp-1">{{ store.exam.name }}</h1>
              <p class="text-[10px] sm:text-xs text-black-tertiary">
                {{ $t('exam.variantLabel') }} {{ store.exam.variant }} ·
                {{ $t('exam.testsCount', {n: store.exam.tests_count}) }}
              </p>
            </div>
          </div>

        </div>
      </header>

      <!-- Body -->
      <div class="max-w-[1400px] mx-auto px-3 sm:px-4 py-4">
        <div class="lg:flex gap-4">
          <!-- Left: Questions -->
          <div class="flex-1 min-w-0 pb-20 lg:pb-4">
            <div
                v-for="(q, index) in store.questions"
                :key="q.id"
                :id="`question-${index}`"
                class="mb-3 border border-surface-line bg-surface-section rounded-xl transition-all duration-200">
              <div class="px-3 sm:px-4 py-2.5 border-b border-surface-line flex items-start justify-between gap-2">
                <div class="flex items-start gap-2 min-w-0 flex-1">
                  <div
                      :class="[store.isAnswered(q.id) ? 'bg-primary text-white border-primary' : 'bg-surface-ground text-black-secondary border-surface-line']"
                      class="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {{ index + 1 }}
                  </div>
                  <p class="text-sm font-bold text-black-primary leading-relaxed whitespace-pre-line flex-1">{{ q.question }}</p>
                </div>
                <n-spin v-if="store.savingQuestionId === q.id" size="tiny" class="shrink-0 mt-1"/>
              </div>

              <div class="px-3 sm:px-4 py-3">
                <div class="space-y-1.5">
                  <label
                      v-for="ans in q.answers"
                      :key="ans.id"
                      :class="[
                        store.answers[q.id] === ans.id
                          ? 'border-primary bg-primary/10'
                          : 'border-surface-line bg-surface-section hover:border-black-tertiary/40 hover:bg-surface-ground'
                      ]"
                      class="flex items-start gap-2.5 px-3 py-2 border rounded-lg cursor-pointer transition-all">
                    <input
                        type="radio"
                        :name="`q-${q.id}`"
                        :value="ans.id"
                        :checked="store.answers[q.id] === ans.id"
                        @change="store.onSelectAnswer(q.id, ans.id)"
                        :disabled="store.savingQuestionId === q.id"
                        class="mt-0.5 shrink-0 accent-primary w-4 h-4"
                    />
                    <span class="text-xs sm:text-sm text-black-primary font-semibold leading-relaxed flex-1">{{ ans.text }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Navigation (desktop only) -->
          <aside class="hidden lg:block w-[300px] shrink-0">
            <div class="sticky top-[76px]">
              <div class="bg-surface-section border border-surface-line rounded-xl overflow-hidden">
                <!-- Header with progress -->
                <div class="px-4 py-3 border-b border-surface-line bg-surface-ground">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-black-primary uppercase tracking-wide">
                      {{ $t('exam.progress') }}
                    </span>
                    <span class="text-sm font-bold text-primary tabular-nums">
                      {{ store.answeredCount }}/{{ store.totalQuestions }}
                    </span>
                  </div>
                  <div class="w-full h-1.5 bg-surface-line rounded-full overflow-hidden">
                    <div
                        class="h-full bg-primary rounded-full transition-all duration-300"
                        :style="{width: `${(store.answeredCount / store.totalQuestions * 100) || 0}%`}"
                    ></div>
                  </div>
                  <p class="text-[10px] text-black-tertiary mt-1.5">
                    {{ progressPercent }}% {{ $t('exam.completed') }}
                  </p>
                </div>

                <!-- Grid -->
                <div class="p-3 max-h-[340px] overflow-y-auto apply-scroll">
                  <div class="grid grid-cols-5 gap-1.5">
                    <button
                        v-for="(q, index) in store.questions"
                        :key="q.id"
                        @click="onScrollToQuestion(index)"
                        :title="`${$t('exam.question')} ${index + 1}${store.isAnswered(q.id) ? ' • ' + $t('exam.answered') : ''}`"
                        :class="[
                          store.isAnswered(q.id)
                            ? 'bg-primary text-white border-primary shadow-sm hover:bg-primary/90'
                            : 'bg-surface-section text-black-secondary border-surface-line hover:border-primary hover:text-primary hover:bg-primary/5'
                        ]"
                        class="relative w-full aspect-square flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all cursor-pointer active:scale-95">
                      {{ index + 1 }}
                      <span v-if="store.savingQuestionId === q.id" class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-warning animate-pulse"></span>
                    </button>
                  </div>
                </div>

                <!-- Legend -->
                <div class="px-4 py-3 border-t border-surface-line bg-surface-ground grid grid-cols-2 gap-2">
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded border-2 border-primary bg-primary shrink-0"></span>
                    <span class="text-[11px] text-black-secondary">
                      {{ $t('exam.answered') }} <span class="font-bold text-primary">{{ store.answeredCount }}</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded border-2 border-surface-line bg-surface-section shrink-0"></span>
                    <span class="text-[11px] text-black-secondary">
                      {{ $t('exam.remaining') }} <span class="font-bold text-black-primary">{{ store.remainingCount }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <n-button
                  @click="onOpenFinishModal"
                  :loading="store.finishing"
                  type="primary"
                  size="large"
                  class="!w-full !mt-3">
                <template #icon>
                  <n-icon><DocumentCheckmark24Regular/></n-icon>
                </template>
                {{ $t('exam.finish') }}
              </n-button>
            </div>
          </aside>
        </div>
      </div>

      <!-- Mobile bottom bar -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-section border-t border-surface-line shadow-lg">
        <div class="px-3 py-2 flex items-center gap-2">
          <n-button @click="mobileDrawerVisible = true" size="medium" class="flex-1">
            <template #icon>
              <n-icon><Grid20Filled/></n-icon>
            </template>
            {{ $t('exam.questions') }} ({{ store.answeredCount }}/{{ store.totalQuestions }})
          </n-button>
          <n-button @click="onOpenFinishModal" :loading="store.finishing" type="primary" size="medium" class="flex-1">
            {{ $t('exam.finish') }}
          </n-button>
        </div>
      </div>

      <!-- Mobile drawer -->
      <n-drawer v-model:show="mobileDrawerVisible" :height="520" placement="bottom">
        <n-drawer-content>
          <template #header>
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2 flex-1">
                <n-icon size="18" class="text-primary">
                  <Grid20Filled/>
                </n-icon>
                <span class="font-bold text-black-primary">{{ $t('exam.questions') }}</span>
              </div>
              <n-button @click="mobileDrawerVisible = false" quaternary circle>
                <template #icon>
                  <n-icon><Dismiss24Filled/></n-icon>
                </template>
              </n-button>
            </div>
          </template>

          <!-- Progress -->
          <div class="mb-3 p-3 bg-surface-ground border border-surface-line rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-black-primary uppercase tracking-wide">
                {{ $t('exam.progress') }}
              </span>
              <span class="text-sm font-bold text-primary tabular-nums">
                {{ store.answeredCount }}/{{ store.totalQuestions }} ({{ progressPercent }}%)
              </span>
            </div>
            <div class="w-full h-2 bg-surface-line rounded-full overflow-hidden">
              <div
                  class="h-full bg-primary rounded-full transition-all duration-300"
                  :style="{width: `${progressPercent}%`}"
              ></div>
            </div>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-6 sm:grid-cols-8 gap-2">
            <button
                v-for="(q, index) in store.questions"
                :key="q.id"
                @click="onScrollToQuestion(index)"
                :class="[
                  store.isAnswered(q.id)
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-section text-black-secondary border-surface-line'
                ]"
                class="relative aspect-square flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all active:scale-95">
              {{ index + 1 }}
              <span v-if="store.savingQuestionId === q.id" class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-warning animate-pulse"></span>
            </button>
          </div>

          <!-- Legend -->
          <div class="mt-4 pt-3 border-t border-surface-line grid grid-cols-2 gap-2">
            <div class="flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
              <span class="w-3 h-3 rounded border-2 border-primary bg-primary shrink-0"></span>
              <div class="flex-1 min-w-0">
                <p class="text-[10px] text-black-tertiary">{{ $t('exam.answered') }}</p>
                <p class="text-sm font-bold text-primary">{{ store.answeredCount }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 bg-surface-ground border border-surface-line rounded-lg">
              <span class="w-3 h-3 rounded border-2 border-surface-line bg-surface-section shrink-0"></span>
              <div class="flex-1 min-w-0">
                <p class="text-[10px] text-black-tertiary">{{ $t('exam.remaining') }}</p>
                <p class="text-sm font-bold text-black-primary">{{ store.remainingCount }}</p>
              </div>
            </div>
          </div>
        </n-drawer-content>
      </n-drawer>
    </template>

    <!-- Error state -->
    <div v-else class="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
      <n-icon size="48" class="text-error">
        <Warning20Filled/>
      </n-icon>
      <p class="text-base font-semibold text-black-primary">{{ $t('exam.errorLoadingExam') }}</p>
      <n-button @click="router.push('/applications')" type="primary">
        {{ $t('applications.viewDetails') }}
      </n-button>
    </div>

    <!-- Finish Confirmation Modal -->
    <UiModal v-model:visible="finishModalVisible" :width="440" :persistent="store.finishing">
      <template #header-title>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <n-icon size="18" class="text-primary">
              <DocumentCheckmark24Regular/>
            </n-icon>
          </div>
          <span class="text-base font-bold text-black-primary">{{ $t('exam.confirmFinishTitle') }}</span>
        </div>
      </template>

      <div class="w-full flex flex-col gap-3">
        <p class="text-sm text-black-secondary leading-relaxed">
          {{ $t('exam.confirmFinishSubtitle') }}
        </p>

        <!-- Stats -->
        <div class="bg-surface-ground border border-surface-line rounded-lg overflow-hidden">
          <div class="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-surface-line">
            <span class="text-xs text-black-tertiary">{{ $t('exam.totalQuestions') }}</span>
            <span class="text-sm font-bold text-black-primary">{{ store.totalQuestions }}</span>
          </div>
          <div class="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-surface-line bg-primary/5">
            <span class="flex items-center gap-1.5 text-xs text-black-secondary">
              <span class="w-2 h-2 rounded-full bg-primary"></span>
              {{ $t('exam.answered') }}
            </span>
            <span class="text-sm font-bold text-primary">{{ store.answeredCount }}</span>
          </div>
          <div
              v-if="store.remainingCount > 0"
              class="flex items-center justify-between gap-2 px-3 py-2.5 bg-warning/5">
            <span class="flex items-center gap-1.5 text-xs text-black-secondary">
              <span class="w-2 h-2 rounded-full bg-warning"></span>
              {{ $t('exam.unanswered') }}
            </span>
            <span class="text-sm font-bold text-warning">{{ store.remainingCount }}</span>
          </div>
        </div>

        <!-- Warning -->
        <div
            v-if="store.remainingCount > 0"
            class="flex items-start gap-2 px-3 py-2.5 bg-warning/10 border border-warning/30 rounded-lg">
          <n-icon size="16" class="text-warning shrink-0 mt-0.5">
            <Warning20Filled/>
          </n-icon>
          <p class="text-xs text-black-secondary leading-relaxed">
            {{ $t('exam.unansweredWarning', {n: store.remainingCount}) }}
          </p>
        </div>

        <div class="flex items-start gap-2 px-3 py-2.5 bg-error/5 border border-error/20 rounded-lg">
          <n-icon size="16" class="text-error shrink-0 mt-0.5">
            <Warning20Filled/>
          </n-icon>
          <p class="text-xs text-black-secondary leading-relaxed">
            {{ $t('exam.confirmFinish') }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-2">
          <n-button @click="finishModalVisible = false" :disabled="store.finishing" type="default" class="!w-full">
            {{ $t('content.cancel') }}
          </n-button>
          <n-button @click="onConfirmFinish" :loading="store.finishing" type="primary" class="!w-full">
            {{ $t('exam.yesFinish') }}
          </n-button>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
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
