import { z } from "zod"

export const CurrencySchema = z
	.object({
		code_iso: z.string(),
		label: z.string(),
		unicode: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface Currency extends z.infer<typeof CurrencySchema> {}
