import TOML from '@iarna/toml';
import type {
  ConfigTransformer,
  ConfigRenderer,
  ConfigTheme,
  ConfigFileResolver,
} from '../../types/config.js';
import type {
  WeztermTheme,
} from './types.js';
import { resolveColors } from './utils.js';

export const renderer: ConfigRenderer<WeztermTheme> = (theme) => (
  TOML.stringify(theme)
);
export const transformer: ConfigTransformer<WeztermTheme> = ({
  colors: {
    normal,
    bright,
    background,
    foreground,
    cursor,
  }
}) => ({
  colors: {
    ansi: resolveColors(normal),
    brights: resolveColors(bright),
    background,
    foreground,
    cursor_bg: cursor,
    cursor_border: cursor,
    cursor_fg: background,
    selection_bg: cursor,
    selection_fg: background,
  },
});

export const fileResolver: ConfigFileResolver = (name) => `${name}.toml`;

export const theme: ConfigTheme<WeztermTheme> = {
  renderer,
  transformer,
  fileResolver,
};
