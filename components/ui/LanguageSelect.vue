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
  store.appLanguage = locale._value
})
</script>

<template>
  <template v-if="mobile">
    <div class="w-full flex justify-between">
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
      <div class="flex gap-2 items-center pl-1 pr-2 py-1 h-[40px]  border-surface-line rounded-xl border cursor-pointer  overflow-hidden">
        <img :src="`/${store.appLanguage}.png`" alt="image">
        <span class="uppercase font-bold text-black-secondary">{{$t(`content.${store.appLanguage}`)}}</span>
      </div>
    </n-dropdown>
  </template>
</template>
