// app/icon.svg dan app/favicon.ico yasaydi (16, 32, 48 px; ICO ichida PNG).
// Belgi o'zgarsa qayta ishga tushiring:  node scripts/make-favicon.mjs
// Zamonaviy brauzerlar icon.svg ni ishlatadi; favicon.ico -- eski brauzer va botlar uchun
// (ular faviconni har doim /favicon.ico dan so'raydi).
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync(new URL("../app/icon.svg", import.meta.url));
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer()));

// ICO: 6 bayt sarlavha + har rasm uchun 16 bayt katalog + PNG ma'lumotlari.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // turi: ikonka
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); // kenglik
  e.writeUInt8(s, 1); // balandlik
  e.writeUInt8(0, 2); // palitra yo'q
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bit/piksel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
const ico = Buffer.concat([header, ...entries, ...pngs]);
writeFileSync(new URL("../app/favicon.ico", import.meta.url), ico);
console.log(`app/favicon.ico: ${sizes.join(", ")} px, ${ico.length} bayt`);
