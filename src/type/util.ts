import { z } from "../../deps/zod.ts"

export const entryId = z.string().regex(/[0-9a-z]{4}/)
