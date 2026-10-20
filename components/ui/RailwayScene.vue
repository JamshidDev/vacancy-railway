<script setup>
// Hero pastidagi temir yo'l manzarasi: kontakt tarmog'i, relslar va tezyurar poyezd
const poles = [80, 400, 720, 1040, 1360]
const sleepers = Array.from({length: 66}, (_, i) => i * 22)
const wagons = [906, 1092, 1278]
const wagonWindows = Array.from({length: 5}, (_, i) => 18 + i * 32)
</script>

<template>
<svg
    class="w-full h-full"
    viewBox="0 0 1440 260"
    preserveAspectRatio="xMaxYMax slice"
    aria-hidden="true"
>
  <!-- Kontakt tarmog'i -->
  <g fill="#CFD9EE" stroke="#CFD9EE">
    <rect v-for="x in poles" :key="`pole-${x}`" :x="x - 2" y="70" width="4" height="146" stroke="none"/>
    <path v-for="x in poles" :key="`arm-${x}`" :d="`M${x} 84 H${x + 34}`" stroke-width="3" fill="none"/>
    <path
        d="M80 90 Q240 104 400 90 Q560 104 720 90 Q880 104 1040 90 Q1200 104 1360 90 Q1420 98 1440 96"
        stroke-width="1.5"
        fill="none"
    />
    <path d="M0 116 H1440" stroke-width="1.2" fill="none"/>
  </g>

  <!-- Yo'l to'shamasi, shpallar va rels -->
  <path d="M0 214 H1440 V232 H0 Z" fill="#E3E9F6"/>
  <rect v-for="x in sleepers" :key="`sl-${x}`" :x="x" y="215" width="12" height="7" rx="1" fill="#D3DCEF"/>
  <rect x="0" y="210" width="1440" height="4" fill="#BFCBE5"/>

  <!-- Poyezd -->
  <g class="railway-train">
    <!-- Pantograf -->
    <path d="M846 132 L866 118 L842 118 M866 118 L880 118" stroke="#BFCBE5" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Lokomotiv -->
    <path d="M700 206 V172 Q702 140 768 134 L900 132 V206 Z" fill="#D6E0F3"/>
    <path d="M714 166 Q720 148 764 143 L796 142 V166 Z" fill="#3165CB" fill-opacity=".18"/>
    <rect v-for="i in 3" :key="`lw-${i}`" :x="806 + (i - 1) * 30" y="146" width="20" height="18" rx="4" fill="#F3F5FB"/>

    <!-- Vagonlar -->
    <g v-for="x in wagons" :key="`wg-${x}`">
      <rect :x="x" y="132" width="180" height="74" rx="8" fill="#D6E0F3"/>
      <rect v-for="w in wagonWindows" :key="`ww-${x}-${w}`" :x="x + w" y="146" width="22" height="18" rx="4" fill="#F3F5FB"/>
      <path :d="`M${x + 172} 140 V200`" stroke="#C5D1EA" stroke-width="2"/>
    </g>

    <!-- Brend chizig'i -->
    <rect x="704" y="182" width="740" height="6" fill="#3165CB" fill-opacity=".35"/>

    <!-- Aravachalar -->
    <g fill="#B9C6E2">
      <circle v-for="x in [740, 770, 860, 890, 940, 970, 1050, 1080, 1126, 1156, 1236, 1266, 1312, 1342, 1422]" :key="`wh-${x}`" :cx="x" cy="206" r="6"/>
    </g>
  </g>
</svg>
</template>

<style scoped>
.railway-train {
  animation: train-arrive 1.8s cubic-bezier(.22, .9, .3, 1) both;
}

@keyframes train-arrive {
  from {
    transform: translateX(160px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .railway-train {
    animation: none;
  }
}
</style>
