import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useVacancyStore = defineStore('vacancyStore',()=>{

    const params = ref({
        region_id:null,
        city_id:null,
        organization_id:null,
        experience:null,
        search:null,
        education:null,
        salary:null,
        page:1,
        per_page:10,
    })

    const pagination = ref({
        current_page: 1,
        total: 0,
    })

    const heroSearch = ref(null)
    const regionList = ref([])
    const regionLoading= ref(false)
    const experience= ref(false)
    const salary= ref(false)

    const experienceOptions = [1, 2, 3, 4, 5]
    const salaryOptions = [
        { value: 500000, label: '500 000' },
        { value: 1000000, label: '1 000 000' },
        { value: 2000000, label: '2 000 000' },
        { value: 3000000, label: '3 000 000' },
        { value: 5000000, label: '5 000 000' },
    ]

    const organizations = ref([])
    const organizationList = ref([])
    const organizationLoading = ref(false)
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
    const sendData = ref(null)
    const showLoading =ref(false)

    // Applications
    const applicationList = ref([])
    const applicationLoading = ref(false)
    const applicationPagination = ref({
        current_page: 1,
        total: 0,
    })
    const applicationParams = ref({
        page: 1,
        per_page: 10,
    })


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
        if (regionList.value.length) return
        regionLoading.value = true
        $ApiSerivce.vacancyService.regions().then(res=>{
            regionList.value =res.data.data
        }).finally(()=>{
            regionLoading.value = false
        })
    }
    const onOrganizations = ()=>{
        if (organizationList.value.length) return
        organizationLoading.value = true
        $ApiSerivce.vacancyService.organizations().then(res=>{
            organizationList.value = res.data.data
        }).finally(()=>{
            organizationLoading.value = false
        })
    }
    const onCities = (v)=>{
        cityLoading.value = true
        $ApiSerivce.vacancyService.cities({params:{region_id:v}}).then(res=>{
            cityList.value =res.data.data
        }).finally(()=>{
            cityLoading.value = false
        })
    }
    const onIndex = ()=>{
        listLoading.value = true
        $ApiSerivce.vacancyService.index({params:params.value}).then(res=>{
            if(res?.data?.data) {
                list.value = res.data.data.data || []
                pagination.value.current_page = res.data.data.current_page || 1
                pagination.value.total = res.data.data.total || 0
            }
        }).catch(err=>{
            console.error('onIndex error:', err)
            list.value = []
        }).finally(()=>{
            listLoading.value = false
        })
    }

    const onPageChange = (page)=>{
        params.value.page = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onIndex()
    }

    const onShow = (id)=>{
        showLoading.value = true
        $ApiSerivce.vacancyService.show({id}).then(res=>{
            detail.value =res.data.data.vacancy
            sendData.value = res.data.data.send
        }).finally(()=>{
            showLoading.value = false
        })
    }

    const onApplications = ()=>{
        applicationLoading.value = true
        $ApiSerivce.vacancyService.applications({params:applicationParams.value}).then(res=>{
            if(res?.data?.data) {
                applicationList.value = res.data.data || []
                applicationPagination.value.total = res.data.data?.length || 0
            }
        }).catch(err=>{
            console.error('onApplications error:', err)
            applicationList.value = []
        }).finally(()=>{
            applicationLoading.value = false
        })
    }

    const onApplicationPageChange = (page)=>{
        applicationParams.value.page = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onApplications()
    }

    return {
        regionList,
        regionLoading,
        organizationList,
        organizationLoading,
        experienceOptions,
        salaryOptions,
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
        sendData,
        pagination,
        applicationList,
        applicationLoading,
        applicationPagination,
        applicationParams,

        onChangeTab,
        onRegions,
        onOrganizations,
        onCities,
        onInitialApp,
        onIndex,
        onShow,
        onPageChange,
        onApplications,
        onApplicationPageChange,
    }

})