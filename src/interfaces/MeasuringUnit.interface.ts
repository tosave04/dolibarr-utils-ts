import { z } from "zod"

export const MeasuringUnitSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		label: z.string(),
		short_label: z.string(),
		active: z.string(),
		scale: z.string(),
		unit_type: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface MeasuringUnit extends z.infer<typeof MeasuringUnitSchema> {}
