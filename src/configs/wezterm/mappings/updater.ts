import fs from 'node:fs/promises';
import type { ConfigMapperUpdater } from '../../../types/config.js';
import { pathFragment } from '../pathFragment.js';

export const compileTemplate = () => `
${pathFragment()}

return function(config)
  wezterm.log_info("Attempting to require mappings")
  local status, mappings = pcall(require, "mappings.wezterm")
  if status then
    mappings(config)
  end
end
`;

export const updater: ConfigMapperUpdater = async () => {
  fs.writeFile(
    process.env.WEZTERM_TERM_KEYMAP,
    compileTemplate(),
    'utf8',
  );
};
