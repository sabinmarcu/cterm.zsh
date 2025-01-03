import {
  Command,
} from 'clipanion';
import consola from 'consola';
import { themes } from '../import.js';

export class DefaultCommand extends Command {
  static paths = [Command.Default];

  static usage = Command.Usage({
    description: 'Configure keymaps and TERM_THEME ',
  });

  async execute() {
    if (!process.env.TERM_THEME) {
      consola.error('Theme not set in env: TERM_THEME');
      return 1;
    }
    const theme = process.env.TERM_THEME;
    if (!themes.has(theme)) {
      consola.error(`Not a valid theme. Must be one of: ${[...themes.keys()].join(', ')}`);
      return 1;
    }

    await this.cli.run(['theme', theme], { env: { CONSOLA_LEVEL: '0' } });
    await this.cli.run(['keymap'], { env: { CONSOLA_LEVEL: '0' } });

    return 0;
  }
}
