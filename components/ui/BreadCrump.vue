<script setup>
import {Home16Regular, ChevronDoubleRight20Filled} from "@vicons/fluent"
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

const goPush = (path)=>{
  router.push(path)
}


</script>

<template>
<UiPageContent>
  <div class="flex font-medium items-center gap-2 text-black-tertiary">
    <n-icon class="text-primary" size="20">
      <Home16Regular/>
    </n-icon>
   <span @click="goPush('/')" class="hover:text-primary hover:underline cursor-pointer">{{$t('mainSection.name')}}</span>
    <template v-for="(item, idx) in breadCrumbs" :key="idx">
      <div
          class="flex items-center gap-2 text-black-tertiary hover:text-primary cursor-pointer"
          :class="[(breadCrumbs.length-1) === idx && 'text-primary']"
          @click="goPush(item.path)">
        <n-icon size="14">
          <ChevronDoubleRight20Filled/>
        </n-icon>
        <span class="hover:underline">

          {{(breadCrumbs?.length-1) === idx? customTitle || $t(item?.name) : $t(item?.name)}}
        </span>
      </div>

    </template>

  </div>
</UiPageContent>
</template>
