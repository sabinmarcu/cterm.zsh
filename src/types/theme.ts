import { z } from 'zod';
import { alacrittyThemeOverrides } from '../configs/alacritty/types.js';
import { weztermThemeOverrides } from '../configs/wezterm/types.js';
import { nvimThemeOverrides } from '../configs/nvim/types.js';
import { tmuxThemeOverrides } from '../configs/tmux/types.js';

export const colorSchema = z.string().length(7).regex(/^#/);

export type Color = z.infer<typeof colorSchema>;

export const colorsSchema = z.object({
  black: colorSchema,
  red: colorSchema,
  green: colorSchema,
  yellow: colorSchema,
  blue: colorSchema,
  magenta: colorSchema,
  cyan: colorSchema,
  white: colorSchema,
});

export type Colors = z.infer<typeof colorsSchema>;

export const themeSchema = z.object({
  colors: z.object({
    normal: colorsSchema,
    bright: colorsSchema,
    background: colorSchema,
    foreground: colorSchema,
    cursor: colorSchema,
  }),
  overrides: z.object({
    wezterm: weztermThemeOverrides.optional(),
    alacritty: alacrittyThemeOverrides.optional(),
    nvim: nvimThemeOverrides.optional(),
    tmux: tmuxThemeOverrides.optional(),
  }).optional(),
});

export type Theme = z.infer<typeof themeSchema>;
