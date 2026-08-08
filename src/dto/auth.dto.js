import { z } from 'zod'

const signupValidateSchema = z.object({
    username: z.string().trim().min(4, "Minimum 4 characters required"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters are required").regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
})

const signinValidateSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export{
    signupValidateSchema,
    signinValidateSchema
}