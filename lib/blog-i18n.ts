import type { BlogPost } from "@/lib/blog";
import { BLOG_TARJIMA } from "@/content/blog-tarjima";
import { asLoc } from "@/lib/locale-text";

// Maqolani joriy tilga o'giradi (tarjimalar content/blog-tarjima.ts da). Tarjima yo'q bo'lsa
// yoki o'zbekcha sarlavha/tavsif tarjimadan keyin o'zgargan bo'lsa -- maqola o'zbekcha qoladi
// va translated = false (sahifa "faqat o'zbek tilida" deb yozadi, canonical -> /uz).
export function localizePost(post: BlogPost, locale: string): BlogPost & { translated: boolean } {
  const loc = asLoc(locale);
  if (loc === "uz") return { ...post, translated: true };
  const tr = BLOG_TARJIMA[post.slug];
  if (!tr || tr.manba.title !== post.title || tr.manba.excerpt !== post.excerpt) return { ...post, translated: false };
  return { ...post, ...tr[loc], translated: true };
}
