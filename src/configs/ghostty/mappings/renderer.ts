import type { ConfigMapperRenderer } from '../../../types/config.js';
import type { GhosttyMapping } from '../types.js';

export const escapeMapping = {
  '\u001B': '\\x1B',
  '\u0012': '\\x12',
  '\u0002': '\\x02',
  '\n': '\\n',
} as Record<string, string>;

export const compileMapping = ({ key, action }: GhosttyMapping) => {
  const sanitizedAction = [...action]
    .map(
      (it) => escapeMapping[it] || it,
    ).join('');
  return (
    `keybind = ${key}=text:${sanitizedAction}`
  );
};

export const compileTemplate = (mappings: GhosttyMapping[]) => `
${mappings
    .map((mapping) => compileMapping(mapping))
    .join('\n')}
`;

export const renderer: ConfigMapperRenderer<GhosttyMapping> = (
  input,
) => compileTemplate(input);
