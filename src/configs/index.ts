import type {
  Config,
  Configs,
} from '../types/config.js';
import { AlacrittyConfig } from './alacritty/index.js';
import { NVimConfig } from './nvim/index.js';
import { TmuxConfig } from './tmux/index.js';
import { WeztermConfig } from './wezterm/index.js';

export const allConfigs = {
  wezterm: WeztermConfig,
  alacritty: AlacrittyConfig,
  nvim: NVimConfig,
  tmux: TmuxConfig,
} as const satisfies Record<Configs, Config<any>>;

export const configs = Object.fromEntries(
  Object.entries(allConfigs)
    .filter(([, { properties: { enabled } }]) => enabled),
) as typeof allConfigs;
