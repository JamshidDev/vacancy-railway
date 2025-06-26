import {uzUZ, dateUzUZ, ruRU, dateRuRU, enUS, dateEnUS,} from 'naive-ui'

export const appSetting = {
    defaultLanguage: 'uz',
    defaultAvatar: '/avatar-default.jpg',
    languageKey: 'app-language',
    themeKey: 'app-theme',
    defaultThemeKey: 'light',
    tokenKey: 'app-token',
    languages: {
        UZ: 'uz',
        RU: 'ru',
        En: 'en',
    },
    naiveLang: {
        'uz': {
            lang:uzUZ,
            date:dateUzUZ,
        },
        'ru': {
            lang:ruRU,
            date:dateRuRU,
        },
        'en': {
            lang:enUS,
            date:dateEnUS,
        },
    }
}