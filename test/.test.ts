import { projectSchema } from "../src/type/mod.ts"
import * as cases from "https://esm.sh/gh/dalkak3/ente@9f8dd10/case/mod.ts?standalone"

Deno.test("test", () => {
    Object.entries(cases).forEach(([name, project]) => {
        console.log(name)
        const result = projectSchema.safeParse(project)

        if (!result.success) {
            console.log(result.error.message)
            throw new Error(`Zod validation failed on "${name}"`)
        }
    })
})
