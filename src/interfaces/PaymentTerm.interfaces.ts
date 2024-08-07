import { z } from "zod"

export const PaymentTermSchema = z
	.object({
		id: z.string(),
		code: z.string(),
		sortorder: z.string(),
		label: z.string(),
		descr: z.string(),
		type_cdr: z.string(),
		nbjour: z.string(),
		decalage: z.string().or(z.null()),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface PaymentTerm extends z.infer<typeof PaymentTermSchema> {}
