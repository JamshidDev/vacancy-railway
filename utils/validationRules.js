
const triggerEvents =  ['input', 'blur-sm']

import { getCurrentInstance } from 'vue'

const t = () => {
    const instance = getCurrentInstance()
    return instance?.appContext.config.globalProperties.$t
}

export  const rules ={
    common: {
        requiredStringField: {
            required: true,
            message: t(`rules.requiredField`),
            trigger: [...triggerEvents, 'change']
        },
        requiredDateTimeField: {
            type: 'number',
            required: true,
            trigger: [...triggerEvents, 'change'],
            message: t(`rules.requiredField`)
        },
        requiredNumberField: {
            type: 'number',
            required: true,
            trigger: [...triggerEvents, 'change'],
            message: t(`rules.requiredField`)
        },
        requiredMultiSelectField: {
            type: 'array',
            required: true,
            trigger: [...triggerEvents, 'change'],
            message: t(`rules.requiredField`)
        },
        requiredPhonesField:[
            {
                validator: (rule, value) => {
                    if (!value || value[0].phone.length <16) {
                        return new Error( t(`rules.requiredField`));
                    }
                    return true;
                },
                trigger: [...triggerEvents, 'change'],
            },
        ],
        requiredPinField:[
            {
                required: true,
                message: t(`rules.requiredJSHSHIR`),
                trigger: [...triggerEvents, 'change'],
            },
            {
                min:17,
                message: t(`rules.requiredMinLength`, {n:14}),
                trigger: [...triggerEvents, 'change'],
            },
        ],
    },
    names:{
        requiredStringField:'requiredStringField',
        requiredDateTimeField:'requiredDateTimeField',
        requiredNumberField:'requiredNumberField',
        requiredMultiSelectField:'requiredMultiSelectField',
        requiredPhonesField:'requiredPhonesField',
        requiredPinField:'requiredPinField'
    },
}