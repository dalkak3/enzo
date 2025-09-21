import { projectSchema } from "../src/type/mod.ts"
import { cases } from "../deps/ente.ts"
import { stats } from "../src/type/util.ts"
import { getBlockTypes } from "../src/static/getBlockTypes.ts"

Deno.test("test", () => {
    Object.entries(cases).forEach(([name, project]) => {
        console.log(name)
        const result = projectSchema.safeParse(project, { reportInput: true })

        if (!result.success) {
            console.log(JSON.parse(result.error.message))
            throw new Error(`Zod validation failed on "${name}"`)
        }
    })

    console.log(stats.blockTypes.length, "blocks")
    console.log(new Set(stats.blockTypes).size, "block types")
    Deno.writeTextFileSync(
        ".log",
        JSON.stringify(getBlockTypes()),
    )
})
