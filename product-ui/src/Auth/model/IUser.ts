import {z} from "zod";

export const IUser = z.object({
    id: z.number(),
    username: z.string().min(3),
    password: z.string().min(3),
})

export type IUser = z.infer<typeof IUser>