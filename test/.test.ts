import { assertEquals } from "https://esm.sh/jsr/@std/assert@1.0.14"
import { projectSchema } from "../dist/type/mod.ts"


Deno.test("test", async () => {
    const text = await Deno.readTextFile("test/project/fib.json")
    assertEquals(
        projectSchema.parse(JSON.parse(text)),
        JSON.parse(text,
            (key, value) => {
                if (
                    key == "script"
                    || key == "content"
                ) {
                    return JSON.parse(value)
                }
                return value
            }
        ),
    )
})
