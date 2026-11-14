// Admin panelda o'quvchi ro'yxatdan o'tgan sanani ko'rsatish: kun, sana, yil va vaqt (Toshkent vaqti).
// Oy va hafta kunlari qo'lda yozilgan: brauzer tillariga (Intl "uz") bog'liq bo'lmasligi uchun.
const OYLAR = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
const KUNLAR = ["yakshanba", "dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba"];

export type RegDate = {
  /** 14-noyabr 2026 */
  date: string;
  /** 14.11.2026 (qidirish va jadval uchun) */
  short: string;
  /** shanba */
  weekday: string;
  /** 08:55 */
  time: string;
  year: number;
};

export function formatRegDate(value: Date | string | null | undefined): RegDate | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    date: `${day}-${OYLAR[month - 1]} ${year}`,
    short: `${pad(day)}.${pad(month)}.${year}`,
    weekday: KUNLAR[new Date(Date.UTC(year, month - 1, day)).getUTCDay()],
    time: `${pad(get("hour"))}:${pad(get("minute"))}`,
    year,
  };
}
