import type {
  ConfigTransformer,
  ConfigRenderer,
  ConfigTheme,
  ConfigFileResolver,
} from '../../../types/config.js';
import type { Color } from '../../../types/theme.js';
import type {
  GhosttyTheme,
} from '../types.js';
import { resolveColors } from '../utils.js';

export const renderColors = (colors: Color[]) => `
${colors
    .map((color, index) => `palette = ${index}=${color}`)
    .join('\n')}
`;

export const renderRest = (rest: Record<string, string>) => (
  Object.entries(rest)
    .map(([key, value]) => `${key} = ${value}`)
    .join('\n')
);

export const renderer: ConfigRenderer<GhosttyTheme> = ({
  colors: {
    palette,
    ...rest
  },
}: GhosttyTheme) => `
${renderColors(palette)}
${renderRest(rest)}
`;

export const transformer: ConfigTransformer<GhosttyTheme> = ({
  colors: {
    normal,
    bright,
    background,
    foreground,
    cursor,
  },
}) => ({
  colors: {
    palette: [
      resolveColors(normal),
      resolveColors(bright),
    ].flat(),
    background,
    foreground,
    "cursor-color": cursor,
    "selection-background": cursor,
    "selection-foreground": background,
  },
});

export const fileResolver: ConfigFileResolver = (name) => name;

export const theme: ConfigTheme<GhosttyTheme> = {
  renderer,
  transformer,
  fileResolver,
};
