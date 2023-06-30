import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const defaultOutDirectory = fileURLToPath(
  new URL('../out', import.meta.url),
);

export const defaultInDirectory = fileURLToPath(
  new URL('../config', import.meta.url),
);

export const defaultThemeDirectory = path.resolve(defaultOutDirectory, 'themes');

export const defaultThemeInputDirectory = path.resolve(defaultInDirectory, 'themes');

export const defaultMappingDirectory = path.resolve(defaultOutDirectory, 'mappings');

export const defaultMappingInput = path.resolve(defaultInDirectory, 'mappings.yml');
