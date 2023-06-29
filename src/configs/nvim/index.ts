import type { Config } from '../../types/config.js';
import { updaters } from './updaters.js';
import { properties } from './properties.js';

export const NVimConfig = {
  properties,
  updaters,
} satisfies Config<any>;
