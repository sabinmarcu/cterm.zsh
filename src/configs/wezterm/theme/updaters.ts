import fs from 'node:fs/promises';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../../types/config.js';
import {
  getConfigOutputPath,
} from '../../../utils/getOutputPath.js';

const configTemplate = (path: string, theme: string) => `
local wezterm = require("wezterm")
local themesLocation = "${path}"
local defaultTheme = "${theme}"

local function getTheme(theme)
  return themesLocation .. "/" .. theme .. ".toml"
end

wezterm.on("user-var-changed", function(window, pane, name, value)
  if name == "custom-theme" then
    local overrides = window:get_config_overrides() or {}
    local colors = wezterm.color.load_scheme(value)
    overrides.colors = colors
    window:set_config_overrides(overrides)
  end
end)

return function(config, override)
  local theme = override or defaultTheme
  wezterm.log_info(theme)
  wezterm.log_info(getTheme(theme))
  local colors = wezterm.color.load_scheme(getTheme(theme))
  config.colors = colors
end
`.trim();

export const config: ConfigUpdater = async (theme) => {
  await fs.writeFile(
    process.env.WEZTERM_TERM_THEME,
    configTemplate(getConfigOutputPath('wezterm'), theme),
    'utf8',
  );
};

export const updaters: ConfigUpdaters = {
  config,
};
