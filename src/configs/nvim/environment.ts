import { z } from 'zod';
import path from 'node:path';
import { getConfig } from '../../utils/getConfig.js';

export const defaultNVimThemeLocation = path.resolve(getConfig('nvim'), 'lua/plugins/theme.lua');
export const nvimEnvironment = z.object({
  NVIM_TERM_THEME: z.string().default(
    defaultNVimThemeLocation as string,
  ),
});
