import fs from 'node:fs/promises';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../../types/config.js';
import { pathFragment } from '../pathFragment.js';

const configTemplate = (theme: string) => `
${pathFragment()}

return function(config, override)
  local colors = require('themes.wezterm.' .. '${theme}')
  config.colors = colors
end
`.trim();

export const config: ConfigUpdater = async (theme) => {
  await fs.writeFile(
    process.env.WEZTERM_TERM_THEME,
    configTemplate(theme),
    'utf8',
  );
};

export const updaters: ConfigUpdaters = {
  config,
};
