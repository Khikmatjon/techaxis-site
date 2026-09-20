"use server";

import { revalidatePath } from "next/cache";
import { get_session } from "@/lib/session";
import { locales } from "@/lib/i18n";
import { validatePostInput } from "@/lib/blog";
import { loadPosts, savePost, removePost, setPublished, seedDefaultPosts } from "@/lib/blog-store";

// Blog boshqaruvi (admin panel). Loyiha qoidasi: Route Handler emas, Server Actions.
// Har bir harakat avval admin ekanini tekshiradi; kirish ma'lumotlari serverda qayta tekshiriladi.

async function requireAdmin() {
  const session = await get_session();
  if (!session || session.user?.role !== "admin") throw new Error("Unauthorized");
}

function refreshPublicPages(slug?: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}/blog`);
    if (slug) revalidatePath(`/${locale}/blog/${slug}`);
  }
  revalidatePath("/sitemap.xml");
}

export async function getAdminPostsAction() {
  await requireAdmin();
  const { posts, source, error } = await loadPosts();
  return { posts, source, error: error ?? null };
}

export async function savePostAction(id: string | null, input: unknown) {
  await requireAdmin();
  const parsed = validatePostInput(input);
  if (!parsed.ok) return { ok: false as const, error: parsed.error };
  const result = await savePost(id, parsed.value);
  if (result.ok) refreshPublicPages(result.post.slug);
  return result;
}

export async function setPostPublishedAction(id: string, published: boolean) {
  await requireAdmin();
  const result = await setPublished(id, published === true);
  if (result.ok) refreshPublicPages(result.post.slug);
  return result;
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  const result = await removePost(id);
  if (result.ok) refreshPublicPages();
  return result;
}

export async function seedPostsAction() {
  await requireAdmin();
  const result = await seedDefaultPosts();
  if (result.ok) refreshPublicPages();
  return result;
}
