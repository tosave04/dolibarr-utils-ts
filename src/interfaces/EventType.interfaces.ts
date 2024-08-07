import { z } from "zod"

export const EventTypeSchema = z
	.object({
		id: z.string(),
		code: z.string(),
		type: z.string(),
		label: z.string(),
		module: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface EventType extends z.infer<typeof EventTypeSchema> {}
