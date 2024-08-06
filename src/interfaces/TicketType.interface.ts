import { z } from "zod"

export const TicketTypeSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		pos: z.string(),
		label: z.string(),
		use_default: z.string(),
		description: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface TicketType extends z.infer<typeof TicketTypeSchema> {}
