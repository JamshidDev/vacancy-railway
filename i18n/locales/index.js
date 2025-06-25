
import en from "./en.json"
import uz from "./uz.json"
export default {
    modules: ['@nuxtjs/i18n'],
    locales:[
        {code:'uz', name:'Uzbek', file:'uz.json'},
        {code:'en', name:'English', file:'en.json'},
    ],
    strategy: 'no_prefix',
    defaultLocale:'uz',
    vueI18n: './i18n/locales/index.js'

}