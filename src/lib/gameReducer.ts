import { GameState, GameAction } from './types';
import { generateRandomBombs, calculateReward } from './gameUtils';

const STORAGE_KEY = 'boomcandy-state';

export const initialState: GameState = {
  phase: 'mode-select',
  mode: null,
  candyCount: 10,
  bombCount: 1,
  bombPositions: new Set(),
  revealedCandies: new Set(),
  accumulatedReward: 0,
  revealedSafeCount: 0,
  result: null,
};

interface SerializedGameState {
  phase: GameState['phase'];
  mode: GameState['mode'];
  candyCount: number;
  bombCount: number;
  bombPositions: number[];
  revealedCandies: number[];
  accumulatedReward: number;
  revealedSafeCount: number;
  result: GameState['result'];
}

function serialize(state: GameState): string {
  const obj: SerializedGameState = {
    ...state,
    bombPositions: [...state.bombPositions],
    revealedCandies: [...state.revealedCandies],
  };
  return JSON.stringify(obj);
}

function deserialize(json: string): GameState | null {
  try {
    const obj: SerializedGameState = JSON.parse(json);
    return {
      ...obj,
      bombPositions: new Set(obj.bombPositions),
      revealedCandies: new Set(obj.revealedCandies),
    };
  } catch {
    return null;
  }
}

export function saveState(state: GameState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, serialize(state));
  } catch { /* ignore */ }
}

export function loadState(): GameState | null {
  try {
    const json = sessionStorage.getItem(STORAGE_KEY);
    if (!json) return null;
    return deserialize(json);
  } catch {
    return null;
  }
}

export function clearState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_MODE':
      return { ...state, phase: 'setup', mode: action.mode };

    case 'CONFIGURE': {
      const { candyCount, bombCount } = action;
      if (state.mode === 'single') {
        return {
          ...state,
          phase: 'playing',
          candyCount,
          bombCount,
          bombPositions: generateRandomBombs(candyCount, bombCount),
          revealedCandies: new Set(),
          accumulatedReward: 0,
          revealedSafeCount: 0,
          result: null,
        };
      }
      // two-player: go to bomb placement
      return {
        ...state,
        phase: 'bomb-placement',
        candyCount,
        bombCount,
        bombPositions: new Set(),
        revealedCandies: new Set(),
        accumulatedReward: 0,
        revealedSafeCount: 0,
        result: null,
      };
    }

    case 'PLACE_BOMB': {
      if (state.bombPositions.size >= state.candyCount - 1) return state;
      const next = new Set(state.bombPositions);
      next.add(action.position);
      return { ...state, bombPositions: next };
    }

    case 'REMOVE_BOMB': {
      const next = new Set(state.bombPositions);
      next.delete(action.position);
      return { ...state, bombPositions: next };
    }

    case 'CONFIRM_BOMBS':
      return { ...state, phase: 'playing', bombCount: state.bombPositions.size };

    case 'REVEAL_CANDY': {
      if (state.revealedCandies.has(action.position)) return state;
      const revealed = new Set(state.revealedCandies);
      revealed.add(action.position);

      if (state.bombPositions.has(action.position)) {
        return {
          ...state,
          revealedCandies: revealed,
          accumulatedReward: 0,
          result: 'lose',
          phase: 'result',
        };
      }

      const newSafeCount = state.revealedSafeCount + 1;
      const reward = calculateReward();
      return {
        ...state,
        revealedCandies: revealed,
        revealedSafeCount: newSafeCount,
        accumulatedReward: state.accumulatedReward + reward,
      };
    }

    case 'CASH_OUT':
      return { ...state, result: 'win', phase: 'result' };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}
