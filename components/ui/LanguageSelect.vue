<script setup>
import {useProfileStore} from "../../store/index.js"

const { t } = useI18n()
const { locale} = useI18n()
const switchLocalePath = useSwitchLocalePath()
const store = useProfileStore()

defineProps({
  mobile:{
    type:Boolean,
    default:false,
  }
})
const renderOption = (option)=>{
  return [
    h(
        'div',
        {
          class:'flex gap-2 items-center w-full'
        },
        h('img', {
          src: option.url,
          alt: option.name,
          class: 'w-[20px] h-[20px] rounded-full object-cover'
        }),
        [h('div',
            { class:'font-semibold uppercase'}, option.name)
        ]
    ),]
}

const onChange = (v)=>{
  store.appLanguage = v
  navigateTo(switchLocalePath(v))
}


const options= [
  {
    name:t('content.uz'),
    key: "uz",
    url:'/uz.png',
  },
  {
    name:t('content.ru'),
    key: "ru",
    url:'/ru.png',
  },
  {
    name:t('content.en'),
    key: "en",
    url:'/en.png',
  },
]

onMounted(()=>{
  store.appLanguage = locale.value
})
</script>

<template>
  <template v-if="mobile">
    <div class="w-full flex gap-3">
      <template v-for="item in options" :key="item.key">
        <img @click="onChange(item.key)" :class="item.key === store.appLanguage && '!border-primary'" class="border-[4px] rounded-full border-transparent  w-[40px] transition-all duration-300" :src="item.url" alt="image">
      </template>
    </div>
  </template>

  <template v-else>
    <n-dropdown
        @select="onChange"
        :render-label="renderOption"
        trigger="click"
        :options="options"
    >
      <div class="flex gap-2 items-center px-3 h-[44px] bg-surface-ground hover:bg-surface-line rounded-lg cursor-pointer overflow-hidden transition-colors">
        <img class="w-[22px] h-[22px] rounded-full object-cover" :src="`/${store.appLanguage}.png`" alt="image">
        <span class="uppercase font-bold text-black-primary">{{$t(`content.${store.appLanguage}`)}}</span>
      </div>
    </n-dropdown>
  </template>
</template>
