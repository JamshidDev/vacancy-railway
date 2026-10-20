<script setup>
const route = useRoute()
const router = useRouter()

const props = defineProps({
  customTitle:{
    type:String,
    default:null
  }
})

const navigations = [
  {
    name:"vacancy.name",
    path:'/vacancy-list',
    indicator:'vacancy-list',
  },
  {
    name:" ",
    path:'/vacancy-list/detail',
    indicator:'detail',
  },
  {
    name:"profile.menu.myApplications",
    path:'/applications',
    indicator:'applications',
  },
]


const findRoute = (path)=>{
  const index = navigations.findIndex(v=>v.indicator === path)
  return (index === -1)? {} : navigations[index]
}

const breadCrumbs = computed(()=>{
  const paths = route.path.split('/').filter(Boolean).filter((v=>!['ru', 'en'].includes(v)))
  return paths.map((v)=>{
    return findRoute(v)
  })
})

const localePath = useLocalePath()
const goPush = (path)=>{
  router.push(localePath(path))
}


</script>

<template>
<div class="w-full bg-surface-ground border-b border-surface-line">
  <UiPageContent>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 py-4 text-[15px]">
     <span @click="goPush('/')" class="text-black-primary font-semibold hover:text-primary cursor-pointer">{{$t('mainSection.name')}}</span>
      <template v-for="(item, idx) in breadCrumbs" :key="idx">
        <span class="w-[5px] h-[5px] rounded-full bg-black-primary"></span>
        <span
            v-if="(breadCrumbs.length-1) === idx"
            class="text-black-tertiary line-clamp-1"
        >{{customTitle || $t(item?.name)}}</span>
        <span
            v-else
            @click="goPush(item.path)"
            class="text-black-primary font-semibold hover:text-primary cursor-pointer"
        >{{$t(item?.name)}}</span>
      </template>
    </div>
  </UiPageContent>
</div>
</template>
