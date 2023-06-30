import type {
  ConfigKeyMap,
  ConfigKeyMapper,
  ConfigMappingMap,
  ConfigModifierMap,
} from '../../../types/config.js';

export const alacrittyKeyMap = {
  Tab: 'Tab',
  Key1: 'Key1',
  Key2: 'Key2',
  Key3: 'Key3',
  Key4: 'Key4',
  Key5: 'Key5',
  Key6: 'Key6',
  Key7: 'Key7',
  Key8: 'Key8',
  Key9: 'Key9',
  Comma: 'Comma',
  LBracket: 'LBracket',
  RBracket: 'RBracket',
  Semicolon: 'Semicolon',
} satisfies ConfigKeyMap;

export const alacrittyModifierMap = {
  ALT: 'Alt',
  CMD: 'Command',
  CTRL: 'Control',
  SHIFT: 'Shift',
} satisfies ConfigModifierMap;

export const alacrittyKeyMapper: ConfigKeyMapper = (input: string) => input.toUpperCase();

export const maps = {
  key: alacrittyKeyMap,
  modifier: alacrittyModifierMap,
  mapper: alacrittyKeyMapper,
} satisfies ConfigMappingMap;
