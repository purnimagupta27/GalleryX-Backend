import { z } from 'zod'

const createPostValidateSchema = z.object({
    caption: z.string().trim().max(500, "Caption can contain at most 500 characters").optional(),
    isPrivate: z.preprocess((val) => {
        if (typeof val === "string") return val.toLowerCase() === "true";
        return Boolean(val);
    }, z.boolean().default(false))
})

const updatePostValidateSchema = z.object({
    caption: z.string().trim().max(500, "Caption can contain at most 500 characters").optional(),
    isPrivate: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                if (val.toLowerCase() === "true") return true;
                if (val.toLowerCase() === "false") return false;
            }
            return val;
        },
        z.boolean().optional()
    ),
}).refine(
    (data) =>
      data.caption !== undefined ||
      data.isPrivate !== undefined,
    {
      message: "At least one field is required to update the post",
    }
  );


export {
    createPostValidateSchema,
    updatePostValidateSchema
}
