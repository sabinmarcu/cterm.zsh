import { z } from 'zod';
import path from 'node:path';
import { getConfig } from '../../utils/getConfig.js';

export const defaultAlacrittyThemeLocation = path.resolve(getConfig('alacritty'), 'theme.yml');
export const defaultAlacrittyMappingLocation = path.resolve(getConfig('alacritty'), 'keymap.yml');
export const alacrittyEnvironment = z.object({
  ALACRITTY_TERM_THEME: z.string().default(
    defaultAlacrittyThemeLocation,
  ),
  ALACRITTY_TERM_KEYMAP: z.string().default(
    defaultAlacrittyMappingLocation,
  ),
});
