import { Command } from 'clipanion';
import consola from 'consola';
import { configs } from '../../configs/index.js';

export class KeymapUpdateCommand extends Command {
  static paths = [['keymap']];

  static usage = Command.Usage({
    category: 'Keymap',
    description: 'Update Keymaps',
  });

  async execute() { // eslint-disable-line class-methods-use-this
    await this.cli.run(['keymap', 'generate']);
    for (const [
      name,
      config,
    ] of Object.entries(configs)) {
      if ('mapping' in config) {
        consola.info(`Updating keymaps for ${name}`);
        const {
          mapping: {
            updater,
          },
        } = config;
        await updater();
      }
    }
  }
}
