import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useCounterStore = defineStore('counterStore',()=>{
    const count = ref(0)

    const increment = () => {
        count.value ++
    }

    const doubleCount = computed(()=>2*count.value)


    return {
        count,
        increment,
    }

})