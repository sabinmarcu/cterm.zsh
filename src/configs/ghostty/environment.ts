import { z } from 'zod';
import path from 'node:path';
import { getConfig } from '../../utils/getConfig.js';

export const defaultGhosttyThemeLocation = path.resolve(getConfig('ghostty'), 'theme');
export const defaultGhosttyMappingLocation = path.resolve(getConfig('ghostty'), 'keymap');
export const ghosttyEnvironment = z.object({
  GHOSTTY_TERM_THEME: z.string().default(
    defaultGhosttyThemeLocation,
  ),
  GHOSTTY_TERM_KEYMAP: z.string().default(
    defaultGhosttyMappingLocation,
  ),
});
