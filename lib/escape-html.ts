// Foydalanuvchi yozgan matnni HTML ichiga xavfsiz qo'yish uchun (Telegram HTML xabarlari,
// email). Tozalanmasa: "<" yoki "&" belgisi Telegram'ni xatoga olib keladi va xabar
// yo'qoladi, yoki matn ichidagi teg (masalan havola) xabarga "o'rnatib" yuboriladi.
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
