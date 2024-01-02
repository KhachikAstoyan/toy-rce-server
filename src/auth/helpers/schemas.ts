import { z } from 'zod'

export const registerUserSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(5).max(100),
  }),
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>['body']
