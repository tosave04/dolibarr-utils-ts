import { z } from "zod"

export const BusinessLegalFormSchema = z
	.object({
		rowid: z.string(),
		code: z.string(),
		fk_pays: z.string(),
		libelle: z.string(),
		isvatexempted: z.string(),
		active: z.string(),
		module: z.string().or(z.null()),
		position: z.string(),
	})
	.partial()
	.catchall(z.any())

export interface BusinessLegalForm extends z.infer<typeof BusinessLegalFormSchema> {}
