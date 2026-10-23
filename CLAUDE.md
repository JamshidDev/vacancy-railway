# vacancy-railway

"O'zbekiston temir yo'llari" AJ bo'sh ish o'rinlari portali (frontend). Nuxt 3 (`ssr: false`), Naive UI, Tailwind v4, Pinia, `@nuxtjs/i18n` (uz/ru/en).

## Claude uchun eslatmalar

Before changing code, read `.claude/notes/README.md` and the end of `.claude/notes/log.md`. After every
task that edits code, update the matching area file in `.claude/notes/` in place (one file per area,
never one file per prompt) and add one line to `log.md`. The README there explains how.

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

### Admin: arizani bosqichdan bosqichga o'tkazish

Admin paneli (vakansiya egasi / HR) bu repoda emas. Admin arizani keyingi bosqichga o'tkazganda nomzod portali (shu frontend) natijani quyidagi API javoblaridan o'qiydi. Backend va admin aynan shu ma'lumotlarni to'g'ri yozishi kerak, aks holda nomzod o'z holatini ko'rmaydi.

Quyida "Frontend kutadi" deb belgilangan qismlar mavjud koddan olingan (o'zgartirilsa frontend ham o'zgarishi kerak). "Tavsiya" — hali yo'q, kelishib olish kerak bo'lgan narsalar.

#### Bosqichlar va holatlar

| `type.id` | Bosqich | Nomzodga ko'rinadigan `details` |
|---|---|---|
| 1 | Ariza topshirish | `number`, `created` |
| 2 | Hujjatlarni baholash | har bir hujjat turi bo'yicha holat (pastda) |
| 3 | Suhbat | `zoom` |
| 4 | Tibbiy ko'rik | hozircha hech narsa (faqat tavsif matni) |
| 5 | Imtihon | `exams` |

Holat (`status.id`) ham bosqich uchun, ham butun ariza uchun bir xil: **1 – Jarayonda, 2 – Qabul qilindi, 3 – Rad etildi.**

#### Frontend kutadi: `GET /api/v1/vacancies/applications/{id}`

Javobda `data.statuses` — bosqichlar massivi. Frontend ularni `type.id` bo'yicha tartiblab, chizadi (`components/ui/ApplicationDetailsModal.vue`), "N / M bosqich yakunlandi" progressi `status.id === 2` bo'lganlar sonidan hisoblanadi.

```json
{
  "id": 11,
  "number": "A-2026-0142",
  "status": { "id": 1, "name": "Jarayonda" },
  "vacancy_position": { "id": 68, "position": {"name": "..."}, "department": {"name": "..."}, "organization": {"name": "..."} },
  "statuses": [
    { "id": 1, "type": {"id": 1}, "status": {"id": 2, "name": "Qabul qilindi"},
      "details": { "number": "A-2026-0142", "created": "2026-10-01 10:24:00" } },

    { "id": 2, "type": {"id": 2}, "status": {"id": 1, "name": "Jarayonda"},
      "details": { "0": {"file_type": 1, "status": 2}, "1": {"file_type": 2, "status": 3} },
      "message": "Pasport nusxasini qayta yuklang" },

    { "id": 3, "type": {"id": 3}, "status": {"id": 1, "name": "Jarayonda"},
      "details": { "zoom": { "meet_id": "845 2213 9921", "meet_uuid": "...", "join_url": "https://zoom.us/j/..." } } },

    { "id": 5, "type": {"id": 5}, "status": {"id": 1, "name": "Jarayonda"},
      "details": { "exams": { "exam_name": "...", "exam_type": 0, "status": 1,
                              "created": null, "ended": null, "result": null,
                              "vacancy_application_exam": 7, "id": null } } }
  ]
}
```

