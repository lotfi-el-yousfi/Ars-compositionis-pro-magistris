import {z} from "zod";

export const IProductSchema = z.object({
    id: z.number().optional(), // Optional if not set in form
    name: z.string().min(3),
    price: z.preprocess((v) => Number(v), z.number().positive()),
    description: z.string().min(1).max(255),
    quantity: z.preprocess((v) => Number(v), z.number().int().nonnegative()),
    image: z.string().url().optional(),
});

export type IProduct     = z.infer<typeof IProductSchema>;