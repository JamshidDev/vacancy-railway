import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useVacancyStore = defineStore('vacancyStore',()=>{

    const params = ref({
        region_id:null,
        city_id:null,
        organizations:[],
        experience:null,
        search:null,
        education:null,
        salary:null,
    })

    const heroSearch = ref(null)
    const regionList = ref([])
    const regionLoading= ref(false)
    const experience= ref(false)
    const salary= ref(false)

    const organizations = ref([])
    const regions = ref([])
    const lastVacancies = ref([])
    const loading = ref(false)
    const cityLoading = ref(false)
    const cityList = ref([])
    const list = ref([])
    const listLoading = ref(false)
    const activeVacancy = ref(0)
    const activeTab = ref(1)
    const tabList = [
        {
            name:'mainSection.organizations',
            id:1,
        },
        {
            name:'mainSection.byArea',
            id:2,
        },
    ]
    const detail =ref(null)
    const showLoading =ref(false)


    const onChangeTab = (v)=>{
        activeTab.value = v
    }

    const onInitialApp = ()=>{
        loading.value = true
        $ApiSerivce.vacancyService.counts().then(res=>{
            organizations.value =res.data.data.organizations
            regions.value =res.data.data.regions
            lastVacancies.value =res.data.data.lastVacancies
            activeVacancy.value = res.data.data.vacanciesCount
        }).finally(()=>{
            loading.value = false
        })
    }

    const onRegions = ()=>{
        regionLoading.value = true
        $ApiSerivce.vacancyService.regions().then(res=>{
            regionList.value =res.data.data
        }).finally(()=>{
            regionLoading.value = false
        })
    }
    const onCities = (v)=>{
        cityLoading.value = true
        $ApiSerivce.vacancyService.cities({region_id:v}).then(res=>{
            cityList.value =res.data.data
        }).finally(()=>{
            cityLoading.value = false
        })
    }
    const onIndex = ()=>{
        listLoading.value = true
        $ApiSerivce.vacancyService.index({params:params.value}).then(res=>{
            list.value =res.data.data.data
        }).finally(()=>{
            listLoading.value = false
        })
    }

    const onShow = (id)=>{
        showLoading.value = true
        $ApiSerivce.vacancyService.show({id}).then(res=>{
            detail.value =res.data.data
        }).finally(()=>{
            showLoading.value = false
        })
    }


    return {
        regionList,
        regionLoading,
        params,
        experience,
        salary,
        loading,
        lastVacancies,
        regions,
        organizations,
        activeVacancy,
        activeTab,
        tabList,
        cityLoading,
        cityList,
        listLoading,
        list,
        detail,
        showLoading,
        heroSearch,

        onChangeTab,
        onRegions,
        onCities,
        onInitialApp,
        onIndex,
        onShow,
    }

})