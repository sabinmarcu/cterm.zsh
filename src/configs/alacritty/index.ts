import type { Config } from '../../types/config.js';
import { properties } from './properties.js';
import { theme } from './theme/theme.js';
import type {
  AlacrittyMapping,
  AlacrittyTheme,
} from './types.js';
import { updaters } from './theme/updaters.js';
import { mapping } from './mappings/index.js';

export const AlacrittyConfig = {
  theme,
  properties,
  updaters,
  mapping,
} satisfies Config<AlacrittyTheme, AlacrittyMapping>;
