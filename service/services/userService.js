import axios from "../index.js"

export default {
    profile : async (payload)=>{
        return await axios.get('/v1/vacancies/profile', {params:payload?.params})
    },
}

