import axios from "../index.js"

export default {
    profile : async (payload)=>{
        return await axios.get('/v1/vacancies/profile', {params:payload?.params})
    },
    update : async (payload)=>{
        return await axios.put('/v1/vacancies/profile/update', payload.data)
    },
    _enum : async (payload)=>{
        return await axios.put('/v1/vacancies/enums', payload.data)
    },
}

