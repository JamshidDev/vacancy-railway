

<template>
<div class="flex flex-col lg:flex-row w-full mb-10 pb-20 lg:pb-0">
  <div class="order-2 lg:order-1 w-full lg:w-[320px] xl:w-[380px] mt-10 lg:mt-0 shrink-0">
      <div class="bg-surface-ground p-5 sm:p-6 w-full rounded-xl lg:sticky lg:top-[112px]">
        <slot name="sidebar"></slot>
      </div>
  </div>
  <div class="order-1 lg:order-2 w-full lg:flex-1 min-w-0 lg:pl-8">
    <slot name="content"></slot>
  </div>
</div>
</template>
