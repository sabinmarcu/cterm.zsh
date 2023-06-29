import fs from 'node:fs/promises';
import path from 'node:path';
import { execa } from 'execa';
import { themes } from '../../import.js';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../types/config.js';
import { terminal } from './properties.js';
import { getConfig } from '../../utils/getConfig.js';

export const configTemplate = (
  color: string,
  plugin: string,
  extras: string,
) => `
set -g @tmux_power_theme '${color}'
set -g @plugin '${plugin}'
${extras}
`;

export const getOverride = (theme: string) => {
  const themeObject = themes.get(theme);
  return themeObject?.overrides?.tmux;
};

export const getPlugin = (theme: string) => (
  getOverride(theme)?.plugin || 'wfxr/tmux-power'
);

export const getColor = (theme: string) => (
  getOverride(theme)?.color
  || themes.get(theme)?.colors.normal.cyan
  || 'cyan'
);

export const getExtras = (theme: string) => (
  getOverride(theme)?.extras || ''
);

export const config: ConfigUpdater = async (theme: string) => {
  await fs.writeFile(
    process.env.TMUX_TERM_THEME,
    configTemplate(
      getColor(theme),
      getPlugin(theme),
      getExtras(theme),
    ),
    'utf8',
  );
  if (terminal) {
    await execa(
      'tmux',
      [
        'source-file',
        path.resolve(getConfig('tmux'), 'tmux.conf'),
      ],
    );
  }
};

export const updaters: ConfigUpdaters = {
  config,
};
