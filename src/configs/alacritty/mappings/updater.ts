import fs from 'node:fs/promises';
import type { ConfigMapperUpdater } from '../../../types/config.js';
import { getConfigMappingPath } from '../../../utils/getOutputPath.js';
import { extension } from './properties.js';

export const compileTemplate = (path: string) => `
import: 
  - ${path}
`;

export const updater: ConfigMapperUpdater = async () => {
  const fileName = await getConfigMappingPath('alacritty', extension);
  const contents = compileTemplate(fileName);
  await fs.writeFile(
    process.env.ALACRITTY_TERM_KEYMAP,
    contents,
    'utf8',
  );
};
