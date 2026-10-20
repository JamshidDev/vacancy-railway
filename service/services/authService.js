import axios from "../index.js"

export default {
    token : async (payload)=>{
        return await axios.post('/v1/vacancies/token', payload?.data)
    },
    login : async (payload)=>{
        return await axios.post('/v1/vacancies/login', payload?.data)
    },
    register : async (payload)=>{
        return await axios.post('/v1/vacancies/register', payload?.data)
    },
    // Parolni tiklash — backend hali tayyor emas, kontrakt CLAUDE.md da
    forgotPassword : async (payload)=>{
        return await axios.post('/v1/vacancies/password/forgot', payload?.data)
    },
    resetPassword : async (payload)=>{
        return await axios.post('/v1/vacancies/password/reset', payload?.data)
    }
}

