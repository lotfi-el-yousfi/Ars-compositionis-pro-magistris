import {z} from "zod";

const IProductsSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    quantity: z.number(),
    image: z.string(),
})

export type IProducts = z.infer<typeof IProductsSchema>;