import { string, z } from "zod"

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  password: z.string().optional(),
  favorites: z.array(string()).optional()
})

export type TUser = z.infer<typeof UserSchema>
