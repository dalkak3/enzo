import { z } from "../../deps/zod.ts"

import { entryId } from "./util.ts"

export interface Block {
    id: string
    x?: number
    y?: number
    type: string
    params: (Block | number | string | null)[]
    statements?: (Block[] | undefined)[]
    movable?: null
    deletable?: false | 1
    emphasized?: boolean
    readOnly?: boolean | null
    copyable?: boolean
    assemble?: boolean
    extensions?: []
}

export const blockSchema: z.ZodSchema<Block> = z.lazy(() =>
    z.strictObject({
        id: entryId,
        x: z.number().optional(),
        y: z.number().optional(),
        type: z.string().refine(x => x != "comment"),
        params: z.array(
            z.union([blockSchema, z.number(), z.string()]).nullable(),
        ),
        statements: z
            .array(z.union([z.array(blockSchema), z.undefined()]))
            .optional(),
        movable: z.null().optional(),
        deletable: z.union([z.literal(1), z.literal(false)]).optional(),
        emphasized: z.boolean().optional(),
        readOnly: z.boolean().nullable().optional(),
        copyable: z.boolean().optional(),
        assemble: z.boolean().optional(),
        extensions: z.tuple([]).optional(),
        comment: commentSchema.optional(),
    })
)

export const commentSchema = z.strictObject({
    id: entryId.optional(),
    x: z.number(),
    y: z.number(),
    width: z.number().min(0),
    height: z.number().min(0),
    value: z.string(),
    readOnly: z.boolean().nullable(),
    visible: z.boolean(),
    display: z.boolean(),
    movable: z.boolean(),
    isOpened: z.boolean(),
    deletable: z.literal(1).optional(),
    type: z.literal("comment"),
})

export const scriptSchema = z.array(
    z.array(
        z.union([blockSchema, commentSchema])
    ),
)
