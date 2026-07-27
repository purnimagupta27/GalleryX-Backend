import { z } from 'zod'

const createPostValidateSchema = z.object({
    caption: z.string().trim().max(500, "Caption can contain at most 500 characters").optional(),
    isPrivate: z.coerce.boolean().default(false)
})

export {
    createPostValidateSchema
}