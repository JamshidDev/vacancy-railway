import axios from 'axios'
import {appSetting} from "@/utils/index.js"

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
        return Promise.resolve(response)
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
);

export default instance