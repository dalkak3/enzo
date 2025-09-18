import { z } from "../../deps/zod.ts"

interface Block {
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
        id: z.string(),
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
        readOnly: z.union([z.boolean(), z.null()]).optional(),
        copyable: z.boolean().optional(),
        assemble: z.boolean().optional(),
        extensions: z.tuple([]).optional(),
    })
)

const commentSchema = z.strictObject({
    id: z.string(),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    value: z.string(),
    readOnly: z.union([z.boolean(), z.null()]),
    visible: z.boolean(),
    display: z.boolean(),
    movable: z.boolean(),
    isOpened: z.boolean(),
    deletable: z.literal(1),
    type: z.literal("comment"),
})

const scriptSchema_ = z.array(
    z.array(
        z.union([blockSchema, commentSchema])
    ),
)

export const scriptSchema = z.string().pipe(
    z.preprocess((input, ctx) => {
        try {
            return JSON.parse(input)
        } catch {
            ctx.issues.push({
                code: "custom",
                message: "Invalid JSON",
                input,
            })
        }
    }, scriptSchema_),
)
