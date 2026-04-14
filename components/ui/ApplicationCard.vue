<script setup>
import {
  Wallet24Regular,
  Location24Regular,
  Clock32Regular,
  DocumentBriefcase20Regular,
  CalendarLtr32Regular,
  Location16Filled,
  Info16Regular
} from "@vicons/fluent"

const router = useRouter()
const props = defineProps({
  data:{
    type: Object,
    default:null,
  }
})

const emit = defineEmits(['showMessage'])

const vacancy = computed(() => props.data?.vacancy_position)

const statusType = computed(() => {
  const statusId = props.data?.status?.id
  if (statusId === 2) return 'success' // Qabul qilindi
  if (statusId === 3) return 'error'   // Bekor qilindi
  return 'warning' // Jarayonda
})

const hasMessage = computed(() => {
  return props.data?.status?.id !== 1 && props.data?.messages?.length > 0
})

const onShowMessage = (e) => {
  e.stopPropagation()
  emit('showMessage', props.data)
}
</script>

<template>
<div
    @click="router.push({path:'/vacancy-list/detail', query:{id:vacancy?.id}})"
    class="px-4 sm:px-5 py-4 bg-surface-ground border border-surface-line rounded-xl
 mb-4 hover:bg-surface-section cursor-pointer hover:shadow-navbar transition-all duration-300">
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
    <h2 class="text-base sm:text-xl text-black-primary font-bold order-2 sm:order-1">{{vacancy?.position?.name}}</h2>
    <div class="flex items-center gap-2 self-start order-1 sm:order-2">
      <n-tag :type="statusType" size="small" round>
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
          <n-icon size="14">
            <Info16Regular/>
          </n-icon>
        </template>
        {{ $t('content.viewMessage') }}
      </n-button>
    </div>
  </div>
  <h2 class="text-xs text-black-tertiary mt-2 border-b border-surface-line pb-4 flex items-center gap-1">
    <n-icon size="14" class="text-primary flex-shrink-0">
      <Location16Filled/>
    </n-icon>
    <span class="line-clamp-1">{{vacancy?.department?.name}}</span>
  </h2>
  <h3 class="text-black-secondary mt-2 font-medium text-sm sm:text-base line-clamp-2">{{vacancy?.organization?.name}}</h3>
  <div class="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-2 text-sm sm:text-base">
    <div class="flex items-center gap-x-2 font-medium">
        <n-icon size="18" class="text-primary flex-shrink-0">
          <Wallet24Regular/>
        </n-icon>
      <span class="line-clamp-1">{{utils.formattedMoney(vacancy?.salary)}} {{$t('content.sum')}}</span>
    </div>
    <div class="flex items-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary flex-shrink-0">
        <Location24Regular/>
      </n-icon>
      <span class="line-clamp-1">{{vacancy?.city?.region?.name}}, {{vacancy?.city?.name}}</span>
    </div>
    <div class="flex items-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary flex-shrink-0">
        <Clock32Regular/>
      </n-icon>
      <span class="line-clamp-1">{{vacancy?.work_type?.name}}</span>
    </div>
    <div class="flex items-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary flex-shrink-0">
        <DocumentBriefcase20Regular/>
      </n-icon>
      <span class="line-clamp-1">{{(vacancy?.experience ? $t('vacancy.minWorkExperience', {n:vacancy?.experience}) : $t('vacancy.noExperience'))}}</span>
    </div>
  </div>
  <div class="mt-4 sm:mt-6 border-t border-surface-line pt-2 text-black-tertiary">
    <div class="flex gap-1 items-center text-sm">
      <n-icon size="18" class="flex-shrink-0">
        <CalendarLtr32Regular/>
      </n-icon>
      <span>{{ $t('detail.sentApply') }}: {{utils.formattedDate(data?.created_at)}}</span>
    </div>
  </div>
</div>
</template>
