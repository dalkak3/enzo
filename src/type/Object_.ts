import { z } from "../../deps/zod.ts"

import { scriptSchema } from "./Script.ts"
import { entryId } from "./util.ts"

export const pictureSchema = z.strictObject({
    id: entryId,
    name: z.string(),
    dimension: z.strictObject({
        width: z.number(),
        height: z.number(),
        scaleX: z.number().optional(),
        scaleY: z.number().optional(),
    }),
    scale: z.union([
        z.strictObject({
            type: z.number(),
            default: z.number(),
        }),
        z.number(),
    ]).optional(),
    imageType: z.enum(["png", "svg"]).optional(),
    fileurl: z.string().optional(),
    filename: z.string().optional(),
    thumbUrl: z.string().optional(),
})

export const soundSchema = z.strictObject({
    id: entryId,
    name: z.string(),
    duration: z.number(),
    fileurl: z.string().optional(),
    filename: z.string().optional(),
    ext: z.string().optional(),
})

export const objectSchema = z.strictObject({
    id: entryId,
    name: z.string(),
    text: z.string().optional(),
    order: z.number().optional(),
    objectType: z.enum(["sprite", "textBox"]),
    scene: z.string(),
    active: z.boolean().optional(),
    lock: z.boolean(),
    rotateMethod: z.enum(["free", "vertical"]),
    entity: z.strictObject({
        rotation: z.number(),
        direction: z.number(),
        x: z.number(),
        y: z.number(),
        regX: z.number(),
        regY: z.number(),
        scaleX: z.number(),
        scaleY: z.number(),
        width: z.number(),
        height: z.number(),
        imageIndex: z.number().optional(),
        visible: z.boolean(),
        colour: z.string().optional(),
        font: z.union([z.string(), z.null()]),
        bgColor: z.string().optional(),
        textAlign: z.number().optional(),
        lineBreak: z.boolean().optional(),
        underLine: z.boolean().optional(),
        strike: z.boolean().optional(),
        text: z.string().optional(),
    }),
    script: scriptSchema,
    sprite: z.strictObject({
        pictures: z.array(pictureSchema),
        sounds: z.array(soundSchema),
    }),
    selectedPictureId: entryId.optional(),
    selectedSoundId: entryId.optional(),
})
