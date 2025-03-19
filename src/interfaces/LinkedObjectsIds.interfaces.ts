import { z } from "zod"

export const LinkedObjectsIdsSchema = z
	.object({
		propal: z.record(z.string()),
		commande: z.record(z.string()),
		facture: z.record(z.string()),
		shipping: z.record(z.string()),
	})
	.partial()

export interface LinkedObjectsIds extends z.infer<typeof LinkedObjectsIdsSchema> {}
