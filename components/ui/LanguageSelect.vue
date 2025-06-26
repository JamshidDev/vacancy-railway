<script setup>
const { t } = useI18n()
const { locale} = useI18n()
const switchLocalePath = useSwitchLocalePath()
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
const currentKey = ref('uz')

const onChange = (v)=>{
  currentKey.value = v
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
  currentKey.value = locale._value
})
</script>

<template>
  <n-dropdown
      @select="onChange"
      :render-label="renderOption"
      trigger="click" :options="options">
    <div class="flex gap-2 items-center pl-1 pr-2 py-1 h-[40px]  border-surface-line rounded-xl border cursor-pointer  overflow-hidden">
      <img :src="`/${currentKey}.png`" alt="image">
      <span class="uppercase font-bold text-black-secondary">{{$t(`content.${currentKey}`)}}</span>
    </div>
  </n-dropdown>
</template>
