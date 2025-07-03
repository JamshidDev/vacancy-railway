<script setup>

</script>

<template>
<div class="w-full bg-surface-section">
<UiPageContent>
  <div class="grid grid-cols-12 pt-[100px] xl:mx-[100px] lg:mx-[50px]">
    <div class="col-span-12 lg:flex justify-center">
      <div class="lg:w-[360px] relative pt-[60px] pl-[80px] mb-10 lg:mb-0">
        <div class="absolute z-10 left-[0px] top-[0px] text-6xl uppercase font-black text-black-tertiary/20">
          01
        </div>
        <div class="relative leading-[1.2] bg-[#3898E2] p-4 rounded-2xl text-lg text-white pl-[100px]">
          {{$t('mainSection.registerAccount')}}
          <div class="bg-white shadow-navbar absolute top-[20px] left-[-20px] rounded-lg p-4">
            <img src="/note.png" alt=".." />
          </div>
        </div>
        <div class="mt-14 text-black-secondary">
          {{$t('mainSection.guideAccount')}}
        </div>
      </div>
      <div class="lg:w-[360px] relative pt-[60px] pl-[80px] mx-4 mb-10 lg:mb-0">
        <div class="absolute z-10 left-[0px] top-[0px] text-6xl uppercase font-black text-black-tertiary/20">
          02
        </div>
        <div class="relative leading-[1.2] bg-[#BC84CA] p-4 rounded-2xl text-lg text-white pl-[100px]">
          {{$t('mainSection.applyJob')}}
          <div class="bg-white shadow-navbar absolute top-[20px] left-[-20px] rounded-lg p-4">
            <img src="/apply.png" alt=".." />
          </div>
        </div>
        <div class="mt-14 text-black-secondary">
          {{$t('mainSection.guideJob')}}
        </div>
      </div>
      <div class="lg:w-[360px] relative pt-[60px] pl-[80px] mb-10 lg:mb-0">
        <div class="absolute z-10 left-[0px] top-[0px] text-6xl uppercase font-black text-black-tertiary/20">
          03
        </div>
        <div class="relative leading-[1.2] bg-[#56D8B1] p-4 rounded-2xl text-lg text-white pl-[100px]">
          {{$t('mainSection.createResume')}}
          <div class="bg-white shadow-navbar absolute top-[20px] left-[-20px] rounded-lg p-4">
            <img src="/resume.png" alt=".." />
          </div>
        </div>
        <div class="mt-14 text-black-secondary">
          {{$t('mainSection.guideResume')}}
        </div>
      </div>
    </div>

  </div>
</UiPageContent>
</div>
</template>