- `status.name` va `message` nomzodga to'g'ridan-to'g'ri ko'rsatiladi — foydalanuvchi tilida (`Accept-Language`) qaytsin.
- **2-bosqich:** `details` ichida raqamli kalitlar (`"0"`, `"1"`, ...) — har biri `{file_type, status}`; `file_type` `GET /v1/vacancies/enums` dagi `file_types[].id` ga mos bo'lishi kerak (nomi shu yerdan olinadi). Hujjat rad etilsa nomzod "Hujjat qo'shish" orqali yangisini yuklay oladi (`POST /applications/{id}/files`), sababini `message` ga yozing.
- **3-bosqich:** "Uchrashuvga qo'shilish" bosilganda frontend `POST /v1/vacancies/zoom/check-meet` (`meet_uuid`, `meet_id`) chaqiradi va javobda `error: false` hamda `data.join_url` (yoki `data.start_url`) bo'lsagina Zoom'ni ochadi. Uchrashuv vaqtini hozircha `message` ga yozish kerak (alohida maydon yo'q).
- **5-bosqich (`exams`):**
  - `exam_type`: `0` – onlayn, `1` – oflayn.
  - Onlayn: `status` falsy bo'lsa "Imtihon hali faollashtirilmagan" ko'rinadi. Admin imtihonni faollashtirganda `status` truthy bo'lsin.
  - `created` yo'q → "Imtihonni boshlash" tugmasi: `POST /applications/{id}/exam/start` (`vacancy_application_exam_id` = `vacancy_application_exam`), javobdan `data.vacancy_exam_details.id` olinadi.
  - `created` bor, `ended` yo'q → "Davom ettirish" (`exam.id` yoki `vacancy_application_exam` bilan `/exam` sahifasi ochiladi).
  - Natija (`result`) onlaynda faqat `created` va `ended` bo'lganda, oflaynda esa har doim (agar bor bo'lsa) ko'rsatiladi. Oflayn imtihon natijasini admin kiritadi.
- **4-bosqich:** frontend `details` ni umuman ko'rsatmaydi. Agar admin bu yerda yo'llanma/ma'lumotnoma (fayl, manzil, sana) bermoqchi bo'lsa — `details` formatini kelishib, frontendga qo'shish kerak.

#### Frontend kutadi: `GET /api/v1/vacancies/applications` (ro'yxat)

- Har bir arizada umumiy `status`, `files`, `messages`, `vacancy_position` ishlatiladi. Bosqichlar ro'yxatda ishlatilmaydi.
- "Xabar" tugmasi faqat ariza `status.id !== 1` va `messages` bo'sh bo'lmaganda chiqadi — ya'ni yakuniy qaror (qabul/rad) bilan birga xabar yozilsa nomzod uni kartada ko'radi.

#### Frontend kutadi: `GET /api/v1/vacancies/dashboard`

Profil statistikasi massiv indekslariga bog'langan (`pages/profile/ui/Cards.vue`): `[0]` – Jarayonda, `[1]` – Qabul qilingan, `[2]` – Rad etilgan, `[3]` – Barcha arizalar (har birida `count`). Bosqich o'zgarganda bu sonlar ham yangilanishi kerak.

#### Admin "keyingi bosqichga o'tkazish" amali nima qilishi kerak

1. Joriy bosqichni yopish: `status` = 2 (o'tdi) yoki 3 (o'tmadi), kerak bo'lsa nomzodga `message`.
2. O'tgan bo'lsa — keyingi bosqich yozuvini `status` = 1 bilan yaratish va uning `details` ini to'ldirish (suhbat uchun Zoom, imtihon uchun `exams`). `details` to'liq bo'lmagan bosqichni nomzodga ko'rsatmaslik yoki bo'sh holatini oldindan kelishish kerak.
3. Rad etilsa — keyingi bosqich yaratilmaydi, butun ariza `status` = 3 bo'ladi, sabab `message`/`messages` ga yoziladi.
4. Oxirgi bosqich o'tilsa — butun ariza `status` = 2.
5. Bosqich tartibi `type.id` bo'yicha (1 → 5). Vakansiyada ba'zi bosqichlar bo'lmasligi mumkin (masalan tibbiy ko'riksiz) — frontend mavjud bosqichlarni ko'rsatadi, raqamlashni o'zi qiladi.

#### Tavsiya (hali yo'q)

- Ro'yxat javobiga `current_stage: { type: {id, name}, status: {id, name} }` qo'shish — ariza kartasida "3/5 · Suhbat" kabi joriy bosqichni ko'rsatish uchun (hozir buning uchun har bir ariza tafsilotini alohida so'rash kerak bo'ladi).
- Javobda hali yetib kelinmagan bosqichlar ham kelishi kerakmi yoki faqat o'tilganlar — kelishib olish. Frontend hozir faqat kelgan bosqichlarni chizadi va progressni ular soniga nisbatan hisoblaydi; kelajakdagi bosqichlar ham kelsa (`status` bo'sh holda), progress to'g'riroq chiqadi.
- Suhbat vaqti uchun alohida maydon (`details.zoom.start_time`) — hozir faqat `message` orqali.
- Bosqich o'zgarganda nomzodga SMS/xabarnoma yuborish.
