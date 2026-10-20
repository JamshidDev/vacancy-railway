

<template>
<div class="lg:flex w-full mb-10">
  <div class="md:w-full lg:w-[320px] xl:w-[380px] mb-10 shrink-0">
      <div class="bg-surface-ground p-6 w-full rounded-xl lg:sticky lg:top-[112px]">
        <slot name="sidebar"></slot>
      </div>
  </div>
  <div class="md:w-full lg:w-[calc(100%-300px)] xl:w-[calc(100%-400px)]  lg:pl-8">
    <slot name="content"></slot>
  </div>
</div>
</template>