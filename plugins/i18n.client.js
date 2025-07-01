export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            t: nuxtApp.$i18n.t,
        },
    };
});