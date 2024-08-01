import { z } from "zod"

export const LinkedObjectsIdsSchema = z
	.object({
		propal: z.record(z.any()),
		commande: z.record(z.any()),
		facture: z.record(z.any()),
		shipping: z.record(z.any()),
	})
	.partial()
	.catchall(z.any())

export interface LinkedObjectsIds extends z.infer<typeof LinkedObjectsIdsSchema> {}
