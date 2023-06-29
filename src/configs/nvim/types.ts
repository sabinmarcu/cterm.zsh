import { z } from 'zod';

export const nvimThemeOverrides = z.object({
  theme: z.string(),
});
