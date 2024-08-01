import { z } from "zod"

export const PdfSchema = z
	.object({
		filename: z.any(),
		filesize: z.any(),
		content: z.any(),
		langcode: z.any(),
		template: z.any(),
		encoding: z.any(),
	})
	.partial()
	.catchall(z.any())

export interface Pdf extends z.infer<typeof PdfSchema> {}
