<script setup>
import Banner from "~/pages/profile/ui/Banner.vue"
import Cards from "~/pages/profile/ui/Cards.vue"
import Tabs from "~/pages/profile/ui/Tabs.vue"
import Footer from "../../components/section/Footer.vue"

definePageMeta({
  layout:"admin-layout",
  breadcrumb:"Profile",
  middleware:'auth',
})

</script>

<template>
  <div class="w-full bg-surface-ground min-h-screen">
    <UiPageContent>
      <Banner/>
      <Cards/>
      <Tabs/>
    </UiPageContent>
    <Footer class="mt-16"/>
  </div>

</template>
