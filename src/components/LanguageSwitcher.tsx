'use client';

import { Link } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  return (
    <div className="flex gap-2">
      <Link
        href="/"
        locale="en"
        className="rounded-full border border-zinc-300 px-3 py-1 text-xs transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        English
      </Link>
      <Link
        href="/"
        locale="zh"
        className="rounded-full border border-zinc-300 px-3 py-1 text-xs transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        中文
      </Link>
    </div>
  );
}
