import type { ConfigMapperTransformer } from '../../../types/config.js';
import type { WeztermMapping } from '../types.js';

export const mapper: ConfigMapperTransformer<WeztermMapping> = (
  { key, mods, action },
) => ({ key, mods: mods.join('|'), action });
