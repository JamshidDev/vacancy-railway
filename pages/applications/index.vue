<script setup>
// Arizalar profil ichidagi tabga ko'chirilgan; eski havolalar o'sha tabga yo'naltiriladi
definePageMeta({
  layout:"admin-layout",
  middleware:[
    'auth',
    (to)=> navigateTo({
      path:to.path.replace(/applications\/?$/, 'profile'),
      query:{...to.query, tab:'applications'},
    }, {replace:true}),
  ],
})
</script>

<template>
  <div></div>
</template>
