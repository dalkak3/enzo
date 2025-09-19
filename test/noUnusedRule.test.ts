import { projectSchema } from "../src/type/mod.ts"
import { cases } from "../deps/ente.ts"
import { z } from "../deps/zod.ts"

const test =
(schema: z.ZodType) =>
    Object.entries(cases).every(([_name, project]) => {
        const result = schema.safeParse(project, { reportInput: true })

        return result.success
    })

const walk =
(schema_: z.ZodType, depth = 0): z.ZodType[] => {
    const type = schema_.type

    if (type != "optional")
        console.log(" ".repeat(depth*2)+type)

    if (type == "object") {
        const schema = schema_ as z.ZodObject

        return Object.keys(schema.shape)
            .map(k => schema.omit({ [k]: true }))
    }
    else if (type == "optional") {
        const schema = schema_ as z.ZodOptional

        return walk(schema.unwrap() as z.ZodType, depth+0)
            .map(x => z.optional(x))
    }
    else if (type == "array") {
        const schema = schema_ as z.ZodArray
        
        return walk(schema.unwrap() as z.ZodType, depth+1) 
            .map(x => z.array(x))
    } else if (type == "union") {
        const schema = schema_ as z.ZodUnion

        schema.options
            .flatMap(option => walk(option as z.ZodType, depth+1))
        
        return [schema]
    }
    else if (type == "pipe") {
        const schema = schema_ as z.ZodPipe
        
        if (!["transform", "string"].includes((schema.in as z.ZodType).type)) {
            // if .in is ZodObject we should walk that too, maybe
            throw "yagni"
        }
        
        return walk(schema.out as z.ZodType, depth+1) 
            .map(x => z.pipe(schema.in, x))
    }
    else {
        return [schema_]
    }
}

console.log(walk(projectSchema).length)
console.log(test(projectSchema))
