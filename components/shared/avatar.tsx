// Ismning bosh harflaridan yasalgan avatar. Tashqi xizmatga (pravatar.cc)
// foydalanuvchi emaili yuborilmaydi (avval shunday edi: har safar avatar
// ko'rsatilganda real email pravatar.cc'ga so'rov sifatida ketardi).
export function Avatar({ name, className = "" }: { name: string; className?: string }) {
  const initials =
    (name || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?";
  let hue = 0;
  for (const ch of name || "?") hue = (hue * 31 + ch.charCodeAt(0)) % 360;
  return (
    <div
      className={`flex items-center justify-center font-bold text-white shrink-0 ${className}`}
      style={{ backgroundColor: `hsl(${hue} 55% 38%)` }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
