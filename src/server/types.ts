import { type Decimal } from "@prisma/client/runtime/library"
import { RouterOutput, RouterInput } from "./routers/_app"
import { z } from "zod"

export type Note = Partial<NonNullable<RouterOutput['notes']['list'][0]>>
export type Attachment = NonNullable<Note['attachments']>[0] & { size: any }
export type Tag = NonNullable<RouterOutput['tags']['list']>[0]
export type Config = NonNullable<RouterOutput['config']['list']>

export enum NoteType {
  'BLINKO',
  'NOTE'
}

export const ZConfigKey = z.union([
  z.literal('isAutoArchived'),
  z.literal('isUseAI'),
  z.literal('aiModelProvider'),
  z.literal('aiApiKey'),
  z.literal('aiApiEndpoint'),
  z.literal('aiModel'),
  z.literal('isInit'),
]);

export type ConfigKey = z.infer<typeof ZConfigKey>;