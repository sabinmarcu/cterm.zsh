import type {
  ConfigTransformer,
  ConfigRenderer,
  ConfigTheme,
  ConfigFileResolver,
} from '../../../types/config.js';
import type { Color } from '../../../types/theme.js';
import type {
  WeztermTheme,
} from '../types.js';
import { resolveColors } from '../utils.js';

export const renderColors = (colors: Color[]) => `{
${colors
    .map((color) => `"${color}",`)
    .map((it) => `    ${it}`)
    .join('\n')
}
}`;

export const renderRest = (rest: Record<string, string>) => (
  Object.entries(rest)
    .map(([key, value]) => `${key} = "${value}",`)
    .map((it) => `  ${it}`)
    .join('\n')
);

export const renderTheme = ({
  colors: {
    ansi,
    brights,
    ...rest
  },
}: WeztermTheme) => `{
  ansi = ${renderColors(ansi)},
  brights = ${renderColors(brights)},
${renderRest(rest)}
}`;

export const renderer: ConfigRenderer<WeztermTheme> = (theme) => `
return ${renderTheme(theme)};
`;

export const transformer: ConfigTransformer<WeztermTheme> = ({
  colors: {
    normal,
    bright,
    background,
    foreground,
    cursor,
  },
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

export const fileResolver: ConfigFileResolver = (name) => `${name}.lua`;

export const theme: ConfigTheme<WeztermTheme> = {
  renderer,
  transformer,
  fileResolver,
};
