<script setup>
import {CalendarLtr24Regular} from "@vicons/fluent"

// Sana kiritish: kk.oo.yyyy formatida qo'lda yozish (nuqtalar avtomatik qo'yiladi)
// yoki kalendardan tanlash. Qiymat - kunning boshi (timestamp, ms) yoki null.
const props = defineProps({
  value:{
    type:Number,
    default:null,
  },
  disabled:{
    type:Boolean,
    default:false,
  },
  clearable:{
    type:Boolean,
    default:true,
  },
})

const emit = defineEmits(['update:value'])

const text = ref('')
const calendarVisible = ref(false)

const pad = (v)=> String(v).padStart(2, '0')

const formatDate = (time)=>{
  if(time === null || time === undefined) return ''
  const d = new Date(time)
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
}

// To'liq va haqiqiy sana bo'lsa timestamp, aks holda null
const parseDate = (v)=>{
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(v || '')
  if(!match) return null
  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  if(year < 1900 || year > 2100) return null
  const d = new Date(year, month - 1, day)
  if(d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null
  return d.getTime()
}

const isInvalid = computed(()=> text.value.length === 10 && parseDate(text.value) === null)

watch(()=>props.value, (v)=>{
  // Foydalanuvchi yozayotgan matnni tashqi null qiymat bilan o'chirib yubormaslik
  if(parseDate(text.value) === (v ?? null)) return
  text.value = formatDate(v)
}, {immediate:true})

const onInput = (v)=>{
  text.value = v
  const parsed = parseDate(v)
  if(parsed !== (props.value ?? null)) emit('update:value', parsed)
}

const onPick = (v)=>{
  calendarVisible.value = false
  text.value = formatDate(v)
  emit('update:value', v)
}

const onToggleCalendar = ()=>{
  if(props.disabled) return
  calendarVisible.value = !calendarVisible.value
}
</script>

<template>
  <n-popover
      :show="calendarVisible"
      trigger="manual"
      placement="bottom-end"
      :show-arrow="false"
      raw
      class="!rounded-xl !shadow-card overflow-hidden"
      @clickoutside="calendarVisible = false"
  >
    <template #trigger>
      <n-input
          v-mask="'##.##.####'"
          class="w-full"
          :value="text"
          :disabled="disabled"
          :clearable="clearable"
          :status="isInvalid ? 'error' : undefined"
          :placeholder="$t('content.datePlaceholder')"
          inputmode="numeric"
          @update:value="onInput"
      >
        <template #suffix>
          <button
              type="button"
              :disabled="disabled"
              :aria-label="$t('content.openCalendar')"
              @click.stop="onToggleCalendar"
              class="flex items-center text-black-tertiary hover:text-primary cursor-pointer disabled:cursor-not-allowed"
          >
            <n-icon size="20">
              <CalendarLtr24Regular/>
            </n-icon>
          </button>
        </template>
      </n-input>
    </template>
    <n-date-picker
        panel
        type="date"
        :value="value"
        :actions="null"
        @update:value="onPick"
    />
  </n-popover>
</template>
