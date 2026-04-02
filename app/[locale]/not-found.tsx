import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/lib/i18n';

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
        {locale === 'uz' ? 'Sahifa topilmadi' : locale === 'ru' ? 'Страница не найдена' : 'Page Not Found'}
      </h2>
      <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md">
        {locale === 'uz' 
          ? 'Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko\'chirilgan.' 
          : locale === 'ru' 
            ? 'Запрашиваемая страница не существует или была перемещена.' 
            : 'The page you are looking for does not exist or has been moved.'}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/20 active:scale-95"
      >
        {locale === 'uz' ? 'Bosh sahifaga qaytish' : locale === 'ru' ? 'Вернуться на главную' : 'Back to Home'}
      </Link>
    </div>
  );
}
