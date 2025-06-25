
const triggerEvents =  ['input', 'blur-sm', 'change']



export  const rules ={
    common:(t)=>({
        requiredStringField: {
            required: true,
            message: t(`rules.requiredField`),
            trigger:triggerEvents
        },
        requiredDateTimeField: {
            type: 'number',
            required: true,
            trigger: triggerEvents,
            message: t(`rules.requiredField`)
        },
        requiredNumberField: {
            type: 'number',
            required: true,
            trigger:triggerEvents,
            message: t(`rules.requiredField`)
        },
        requiredMultiSelectField: {
            type: 'array',
            required: true,
            trigger:triggerEvents,
            message: t(`rules.requiredField`)
        },
        requiredPhoneField:[
            {
                validator: (rule, value) => {
                    if (value &&  value?.length === 16) {
                        return true
                    }
                    return new Error( t(`rules.phone`))

                },
                trigger:triggerEvents,
            },

        ],
        requiredPasswordField:[
            {
                validator: (rule, value) => {
                    if (value && value?.length <16 && value?.length>7) {
                        return true
                    }
                    return new Error( t(`rules.password`));

                },
                trigger:triggerEvents,
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
        requiredOtpField:[
            {
                validator: (rule, value) => {
                    const isValida = value?.every((v)=>v)
                    if (value && value?.length === 6 && isValida) {
                        return true
                    }
                    return new Error( t(`rules.otp`));

                },
                trigger:triggerEvents,
            },
        ],
    }),
    names:{
        requiredStringField:'requiredStringField',
        requiredDateTimeField:'requiredDateTimeField',
        requiredNumberField:'requiredNumberField',
        requiredMultiSelectField:'requiredMultiSelectField',
        requiredPhoneField:'requiredPhoneField',
        requiredPinField:'requiredPinField',
        requiredPasswordField:'requiredPasswordField',
        requiredOtpField:'requiredOtpField',
    },
}