'use client';

import { useTranslations } from 'next-intl';
import { GameState } from '@/lib/types';
import { getGridCols } from '@/lib/gameUtils';
import CandyCell from './CandyCell';

interface GameBoardProps {
  state: GameState;
  onReveal: (position: number) => void;
  onCashOut: () => void;
}

export default function GameBoard({ state, onReveal, onCashOut }: GameBoardProps) {
  const t = useTranslations('Game.board');
  const gridCols = getGridCols(state.candyCount);
  const safeCount = state.candyCount - state.bombCount;
  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-1 pt-4 pb-2 shrink-0">
        <p className="text-3xl font-bold text-amber-500">
          {t('reward')}: {state.accumulatedReward}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t('safe')}: {state.revealedSafeCount}/{safeCount}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 overflow-auto">
        <div className={`grid ${gridCols} gap-2 w-full max-w-4xl`}>
          {Array.from({ length: state.candyCount }, (_, i) => (
            <CandyCell
              key={i}
              index={i}
              revealed={state.revealedCandies.has(i)}
              isBomb={state.bombPositions.has(i)}
              onClick={onReveal}
            />
          ))}
        </div>
      </div>

      {state.revealedSafeCount > 0 && (
        <div className="flex justify-center pb-6 pt-2 shrink-0">
          <button
            onClick={onCashOut}
            className="rounded-xl bg-green-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-600 active:bg-green-700 animate-pulse"
          >
            {t('cashOut')} ({state.accumulatedReward})
          </button>
        </div>
      )}
    </div>
  );
}
