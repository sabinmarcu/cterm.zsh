import fs from 'node:fs/promises';
import { Command } from 'clipanion';
import consola from 'consola';
import {
  parse,
} from 'yaml';
import { configs } from '../../configs/index.js';
import {
  getConfigMappingPath,
} from '../../utils/getOutputPath.js';
import type {
  ConfigKeyMap,
  ConfigKeyMapper,
  ConfigModifierMap,
  Configs,
} from '../../types/config.js';
import {
  mappingsSchema,
} from '../../types/mapping.js';

const keyInMap = <T extends Record<string, any>>(key: any, map: T): key is keyof T => (
  !!(key in map)
);
const getKey = (
  key: string,
  keyMap: ConfigKeyMap,
  mapper?: ConfigKeyMapper,
) => {
  if (keyInMap(key, keyMap)) {
    return keyMap[key];
  }
  return mapper ? mapper(key) : key;
};
const getModifier = (key: string, modifierMap: ConfigModifierMap) => {
  if (keyInMap(key, modifierMap)) {
    return modifierMap[key];
  }
  return key;
};

export class KeymapGenerateCommand extends Command {
  static paths = [['keymap', 'generate']];

  static usage = Command.Usage({
    category: 'Keymap',
    description: 'Generate Keymaps',
  });

  async execute() { // eslint-disable-line class-methods-use-this
    const mappings = mappingsSchema.parse(
      parse(
        await fs.readFile(process.env.TERM_KEYMAPS_INPUT, 'utf8'),
        { keepSourceTokens: true },
      ),
    );
    for (const [
      name,
      config,
    ] of Object.entries(configs)) {
      if ('mapping' in config) {
        consola.info(`Generating keymaps for ${name}`);
        const {
          mapping: {
            maps,
            mapper,
            renderer,
            extension,
          },
        } = config;
        const fileName = await getConfigMappingPath(name as Configs, extension);
        const configMapping = mappings
          .map(
            ({ key, mods, action }) => ({
              key: getKey(key, maps.key, (maps as any).mapper),
              mods: mods.map((modifier) => getModifier(modifier, maps.modifier)),
              action,
            }),
          )
          .map((mapping) => mapper(mapping as any));
        fs.writeFile(fileName, renderer(configMapping as any).trim(), 'utf8');
      }
    }
  }
}
