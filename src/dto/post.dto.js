import { z } from 'zod'

const createPostValidateSchema = z.object({
    caption: z.string().trim().max(500, "Caption can contain at most 500 characters").optional(),
    isPrivate: z.preprocess((val) => {
        if (typeof val === "string") return val.toLowerCase() === "true";
        return Boolean(val);
    }, z.boolean().default(false))
})

export {
    createPostValidateSchema
}