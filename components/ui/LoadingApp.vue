
<template>
<div
    v-if="false"
    class="fixed w-full h-full z-[999] top-0 left-0 bottom-0 right-0 bg-surface-section
    flex justify-center items-center
">
    <div class="flex items-center">
      <img class="w-[200px] logo-animation" src="/logo-2.png" alt="logo" />
      <div class="overflow-hidden relative w-[336px] h-[98px]">
        <div class="absolute top-[-400px] opacity-[0] text-animation flex flex-col text-[10px] text-[#b4a003] uppercase font-semibold">
          <span class="text-2xl text-nowrap text-center">O'zbekiston temir yo'llari</span>
          <span class="text-2xl text-nowrap text-left ">Aksiyadorlik jamiyati</span>
          <span class="text-2xl text-nowrap text-left">Vakant lavozimlari</span>
        </div>
      </div>

    </div>
</div>
</template>

<style scoped>
.logo-animation {
  animation: logo-frame 6s ease-in-out infinite;
}
.text-animation {
  animation: text-frame 6s linear infinite;
}

@keyframes logo-frame {
    0%{
       transform: scale(0.1);
     }
   50%{
      transform: scale(1);
    }
  90%{
    transform: scale(1);
  }
  100%{
    transform: scale(0.1);
  }
}

@keyframes text-frame {
  30%{
    top: -400px;
    opacity: 0;
  }
  50%{
    top:0px;
    opacity: 1;
  }
  90%{
    top:0px;
    opacity: 1;
  }
  100%{
    top: -400px;
    opacity: 0;
  }
}
</style>
