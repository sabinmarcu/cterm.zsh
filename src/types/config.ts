import { z } from 'zod';
import type { Theme } from './theme.js';
import type {
  KeyMap,
  Mapping,
  Modifiers,
} from './mapping.js';

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

export type ConfigKeyMap = Record<KeyMap, string>;
export type ConfigKeyMapper = (input: string) => string;
export type ConfigModifierMap = Record<Modifiers, string>;
export type ConfigMappingMap = {
  key: ConfigKeyMap,
  modifier: ConfigModifierMap
  mapper?: ConfigKeyMapper,
};

export type ConfigMapperTransformer<T extends Record<string, any>> = (
  input: Mapping
) => T;

export type ConfigMapperRenderer<T extends Record<string, any>> = (
  input: T[]
) => string;

export type ConfigMapperUpdater = () => Promise<void>;

export type ConfigMapping<T extends Record<string, any>> = {
  maps: ConfigMappingMap,
  mapper: ConfigMapperTransformer<T>,
  renderer: ConfigMapperRenderer<T>,
  updater: ConfigMapperUpdater,
  extension: string,
};

export type ConfigProperties = {
  terminal: boolean,
  enabled: boolean,
  path: string,
};

export type ConfigUpdaters = {
  config: ConfigUpdater,
};

export type Config<
  InputTheme extends Record<string, any> = {},
  InputMapping extends Record<string, any> = {},
> = {
  properties: ConfigProperties,
  updaters: ConfigUpdaters,
  theme?: ConfigTheme<InputTheme>
  mapping?: ConfigMapping<InputMapping>,
};

export const configSchema = z.union([
  z.literal('wezterm'),
  z.literal('alacritty'),
  z.literal('nvim'),
  z.literal('tmux'),
]);

export type Configs = z.infer<typeof configSchema>;
