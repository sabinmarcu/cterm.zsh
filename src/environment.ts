import { z } from 'zod';
import {
  defaultMappingDirectory,
  defaultMappingInput,
  defaultThemeDirectory,
  defaultThemeInputDirectory,
} from './constants.js';
import { alacrittyEnvironment } from './configs/alacritty/environment.js';
import { weztermEnvironment } from './configs/wezterm/environment.js';
import { nvimEnvironment } from './configs/nvim/environment.js';
import { tmuxEnvironment } from './configs/tmux/environment.js';

const toolEnvironment = z.object({
  XDG_CONFIG_HOME: z.string().optional(),
  HOME: z.string(),
  TERM_THEME: z.string().optional(),
  TERM_THEMES_DIR: z.string().default(
    defaultThemeDirectory,
  ),
  TERM_THEMES_INPUT_DIR: z.string().default(
    defaultThemeInputDirectory,
  ),
  TERM_KEYMAPS_DIR: z.string().default(
    defaultMappingDirectory,
  ),
  TERM_KEYMAPS_INPUT: z.string().default(
    defaultMappingInput,
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
