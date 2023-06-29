import fs from 'node:fs/promises';
import type {
  ConfigUpdater,
  ConfigUpdaters,
} from '../../types/config.js';
import {
  getConfigOutputPath,
  getOutputPath,
} from '../../utils/getOutputPath.js';
import { fileResolver } from './theme.js';

const getThemeChangeString = (themePath: string) => {
  const buffer = Buffer.from(themePath);
  const data = buffer.toString('base64');
  return `\x1b]1337;SetUserVar=custom-theme=${data}\x07`; // eslint-disable-line unicorn/escape-case,unicorn/no-hex-escape
};

const wrapTmuxThemeChangeString = (themeChangeString: string) => (
  `\x1bPtmux;\x1b${themeChangeString}\x1b\\` // eslint-disable-line unicorn/escape-case,unicorn/no-hex-escape
);

export const auto: ConfigUpdater = async (theme) => {
  const themePath = await getOutputPath('wezterm', fileResolver, theme);
  let themeChangeString = getThemeChangeString(themePath);
  if (process.env.TMUX) {
    themeChangeString = wrapTmuxThemeChangeString(themeChangeString);
  }
  process.stdout.write(themeChangeString);
};

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
  auto,
  config,
};
