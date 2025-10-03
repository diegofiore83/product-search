# Senior Frontend Take‑Home

Evaluate problem solving with React + TS, API data, search UX, and performance.

## Stack

- Vite + React + TypeScript
- React Router
- React Query
- Material UI

## Run it

```bash
npm i
npm run dev
```

## Your tasks

1. **Wire up search** over the loaded cards (name + stadium).
2. Add **debounce** (250–400ms) to reduce re-renders while typing.
3. Memoize filtering and guard against unnecessary renders.
4. Sync search to the URL as `?q=...`.
5. (Optional) Add tests for the hook and filtering logic.

### Hints

- Create `useDebouncedValue`.
- `useMemo` + `useDeferredValue` can smooth the UI.
- Keep server data and derived state separate.

### What we’ll look for

- Clean TypeScript types & props
- Reasonable abstractions (hooks/components)
- Accessibility (input labeling, keyboard)
- Performance thinking (debounce, memoization, render keys)
- Code clarity and comments where helpful
