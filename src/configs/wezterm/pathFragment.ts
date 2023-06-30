import { getConfigOutputPath } from '../../utils/getOutputPath.js';

export const getPathFragmentPath = () => {
  const fileName = getConfigOutputPath('wezterm');
  const modulePath = fileName.split('/').slice(0, -2).join('/');
  return modulePath;
};
export const pathFragment = () => `
local wezterm = require("wezterm")
local mappingsPath = "${getPathFragmentPath()}"

if not string.find(package.path, mappingsPath) then
  package.path = package.path .. ";" .. mappingsPath .. "/?.lua"
end
`;
