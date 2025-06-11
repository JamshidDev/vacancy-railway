import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useHeroStore = defineStore('heroStore',()=>{
    const isActiveNavbar = ref(false)
    const activeTab = ref(1)
    const tabList = [
        {
            name:'Tashkilotlar',
            id:1,
        },
        {
            name:'Hudud bo‘yicha',
            id:2,
        },
    ]

    const onChangeTab = (v)=>{
        activeTab.value = v
    }


    return {
        isActiveNavbar,
        activeTab,
        tabList,
        onChangeTab,
    }

})