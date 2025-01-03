import { properties } from './properties.js';
import { updaters } from './theme/updaters.js';
import { theme } from './theme/theme.js';
import type { Config } from '../../types/config.js';
import type {
  GhosttyMapping,
  GhosttyTheme,
} from './types.js';
import { mapping } from './mappings/index.js';

export const GhosttyConfig = {
  theme,
  properties,
  updaters,
  mapping,
} satisfies Config<GhosttyTheme, GhosttyMapping>;
