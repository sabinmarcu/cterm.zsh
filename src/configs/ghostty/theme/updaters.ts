import fs from 'node:fs/promises';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../../types/config.js';
import { getConfigOutputPath } from '../../../utils/getOutputPath.js';

const configTemplate = (theme: string) => `
config-file = "?${getConfigOutputPath('ghostty')}/${theme}"
`.trim();

export const config: ConfigUpdater = async (theme) => {
  await fs.writeFile(
    process.env.GHOSTTY_TERM_THEME,
    configTemplate(theme),
    'utf8',
  );
};

export const updaters: ConfigUpdaters = {
  config,
};
