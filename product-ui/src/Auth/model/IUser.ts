import { z } from "zod";

export const UserProfile_schema = z.object({
    id: z.number(),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address").min(3, "Email must be at least 3 characters long"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
});

export type UserProfile = z.infer<typeof UserProfile_schema>;
