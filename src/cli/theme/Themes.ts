import {
  Command,
  Option,
} from 'clipanion';
import consola from 'consola';
import { themes } from '../../import.js';

export class ThemesListCommand extends Command {
  static paths = [['theme', 'list']];

  static usage = Command.Usage({
    category: 'List',
    description: 'List available themes',
  });

  raw = Option.Boolean('-r,--raw');

  async execute() {
    if (this.raw) {
      this.context.stdout.write([...themes.keys()].join('\n'));
      return 0;
    }
    consola.info('Available themes:');
    this.context.stdout.write(
      [...themes.keys()]
        .map((theme) => `  - ${theme}`)
        .join('\n'),
    );
    return 0;
  }
}
