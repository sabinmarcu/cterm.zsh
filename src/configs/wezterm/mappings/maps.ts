import type {
  ConfigKeyMap,
  ConfigMappingMap,
  ConfigModifierMap,
} from '../../../types/config.js';

export const weztermKeyMap = {
  Tab: 'Tab',
  Key1: '1',
  Key2: '2',
  Key3: '3',
  Key4: '4',
  Key5: '5',
  Key6: '6',
  Key7: '7',
  Key8: '8',
  Key9: '9',
  Comma: ',',
  LBracket: '[',
  RBracket: ']',
  Semicolon: ';',
} satisfies ConfigKeyMap;

export const weztermModifierMap = {
  ALT: 'ALT',
  CMD: 'CMD',
  CTRL: 'CTRL',
  SHIFT: 'SHIFT',
} satisfies ConfigModifierMap;

export const maps = {
  key: weztermKeyMap,
  modifier: weztermModifierMap,
} satisfies ConfigMappingMap;
