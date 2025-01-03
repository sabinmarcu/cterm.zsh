import fs from 'node:fs';
import type {
  ConfigProperties,
} from '../../types/config.js';
import { getConfig } from '../../utils/getConfig.js';

export const path = getConfig('ghostty');
export const enabled = fs.existsSync(getConfig('ghostty'));
export const terminal = Object.keys(process.env)
  .some((it) => it.startsWith('GHOSTTY'));

export const properties: ConfigProperties = {
  path,
  enabled,
  terminal,
};
