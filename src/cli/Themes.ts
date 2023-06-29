import { Command } from 'clipanion';
import consola from 'consola';
import { themes } from '../import.js';

export class ThemesListCommand extends Command {
  static paths = [['list', 'theme']];

  static usage = Command.Usage({
    category: 'List',
    description: 'List available themes',
  });

  async execute() {
    consola.info('Available themes:');
    this.context.stdout.write(
      [...themes.keys()]
        .map((theme) => `  - ${theme}`)
        .join('\n'),
    );
  }
}
