'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface SetupScreenProps {
  mode: 'single' | 'two-player';
  onConfirm: (candyCount: number, bombCount: number) => void;
}

const CANDY_OPTIONS = [10, 20, 50];

export default function SetupScreen({ mode, onConfirm }: SetupScreenProps) {
  const t = useTranslations('Game.setup');
  const [candyCount, setCandyCount] = useState(10);
  const [bombCount, setBombCount] = useState(Math.round(10 * 0.3));

  const maxBombs = candyCount - 1;

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold">{t('title')}</h2>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
            {t('candyCount')}
          </label>
          <div className="flex gap-2">
            {CANDY_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setCandyCount(n);
                  setBombCount(Math.round(n * 0.3));
                }}
                className={`flex-1 rounded-lg px-4 py-3 text-lg font-semibold transition-colors ${
                  candyCount === n
                    ? 'bg-amber-500 text-white'
                    : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {mode === 'single' && (
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400">
              {t('bombCount')} (1 - {maxBombs})
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setBombCount((p) => Math.max(1, p - 1))}
                className="rounded-lg bg-zinc-200 px-4 py-2 text-xl font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                -
              </button>
              <span className="text-3xl font-bold w-12 text-center">{bombCount}</span>
              <button
                onClick={() => setBombCount((p) => Math.min(maxBombs, p + 1))}
                className="rounded-lg bg-zinc-200 px-4 py-2 text-xl font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                +
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => onConfirm(candyCount, mode === 'single' ? bombCount : 0)}
          className="rounded-xl bg-green-500 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-600 active:bg-green-700"
        >
          {t('start')}
        </button>
      </div>
    </div>
  );
}
