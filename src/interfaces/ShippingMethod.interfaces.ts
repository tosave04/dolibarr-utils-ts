import { z } from "zod"

export const ShippingMethodSchema = z
	.object({
		id: z.string(),
		code: z.string(),
		label: z.string(),
		description: z.string(),
		tracking: z.string(),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface ShippingMethod extends z.infer<typeof ShippingMethodSchema> {}
