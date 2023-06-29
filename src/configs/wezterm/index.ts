import { properties } from './properties.js';
import { updaters } from './updaters.js';
import { theme } from './theme.js';
import type { Config } from '../../types/config.js';
import type { WeztermTheme } from './types.js';

export const WeztermConfig = {
  theme,
  properties,
  updaters,
} satisfies Config<WeztermTheme>;
