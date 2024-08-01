import { z } from "zod"

export const DocumentContentSchema = z
	.object({
		filename: z.string(),
		"content-type": z.string(),
		filesize: z.number(),
		content: z.string(),
		encoding: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface DocumentContent extends z.infer<typeof DocumentContentSchema> {}
