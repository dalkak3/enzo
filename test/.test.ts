import { projectSchema } from "../dist/type/mod.ts"

projectSchema.parse(
    JSON.parse(await Deno.readTextFile("test/project/fib.json"))
)
