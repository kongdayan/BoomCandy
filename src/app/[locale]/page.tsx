import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-16">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          {t('title')}
        </h1>
        <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400">
          {t('description')}
        </p>
        <div className="flex gap-4">
          <Link href="/" locale="en" className="rounded-full border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
            English
          </Link>
          <Link href="/" locale="zh" className="rounded-full border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
            中文
          </Link>
        </div>
      </main>
    </div>
  );
}
