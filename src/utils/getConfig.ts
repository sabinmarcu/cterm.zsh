import path from 'node:path';
import type { Configs } from '../types/index.js';

export const getConfig = (which: Configs) => (
  path.resolve(process.env.XDG_CONFIG_HOME, which)
);
