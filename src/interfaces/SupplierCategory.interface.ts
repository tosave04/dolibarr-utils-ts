import { z } from "zod"

// TODO: create interface for SupplierCategories
export const SupplierCategorySchema = z.object({}).partial().catchall(z.any())

export interface SupplierCategory extends z.infer<typeof SupplierCategorySchema> {}
