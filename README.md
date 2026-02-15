# BoomCandy (炸弹糖)

An educational game about the risks of gambling. Pick candies to earn rewards — but watch out for hidden bombs!

## Game Modes

- **Single Player** — System randomly places bombs. Pick candies (+100 points each), cash out anytime, or risk hitting a bomb and losing everything.
- **Two Players** — Player 1 chooses candy count and freely places any number of bombs on the grid. After a handover screen, Player 2 plays without knowing where the bombs are.

## Tech Stack

- **Next.js 16** + **React 19**
- **next-intl** for i18n (English / Chinese)
- **Tailwind CSS 4** for styling
- **Cloudflare Pages** ready

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to play.

## Deploy to Cloudflare Pages

```bash
pnpm pages:build
npx wrangler pages deploy .vercel/output/static --project-name=boomcandy
```

## Project Structure

```
src/
  lib/
    types.ts            # Game type definitions
    gameReducer.ts      # useReducer state machine
    gameUtils.ts        # Utility functions
  components/
    LanguageSwitcher.tsx # Language toggle
    game/
      GameApp.tsx       # Top-level orchestrator
      ModeSelect.tsx    # Mode selection screen
      SetupScreen.tsx   # Game setup (candy/bomb count)
      BombPlacement.tsx # Two-player bomb placement
      GameBoard.tsx     # Main game grid
      ResultScreen.tsx  # Win/lose result + anti-gambling education
      CandyCell.tsx     # Individual candy cell
messages/
  en.json               # English translations
  zh.json               # Chinese translations
```
