<script setup>
import {Map24Regular, Clock28Regular, Call24Regular} from "@vicons/fluent"
</script>

<template>
<div class="w-full bg-[url('/footer.png')] xl:bg-size-[100%_260px]  bg-no-repeat bg-bottom
relative after:content-[' '] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-primary/12 z-[1]
">
  <UiPageContent>
   <div class="grid grid-cols-12 relative pt-10 mb-10">
    <div class="col-span-12 border-b border-surface-line px-[80px] pb-4 mb-6">
      <UiLogo/>
    </div>
     <div class="col-span-4 px-4">
       <div class="flex items-center py-1">
         <n-icon size="20" class="text-primary">
           <Map24Regular/>
         </n-icon>
         <span class="pl-4 text-black-secondary font-semibold">O‘zbekiston Respublikasi, Toshkent, 100060, Т. Shevchenko ko‘chasi, 7</span>
       </div>
       <div class="flex items-center py-1">
         <n-icon size="20" class="text-primary">
           <Call24Regular/>
         </n-icon>
         <span class="pl-4 text-black-secondary font-semibold">1005</span>
       </div>
       <div class="flex items-center py-1">
         <n-icon size="20" class="text-primary">
           <Clock28Regular/>
         </n-icon>
         <span class="pl-4 text-black-secondary font-semibold">Oxirgi yangilangan vaqt: 12.06.2025 02:43:26</span>
       </div>
     </div>
     <div class="col-span-4 px-4">
       <span class="text-black-tertiary text-xs">
         Portalda e'lon qilingan materiallardan nusxa ko‘chirish, tarqatish va boshqa shakllarda foydalanish faqat yozma rozilik bilan amalga oshirilishi mumkin.
       </span>

     </div>
     <div class="col-span-4 px-4">
       <div class="flex items-center py-1">
         <n-icon size="20" class="text-primary">
           <Map24Regular/>
         </n-icon>
         <span class="pl-4 text-black-secondary font-semibold">O‘zbekiston Respublikasi, Toshkent, 100060, Т. Shevchenko ko‘chasi, 7</span>
       </div>
       <div class="flex items-center py-1">
         <n-icon size="20" class="text-primary">
           <Call24Regular/>
         </n-icon>
         <span class="pl-4 text-black-secondary font-semibold">1005</span>
       </div>
       <div class="flex items-center py-1">
         <n-icon size="20" class="text-primary">
           <Clock28Regular/>
         </n-icon>
         <span class="pl-4 text-black-secondary font-semibold">Oxirgi yangilangan vaqt: 12.06.2025 02:43:26</span>
       </div>
     </div>
   </div>
  </UiPageContent>
  <div class="w-full border-t border-surface-line py-4">
    <UiPageContent>
      <div class="grid grid-cols-12 ">
        <div class="col-span-6">
          <span>vacancy.railway.uz</span>
        </div>
        <div class="col-span-6 flex justify-end">
          Developed by: <span class="text-primary">dasuty.com</span>
        </div>
      </div>
    </UiPageContent>
  </div>


</div>
</template>

<style scoped>

</style>