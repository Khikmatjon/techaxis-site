// Oddiy xotira ichidagi rate limiter (production uchun Redis tavsiya etiladi)
// Login urinishlari: 5 ta muvaffaqiyatsiz = 15 daqiqa blok

const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 daqiqa

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remainingMs?: number;
  attemptsLeft?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  // Yangi yoki oyna tugagan
  if (!record || now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now });
    return { allowed: true, attemptsLeft: MAX_ATTEMPTS - 1 };
  }

  // Blok muddati hali tugamagan
  if (record.count >= MAX_ATTEMPTS) {
    const remainingMs = WINDOW_MS - (now - record.firstAttempt);
    return { allowed: false, remainingMs };
  }

  // Urinish qo'shish
  record.count++;
  return { allowed: true, attemptsLeft: MAX_ATTEMPTS - record.count };
}

export function resetRateLimit(identifier: string) {
  loginAttempts.delete(identifier);
}
