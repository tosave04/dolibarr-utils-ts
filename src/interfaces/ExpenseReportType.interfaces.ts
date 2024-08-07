import { z } from "zod"

export const ExpenseReportTypeSchema = z
	.object({
		id: z.string(),
		code: z.string(),
		label: z.string(),
		accountancy_code: z.string().or(z.null()),
		active: z.string(),
		module: z.string().or(z.null()),
		position: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface ExpenseReportType extends z.infer<typeof ExpenseReportTypeSchema> {}
