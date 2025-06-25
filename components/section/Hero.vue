<script setup>

</script>

<template>
  <div class="w-full bg-surface-ground relative overflow-hidden">
    <UiPageContent>
      <div class="grid grid-cols-12 min-h-[900px] h-screen">
        <div class="col-span-6 relative">
          <UiSearchArea/>
        </div>
        <div class="col-span-6 relative">
          <UiCircle/>
          <img class="absolute z-[2] bottom-0 right-[50px] h-[800px] animate-scale-xs" src="/woman.jpg" alt="hero-man not found" />
        </div>
      </div>
    </UiPageContent>
    <h3 class="animate-scale-xs text-9xl font-black absolute bottom-[4px] left-[50%] translate-x-[-50%] bg-clip-text text-transparent bg-gradient-to-t from-[10%] from-surface-ground to-primary/20">{{$t('mainSection.vacancy')}}</h3>
  </div>
</template>

<style scoped>

</style>