import { z } from "zod"

export const TicketCategorySchema = z
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

export interface TicketCategory extends z.infer<typeof TicketCategorySchema> {}