'use client';

import { useTranslations } from 'next-intl';
import { GameMode } from '@/lib/types';

interface ModeSelectProps {
  onSelect: (mode: GameMode) => void;
}

export default function ModeSelect({ onSelect }: ModeSelectProps) {
  const t = useTranslations('Game.modeSelect');

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
      <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400">
        {t('description')}
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => onSelect('single')}
          className="rounded-xl bg-amber-500 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-amber-600 active:bg-amber-700"
        >
          {t('single')}
        </button>
        <button
          onClick={() => onSelect('two-player')}
          className="rounded-xl bg-purple-500 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-600 active:bg-purple-700"
        >
          {t('twoPlayer')}
        </button>
      </div>
    </div>
  );
}
