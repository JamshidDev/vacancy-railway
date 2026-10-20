// Yorug'/qorong'i mavzu. Boshlang'ich holatni nuxt.config dagi head skripti
// (sahifa chizilishidan oldin) <html class="dark"> orqali o'rnatadi;
// bu yerda faqat shu holat o'qiladi va o'zgartiriladi.
export const THEME_STORAGE_KEY = 'app-theme'

export const useTheme = () => {
    const isDark = useState('app-theme-dark', () =>
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    )

    const setDark = (value) => {
        document.documentElement.classList.toggle('dark', value)
        try {
            localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light')
        } catch (e) {
            // localStorage yopiq bo'lsa ham mavzu shu sessiyada ishlayveradi
        }
        isDark.value = value
    }

    const toggleTheme = () => setDark(!isDark.value)

    return {isDark, setDark, toggleTheme}
}
