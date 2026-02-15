'use client';

interface CandyCellProps {
  index: number;
  revealed: boolean;
  isBomb: boolean;
  onClick: (index: number) => void;
  disabled?: boolean;
  // For bomb placement mode
  placementMode?: boolean;
  isPlaced?: boolean;
}

export default function CandyCell({
  index,
  revealed,
  isBomb,
  onClick,
  disabled,
  placementMode,
  isPlaced,
}: CandyCellProps) {
  if (placementMode) {
    return (
      <button
        onClick={() => onClick(index)}
        className={`aspect-square rounded-lg border-2 text-4xl transition-all ${
          isPlaced
            ? 'border-red-400 bg-red-100 dark:bg-red-900/30'
            : 'border-zinc-300 bg-zinc-100 hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-orange-500 dark:hover:bg-zinc-700'
        }`}
      >
        {isPlaced ? '💣' : '🍬'}
      </button>
    );
  }

  if (revealed) {
    return (
      <div
        className={`aspect-square rounded-lg border-2 text-4xl flex items-center justify-center ${
          isBomb
            ? 'border-red-400 bg-red-100 dark:bg-red-900/30'
            : 'border-green-400 bg-green-100 dark:bg-green-900/30'
        }`}
      >
        {isBomb ? '💣' : '✅'}
      </div>
    );
  }

  return (
    <button
      onClick={() => onClick(index)}
      disabled={disabled}
      className="aspect-square rounded-lg border-2 border-zinc-300 bg-zinc-100 text-4xl transition-all hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-amber-500 dark:hover:bg-zinc-700"
    >
      🍬
    </button>
  );
}
