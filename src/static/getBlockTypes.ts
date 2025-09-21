import { cases } from "../../deps/ente.ts"
import { projectSchema } from "../type/mod.ts"
import { stats } from "../type/util.ts"

export const getBlockTypes =
() => new Set(stats.blockTypes)
    .values()
    .filter(x => !x.match(/^func_[0-9a-z]{4}$/))
    .filter(x => !x.match(/^stringParam_[0-9a-z]{4}$/))
    .toArray()
    .toSorted()

const p =
() => {
    Object.entries(cases).forEach(([_name, project]) => {
        const parsed = projectSchema.parse(project)

        parsed.objects.at(0)
    })
}


