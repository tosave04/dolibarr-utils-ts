import { z } from "zod"

export const PaymentTypeSchema = z
	.object({
		id: z.string(),
		code: z.string(),
		type: z.string(),
		label: z.string(),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface PaymentType extends z.infer<typeof PaymentTypeSchema> {}
