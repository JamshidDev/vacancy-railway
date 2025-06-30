<script setup>
import {Info24Filled, Print20Regular, DrawerArrowDownload20Regular, ArrowSync16Filled} from "@vicons/fluent"
</script>

<template>
<div class="w-full grid grid-cols-12 pt-[160px]">
  <div class="col-span-6">
    <h3 class="font-semibold text-xl">RAXIMOV JAMSHID SHUXRAT O‘G‘LI</h3>
  </div>
  <div class="col-span-6">
    <div class="flex justify-end gap-4">
      <n-button type="primary" ghost size="large">
        Ma'lumotlarni yangilash
        <template #icon>
          <n-icon size="26">
            <ArrowSync16Filled/>
          </n-icon>
        </template>
      </n-button>
      <n-button type="warning" secondary size="large">
        <template #icon>
          <n-icon size="26">
            <Info24Filled/>
          </n-icon>
        </template>
      </n-button>
      <n-button type="success" secondary size="large">
        <template #icon>
          <n-icon size="26">
            <Print20Regular/>
          </n-icon>
        </template>
      </n-button>
      <n-button type="primary" secondary size="large">
        <template #icon>
          <n-icon size="26">
            <DrawerArrowDownload20Regular/>
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
  <div class="col-span-6 flex mt-8">
    <img
        class="w-[150px] h-[160px]"
        :src="appSetting.defaultAvatar" alt="avatar picture">
    <div class="w-[calc(100%-150px)] pl-10">
      <p class="text-black-tertiary mb-2">JSHSHIR: <span class="text-black-secondary font-semibold">50207007170030</span></p>
      <p class="text-black-tertiary mb-2">Tug‘ilgan sanasi: <span class="text-black-secondary font-semibold"> 2000.07.02</span></p>
      <p class="text-black-tertiary mb-2">Tug‘ilgan joyi:<span class="text-black-secondary font-semibold"> SHOVOT TUMANI </span></p>
    </div>
  </div>
  <div class="col-span-6 flex mt-8">
    <div>
      <p class="text-black-tertiary mb-2">Telefon raqami:<span class="text-black-secondary font-semibold">+998977716004 </span></p>
      <p class="text-black-tertiary mb-2">Elektron pochtasi:<span class="text-black-secondary font-semibold"> </span></p>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>