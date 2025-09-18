import { z } from "../../deps/zod.ts"

interface Block {
    id: string
    x: number
    y: number
    type: string
    params: (Block | number | string | null)[]
    statements?: (Block[] | undefined)[]
    movable: null
    deletable: false | 1
    emphasized: boolean
    readOnly: boolean | null
    copyable: boolean
    assemble: boolean
    extensions: []
}

export const blockSchema: z.ZodSchema<Block> = z.lazy(() =>
    z.strictObject({
        id: z.string(),
        x: z.number(),
        y: z.number(),
        type: z.string(),
        params: z.array(
            z.union([blockSchema, z.number(), z.string()]).nullable(),
        ),
        statements: z
            .array(z.union([z.array(blockSchema), z.undefined()]))
            .optional(),
        movable: z.null(),
        deletable: z.union([z.literal(1), z.literal(false)]),
        emphasized: z.boolean(),
        readOnly: z.union([z.boolean(), z.null()]),
        copyable: z.boolean(),
        assemble: z.boolean(),
        extensions: z.tuple([]),
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
    z.array(z.union([blockSchema, commentSchema])),
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
