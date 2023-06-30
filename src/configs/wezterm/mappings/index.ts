import type {
  ConfigMapping,
} from '../../../types/config.js';
import type { WeztermMapping } from '../types.js';
import { mapper } from './mapper.js';
import { maps } from './maps.js';
import { extension } from './properties.js';
import { renderer } from './renderer.js';
import { updater } from './updater.js';

export const mapping = {
  maps,
  mapper,
  renderer,
  updater,
  extension,
} satisfies ConfigMapping<WeztermMapping>;
