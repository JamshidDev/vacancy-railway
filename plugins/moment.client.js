import moment from 'moment/moment'
import 'moment/locale/uz-latn'
import 'moment/locale/ru'

export default defineNuxtPlugin((nuxtApp) => {
    moment.locale('uz-latn')
})