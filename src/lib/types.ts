export type GamePhase = 'mode-select' | 'setup' | 'bomb-placement' | 'playing' | 'result';
export type GameMode = 'single' | 'two-player';
export type GameResult = 'win' | 'lose';

export interface GameState {
  phase: GamePhase;
  mode: GameMode | null;
  candyCount: number;
  bombCount: number;
  bombPositions: Set<number>;
  revealedCandies: Set<number>;
  accumulatedReward: number;
  revealedSafeCount: number;
  result: GameResult | null;
}

export type GameAction =
  | { type: 'SELECT_MODE'; mode: GameMode }
  | { type: 'CONFIGURE'; candyCount: number; bombCount: number }
  | { type: 'PLACE_BOMB'; position: number }
  | { type: 'REMOVE_BOMB'; position: number }
  | { type: 'CONFIRM_BOMBS' }
  | { type: 'REVEAL_CANDY'; position: number }
  | { type: 'CASH_OUT' }
  | { type: 'RESET' };
