<script setup>
defineProps({
  title:{
    type:String,
    default:'',
  },
  subtitle:{
    type:String,
    default:'',
  },
})
</script>

<template>
<div class="flex flex-wrap items-end justify-between gap-4 mb-8">
  <div>
    <h2 class="text-black-primary text-[26px] md:text-[34px] font-bold uppercase leading-[1.2]">{{title}}</h2>
    <p v-if="subtitle" class="text-black-tertiary mt-1 md:text-lg">{{subtitle}}</p>
  </div>
  <slot name="right"></slot>
</div>
</template>
