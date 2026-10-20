<script setup>
import {CheckmarkCircle20Filled, DismissCircle20Filled, Clock20Filled} from "@vicons/fluent"

// Ariza va bosqich holatlari uchun yagona belgi: success | error | warning | default
const props = defineProps({
  type:{
    type:String,
    default:'warning',
  },
  label:{
    type:String,
    default:'',
  },
  size:{
    type:String,
    default:'medium', // small | medium
  },
})

const styles = {
  success:'bg-success/12 text-success border-success/30',
  error:'bg-error/10 text-error border-error/30',
  warning:'bg-warning/15 text-brown border-warning/40',
  default:'bg-surface-ground text-black-secondary border-surface-line',
}

const icons = {
  success:CheckmarkCircle20Filled,
  error:DismissCircle20Filled,
  warning:Clock20Filled,
}
</script>

<template>
<span
    :class="[styles[type] || styles.default, size === 'small' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-2.5 py-1 gap-1.5']"
    class="inline-flex items-center rounded-full border font-semibold whitespace-nowrap leading-none">
  <n-icon v-if="icons[type]" :size="size === 'small' ? 13 : 15">
    <component :is="icons[type]"/>
  </n-icon>
  {{label}}
</span>
</template>
