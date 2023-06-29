import type { Color } from '../../types/theme.js';

export const updateColor = (input: Color) => `0x${input.slice(1)}`;
export const updateColors = <
  const Input extends Record<string, Color>,
>(input: Input): Record<keyof Input, Color> => Object.fromEntries(
  Object.entries(input)
    .map(([key, value]) => [key, updateColor(value)]),
) as any;
