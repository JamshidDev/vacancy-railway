import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useExamStore = defineStore('examStore', ()=>{

    const exam = ref(null)
    const examDetails = ref(null)
    const questions = ref([])
    const answers = ref({})

    const applicationId = ref(null)
    const vacancyExamId = ref(null)
    const examId = ref(null)

    const examLoading = ref(false)
    const savingQuestionId = ref(null)
    const finishing = ref(false)

    const timeLeft = ref(0)
    const timerInterval = ref(null)
    const timeIsUp = ref(false)

    const activeQuestionIndex = ref(0)

    const answeredCount = computed(() => Object.keys(answers.value).length)
    const totalQuestions = computed(() => questions.value.length)
    const remainingCount = computed(() => totalQuestions.value - answeredCount.value)

    const formattedTime = computed(() => {
        const t = Math.max(0, timeLeft.value)
        const mm = Math.floor(t / 60).toString().padStart(2, '0')
        const ss = (t % 60).toString().padStart(2, '0')
        return `${mm}:${ss}`
    })

    const isAnswered = (questionId) => !!answers.value[questionId]

    const onStartTimer = () => {
        if(timerInterval.value) clearInterval(timerInterval.value)
        timerInterval.value = setInterval(() => {
            if(timeLeft.value > 0){
                timeLeft.value--
            } else {
                timeIsUp.value = true
                clearInterval(timerInterval.value)
                timerInterval.value = null
            }
        }, 1000)
    }

    const onStopTimer = () => {
        if(timerInterval.value) clearInterval(timerInterval.value)
        timerInterval.value = null
    }

    const applyExamResponse = (data) => {
        exam.value = data?.exam || null
        examDetails.value = data?.vacancy_exam_details || null
        questions.value = data?.questions || []
        vacancyExamId.value = data?.vacancy_exam_details?.id || null

        const answersInit = {}
        questions.value.forEach(q => {
            if(q.result) answersInit[q.id] = q.result
        })
        answers.value = answersInit

        if(exam.value?.minute){
            timeLeft.value = exam.value.minute * 60
            onStartTimer()
        }
    }

    const onStartExam = async (appId, eId) => {
        examLoading.value = true
        applicationId.value = appId
        examId.value = eId
        try {
            const res = await window.$ApiSerivce.vacancyService.startExam({
                applicationId: appId,
                examId: eId
            })
            applyExamResponse(res?.data?.data)
        } catch(err) {
            console.error('onStartExam error:', err)
        } finally {
            examLoading.value = false
        }
    }

    const onContinueExam = async (appId, vExamId) => {
        examLoading.value = true
        applicationId.value = appId
        vacancyExamId.value = vExamId
        try {
            const res = await window.$ApiSerivce.vacancyService.continueExam({
                applicationId: appId,
                vacancyExamId: vExamId,
            })
            const data = res?.data?.data
            applyExamResponse(data)
            if(data?.exam?.id) examId.value = data.exam.id
        } catch(err) {
            console.error('onContinueExam error:', err)
        } finally {
            examLoading.value = false
        }
    }

    const onSelectAnswer = async (questionId, answerId) => {
        const prev = answers.value[questionId]
        answers.value = {...answers.value, [questionId]: answerId}
        savingQuestionId.value = questionId
        try {
            await window.$ApiSerivce.vacancyService.sendExamResult({
                applicationId: applicationId.value,
                vacancyExamId: vacancyExamId.value,
                questionId: questionId,
                answerId: answerId,
            })
        } catch(err) {
            if(prev){
                answers.value = {...answers.value, [questionId]: prev}
            } else {
                const copy = {...answers.value}
                delete copy[questionId]
                answers.value = copy
            }
        } finally {
            savingQuestionId.value = null
        }
    }

    const finishResult = ref(null)

    const onFinishExam = async () => {
        finishing.value = true
        try {
            const res = await window.$ApiSerivce.vacancyService.finishExam({
                applicationId: applicationId.value,
                vacancyExamId: vacancyExamId.value,
                examId: examId.value,
            })
            finishResult.value = res?.data?.data || null
            onStopTimer()
            return true
        } catch(err) {
            return false
        } finally {
            finishing.value = false
        }
    }

    const onResetExam = () => {
        onStopTimer()
        exam.value = null
        examDetails.value = null
        questions.value = []
        answers.value = {}
        applicationId.value = null
        vacancyExamId.value = null
        examId.value = null
        timeLeft.value = 0
        timeIsUp.value = false
        activeQuestionIndex.value = 0
    }

    return {
        exam,
        examDetails,
        questions,
        answers,
        applicationId,
        vacancyExamId,
        examId,
        examLoading,
        savingQuestionId,
        finishing,
        timeLeft,
        timeIsUp,
        activeQuestionIndex,

        answeredCount,
        totalQuestions,
        remainingCount,
        formattedTime,

        isAnswered,
        onStartTimer,
        onStopTimer,
        onStartExam,
        onContinueExam,
        onSelectAnswer,
        onFinishExam,
        onResetExam,
        finishResult,
    }
})
