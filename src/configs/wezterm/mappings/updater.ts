import fs from 'node:fs/promises';
import type { ConfigMapperUpdater } from '../../../types/config.js';
import { getConfigMappingPath } from '../../../utils/getOutputPath.js';
import { extension } from './properties.js';

export const compileTemplate = (path: string) => `
local wezterm = require("wezterm")
local mappingsPath = "${path}"

if not string.find(package.path, mappingsPath) then
  package.path = package.path .. ";" .. mappingsPath .. "/?.lua"
end

return function(config)
  wezterm.log_info("Attempting to require mappings")
  local status, mappings = pcall(require, "mappings.wezterm")
  if status then
    mappings(config)
  end
end
`;

export const updater: ConfigMapperUpdater = async () => {
  const fileName = await getConfigMappingPath('wezterm', extension);
  const modulePath = fileName.split('/').slice(0, -2).join('/');
  fs.writeFile(
    process.env.WEZTERM_TERM_KEYMAP,
    compileTemplate(modulePath),
    'utf8',
  );
};
