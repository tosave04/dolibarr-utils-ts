import { z } from "zod"

export const OrderingOriginSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		label: z.string(),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface OrderingOrigin extends z.infer<typeof OrderingOriginSchema> {}
