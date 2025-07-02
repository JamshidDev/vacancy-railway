import {defineStore} from "pinia"
import {ref} from "vue"
import { v4 as uuidv4 } from 'uuid';
const route = useRoute()

export const useProfileStore = defineStore('profileStore',()=>{
    const payload = ref({
        last_name:null,
        first_name:null,
        middle_name:null,
        birthday:null,
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
    const sexList = computed(()=>{
        const { $t } = useNuxtApp()
        return [
            {
                name:$t('content.man'),
                id:1
            },
            {
                name:$t('content.woman'),
                id:0
            },
        ]
    })
    const languageList = ref([])
    const nationalList = ref([])
    const countryList = ref([])
    const regionList = ref([])
    const cityList = ref([])
    const cityLoading = ref(false)
    const maritalStatusList = ref([])
    const currentCityList = ref([])
    const currentCityLoading = ref(false)

    const loading = ref(false)
    const enumLoading = ref(false)
    const regionLoading = ref(false)
    const profileLoading = ref(false)
    const account = ref(null)
    const dashboardList = ref([])
    const dashboardLoading = ref(false)
    const sendLoading = ref(false)
    const applyVisible = ref(false)
    const docFiles = ref([])

    const onGetEnum = ()=>{
        enumLoading.value = true
        $ApiSerivce.userService._enum().then(res=>{
            const v = res.data.data
            educationList.value = v.educations
            languageList.value = v.languages
            nationalList.value = v.nationalities
            countryList.value = v.countries
            maritalStatusList.value = v.marital_statuses
        }).finally(()=>{
            enumLoading.value = false
        })
    }

    const onGetRegions = ()=>{
        regionLoading.value = true
        $ApiSerivce.vacancyService.regions().then(res=>{
            regionList.value = res.data.data
        }).finally(()=>{
            regionLoading.value = false
        })
    }

    const onGetCities = ()=>{
        cityLoading.value = true
        const id = payload.value.region_id
        $ApiSerivce.vacancyService.cities({params:{region_id:id}}).then(res=>{
            cityList.value = res.data.data
        }).finally(()=>{
            cityLoading.value = false
        })
    }

    const onGetCurrentCities = ()=>{
        currentCityLoading.value = true
        const id = payload.value.current_region_id
        $ApiSerivce.vacancyService.cities({params:{region_id:id}}).then(res=>{
            currentCityList.value = res.data.data
        }).finally(()=>{
            currentCityLoading.value = false
        })
    }

    const onProfile = ()=>{
        profileLoading.value = true
        window.$ApiSerivce.userService.profile().then(res=>{
            const v = res.data?.data
            account.value = v
            payload.value.last_name = v.last_name
            payload.value.first_name = v.first_name
            payload.value.middle_name = v.middle_name
            payload.value.birthday = utils.datePickerFormatter(v.birthday)
            payload.value.country_id = v.country?.id
            payload.value.region_id = v.region?.id
            payload.value.city_id = v.city?.id
            payload.value.current_region_id = v.current_region?.id
            payload.value.current_city_id = v.current_city?.id
            payload.value.address = v.address
            payload.value.pin = v.pin?.toString()
            payload.value.sex = v.sex
            payload.value.nationality_id = v.nationality?.id
            payload.value.education = v.education?.id
            payload.value.marital_status = v.marital_status?.id
            payload.value.languages = v.languages

            if(route.params === '/profile'){
                onGetCities()
                onGetCurrentCities()
            }

        }).finally(()=>{
            profileLoading.value = false
        })
    }

    const onUpdate = (data)=>{
        loading.value = true
        window.$ApiSerivce.userService.update({data}).then(res=>{
        }).finally(()=>{
            loading.value = false
        })
    }

    const onUpdateAvatar = (v)=>{
        const file = v.target.files[0]
        const formData = new FormData()
        formData.append('photo', file)
        profileLoading.value = true
        window.$ApiSerivce.userService.updateAvatar({data:formData}).then(res=>{
            onProfile()
        })
    }

    const onGetDashboard = ()=>{
        dashboardLoading.value = true
        $ApiSerivce.userService._dashboard().then(res=>{
            dashboardList.value = res.data.data
        }).finally(()=>{
            dashboardLoading.value = false
        })
    }

    const onUploadFile = (v)=>{
        const files = v.target.files
        docFiles.value = Array.from(files).map((f)=>({
            id:uuidv4(),
            file:f,
        }))
    }

    const removeFileById = (id)=>{
        docFiles.value = docFiles.value.filter((f)=>f.id !== id)
    }

    const onSendApply = (data)=>{
        sendLoading.value = true
        window.$ApiSerivce.userService._sendApply({data}).then(res=>{
            console.log( res.data.data)
        }).finally(()=>{
            sendLoading.value = false
        })
    }

    const fullName = computed(()=>{
        if(!account.value) return  ' '
        return account.value?.last_name + ' '+ account.value?.first_name+' '+account.value?.middle_name
    })

    const avatarUrl = computed(()=>{
        return account?.value?.photo || appSetting.defaultAvatar
    })




    return {
        payload,
        loading,
        enumLoading,
        educationList,
        languageList,
        nationalList,
        countryList,
        regionList,
        sexList,
        cityList,
        cityLoading,
        maritalStatusList,
        currentCityList,
        currentCityLoading,
        regionLoading,
        onGetEnum,
        onGetRegions,
        onGetCities,
        onGetCurrentCities,
        profileLoading,
        account,
        onProfile,
        onUpdate,
        fullName,
        avatarUrl,
        onUpdateAvatar,
        onGetDashboard,
        dashboardList,
        dashboardLoading,
        applyVisible,
        onSendApply,
        onUploadFile,
        docFiles,
        sendLoading,
        removeFileById,
    }

})