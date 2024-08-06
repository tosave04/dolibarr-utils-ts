import { z } from "zod"

export const CountrySchema = z
	.object({
		id: z.string(),
		code: z.string(),
		code_iso: z.string().or(z.null()),
		label: z.string(),
		active: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface Country extends z.infer<typeof CountrySchema> {}
