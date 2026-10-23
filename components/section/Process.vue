<script setup>
import IconUserEdit from "~/components/icon/UserEdit.vue"
import IconUserSearch from "~/components/icon/UserSearch.vue"
import IconHandout from "~/components/icon/Handout.vue"

const steps = [
  {
    title:'mainSection.registerAccount',
    text:'mainSection.guideAccount',
    icon:IconUserEdit,
    color:'text-primary bg-primary/12',
  },
  {
    title:'mainSection.applyJob',
    text:'mainSection.guideJob',
    icon:IconUserSearch,
    color:'text-warning bg-warning/15',
  },
  {
    title:'mainSection.createResume',
    text:'mainSection.guideResume',
    icon:IconHandout,
    color:'text-success bg-success/12',
  },
]
</script>

<template>
<section class="w-full bg-surface-section py-12 md:py-16 lg:py-24">
<UiPageContent>
  <UiSectionTitle :title="$t('mainSection.howItWorks')" :subtitle="$t('mainSection.howItWorksSub')"/>
  <div class="grid grid-cols-12 gap-6">
    <!-- Ustiga kelganda karta biroz yuqoriga ko'tariladi -->
    <div
        v-for="(item, index) in steps"
        :key="item.title"
        class="col-span-12 md:col-span-4 relative bg-surface-soft border border-surface-line rounded-xl p-5 sm:p-6
        transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card
        motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div class="flex items-center justify-between mb-4 sm:mb-6">
        <div :class="item.color" class="w-[60px] h-[60px] rounded-xl flex items-center justify-center">
          <n-icon size="34">
            <component :is="item.icon"/>
          </n-icon>
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
