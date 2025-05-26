import { z } from 'zod'

export const User_schema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  language: z.enum(['en', 'de'])
})

export type IUser = z.infer<typeof User_schema>
