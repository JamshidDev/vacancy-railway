# vacancy-railway

"O'zbekiston temir yo'llari" AJ bo'sh ish o'rinlari portali (frontend). Nuxt 3 (`ssr: false`), Naive UI, Tailwind v4, Pinia, `@nuxtjs/i18n` (uz/ru/en).

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:3000 (band bo'lsa 3001)
```

- API manzili `.env` dagi `VITE_API_URL` dan olinadi (`service/index.js`), so'rovlar `${VITE_API_URL}/api` ga ketadi.
- `nuxt.config.js` o'zgarganda dev server o'zini qayta yuklayotib i18n xatosi bilan yiqiladi ("All locales must have the file or files property...") — `npm run dev` ni qayta ishga tushiring.
- Dev server ishlab turganda `nuxt build` qilmang: u `.nuxt/dist` ni o'chirib, dev serverni buzadi.

## Kod tuzilishi

- API chaqiruvlari: `service/services/*.js`, `window.$ApiSerivce` orqali store'lardan chaqiriladi.
- Axios interceptor (`service/index.js`): POST/PUT/DELETE javobida `message` (string) bo'lsa — yashil toast; xatoda `error.response.data.message` — qizil toast. Backend xabarlarni foydalanuvchiga ko'rsatiladigan tilda (`Accept-Language` sarlavhasi bo'yicha) qaytarishi kerak.
- Telefon raqam backend'ga `+998` va chiziqchalarsiz, 9 raqam ko'rinishida ketadi (`utils.clearPhoneNumber`): `+99890-123-45-67` → `901234567`.
- Ranglar CSS o'zgaruvchilarida (`assets/css/tailwind.css`, `:root` va `.dark`); dark mode `<html class="dark">` orqali.

---

## Backend kutilayotgan ishlar

### Parolni tiklash (frontend tayyor, backend yo'q)

Frontend: `components/ui/PasswordResetForm.vue`, `store/modules/authStore.js` (`onResetSendCode`, `onResetPassword`), `service/services/authService.js` (`forgotPassword`, `resetPassword`). Kirish oynasida "Parolni unutdingizmi?" havolasi orqali ochiladi.

Oqim ro'yxatdan o'tishdagi kabi ikki qadamli (`/token` → `/register`):

1. Foydalanuvchi telefonini kiritadi → **`POST /api/v1/vacancies/password/forgot`** → SMS kod yuboriladi.
2. SMS kod + yangi parol → **`POST /api/v1/vacancies/password/reset`** → parol yangilanadi.
3. Frontend "Parol yangilandi" ekranini ko'rsatadi va foydalanuvchini kirish formasiga qaytaradi (avtomatik login qilinmaydi).

#### 1. `POST /api/v1/vacancies/password/forgot`

So'rov:

```json
{ "phone": "901234567" }
```

Muvaffaqiyatli javob (200):

```json
{ "data": { "token": "<reset so'rovini bog'lovchi bir martalik token>" }, "message": null }
```

- `data.token` — frontend uni saqlab, 2-qadamda qaytarib yuboradi (ro'yxatdan o'tishdagi `/token` → `data.user` bilan bir xil g'oya). Token qisqa muddatli bo'lsin (masalan 10 daqiqa) va faqat shu telefon uchun ishlasin.
- SMS kod 6 xonali raqam (frontendda 6 katakli `n-input-otp`).
- Xavfsizlik: raqam bazada yo'q bo'lsa ham iloji boricha bir xil javob qaytarish tavsiya etiladi (raqamlarni "terib" tekshirib bo'lmasligi uchun). Agar mahsulot jihatidan "Bu raqam ro'yxatdan o'tmagan" deb aytish kerak bo'lsa — 404/422 va tushunarli `message`.
- Cheklov: bitta raqamga kod yuborishni cheklang (masalan daqiqasiga 1 marta). Frontend "Kodni qayta yuborish" tugmasini 60 soniya bloklaydi va qayta bosilganda shu endpoint'ni yana chaqiradi (yangi `token` keladi). Limit oshsa 429 va `message` (masalan "Juda ko'p urinish, 1 daqiqadan so'ng qayta urinib ko'ring") — frontend uni toast qilib ko'rsatadi.

#### 2. `POST /api/v1/vacancies/password/reset`

So'rov:

```json
{
  "token": "<1-qadamdagi data.token>",
  "otp": "123456",
  "password": "Yangi1234",
  "password_confirmation": "Yangi1234"
}
```

Muvaffaqiyatli javob (200):

```json
{ "data": null, "message": "Parol muvaffaqiyatli yangilandi" }
```

- `message` bo'lsa frontend uni yashil toast qiladi; ixtiyoriy.
- Parol qoidasi frontend bilan bir xil bo'lsin: 8–15 belgi (`utils/validationRules.js` → `requiredPasswordField`). `password_confirmation` mos kelishi frontendda ham tekshiriladi, lekin backend ham tekshirsin.
- Xatolar (frontend `message` ni qizil toast qiladi va 2-qadamda qoladi, foydalanuvchi kodni qayta kiritishi yoki qayta yuborishi mumkin):
  - noto'g'ri SMS kod → 422, masalan "SMS kod noto'g'ri";
  - token/kod muddati o'tgan → 422 yoki 410, masalan "Kod muddati tugagan, qayta yuboring";
  - parol qoidaga mos emas → 422.
- Kodni noto'g'ri kiritish urinishlarini cheklang (masalan 5 marta), keyin token bekor qilinsin.
- Parol yangilangach shu foydalanuvchining eski sessiya/tokenlarini bekor qilish tavsiya etiladi.

Backend tayyor bo'lgach endpoint yo'llari yoki maydon nomlari boshqacha bo'lsa, faqat `service/services/authService.js` va `store/modules/authStore.js` dagi `onResetSendCode` / `onResetPassword` ni moslash kifoya.
