import path from 'node:path';
import type { Configs } from '../types/index.js';
import { XDG_CONFIG_HOME } from '../constants.js';

export const getConfig = (which: Configs) => (
  path.resolve(XDG_CONFIG_HOME, which)
);
