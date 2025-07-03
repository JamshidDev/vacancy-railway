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

const timeToZone = (time)=>{
    return (time === null || time === undefined)? null :moment(time).format('YYYY-MM-DD')
}

const timeToUI = (time)=>{
    return (time === null || time === undefined)? null :moment(time).format('DD-MM-YYYY')
}

const datePickerFormatter = (time)=>{
    return  (time === null || time === undefined)? null : new Date(time).getTime()
}


function getDaysBetweenDates(date2) {
    if(!date2) return  ''
    const d1 = new Date()
    const d2 = new Date(date2)
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())

    const msPerDay = 1000 * 60 * 60 * 24
    const result = Math.floor((utc2 - utc1) / msPerDay)
    return result>0? result: 'detail.expired'
}










export const utils = {
    clearPhoneNumber,
    onlyAllowNumber,
    methodTypes,
    renderIcon,
    formattedMoney,
    formattedDate,
    getDaysBetweenDates,
    timeToZone,
    timeToUI,
    datePickerFormatter,

}



