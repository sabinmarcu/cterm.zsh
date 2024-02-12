import { z } from 'zod';

export const modifiersSchema = z.union([
  z.literal('CMD'),
  z.literal('SHIFT'),
  z.literal('ALT'),
  z.literal('CTRL'),
]);

export type Modifiers = z.infer<typeof modifiersSchema>;

export const keyMapSchema = z.union([
  z.literal('Tab'),
  z.literal('Comma'),
  z.literal('LBracket'),
  z.literal('RBracket'),
  z.literal('Semicolon'),
  z.literal('Key1'),
  z.literal('Key2'),
  z.literal('Key3'),
  z.literal('Key4'),
  z.literal('Key5'),
  z.literal('Key6'),
  z.literal('Key7'),
  z.literal('Key8'),
  z.literal('Key9'),
]);

export type KeyMap = z.infer<typeof keyMapSchema>;

export const mappingSchema = z.object({
  key: z.string(),
  mods: z.array(modifiersSchema),
  action: z.string(),
  description: z.string().optional(),
});

export type Mapping = z.infer<typeof mappingSchema>;

export const mappingsSchema = z.array(mappingSchema);

export type Mappings = z.infer<typeof mappingsSchema>;
