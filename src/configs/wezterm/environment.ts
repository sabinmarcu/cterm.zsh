import { z } from 'zod';
import path from 'node:path';
import { getConfig } from '../../utils/getConfig.js';

export const defaultWeztermThemeLocation = path.resolve(getConfig('wezterm'), 'theme.lua');
export const defaultWeztermMappingLocation = path.resolve(getConfig('wezterm'), 'keymap.lua');
export const weztermEnvironment = z.object({
  WEZTERM_TERM_THEME: z.string().default(
    defaultWeztermThemeLocation,
  ),
  WEZTERM_TERM_KEYMAP: z.string().default(
    defaultWeztermMappingLocation,
  ),
});
