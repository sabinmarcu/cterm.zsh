import fs from 'node:fs';
import type { ConfigProperties } from '../../types/config.js';
import { getConfig } from '../../utils/getConfig.js';

export const terminal = Object.keys(process.env)
  .some((it) => it.startsWith('ALACRITTY'));
export const path = getConfig('alacritty');
export const enabled = fs.existsSync(getConfig('alacritty'));

export const properties: ConfigProperties = {
  terminal,
  path,
  enabled,
};
