import {defineStore} from "pinia"
import {ref} from "vue"

export const useProfileStore = defineStore('profileStore',()=>{
    const payload = ref({
        country_id:null,
        region_id:null,
        city_id:null,
        current_region_id:null,
        current_city_id:null,
        address:null,
        pin:null,
        sex:null,
        nationality_id:null,
        education:null,
        marital_status:null,
        languages:[],
    })

    const educationList = ref([])
    const languageList = ref([])
    const nationalList = ref([])
    const countryList = ref([])
    const maritalStatusList = ref([])

    const loading = ref(false)


    const onGetEnum = ()=>{
        loading.value = true
        $ApiSerivce.educationService.update({data, id}).then(res=>{
            educationVisible.value = false
            onEducationIndex()
        }).finally(()=>{
            loading.value = false
        })
    }




    return {
        payload,
    }

})