import type {
  Config,
  Configs,
} from '../types/config.js';
import { AlacrittyConfig } from './alacritty/index.js';
import { GhosttyConfig } from './ghostty/index.js';
import { NVimConfig } from './nvim/index.js';
import { TmuxConfig } from './tmux/index.js';
import { WeztermConfig } from './wezterm/index.js';

export const allConfigs = {
  wezterm: WeztermConfig,
  alacritty: AlacrittyConfig,
  nvim: NVimConfig,
  tmux: TmuxConfig,
  ghostty: GhosttyConfig,
} as const satisfies Record<Configs, Config<any, any>>;

export const configs = Object.fromEntries(
  Object.entries(allConfigs)
    .filter(([, { properties: { enabled } }]) => enabled),
) as typeof allConfigs;
