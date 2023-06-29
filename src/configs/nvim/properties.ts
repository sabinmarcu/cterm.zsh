import path from 'node:path';
import fs from 'node:fs';
import type { ConfigProperties } from '../../types/config.js';
import { getConfig } from '../../utils/getConfig.js';

export const configPath = getConfig('nvim');
const lazyConfig = path.resolve(configPath, 'lua/config/lazy.lua');
export const enabled = fs.existsSync(configPath) && fs.existsSync(lazyConfig);
export const terminal = false;

export const properties: ConfigProperties = {
  path: configPath,
  enabled,
  terminal,
};
