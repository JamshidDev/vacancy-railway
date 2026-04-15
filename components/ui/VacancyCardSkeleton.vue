<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 3
  }
})
</script>

<template>
  <div
    v-for="i in count"
    :key="i"
    class="px-5 py-4 bg-surface-ground border border-surface-line rounded-xl mb-4"
  >
    <!-- Title -->
    <div class="h-6 w-3/4 skeleton-box rounded"></div>

    <!-- Location subtitle -->
    <div class="flex items-center gap-1 mt-2 border-b border-surface-line pb-4">
      <div class="h-4 w-4 skeleton-box rounded"></div>
      <div class="h-3 w-1/2 skeleton-box rounded"></div>
    </div>

    <!-- Organization -->
    <div class="h-5 w-2/3 skeleton-box rounded mt-2"></div>

    <!-- Info grid -->
    <div class="grid grid-cols-12 mt-2 gap-2">
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-2">
        <div class="h-4 w-4 skeleton-box rounded"></div>
        <div class="h-4 w-24 skeleton-box rounded"></div>
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-2">
        <div class="h-4 w-4 skeleton-box rounded"></div>
        <div class="h-4 w-32 skeleton-box rounded"></div>
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-2">
        <div class="h-4 w-4 skeleton-box rounded"></div>
        <div class="h-4 w-20 skeleton-box rounded"></div>
      </div>
      <div class="col-span-12 md:col-span-6 flex items-center gap-x-2">
        <div class="h-4 w-4 skeleton-box rounded"></div>
        <div class="h-4 w-28 skeleton-box rounded"></div>
      </div>
    </div>

    <!-- Footer -->
    <div class="grid grid-cols-12 mt-6 border-t border-surface-line pt-2">
      <div class="col-span-12 sm:col-span-6 flex gap-2 items-center">
        <div class="h-4 w-4 skeleton-box rounded"></div>
        <div class="h-4 w-20 skeleton-box rounded"></div>
        <div class="h-4 w-4 skeleton-box rounded ml-4"></div>
        <div class="h-4 w-20 skeleton-box rounded"></div>
      </div>
      <div class="col-span-12 sm:col-span-6 flex sm:justify-end gap-2 mt-4 sm:mt-0">
        <div class="h-4 w-16 skeleton-box rounded"></div>
        <div class="h-4 w-12 skeleton-box rounded"></div>
        <div class="h-4 w-4 skeleton-box rounded"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-box {
  background: linear-gradient(
    90deg,
    #e5e7eb 0%,
    #f3f4f6 50%,
    #e5e7eb 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
