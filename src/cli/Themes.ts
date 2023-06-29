import { Command } from 'clipanion';
import consola from 'consola';
import { themes } from '../import.js';

export class ThemesListCommand extends Command {
  static paths = [['theme', 'list']];

  async execute() {
    consola.info('Available themes:');
    this.context.stdout.write(
      [...themes.keys()]
        .map((theme) => `  - ${theme}`)
        .join('\n'),
    );
  }
}
