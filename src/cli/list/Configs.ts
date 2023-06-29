/* eslint-disable no-console */

import {
  Command,
  Option,
} from 'clipanion';
import {
  z,
} from 'zod';
import consola from 'consola';
import { configs } from '../../configs/index.js';
import { configAvailable } from '../../utils/configAvailable.js';
import type { Configs } from '../../types/config.js';

const optionsSchema = z.union([
  z.literal('available'),
  z.literal('supported'),
]).optional();

type Options = z.infer<typeof optionsSchema>;

const render = {
  available: () => {
    consola.info('Available configs: ');
    console.log(
      Object.keys(configs)
        .filter((config) => configAvailable(config as Configs))
        .map((it) => `  - ${it}`)
        .join('\n'),
    );
  },
  supported: () => {
    consola.info('Supported configs: ');
    console.log(
      Object.keys(configs)
        .map((it) => `  - ${it}`)
        .join('\n'),
    );
  },
} satisfies Record<NonNullable<Options>, () => void>;

export class ConfigListCommand extends Command {
  static paths = [['list', 'config']];

  static usage = Command.Usage({
    category: 'List',
    description: 'List available or supported configs',
    examples: [
      ['List available', '$0 list config available'],
      ['List supported', '$0 list config supported'],
    ],
  });

  mode = Option.String({ required: false });

  async execute() {
    try {
      const mode = optionsSchema.parse(this.mode);
      if (mode) {
        render[mode]();
      } else {
        render.available();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.format()._errors; // eslint-disable-line no-underscore-dangle
        const options = errors.map(
          (it) => it.match(/"([^"]+)"/)?.[1],
        ).filter(Boolean);
        consola.error(`Must be one of: ${options.join(', ')}`);
      } else if (error instanceof Error) {
        consola.error(`Unknown error: ${error.message} `);
        console.log(error.stack); // eslint-disable-line no-console
      }
    }
  }
}
