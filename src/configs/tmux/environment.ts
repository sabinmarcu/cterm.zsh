import { z } from 'zod';
import path from 'node:path';
import { getConfig } from '../../utils/getConfig.js';

export const defaultTmuxThemeLocation = path.resolve(
  getConfig('tmux'),
  'theme.conf',
);
export const tmuxEnvironment = z.object({
  TMUX_TERM_THEME: z.string().default(
    defaultTmuxThemeLocation as string,
  ),
});
