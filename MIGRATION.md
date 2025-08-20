# Migration Guide

This guide summarizes changes introduced in vNext to modernize the library.

Breaking changes are minimized; follow notes below to update.

## Build & Distribution

- Moved to Vite library mode (ESM-first) with CJS secondary output.
- Types are generated via `vite-plugin-dts` to `dist/types`.
- `exports` field is defined for tree-shaking-friendly resolution.
- `main` (CJS), `module` (ESM) and `types` point to new outputs.

## Engines

- Requires Node >= 18.

## TypeScript

- Stricter `tsconfig`: `strict`, `noUncheckedIndexedAccess`, `moduleResolution: bundler`.
- If you consume types directly, update import paths to rely on the package entrypoint.

## Dev & Preview

- Demo site moved to `vite.site.config.mts`. Use `pnpm dev` for demo and `pnpm build` for library.

## Testing

- Vitest kept; coverage auto-enables on CI via env `CI=true`.

## Stories / Playground

- Added Ladle for fast component previews. Run `pnpm ladle`.

## Styling

- No change in CSS pipeline; Tailwind/PostCSS available via project config.

## Backwards Compatibility

- Public API remains compatible. Import either default ESM or CJS via `require`.


