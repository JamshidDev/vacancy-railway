import { NIcon } from "naive-ui";
import numeral from 'numeral'
import moment from 'moment/moment'

const clearPhoneNumber =(v)=>{
    if(!v) return v
     return  v.toString().replace(/^\+998|[-\s]/g, '')
}

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value)

const methodTypes = {
    PUT:'put',
    DELETE:'delete',
    POST:'post',
    GET:'get',
}

const  renderIcon =(icon)=> {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        });
    };
}

const formattedMoney =(v)=> {
    if(!v) return v
    return numeral(v).format('0,0.00')
}

const formattedDate =(v)=> {
    if(!v) return v
    return moment(v).format('LL')
}

function getDaysBetweenDates(date1, date2) {
    if(!date1 || !date2) return  ''
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())

    const msPerDay = 1000 * 60 * 60 * 24
    return Math.abs(Math.floor((utc2 - utc1) / msPerDay))
}










export const utils = {
    clearPhoneNumber,
    onlyAllowNumber,
    methodTypes,
    renderIcon,
    formattedMoney,
    formattedDate,
    getDaysBetweenDates,

}



