import fs from 'node:fs';
import type {
  ConfigProperties,
} from '../../types/config.js';
import { getConfig } from '../../utils/getConfig.js';

export const path = getConfig('wezterm');
export const enabled = fs.existsSync(getConfig('wezterm'));
export const terminal = Object.keys(process.env)
  .some((it) => it.startsWith('WEZTERM'));

export const properties: ConfigProperties = {
  path,
  enabled,
  terminal,
};
