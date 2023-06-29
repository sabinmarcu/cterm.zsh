import {
  Command,
  Option,
} from 'clipanion';
import consola from 'consola';
import { themes } from '../import.js';
import { configs } from '../configs/index.js';

export class ConfigureCommand extends Command {
  static paths = [['set']];

  static usage = Command.Usage({
    category: 'Themes',
    description: 'Configure for one theme',
    examples: [
      ['Use tokyonight', '$0 set tokyonight'],
      ['Use nord', '$0 set nord'],
    ],
  });

  theme = Option.String();

  async execute() { // eslint-disable-line class-methods-use-this
    if (!themes.has(this.theme)) {
      consola.error(`Not a valid theme. Must be one of: ${[...themes.keys()].join(', ')}`);
      return 1;
    }

    await this.cli.run(['generate'], { env: { CONSOLA_LEVEL: '0' } });

    for (const { updaters: { config } } of Object.values(configs)) {
      await config(this.theme);
    }

    return 0;
  }
}
