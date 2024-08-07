import { z } from "zod"

export const CivilitySchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		label: z.string(),
		module: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface Civility extends z.infer<typeof CivilitySchema> {}
