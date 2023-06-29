import { z } from 'zod';
import type { Theme } from './theme.js';

export type ConfigTransformer<T extends Record<string, any>> = (
  input: Theme,
) => T;

export type ConfigRenderer<T extends Record<string, any>> = (
  input: T,
) => string;

export type ConfigFileResolver = (theme: string) => string;
export type ConfigUpdater = (theme: string) => Promise<void>;

export type ConfigTheme<T extends Record<string, any>> = {
  transformer: ConfigTransformer<T>,
  renderer: ConfigRenderer<T>,
  fileResolver: ConfigFileResolver,
};

export type ConfigProperties = {
  terminal: boolean,
  enabled: boolean,
  path: string,
};

export type ConfigUpdaters = {
  auto?: ConfigUpdater,
  config: ConfigUpdater,
};

export type ConfigProcess<T extends Record<string, any> = {}> = {
  theme: ConfigTheme<T>,
};

export type Config<T extends Record<string, any> = {}> = {
  properties: ConfigProperties,
  updaters: ConfigUpdaters,
  theme?: ConfigTheme<T>
};

export const configSchema = z.union([
  z.literal('wezterm'),
  z.literal('alacritty'),
  z.literal('nvim'),
  z.literal('tmux'),
]);

export type Configs = z.infer<typeof configSchema>;
