# 🎯 TechAxis Professional CMS Admin Panel — Qo'llanma

## 📌 Nima Qo'shildi?

**Professional CMS bilan barcha kurs ma'lumotlarini dinamik ravishda boshqarishingiz mumkin:**
- ✅ Kurslar qo'sh/o'zgartir/o'chir
- ✅ Narxlar, chegirma, tavsif — real vaqtda
- ✅ Modullar va darslar — to'liq boshqaruv
- ✅ Hech qanday kod o'zgarish kerak emas
- ✅ Database'dan data o'qish (dynamic)

---

## 🚀 **Qanday Ishlash Kerak?**

### **1️⃣ Admin Panel'ga Kirish**

**URL:** `https://YOUR_DOMAIN/uz/admin-cms` (yoki /ru/en)

**Shart:** Admin roli bo'lishi kerak

---

### **2️⃣ Kurslarni Boshqarish**

#### **A) Kurs Tavsifini O'zgartirish**

1. Kurs kartasidagi **Edit (✏️)** tugmasini bosing
2. Quyidagi maydonlarni o'zgartirasiz:
   - **Sarlavha** — Kurs nomi
   - **Narx USD** — Dollar narxi
   - **Narx UZS** — So'm narxi
   - **Chegirma %** — Chegirma foizi (0-100)
   - **Tavsif** — Kurs tavsifi

3. **"Saqlash"** tugmasini bosing → Avtomatik saqladi

#### **B) Yeni Modul Qo'shish**

1. Kurs'ni expand qiling (▼ tugmasi)
2. **"+ Modul qo'sh"** tugmasini bosing
3. Modul nomini yozib, **"Qo'sh"** bosing

#### **C) Yeni Dars Qo'shish**

1. Modul'ni expand qiling
2. **"+ Dars qo'sh"** tugmasini bosing
3. Dars nomini yozib, **"Qo'sh"** bosing

#### **D) Dars Tafsifatlari (Video, PDF, Matn)**

Dars tasviflarini o'zgartirish uchun:
- API chaqiruv: `PUT /api/admin/lessons/{lessonId}`
- JSON body:
```json
{
  "title": "Dars nomi",
  "duration": "15:30",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "text": "Dars matnini kiritish",
  "isFree": true
}
```

---

### **3️⃣ API Endpoints (Advanced)**

#### **Kurslar**
```
GET    /api/admin/courses              — Barcha kurslar
POST   /api/admin/courses              — Yeni kurs qo'sh
PUT    /api/admin/courses/{id}         — Kursni o'zgartir
DELETE /api/admin/courses/{id}         — Kursni o'chir
```

#### **Modullar**
```
GET    /api/admin/courses/{id}/modules — Modullar ro'yxati
POST   /api/admin/courses/{id}/modules — Modul qo'sh
PUT    /api/admin/modules/{id}         — Modul o'zgartir
DELETE /api/admin/modules/{id}         — Modul o'chir
```

#### **Darslar**
```
GET    /api/admin/modules/{id}/lessons — Darslar ro'yxati
POST   /api/admin/modules/{id}/lessons — Dars qo'sh
PUT    /api/admin/lessons/{id}         — Dars o'zgartir
DELETE /api/admin/lessons/{id}         — Dars o'chir
```

---

## 🗄️ **Database Schema**

Hozir quyidagi jadvallar mavjud:

```
Courses
├── id (UUID)
├── title (VARCHAR)
├── price (INT)
├── discountPercent (INT)
├── priceUZS (INT)
├── isActive (BOOLEAN)
└── modules → Modules
    └── lessons → Lessons
```

---

## 📊 **Narxlarni O'zgartirishning Misoli**

### **Admin Panel dan:**
1. Kurs'ni toping
2. ✏️ Edit bosing
3. "Narx USD" o'rniga `79` yozasiz (buv SOLIDWORKS)
4. "Chegirma %"ga `20` qo'yasiz (20% chegirma)
5. "Saqlash" bosing ✅

**Natija:** 
- Sayt avtomatik o'zgaradi
- Eski narx $99 → Yangi $79
- 20% chegirma qo'llandi

---

## 🔐 **Xavfsizlik**

- ✅ Faqat **admin** role'ga kirish mumkin
- ✅ Session tekshiriladi
- ✅ Barcha o'zgarishlar **database'ga** saqlanadi
- ✅ Hech qanday .env o'zgarish kerak emas

---

## 🐛 **Muammolar Yuz Berganda**

### **Error: "Unauthorized"**
- Admin sifatida login qilingani tekshiring
- Session expire bo'lgan bo'lsa, login qilib turing

### **Error: "Failed to fetch"**
- Internet ulanishni tekshiring
- API server ishlab turganini tekshiring

### **Dars o'zgartirmasni ko'rsatmadi**
- `PUT /api/admin/lessons/{id}` endpoint dan json jo'natishingiz kerak
- Admin panel'dan faqat qo'sh/o'chir mumkin (edit uchun API kerak)

---

## 📈 **Keyingi Qadam — Kengaytirish**

Agar kerak bo'lsa:
- [ ] Dars tavsiflarini admin panel'dan to'g'ridan-to'g'ri o'zgartirish
- [ ] Video/PDF/Rasm upload qilish
- [ ] Kurs kategoriyalari
- [ ] Tahlillar (qancha odam sotuvlari, reyting)
- [ ] Bulk import/export

---

## 📞 **Savollar?**

Hali nima tushunsiz bo'lsa:
1. Bu fayl'ni qaytadan o'qing
2. `/api/admin/*` endpoints'ni test qiling (Postman/cURL)
3. Admin panel'dagi xatalari console'da ko'ring (F12)

---

**✨ Hammasi tayyor! Admin panel'ga kiring va boshqarni! 🚀**
