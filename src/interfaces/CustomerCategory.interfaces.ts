import { z } from "zod"

// TODO: create interface for CustomerCategory
export const CustomerCategorySchema = z.object({}).partial().catchall(z.any())

export interface CustomerCategory extends z.infer<typeof CustomerCategorySchema> {}
