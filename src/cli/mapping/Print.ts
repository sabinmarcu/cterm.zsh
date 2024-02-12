import fs from 'node:fs/promises';
import {
  parse,
} from 'yaml';
import { Command } from 'clipanion';
import { mappingsSchema } from '../../types/mapping.js';

export class KeymapPrintCommand extends Command {
  static paths = [['keymap', 'print']];

  static usage = Command.Usage({
    category: 'Keymap',
    description: 'Print Keymaps',
  });

  async execute() { // eslint-disable-line class-methods-use-this
    const mappings = mappingsSchema.parse(
      parse(
        await fs.readFile(process.env.TERM_KEYMAPS_INPUT, 'utf8'),
        { keepSourceTokens: true },
      ),
    );
    for (const mapping of mappings) {
      const map = [
        ...mapping.mods,
        mapping.key,
      ].map((it) => it.toUpperCase()).join(' + ');
      const description = mapping.description || mapping.action;
      process.stdout.write(`${description}: ${map}\n`);
    }
  }
}
