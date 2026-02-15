'use client';

import { useTranslations } from 'next-intl';
import { GameResult } from '@/lib/types';

interface ResultScreenProps {
  result: GameResult;
  reward: number;
  onReset: () => void;
}

export default function ResultScreen({ result, reward, onReset }: ResultScreenProps) {
  const t = useTranslations('Game.result');

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-6xl">{result === 'win' ? '🎉' : '💥'}</div>

      <h2 className="text-3xl font-bold">
        {result === 'win' ? t('winTitle') : t('loseTitle')}
      </h2>

      {result === 'win' && (
        <p className="text-2xl font-semibold text-amber-500">
          {t('finalReward', { amount: reward })}
        </p>
      )}

      <div className="max-w-md rounded-xl bg-zinc-100 p-6 text-center dark:bg-zinc-800">
        <p className="text-lg font-medium">
          {result === 'win' ? t('winMessage') : t('loseMessage')}
        </p>
      </div>

      <div className="max-w-md rounded-xl border border-amber-300 bg-amber-50 p-4 text-center dark:border-amber-700 dark:bg-amber-900/20">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          {t('education')}
        </p>
      </div>

      <button
        onClick={onReset}
        className="rounded-xl bg-amber-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-amber-600 active:bg-amber-700"
      >
        {t('playAgain')}
      </button>
    </div>
  );
}
