import type { ConfigMapperTransformer } from '../../../types/config.js';
import type { AlacrittyMapping } from '../types.js';

export const mapper: ConfigMapperTransformer<AlacrittyMapping> = (
  { key, mods, action },
) => ({ key, mods: mods.join('|'), chars: action });
