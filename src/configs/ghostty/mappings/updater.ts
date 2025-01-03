import fs from 'node:fs/promises';
import { ConfigMapperUpdater } from '../../../types/config.js';
import { getConfigMappingPath } from '../../../utils/getOutputPath.js';

export const compileTemplate = async () => `
config-file = "?${await getConfigMappingPath('ghostty', '')}"
`.trim();

export const updater: ConfigMapperUpdater = async () => {
  fs.writeFile(
    process.env.GHOSTTY_TERM_KEYMAP,
    await compileTemplate(),
    'utf8',
  );
};
