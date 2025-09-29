import { z } from "zod"

export const RecordUnknownSchema = z
	.object({
		id: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface RecordUnknown extends z.infer<typeof RecordUnknownSchema> {}
