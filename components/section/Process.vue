<script setup>
const steps = [
  {
    title:'mainSection.registerAccount',
    text:'mainSection.guideAccount',
    image:'/note.png',
  },
  {
    title:'mainSection.applyJob',
    text:'mainSection.guideJob',
    image:'/apply.png',
  },
  {
    title:'mainSection.createResume',
    text:'mainSection.guideResume',
    image:'/resume.png',
  },
]
</script>

<template>
<section class="w-full bg-surface-section py-12 md:py-16 lg:py-24">
<UiPageContent>
  <UiSectionTitle :title="$t('mainSection.howItWorks')" :subtitle="$t('mainSection.howItWorksSub')"/>
  <div class="grid grid-cols-12 gap-6">
    <div
        v-for="(item, index) in steps"
        :key="item.title"
        class="col-span-12 md:col-span-4 relative bg-surface-soft border border-surface-line rounded-xl p-5 sm:p-6 hover:shadow-card transition-shadow duration-300">
      <div class="flex items-center justify-between mb-4 sm:mb-6">
        <div class="w-[60px] h-[60px] bg-surface-section rounded-lg shadow-navbar flex items-center justify-center p-3">
          <img :src="item.image" alt="step icon" class="max-w-full max-h-full" />
        </div>
        <span class="text-5xl font-black text-primary/15">0{{index + 1}}</span>
      </div>
      <h3 class="text-lg sm:text-xl font-bold text-black-primary">{{$t(item.title)}}</h3>
      <p class="text-black-tertiary mt-2">{{$t(item.text)}}</p>
    </div>
  </div>
</UiPageContent>
</section>
</template>
