import type { ConfigMapperTransformer } from '../../../types/config.js';
import type { GhosttyMapping } from '../types.js';

export const mapper: ConfigMapperTransformer<GhosttyMapping> = (
  { key, mods, action },
) => ({ key: [mods, key].flat(Infinity).join('+'), action });
