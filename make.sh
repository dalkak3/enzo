for file in src/type/*.ts
do
    filename=$(basename -- $file)
    out="dist/type/$filename"
    
    deno run -A npm:ts-to-zod@4.0.0 --skipValidation $file $out

    sed -i 's#import { z } from "zod"#import { z } from "../../deps/zod.ts"#' $out
    sed -i 's#"./../../src/type/Script"#"./../../src/type/Script.ts"#' $out

    cp src/type/mod.ts dist/type/mod.ts
done
