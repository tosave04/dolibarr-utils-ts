import { z } from "zod"

export const StateProvinceSchema = z
	.object({
		id: z.string(),
		code_departement: z.string(),
		code: z.string(),
		name: z.string(),
		nom: z.string(),
		label: z.string().or(z.null()),
		active: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface StateProvince extends z.infer<typeof StateProvinceSchema> {}
