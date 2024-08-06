import { z } from "zod"

export const OrderingMethodSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		label: z.string(),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface OrderingMethod extends z.infer<typeof OrderingMethodSchema> {}
