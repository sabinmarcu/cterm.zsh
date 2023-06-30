import fs from 'node:fs/promises';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../../types/config.js';
import { getConfigOutputPath } from '../../../utils/getOutputPath.js';

const configTemplate = (path: string, theme: string) => `
import: 
  - ${path}/${theme}.yml
`.trim();

export const config: ConfigUpdater = async (theme) => {
  await fs.writeFile(
    process.env.ALACRITTY_TERM_THEME,
    configTemplate(getConfigOutputPath('alacritty'), theme),
    'utf8',
  );
};

export const updaters: ConfigUpdaters = {
  config,
};
