import { projectSchema } from "../src/type/mod.ts"
import * as cases from "https://esm.sh/gh/dalkak3/ente@9f8dd10/case/mod.ts?standalone"

Deno.test("test", () => {
    Object.entries(cases).forEach(([name, project]) => {
        console.log(name)
        const result = projectSchema.safeParse(project, { reportInput: true })

        if (!result.success) {
            console.log(JSON.parse(result.error.message))
            throw new Error(`Zod validation failed on "${name}"`)
        }
    })
})
