import type { Config } from '../../types/config.js';
import { updaters } from './updaters.js';
import { properties } from './properties.js';

export const TmuxConfig = {
  properties,
  updaters,
} satisfies Config<any>;
