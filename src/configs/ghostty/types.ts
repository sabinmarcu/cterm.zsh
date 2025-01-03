import { z } from 'zod';
import type { Color } from '../../types/theme.js';

export type GhosttyTheme = {
  colors: {
    palette: Color[],
    background: Color,
    foreground: Color,
    ['cursor-color']: Color,
    ['selection-foreground']: Color,
    ['selection-background']: Color,
  }
};

export type GhosttyMapping = {
  key: string,
  action: string,
};

export const ghosttyThemeOverrides = z.object({});
