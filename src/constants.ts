import { fileURLToPath } from 'node:url';

export const defaultThemeDirectory = fileURLToPath(
  new URL('../out', import.meta.url),
);

export const defaultThemeInputDirectory = fileURLToPath(
  new URL('../themes', import.meta.url),
);
