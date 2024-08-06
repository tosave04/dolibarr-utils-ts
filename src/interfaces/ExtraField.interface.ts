import { z } from "zod"

export const ExtraFieldSchema = z
	.object({
		type: z.string(),
		label: z.string(),
		size: z.string(),
		elementtype: z.string(),
		default: z.unknown().or(z.null()),
		computed: z.unknown().or(z.null()),
		unique: z.string(),
		required: z.string(),
		param: z.any(),
		pos: z.string(),
		alwayseditable: z.string(),
		perms: z.unknown().or(z.null()),
		list: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface ExtraField extends z.infer<typeof ExtraFieldSchema> {}
