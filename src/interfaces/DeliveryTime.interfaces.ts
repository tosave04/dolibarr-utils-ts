import { z } from "zod"

export const DeliveryTimeSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		label: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface DeliveryTime extends z.infer<typeof DeliveryTimeSchema> {}
