import { stringify } from 'yaml';
import type { ConfigMapperRenderer } from '../../../types/config.js';
import type { AlacrittyMapping } from '../types.js';

export const renderer: ConfigMapperRenderer<AlacrittyMapping> = (
  input,
) => stringify({
  key_bindings: input,
}, { keepSourceTokens: true });
