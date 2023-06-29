import {
  Command,
  Option,
} from 'clipanion';
import consola from 'consola';
import { themes } from '../../import.js';
import { configs } from '../../configs/index.js';

export class UpdateCommand extends Command {
  static paths = [['theme', 'update']];

  static usage = Command.Usage({
    category: 'Themes',
    description: 'Live update of config for theme',
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
    const config = Object.values(configs)
      .find(({ properties: { terminal } }) => terminal);

    if (!config) {
      consola.error('Not a supported terminal!');
      return 1;
    }

    await this.cli.run(['generate'], { env: { CONSOLA_LEVEL: '0' } });

    const { updaters } = config;

    if (!('auto' in updaters) || !updaters.auto) {
      consola.error('Terminal does not support on-the-fly updates');
      return 1;
    }

    await updaters.auto(this.theme);

    return 0;
  }
}
