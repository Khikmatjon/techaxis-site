import { createClient } from "@supabase/supabase-js";

// Agar bu muhit o'zgaruvchilari yo'q bo'lsa xato bermasligi uchun qisqa tekshiruv
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aovaqntrhpxbwmtohyiy.supabase.co"; 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
