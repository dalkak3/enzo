import { projectSchema } from "../dist/type/mod.ts"

Deno.test("test", async () => {
    const text = await Deno.readTextFile("test/project/fib.json")
    projectSchema.parse(JSON.parse(text))
})
