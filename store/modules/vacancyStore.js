import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useVacancyStore = defineStore('vacancyStore',()=>{

    const params = ref({
        region_id:null,
        no_experience:false,
        experience:null,
        search:null,
    })

    const regionList = ref([])
    const regionLoading= ref(false)
    const experience= ref(false)
    const salary= ref(false)


    return {
        regionList,
        regionLoading,
        params,
        experience,
        salary,
    }

})