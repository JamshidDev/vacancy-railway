import axios from "../index.js"

export default {
    counts: async (payload)=>{
        return await axios.get('/v1/vacancies/list', {params:payload?.params})
    },
    regions: async (payload)=>{
        return await axios.get('/v1/vacancies/regions', {params:payload?.params})
    },
    cities: async (payload)=>{
        return await axios.get('/v1/vacancies/cities', {params:payload?.params})
    },
    organizations: async (payload)=>{
        return await axios.get('/v1/vacancies/organizations', {params:payload?.params})
    },
    index: async (payload)=>{
        return await axios.get('/v1/vacancies/report', {params:payload?.params})
    },
    show: async (payload)=>{
        return await axios.get(`/v1/vacancies/report/${payload.id}`, {params:payload?.params})
    },
    applications: async (payload)=>{
        return await axios.get('/v1/vacancies/applications', {params:payload?.params})
    },
    deleteApplicationFile: async (payload)=>{
        return await axios.delete(`/v1/vacancies/applications/${payload.applicationId}/files/${payload.fileId}`)
    },
    addApplicationFile: async (payload)=>{
        return await axios.post(`/v1/vacancies/applications/${payload.applicationId}/files`, payload.data)
    },
}

