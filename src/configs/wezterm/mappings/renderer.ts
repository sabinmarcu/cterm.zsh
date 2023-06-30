import type { ConfigMapperRenderer } from '../../../types/config.js';
import type { WeztermMapping } from '../types.js';

export const escapeMapping = {
  '\u001B': '\\x1B',
  '\u0012': '\\x12',
  '\u0002': '\\x02',
  '\n': '\\n',
} as Record<string, string>;

export const compileMapping = ({ key, mods, action }: WeztermMapping) => {
  const sanitizedAction = [...action]
    .map(
      (it) => escapeMapping[it] || it,
    ).join('');
  return (
    `{ key = "${key}", mods = "${mods}", action = act.SendString("${sanitizedAction}") }`
  );
};

export const compileTemplate = (mappings: WeztermMapping[]) => `
local wezterm = require("wezterm");
local act = wezterm.action;

local keymap = {
${mappings
    .map((mapping) => compileMapping(mapping))
    .map((it) => `  ${it},`)
    .join('\n')}
};

return function(config) 
  config.keys = keymap;
end
`;

export const renderer: ConfigMapperRenderer<WeztermMapping> = (
  input,
) => compileTemplate(input);
