'use client';

import { useTranslations } from 'next-intl';
import { getGridCols } from '@/lib/gameUtils';
import CandyCell from './CandyCell';

interface BombPlacementProps {
  candyCount: number;
  bombPositions: Set<number>;
  showHandover: boolean;
  onPlaceBomb: (position: number) => void;
  onRemoveBomb: (position: number) => void;
  onConfirm: () => void;
  onHandoverDone: () => void;
}

export default function BombPlacement({
  candyCount,
  bombPositions,
  showHandover,
  onPlaceBomb,
  onRemoveBomb,
  onConfirm,
  onHandoverDone,
}: BombPlacementProps) {
  const t = useTranslations('Game.placement');

  if (showHandover) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <p className="text-2xl font-bold text-white">{t('handoverTitle')}</p>
          <p className="text-lg text-zinc-300">{t('handoverDesc')}</p>
          <button
            onClick={onHandoverDone}
            className="rounded-xl bg-green-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-600"
          >
            {t('ready')}
          </button>
        </div>
      </div>
    );
  }

  const gridCols = getGridCols(candyCount);
  const placed = bombPositions.size;
  const maxBombs = candyCount - 1;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-1 pt-4 pb-2 shrink-0">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          {t('placed', { count: placed })}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 overflow-auto">
        <div className={`grid ${gridCols} gap-2 w-full max-w-4xl`}>
          {Array.from({ length: candyCount }, (_, i) => (
            <CandyCell
              key={i}
              index={i}
              revealed={false}
              isBomb={false}
              placementMode
              isPlaced={bombPositions.has(i)}
              onClick={(idx) => {
                if (bombPositions.has(idx)) {
                  onRemoveBomb(idx);
                } else if (placed < maxBombs) {
                  onPlaceBomb(idx);
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-6 pt-2 shrink-0">
        <button
          onClick={onConfirm}
          disabled={placed < 1}
          className="rounded-xl bg-green-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
}
