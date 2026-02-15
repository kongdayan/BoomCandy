'use client';

import { useReducer, useState, useEffect } from 'react';
import { gameReducer, initialState, loadState, saveState, clearState } from '@/lib/gameReducer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ModeSelect from './ModeSelect';
import SetupScreen from './SetupScreen';
import BombPlacement from './BombPlacement';
import GameBoard from './GameBoard';
import ResultScreen from './ResultScreen';

function getInitialState() {
  if (typeof window === 'undefined') return initialState;
  return loadState() ?? initialState;
}

export default function GameApp() {
  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState);
  const [showHandover, setShowHandover] = useState(false);

  useEffect(() => {
    if (state.phase === 'mode-select') {
      clearState();
    } else {
      saveState(state);
    }
  }, [state]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-black">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <main className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {state.phase === 'mode-select' && (
          <ModeSelect onSelect={(mode) => dispatch({ type: 'SELECT_MODE', mode })} />
        )}

        {state.phase === 'setup' && (
          <SetupScreen
            mode={state.mode!}
            onConfirm={(candyCount, bombCount) =>
              dispatch({ type: 'CONFIGURE', candyCount, bombCount })
            }
          />
        )}

        {state.phase === 'bomb-placement' && (
          <BombPlacement
            candyCount={state.candyCount}
            bombPositions={state.bombPositions}
            showHandover={showHandover}
            onPlaceBomb={(pos) => dispatch({ type: 'PLACE_BOMB', position: pos })}
            onRemoveBomb={(pos) => dispatch({ type: 'REMOVE_BOMB', position: pos })}
            onConfirm={() => setShowHandover(true)}
            onHandoverDone={() => {
              setShowHandover(false);
              dispatch({ type: 'CONFIRM_BOMBS' });
            }}
          />
        )}

        {state.phase === 'playing' && (
          <GameBoard
            state={state}
            onReveal={(pos) => dispatch({ type: 'REVEAL_CANDY', position: pos })}
            onCashOut={() => dispatch({ type: 'CASH_OUT' })}
          />
        )}

        {state.phase === 'result' && state.result && (
          <ResultScreen
            result={state.result}
            reward={state.accumulatedReward}
            onReset={() => dispatch({ type: 'RESET' })}
          />
        )}
      </main>
    </div>
  );
}
