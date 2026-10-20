<script setup>
import {Location20Regular, Clock20Regular, Call20Regular} from "@vicons/fluent"
const localePath = useLocalePath()

const navigations = [
  {name:'mainSection.name', path:'/'},
  {name:'vacancy.name', path:'/vacancy-list'},
]
</script>

<template>
<footer class="w-full bg-gradient-to-b from-surface-ground to-[var(--surface-footer)]">
  <UiPageContent>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-8 border-b border-black-tertiary/20">
      <UiLogo/>
      <nav class="flex flex-wrap gap-x-8 gap-y-3">
        <a
            v-for="item in navigations"
            :key="item.path"
            :href="localePath(item.path)"
            @click.prevent="navigateTo(localePath(item.path))"
            class="uppercase font-semibold text-black-primary hover:text-primary transition-colors"
        >{{$t(item.name)}}</a>
      </nav>
    </div>

    <div class="grid grid-cols-12 gap-6 py-8">
      <div class="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-3">
        <div class="flex items-start gap-3">
          <n-icon size="20" class="text-primary mt-[2px] shrink-0">
            <Location20Regular/>
          </n-icon>
          <span class="text-black-primary">{{ $t('footer.address') }}</span>
        </div>
        <div class="flex items-center gap-3">
          <n-icon size="20" class="text-primary shrink-0">
            <Call20Regular/>
          </n-icon>
          <span class="text-black-primary">{{ $t('footer.phone') }}: <a href="tel:1005" class="font-semibold hover:text-primary">1005</a></span>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-4 flex items-start gap-3">
        <n-icon size="20" class="text-primary mt-[2px] shrink-0">
          <Clock20Regular/>
        </n-icon>
        <span class="text-black-primary">{{ $t('footer.lastUpdated') }}: 10.04.2026 15:30:00</span>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <p class="text-black-tertiary text-sm">
          {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </UiPageContent>
  <div class="w-full border-t border-black-tertiary/20 pt-4 pb-14 lg:pb-4">
    <UiPageContent>
      <div class="flex flex-col sm:flex-row justify-between gap-2 text-sm text-black-secondary">
        <span>© vacancy.railway.uz</span>
        <span>
          {{ $t('footer.developedBy') }}: <span class="text-primary font-semibold">dasuty.com</span>
        </span>
      </div>
    </UiPageContent>
  </div>
</footer>
</template>
