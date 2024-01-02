import { z } from 'zod'

export const authenticateUserSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(5).max(100),
  }),
})

export type AuthenticateUserDto = z.infer<typeof authenticateUserSchema>['body']
