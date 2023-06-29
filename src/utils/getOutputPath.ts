import path from 'node:path';
import { mkdirp } from 'mkdirp';
import type {
  ConfigFileResolver,
  Configs,
} from '../types/config.js';

export const getConfigOutputPath = (config: Configs) => (
  path.resolve(process.env.TERM_THEMES_DIR, config)
);

export const getOutputPath = async (
  config: Configs,
  find: ConfigFileResolver,
  theme: string,
) => {
  const fileName = find(theme);
  const configDirectory = getConfigOutputPath(config);
  await mkdirp(configDirectory);
  return path.resolve(
    configDirectory,
    fileName,
  );
};
