<script setup>
import {Wallet24Regular, Location24Regular,Clock32Regular,
  DocumentBriefcase20Regular, CalendarLtr32Regular, Clock28Regular,
  ArrowForward24Filled,Eye16Filled,Person12Filled, } from "@vicons/fluent"
</script>

<template>
<div class="px-5 py-4 bg-surface-ground border border-surface-line rounded-xl
 mb-4 hover:bg-surface-section cursor-pointer hover:shadow-navbar transition-all duration-300">
  <h2 class="text-xl text-black-primary font-medium">Samarqand shaxri hokimligi</h2>
  <h2 class="text-xs text-black-tertiary mt-2 border-b border-surface-line pb-4">• Samarqand shahar hokimining mahalladagi hokim yordamchilari</h2>
  <h3 class="text-black-secondary mt-2 font-medium">Kaftarxona mahalla fuqarolar yig‘inida tadbirkorlikni rivojlantirish, aholi bandligini ta’minlash va kambag‘allikni qisqartirish masalalari bo‘yicha hokim yordamchisi</h3>
  <div class="grid grid-cols-12 mt-2 gap-2">
    <div class="col-span-6 flex item-center gap-x-2 font-medium">
        <n-icon size="18" class="text-primary">
          <Wallet24Regular/>
        </n-icon>
      6 825 000,00 UZS
    </div>
    <div class="col-span-6 flex item-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary">
        <Location24Regular/>
      </n-icon>
      Samarqand viloyati , Samarqand shahri
    </div>
    <div class="col-span-6 flex item-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary">
        <Clock32Regular/>
      </n-icon>
      To‘liq
    </div>
    <div class="col-span-6 flex item-center gap-x-2 font-medium">
      <n-icon size="18" class="text-primary">
        <DocumentBriefcase20Regular/>
      </n-icon>
      Kamida 3 yillik staj
    </div>
  </div>
  <div class="grid grid-cols-12 mt-6 border-t border-surface-line pt-2 text-black-tertiary">
    <div class="col-span-6 flex gap-1 items-center">
      <n-icon size="18">
        <CalendarLtr32Regular/>
      </n-icon>
      12 iyun 2025

      <n-icon size="18" class="ml-6">
        <Clock28Regular/>
      </n-icon>
      16 iyun 2025
    </div>
    <div class="col-span-6 flex justify-end gap-1">

      <n-icon size="18">
        <Person12Filled/>
      </n-icon>
      <span class="mr-4">134 nafar</span>
      <n-icon size="18">
        <Eye16Filled/>
      </n-icon>
      <span class="mr-4">134 ta</span>
      <n-icon size="18">
        <ArrowForward24Filled/>
      </n-icon>
    </div>
  </div>

</div>
</template>
