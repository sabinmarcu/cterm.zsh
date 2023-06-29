import fs from 'node:fs/promises';
import { themes } from '../../import.js';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../types/config.js';

export const configTemplate = (theme: string) => `
pcall(vim.cmd, "colorscheme ${theme}")
return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "${theme}"
    }
  },
}
`;

export const getOverride = (theme: string) => {
  const themeObject = themes.get(theme);
  return themeObject?.overrides?.nvim?.theme ?? theme;
};

export const config: ConfigUpdater = async (theme: string) => {
  await fs.writeFile(
    process.env.NVIM_TERM_THEME,
    configTemplate(getOverride(theme)),
    'utf8',
  );
};

export const updaters: ConfigUpdaters = {
  config,
};
