import uzCyrLang from "./locales/uz.json";
import ruLang from "./locales/ru.json";
import enLang from "./locales/en.json";

const messages = {
    uz: uzCyrLang,
    ru: ruLang,
    en: enLang,
};

const i18nOptions = {
    legacy: false,
    locale: "uz",
    fallbackLocale: "uz",
    missingWarn: false,
    messages: messages,
};

export default defineI18nConfig(() => i18nOptions);