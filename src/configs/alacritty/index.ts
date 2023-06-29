import type { Config } from '../../types/config.js';
import { properties } from './properties.js';
import { theme } from './theme.js';
import type { AlacrittyTheme } from './types.js';
import { updaters } from './updaters.js';

export const AlacrittyConfig = {
  theme,
  properties,
  updaters,
} satisfies Config<AlacrittyTheme>;
