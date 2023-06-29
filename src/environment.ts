import { z } from 'zod';
import {
  defaultThemeDirectory,
  defaultThemeInputDirectory,
} from './constants.js';
import { alacrittyEnvironment } from './configs/alacritty/environment.js';
import { weztermEnvironment } from './configs/wezterm/environment.js';
import { nvimEnvironment } from './configs/nvim/environment.js';
import { tmuxEnvironment } from './configs/tmux/environment.js';

const toolEnvironment = z.object({
  XDG_CONFIG_HOME: z.string(),
  TERM_THEMES_DIR: z.string().default(
    defaultThemeDirectory,
  ),
  TERM_THEMES_INPUT_DIR: z.string().default(
    defaultThemeInputDirectory,
  ),
});

const environmentVariables = toolEnvironment.extend({
  ...alacrittyEnvironment.shape,
  ...weztermEnvironment.shape,
  ...nvimEnvironment.shape,
  ...tmuxEnvironment.shape,
});

const variables = environmentVariables.parse(process.env);
process.env = { ...process.env, ...variables };

declare global {
  namespace NodeJS {
    interface ProcessEnv // eslint-disable-line unicorn/prevent-abbreviations
      extends z.infer<typeof environmentVariables> { }
  }
}
