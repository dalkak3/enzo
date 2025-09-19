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

        Object.fromEntries(Object.entries(schema.shape).map(([k, v]) =>
            [k, walk(v, depth+1)]
        ))

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
        
        return walk(schema.unwrap() as z.ZodType, depth+0) 
            .map(x => z.array(x))
    }
    else {
        return [schema_]
    }
}

walk(projectSchema)
console.log(test(projectSchema))
