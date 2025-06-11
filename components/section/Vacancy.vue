<script setup lang="ts">

</script>

<template>
<div class="w-full bg-surface-ground h-screen">
  <UiPageContent>
    <h3 class="text-4xl font-semibold text-black-primary text-center mt-16">Yangi vakansiyalar</h3>
    <small class="text-black-secondary text-center mt-4 text-[14px] mb-6">Imkoniyatni qo‘ldan boy bermang</small>


    <template v-for="item in 6">
      <div class="w-full relative max-w-[800px] h-[100px] mx-auto bg-surface-section border border-surface-line rounded-lg px-4 py-2 mb-6">
        <div class="absolute top-[10px] p-6 bg-surface-section border border-surface-line rounded-2xl shadow-navbar">
          <IconBuild class="fill-success"/>
        </div>
      </div>
    </template>


  </UiPageContent>

</div>
</template>

<style scoped>

</style>