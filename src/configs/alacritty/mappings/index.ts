import type {
  ConfigMapping,
} from '../../../types/config.js';
import type { AlacrittyMapping } from '../types.js';
import { mapper } from './mapper.js';
import { maps } from './maps.js';
import { renderer } from './renderer.js';
import { updater } from './updater.js';
import { extension } from './properties.js';

export const mapping = {
  maps,
  mapper,
  renderer,
  extension,
  updater,
} satisfies ConfigMapping<AlacrittyMapping>;
