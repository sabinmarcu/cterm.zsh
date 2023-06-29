import fs from 'node:fs/promises';
import { Command } from 'clipanion';
import consola from 'consola';
import { themes } from '../import.js';
import { configs } from '../configs/index.js';
import { getOutputPath } from '../utils/getOutputPath.js';
import type { Configs } from '../types/config.js';

export class GenerateCommand extends Command {
  static paths = [['generate']];

  async execute() { // eslint-disable-line class-methods-use-this
    for (const [
      config,
      themeProcess,
    ] of Object.entries(configs)) {
      consola.info(`Compiling themes for ${config}`);
      if ('theme' in themeProcess) {
        const {
          theme: { transformer, renderer, fileResolver },
        } = themeProcess;
        for (const [themeName, theme] of themes.entries()) {
          const resolvedTheme = transformer(theme);
          const content = renderer(resolvedTheme as any);
          const outputPath = await getOutputPath(
            config as Configs,
            fileResolver,
            themeName,
          );
          await fs.writeFile(outputPath, content, 'utf8');
        }
      } else {
        consola.warn(`${config} doesn't compile colorschemes`);
      }
    }
  }
}
