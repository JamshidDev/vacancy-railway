

<template>
<div class="grid gap-x-10 grid-cols-12 w-full mt-6">
  <div class="col-span-3">
      <div class="bg-primary/16 p-6 w-full rounded-lg ">
        <slot name="sidebar"></slot>
      </div>
  </div>
  <div class="col-span-9">
    <slot name="content"></slot>
  </div>
</div>
</template>