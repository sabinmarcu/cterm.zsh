import fs from 'node:fs';
import type { ConfigProperties } from '../../types/config.js';
import { getConfig } from '../../utils/getConfig.js';

export const path = getConfig('tmux');
export const enabled = fs.existsSync(path);
export const terminal = !!process.env.TMUX;

export const properties: ConfigProperties = {
  path,
  enabled,
  terminal,
};
