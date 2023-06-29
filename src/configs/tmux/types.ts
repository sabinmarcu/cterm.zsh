import { z } from 'zod';

export const tmuxThemeOverrides = z.object({
  plugin: z.string().optional(),
  color: z.string().optional(),
  extras: z.string().optional(),
});
