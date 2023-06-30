import { z } from 'zod';
import type {
  Color,
  Colors,
} from '../../types/theme.js';

export type AlacrittyTheme = {
  colors: {
    primary: {
      background: Color,
      foreground: Color,
    },
    normal: Colors,
    bright: Colors,
  }
};

export type AlacrittyMapping = {
  key: string,
  mods: string,
  chars: string,
};

export const alacrittyThemeOverrides = z.object({});
