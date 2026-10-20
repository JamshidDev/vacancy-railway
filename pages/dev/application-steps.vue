<script setup>
// Faqat dev rejimi uchun: ariza yuborilgandan keyingi bosqichlarni test (mock) ma'lumot bilan ko'rsatadi
import {useVacancyStore} from "../../store/index.js"

definePageMeta({
  layout:false,
  middleware:[
    ()=> { if(!import.meta.dev) return navigateTo('/') },
  ],
})

const store = useVacancyStore()
const visible = ref(false)

const base = {
  id: 999001,
  number: 'A-2026-000123',
  status: {id: 1, name: "Jarayonda"},
  vacancy_position: {
    id: 1,
    position: {name: "Lokomotiv mashinisti yordamchisi"},
    department: {name: "Toshkent lokomotiv deposi"},
    organization: {name: "O'zbekiston temir yo'llari AJ"},
  },
}

const st = (id) => ({
  1: {id: 1, name: "Jarayonda"},
  2: {id: 2, name: "Qabul qilindi"},
  3: {id: 3, name: "Rad etildi"},
}[id])

const scenarios = {
  // Barcha bosqichlar, imtihon hali boshlanmagan
  examNotStarted: {
    label: "Imtihon boshlanmagan",
    statuses: [
      {id: 1, type: {id: 1}, status: st(2), details: {number: 'A-2026-000123', created: '2026-10-01 09:15:00'}},
      {id: 2, type: {id: 2}, status: st(2), details: {
        0: {file_type: 1, status: 2},
        1: {file_type: 2, status: 2},
        2: {file_type: 3, status: 1},
      }},
      {id: 3, type: {id: 3}, status: st(2), message: "Suhbat 2026-10-10 soat 14:00 da bo'ladi.", details: {
        zoom: {meet_id: '845 1234 5678', meet_uuid: 'mock-uuid', join_url: 'https://zoom.us/j/84512345678'},
      }},
      {id: 4, type: {id: 4}, status: st(2), details: {}},
      {id: 5, type: {id: 5}, status: st(1), details: {
        exams: {exam_name: "Kasbiy bilim testi", exam_type: 0, status: 1, created: null, ended: null, result: null, vacancy_application_exam: 1},
      }},
    ],
  },
  examInProgress: {
    label: "Imtihon davom etmoqda",
    statuses: [
      {id: 1, type: {id: 1}, status: st(2), details: {number: 'A-2026-000123', created: '2026-10-01 09:15:00'}},
      {id: 5, type: {id: 5}, status: st(1), details: {
        exams: {id: 77, exam_name: "Kasbiy bilim testi", exam_type: 0, status: 1, created: '2026-10-20 10:00:00', ended: null, result: null, vacancy_application_exam: 1},
      }},
    ],
  },
  examFinished: {
    label: "Imtihon tugagan (natija)",
    status: st(2),
    statuses: [
      {id: 1, type: {id: 1}, status: st(2), details: {number: 'A-2026-000123', created: '2026-10-01 09:15:00'}},
      {id: 5, type: {id: 5}, status: st(2), details: {
        exams: {id: 77, exam_name: "Kasbiy bilim testi", exam_type: 0, status: 1, created: '2026-10-20 10:00:00', ended: '2026-10-20 10:27:00', result: 86, vacancy_application_exam: 1},
      }},
    ],
  },
  examNotActive: {
    label: "Imtihon faol emas",
    statuses: [
      {id: 5, type: {id: 5}, status: st(1), details: {
        exams: {exam_name: "Kasbiy bilim testi", exam_type: 0, status: 0},
      }},
    ],
  },
  examOffline: {
    label: "Offlayn imtihon",
    statuses: [
      {id: 5, type: {id: 5}, status: st(2), details: {
        exams: {exam_name: "Amaliy sinov", exam_type: 1, created: '2026-10-15 09:00:00', ended: '2026-10-15 11:00:00', result: 92},
      }},
    ],
  },
  rejected: {
    label: "Hujjatlar rad etilgan",
    status: st(3),
    statuses: [
      {id: 1, type: {id: 1}, status: st(2), details: {number: 'A-2026-000123', created: '2026-10-01 09:15:00'}},
      {id: 2, type: {id: 2}, status: st(3), message: "Diplom nusxasi o'qib bo'lmaydigan holatda yuklangan.", details: {
        0: {file_type: 1, status: 2},
        1: {file_type: 2, status: 3},
      }},
    ],
  },
}

const onShow = (key) => {
  const s = scenarios[key]
  store.applicationDetailLoading = false
  store.applicationDetail = {...base, status: s.status || base.status, statuses: s.statuses}
  visible.value = true
}

const onShowLoading = () => {
  store.applicationDetail = null
  store.applicationDetailLoading = true
  visible.value = true
}
</script>

<template>
  <div class="min-h-screen bg-surface-ground p-4 sm:p-8">
    <div class="max-w-xl mx-auto flex flex-col gap-3">
      <h1 class="text-lg font-bold text-black-primary">Ariza bosqichlari — test ko'rinishi</h1>
      <p class="text-xs text-black-tertiary">
        Mock ma'lumot. "Boshlash" / "Qo'shilish" tugmalari haqiqiy API'ga so'rov yuboradi va xato qaytarishi mumkin.
      </p>
      <n-button v-for="(s, key) in scenarios" :key="key" @click="onShow(key)" secondary type="primary">
        {{ s.label }}
      </n-button>
      <n-button @click="onShowLoading" secondary>Yuklanish holati</n-button>
    </div>
    <UiApplicationDetailsModal v-model:visible="visible" />
  </div>
</template>
