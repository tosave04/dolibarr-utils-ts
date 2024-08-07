import { z } from "zod"

export const ContactTypeSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		type: z.string(),
		label: z.string(),
		source: z.string(),
		module: z.string().or(z.null()),
		position: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface ContactType extends z.infer<typeof ContactTypeSchema> {}
