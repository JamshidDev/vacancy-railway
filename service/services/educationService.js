import axios from "../index.js"

export default {
    index: async (payload)=>{
        return await axios.get('/v1/vacancies/educations', {params:payload?.params})
    },
    store: async (payload)=>{
        return await axios.post('/v1/vacancies/educations', payload.data)
    },
    update: async (payload)=>{
        return await axios.put(`/v1/vacancies/educations/${payload.id}`, payload.data)
    },
    _delete: async (payload)=>{
        return await axios.delete(`/v1/vacancies/educations/${payload.id}`, {params:payload?.params})
    },
}

