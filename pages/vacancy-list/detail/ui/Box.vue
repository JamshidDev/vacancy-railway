

<template>
<div class=" lg:flex w-full mt-6">
  <div class="md:w-full lg:w-[300px] xl:w-[400px] mb-10">
      <div class="bg-primary/16 p-6 w-full rounded-lg ">
        <slot name="sidebar"></slot>
      </div>
  </div>
  <div class="md:w-full lg:w-[calc(100%-300px)] xl:w-[calc(100%-400px)]  lg:pl-8">
    <slot name="content"></slot>
  </div>
</div>
</template>