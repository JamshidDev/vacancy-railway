<script setup>
const navigations = [
  {
    name:"Home",
    path:'/',
    children:[
      {
        name:'Vakansiyalar',
        path:'/vacation',
      },
      {
        name:'Lavozimlar',
        path:'/vacation',
      },
      {
        name:'Oyliklar',
        path:'/vacation',
      },
      {
        name:"Bosh o'rinlar",
        path:'/vacation',
      },
    ]
  },
  {
    name:"Jobs",
    path:'/',
    children:[
      {
        name:'Vakansiyalar',
        path:'/vacation',
      },
      {
        name:'Lavozimlar',
        path:'/vacation',
      },
      {
        name:'Oyliklar',
        path:'/vacation',
      },
      {
        name:"Bosh o'rinlar",
        path:'/vacation',
      },
    ]
  },
  {
    name:"Pages",
    path:'/',
    children:[
      {
        name:'Pages-1',
        path:'/vacation',
      },
      {
        name:'Pages-2',
        path:'/vacation',
      },
      {
        name:'Pages-3',
        path:'/vacation',
      },
    ]
  },
  {
    name:"Candidates",
    path:'/',
    children:[]
  },
  {
    name:"Blogs",
    path:'/',
    children:[]
  },

]
</script>

<template>
  <div class="flex gap-4">
    <template v-for="(item, index) in navigations" :key="index">
      <div class="cursor-pointer h-full group relative flex items-center px-2">
        <a class="hover:text-primary text-black-secondary font-medium transition-all my-auto" href="#">{{item.name}}</a>
        <div v-if="item.children.length>0" class="w-[200px] bg-surface-section absolute top-[90px] translate-x-[-10%] opacity-0 pointer-events-none shadow-navbar
       group-hover:opacity-100  group-hover:pointer-events-auto group-hover:top-[60px] transition-all duration-300 cursor-pointer">
          <template v-for="(link, idx) in item.children" :key="idx">
            <p class=" py-3  border-b border-surface-line pl-3 hover:pl-8 hover:text-primary transition-all duration-400 delay-75 font-medium cursor-pointer">{{link.name}}</p>
          </template>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>

</style>