import { z } from "zod"

export const TicketSeveritySchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		pos: z.string(),
		label: z.string(),
		use_default: z.string(),
		color: z.string(),
		description: z.string().or(z.null()),
	})
	.partial()
	.catchall(z.any())

export interface TicketSeverity extends z.infer<typeof TicketSeveritySchema> {}
