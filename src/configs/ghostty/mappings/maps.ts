import type {
  ConfigKeyMap,
  ConfigMappingMap,
  ConfigModifierMap,
} from '../../../types/config.js';

export const ghosttyKeyMap = {
  Tab: 'tab',
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

export const ghosttyModifierMap = {
  ALT: 'alt',
  CMD: 'cmd',
  CTRL: 'ctrl',
  SHIFT: 'shift',
} satisfies ConfigModifierMap;

export const maps = {
  key: ghosttyKeyMap,
  modifier: ghosttyModifierMap,
} satisfies ConfigMappingMap;
