import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import type { Theme } from './types/theme.js';
import { themeSchema } from './types/theme.js';

export const themes = new Map<string, Theme>();

for (const file of await fs.readdir(process.env.TERM_THEMES_INPUT_DIR)) {
  if (file.endsWith('.yml')) {
    const themeName = file.slice(0, Math.max(0, file.indexOf('.')));
    const themePath = path.resolve(process.env.TERM_THEMES_INPUT_DIR, file);
    const contents = await fs.readFile(themePath, 'utf8');
    const theme = themeSchema.parse(parse(contents));
    themes.set(themeName, theme);
  }
}
