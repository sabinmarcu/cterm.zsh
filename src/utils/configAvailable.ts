import fs from 'node:fs';
import type { Configs } from '../types/config.js';
import { getConfig } from './getConfig.js';

export const configAvailable = (config: Configs) => {
  const configPath = getConfig(config);
  return fs.existsSync(configPath);
};
