<script setup>
import { Home24Regular, ArrowLeft24Regular } from "@vicons/fluent"

const props = defineProps({
  error: Object
})

const { t } = useI18n()
const localePath = useLocalePath()

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() => {
  return is404.value ? t('error.notFound') : t('error.serverError')
})

const description = computed(() => {
  return is404.value ? t('error.notFoundDesc') : t('error.serverErrorDesc')
})

const handleError = () => {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="min-h-screen bg-surface-section flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <!-- Error Code -->
      <div class="mb-6">
        <span class="text-[120px] sm:text-[160px] font-bold text-primary/20 leading-none">
          {{ error?.statusCode || 500 }}
        </span>
      </div>

      <!-- Error Title -->
      <h1 class="text-2xl sm:text-3xl font-bold text-black-primary mb-4">
        {{ title }}
      </h1>

      <!-- Error Description -->
      <p class="text-black-tertiary mb-8 text-sm sm:text-base">
        {{ description }}
      </p>

      <!-- Back to Home Button -->
      <n-button
        type="primary"
        size="large"
        @click="handleError"
        class="min-w-[200px]"
      >
        <template #icon>
          <n-icon size="20">
            <Home24Regular />
          </n-icon>
        </template>
        {{ $t('error.backHome') }}
      </n-button>

      <!-- Additional info for dev -->
      <div v-if="error?.message && error?.statusCode !== 404" class="mt-8 p-4 bg-surface-ground rounded-lg text-left">
        <p class="text-xs text-black-tertiary break-words">
          {{ error.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
