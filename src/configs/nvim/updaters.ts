import fs from 'node:fs/promises';
import { themes } from '../../import.js';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../types/config.js';

export const configTemplate = (theme: string, plugins: string) => `
pcall(vim.cmd, "colorscheme ${theme}")
return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "${theme}"
    },
  },
  ${plugins}
}
`;

export const getOverride = (theme: string) => {
  const themeObject = themes.get(theme);
  return themeObject?.overrides?.nvim;
};

export const getThemeOverride = (theme: string) => (
  getOverride(theme)?.theme ?? theme
);

export const getPluginsOverride = (theme: string) => (
  getOverride(theme)?.plugins ?? ''
);

export const config: ConfigUpdater = async (theme: string) => {
  await fs.writeFile(
    process.env.NVIM_TERM_THEME,
    configTemplate(getThemeOverride(theme), getPluginsOverride(theme)),
    'utf8',
  );
};

export const updaters: ConfigUpdaters = {
  config,
};
