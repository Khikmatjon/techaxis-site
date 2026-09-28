// Foydalanuvchi haqida brauzerga yuboriladigan maydonlar. Parol xeshi (hash) bu ro'yxatda
// ataylab yo'q: u faqat serverda, kirishda parolni solishtirish uchun o'qiladi.
// "use server" fayllari faqat async funksiya eksport qila oladi, shuning uchun alohida faylda.
export const USER_PUBLIC_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  enrolledCourses: true,
  pendingPayments: true,
  createdAt: true,
  updatedAt: true,
  payments: true,
} as const;
