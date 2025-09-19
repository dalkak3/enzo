import { z } from "../../deps/zod.ts"

import { scriptSchema } from "./Script.ts"
import { objectSchema } from "./Object_.ts"
import { entryId } from "./util.ts"

export const variableSchema = z.strictObject({
    name: z.string(),
    variableType: z.enum([
        "variable",
        "list",
        "timer",
        "answer",
    ]),
    id: entryId,
    value: z.union([z.string(), z.number()]).optional(),
    minValue: z.number().optional(),
    maxValue: z.number().optional(),
    visible: z.boolean(),
    x: z.number(),
    y: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
    isCloud: z.boolean(),
    object: z.string().nullable(),
    array: z.array(
        z.strictObject({
            data: z.string(),
        }),
    ).optional(),
    isRealTime: z.literal(false),
    cloudDate: z.literal(false).optional(),
})

export const messageSchema = z.strictObject({
    name: z.string(),
    id: entryId,
})

export const sceneSchema = z.strictObject({
    name: z.string(),
    id: entryId,
})

export const functionSchema = z.strictObject({
    id: entryId,
    type: z.enum(["normal", "value"])
        .optional(),
    localVariables: z
        .array(
            z.strictObject({
                name: z.string(),
                value: z.number(),
                id: z.string().regex(/^[0-9a-z]{4}_[0-9a-z]{4}$/),
            }),
        )
        .optional(),
    useLocalVariables: z.boolean().optional(),
    content: scriptSchema,
    fieldNames: z.array(z.never()).optional(),
})

export const projectSchema = z.strictObject({
    id: z.hex().length(24).optional(),
    updated: z.iso.datetime().optional(),
    name: z.string().optional(),
    thumb: z.string().regex(/^\/?uploads\/thumb\/[0-9a-f]{4}\/[0-9a-f]{24}\.png$/).optional(),
    cloudVariable: z.string().optional(),

    speed: z.number().optional(),
    objects: z.array(objectSchema),
    variables: z.array(variableSchema),
    messages: z.array(messageSchema),
    functions: z.array(functionSchema),
    scenes: z.array(sceneSchema),
    tables: z.array(z.never()),
    interface: z.object({
        menuWidth: z.literal(280).optional(),
        canvasWidth: z.number(),
        object: entryId,
    }).optional(),
    expansionBlocks: z.array(z.never()).optional(),
    aiUtilizeBlocks: z.array(z.never()).optional(),
    hardwareLiteBlocks: z.array(z.never()).optional(),
    externalModules: z.array(z.never()).optional(),
    externalModulesLite: z.array(z.never()).optional(),
})
