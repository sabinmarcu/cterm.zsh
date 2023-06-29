import { stringify } from 'yaml';
import type {
  ConfigFileResolver,
  ConfigRenderer,
  ConfigTheme,
  ConfigTransformer,
} from '../../types/config.js';
import type { AlacrittyTheme } from './types.js';
import { updateColors } from './utils.js';

const transformer: ConfigTransformer<AlacrittyTheme> = ({
  colors: {
    normal,
    bright,
    background,
    foreground,
  }
}) => ({
  colors: {
    primary: updateColors({
      background,
      foreground,
    }),
    normal: updateColors(normal),
    bright: updateColors(bright),
  },
});

const renderer: ConfigRenderer<AlacrittyTheme> = (theme) => (
  stringify(theme)
);

export const fileResolver: ConfigFileResolver = (name) => `${name}.yml`;

export const theme: ConfigTheme<AlacrittyTheme> = {
  transformer,
  fileResolver,
  renderer,
};
