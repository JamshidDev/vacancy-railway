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








export const utils = {
    clearPhoneNumber,
    onlyAllowNumber,
    methodTypes,
    renderIcon,
    formattedMoney,
    formattedDate,

}



