import { z } from 'zod';
import path from 'node:path';
import { getConfig } from '../../utils/getConfig.js';

export const defaultAlacrittyThemeLocation = path.resolve(getConfig('alacritty'), 'theme.yml');
export const alacrittyEnvironment = z.object({
  ALACRITTY_TERM_THEME: z.string().default(
    defaultAlacrittyThemeLocation as string,
  ),
});
