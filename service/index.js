import axios from 'axios'
import {appSetting} from "@/utils/index.js"
import {utils} from "@/utils/index.js"
const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: `${apiUrl}/api`
});


instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem(appSetting.tokenKey) || null;
    config.headers['Accept-Language'] = localStorage.getItem(appSetting.languageKey) || appSetting.defaultLanguage
    config.headers['Access-Control-Allow-Origin'] = '*'
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }

    return config;
})

instance.interceptors.response.use(
    response => {
        if([utils.methodTypes.PUT,utils.methodTypes.POST, utils.methodTypes.DELETE].includes(response.config.method)){
            if(!response.data?.error && response?.data?.message && typeof response.data?.message === 'string'){
                $Toast.success(response.data.message.toString())
            }
        }
        return Promise.resolve(response)
    },
    error => {
        if(error?.response?.status === 401) {
            localStorage.removeItem(appSetting.tokenKey)
        }
        $Toast.error(error?.response?.data?.message)
        return Promise.reject(error)
    }
);

export default instance