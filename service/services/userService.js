import axios from "../index.js"

export default {
    profile : async (payload)=>{
        return await axios.get('/v1/vacancies/profile', {params:payload?.params})
    },
    update : async (payload)=>{
        return await axios.put('/v1/vacancies/profile/update', payload.data)
    },
    updateAvatar : async (payload)=>{
        return await axios.post('/v1/vacancies/profile/update-photo', payload.data)
    },
    _enum : async (payload)=>{
        return await axios.get('/v1/vacancies/enums', {params:payload?.params})
    },
    _dashboard : async (payload)=>{
        return await axios.get('/v1/vacancies/dashboard', {params:payload?.params})
    },
    _application : async (payload)=>{
        return await axios.get('/v1/vacancies/applications', {params:payload?.params})
    },
    _sendApply : async (payload)=>{
        return await axios.post('/v1/vacancies/send-application', payload.data)
    },
}

