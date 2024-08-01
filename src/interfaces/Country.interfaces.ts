import { z } from "zod"

export const CountrySchema = z
	.object({
		id: z.any(),
		code: z.any(),
		code_iso: z.any(),
		label: z.any(),
		active: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Country extends z.infer<typeof CountrySchema> {}
