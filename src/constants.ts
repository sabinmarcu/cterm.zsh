import path from 'node:path';

export const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME || '~/.config';
export const defaultOutDirectory = path.resolve(process.env.HOME, '.cterm_config');

export const defaultInDirectory = path.resolve(XDG_CONFIG_HOME, 'cterm');
export const defaultThemeDirectory = path.resolve(defaultOutDirectory, 'themes');

export const defaultThemeInputDirectory = path.resolve(defaultInDirectory, 'themes');

export const defaultMappingDirectory = path.resolve(defaultOutDirectory, 'mappings');

export const defaultMappingInput = path.resolve(defaultInDirectory, 'mappings.yml');
