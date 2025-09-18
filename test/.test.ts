import { projectSchema } from "../src/type/mod.ts"
import * as cases from "https://esm.sh/gh/dalkak3/ente@0.1.0/case/mod.ts?standalone"

Deno.test("test", () => {
    Object.entries(cases).forEach(([name, project]) => {
        console.log(name)
        projectSchema.parse(project)
    })
})
