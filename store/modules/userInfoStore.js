import {defineStore} from "pinia"
import {ref} from "vue"

export const useUserInfoStore = defineStore('userInfoStore',()=>{
    const activeTab = ref(1)
    const tabList = [
        {
            name:'Mehnat faoliyati',
            id:1,
        },
        {
            name:'Mehnat faoliyati',
            id:2,
        },
        {
            name:'Mehnat faoliyati',
            id:3,
        },
        {
            name:'Mehnat faoliyati',
            id:4,
        },
        {
            name:'Mehnat faoliyati',
            id:5,
        },
    ]
    const careerList = ref([])
    const careerLoading= ref(false)
    const careerVisible = ref(false)
    const careerSaveLoading = ref(false)
    const careerDeleteLoading = ref(false)
    const careerVisibleType = ref(true)
    const elementId = ref(0)
    const careerPayload = ref({
        from:null,
        to:null,
        position:null,
        now:false,
    })
    const onChangeTab = (v)=>{
        activeTab.value = v
    }
    const educationVisible = ref(false)
    const educationVisibleType = ref(false)
    const educationList = ref([])
    const educationPayload = ref({
        from:null,
        to:null,
        university:null,
        now:false,
    })
    const loading = ref(false)
    const saveLoading = ref(false)
    const deleteLoading = ref(false)

    const onIndex = ()=>{
        careerLoading.value = true
        $ApiSerivce.careerService.index().then(res=>{
            careerList.value =res.data.data
        }).finally(()=>{
            careerLoading.value = false
        })
    }
    const onCreate = (data)=>{
        careerSaveLoading.value = true
        $ApiSerivce.careerService.store({data}).then(res=>{
            careerVisible.value = false
            onIndex()
        }).finally(()=>{
            careerSaveLoading.value = false
        })
    }
    const onUpdate = (data)=>{
        careerSaveLoading.value = true
        const id = elementId.value
        $ApiSerivce.careerService.update({data, id}).then(res=>{
            careerVisible.value = false
            onIndex()
        }).finally(()=>{
            careerSaveLoading.value = false
        })
    }
    const onDelete = ()=>{
        careerDeleteLoading.value = true
        const id = elementId.value
        $ApiSerivce.careerService._delete({id}).then(res=>{
            onIndex()
        }).finally(()=>{
            careerDeleteLoading.value = false
        })
    }

    const onEducationIndex = ()=>{
        loading.value = true
        $ApiSerivce.educationService.index().then(res=>{
            educationList.value =res.data.data
        }).finally(()=>{
            loading.value = false
        })
    }

    const onEducationCreate = (data)=>{
        saveLoading.value = true
        $ApiSerivce.educationService.store({data}).then(res=>{
            educationVisible.value = false
            onEducationIndex()
        }).finally(()=>{
            saveLoading.value = false
        })
    }

    const onEducationUpdate = (data)=>{
        saveLoading.value = true
        const id = elementId.value
        $ApiSerivce.educationService.update({data, id}).then(res=>{
            educationVisible.value = false
            onEducationIndex()
        }).finally(()=>{
            saveLoading.value = false
        })
    }

    const onEducationDelete = ()=>{
        deleteLoading.value = true
        const id = elementId.value
        $ApiSerivce.educationService._delete({id}).then(res=>{
            onEducationIndex()
        }).finally(()=>{
            deleteLoading.value = false
        })
    }



    const resetCareerPayload = ()=>{
        careerPayload.value.to = null
        careerPayload.value.from = null
        careerPayload.value.position = null
        careerPayload.value.now = false
    }

    const resetEducationPayload = ()=>{
        educationPayload.value.to = null
        educationPayload.value.from = null
        educationPayload.value.university = null
        educationPayload.value.now = false
    }


    return {
        activeTab,
        tabList,
        careerList,
        careerLoading,
        onChangeTab,
        careerVisible,
        careerVisibleType,
        careerPayload,
        careerSaveLoading,
        careerDeleteLoading,
        elementId,
        loading,
        educationVisible,
        educationVisibleType,
        educationList,
        educationPayload,
        deleteLoading,
        saveLoading,

        onIndex,
        onCreate,
        onDelete,
        onUpdate,
        resetCareerPayload,
        onEducationIndex,
        onEducationCreate,
        onEducationUpdate,
        onEducationDelete,
        resetEducationPayload,


    }

})