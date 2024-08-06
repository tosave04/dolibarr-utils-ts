import { z } from "zod"

export const StaffSchema = z
	.object({
		id: z.string(),
		code: z.string(),
		libelle: z.string(),
		active: z.string(),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface Staff extends z.infer<typeof StaffSchema> {}
