<script setup>
// Sonni 0 dan (yoki oldingi qiymatdan) yangi qiymatgacha sanab chiqaradi.
// Davomiylik son kattaligiga bog'liq emas: 8 ham, 80 000 ham bir xil vaqtda tugaydi.
const props = defineProps({
  value: {type: Number, default: 0},
  duration: {type: Number, default: 1200},
})

const shown = ref(0)
let frame = null

const formatCount = (v)=> Math.round(v).toLocaleString('ru-RU')

// Boshida tez, oxirida sekinlashadi
const easeOutCubic = (t)=> 1 - Math.pow(1 - t, 3)

const animateTo = (target)=>{
  cancelAnimationFrame(frame)
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if(reduceMotion || !target){
    shown.value = target || 0
    return
  }
  const from = shown.value
  const start = performance.now()
  const step = (now)=>{
    const t = Math.min((now - start) / props.duration, 1)
    shown.value = from + (target - from) * easeOutCubic(t)
    if(t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

watch(()=>props.value, (v)=> animateTo(Number(v) || 0))

onMounted(()=> animateTo(Number(props.value) || 0))
onBeforeUnmount(()=> cancelAnimationFrame(frame))
</script>

<template>
  <span class="tabular-nums">{{formatCount(shown)}}</span>
</template>
