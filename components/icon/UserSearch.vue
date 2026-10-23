<template>
  <!-- Galstukli odam va lupa (ish qidirish). Rangi currentColor dan olinadi. -->
  <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="icon-user-search-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <rect width="32" height="32" fill="#fff"/>
        <path d="M12.4 17.5h3.2l-.6 2 1.5 5.5-2.5 2.2-2.5-2.2 1.5-5.5z" fill="#000"/>
        <circle cx="24" cy="22" r="7.6" fill="#000"/>
      </mask>
    </defs>
    <ellipse cx="14" cy="9.5" rx="6.5" ry="7.5"/>
    <path d="M1.5 28C2 21 7 17.5 14 17.5S26 21 26.5 28z" mask="url(#icon-user-search-mask)"/>
    <circle cx="24" cy="22" r="5" fill="none" stroke="currentColor" stroke-width="2.2"/>
    <path d="M27.6 25.6l2.4 3.6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>
</template>
