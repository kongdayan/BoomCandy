export function generateRandomBombs(candyCount: number, bombCount: number): Set<number> {
  const positions = new Set<number>();
  while (positions.size < bombCount) {
    positions.add(Math.floor(Math.random() * candyCount));
  }
  return positions;
}

export function getGridCols(candyCount: number): string {
  switch (candyCount) {
    case 10: return 'grid-cols-5';
    case 20: return 'grid-cols-5';
    case 50: return 'grid-cols-10';
    default: return 'grid-cols-5';
  }
}

export function calculateReward(): number {
  return 100;
}
