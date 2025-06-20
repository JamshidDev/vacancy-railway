

const clearPhoneNumber =(v)=>{
    if(!v) return v
    v.toString().slice(4).replace('-','').replace('+','')
}














export default {
    clearPhoneNumber
}

