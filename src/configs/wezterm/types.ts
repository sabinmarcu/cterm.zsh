import { z } from 'zod';
import type { Color } from '../../types/theme.js';

export type WeztermTheme = {
  colors: {
    ansi: Color[],
    brights: Color[],
    background: Color,
    foreground: Color,
    cursor_bg: Color,
    cursor_border: Color,
    cursor_fg: Color,
    selection_bg: Color,
    selection_fg: Color,
  }
};

export const alacrittyThemeOverrides = z.object({})
